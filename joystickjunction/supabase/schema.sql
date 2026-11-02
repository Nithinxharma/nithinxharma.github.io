-- Run in a fresh Supabase project. Service-role access must remain server-side.
create extension if not exists pgcrypto;

create type booking_status as enum ('pending','confirmed','out_for_delivery','delivered','returned','cancelled');
create type payment_status as enum ('unpaid','pending','paid','failed','refunded');

create table public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 slug text unique not null,
 description text,
 category text not null check (category in ('console','game','accessory')),
 listing_type text not null default 'rental' check (listing_type in ('rental','sale','both')),
 price_rental_daily numeric(10,2),
 price_sale numeric(10,2),
 stock_quantity integer not null default 0 check (stock_quantity >= 0),
 image_url text,
 is_active boolean not null default true,
 created_at timestamptz not null default now()
);

create table public.bookings (
 id uuid primary key default gen_random_uuid(),
 customer_name text not null,
 phone text not null,
 email text,
 address text not null,
 start_date date not null,
 end_date date not null,
 status booking_status not null default 'pending',
 payment_status payment_status not null default 'unpaid',
 payment_method text not null check(payment_method in ('razorpay','cod')),
 total_amount numeric(10,2) not null default 0,
 currency text not null default 'INR',
 gateway_order_id text unique,
 created_at timestamptz not null default now(),
 check(end_date >= start_date)
);

create table public.booking_items (
 id uuid primary key default gen_random_uuid(),
 booking_id uuid not null references public.bookings(id) on delete cascade,
 product_id uuid not null references public.products(id),
 quantity integer not null check(quantity > 0),
 unit_price numeric(10,2)
);

create table public.leads (
 id uuid primary key default gen_random_uuid(),
 name text, phone text not null, email text, message text,
 source text not null default 'website',
 status text not null default 'new' check(status in ('new','contacted','qualified','converted','closed')),
 created_at timestamptz not null default now()
);

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'customer' check(role in ('customer','admin')),
 created_at timestamptz not null default now()
);

create table public.analytics_events (
 id uuid primary key default gen_random_uuid(),
 event_name text not null,
 path text,
 session_id text,
 metadata jsonb not null default '{}',
 created_at timestamptz not null default now()
);

create index bookings_dates_status_idx on public.bookings(start_date,end_date,status);
create index bookings_created_idx on public.bookings(created_at desc);
create index leads_status_created_idx on public.leads(status,created_at desc);
create index products_category_active_idx on public.products(category,is_active);

alter table public.products enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_items enable row level security;
alter table public.leads enable row level security;
alter table public.profiles enable row level security;
alter table public.analytics_events enable row level security;

-- Public catalogue read only. All writes go through server routes using service role.
create policy "public can view active products" on public.products for select using (is_active=true);
-- No public policies for bookings, leads, profiles, analytics or booking_items.
-- Add authenticated admin policies only after implementing and testing role checks.
