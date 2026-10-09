-- Run AFTER schema.sql. This adds the OS without removing existing enquiries.
create table if not exists public.os_owners (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.os_owners enable row level security;
grant select on public.os_owners to authenticated;
create policy "owner reads own membership" on public.os_owners for select to authenticated using(user_id=auth.uid());
create or replace function public.is_os_owner() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.os_owners where user_id=auth.uid()); $$;
revoke all on function public.is_os_owner() from public;
grant execute on function public.is_os_owner() to authenticated;
create table if not exists public.clients (
 id uuid primary key default gen_random_uuid(),created_at timestamptz not null default now(),
 name text not null check(length(name) between 1 and 100), email text not null default '',phone text not null default '',
 dog text not null check(length(dog) between 1 and 100),address text not null default '',care_notes text not null default '',active boolean not null default true
);
create table if not exists public.walks (
 id uuid primary key default gen_random_uuid(),client_id uuid not null references public.clients(id),
 starts_at timestamptz not null,duration integer not null check(duration between 5 and 480),
 service text not null check(service in ('group','solo','visit')),fee numeric(10,2) not null default 0 check(fee>=0),
 status text not null default 'scheduled' check(status in ('scheduled','completed','cancelled')),paid boolean not null default false,notes text not null default ''
);
alter table public.enquiries add column if not exists internal_notes text not null default '';
alter table public.enquiries add column if not exists follow_up_on date;
alter table public.enquiries add column if not exists client_id uuid references public.clients(id);
create table if not exists public.enquiry_replies (
 id uuid primary key default gen_random_uuid(),enquiry_id uuid not null references public.enquiries(id),
 body text not null,created_at timestamptz not null default now(),provider_id text
);
alter table public.clients enable row level security;
alter table public.walks enable row level security;
alter table public.enquiry_replies enable row level security;
revoke all on public.clients,public.walks,public.enquiry_replies from anon,authenticated;
grant select,insert,update on public.clients,public.walks to authenticated;
grant select,update on public.enquiries to authenticated;
grant select on public.enquiry_replies to authenticated;
create policy "owner clients" on public.clients for all to authenticated using(public.is_os_owner()) with check(public.is_os_owner());
create policy "owner walks" on public.walks for all to authenticated using(public.is_os_owner()) with check(public.is_os_owner());
create policy "owner reads enquiries" on public.enquiries for select to authenticated using(public.is_os_owner());
create policy "owner updates enquiries" on public.enquiries for update to authenticated using(public.is_os_owner()) with check(public.is_os_owner());
create policy "owner reads replies" on public.enquiry_replies for select to authenticated using(public.is_os_owner());
create or replace function public.convert_enquiry(enquiry_uuid uuid) returns uuid language plpgsql security definer set search_path='' as $$
declare e public.enquiries; cid uuid;
begin
 if not public.is_os_owner() then raise exception 'Not authorised';end if;
 select * into e from public.enquiries where id=enquiry_uuid for update;
 if not found then raise exception 'Enquiry not found';end if;
 if e.client_id is not null then return e.client_id;end if;
 insert into public.clients(name,email,dog,address,care_notes) values(e.name,e.email,e.dog,e.postcode,e.notes) returning id into cid;
 update public.enquiries set client_id=cid,status='closed' where id=e.id;
 return cid;
end; $$;
revoke all on function public.convert_enquiry(uuid) from public,anon;
grant execute on function public.convert_enquiry(uuid) to authenticated;
create index if not exists walks_starts_at_idx on public.walks(starts_at);
-- NEXT: Create your user in Authentication > Users, then replace UUID below:
-- insert into public.os_owners(user_id) values ('YOUR-AUTH-USER-UUID');
-- Owner membership is managed only in SQL Editor, never from the public app.

-- Prevent overlapping bookings for the same dog across devices.
create or replace function public.prevent_walk_overlap() returns trigger language plpgsql set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtext(new.client_id::text));
 if new.status <> 'cancelled' and exists (
  select 1 from public.walks w where w.client_id=new.client_id and w.id<>new.id and w.status<>'cancelled'
  and w.starts_at < new.starts_at + make_interval(mins => new.duration)
  and new.starts_at < w.starts_at + make_interval(mins => w.duration)
 ) then raise exception 'This dog already has a walk at that time.';end if;
 return new;
end; $$;
create trigger check_walk_overlap before insert or update on public.walks for each row execute function public.prevent_walk_overlap();
