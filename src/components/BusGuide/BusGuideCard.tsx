import { Bus, ExternalLink, TrainFront } from 'lucide-react';
import { BUS_GUIDE_CREDIT, busAreasOf, type BusArea } from '@/data/busGuide';

function Buses({ buses }: { buses: string[] }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {buses.map((b) => (
        <span key={b} className="rounded-sm border border-hair bg-surface px-2 py-0.5 font-mono text-[12px] font-semibold tabular-nums">
          {b}
        </span>
      ))}
    </span>
  );
}

function Area({ area, showTitle }: { area: BusArea; showTitle: boolean }) {
  return (
    <div>
      {showTitle && <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{area.title}</h3>}
      <ul className="mt-3 divide-y divide-hair-soft border-y border-hair-soft">
        {area.origins.map((o) => (
          <li key={o.from} className="grid gap-1.5 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
            <span className="text-sm font-semibold">From {o.from}</span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-wider text-muted">{o.bound}</span>
              <span className="mt-1.5 block">
                <Buses buses={o.buses} />
              </span>
              {o.then && <span className="mt-1.5 block text-xs text-muted">{o.then}</span>}
            </span>
          </li>
        ))}
        <li className="grid gap-1.5 py-3 sm:grid-cols-[170px_1fr] sm:gap-4">
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <TrainFront className="size-3.5 text-gold" aria-hidden="true" /> By Metro
          </span>
          <span className="min-w-0 text-sm">
            Get off at <strong>{area.metro.station}</strong>
            {area.metro.then && <>, then {area.metro.then}</>}
            {area.metro.buses && (
              <>
                <span className="mt-1.5 block text-[11px] uppercase tracking-wider text-muted">{area.metro.bound}</span>
                <span className="mt-1.5 block">
                  <Buses buses={area.metro.buses} />
                </span>
              </>
            )}
          </span>
        </li>
        {area.tram && (
          <li className="py-3 text-sm">
            <span className="font-semibold">By tram.</span> {area.tram}
          </li>
        )}
      </ul>
    </div>
  );
}

/** Which buses to take to this pandal's area, from Kolkata Bus-O-Pedia's puja guide posters. */
export function BusGuideCard({ pandalId }: { pandalId: string }) {
  const areas = busAreasOf(pandalId);
  if (!areas.length) return null;
  return (
    <section aria-labelledby="bus-guide-title" className="mt-2 border-t border-hair-soft pt-6">
      <h2 id="bus-guide-title" className="eyebrow flex items-center gap-2">
        <Bus className="size-3.5" aria-hidden="true" /> Reaching it by bus
      </h2>
      <div className="mt-4 space-y-6">
        {areas.map((a) => (
          <Area key={a.id} area={a} showTitle={areas.length > 1} />
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        Routes from{' '}
        <a href={BUS_GUIDE_CREDIT.site} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 underline decoration-hair underline-offset-4 hover:text-gold-bright">
          {BUS_GUIDE_CREDIT.name} <ExternalLink className="size-3" aria-hidden="true" />
        </a>
        &rsquo;s Durga Puja guide. Bus routes and stops can change during the festival, so check Bus-O-Pedia for the latest.
      </p>
    </section>
  );
}
