import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, CalendarCheck, TrendingUp, MapPin, Mail, Briefcase, LogIn, LogOut, Shield, ShieldAlert } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { getWorkerById, getAttendanceForWorker } from '@/lib/queries/payroll';
import { getTenantTimezone, formatTenantTime, formatTenantDate, tenantDateKey } from '@/lib/timezone';

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

const GPS_FLAG_LABELS: Record<string, string> = {
  accuracy_too_precise: 'Precisión sospechosa',
  accuracy_too_poor: 'GPS impreciso',
  null_sensors: 'Sensores ausentes',
  impossible_travel: 'Viaje imposible',
};

export default async function WorkerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [worker, records, tz] = await Promise.all([
    getWorkerById(id),
    getAttendanceForWorker(id),
    getTenantTimezone(),
  ]);

  if (!worker) notFound();

  const locationName = (worker.location as unknown as { name: string })?.name ?? 'Sin sede';
  const modeLabels: Record<string, string> = {
    gps_only: 'Solo GPS',
    static_qr: 'QR Estático + GPS',
    dynamic_qr: 'QR Dinámico + GPS',
  };
  const loc = worker.location as unknown as { name: string; entry_mode: string | null; exit_mode: string | null } | null;
  const tenant = worker.tenant as unknown as { default_entry_mode: string; default_exit_mode: string } | null;
  const effectiveEntry = worker.entry_mode ?? loc?.entry_mode ?? tenant?.default_entry_mode ?? 'dynamic_qr';
  const effectiveExit = worker.exit_mode ?? loc?.exit_mode ?? tenant?.default_exit_mode ?? 'dynamic_qr';
  const entryLabel = modeLabels[effectiveEntry] ?? '—';
  const exitLabel = modeLabels[effectiveExit] ?? '—';
  const initials = worker.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  const checkIns = records.filter((r) => r.type === 'check_in');
  const checkOuts = records.filter((r) => r.type === 'check_out');

  const dailyData = checkIns.map((ci) => {
    const dateStr = formatTenantDate(ci.timestamp, tz);
    const entry = formatTenantTime(ci.timestamp, tz);
    const ciDayKey = tenantDateKey(ci.timestamp, tz);

    const co = checkOuts.find((r) => tenantDateKey(r.timestamp, tz) === ciDayKey);
    let exit = '—';
    let hours = 0;
    if (co) {
      exit = formatTenantTime(co.timestamp, tz);
      hours = (new Date(co.timestamp).getTime() - new Date(ci.timestamp).getTime()) / 3600000;
    }

    return { date: dateStr, entry, exit, hours: Math.round(hours * 10) / 10, within_radius: ci.within_radius, gps_suspicious: ci.gps_suspicious, gps_flags: ci.gps_flags ?? [] };
  });

  const totalHours = dailyData.reduce((sum, d) => sum + d.hours, 0);
  const avgHours = dailyData.length > 0 ? (totalHours / dailyData.length).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Trabajadores', href: '/workers' }, { label: worker.name }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center text-brand text-lg font-bold">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{worker.name}</h1>
              <Badge variant={statusBadge[worker.status]}>{statusLabel[worker.status]}</Badge>
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{worker.position}</p>
          </div>
        </div>
        <Link
          href={`/workers/${worker.id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 h-10 text-sm font-semibold hover:bg-surface transition-colors"
        >
          Editar Trabajador
        </Link>
      </div>

      {/* Info + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: 'Registros Semana', value: `${checkIns.length}`, icon: Clock, color: 'text-brand bg-brand/10' },
          { label: 'Total Horas', value: `${Math.round(totalHours * 10) / 10}h`, icon: CalendarCheck, color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Promedio Diario', value: `${avgHours}h`, icon: TrendingUp, color: 'text-violet-500 bg-violet-500/10' },
          { label: 'Sede', value: locationName, icon: MapPin, color: 'text-amber-500 bg-amber-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-surface-raised p-4 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} flex-shrink-0`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Worker details card */}
      <div className="rounded-xl border border-border bg-surface-raised p-5">
        <h3 className="text-sm font-semibold mb-3">Datos del Trabajador</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <p className="text-[var(--text-muted)] text-xs">Cargo</p>
              <p className="text-[var(--text-secondary)]">{worker.position}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <p className="text-[var(--text-muted)] text-xs">Email</p>
              <p className="text-[var(--text-secondary)]">{worker.email ?? '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <p className="text-[var(--text-muted)] text-xs">Sede</p>
              <p className="text-[var(--text-secondary)]">{locationName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <LogIn className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <p className="text-[var(--text-muted)] text-xs">Modo Entrada</p>
              <p className="text-[var(--text-secondary)]">{entryLabel}{!worker.entry_mode && <span className="text-[var(--text-muted)] ml-1 text-[10px]">(hereda)</span>}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <LogOut className="h-4 w-4 text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <p className="text-[var(--text-muted)] text-xs">Modo Salida</p>
              <p className="text-[var(--text-secondary)]">{exitLabel}{!worker.exit_mode && <span className="text-[var(--text-muted)] ml-1 text-[10px]">(hereda)</span>}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance table */}
      <div className="rounded-xl border border-border bg-surface-raised">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">Registro de Horas — Última Semana</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Fecha</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Entrada</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Salida</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Horas</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">GPS</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dailyData.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-6 text-center text-sm text-[var(--text-muted)]">Sin registros en la última semana</td></tr>
              )}
              {dailyData.map((d, i) => (
                <tr key={i} className="bg-surface-raised">
                  <td className="px-5 py-3 font-medium">{d.date}</td>
                  <td className="px-5 py-3 font-mono text-[var(--text-secondary)]">{d.entry}</td>
                  <td className="px-5 py-3 font-mono text-[var(--text-secondary)]">{d.exit}</td>
                  <td className="px-5 py-3 font-mono text-[var(--text-secondary)]">{d.hours.toFixed(1)}h</td>
                  <td className="px-5 py-3">
                    {d.gps_suspicious ? (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500">
                          <ShieldAlert className="h-3 w-3" />
                          Sospechoso
                        </span>
                        <p className="text-[10px] text-[var(--text-muted)]">
                          {d.gps_flags.map((f: string) => GPS_FLAG_LABELS[f] ?? f).join(', ')}
                        </p>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                        <Shield className="h-3 w-3" />
                        OK
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={d.within_radius !== false ? 'success' : 'warning'}>
                      {d.within_radius !== false ? 'Normal' : 'Fuera de rango'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
