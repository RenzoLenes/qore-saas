import Breadcrumb from '@/components/ui/Breadcrumb';
import NewWorkerForm from '@/components/workers/NewWorkerForm';
import { getLocations } from '@/lib/queries/locations';
import { getCurrentProfile } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function NewWorkerPage() {
  const profile = await getCurrentProfile();
  if (!profile?.tenant_id) redirect('/login');

  const locations = await getLocations();
  const activeLocations = locations.filter((l) => l.status === 'active');

  const defaultEntryMode = profile.tenant?.default_entry_mode ?? 'dynamic_qr';
  const defaultExitMode = profile.tenant?.default_exit_mode ?? 'gps_only';

  return (
    <div className="space-y-6 max-w-2xl">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Trabajadores', href: '/workers' }, { label: 'Nuevo Trabajador' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Agregar Trabajador</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Registra un nuevo miembro del personal</p>
      </div>

      <NewWorkerForm
        locations={activeLocations}
        defaultEntryMode={defaultEntryMode}
        defaultExitMode={defaultExitMode}
      />
    </div>
  );
}
