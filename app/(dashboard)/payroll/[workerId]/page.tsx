import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, Clock, TrendingUp, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import { getWorkerById, getAttendanceForWorker } from '@/lib/queries/payroll';

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

/**
 * Count weekdays (Mon-Fri) in a month up to a cutoff date.
 * If work_days is provided, use those instead of default Mon-Fri.
 */
function countWorkDays(year: number, month: number, workDays?: string[]): number {
  // Default: Mon(1) through Fri(5)
  const validDays = workDays && workDays.length > 0
    ? workDays.map((d) => {
        const map: Record<string, number> = { lun: 1, mar: 2, mie: 3, jue: 4, vie: 5, sab: 6, dom: 0 };
        return map[d] ?? -1;
      }).filter((d) => d >= 0)
    : [1, 2, 3, 4, 5];

  const today = new Date();
  const lastDay = new Date(year, month + 1, 0);
  const cutoff = today < lastDay ? today : lastDay;

  let count = 0;
  const d = new Date(year, month, 1);
  while (d <= cutoff) {
    if (validDays.includes(d.getDay())) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

export default async function WorkerDetailPage({ params }: { params: Promise<{ workerId: string }> }) {
  const { workerId } = await params;

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthLabel = now.toLocaleString('es-PE', { month: 'long', year: 'numeric' });
  const monthLabelCapitalized = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  const [worker, records] = await Promise.all([
    getWorkerById(workerId),
    getAttendanceForWorker(workerId, currentMonth),
  ]);

  if (!worker) notFound();

  const locationName = (worker.location as unknown as { name: string })?.name ?? '—';
  const locationWorkDays = (worker.location as unknown as { work_days?: string[] })?.work_days;
  const checkIns = records.filter((r) => r.type === 'check_in');
  const checkOuts = records.filter((r) => r.type === 'check_out');

  const dailyData = checkIns.map((ci) => {
    const date = new Date(ci.timestamp);
    const dateStr = date.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' });
    const entry = date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });

    const co = checkOuts.find((r) => new Date(r.timestamp).toDateString() === date.toDateString());
    let exit = '—';
    let hours = 0;
    if (co) {
      const coDate = new Date(co.timestamp);
      exit = coDate.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
      hours = (coDate.getTime() - date.getTime()) / 3600000;
    }

    return {
      date: dateStr,
      entry,
      exit,
      hours: Math.round(hours * 10) / 10,
      overtime: Math.max(hours - 8, 0),
      within_radius: ci.within_radius,
      method: ci.method,
    };
  });

  const totalHours = dailyData.reduce((sum, d) => sum + d.hours, 0);
  const totalOvertime = dailyData.reduce((sum, d) => sum + d.overtime, 0);
  const normalHours = totalHours - totalOvertime;

  // Calculate attendance rate based on work days in the month
  const workDaysInMonth = countWorkDays(now.getFullYear(), now.getMonth(), locationWorkDays);
  const attendanceRate = workDaysInMonth > 0 ? Math.min(Math.round((dailyData.length / workDaysInMonth) * 100), 100) : 0;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Planillas', href: '/payroll' }, { label: worker.name }]} />

      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-surface-raised p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xl font-bold flex-shrink-0">
            {worker.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{worker.name}</h1>
              <Badge variant={statusBadge[worker.status]}>{statusLabel[worker.status]}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-[var(--text-muted)]">
              <span>{worker.position}</span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {locationName}
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="capitalize">{(() => {
                const modeLabels: Record<string, string> = { gps_only: 'Solo GPS', static_qr: 'QR Estático', dynamic_qr: 'QR Dinámico' };
                const loc = worker.location as unknown as { name: string; entry_mode: string | null } | null;
                const tenant = worker.tenant as unknown as { default_entry_mode: string } | null;
                const mode = worker.entry_mode ?? loc?.entry_mode ?? tenant?.default_entry_mode ?? 'dynamic_qr';
                return modeLabels[mode] ?? mode;
              })()}</span>
            </div>
          </div>
          <Link
            href="/payroll"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 h-10 text-sm font-medium text-[var(--text-secondary)] hover:bg-surface transition-colors self-start"
          >
            Volver a Planillas
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand flex-shrink-0">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Días Trabajados</p>
            <p className="text-xl font-extrabold mt-0.5">{dailyData.length}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">de {workDaysInMonth} laborables</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 flex-shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Asistencia</p>
            <p className="text-xl font-extrabold mt-0.5">{attendanceRate}%</p>
            <div className="mt-1.5 h-1 w-16 rounded-full bg-surface overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${attendanceRate}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 flex-shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Horas Normales</p>
            <p className="text-xl font-extrabold mt-0.5">{Math.round(normalHours * 10) / 10}h</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 flex-shrink-0">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Horas Extra</p>
            <p className="text-xl font-extrabold mt-0.5">{Math.round(totalOvertime * 10) / 10}h</p>
            {totalOvertime > 0 && (
              <p className="text-xs text-amber-500 font-medium mt-0.5">+{Math.round(totalOvertime * 10) / 10}h sobre jornada</p>
            )}
          </div>
        </div>
      </div>

      {/* Hours Summary Bar */}
      <div className="rounded-xl border border-border bg-surface-raised p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Resumen de Horas</h3>
          <span className="text-xs text-[var(--text-muted)]">Total: {Math.round(totalHours * 10) / 10}h</span>
        </div>
        <div className="h-3 w-full rounded-full bg-surface overflow-hidden flex">
          {normalHours > 0 && (
            <div
              className="h-full bg-violet-500 transition-all"
              style={{ width: `${(normalHours / Math.max(totalHours, 1)) * 100}%` }}
            />
          )}
          {totalOvertime > 0 && (
            <div
              className="h-full bg-amber-500 transition-all"
              style={{ width: `${(totalOvertime / Math.max(totalHours, 1)) * 100}%` }}
            />
          )}
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            Normales ({Math.round(normalHours * 10) / 10}h)
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            Extra ({Math.round(totalOvertime * 10) / 10}h)
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-xl border border-border bg-surface-raised">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">Registro de Asistencia — {monthLabelCapitalized}</h3>
          <Badge variant="info">{dailyData.length} registros</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Fecha</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Entrada</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Salida</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Horas</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Extra</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden md:table-cell">Método</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dailyData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">
                    <div className="flex flex-col items-center gap-2">
                      <CalendarDays className="h-8 w-8 text-[var(--text-muted)]" />
                      <p>Sin registros en {monthLabelCapitalized.toLowerCase()}</p>
                    </div>
                  </td>
                </tr>
              )}
              {dailyData.map((d, i) => (
                <tr key={i} className="bg-surface-raised hover:bg-surface transition-colors">
                  <td className="px-5 py-3 font-medium">{d.date}</td>
                  <td className="px-5 py-3 font-mono text-[var(--text-secondary)]">{d.entry}</td>
                  <td className="px-5 py-3 font-mono text-[var(--text-secondary)]">{d.exit}</td>
                  <td className="px-5 py-3 text-right font-mono font-semibold">{d.hours.toFixed(1)}h</td>
                  <td className="px-5 py-3 text-right font-mono hidden sm:table-cell">
                    {d.overtime > 0 ? (
                      <span className="text-amber-500 font-medium">+{d.overtime.toFixed(1)}h</span>
                    ) : (
                      <span className="text-[var(--text-muted)]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] capitalize">
                      {d.method === 'qr' ? 'QR' : d.method === 'gps' ? 'GPS' : d.method}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    {d.within_radius === false ? (
                      <Badge variant="warning">
                        <AlertTriangle className="h-3 w-3" />
                        Fuera de rango
                      </Badge>
                    ) : (
                      <Badge variant="success">Normal</Badge>
                    )}
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
