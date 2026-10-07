import { ArrowLeft, ArrowRight, MapPinned, TrainFront, TrainTrack } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PandalCard } from '@/components/PandalCard/PandalCard';
import { Counter, EmptyState, LineBadge, Reveal } from '@/components/ui/primitives';
import { Alpana } from '@/components/ui/Motifs';
import { stationPandals } from '@/data';
import { LINE_BY_ID, STATIONS } from '@/data/metroLines';
import { usePageTitle } from '@/hooks/useMedia';
import { formatKm } from '@/lib/utils';

export default function StationDetail() {
  const { id = '' } = useParams();
  const station = STATIONS[id];
  usePageTitle(station ? `${station.name} Metro · pandals nearby` : 'Station not found');

  if (!station)
    return (
      <div className="shell pt-36">
        <EmptyState
          icon={<TrainTrack className="size-6" />}
          title="That station isn’t on our map"
          action={
            <Link to="/explore" className="btn btn-primary">
              Choose a station
            </Link>
          }
        >
          Check the link, or pick a station from the Metro timeline in the explorer.
        </EmptyState>
      </div>
    );

  const pandals = stationPandals(station.id);
  const within1 = pandals.filter((p) => p.distanceKm <= 1).length;

  return (
    <div className="relative overflow-hidden">
      <Alpana className="pointer-events-none absolute -right-56 -top-20 size-[720px] text-gold opacity-[0.06]" />
      <div className="shell relative pt-28 md:pt-36">
        <Link to="/explore" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted hover:text-gold-bright">
          <ArrowLeft className="size-3.5" aria-hidden="true" /> Pandal Explorer
        </Link>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="flex flex-wrap items-center gap-2">
              {station.lines.map((l) => (
                <LineBadge key={l} line={l} />
              ))}
              <span className="eyebrow ml-1">Metro station{station.area ? ` · ${station.area}` : ''}</span>
            </p>
            <h1 className="display mt-4 text-[clamp(2.8rem,8vw,7.5rem)]">{station.name}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to={`/map?station=${station.id}`} className="btn btn-primary">
              <MapPinned className="size-4" aria-hidden="true" /> Show on map
            </Link>
          </Reveal>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-hair bg-hair">
          {[
            { label: 'Pandals nearby', value: <Counter value={pandals.length} /> },
            { label: 'Within 1 km', value: <Counter value={within1} /> },
            { label: 'Nearest', value: pandals[0] ? formatKm(pandals[0].distanceKm) : '—' },
          ].map((s) => (
            <div key={s.label} className="bg-surface px-4 py-5 md:px-7 md:py-6">
              <dd className="display text-[clamp(1.9rem,4vw,3.6rem)] text-gold-bright">{s.value}</dd>
              <dt className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* Where this stop sits on each of its lines */}
        <nav aria-label="Neighbouring stations" className="mt-6 grid gap-3 md:grid-cols-2">
          {station.lines.map((lineId) => {
            const line = LINE_BY_ID[lineId];
            const i = line.stations.indexOf(station.id);
            const prev = STATIONS[line.stations[i - 1]];
            const next = STATIONS[line.stations[i + 1]];
            return (
              <div key={lineId} className="flex items-center gap-3 border border-hair-soft bg-surface/60 px-4 py-3">
                {prev ? (
                  <Link to={`/station/${prev.id}`} className="flex min-w-0 flex-1 items-center gap-2 text-sm hover:text-gold-bright">
                    <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{prev.name}</span>
                  </Link>
                ) : (
                  <span className="flex-1 text-xs uppercase tracking-widest text-muted">Terminus</span>
                )}
                <span className="flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: `var(--${lineId}-line)` }}>
                  <TrainFront className="size-4" aria-hidden="true" /> {line.short}
                </span>
                {next ? (
                  <Link to={`/station/${next.id}`} className="flex min-w-0 flex-1 items-center justify-end gap-2 text-sm hover:text-gold-bright">
                    <span className="truncate">{next.name}</span>
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="flex-1 text-right text-xs uppercase tracking-widest text-muted">Terminus</span>
                )}
              </div>
            );
          })}
        </nav>

        <section aria-labelledby="station-pandals" className="pt-14 md:pt-20">
          <h2 id="station-pandals" className="display text-[clamp(1.9rem,4vw,3.5rem)]">
            Walk from here, <em className="font-medium text-gold">nearest first</em>
          </h2>
          {pandals.length ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
              {pandals.map((p) => (
                <li key={p.id}>
                  <PandalCard pandal={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState className="mt-8" icon={<TrainFront className="size-6" />} title="No pandals listed here yet">
              Nothing in this year’s list is within walking distance of {station.name}. Try the neighbouring stations
              above.
            </EmptyState>
          )}
        </section>
      </div>
    </div>
  );
}
