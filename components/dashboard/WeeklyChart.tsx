import { getWeeklyAttendance, getDashboardMetrics } from '@/lib/queries/dashboard';

export default async function WeeklyChart() {
  const [weekly, metrics] = await Promise.all([
    getWeeklyAttendance(),
    getDashboardMetrics(),
  ]);

  const maxCount = Math.max(...weekly.map((w) => w.count), 1);

  return (
    <div className="rounded-xl border border-border bg-surface-raised p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold">Asistencia Semanal</h3>
        <span className="text-xs text-[var(--text-muted)]">Semana actual</span>
      </div>
      <div className="flex gap-2 h-40">
        {weekly.map((d, i) => {
          const height = (d.count / maxCount) * 100;
          const percentage = metrics.total_workers > 0
            ? Math.round((d.count / metrics.total_workers) * 100)
            : 0;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                <div className="bg-surface-raised border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap text-center">
                  <p className="text-xs font-medium">{d.fullDate}</p>
                  <p className="text-sm font-bold text-brand">{d.count} asistencias</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{percentage}% del total</p>
                </div>
                <div className="mx-auto w-2 h-2 bg-surface-raised border-b border-r border-border rotate-45 -mt-1" />
              </div>

              <span className="text-[10px] font-medium text-[var(--text-muted)]">{d.count}</span>
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full rounded-md bg-brand/20 relative group-hover:bg-brand/30 transition-colors cursor-pointer"
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  <div
                    className="absolute bottom-0 w-full rounded-md bg-brand transition-all"
                    style={{ height: '100%' }}
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-[var(--text-muted)]">{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
