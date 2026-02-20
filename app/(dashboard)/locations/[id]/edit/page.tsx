import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EditLocationForm from '@/components/locations/EditLocationForm';
import { getLocationById } from '@/lib/queries/locations';

export default async function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const location = await getLocationById(id);
  if (!location) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sedes', href: '/locations' }, { label: location.name, href: `/locations/${location.id}` }, { label: 'Editar' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Editar Sede</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Modifica la configuración de {location.name}</p>
      </div>

      <EditLocationForm location={location} />
    </div>
  );
}
