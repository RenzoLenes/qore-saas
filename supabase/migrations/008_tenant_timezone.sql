-- Add timezone column to tenants table.
-- Uses IANA timezone identifiers (e.g. 'America/Lima', 'America/New_York').
-- Defaults to 'America/Lima' for existing Peruvian tenants.
ALTER TABLE public.tenants
  ADD COLUMN timezone text NOT NULL DEFAULT 'America/Lima';
