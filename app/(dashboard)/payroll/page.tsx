import Breadcrumb from '@/components/ui/Breadcrumb';
import PayrollTable from '@/components/payroll/PayrollTable';
import { getWorkers } from '@/lib/queries/payroll';
import { getLocations } from '@/lib/queries/locations';
import { getTenantTimezone, getTenantNow } from '@/lib/timezone';

export default async function PayrollPage() {
  const tz = await getTenantTimezone();
  const tenantNow = getTenantNow(tz);
  const currentMonth = `${tenantNow.year}-${String(tenantNow.month + 1).padStart(2, '0')}`;

  const [workers, locations] = await Promise.all([
    getWorkers(currentMonth),
    getLocations(),
  ]);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Planillas' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Gestión de Planillas</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Control de horas y asistencia del equipo</p>
        </div>
      </div>

      <PayrollTable
        initialWorkers={workers}
        locations={locations}
        currentMonth={currentMonth}
      />
    </div>
  );
}
