-- QORE SaaS — Worker Check-in/Check-out System
-- Adds: check_in_mode to locations, user_id to workers, RLS for workers

-- =====================================================
-- 1. SCHEMA CHANGES
-- =====================================================

-- Add check-in mode to locations (qr_gps = QR scan + GPS, gps_only = GPS validation only)
ALTER TABLE public.locations
  ADD COLUMN check_in_mode text NOT NULL DEFAULT 'qr_gps'
  CHECK (check_in_mode IN ('qr_gps', 'gps_only'));

-- Link workers to auth.users for login
ALTER TABLE public.workers
  ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE;

CREATE INDEX idx_workers_user_id ON public.workers (user_id) WHERE user_id IS NOT NULL;

-- =====================================================
-- 2. UPDATE TRIGGER (support tenant_id in metadata)
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, full_name, role, tenant_id)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'admin'),
    (new.raw_user_meta_data->>'tenant_id')::uuid
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. RLS POLICIES FOR WORKERS
-- =====================================================

-- Workers can view their own worker record
CREATE POLICY "Workers can view own worker record"
  ON public.workers FOR SELECT
  USING (user_id = auth.uid());

-- Workers can insert their own attendance records
CREATE POLICY "Workers can insert own attendance"
  ON public.attendance_records FOR INSERT
  WITH CHECK (
    worker_id IN (SELECT id FROM public.workers WHERE user_id = auth.uid())
    AND tenant_id IN (SELECT tenant_id FROM public.users WHERE id = auth.uid())
  );

-- Workers can view their own attendance records
CREATE POLICY "Workers can view own attendance"
  ON public.attendance_records FOR SELECT
  USING (
    worker_id IN (SELECT id FROM public.workers WHERE user_id = auth.uid())
  );

-- Workers can view active QR codes for their assigned location
CREATE POLICY "Workers can view location QR codes"
  ON public.qr_codes FOR SELECT
  USING (
    location_id IN (SELECT location_id FROM public.workers WHERE user_id = auth.uid())
    AND is_active = true
  );
