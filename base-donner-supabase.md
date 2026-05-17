code en mode SUPABASE SAFE

🚀 VERSION CORRIGÉE (ADMIN CORE PROPRE)

-- =====================================================
-- EXTENSION
-- =====================================================
create extension if not exists "pgcrypto";

-- =====================================================
-- USERS
-- =====================================================
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  fullname text not null,
  email text unique not null,
  phone text,
  role text default 'client',
  avatar_url text,
  created_at timestamp default now()
);

-- =====================================================
-- ROLES
-- =====================================================
create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  created_at timestamp default now()
);

-- =====================================================
-- USER ROLES
-- =====================================================
create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  created_at timestamp default now()
);

-- =====================================================
-- MODULES
-- =====================================================
create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique not null,
  description text,
  is_active boolean default true,
  created_at timestamp default now()
);

-- =====================================================
-- USER MODULES
-- =====================================================
create table if not exists user_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  module_id uuid references modules(id) on delete cascade,
  created_at timestamp default now()
);

-- =====================================================
-- SETTINGS
-- =====================================================
create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  logo_url text,
  currency text default 'MGA',
  language text default 'fr',
  tax_rate numeric default 0,
  theme text default 'dark',
  created_at timestamp default now()
);

-- =====================================================
-- DASHBOARD METRICS
-- =====================================================
create table if not exists dashboard_metrics (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id),
  metric_name text,
  metric_value numeric,
  date date default current_date,
  created_at timestamp default now()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action text,
  module text,
  entity text,
  entity_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address text,
  created_at timestamp default now()
);

-- =====================================================
-- CASH REGISTERS
-- =====================================================
create table if not exists cash_registers (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id),
  opened_by uuid references users(id),
  closed_by uuid references users(id),
  opening_balance numeric default 0,
  closing_balance numeric,
  status text default 'open',
  opened_at timestamp default now(),
  closed_at timestamp
);

-- =====================================================
-- STOCK MOVEMENTS (SAFE VERSION)
-- =====================================================
create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid,
  module_id uuid references modules(id),
  type text,
  quantity integer,
  reason text,
  created_by uuid references users(id),
  created_at timestamp default now()
);

-- =====================================================
-- PAYMENT LOGS (SAFE VERSION)
-- =====================================================
create table if not exists payment_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  order_id uuid,
  amount numeric,
  method text,
  status text,
  transaction_ref text,
  module_id uuid references modules(id),
  created_at timestamp default now()
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  title text,
  message text,
  type text,
  is_read boolean default false,
  created_at timestamp default now()
);

-- =====================================================
-- FILES
-- =====================================================
create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  name text,
  url text,
  type text,
  uploaded_by uuid references users(id),
  module_id uuid references modules(id),
  created_at timestamp default now()
);

-- =====================================================
-- AI LOGS
-- =====================================================
create table if not exists ai_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  prompt text,
  response text,
  module_id uuid references modules(id),
  created_at timestamp default now()
);

-- =====================================================
-- MODULES INSERT
-- =====================================================
insert into modules (name, code, description)
values
('Restaurant', 'restaurant', 'Gestion restaurant'),
('Boutique', 'boutique', 'Gestion boutique'),
('Salle de sport', 'gym', 'Gestion gym'),
('Hôtel', 'hotel', 'Gestion hôtel'),
('Terrain foot', 'foot', 'Gestion terrain'),
('Piscine', 'piscine', 'Gestion piscine'),
('Salon coiffure', 'salon', 'Gestion salon'),
('Événementiel', 'event', 'Gestion événements'),
('Cybercafé', 'cyber', 'Gestion cyber'),
('Spectacles', 'show', 'Gestion spectacles')
on conflict (code) do nothing;




































les vraies tables principales de GestPro dans Supabase Dashboard au client

-- EXTENSION UUID
create extension if not exists "pgcrypto";



-- =====================================================
-- USERS
-- =====================================================

create table users (
    id uuid primary key default gen_random_uuid(),
    fullname text not null,
    email text unique not null,
    phone text,
    role text default 'client',
    avatar_url text,
    created_at timestamptz default now()
);



-- =====================================================
-- BUSINESSES
-- =====================================================

create table businesses (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid references users(id) on delete cascade,
    name text not null,
    category text,
    description text,
    logo_url text,
    address text,
    phone text,
    email text,
    created_at timestamptz default now()
);



-- =====================================================
-- PRODUCTS
-- =====================================================

create table products (
    id uuid primary key default gen_random_uuid(),
    business_id uuid references businesses(id) on delete cascade,
    name text not null,
    description text,
    price numeric(12,2) not null default 0,
    stock integer default 0,
    image_url text,
    category text,
    is_active boolean default true,
    created_at timestamptz default now()
);



-- =====================================================
-- CARTS
-- =====================================================

create table carts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    created_at timestamptz default now()
);



-- =====================================================
-- CART ITEMS
-- =====================================================

create table cart_items (
    id uuid primary key default gen_random_uuid(),
    cart_id uuid references carts(id) on delete cascade,
    product_id uuid references products(id) on delete cascade,
    quantity integer default 1,
    created_at timestamptz default now()
);



-- =====================================================
-- ORDERS
-- =====================================================

create table orders (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    total numeric(12,2) default 0,
    status text default 'pending',
    payment_status text default 'unpaid',
    delivery_address text,
    created_at timestamptz default now()
);



-- =====================================================
-- ORDER ITEMS
-- =====================================================

create table order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references orders(id) on delete cascade,
    product_id uuid references products(id),
    quantity integer default 1,
    price numeric(12,2) default 0
);



-- =====================================================
-- RESERVATIONS
-- =====================================================

create table reservations (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    business_id uuid references businesses(id),
    reservation_type text,
    reservation_date timestamptz,
    guests integer default 1,
    status text default 'pending',
    notes text,
    created_at timestamptz default now()
);



-- =====================================================
-- PAYMENTS
-- =====================================================

create table payments (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references orders(id),
    amount numeric(12,2) default 0,
    payment_method text,
    payment_status text default 'pending',
    transaction_id text,
    paid_at timestamptz,
    created_at timestamptz default now()
);



-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================

create table subscriptions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    plan_name text,
    start_date timestamptz,
    end_date timestamptz,
    status text default 'active',
    created_at timestamptz default now()
);



-- =====================================================
-- NOTIFICATIONS
-- =====================================================

create table notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    title text,
    message text,
    is_read boolean default false,
    created_at timestamptz default now()
);



-- =====================================================
-- REVIEWS
-- =====================================================

create table reviews (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    product_id uuid references products(id),
    rating integer check (rating >= 1 and rating <= 5),
    comment text,
    created_at timestamptz default now()
);



-- =====================================================
-- FAVORITES
-- =====================================================

create table favorites (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    product_id uuid references products(id),
    created_at timestamptz default now()
);



-- =====================================================
-- SUPPORT TICKETS
-- =====================================================

create table support_tickets (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    subject text,
    message text,
    status text default 'open',
    created_at timestamptz default now()
);



-- =====================================================
-- AUDIT LOGS
-- =====================================================

create table audit_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id),
    action text,
    entity text,
    entity_id uuid,
    details jsonb,
    created_at timestamptz default now()
);