-- Uppdaterar booking_treatments till det nya, kuraterade utbudet:
--   * fillers — Revolax Fine
--   * botox   — Dysport
--
-- Befintliga rader inaktiveras hellre än tas bort, för att inte bryta
-- referenser från redan skapade bookings (treatment_id är en foreign key).
-- Nya rader läggs till idempotent via ON CONFLICT (slug).

-- 1. Inaktivera tidigare behandlingar så de inte längre dyker upp i UI:t
update public.booking_treatments
set active = false
where slug in (
  'belotero-revive',
  'profhilo',
  'profhilo-structura',
  'ejal40',
  'sunekos-performa',
  'hyalift'
);

-- 2. Seed/upsert nytt utbud
insert into public.booking_treatments (slug, name, category, duration_minutes, sort_order, active)
values
  ('fillers', 'Fillers', 'Filler · Revolax Fine',        45, 1, true),
  ('botox',   'Botox',   'Muskelavslappnande · Dysport', 30, 2, true)
on conflict (slug) do update set
  name             = excluded.name,
  category         = excluded.category,
  duration_minutes = excluded.duration_minutes,
  sort_order       = excluded.sort_order,
  active           = excluded.active;
