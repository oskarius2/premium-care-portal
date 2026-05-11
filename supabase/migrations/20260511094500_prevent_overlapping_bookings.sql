-- Förhindra dubbelbokningar även vid två samtidiga create-booking-anrop.
-- Edge functionen gör fortfarande en snabb konfliktcheck för bra felmeddelanden,
-- men databasen är sista skyddsnätet.

create extension if not exists btree_gist;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_no_overlapping_active_times'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_no_overlapping_active_times
      exclude using gist (
        booking_date with =,
        tsrange(
          (booking_date + start_time)::timestamp,
          (booking_date + end_time)::timestamp,
          '[)'
        ) with &&
      )
      where (status <> 'cancelled');
  end if;
end $$;
