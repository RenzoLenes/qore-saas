import { isOnTime, formatTenantTime } from '@/lib/timezone';
import type { RecentActivity } from '@/lib/types';

export default function ActivityFeed({ items, timezone }: { items: RecentActivity[]; timezone: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold">Últimas Asistencias</h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-[var(--text-muted)]">
          Sin registros de asistencia
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-[var(--text-muted)]">
                <th className="text-left font-medium px-5 py-3 text-xs">Trabajador</th>
                <th className="text-left font-medium px-5 py-3 text-xs hidden md:table-cell">Sede</th>
                <th className="text-left font-medium px-5 py-3 text-xs">Hora</th>
                <th className="text-left font-medium px-5 py-3 text-xs">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => {
                const onTime = isOnTime(item.timestamp, item.location_schedule, timezone);
                return (
                  <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium truncate max-w-[180px]">{item.worker_name}</p>
                      {item.worker_position && (
                        <p className="text-xs text-[var(--text-muted)] truncate max-w-[180px]">{item.worker_position}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-[var(--text-secondary)] hidden md:table-cell">
                      <span className="truncate max-w-[150px] block">{item.location_name}</span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-[var(--text-secondary)]">
                      {formatTenantTime(item.timestamp, timezone)}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        onTime
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          onTime ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        {onTime ? 'Puntual' : 'Tardanza'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
