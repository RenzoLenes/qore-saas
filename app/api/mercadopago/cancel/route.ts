import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getPreApproval } from '@/lib/mercadopago';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { max: 5, windowSec: 60 });
  if (limited) return limited;

  try {
    // 1. Authenticate
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    // 2. Verify owner role
    const { data: profile } = await supabase
      .from('users')
      .select('tenant_id, role')
      .eq('id', user.id)
      .single();

    if (!profile?.tenant_id || profile.role !== 'owner') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // 3. Get active subscription
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('mp_preapproval_id, status, next_payment_date')
      .eq('tenant_id', profile.tenant_id)
      .single();

    if (!subscription || subscription.status !== 'authorized') {
      return NextResponse.json({ error: 'No hay suscripción activa' }, { status: 400 });
    }

    if (!subscription.mp_preapproval_id) {
      return NextResponse.json({ error: 'Suscripción sin ID de MercadoPago' }, { status: 400 });
    }

    // 4. Cancel in MercadoPago
    const preApproval = getPreApproval();
    await preApproval.update({
      id: subscription.mp_preapproval_id,
      body: { status: 'cancelled' },
    });

    // 5. Update DB: save expiration date, clear next_payment_date
    const expiresAt = subscription.next_payment_date;

    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: 'cancelled',
        access_expires_at: expiresAt,
        next_payment_date: null,
        updated_at: new Date().toISOString(),
      })
      .eq('tenant_id', profile.tenant_id);

    // If no expiration date, revert to trial immediately (can't determine end of period)
    if (!expiresAt) {
      await supabaseAdmin
        .from('tenants')
        .update({ plan: 'trial' })
        .eq('id', profile.tenant_id);
    }

    return NextResponse.json({
      success: true,
      expires_at: expiresAt,
    });

  } catch (error) {
    console.error('MercadoPago cancel error:', error);
    return NextResponse.json({ error: 'Error al cancelar la suscripción' }, { status: 500 });
  }
}
