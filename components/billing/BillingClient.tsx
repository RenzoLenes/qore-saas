'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Crown, Zap, Building2, Users, CreditCard, ExternalLink, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { PLANS, type PlanId, formatLimit } from '@/lib/plans';

interface Subscription {
  plan: string;
  status: string;
  mp_preapproval_id: string | null;
  next_payment_date: string | null;
  last_payment_date: string | null;
  access_expires_at: string | null;
}

interface BillingClientProps {
  currentPlan: string;
  subscription: Subscription | null;
  usage: {
    workers: number;
    locations: number;
  };
}

const PLAN_LIST = [
  { ...PLANS.starter, description: 'Para equipos pequeños' },
  { ...PLANS.professional, description: 'Para empresas en crecimiento', popular: true },
  { ...PLANS.business, description: 'Para operaciones grandes' },
] as const;

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BillingClient({ currentPlan, subscription, usage }: BillingClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    setError(null);
    try {
      const res = await fetch('/api/mercadopago/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError(data.error || 'Error al procesar la suscripción');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    setCancelLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/mercadopago/cancel', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setShowCancelConfirm(false);
        router.refresh();
      } else {
        setError(data.error || 'Error al cancelar la suscripción');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setCancelLoading(false);
    }
  };

  const isActive = subscription?.status === 'authorized';
  const isCancelled = subscription?.status === 'cancelled';
  const isCancelledNotExpired = isCancelled && subscription?.access_expires_at &&
    new Date(subscription.access_expires_at) > new Date();
  const isTrial = currentPlan === 'trial';
  const currentPlanConfig = PLANS[currentPlan as PlanId];

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Cancel confirmation modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface-raised p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">Cancelar suscripción</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Tu plan <span className="font-semibold capitalize">{currentPlan}</span> seguirá activo hasta el{' '}
              <span className="font-semibold">
                {subscription?.next_payment_date ? formatDate(subscription.next_payment_date) : 'fin del periodo'}
              </span>
              . Después pasarás al plan gratuito.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              No se realizarán más cobros. No hay reembolso por el periodo actual.
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1"
                disabled={cancelLoading}
              >
                Mantener plan
              </Button>
              <Button
                variant="primary"
                onClick={handleCancel}
                loading={cancelLoading}
                className="flex-1 !bg-red-500 hover:!bg-red-600"
              >
                Sí, cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Current Plan Card */}
      <div className="rounded-xl border border-border bg-surface-raised p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold capitalize">
                  {isTrial ? 'Prueba Gratuita' : `Plan ${currentPlan}`}
                </h3>
                {isActive && <Badge variant="success">Activo</Badge>}
                {isCancelledNotExpired && <Badge variant="warning">Cancela el {formatDate(subscription!.access_expires_at!)}</Badge>}
                {isTrial && <Badge variant="warning">Trial</Badge>}
                {!isActive && !isCancelledNotExpired && !isTrial && (
                  <Badge variant="info">{subscription?.status ?? 'Sin plan'}</Badge>
                )}
              </div>
              {isActive && subscription?.next_payment_date && (
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  Próximo cobro: {formatDate(subscription.next_payment_date)}
                </p>
              )}
              {isCancelledNotExpired && (
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  Tu plan sigue activo hasta la fecha indicada
                </p>
              )}
              {isTrial && (
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  Limitado a 5 trabajadores y 1 sede
                </p>
              )}
            </div>
          </div>
          {isActive && (
            <Button
              variant="secondary"
              onClick={() => setShowCancelConfirm(true)}
              className="text-red-500 border-red-500/20 hover:bg-red-500/10"
            >
              Cancelar suscripción
            </Button>
          )}
        </div>
      </div>

      {/* Usage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 flex-shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Trabajadores Activos</p>
            <p className="text-xl font-extrabold mt-0.5">{usage.workers}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              de {isTrial ? 5 : formatLimit(currentPlanConfig?.maxWorkers ?? 0)} permitidos
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 flex-shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Sedes Activas</p>
            <p className="text-xl font-extrabold mt-0.5">{usage.locations}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              de {isTrial ? 1 : formatLimit(currentPlanConfig?.maxLocations ?? 0)} permitidas
            </p>
          </div>
        </div>
      </div>

      {/* Plan Cards */}
      <div>
        <h3 className="text-lg font-bold mb-4">
          {isTrial || isCancelledNotExpired ? 'Elige tu plan' : 'Cambiar plan'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {PLAN_LIST.map((plan) => {
            const isCurrent = plan.id === currentPlan && !isCancelledNotExpired;
            const isHighlighted = 'popular' in plan && plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-xl border p-6 ${
                  isHighlighted
                    ? 'border-2 border-brand shadow-lg shadow-brand/10'
                    : 'border-border'
                } bg-surface-raised`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-bold text-slate-900">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-base font-bold">{plan.name}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{plan.description}</p>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold">S/{plan.price}</span>
                  <span className="text-[var(--text-muted)] text-sm ml-1">/mes</span>
                </div>

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Check className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <Button variant="secondary" disabled className="w-full">
                    Plan Actual
                  </Button>
                ) : (
                  <Button
                    variant={isHighlighted ? 'primary' : 'secondary'}
                    onClick={() => handleSubscribe(plan.id)}
                    loading={loading === plan.id}
                    className="w-full"
                  >
                    <Zap className="h-4 w-4" />
                    {isTrial || isCancelledNotExpired ? 'Comenzar' : 'Cambiar a'} {plan.name}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment info */}
      <div className="rounded-xl border border-border bg-surface-raised p-5">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="h-4 w-4 text-[var(--text-muted)]" />
          <h4 className="text-sm font-semibold">Información de pago</h4>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          Los pagos se procesan de forma segura a través de MercadoPago. Puedes cancelar tu suscripción en cualquier momento.
        </p>
        {subscription?.mp_preapproval_id && isActive && (
          <a
            href="https://www.mercadopago.com.pe/subscriptions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-brand hover:underline mt-2"
          >
            Gestionar en MercadoPago <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
