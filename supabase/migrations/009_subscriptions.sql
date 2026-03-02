-- Subscriptions table for MercadoPago billing
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants(id) on delete cascade not null unique,
  mp_preapproval_id text unique,
  mp_payer_email text,
  plan text not null default 'trial',
  status text not null default 'pending', -- pending, authorized, paused, cancelled
  next_payment_date timestamptz,
  last_payment_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.subscriptions enable row level security;

create policy "Users can view own tenant subscription"
  on public.subscriptions for select
  using (tenant_id in (select tenant_id from public.users where id = auth.uid()));

-- Index
create index idx_subscriptions_tenant on public.subscriptions(tenant_id);
create index idx_subscriptions_mp_id on public.subscriptions(mp_preapproval_id);
