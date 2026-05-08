create table booking_treatments (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  duration_minutes integer not null default 45,
  price_sek integer,
  active boolean not null default true,
  sort_order integer not null default 0
);

create table availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 1 and 7),
  start_time time not null,
  end_time time not null,
  created_at timestamptz not null default now()
);

create table blocked_times (
  id uuid primary key default gen_random_uuid(),
  blocked_date date not null,
  start_time time,
  end_time time,
  all_day boolean not null default false,
  reason text,
  created_at timestamptz not null default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  treatment_id uuid not null references booking_treatments(id),
  booking_date date not null,
  start_time time not null,
  end_time time not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  message text,
  status text not null default 'confirmed'
    check (status in ('confirmed','cancelled','completed','no_show')),
  created_at timestamptz not null default now()
);

create index idx_bookings_date   on bookings(booking_date);
create index idx_bookings_status on bookings(status);
create index idx_blocked_date    on blocked_times(blocked_date);

insert into booking_treatments (slug, name, category, duration_minutes, sort_order) values
  ('belotero-revive',    'Belotero® Revive',       'Skinbooster',       45, 1),
  ('profhilo',          'Profhilo®',               'Bioremodellering',  30, 2),
  ('profhilo-structura','Profhilo Structura',       'Bioremodellering',  45, 3),
  ('ejal40',            'Ejal40',                  'Skinbooster',       30, 4),
  ('sunekos-performa',  'Sunekos Performa',        'Skinbooster',       30, 5),
  ('hyalift',           'Hyalift & Hyalift Eyes',  'Skinbooster',       30, 6);

insert into availability_rules (day_of_week, start_time, end_time) values
  (1, '09:00', '17:00'),
  (2, '09:00', '17:00'),
  (3, '09:00', '17:00'),
  (4, '09:00', '17:00'),
  (5, '09:00', '17:00');