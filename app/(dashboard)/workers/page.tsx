import Link from 'next/link';
import { Plus, Users } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WorkerCard from '@/components/workers/WorkerCard';
import { getWorkers } from '@/lib/queries/payroll';
import { getTenantTimezone } from '@/lib/timezone';

export default async function WorkersPage() {
  const [workers, timezone] = await Promise.all([
    getWorkers(),
    getTenantTimezone(),
  ]);
  const activeCount = workers.filter((w) => w.status === 'active').length;
  const onLeaveCount = workers.filter((w) => w.status === 'leave').length;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Trabajadores' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Gestión de Personal</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {workers.length} trabajadores · {activeCount} activos{onLeaveCount > 0 ? ` · ${onLeaveCount} en permiso` : ''}
          </p>
        </div>
        <Link
          href="/workers/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 h-10 text-sm font-semibold text-slate-900 hover:bg-brand-dark transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo Trabajador
        </Link>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: workers.length, color: 'text-brand bg-brand/10' },
          { label: 'Activos', value: activeCount, color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'En Permiso', value: onLeaveCount, color: 'text-amber-500 bg-amber-500/10' },
          { label: 'Inactivos', value: workers.length - activeCount - onLeaveCount, color: 'text-red-500 bg-red-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-surface-raised p-4 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} flex-shrink-0`}>
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {workers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface-raised p-12 text-center">
          <Users className="h-10 w-10 text-[var(--text-muted)] mx-auto mb-3" />
          <p className="text-sm font-semibold mb-1">Sin trabajadores registrados</p>
          <p className="text-xs text-[var(--text-muted)] mb-4">Agrega al personal que marcará asistencia</p>
          <Link
            href="/workers/new"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 h-10 text-sm font-semibold text-slate-900 hover:bg-brand-dark transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar Trabajador
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} timezone={timezone} />
          ))}
        </div>
      )}
    </div>
  );
}
