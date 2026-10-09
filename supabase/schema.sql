-- Run once in the Supabase SQL Editor. Enquiries are private.
create table if not exists public.enquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null, email text not null, dog text not null,
 postcode text not null, service text not null check(service in ('group','solo','visit')),
 notes text not null default '', consent boolean not null check(consent),
 status text not null default 'new' check(status in ('new','contacted','closed'))
);
alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
-- A database-backed throttle works across Vercel instances.
create or replace function public.submit_enquiry(payload jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
 perform pg_advisory_xact_lock(hashtext(lower(payload->>'email')));
 if (select count(*) from public.enquiries where lower(email)=lower(payload->>'email') and created_at > now()-interval '1 hour') >= 3 then
  raise exception 'rate_limit';
 end if;
 insert into public.enquiries(name,email,dog,postcode,service,notes,consent)
 values(payload->>'name',lower(payload->>'email'),payload->>'dog',payload->>'postcode',payload->>'service',coalesce(payload->>'notes',''),(payload->>'consent')::boolean);
end;
$$;
revoke all on function public.submit_enquiry(jsonb) from public, anon, authenticated;
grant execute on function public.submit_enquiry(jsonb) to service_role;
-- Public marketing images only. No public upload/update/delete policies.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('site-images','site-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
