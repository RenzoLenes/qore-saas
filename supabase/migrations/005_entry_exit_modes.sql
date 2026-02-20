-- QORE SaaS — Entry/Exit Modes with Cascade
-- Separates check-in into entry_mode + exit_mode at 3 levels:
--   Tenant (defaults) → Location (optional override) → Worker (optional override)
-- Resolution: worker.entry_mode ?? location.entry_mode ?? tenant.default_entry_mode

-- =====================================================
-- 1. TENANT DEFAULTS (NOT NULL — always have a value)
-- =====================================================

ALTER TABLE public.tenants
  ADD COLUMN default_entry_mode text NOT NULL DEFAULT 'dynamic_qr'
    CHECK (default_entry_mode IN ('gps_only', 'static_qr', 'dynamic_qr')),
  ADD COLUMN default_exit_mode text NOT NULL DEFAULT 'gps_only'
    CHECK (default_exit_mode IN ('gps_only', 'static_qr', 'dynamic_qr')),
  ADD COLUMN onboarding_completed boolean NOT NULL DEFAULT false;

-- =====================================================
-- 2. LOCATION OVERRIDES (NULLABLE — null = inherit from tenant)
-- =====================================================

ALTER TABLE public.locations
  ADD COLUMN entry_mode text
    CHECK (entry_mode IN ('gps_only', 'static_qr', 'dynamic_qr')),
  ADD COLUMN exit_mode text
    CHECK (exit_mode IN ('gps_only', 'static_qr', 'dynamic_qr'));

-- =====================================================
-- 3. WORKER OVERRIDES (NULLABLE — null = inherit from location/tenant)
-- =====================================================

ALTER TABLE public.workers
  ADD COLUMN entry_mode text
    CHECK (entry_mode IN ('gps_only', 'static_qr', 'dynamic_qr')),
  ADD COLUMN exit_mode text
    CHECK (exit_mode IN ('gps_only', 'static_qr', 'dynamic_qr'));

-- =====================================================
-- 4. MIGRATE EXISTING DATA
-- =====================================================

-- Copy workers.check_in_mode → workers.entry_mode
UPDATE public.workers SET entry_mode = check_in_mode;
-- exit_mode stays NULL (inherits tenant default_exit_mode = 'gps_only')

-- Mark existing tenants as onboarding completed (they already have data)
UPDATE public.tenants SET onboarding_completed = true;
