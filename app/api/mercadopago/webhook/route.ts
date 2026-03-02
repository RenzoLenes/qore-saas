import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getPreApproval } from '@/lib/mercadopago';

function verifySignature(xSignature: string, xRequestId: string | null, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('MERCADOPAGO_WEBHOOK_SECRET not configured — skipping signature verification');
    return true; // Allow in dev, but log warning
  }

  // Parse ts and v1 from x-signature header
  const parts = Object.fromEntries(
    xSignature.split(',').map((p) => {
      const [key, ...val] = p.trim().split('=');
      return [key, val.join('=')];
    }),
  );

  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  // Build manifest string as per MercadoPago docs
  const manifest = `id:${dataId};request-id:${xRequestId ?? ''};ts:${ts};`;
  const hmac = createHmac('sha256', secret).update(manifest).digest('hex');

  return hmac === v1;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Verify webhook signature
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    if (xSignature && !verifySignature(xSignature, xRequestId, data?.id ?? '')) {
      console.error('MercadoPago webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Handle subscription_preapproval: data.id is the preapproval ID
    // Handle subscription_authorized_payment: look up pending subscriptions and re-check
    if (type === 'subscription_authorized_payment') {
      // A payment was made — re-check all pending subscriptions
      const { data: pendingSubs } = await supabaseAdmin
        .from('subscriptions')
        .select('mp_preapproval_id, tenant_id')
        .eq('status', 'pending');

      if (pendingSubs && pendingSubs.length > 0) {
        const preApproval = getPreApproval();
        for (const sub of pendingSubs) {
          try {
            const mpData = await preApproval.get({ id: sub.mp_preapproval_id });
            if (mpData?.status === 'authorized') {
              await supabaseAdmin
                .from('subscriptions')
                .update({
                  status: 'authorized',
                  next_payment_date: mpData.next_payment_date ?? null,
                  last_payment_date: mpData.last_modified ?? null,
                  updated_at: new Date().toISOString(),
                })
                .eq('mp_preapproval_id', sub.mp_preapproval_id);

              const { data: subRecord } = await supabaseAdmin
                .from('subscriptions')
                .select('plan')
                .eq('mp_preapproval_id', sub.mp_preapproval_id)
                .single();

              if (subRecord) {
                await supabaseAdmin
                  .from('tenants')
                  .update({ plan: subRecord.plan })
                  .eq('id', sub.tenant_id);
              }
            }
          } catch (err) {
            console.error('Error re-checking subscription:', sub.mp_preapproval_id, err);
          }
        }
      }
      return NextResponse.json({ received: true });
    }

    if (type !== 'subscription_preapproval') {
      return NextResponse.json({ received: true });
    }

    const preapprovalId = data?.id;
    if (!preapprovalId) {
      return NextResponse.json({ received: true }); // Return 200 to avoid retries
    }

    // Fetch the preapproval from MercadoPago to get current status
    const preApproval = getPreApproval();
    const mpData = await preApproval.get({ id: preapprovalId });

    if (!mpData) {
      console.error('Failed to fetch preapproval:', preapprovalId);
      return NextResponse.json({ received: true }); // Return 200 — permanent failure
    }

    const tenantId = mpData.external_reference;
    const status = mpData.status; // pending, authorized, paused, cancelled

    // Update subscription record
    const isCancelled = status === 'cancelled' || status === 'paused';
    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: status ?? 'pending',
        // On cancel: save expiration date before clearing next_payment_date
        access_expires_at: isCancelled ? (mpData.next_payment_date ?? null) : null,
        next_payment_date: isCancelled ? null : (mpData.next_payment_date ?? null),
        last_payment_date: mpData.last_modified ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('mp_preapproval_id', preapprovalId);

    // If authorized, update tenant plan and clear expiration
    if (status === 'authorized' && tenantId) {
      const { data: sub } = await supabaseAdmin
        .from('subscriptions')
        .select('plan')
        .eq('mp_preapproval_id', preapprovalId)
        .single();

      if (sub) {
        await supabaseAdmin
          .from('tenants')
          .update({ plan: sub.plan })
          .eq('id', tenantId);
      }
    }

    // If cancelled or paused: keep access until access_expires_at.
    // If no expiration date available, revert to trial immediately as fallback.
    if (isCancelled && tenantId) {
      const hasExpirationDate = mpData.next_payment_date != null;
      if (!hasExpirationDate) {
        // Check if cancel API already set access_expires_at
        const { data: existingSub } = await supabaseAdmin
          .from('subscriptions')
          .select('access_expires_at')
          .eq('mp_preapproval_id', preapprovalId)
          .single();

        if (!existingSub?.access_expires_at) {
          await supabaseAdmin
            .from('tenants')
            .update({ plan: 'trial' })
            .eq('id', tenantId);
        }
      }
    }

    return NextResponse.json({ received: true, status });

  } catch (error) {
    console.error('MercadoPago webhook error:', error);
    // Return 200 on unexpected errors to prevent infinite MercadoPago retries
    return NextResponse.json({ received: true, error: 'Processing failed' });
  }
}
