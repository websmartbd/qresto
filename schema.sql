-- Supabase > SQL Editor > New query > paste all > Run

create table restaurant (
  id int primary key default 1 check (id = 1),
  name text not null default 'My Restaurant',
  tagline text,
  address text, phone text, email text,
  hours text,
  wifi_name text, wifi_pass text, wifi_qr text,
  tax_percent numeric default 0,
  service_charge numeric default 0,
  currency text default '৳',
  color text default '#15803d',
  allow_orders boolean default true,
  allow_notes boolean default true,
  prep_time text default '15-20 mins',
  invoice_footer text default 'Thank you. Please visit again.'
);
insert into restaurant (id) values (1);

create table tables (
  id bigint generated always as identity primary key,
  number text not null unique
);

create table menu_items (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null default 'Others',
  description text,
  price numeric not null,
  offer_price numeric,
  image_url text,
  available boolean default true
);

create table invoices (
  id bigint generated always as identity primary key,
  table_id bigint references tables on delete set null,
  table_no text,
  subtotal numeric, discount numeric default 0, tax numeric default 0, total numeric, coupon text,
  created_at timestamptz default now()
);

create table coupons (
  id bigint generated always as identity primary key,
  code text not null unique,
  type text not null default 'percent' check (type in ('percent','flat')),
  value numeric not null,
  min_order numeric default 0,
  active boolean default true
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  no bigint generated always as identity,
  table_id bigint references tables on delete set null,
  status text default 'new' check (status in ('new','preparing','served','paid','cancelled')),
  total numeric not null,
  discount numeric default 0,
  coupon text,
  note text,
  invoice_id bigint references invoices,
  created_at timestamptz default now()
);

create table order_items (
  id bigint generated always as identity primary key,
  order_id uuid references orders on delete cascade,
  name text, price numeric, qty int
);

-- Security: customers (anon) can read the menu and send orders only.
-- Logged-in admin can do everything.
alter table restaurant  enable row level security;
alter table tables      enable row level security;
alter table menu_items  enable row level security;
alter table invoices    enable row level security;
alter table coupons     enable row level security;
alter table orders      enable row level security;
alter table order_items enable row level security;

create policy "read" on restaurant for select using (true);
create policy "read" on tables     for select using (true);
create policy "read" on menu_items for select using (true);
create policy "read" on coupons    for select using (active = true);

create policy "customer order" on orders      for insert to anon with check (status = 'new' and invoice_id is null);
create policy "customer items" on order_items for insert to anon with check (true);

create policy "admin" on restaurant  for all to authenticated using (true) with check (true);
create policy "admin" on tables      for all to authenticated using (true) with check (true);
create policy "admin" on menu_items  for all to authenticated using (true) with check (true);
create policy "admin" on coupons     for all to authenticated using (true) with check (true);
create policy "admin" on invoices    for all to authenticated using (true) with check (true);
create policy "admin" on orders      for all to authenticated using (true) with check (true);
create policy "admin" on order_items for all to authenticated using (true) with check (true);

-- Live order updates in admin panel
alter publication supabase_realtime add table orders;
