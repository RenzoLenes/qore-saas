import { redirect } from 'next/navigation';
import { getCurrentProfile } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Breadcrumb from '@/components/ui/Breadcrumb';
import BillingClient from '@/components/billing/BillingClient';

export const metadata = { title: 'Facturación' };

export default async function BillingPage() {
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== 'owner') {
    redirect('/dashboard');
  }

  if (!profile.tenant) {
    redirect('/onboarding');
  }

  const supabase = await createServerSupabaseClient();

  // Get subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .maybeSingle();

  // Get current usage
  const { count: workerCount } = await supabase
    .from('workers')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', profile.tenant_id)
    .eq('status', 'active');

  const { count: locationCount } = await supabase
    .from('locations')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', profile.tenant_id)
    .eq('status', 'active');

  const currentPlan = profile.tenant.plan || 'trial';

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Facturación' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Facturación</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Administra tu plan y suscripción</p>
      </div>

      <BillingClient
        currentPlan={currentPlan}
        subscription={subscription}
        usage={{
          workers: workerCount ?? 0,
          locations: locationCount ?? 0,
        }}
      />
    </div>
  );
}
