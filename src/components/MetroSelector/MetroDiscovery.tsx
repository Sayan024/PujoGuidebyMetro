import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Counter, Reveal, SectionHeading } from '@/components/ui/primitives';
import { Diya } from '@/components/ui/Motifs';
import { LINE_COUNTS, stationPandals } from '@/data';
import { METRO_LINES, STATIONS } from '@/data/metroLines';
import { useAppStore } from '@/store/appStore';

/** Chapter between the calendar and the explorer: the network at a glance, one row per line. */
export function MetroDiscovery() {
  const setLine = useAppStore((s) => s.setLine);
  const navigate = useNavigate();

  return (
    <section aria-labelledby="discovery-title" className="shell pt-24 md:pt-36">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-20">
        <div className="xl:sticky xl:top-32 xl:self-start">
          <SectionHeading
            eyebrow="Metro discovery"
            title={
              <span id="discovery-title">
                Five lines.
                <br />
                One <em className="font-medium text-gold">festival.</em>
              </span>
            }
            lead="Skip the gridlock. Every pandal here is listed by the Metro station you walk from, with the distance and minutes on foot."
          />
          <Reveal delay={0.15} className="mt-8 flex items-center gap-3 text-sm text-muted">
            <Diya className="h-7 text-gold" />
            Pick a line to open it in the explorer.
          </Reveal>
        </div>

        <div role="list" className="border-t border-hair">
          {METRO_LINES.map((l, i) => {
            const active = l.stations.filter((s) => stationPandals(s).length > 0);
            const max = Math.max(...l.stations.map((s) => stationPandals(s).length), 1);
            return (
              <Reveal key={l.id} delay={i * 0.06} role="listitem" className="border-b border-hair">
                  <button
                    type="button"
                    onClick={() => {
                      setLine(l.id);
                      navigate('/explore');
                    }}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-6 text-left transition-colors hover:bg-surface/60 md:gap-x-8 md:px-4 md:py-8"
                    aria-label={`${l.name}, ${l.route}. ${LINE_COUNTS[l.id]} pandals. Open in explorer`}
                  >
                    <span
                      className="h-14 w-2 rounded-full transition-all duration-500 group-hover:h-20 md:h-16"
                      style={{ background: `var(--${l.id}-line)`, boxShadow: `0 0 28px -2px var(--${l.id}-line)` }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-[clamp(1.7rem,3.4vw,3rem)] font-semibold leading-none">{l.name}</span>
                      <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-muted">{l.route}</span>
                      <span className="mt-2 hidden max-w-lg text-sm text-muted md:block">{l.blurb}</span>
                    </span>
                    <span className="text-right">
                      <span className="display block text-[clamp(2.2rem,4.6vw,4.4rem)] text-gold-bright">
                        <Counter value={LINE_COUNTS[l.id]} />
                      </span>
                      <span className="flex items-center justify-end gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                        pandals · {active.length} stations
                        <ArrowRight className="size-3.5 -translate-x-1 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                      </span>
                    </span>

                    {/* Density strip: one bar per station, height = pandals nearby */}
                    <span className="col-span-3 flex h-8 items-end gap-[3px] md:col-start-2 md:col-span-2" aria-hidden="true">
                      {l.stations.map((s) => {
                        const n = stationPandals(s).length;
                        return (
                          <span
                            key={s}
                            title={`${STATIONS[s].name}: ${n}`}
                            className="flex-1 rounded-t-[1px] transition-opacity group-hover:opacity-100"
                            style={{
                              height: `${n ? 18 + (n / max) * 82 : 6}%`,
                              background: `var(--${l.id}-line)`,
                              opacity: n ? 0.75 : 0.2,
                            }}
                          />
                        );
                      })}
                    </span>
                  </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
