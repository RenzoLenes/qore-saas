import { Users, MapPin, AlertTriangle, CalendarCheck } from 'lucide-react';
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
        label="Trabajadores Activos"
        value={metrics.total_workers}
        icon={Users}
        color="text-brand bg-brand/10"
      />
      <StatCard
        label="Sedes Operativas"
        value={metrics.active_locations}
        icon={MapPin}
        color="text-violet-500 bg-violet-500/10"
      />
      <StatCard
        label="Tasa de Asistencia"
        value={`${metrics.attendance_rate}%`}
        icon={AlertTriangle}
        color="text-amber-500 bg-amber-500/10"
      />
    </div>
  );
}
