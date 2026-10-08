import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Clock, Footprints, Heart, HeartOff, TrainFront, Trash2 } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PandalCover } from '@/components/PandalCard/PandalCover';
import { Counter, EmptyState, LineDot, Reveal } from '@/components/ui/primitives';
import { Alpana } from '@/components/ui/Motifs';
import type { Pandal } from '@/data/types';
import { useFavorites } from '@/hooks/useFavorites';
import { buildDayPlan } from '@/lib/route';
import { cn, formatKm } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

export function useItinerary() {
  const fav = useFavorites();
  const skipped = useAppStore((s) => s.planSkipped);
  const start = useAppStore((s) => s.planStartMinutes);
  return useMemo(() => {
    const included = fav.pandals.filter((p) => !skipped.includes(p.id));
    return { ...fav, included, skipped, plan: buildDayPlan(included, start) };
  }, [fav, skipped, start]);
}

export function ItineraryStats({ className }: { className?: string }) {
  const { count, stationCount, walkingKm, plan } = useItinerary();
  const hours = plan.totalMinutes / 60;
  const stats: { icon: ReactNode; value: ReactNode; label: string }[] = [
    { icon: <Heart className="size-4 fill-red text-red" />, value: <Counter value={count} />, label: count === 1 ? 'pandal saved' : 'pandals saved' },
    { icon: <TrainFront className="size-4" />, value: <Counter value={stationCount} />, label: stationCount === 1 ? 'Metro station' : 'Metro stations' },
    { icon: <Footprints className="size-4" />, value: <><Counter value={walkingKm} decimals={1} /><small className="ml-1 text-[0.45em] font-sans font-bold uppercase tracking-widest">km</small></>, label: 'walking from stations' },
    { icon: <Clock className="size-4" />, value: <><Counter value={hours} decimals={1} /><small className="ml-1 text-[0.45em] font-sans font-bold uppercase tracking-widest">hrs</small></>, label: 'estimated exploration' },
  ];
  return (
    <dl className={cn('grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-hair bg-hair lg:grid-cols-4', className)}>
      {stats.map((s) => (
        <div key={s.label} className="bg-surface px-5 py-5 md:px-7 md:py-7">
          <dd className="display flex items-baseline text-[clamp(2.4rem,4.4vw,4.2rem)] text-gold-bright">{s.value}</dd>
          <dt className="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            <span className="text-gold" aria-hidden="true">{s.icon}</span>
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

export function SavedRow({ pandal: p, selectable }: { pandal: Pandal; selectable?: boolean }) {
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const skipped = useAppStore((s) => s.planSkipped.includes(p.id));
  const toggleSkip = useAppStore((s) => s.togglePlanSkip);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className={cn('flex items-stretch border border-hair-soft bg-surface transition-opacity', selectable && skipped && 'opacity-55')}
    >
      {selectable && (
        <label className="grid w-11 shrink-0 cursor-pointer place-items-center border-r border-hair-soft">
          <input
            type="checkbox"
            checked={!skipped}
            onChange={() => toggleSkip(p.id)}
            className="size-4 accent-[#ddaa44]"
            aria-label={`Include ${p.name} in the day plan`}
          />
        </label>
      )}
      <PandalCover pandal={p} sizes="96px" className="w-20 shrink-0 sm:w-24" />
      <div className="min-w-0 flex-1 px-3.5 py-3">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-muted">
          <LineDot line={p.line} className="size-2" /> {p.station}
        </p>
        <Link to={`/pandal/${p.id}`} className="mt-0.5 block truncate font-display text-lg font-semibold leading-tight hover:text-gold-bright">
          {p.name}
        </Link>
        <p className="mt-0.5 text-xs tabular-nums text-muted">
          {formatKm(p.distanceKm)} · {p.walkingMinutes} min walk
        </p>
      </div>
      <button
        type="button"
        onClick={() => toggleFavorite(p.id, p.name)}
        className="grid w-12 shrink-0 place-items-center border-l border-hair-soft text-muted transition-colors hover:bg-red/10 hover:text-red"
        aria-label={`Remove ${p.name} from My Puja List`}
      >
        <Trash2 className="size-4" />
      </button>
    </motion.li>
  );
}

/** Home-page chapter: the reader's own shortlist, summarised as an itinerary. */
export function MyPujaListSection() {
  const { pandals, count, plan } = useItinerary();

  return (
    <section id="my-list" aria-labelledby="mylist-title" className="relative overflow-hidden pt-24 md:pt-36">
      <Alpana className="pointer-events-none absolute -right-40 top-10 size-[640px] text-gold opacity-[0.07]" />
      <div className="shell relative">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="eyebrow">Your itinerary</p>
            <h2 id="mylist-title" className="display mt-4 text-[clamp(2.6rem,7vw,6.5rem)]">
              My Puja <em className="font-medium text-gold">list</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm pb-2 text-muted lg:text-right">
            Save pandals as you browse. They stay on this device and become a Metro route you can follow on the day.
          </Reveal>
        </div>

        {count === 0 ? (
          <Reveal className="mt-10">
            <EmptyState
              icon={<HeartOff className="size-6" />}
              title="Your list is waiting for its first Thakur"
              action={
                <Link to="/explore" className="btn btn-primary">
                  Find pandals to save <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
            >
              Tap the heart on any pandal. Your saved places, walking distance and a station-by-station day plan will
              appear here.
            </EmptyState>
          </Reveal>
        ) : (
          <>
            <Reveal className="mt-10">
              <ItineraryStats />
            </Reveal>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <ul className="grid content-start gap-2.5">
                <AnimatePresence initial={false}>
                  {pandals.slice(0, 4).map((p) => (
                    <SavedRow key={p.id} pandal={p} />
                  ))}
                </AnimatePresence>
                {count > 4 && <li className="pt-1 text-sm text-muted">+ {count - 4} more saved</li>}
              </ul>
              <Reveal className="panel flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="eyebrow">Suggested order</p>
                  <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
                    {plan.stationIds.map((sid, i) => {
                      const step = plan.steps.find((s) => s.kind === 'station' && s.stationId === sid)!;
                      return (
                        <li key={sid} className="flex items-center gap-2">
                          {i > 0 && <ArrowRight className="size-3.5 text-muted" aria-hidden="true" />}
                          <span className="flex items-center gap-2 font-display text-xl font-semibold">
                            {step.line && <LineDot line={step.line} />}
                            {step.title}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <Link to="/favorites" className="btn btn-primary mt-8 self-start">
                  Plan my Puja day <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
