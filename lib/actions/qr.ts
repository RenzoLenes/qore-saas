'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCurrentProfile } from '@/lib/auth';
import type { QRType } from '@/lib/types';

export async function regenerateQR(locationId: string, qrType: QRType = 'dynamic') {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id || !['owner', 'admin'].includes(profile.role)) {
    return { error: 'No tienes permisos para regenerar QR.' };
  }

  const supabase = await createServerSupabaseClient();

  // Deactivate existing QR codes of the same type for this location
  await supabase
    .from('qr_codes')
    .update({ is_active: false })
    .eq('location_id', locationId)
    .eq('tenant_id', profile.tenant_id)
    .eq('qr_type', qrType);

  // Create new QR code
  const { data, error } = await supabase
    .from('qr_codes')
    .insert({
      location_id: locationId,
      tenant_id: profile.tenant_id,
      qr_type: qrType,
      ...(qrType === 'static' ? { expires_at: null } : {}),
    })
    .select()
    .single();

  if (error) {
    return { error: 'Error al regenerar QR. Intenta de nuevo.' };
  }

  revalidatePath('/qr');
  revalidatePath(`/locations/${locationId}`);
  return { token: data.token, expires_at: data.expires_at, qr_type: qrType };
}

/**
 * Fetches any active QR for a location regardless of type.
 * Returns the most recent active QR (prefers non-expired dynamic, then static).
 */
export async function getLocationActiveQR(
  locationId: string,
): Promise<{ token: string; expires_at: string | null; qr_type: QRType } | null> {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id) return null;

  const supabase = await createServerSupabaseClient();

  // Try non-expired dynamic first
  const { data: dynamic } = await supabase
    .from('qr_codes')
    .select('token, expires_at, qr_type')
    .eq('location_id', locationId)
    .eq('tenant_id', profile.tenant_id)
    .eq('is_active', true)
    .eq('qr_type', 'dynamic')
    .gte('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (dynamic) {
    return { token: dynamic.token, expires_at: dynamic.expires_at, qr_type: 'dynamic' };
  }

  // Fallback to static
  const { data: staticQr } = await supabase
    .from('qr_codes')
    .select('token, expires_at, qr_type')
    .eq('location_id', locationId)
    .eq('tenant_id', profile.tenant_id)
    .eq('is_active', true)
    .eq('qr_type', 'static')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (staticQr) {
    return { token: staticQr.token, expires_at: staticQr.expires_at, qr_type: 'static' };
  }

  return null;
}

export async function getActiveQR(
  locationId: string,
  qrType: QRType = 'dynamic',
): Promise<{ token: string; expires_at: string | null; qr_type: QRType } | { error: string }> {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id) {
    return { error: 'No autenticado.' };
  }

  const supabase = await createServerSupabaseClient();

  // Build query based on QR type
  let query = supabase
    .from('qr_codes')
    .select('token, expires_at, qr_type')
    .eq('location_id', locationId)
    .eq('tenant_id', profile.tenant_id)
    .eq('qr_type', qrType)
    .eq('is_active', true);

  // Dynamic QR codes must not be expired
  if (qrType === 'dynamic') {
    query = query.gte('expires_at', new Date().toISOString());
  }

  const { data: existing } = await query
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (existing) {
    return { token: existing.token, expires_at: existing.expires_at, qr_type: qrType };
  }

  // No active QR — create one automatically
  const { data: created, error } = await supabase
    .from('qr_codes')
    .insert({
      location_id: locationId,
      tenant_id: profile.tenant_id,
      qr_type: qrType,
      ...(qrType === 'static' ? { expires_at: null } : {}),
    })
    .select('token, expires_at, qr_type')
    .single();

  if (error || !created) {
    return { error: 'Error al obtener QR.' };
  }

  return { token: created.token, expires_at: created.expires_at, qr_type: qrType };
}
