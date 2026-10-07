import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Footprints } from 'lucide-react';
import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { stationPandals } from '@/data';
import { METRO_LINES, STATIONS } from '@/data/metroLines';
import type { MetroLine } from '@/data/types';
import { cn, formatKm } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

interface Props {
  /** Matching pandals per station under the current search and filters. */
  counts: Map<string, number>;
  orientation: 'vertical' | 'horizontal';
}

function Interchange({ stationId, line }: { stationId: string; line: MetroLine['id'] }) {
  const others = STATIONS[stationId].lines.filter((l) => l !== line);
  if (!others.length) return null;
  return (
    <span className="flex items-center gap-1" title="Interchange">
      {others.map((l) => (
        <span key={l} className="size-2 rounded-full ring-1 ring-bg" style={{ background: `var(--${l}-line)` }}>
          <span className="sr-only">Interchange with {l} line</span>
        </span>
      ))}
    </span>
  );
}

function VerticalLine({ line, counts }: { line: MetroLine; counts: Map<string, number> }) {
  const stationId = useAppStore((s) => s.stationId);
  const setStation = useAppStore((s) => s.setStation);
  const color = `var(--${line.id}-line)`;

  return (
    <section aria-label={`${line.name} stations`} className="relative">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-surface/95 px-5 py-3 backdrop-blur">
        <span className="h-5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em]">{line.name}</h3>
          <p className="truncate text-[11px] text-muted">{line.route}</p>
        </div>
      </header>

      <ol className="relative px-5 pb-4 pt-1">
        {/* The line itself */}
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-[30px] top-5 w-[3px] rounded-full"
          style={{ background: `linear-gradient(${color}, color-mix(in srgb, ${color} 55%, transparent))` }}
        />
        {line.stations.map((sid) => {
          const st = STATIONS[sid];
          const count = counts.get(sid) ?? 0;
          const selected = stationId === sid;
          const nearest = stationPandals(sid)[0];
          return (
            <li key={sid} data-station={sid}>
              <button
                type="button"
                onClick={() => setStation(selected ? null : sid)}
                aria-pressed={selected}
                disabled={count === 0 && !selected}
                className={cn(
                  'group relative flex w-full items-center gap-4 rounded-sm py-[9px] pl-0 pr-2 text-left transition-colors',
                  count === 0 && !selected ? 'cursor-default opacity-45' : 'hover:bg-surface-2/60',
                  selected && 'bg-surface-2',
                )}
              >
                <span className="relative z-[1] grid w-[23px] shrink-0 place-items-center">
                  {selected && <span className="pulse-ring absolute size-4 rounded-full" style={{ background: color }} />}
                  <span
                    className={cn(
                      'relative block rounded-full border-[3px] bg-surface transition-all duration-300',
                      selected ? 'size-[19px]' : 'size-[13px] group-hover:size-4',
                    )}
                    style={{ borderColor: color, background: selected ? color : undefined }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('flex items-center gap-2 text-[14px] font-semibold leading-tight', selected && 'text-gold-bright')}>
                    <span className="truncate">{st.name}</span>
                    <Interchange stationId={sid} line={line.id} />
                  </span>
                  {st.area && <span className="block truncate text-[11px] text-muted">{st.area}</span>}
                </span>
                <span
                  className={cn(
                    'grid h-6 min-w-6 shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-bold tabular-nums',
                    count ? 'bg-gold/15 text-gold-bright' : 'text-muted',
                  )}
                  aria-label={`${count} pandals`}
                >
                  {count || '–'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="ml-[39px] flex flex-wrap items-center gap-x-4 gap-y-1 pb-3 pt-1 text-xs text-muted">
                      {nearest && (
                        <span className="flex items-center gap-1.5">
                          <Footprints className="size-3.5 text-gold" aria-hidden="true" />
                          Nearest {formatKm(nearest.distanceKm)} · {nearest.walkingMinutes} min
                        </span>
                      )}
                      <Link to={`/station/${sid}`} className="flex items-center gap-1 font-semibold text-gold-bright hover:underline">
                        Station guide <ArrowUpRight className="size-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function HorizontalRail({ counts }: { counts: Map<string, number> }) {
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const setStation = useAppStore((s) => s.setStation);
  const lines = METRO_LINES.filter((l) => line === 'all' || l.id === line);

  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4" data-rail>
      <div className="flex w-max gap-8 pb-1">
        {lines.map((l) => (
          <ol key={l.id} aria-label={`${l.name} stations`} className="relative flex">
            <span
              aria-hidden="true"
              className="absolute left-[38px] right-[38px] top-[9px] h-[3px] rounded-full"
              style={{ background: `var(--${l.id}-line)` }}
            />
            {l.stations.map((sid) => {
              const count = counts.get(sid) ?? 0;
              const selected = sid === stationId;
              return (
                <li key={sid} data-station={sid}>
                  <button
                    type="button"
                    disabled={count === 0 && !selected}
                    aria-pressed={selected}
                    onClick={() => setStation(selected ? null : sid)}
                    className={cn('relative flex w-[76px] flex-col items-center gap-2 text-center', count === 0 && !selected && 'opacity-40')}
                  >
                    <span
                      className={cn('relative z-[1] block rounded-full border-[3px] bg-bg transition-all', selected ? 'size-[21px]' : 'mt-[3px] size-[15px]')}
                      style={{ borderColor: `var(--${l.id}-line)`, background: selected ? `var(--${l.id}-line)` : undefined }}
                    />
                    <span className={cn('line-clamp-2 text-[10.5px] font-semibold leading-tight', selected ? 'text-gold-bright' : 'text-ink')}>
                      {STATIONS[sid].name}
                    </span>
                    <span className="text-[10px] font-bold tabular-nums text-muted">{count || '–'}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        ))}
      </div>
    </div>
  );
}

/** The Metro journey: every station on the chosen line, connected, with live pandal counts. */
function StationTimelineImpl({ counts, orientation }: Props) {
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const ref = useRef<HTMLDivElement>(null);

  // Bring the selected station into view inside the timeline's own scroller (never the page).
  useEffect(() => {
    if (!stationId || !ref.current) return;
    const scroller = orientation === 'vertical' ? ref.current : ref.current.querySelector<HTMLElement>('[data-rail]');
    const item = ref.current.querySelector<HTMLElement>(`[data-station="${stationId}"]`);
    if (!scroller || !item) return;
    const a = scroller.getBoundingClientRect();
    const b = item.getBoundingClientRect();
    if (orientation === 'vertical')
      scroller.scrollTo({ top: scroller.scrollTop + (b.top - a.top) - a.height / 2 + b.height / 2, behavior: 'smooth' });
    else scroller.scrollTo({ left: scroller.scrollLeft + (b.left - a.left) - a.width / 2 + b.width / 2, behavior: 'smooth' });
  }, [stationId, orientation, line]);

  if (orientation === 'horizontal')
    return (
      <div ref={ref}>
        <HorizontalRail counts={counts} />
      </div>
    );

  return (
    <div ref={ref} className="thin-scroll panel max-h-[calc(100vh-7.5rem)] overflow-y-auto">
      {METRO_LINES.filter((l) => line === 'all' || l.id === line).map((l) => (
        <VerticalLine key={l.id} line={l} counts={counts} />
      ))}
    </div>
  );
}

export const StationTimeline = memo(StationTimelineImpl);
