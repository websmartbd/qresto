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
insert into restaurant (id) values (1) on conflict (id) do nothing;

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
  available boolean default true,
  variants jsonb,
  addons jsonb
);

create table invoices (
  id bigint generated always as identity primary key,
  table_id bigint references tables on delete set null,
  table_no text,
  subtotal numeric,
  discount numeric default 0,
  service_charge numeric default 0,
  tax numeric default 0,
  total numeric,
  coupon text,
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
  total numeric not null check (total >= 0),
  discount numeric default 0 check (discount >= 0),
  coupon text,
  note text,
  invoice_id bigint references invoices,
  created_at timestamptz default now()
);

create table order_items (
  id bigint generated always as identity primary key,
  order_id uuid references orders on delete cascade,
  name text not null,
  price numeric not null check (price >= 0),
  qty int not null check (qty > 0)
);

create table waiter_calls (
  id uuid primary key default gen_random_uuid(),
  table_id bigint references tables on delete set null,
  table_no text not null,
  request text default 'Waiter needed',
  status text default 'pending' check (status in ('pending', 'resolved')),
  created_at timestamptz default now()
);

-- Security: Row Level Security (RLS)
alter table restaurant   enable row level security;
alter table tables       enable row level security;
alter table menu_items   enable row level security;
alter table invoices     enable row level security;
alter table coupons      enable row level security;
alter table orders       enable row level security;
alter table order_items  enable row level security;
alter table waiter_calls enable row level security;

-- Public (anon) read policies
create policy "read" on restaurant for select using (true);
create policy "read" on tables     for select using (true);
create policy "read" on menu_items for select using (true);
create policy "read" on coupons    for select using (active = true);

-- Customer (anon) order policies: insert and read active/tracked orders
create policy "customer order" on orders for insert to anon with check (status = 'new' and invoice_id is null);
create policy "customer read order" on orders for select to anon using (true);
create policy "customer items" on order_items for insert to anon with check (true);
create policy "customer read items" on order_items for select to anon using (true);

-- Customer waiter call policies
create policy "customer call" on waiter_calls for insert to anon with check (true);
create policy "read waiter calls" on waiter_calls for select using (true);

-- Authenticated Admin policies (Restricted to authorized admin email)
create policy "admin restaurant"  on restaurant   for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin tables"      on tables       for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin menu_items"  on menu_items   for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin coupons"     on coupons      for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin invoices"    on invoices     for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin orders"      on orders       for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin order_items" on order_items  for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');
create policy "admin waiter_calls" on waiter_calls for all to authenticated using (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com') with check (auth.jwt() ->> 'email' = 'YOUR-REAL-EMAIL@gmail.com');

-- Realtime subscriptions for live kitchen & admin updates
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table order_items;
alter publication supabase_realtime add table waiter_calls;

-- Server-side Order Placement & Recalculation RPC (Server Protection)
create or replace function place_customer_order(
  p_id uuid,
  p_table_id bigint,
  p_coupon text,
  p_note text,
  p_lines jsonb
) returns jsonb language plpgsql security definer as $$
declare
  v_line jsonb;
  v_subtotal numeric := 0;
  v_discount numeric := 0;
  v_total numeric := 0;
  v_coupon_type text;
  v_coupon_val numeric;
  v_coupon_min numeric;
  v_coupon_active boolean;
begin
  for v_line in select * from jsonb_array_elements(p_lines) loop
    if (v_line->>'qty')::int <= 0 or (v_line->>'price')::numeric < 0 then
      raise exception 'Invalid item price or quantity';
    end if;
    v_subtotal := v_subtotal + ((v_line->>'price')::numeric * (v_line->>'qty')::int);
    insert into order_items (order_id, name, price, qty)
    values (p_id, v_line->>'name', (v_line->>'price')::numeric, (v_line->>'qty')::int);
  end loop;

  if p_coupon is not null and trim(p_coupon) <> '' then
    select type, value, min_order, active
    into v_coupon_type, v_coupon_val, v_coupon_min, v_coupon_active
    from coupons where upper(code) = upper(trim(p_coupon));

    if found and v_coupon_active and v_subtotal >= v_coupon_min then
      if v_coupon_type = 'percent' then
        v_discount := round(v_subtotal * v_coupon_val / 100);
      else
        v_discount := least(v_coupon_val, v_subtotal);
      end if;
    end if;
  end if;

  v_total := greatest(0, v_subtotal - v_discount);

  insert into orders (id, table_id, status, total, discount, coupon, note)
  values (p_id, p_table_id, 'new', v_total, v_discount, p_coupon, p_note);

  return jsonb_build_object('id', p_id, 'total', v_total, 'discount', v_discount);
end;
$$;
grant execute on function place_customer_order(uuid, bigint, text, text, jsonb) to anon, authenticated;

-- Server-side Atomic Table Settlement RPC
create or replace function settle_table_orders(
  p_table_id bigint,
  p_table_no text,
  p_subtotal numeric,
  p_discount numeric,
  p_service_charge numeric,
  p_tax numeric,
  p_total numeric,
  p_coupon text,
  p_order_ids uuid[]
) returns bigint language plpgsql security definer as $$
declare
  v_inv_id bigint;
begin
  insert into invoices (table_id, table_no, subtotal, discount, service_charge, tax, total, coupon)
  values (p_table_id, p_table_no, p_subtotal, p_discount, p_service_charge, p_tax, p_total, p_coupon)
  returning id into v_inv_id;

  update orders
  set status = 'paid', invoice_id = v_inv_id
  where id = any(p_order_ids);

  return v_inv_id;
end;
$$;
grant execute on function settle_table_orders(bigint, text, numeric, numeric, numeric, numeric, numeric, text, uuid[]) to authenticated;

-- Server-side Aggregated Sales Report RPC (prevents client row limit truncation)
create or replace function get_sales_report(
  p_start timestamptz,
  p_end timestamptz
) returns jsonb language plpgsql security definer as $$
declare
  v_total_sales numeric := 0;
  v_total_tax numeric := 0;
  v_bill_count int := 0;
  v_items_sold int := 0;
  v_top_items jsonb;
  v_hourly jsonb;
begin
  select coalesce(sum(total), 0), coalesce(sum(tax), 0), count(*)
  into v_total_sales, v_total_tax, v_bill_count
  from invoices
  where created_at >= p_start and created_at < p_end;

  select coalesce(sum(oi.qty), 0)
  into v_items_sold
  from order_items oi
  join orders o on o.id = oi.order_id
  where o.status = 'paid' and o.created_at >= p_start and o.created_at < p_end;

  select coalesce(jsonb_agg(sub), '[]'::jsonb)
  into v_top_items
  from (
    select oi.name as n, sum(oi.qty) as q
    from order_items oi
    join orders o on o.id = oi.order_id
    where o.status = 'paid' and o.created_at >= p_start and o.created_at < p_end
    group by oi.name
    order by q desc
    limit 10
  ) sub;

  select coalesce(jsonb_agg(sub), '[]'::jsonb)
  into v_hourly
  from (
    select extract(hour from created_at)::int as h, sum(total) as s
    from invoices
    where created_at >= p_start and created_at < p_end
    group by h
    order by h
  ) sub;

  return jsonb_build_object(
    'total_sales', v_total_sales,
    'total_tax', v_total_tax,
    'bill_count', v_bill_count,
    'items_sold', v_items_sold,
    'top_items', v_top_items,
    'hourly', v_hourly
  );
end;
$$;
grant execute on function get_sales_report(timestamptz, timestamptz) to authenticated;
