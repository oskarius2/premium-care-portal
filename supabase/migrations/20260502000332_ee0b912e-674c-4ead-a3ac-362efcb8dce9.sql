alter table public.booking_treatments enable row level security;
alter table public.availability_rules enable row level security;
alter table public.blocked_times enable row level security;
alter table public.bookings enable row level security;

create policy "Anyone can view active treatments"
  on public.booking_treatments for select
  using (active = true);

create policy "Anyone can view availability rules"
  on public.availability_rules for select
  using (true);