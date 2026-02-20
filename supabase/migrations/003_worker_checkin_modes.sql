-- QORE SaaS — Worker-level check-in modes
-- Moves check_in_mode from locations to workers with 3 modes:
--   gps_only    = GPS recording only, no radius validation, location optional
--   static_qr   = Permanent QR + GPS within radius, location required
--   dynamic_qr   = Rotating QR (5min) + GPS within radius, location required

-- =====================================================
-- 1. ADD check_in_mode TO WORKERS
-- =====================================================

ALTER TABLE public.workers
  ADD COLUMN check_in_mode text NOT NULL DEFAULT 'dynamic_qr'
  CHECK (check_in_mode IN ('gps_only', 'static_qr', 'dynamic_qr'));

-- =====================================================
-- 2. MAKE location_id NULLABLE ON WORKERS
-- =====================================================

ALTER TABLE public.workers
  ALTER COLUMN location_id DROP NOT NULL;

-- Also make attendance_records.location_id nullable (gps_only workers may not have a location)
ALTER TABLE public.attendance_records
  ALTER COLUMN location_id DROP NOT NULL;

-- =====================================================
-- 3. ADD qr_type TO QR_CODES
-- =====================================================

ALTER TABLE public.qr_codes
  ADD COLUMN qr_type text NOT NULL DEFAULT 'dynamic'
  CHECK (qr_type IN ('static', 'dynamic'));

-- =====================================================
-- 4. MIGRATE EXISTING WORKERS
-- =====================================================

UPDATE public.workers w
SET check_in_mode = CASE
  WHEN l.check_in_mode = 'gps_only' THEN 'gps_only'
  ELSE 'dynamic_qr'
END
FROM public.locations l
WHERE w.location_id = l.id;

-- =====================================================
-- 5. DEPRECATE check_in_mode ON LOCATIONS
-- =====================================================

COMMENT ON COLUMN public.locations.check_in_mode IS
  'DEPRECATED: check_in_mode has moved to workers table. Kept for backward compatibility.';
