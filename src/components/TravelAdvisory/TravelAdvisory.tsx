import { AnimatePresence, motion } from 'motion/react';
import { Footprints, TrainFront, TriangleAlert, Users, Megaphone } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Reveal } from '@/components/ui/primitives';
import { currentPujaDay, PUJA_DAYS } from '@/data/pujaDates';
import { cn } from '@/lib/utils';

const CROWD_COLOURS = ['#10B981', '#84cc16', '#EAB308', '#F97316', '#E52D3F'];

function Indicator({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="border-l border-hair pl-5">
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
        <span className="text-gold">{icon}</span>
        {label}
      </p>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

export function TravelAdvisory() {
  const [dayId, setDayId] = useState(() => {
    const today = currentPujaDay();
    // Mahalaya is quiet; open on the first festival day unless the festival is under way.
    return today.id === 'mahalaya' ? 'ashtami' : today.id;
  });
  const day = PUJA_DAYS.find((d) => d.id === dayId)!;
  const a = day.advisory;
  const severe = a.crowd >= 4;

  return (
    <section aria-labelledby="advisory-title" className="shell pt-16 md:pt-24">
      <Reveal
        className="relative overflow-hidden border border-hair"
        style={{
          background:
            'linear-gradient(110deg, color-mix(in srgb, var(--red) 20%, var(--surface)) 0%, var(--surface) 46%, color-mix(in srgb, var(--gold) 10%, var(--surface)) 100%)',
        }}
      >
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold-bright via-red to-maroon" />
        <div className="grid gap-10 p-6 md:p-10 xl:grid-cols-[1.05fr_1fr] xl:gap-16">
          <div className="min-w-0">
            <h2 id="advisory-title" className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-bright">
              <span className="relative grid size-9 place-items-center rounded-full bg-red/20 text-red">
                {severe && <span className="pulse-ring absolute inset-0 rounded-full border border-red" />}
                <TriangleAlert className="size-4" aria-hidden="true" />
              </span>
              Travel advisory
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={day.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.18]"
              >
                “{a.note}”
              </motion.p>
            </AnimatePresence>

            <div
              role="tablist"
              aria-label="Choose a puja day"
              className="no-scrollbar -mx-6 mt-7 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0"
            >
              {PUJA_DAYS.map((d) => (
                <button
                  key={d.id}
                  role="tab"
                  type="button"
                  aria-selected={d.id === dayId}
                  onClick={() => setDayId(d.id)}
                  className={cn(
                    'relative shrink-0 rounded-sm border px-3.5 py-2 text-xs font-semibold transition-colors',
                    d.id === dayId ? 'border-gold-bright text-gold-bright' : 'border-hair-soft text-muted hover:text-ink',
                  )}
                >
                  {d.id === dayId && (
                    <motion.span layoutId="advisory-tab" className="absolute inset-0 rounded-sm bg-gold/15" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{d.short}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 content-center gap-x-6 gap-y-8 sm:grid-cols-2" aria-live="polite">
            <Indicator icon={<Users className="size-3.5" />} label="Crowd level">
              <div className="flex items-center gap-1.5" role="img" aria-label={`Crowd level ${a.crowd} of 5: ${a.crowdLabel}`}>
                {CROWD_COLOURS.map((c, i) => (
                  <motion.span
                    key={i}
                    className="h-2.5 flex-1 rounded-[1px]"
                    animate={{
                      backgroundColor: i < a.crowd ? c : 'rgba(128,128,128,0.22)',
                      scaleY: i < a.crowd ? 1 : 0.5,
                    }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  />
                ))}
              </div>
              <p className="mt-2 font-display text-2xl font-semibold">{a.crowdLabel}</p>
            </Indicator>

            <Indicator icon={<TrainFront className="size-3.5" />} label="Metro availability">
              <p className="flex items-start gap-2.5 text-[15px] font-semibold leading-snug">
                <span className="relative mt-1.5 size-2.5 shrink-0">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-[#10B981]" />
                  <span className="absolute inset-0 rounded-full bg-[#10B981]" />
                </span>
                {a.metro}
              </p>
            </Indicator>

            <Indicator icon={<Footprints className="size-3.5" />} label="Estimated walking delay">
              <p className="font-display text-2xl font-semibold tabular-nums">{a.walkingDelay}</p>
              <p className="text-xs text-muted">on top of the listed walking time</p>
            </Indicator>

            <Indicator icon={<Megaphone className="size-3.5" />} label="Special service information">
              <p className="text-sm leading-snug">{a.service}</p>
            </Indicator>
          </div>
        </div>
        <p className="border-t border-hair-soft px-6 py-3 text-[11px] text-muted md:px-10">
          Indicative guidance based on previous years. Confirm timetables with Metro Railway Kolkata before you travel.
        </p>
      </Reveal>
    </section>
  );
}
