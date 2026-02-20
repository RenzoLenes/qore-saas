import type { RecentActivity } from '@/lib/types';

function timeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export default function ActivityFeed({ items }: { items: RecentActivity[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold">Actividad en Vivo</h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>
      <div className="divide-y divide-border">
        {items.length === 0 && (
          <div className="px-5 py-6 text-center text-sm text-[var(--text-muted)]">
            Sin actividad reciente
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-3">
            <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
              item.within_radius === false ? 'bg-red-400' : item.type === 'check_in' ? 'bg-emerald-400' : 'bg-amber-400'
            }`} />
            <span className="text-sm font-medium flex-1 min-w-0 truncate">{item.worker_name}</span>
            <span className="text-xs text-[var(--text-muted)] hidden sm:block">{item.location_name}</span>
            <span className="text-xs text-[var(--text-secondary)]">
              {item.type === 'check_in' ? 'Entrada' : 'Salida'} · {item.method}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono w-12 text-right">{timeAgo(item.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
