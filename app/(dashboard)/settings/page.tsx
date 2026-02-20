import { redirect } from 'next/navigation';
import { getCurrentProfile } from '@/lib/auth';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SettingsForm from '@/components/dashboard/SettingsForm';

export default async function SettingsPage() {
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== 'owner') {
    redirect('/dashboard');
  }

  const { default_entry_mode, default_exit_mode, name, plan } = profile.tenant!;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Configuración' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Configuración</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Ajustes generales de tu empresa</p>
      </div>

      <SettingsForm
        tenant={{ default_entry_mode, default_exit_mode, name, plan }}
      />
    </div>
  );
}
