import { motion } from 'motion/react';
import { LINE_COUNTS, TOTAL_PANDALS } from '@/data';
import { METRO_LINES } from '@/data/metroLines';
import { cn } from '@/lib/utils';
import { useAppStore, type LineFilter } from '@/store/appStore';

const OPTIONS: { id: LineFilter; label: string; count: number; color?: string }[] = [
  { id: 'all', label: 'All', count: TOTAL_PANDALS },
  ...METRO_LINES.map((l) => ({ id: l.id, label: l.short, count: LINE_COUNTS[l.id], color: `var(--${l.id}-line)` })),
];

export function MetroSelector({ className, layoutId = 'line-tab' }: { className?: string; layoutId?: string }) {
  const line = useAppStore((s) => s.line);
  const setLine = useAppStore((s) => s.setLine);

  return (
    <div
      role="radiogroup"
      aria-label="Metro line"
      className={cn('no-scrollbar flex gap-2 overflow-x-auto', className)}
    >
      {OPTIONS.map((o) => {
        const on = o.id === line;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setLine(o.id)}
            className={cn(
              'relative flex h-[52px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl border px-4 text-left transition-colors sm:min-w-[132px] sm:flex-1',
              on ? 'border-transparent text-white' : 'border-hair-soft text-muted hover:border-hair hover:text-ink',
            )}
          >
            {on && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0"
                style={{
                  background: o.color
                    ? `linear-gradient(135deg, ${o.color}, color-mix(in srgb, ${o.color} 55%, #120909))`
                    : 'linear-gradient(135deg, #e52d3f, #701525)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span
              aria-hidden="true"
              className="relative h-5 w-1.5 rounded-full"
              style={{ background: on ? '#fff' : (o.color ?? 'var(--gold)') }}
            />
            <span className="relative text-[12px] font-bold uppercase tracking-[0.18em]">{o.label}</span>
            <span className={cn('relative ml-auto text-xs font-semibold tabular-nums', on ? 'text-white/85' : 'text-muted')}>
              {o.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
