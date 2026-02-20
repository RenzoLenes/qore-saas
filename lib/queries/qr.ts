import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import type { QRType } from '@/lib/types';

export const getActiveQRForLocation = cache(async (locationId: string): Promise<{ token: string; expires_at: string | null; qr_type: QRType } | null> => {
  const [supabase, profile] = await Promise.all([
    createServerSupabaseClient(),
    getCurrentProfile(),
  ]);

  if (!profile?.tenant_id) return null;

  const { data } = await supabase
    .from('qr_codes')
    .select('token, expires_at, qr_type')
    .eq('location_id', locationId)
    .eq('tenant_id', profile.tenant_id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!data) return null;
  return { token: data.token, expires_at: data.expires_at, qr_type: data.qr_type as QRType };
});
