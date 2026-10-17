import { AnimatePresence, motion } from 'motion/react';
import { Footprints, TrainFront, TriangleAlert, Users, Megaphone } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Reveal } from '@/components/ui/primitives';
import { LINE_ORDER } from '@/data/metroLines';
import { LINE_SERVICES, PHASE_LABEL, SERVICE_SOURCE_NOTE, type ServicePhase } from '@/data/metroServices';
import { currentPujaDay, PUJA_DAYS } from '@/data/pujaDates';
import { cn } from '@/lib/utils';

/** Which special timetable applies to each puja day (Mahalaya runs the normal one). */
const PHASE_OF_DAY: Record<string, ServicePhase | undefined> = {
  sashthi: 'sashthi',
  saptami: 'saptami-navami',
  ashtami: 'saptami-navami',
  navami: 'saptami-navami',
  dashami: 'dashami',
};

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
  const phase = PHASE_OF_DAY[day.id];
  const a = day.advisory;
  const severe = a.crowd >= 4;

  return (
    <section aria-labelledby="advisory-title" className="shell pt-16 md:pt-24">
      <Reveal
        className="relative overflow-hidden rounded-[22px] border border-hair shadow-[var(--shadow)]"
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
        {phase && (
          <div className="border-t border-hair px-6 py-6 md:px-10">
            <h3 className="flex flex-wrap items-baseline gap-x-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
              <span className="text-gold">Metro by line</span>
              <span>{PHASE_LABEL[phase]}</span>
            </h3>
            <ul className="mt-4 grid gap-px overflow-hidden border border-hair-soft bg-hair-soft sm:grid-cols-2 xl:grid-cols-5">
              {LINE_ORDER.map((id) => {
                const line = LINE_SERVICES[id];
                const s = line.phases[phase];
                return (
                  <li key={id} className="bg-surface px-4 py-3">
                    <p className="flex items-center gap-2 text-xs font-bold">
                      <span className="size-2.5 rounded-full" style={{ background: `var(--${id}-line)` }} aria-hidden="true" />
                      {line.name}
                    </p>
                    <p className={cn('mt-1.5 font-display text-[17px] font-semibold leading-tight', s.hours ? 'text-ink' : 'text-red')}>
                      {s.hours ?? 'Not running'}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-muted">{s.detail}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-[11px] text-muted">{SERVICE_SOURCE_NOTE}</p>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hair bg-surface-2/70 px-6 py-3.5 md:px-10">
          <p className="flex items-center gap-2 text-xs text-muted">
            <span className="size-2 rounded-full bg-red animate-pulse" />
            <span>Kolkata Police Traffic Restriction: No vehicular entry 3:00 PM – 4:00 AM on festival days.</span>
          </p>
        </div>
        <p className="border-t border-hair-soft px-6 py-2.5 text-[11px] text-muted md:px-10">
          Indicative guidance based on official releases. Confirm timetables with Metro Railway Kolkata before you travel.
        </p>
      </Reveal>
    </section>
  );
}
