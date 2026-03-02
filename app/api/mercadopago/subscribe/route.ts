import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getPreApproval, PLANS, type PlanId } from '@/lib/mercadopago';
import { rateLimit } from '@/lib/rate-limit';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.qore.io';

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, { max: 10, windowSec: 60 });
  if (limited) return limited;

  try {
    // 1. Authenticate
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    if (!user.email) {
      return NextResponse.json({ error: 'Email requerido para suscripción' }, { status: 400 });
    }

    // 2. Get tenant
    const { data: profile } = await supabase
      .from('users')
      .select('tenant_id, role, tenant:tenants(name, plan)')
      .eq('id', user.id)
      .single();

    if (!profile?.tenant_id || profile.role !== 'owner') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // 3. Parse plan from body
    const body = await request.json();
    const planId = body.plan as PlanId;
    const plan = PLANS[planId];

    if (!plan) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 });
    }

    // 4. Cancel existing subscription if any
    const { data: existingSub } = await supabaseAdmin
      .from('subscriptions')
      .select('mp_preapproval_id, status')
      .eq('tenant_id', profile.tenant_id)
      .maybeSingle();

    if (existingSub?.mp_preapproval_id && existingSub.status === 'authorized') {
      try {
        const preApproval = getPreApproval();
        await preApproval.update({
          id: existingSub.mp_preapproval_id,
          body: { status: 'cancelled' },
        });
      } catch (cancelError) {
        console.error('Failed to cancel existing subscription:', cancelError);
      }
    }

    // 5. Create MercadoPago preapproval (subscription)
    const tenant = Array.isArray(profile.tenant) ? profile.tenant[0] : profile.tenant;
    const tenantName = (tenant as { name: string } | null)?.name ?? 'QORE';

    const preApproval = getPreApproval();
    const result = await preApproval.create({
      body: {
        reason: `QORE ${plan.name} — ${tenantName}`,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: plan.price,
          currency_id: plan.currency,
        },
        payer_email: process.env.MP_TEST_PAYER_EMAIL || user.email,
        back_url: `${BASE_URL}/billing`,
        external_reference: profile.tenant_id,
        status: 'pending',
      },
    });

    if (!result.id || !result.init_point) {
      console.error('MercadoPago preapproval creation failed:', result);
      return NextResponse.json({ error: 'Error al crear la suscripción' }, { status: 500 });
    }

    // 6. Save subscription record
    await supabaseAdmin
      .from('subscriptions')
      .upsert({
        tenant_id: profile.tenant_id,
        mp_preapproval_id: result.id,
        mp_payer_email: user.email,
        plan: planId,
        status: 'pending',
      }, { onConflict: 'tenant_id' });

    return NextResponse.json({
      init_point: result.init_point,
      preapproval_id: result.id,
    });

  } catch (error) {
    console.error('MercadoPago subscribe error:', error);
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}
