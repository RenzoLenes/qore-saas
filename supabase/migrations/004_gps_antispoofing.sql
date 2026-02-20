-- QORE SaaS — GPS Anti-Spoofing
-- Adds GPS metadata and suspicious flag to attendance_records

-- 1. GPS metadata JSONB: { accuracy, altitude, altitudeAccuracy, speed, heading }
ALTER TABLE public.attendance_records
  ADD COLUMN gps_metadata jsonb;

-- 2. Suspicious flag for quick filtering
ALTER TABLE public.attendance_records
  ADD COLUMN gps_suspicious boolean NOT NULL DEFAULT false;

-- 3. Flags array for specific spoofing indicators
ALTER TABLE public.attendance_records
  ADD COLUMN gps_flags text[] NOT NULL DEFAULT '{}';

-- 4. Partial index for querying suspicious records
CREATE INDEX idx_attendance_suspicious
  ON public.attendance_records (tenant_id, gps_suspicious)
  WHERE gps_suspicious = true;
