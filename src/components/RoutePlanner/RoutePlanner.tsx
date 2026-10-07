import { motion } from 'motion/react';
import { Car, Check, ClipboardCopy, Flag, Footprints, Landmark, Route, TrainFront } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui/primitives';
import { LINE_BY_ID, STATIONS } from '@/data/metroLines';
import type { Pandal } from '@/data/types';
import { buildDayPlan, type PlanStep } from '@/lib/route';
import { cn, formatClock, formatDuration, formatKm } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

const START_TIMES = Array.from({ length: 25 }, (_, i) => 7 * 60 + i * 30);

function StepRow({ step, last }: { step: PlanStep; last: boolean }) {
  const color = step.line ? `var(--${step.line}-line)` : 'var(--gold)';
  const travel = step.kind === 'metro' || step.kind === 'walk' || step.kind === 'road';

  let node: ReactNode;
  if (step.kind === 'station')
    node = (
      <span className="grid size-9 place-items-center rounded-full border-[3px] bg-surface" style={{ borderColor: color }}>
        <TrainFront className="size-4" style={{ color }} aria-hidden="true" />
      </span>
    );
  else if (step.kind === 'visit')
    node = (
      <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-[#ffd66b] to-[#ddaa44] text-[#1a0c08]">
        <Landmark className="size-4" aria-hidden="true" />
      </span>
    );
  else if (step.kind === 'finish')
    node = (
      <span className="grid size-9 place-items-center rounded-full bg-red text-white">
        <Flag className="size-4" aria-hidden="true" />
      </span>
    );
  else
    node = (
      <span className="grid size-9 place-items-center text-muted">
        {step.kind === 'metro' ? <TrainFront className="size-4" style={{ color }} /> : step.kind === 'road' ? <Car className="size-4" /> : <Footprints className="size-4" />}
      </span>
    );

  return (
    <li className="relative grid grid-cols-[52px_36px_1fr] gap-x-3 sm:grid-cols-[60px_36px_1fr] sm:gap-x-4">
      <time className={cn('pt-2 text-right text-sm tabular-nums', travel ? 'text-muted' : 'font-bold text-ink')}>
        {travel ? '' : formatClock(step.at)}
      </time>
      <div className="relative flex flex-col items-center">
        {node}
        {!last && (
          <span
            aria-hidden="true"
            className="w-[3px] flex-1 rounded-full"
            style={
              step.kind === 'metro'
                ? { background: color, minHeight: 34 }
                : step.kind === 'walk' || step.kind === 'road'
                  ? { background: `repeating-linear-gradient(var(--muted) 0 4px, transparent 4px 9px)`, minHeight: 22, opacity: 0.6 }
                  : { background: 'var(--hair)', minHeight: 12 }
            }
          />
        )}
      </div>
      <div className={cn('min-w-0', travel ? 'pb-3 pt-2' : 'pb-4 pt-1')}>
        {step.kind === 'visit' && step.pandalId ? (
          <Link to={`/pandal/${step.pandalId}`} className="group block border border-hair-soft bg-surface/70 px-4 py-3 transition-colors hover:border-gold/70">
            <span className="block font-display text-lg font-semibold leading-tight group-hover:text-gold-bright">{step.title}</span>
            <span className="mt-0.5 block truncate text-xs italic text-gold">{step.detail}</span>
            <span className="mt-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Darshan · {formatDuration(step.minutes)}</span>
          </Link>
        ) : step.kind === 'station' ? (
          <>
            <p className="font-display text-xl font-semibold leading-tight">{step.title}</p>
            <p className="text-xs text-muted">
              {step.line && `${LINE_BY_ID[step.line].name} · `}
              {step.detail}
            </p>
          </>
        ) : step.kind === 'finish' ? (
          <p className="pt-1.5 font-display text-lg font-semibold text-gold-bright">{step.title}</p>
        ) : (
          <>
            <p className="text-sm font-semibold">
              {step.title} <span className="font-normal text-muted">· {formatDuration(step.minutes)}</span>
            </p>
            {step.detail && <p className="text-xs text-muted">{step.detail}</p>}
          </>
        )}
      </div>
    </li>
  );
}

/** Turns the chosen pandals into a station-by-station day: Metro hops, walks and darshan stops with times. */
export function RoutePlanner({ pandals }: { pandals: Pandal[] }) {
  const start = useAppStore((s) => s.planStartMinutes);
  const setStart = useAppStore((s) => s.setPlanStart);
  const pushToast = useAppStore((s) => s.pushToast);
  const plan = useMemo(() => buildDayPlan(pandals, start), [pandals, start]);

  const copy = async () => {
    const text = [
      'My Pujo day — Pujo by Metro 2026',
      ...plan.steps.map((s) =>
        s.kind === 'station' || s.kind === 'visit' || s.kind === 'finish'
          ? `${formatClock(s.at)}  ${s.title}`
          : `        ↓ ${s.title} (${formatDuration(s.minutes)})`,
      ),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      pushToast('Day plan copied to clipboard');
    } catch {
      pushToast('Copying is blocked in this browser');
    }
  };

  return (
    <section aria-labelledby="planner-title" className="panel p-5 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <Route className="size-3.5" aria-hidden="true" /> Route planner
          </p>
          <h2 id="planner-title" className="display mt-3 text-4xl md:text-5xl">
            Plan my Puja day
          </h2>
        </div>
        <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
          Start at
          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="mt-1.5 block h-10 rounded-sm border border-hair bg-surface px-3 text-sm font-semibold tracking-normal text-ink outline-none focus:border-gold-bright"
          >
            {START_TIMES.map((m) => (
              <option key={m} value={m}>
                {formatClock(m)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {pandals.length === 0 ? (
        <EmptyState className="mt-8" icon={<Route className="size-6" />} title="Tick a pandal to begin">
          Choose at least one saved pandal on the left and the planner will order the stations, Metro rides and walks
          for you.
        </EmptyState>
      ) : (
        <>
          <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-hair-soft bg-hair-soft sm:grid-cols-4">
            {[
              ['Finishes', formatClock(plan.endsAt)],
              ['Total time', formatDuration(plan.totalMinutes)],
              ['On foot', formatKm(plan.walkingKm)],
              ['On the Metro', formatDuration(plan.metroMinutes)],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface px-4 py-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{k}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-gold-bright">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Station sequence */}
          <ol aria-label="Station sequence" className="no-scrollbar mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            {plan.stationIds.map((sid, i) => (
              <li key={sid} className="flex shrink-0 items-center gap-2">
                {i > 0 && <span className="h-0.5 w-6 rounded-full bg-hair" aria-hidden="true" />}
                <span className="flex items-center gap-2 rounded-full border border-hair px-3 py-1.5 text-xs font-semibold">
                  <span className="size-2.5 rounded-full" style={{ background: `var(--${STATIONS[sid].lines[0]}-line)` }} aria-hidden="true" />
                  {STATIONS[sid].name}
                </span>
              </li>
            ))}
          </ol>

          <motion.ol
            key={`${start}-${pandals.map((p) => p.id).join()}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-7"
          >
            {plan.steps.map((s, i) => (
              <StepRow key={i} step={s} last={i === plan.steps.length - 1} />
            ))}
          </motion.ol>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hair-soft pt-5">
            <p className="flex max-w-md items-start gap-2 text-xs text-muted">
              <Check className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
              Times assume about 2.5 minutes per Metro stop, a 5 minute platform wait and 20–35 minutes at each
              pandal. Add the advisory’s walking delay on peak nights.
            </p>
            <button type="button" className="btn btn-sm btn-ghost" onClick={copy}>
              <ClipboardCopy className="size-3.5" aria-hidden="true" /> Copy plan
            </button>
          </div>
        </>
      )}
    </section>
  );
}
