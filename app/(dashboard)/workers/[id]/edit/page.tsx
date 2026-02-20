import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EditWorkerForm from '@/components/workers/EditWorkerForm';
import { getWorkerById } from '@/lib/queries/payroll';
import { getLocations } from '@/lib/queries/locations';
import { getCurrentProfile } from '@/lib/auth';

export default async function EditWorkerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [worker, locations, profile] = await Promise.all([
    getWorkerById(id),
    getLocations(),
    getCurrentProfile(),
  ]);

  if (!worker) notFound();
  if (!profile?.tenant_id) redirect('/login');

  const activeLocations = locations.filter((l) => l.status === 'active');
  const defaultEntryMode = profile.tenant?.default_entry_mode ?? 'dynamic_qr';
  const defaultExitMode = profile.tenant?.default_exit_mode ?? 'gps_only';

  return (
    <div className="space-y-6 max-w-2xl">
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Trabajadores', href: '/workers' },
        { label: worker.name, href: `/workers/${worker.id}` },
        { label: 'Editar' },
      ]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Editar Trabajador</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Modifica los datos de {worker.name}</p>
      </div>

      <EditWorkerForm
        worker={worker}
        locations={activeLocations}
        defaultEntryMode={defaultEntryMode}
        defaultExitMode={defaultExitMode}
      />
    </div>
  );
}
