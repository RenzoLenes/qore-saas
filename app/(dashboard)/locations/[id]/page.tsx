import { notFound } from 'next/navigation';
import { Users, MapPin, Clock, CalendarCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import LocationQRPanel from '@/components/locations/LocationQRPanel';
import LocationMap from '@/components/maps/LocationMap';
import { getLocationById } from '@/lib/queries/locations';
import { getActiveQRForLocation } from '@/lib/queries/qr';
import Link from 'next/link';
import type { CheckInMode } from '@/lib/types';

export default async function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [location, qrData] = await Promise.all([
    getLocationById(id),
    getActiveQRForLocation(id),
  ]);
  if (!location) notFound();

  const tenant = location.tenant as unknown as { default_entry_mode: CheckInMode; default_exit_mode: CheckInMode } | null;
  const effectiveEntryMode: CheckInMode = location.entry_mode ?? tenant?.default_entry_mode ?? 'dynamic_qr';

  const workerCount = location.worker_count ?? 0;
  const attendance = location.today_attendance ?? 0;
  const percentage = workerCount > 0 ? Math.round((attendance / workerCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sedes', href: '/locations' }, { label: location.name }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{location.name}</h1>
              <Badge variant={location.status === 'active' ? 'success' : 'default'}>
                {location.status === 'active' ? 'Activa' : 'Inactiva'}
              </Badge>
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{location.address}</p>
          </div>
        </div>
        <Link
          href={`/locations/${location.id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 h-10 text-sm font-semibold hover:bg-surface transition-colors"
        >
          Editar Sede
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Panel */}
        <LocationQRPanel
          locationId={location.id}
          locationName={location.name}
          locationAddress={location.address}
          effectiveEntryMode={effectiveEntryMode}
          initialQR={qrData}
        />

        {/* Stats */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Users className="h-5 w-5 text-brand mx-auto mb-2" />
                <p className="text-2xl font-extrabold">{workerCount}</p>
                <p className="text-xs text-[var(--text-muted)]">Total trabajadores</p>
              </div>
              <div className="text-center">
                <CalendarCheck className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                <p className="text-2xl font-extrabold">{attendance}</p>
                <p className="text-xs text-[var(--text-muted)]">Presentes hoy</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <h3 className="text-sm font-semibold mb-3">Detalles</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)]">{location.schedule}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)]">Radio GPS: {location.gps_radius}m</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CalendarCheck className="h-4 w-4 text-[var(--text-muted)]" />
                <span className="text-[var(--text-secondary)]">Asistencia: {percentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <LocationMap
          className="h-full min-h-[300px]"
          markers={[{
            id: location.id,
            lat: location.lat,
            lng: location.lng,
            name: location.name,
            gps_radius: location.gps_radius,
          }]}
          center={{ lat: location.lat, lng: location.lng }}
          zoom={15}
        />
      </div>
    </div>
  );
}
