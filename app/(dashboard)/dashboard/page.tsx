import { Suspense } from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import ActivitySection from '@/components/dashboard/ActivitySection';

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-4 animate-pulse">
          <div className="h-11 w-11 rounded-xl bg-surface" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 rounded bg-surface" />
            <div className="h-7 w-16 rounded bg-surface" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-surface-raised p-5 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-4 w-32 rounded bg-surface" />
        <div className="h-3 w-20 rounded bg-surface" />
      </div>
      <div className="flex items-end gap-2 h-40">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="h-3 w-4 rounded bg-surface" />
            <div className="w-full rounded-md bg-surface" style={{ height: `${20 + Math.random() * 60}%` }} />
            <div className="h-3 w-6 rounded bg-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="lg:col-span-3 rounded-xl border border-border bg-surface-raised animate-pulse">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="h-4 w-28 rounded bg-surface" />
        <div className="h-2 w-2 rounded-full bg-surface" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <div className="h-2 w-2 rounded-full bg-surface" />
            <div className="h-3 w-28 rounded bg-surface flex-1" />
            <div className="h-3 w-16 rounded bg-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Resumen general de asistencia</p>
      </div>

      {/* Stats Grid */}
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <WeeklyChart />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <ActivitySection />
        </Suspense>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border bg-surface-raised p-5">
        <h3 className="text-sm font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Generar QR', href: '/qr', color: 'text-brand bg-brand/10' },
            { label: 'Nueva Sede', href: '/locations/new', color: 'text-violet-500 bg-violet-500/10' },
            { label: 'Ver Planillas', href: '/payroll', color: 'text-emerald-500 bg-emerald-500/10' },
            { label: 'Exportar Reporte', href: '#', color: 'text-amber-500 bg-amber-500/10' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-surface transition-colors"
            >
              <div className={`h-2 w-2 rounded-full ${action.color.split(' ')[0].replace('text-', 'bg-')}`} />
              <span className="text-sm font-medium">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
