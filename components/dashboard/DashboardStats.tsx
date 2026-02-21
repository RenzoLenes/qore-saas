import { CalendarCheck, UserX, MapPin, Clock } from 'lucide-react';
import StatCard from './StatCard';
import { getDashboardMetrics } from '@/lib/queries/dashboard';

export default async function DashboardStats() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Asistencias Hoy"
        value={metrics.today_attendance}
        icon={CalendarCheck}
        trend={{ value: `${metrics.attendance_rate}% del total`, positive: metrics.attendance_rate >= 70 }}
        color="text-emerald-500 bg-emerald-500/10"
      />
      <StatCard
        label="Ausentes Hoy"
        value={metrics.absent_today}
        icon={UserX}
        trend={{
          value: `${metrics.on_leave} con permiso · ${metrics.total_workers} activos`,
          positive: true,
          neutral: true,
        }}
        color="text-amber-500 bg-amber-500/10"
      />
      <StatCard
        label="Sedes Activas"
        value={`${metrics.active_locations}/${metrics.total_locations}`}
        icon={MapPin}
        trend={{
          value: metrics.total_locations > 0
            ? `${Math.round((metrics.active_locations / metrics.total_locations) * 100)}% operativas`
            : '0% operativas',
          positive: metrics.active_locations === metrics.total_locations,
          neutral: true,
        }}
        color="text-violet-500 bg-violet-500/10"
      />
      <StatCard
        label="Puntualidad"
        value={`${metrics.punctuality_rate}%`}
        icon={Clock}
        color="text-brand bg-brand/10"
      />
    </div>
  );
}
