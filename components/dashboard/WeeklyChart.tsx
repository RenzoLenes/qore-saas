import { getWeeklyAttendance } from '@/lib/queries/dashboard';

export default async function WeeklyChart() {
  const weekly = await getWeeklyAttendance();

  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-surface-raised p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold">Asistencia Semanal</h3>
        <span className="text-xs text-[var(--text-muted)]">Últimos 7 días</span>
      </div>
      <div className="flex gap-2 h-40">
        {(() => {
          const maxCount = Math.max(...weekly.map((w) => w.count), 1);
          return weekly.map((d, i) => {
            const height = (d.count / maxCount) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-medium text-[var(--text-muted)]">{d.count}</span>
                <div className="flex-1 w-full flex items-end">
                  <div
                    className="w-full rounded-md bg-brand/20 relative"
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
          });
        })()}
      </div>
    </div>
  );
}
