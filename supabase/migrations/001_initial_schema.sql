-- QORE SaaS — Initial Schema
-- All tables created first, then indexes, then RLS policies, then triggers.

-- =====================================================
-- 1. TABLES
-- =====================================================

-- Tenants (multi-tenant organizations)
create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan text not null default 'trial',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Users (linked to auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  role text not null default 'admin',
  tenant_id uuid references public.tenants(id),
  created_at timestamptz default now()
);

-- Locations (sedes/branches)
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  name text not null,
  address text not null,
  lat double precision not null,
  lng double precision not null,
  gps_radius integer default 150,
  schedule text default '08:00 - 18:00',
  work_days text[] default '{Mon,Tue,Wed,Thu,Fri}',
  status text default 'active',
  created_at timestamptz default now()
);

-- Workers (employees tracked per location)
create table public.workers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  location_id uuid references public.locations(id) on delete cascade not null,
  name text not null,
  position text not null,
  email text,
  status text default 'active',
  created_at timestamptz default now()
);

-- Attendance records
create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  worker_id uuid references public.workers(id) on delete cascade not null,
  location_id uuid references public.locations(id) on delete cascade not null,
  type text not null,
  method text default 'qr',
  timestamp timestamptz default now(),
  lat double precision,
  lng double precision,
  within_radius boolean
);

-- QR codes (rotating tokens per location)
create table public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade not null,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  token text unique default encode(gen_random_bytes(32), 'hex'),
  expires_at timestamptz default (now() + interval '5 minutes'),
  is_active boolean default true,
  created_at timestamptz default now()
);

-- =====================================================
-- 2. INDEXES
-- =====================================================

create index idx_attendance_tenant_timestamp on public.attendance_records (tenant_id, timestamp desc);
create index idx_attendance_worker_timestamp on public.attendance_records (worker_id, timestamp desc);

-- =====================================================
-- 3. ROW LEVEL SECURITY
-- =====================================================

alter table public.tenants enable row level security;
alter table public.users enable row level security;
alter table public.locations enable row level security;
alter table public.workers enable row level security;
alter table public.attendance_records enable row level security;
alter table public.qr_codes enable row level security;

-- Tenants policies
create policy "Tenant members can view their tenant"
  on public.tenants for select
  using (
    id in (
      select tenant_id from public.users where id = auth.uid()
    )
  );

-- Users policies
create policy "Users can view own record"
  on public.users for select
  using (id = auth.uid());

create policy "Users can update own record"
  on public.users for update
  using (id = auth.uid());

-- Locations policies
create policy "Tenant members can view locations"
  on public.locations for select
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid()
    )
  );

create policy "Admins can insert locations"
  on public.locations for insert
  with check (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid() and role in ('owner', 'admin')
    )
  );

create policy "Admins can update locations"
  on public.locations for update
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- Workers policies
create policy "Tenant members can view workers"
  on public.workers for select
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid()
    )
  );

create policy "Admins can manage workers"
  on public.workers for all
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- Attendance records policies
create policy "Tenant members can view attendance"
  on public.attendance_records for select
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid()
    )
  );

create policy "Admins can insert attendance"
  on public.attendance_records for insert
  with check (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- QR codes policies
create policy "Tenant members can view QR codes"
  on public.qr_codes for select
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid()
    )
  );

create policy "Admins can manage QR codes"
  on public.qr_codes for all
  using (
    tenant_id in (
      select tenant_id from public.users where id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- =====================================================
-- 4. TRIGGER: Auto-create user row on signup
-- =====================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'admin')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
