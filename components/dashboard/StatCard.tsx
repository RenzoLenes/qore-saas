import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: string;
}

export default function StatCard({ label, value, icon: Icon, trend, color = 'text-brand bg-brand/10' }: StatCardProps) {
  const [textColor, bgColor] = color.split(' ');
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-5 flex items-start gap-4">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgColor} ${textColor} flex-shrink-0`}>
        <Icon className="h-5.5 w-5.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-muted)] mb-0.5">{label}</p>
        <p className="text-2xl font-extrabold tracking-tight">{value}</p>
        {trend && (
          <p className={`text-xs font-medium mt-1 ${trend.positive ? 'text-emerald-500' : 'text-red-500'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
