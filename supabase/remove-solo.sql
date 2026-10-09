-- Run once AFTER the original schema and OS migrations.
-- Keep historical records but reject new bookings/enquiries for the retired service.
create or replace function public.block_retired_service() returns trigger language plpgsql set search_path='' as $$
begin
 if new.service='solo' then
  if tg_op='INSERT' then raise exception 'This service is no longer offered.';end if;
  if old.service is distinct from new.service then raise exception 'This service is no longer offered.';end if;
 end if;
 return new;
end; $$;
drop trigger if exists block_retired_enquiry_service on public.enquiries;
create trigger block_retired_enquiry_service before insert or update on public.enquiries for each row execute function public.block_retired_service();
drop trigger if exists block_retired_walk_service on public.walks;
create trigger block_retired_walk_service before insert or update on public.walks for each row execute function public.block_retired_service();
