import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { getCurrentProfile } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  if (profile?.role === 'worker') redirect('/worker');

  // Real-time expiration check: if cancelled subscription has expired, revert to trial
  if (profile?.tenant_id) {
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('id, status, access_expires_at')
      .eq('tenant_id', profile.tenant_id)
      .eq('status', 'cancelled')
      .not('access_expires_at', 'is', null)
      .maybeSingle();

    if (sub?.access_expires_at && new Date(sub.access_expires_at) < new Date()) {
      await supabaseAdmin
        .from('tenants')
        .update({ plan: 'trial' })
        .eq('id', profile.tenant_id);

      await supabaseAdmin
        .from('subscriptions')
        .delete()
        .eq('id', sub.id);
    }
  }

  const user = profile
    ? {
        name: profile.full_name,
        initials: profile.full_name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        role: profile.role === 'owner' ? 'Propietario' : profile.role === 'admin' ? 'Admin' : 'Viewer',
        tenantName: profile.tenant?.name ?? '',
      }
    : null;

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar user={user} />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
