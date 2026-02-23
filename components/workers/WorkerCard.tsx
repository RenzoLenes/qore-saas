import Link from 'next/link';
import { User, MapPin, Clock, CalendarCheck } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { formatTenantTime } from '@/lib/timezone';
import type { Worker } from '@/lib/types';

const statusBadge: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  active: 'success',
  leave: 'info',
  inactive: 'error',
};

const statusLabel: Record<string, string> = {
  active: 'Activo',
  leave: 'Permiso',
  inactive: 'Inactivo',
};

interface WorkerCardProps {
  worker: Worker & {
    today_check_in?: string;
    hours_today: number;
    hours_month: number;
  };
  timezone: string;
}

export default function WorkerCard({ worker, timezone }: WorkerCardProps) {
  const locationName = (worker.location as unknown as { name: string })?.name ?? '—';
  const initials = worker.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <Link
      href={`/workers/${worker.id}`}
      className="group rounded-xl border border-border bg-surface-raised p-5 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 block"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <h3 className="text-sm font-bold group-hover:text-brand transition-colors">{worker.name}</h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{worker.position}</p>
          </div>
        </div>
        <Badge variant={statusBadge[worker.status] ?? 'default'}>
          {statusLabel[worker.status] ?? worker.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-surface p-2.5">
          <Clock className="h-3.5 w-3.5 text-[var(--text-muted)] mx-auto mb-1" />
          <p className="text-sm font-bold">{worker.hours_today > 0 ? `${worker.hours_today}h` : '—'}</p>
          <p className="text-[10px] text-[var(--text-muted)]">Hoy</p>
        </div>
        <div className="rounded-lg bg-surface p-2.5">
          <CalendarCheck className="h-3.5 w-3.5 text-[var(--text-muted)] mx-auto mb-1" />
          <p className="text-sm font-bold">{worker.hours_month}h</p>
          <p className="text-[10px] text-[var(--text-muted)]">Mes</p>
        </div>
        <div className="rounded-lg bg-surface p-2.5">
          <div className="h-3.5 w-3.5 mx-auto mb-1 flex items-center justify-center">
            <span className={`inline-block h-2 w-2 rounded-full ${worker.today_check_in ? 'bg-emerald-500' : 'bg-[var(--text-muted)]'}`} />
          </div>
          <p className="text-sm font-bold">
            {worker.today_check_in
              ? formatTenantTime(worker.today_check_in, timezone)
              : '—'}
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">Entrada</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <MapPin className="h-3 w-3 flex-shrink-0" />
        <span className="truncate">{locationName}</span>
      </div>
    </Link>
  );
}
