'use client';

import { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Download,
  ChevronRight,
  MapPin,
  CalendarDays,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import type { SelectOption } from '@/components/ui/Select';
import { getPayrollForMonth } from '@/lib/actions/payroll';
import type { PayrollWorker } from '@/lib/queries/payroll';
import type { Location } from '@/lib/types';

interface PayrollTableProps {
  initialWorkers: PayrollWorker[];
  locations: Location[];
  currentMonth: string; // YYYY-MM
}

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

function generateMonthOptions(): SelectOption[] {
  const options: SelectOption[] = [];
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleString('es-PE', { month: 'long', year: 'numeric' });
    options.push({ value, label: label.charAt(0).toUpperCase() + label.slice(1) });
  }
  return options;
}

function downloadCSV(workers: PayrollWorker[], month: string) {
  const headers = ['Nombre', 'Cargo', 'Sede', 'Días Trabajados', 'Hrs. Normales', 'Hrs. Extra', 'Total Horas', 'Estado'];
  const rows = workers.map((w) => {
    const locationName = (w.location as unknown as { name: string })?.name ?? '';
    const normalHours = Math.max(w.hours_month - w.overtime_hours, 0);
    return [
      `"${w.name}"`,
      `"${w.position}"`,
      `"${locationName}"`,
      w.days_worked,
      Math.round(normalHours),
      w.overtime_hours,
      w.hours_month,
      statusLabel[w.status] ?? w.status,
    ].join(',');
  });
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `planilla-${month}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PayrollTable({ initialWorkers, locations, currentMonth }: PayrollTableProps) {
  const [workers, setWorkers] = useState(initialWorkers);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [month, setMonth] = useState(currentMonth);
  const [isPending, startTransition] = useTransition();

  const monthOptions = useMemo(() => generateMonthOptions(), []);

  const locationOptions: SelectOption[] = useMemo(() => [
    { value: '', label: 'Todas las sedes' },
    ...locations.map((loc) => ({ value: loc.id, label: loc.name })),
  ], [locations]);

  const filtered = useMemo(() => {
    let result = workers;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((w) => w.name.toLowerCase().includes(q) || w.position.toLowerCase().includes(q));
    }
    if (locationFilter) {
      result = result.filter((w) => w.location_id === locationFilter);
    }
    return result;
  }, [workers, search, locationFilter]);

  const activeWorkers = filtered.filter((w) => w.status === 'active');
  const totalHours = filtered.reduce((sum, w) => sum + w.hours_month, 0);
  const totalOvertime = filtered.reduce((sum, w) => sum + w.overtime_hours, 0);
  const workersWithRecords = filtered.filter((w) => w.days_worked > 0).length;
  const completionRate = filtered.length > 0 ? Math.round((workersWithRecords / filtered.length) * 100) : 0;
  const pendingReviews = filtered.filter((w) => w.status === 'active' && w.days_worked === 0);

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    startTransition(async () => {
      const data = await getPayrollForMonth(newMonth);
      setWorkers(data);
    });
  };

  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand flex-shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">Total Trabajadores</p>
            <p className="text-2xl font-extrabold mt-0.5">{filtered.length}</p>
            <p className="text-xs text-emerald-500 font-medium mt-1">{activeWorkers.length} activos</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">Horas Totales</p>
            <p className="text-2xl font-extrabold mt-0.5">{Math.round(totalHours).toLocaleString()}h</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{monthOptions.find((o) => o.value === month)?.label}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">Horas Extra</p>
            <p className="text-2xl font-extrabold mt-0.5">{Math.round(totalOvertime)}h</p>
            {totalOvertime > 0 && (
              <p className="text-xs text-amber-500 font-medium mt-1">Requiere revisión</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 flex-shrink-0">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-[var(--text-muted)]">Estado Planilla</p>
            <p className="text-2xl font-extrabold mt-0.5">{completionRate}%</p>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-surface overflow-hidden">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-end gap-3">
        <div className="w-full sm:w-auto sm:flex-1 sm:max-w-sm">
          <Input
            icon={Search}
            placeholder="Buscar trabajador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="!h-10"
          />
        </div>
        <Select
          icon={MapPin}
          options={locationOptions}
          value={locationFilter}
          onChange={setLocationFilter}
          placeholder="Todas las sedes"
          className="w-full sm:w-48"
        />
        <Select
          icon={CalendarDays}
          options={monthOptions}
          value={month}
          onChange={handleMonthChange}
          className="w-full sm:w-56"
          disabled={isPending}
        />
        <Button
          variant="secondary"
          size="md"
          onClick={() => downloadCSV(filtered, month)}
          disabled={filtered.length === 0}
          className="w-full sm:w-auto sm:ml-auto"
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Cargando datos...
        </div>
      )}

      {/* Table */}
      <div className={`overflow-x-auto rounded-xl border border-border ${isPending ? 'opacity-50 pointer-events-none' : ''} transition-opacity`}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Trabajador</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Sede</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden md:table-cell">Días</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden lg:table-cell">Hrs. Normales</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden lg:table-cell">Hrs. Extra</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Total</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Estado</th>
              <th className="px-5 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((w) => {
              const normalHours = Math.max(w.hours_month - w.overtime_hours, 0);
              return (
                <tr key={w.id} className="bg-surface-raised hover:bg-surface transition-colors group">
                  <td className="px-5 py-3.5">
                    <Link href={`/payroll/${w.id}`} className="flex items-center gap-3 hover:text-brand transition-colors">
                      <div className="h-9 w-9 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xs font-bold flex-shrink-0">
                        {w.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium leading-tight">{w.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{w.position}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--text-secondary)] hidden sm:table-cell">
                    {(w.location as unknown as { name: string })?.name ?? '—'}
                  </td>
                  <td className="px-5 py-3.5 text-center font-mono text-[var(--text-secondary)] hidden md:table-cell">
                    {w.days_worked}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-[var(--text-secondary)] hidden lg:table-cell">
                    {Math.round(normalHours)}h
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono hidden lg:table-cell">
                    {w.overtime_hours > 0 ? (
                      <span className="text-amber-500 font-medium">{w.overtime_hours}h</span>
                    ) : (
                      <span className="text-[var(--text-muted)]">0h</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold">
                    {w.hours_month}h
                  </td>
                  <td className="px-5 py-3.5 text-center hidden sm:table-cell">
                    <Badge variant={statusBadge[w.status] ?? 'default'}>{statusLabel[w.status] ?? w.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link href={`/payroll/${w.id}`} className="text-[var(--text-muted)] group-hover:text-brand transition-colors">
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">
                  {search || locationFilter ? 'No se encontraron resultados' : 'No hay trabajadores registrados'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-amber-500">Revisiones Pendientes</h3>
            <Badge variant="warning">{pendingReviews.length}</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            Trabajadores activos sin registros de asistencia este mes
          </p>
          <div className="flex flex-wrap gap-2">
            {pendingReviews.slice(0, 5).map((w) => (
              <Link
                key={w.id}
                href={`/payroll/${w.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium hover:border-brand/40 transition-colors"
              >
                <div className="h-5 w-5 rounded-full bg-brand/10 flex items-center justify-center text-brand text-[9px] font-bold">
                  {w.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                {w.name}
              </Link>
            ))}
            {pendingReviews.length > 5 && (
              <span className="inline-flex items-center px-3 py-1.5 text-xs text-[var(--text-muted)]">
                +{pendingReviews.length - 5} más
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
