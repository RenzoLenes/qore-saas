import Link from 'next/link';
import { MapPin, Users, QrCode } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { Location } from '@/lib/types';

export default function LocationCard({ location }: { location: Location }) {
  const workerCount = location.worker_count ?? 0;
  const attendance = location.today_attendance ?? 0;
  const percentage = workerCount > 0 ? Math.round((attendance / workerCount) * 100) : 0;

  return (
    <Link
      href={`/locations/${location.id}`}
      className="group rounded-xl border border-border bg-surface-raised p-5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 block"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold group-hover:text-brand transition-colors">{location.name}</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{location.address}</p>
          </div>
        </div>
        <Badge variant={location.status === 'active' ? 'success' : 'default'}>
          {location.status === 'active' ? 'Activa' : 'Inactiva'}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-surface p-2.5">
          <Users className="h-3.5 w-3.5 text-[var(--text-muted)] mx-auto mb-1" />
          <p className="text-sm font-bold">{workerCount}</p>
          <p className="text-[10px] text-[var(--text-muted)]">Trabajadores</p>
        </div>
        <div className="rounded-lg bg-surface p-2.5">
          <QrCode className="h-3.5 w-3.5 text-[var(--text-muted)] mx-auto mb-1" />
          <p className="text-sm font-bold">{attendance}</p>
          <p className="text-[10px] text-[var(--text-muted)]">Presentes</p>
        </div>
        <div className="rounded-lg bg-surface p-2.5">
          <div className="h-3.5 w-3.5 mx-auto mb-1 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[var(--text-muted)]">%</span>
          </div>
          <p className={`text-sm font-bold ${percentage >= 90 ? 'text-emerald-500' : percentage >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
            {percentage}%
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">Asistencia</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span>{location.schedule}</span>
        <span>Radio: {location.gps_radius}m</span>
      </div>
    </Link>
  );
}
