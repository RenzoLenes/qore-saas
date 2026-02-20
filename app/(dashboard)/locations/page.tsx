import Link from 'next/link';
import { Plus } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import LocationCard from '@/components/locations/LocationCard';
import LocationMap from '@/components/maps/LocationMap';
import { getLocations } from '@/lib/queries/locations';

export default async function LocationsPage() {
  const locations = await getLocations();
  const activeCount = locations.filter((l) => l.status === 'active').length;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sedes' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Gestión de Sedes</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{locations.length} sedes · {activeCount} activas</p>
        </div>
        <Link
          href="/locations/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 h-10 text-sm font-semibold text-slate-900 hover:bg-brand-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nueva Sede
        </Link>
      </div>

      <LocationMap
        className="h-64"
        markers={locations.map((l) => ({
          id: l.id,
          lat: l.lat,
          lng: l.lng,
          name: l.name,
          gps_radius: l.gps_radius,
        }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
