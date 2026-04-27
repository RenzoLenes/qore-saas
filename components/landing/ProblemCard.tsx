import { X } from 'lucide-react';

type Props = {
  method: string;
  title: string;
  desc: string;
  items: readonly string[];
  stat: string;
  statSub: string;
};

export default function ProblemCard({ method, title, desc, items, stat, statSub }: Props) {
  return (
    <article className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        <span className="text-[10px] font-semibold tracking-[0.15em] text-slate-500 font-mono">{method}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5">{desc}</p>
      <div className="h-px bg-slate-100 mb-5" />
      <ul className="flex flex-col gap-2.5 mb-6">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
            <X className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="pt-4 mt-auto border-t border-slate-100">
        <p className="text-[22px] font-bold text-[#000d2a] tracking-tight">{stat}</p>
        <p className="text-xs text-slate-400">{statSub}</p>
      </div>
    </article>
  );
}
