import { Suspense } from 'react';
import Link from 'next/link';
import { UserPlus, Settings, MapPin, FileSpreadsheet } from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import ActivitySection from '@/components/dashboard/ActivitySection';
import LiveLocations from '@/components/dashboard/LiveLocations';
import AbsentWorkers from '@/components/dashboard/AbsentWorkers';

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
    <div className="rounded-xl border border-border bg-surface-raised p-5 animate-pulse">
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
    <div className="lg:col-span-2 rounded-xl border border-border bg-surface-raised animate-pulse">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="h-4 w-36 rounded bg-surface" />
        <div className="h-2 w-2 rounded-full bg-surface" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3">
            <div className="flex-1 space-y-1">
              <div className="h-3 w-32 rounded bg-surface" />
              <div className="h-2.5 w-20 rounded bg-surface" />
            </div>
            <div className="h-3 w-16 rounded bg-surface hidden md:block" />
            <div className="h-3 w-14 rounded bg-surface" />
            <div className="h-5 w-16 rounded-full bg-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* Quick Actions skeleton */}
      <div className="rounded-xl border border-border bg-surface-raised p-4 animate-pulse">
        <div className="h-4 w-28 rounded bg-surface mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-surface" />
          ))}
        </div>
      </div>
      {/* Live Locations skeleton */}
      <div className="rounded-xl border border-border bg-surface-raised animate-pulse">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-surface" />
          <div className="h-4 w-12 rounded-full bg-surface" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <div className="h-2 w-2 rounded-full bg-surface" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-28 rounded bg-surface" />
                  <div className="h-3 w-10 rounded bg-surface" />
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AbsentSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface-raised animate-pulse">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="h-4 w-24 rounded bg-surface" />
        <div className="h-4 w-8 rounded-full bg-surface" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="px-5 py-3 space-y-1">
            <div className="h-3 w-32 rounded bg-surface" />
            <div className="h-2.5 w-48 rounded bg-surface" />
          </div>
        ))}
      </div>
    </div>
  );
}

const quickActions = [
  { label: 'Registrar', href: '/workers/new', icon: UserPlus },
  { label: 'Ajustes', href: '/settings', icon: Settings },
  { label: 'Nueva Sede', href: '/locations/new', icon: MapPin },
  { label: 'Ver Planillas', href: '/payroll', icon: FileSpreadsheet },
];

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

      {/* Main Grid: Left (2/3) + Sidebar (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Chart + Attendance Table */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<ChartSkeleton />}>
            <WeeklyChart />
          </Suspense>

          <Suspense fallback={<ActivitySkeleton />}>
            <ActivitySection />
          </Suspense>
        </div>

        {/* Right: Quick Actions + Live Locations + Absent Workers */}
        <div className="space-y-6">
          <Suspense fallback={<SidebarSkeleton />}>
            {/* Quick Actions — 2x2 grid */}
            <div className="rounded-xl border border-border bg-surface-raised p-4">
              <h3 className="text-sm font-semibold mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-border py-4 px-3 hover:border-brand/40 hover:bg-brand/5 transition-all"
                  >
                    <action.icon className="h-6 w-6 text-[var(--text-muted)] group-hover:text-brand transition-colors" />
                    <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-brand transition-colors text-center leading-tight">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Live Locations */}
            <LiveLocations />
          </Suspense>

          {/* Absent Workers — independent Suspense */}
          <Suspense fallback={<AbsentSkeleton />}>
            <AbsentWorkers />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
