-- Add access_expires_at column to track when cancelled subscriptions lose access
ALTER TABLE public.subscriptions ADD COLUMN access_expires_at timestamptz;

-- Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Daily job at midnight UTC: expire cancelled subscriptions
SELECT cron.schedule(
  'expire-cancelled-subscriptions',
  '0 0 * * *',
  $$
    -- Revert expired tenants to trial
    UPDATE public.tenants SET plan = 'trial'
    WHERE id IN (
      SELECT tenant_id FROM public.subscriptions
      WHERE status = 'cancelled'
      AND access_expires_at < now()
    );

    -- Clean up expired subscription records
    DELETE FROM public.subscriptions
    WHERE status = 'cancelled'
    AND access_expires_at < now();
  $$
);
