# Subscription Cancellation & Expiration Design

## Context

QORE uses MercadoPago subscriptions (PreApproval API) for billing. We need to handle:
- User-initiated cancellation from the app
- Access continuation until end of paid period
- Automatic plan reversion after expiration
- Guest subscribers who can't manage via MercadoPago portal

## Policy

- **No refunds.** Standard B2B SaaS practice.
- **Access until end of period.** After cancelling, the user keeps their plan until `next_payment_date`.
- **Definitive cancellation.** MercadoPago `status: cancelled` (not paused). To re-subscribe, user goes through full payment flow again.

## User Flow

1. Owner goes to `/billing` → clicks **"Cancelar suscripción"**
2. Confirmation modal: "Tu plan {plan} seguirá activo hasta el {fecha}. Después pasarás al plan gratuito."
3. On confirm → `POST /api/mercadopago/cancel`
4. UI shows yellow badge: "Cancela el {fecha}" + "Suscribirse de nuevo" button
5. User continues using the plan normally until expiration
6. After expiration → tenant reverts to `trial`

## Technical Implementation

### 1. DB Migration

```sql
ALTER TABLE subscriptions ADD COLUMN access_expires_at timestamptz;
```

### 2. New API Route: `POST /api/mercadopago/cancel`

```
Auth check (owner only)
→ Fetch subscription from DB (must be status = 'authorized')
→ PUT /preapproval/{id} with status: 'cancelled' to MercadoPago
→ Update DB: status = 'cancelled', access_expires_at = next_payment_date
→ Return { success: true, expires_at }
```

### 3. Webhook Update

When `status === 'cancelled'` arrives:
- Set `access_expires_at = next_payment_date` BEFORE clearing `next_payment_date`
- Set `next_payment_date = null`
- Do NOT revert tenant plan immediately

When `status === 'authorized'`:
- Clear `access_expires_at` (subscription is active again)

### 4. Expiration — Double Layer

**pg_cron (Supabase, daily at midnight):**
```sql
SELECT cron.schedule('expire-subscriptions', '0 0 * * *', $$
  WITH expired AS (
    SELECT tenant_id FROM subscriptions
    WHERE status = 'cancelled'
    AND access_expires_at < now()
  )
  UPDATE tenants SET plan = 'trial'
  WHERE id IN (SELECT tenant_id FROM expired);

  DELETE FROM subscriptions
  WHERE status = 'cancelled'
  AND access_expires_at < now();
$$);
```

**Real-time validation (server component in dashboard layout):**
```
On page load:
  If subscription.status = 'cancelled' AND access_expires_at < now():
    → Update tenant.plan = 'trial'
    → Delete subscription record
```

### 5. UI Changes (BillingClient)

**Active subscription (`status === 'authorized'`):**
- Show current plan with green badge "Activo"
- Show "Cancelar suscripción" button (secondary/danger)

**Cancelled but not expired (`status === 'cancelled'` AND `access_expires_at > now()`):**
- Show current plan with yellow badge "Cancela el {fecha}"
- Show "Suscribirse de nuevo" button (primary)
- Hide cancel button

**Expired or no subscription:**
- Show trial plan
- Show plan cards to subscribe

### 6. Files to Modify

| File | Change |
|------|--------|
| `supabase/migrations/010_subscription_expires.sql` | Add `access_expires_at` column |
| `app/api/mercadopago/cancel/route.ts` | New cancel API |
| `app/api/mercadopago/webhook/route.ts` | Don't revert plan on cancel, save expires_at |
| `components/billing/BillingClient.tsx` | Cancel button, modal, expired state UI |
| `app/(dashboard)/billing/page.tsx` | Pass expires_at to client |
| `app/(dashboard)/layout.tsx` or server component | Real-time expiration check |
| Supabase SQL Editor | pg_cron job |

## Sources

- [SaaStr - Good Refund Policy for SaaS](https://www.saastr.com/good-refund-policy-saas-product/)
- [PayProGlobal - SaaS Refund Policy](https://payproglobal.com/how-to/set-up-saas-refund-policy/)
- [MercadoPago - Subscription Management](https://www.mercadopago.com.co/developers/en/docs/subscriptions/subscription-management)
- [TermsFeed - Refund Policy for SaaS](https://www.termsfeed.com/blog/saas-refund-policy/)
