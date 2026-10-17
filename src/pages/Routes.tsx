import { motion } from 'motion/react';
import { Clock, Footprints, Landmark, Navigation, Route, TrainFront } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapShareButton } from '@/components/Share/MapShare';
import { SectionHeading } from '@/components/ui/primitives';
import { LINE_BY_ID, STATIONS } from '@/data/metroLines';
import { MAX_ROUTE_STOPS, routeUrl } from '@/lib/googleMaps';
import { buildHopRoutes, type HopRoute } from '@/lib/hopRoutes';
import { usePageTitle } from '@/hooks/useMedia';
import { formatDuration, formatKm } from '@/lib/utils';

function RouteCard({ route }: { route: HopRoute }) {
  const stops = route.stopsList.map((s) => s.pandal);
  const walk = routeUrl(stops, 'walking');
  const drive = routeUrl(stops, 'driving');
  const start = STATIONS[route.startStationId];
  const line = LINE_BY_ID[start.lines[0]];

  return (
    <section id={route.id} aria-labelledby={`${route.id}-title`} className="scroll-mt-28 border-t border-hair pt-12 md:pt-16">
      <p className="eyebrow flex items-center gap-2">
        <TrainFront className="size-3.5" aria-hidden="true" style={{ color: `var(--${start.lines[0]}-line)` }} /> {route.kicker} · {line.name}
      </p>
      <h2 id={`${route.id}-title`} className="display mt-3 text-[clamp(2rem,4.5vw,3.8rem)]">
        {route.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted">{route.blurb}</p>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-hair-soft bg-hair-soft sm:grid-cols-4">
        {[
          ['Pandals', String(route.stopsList.length)],
          ['Walking', formatKm(route.totalKm)],
          ['On foot', formatDuration(route.walkMinutes)],
          ['With darshan', `~${formatDuration(route.totalMinutes)}`],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface px-4 py-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{k}</dt>
            <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-gold-bright">{v}</dd>
          </div>
        ))}
      </dl>

      <ol className="mt-8 grid gap-x-8 gap-y-0 lg:grid-cols-2">
        <li className="col-span-full mb-1 flex items-center gap-3 text-sm text-muted">
          <span className="grid size-8 place-items-center rounded-full border-[3px] bg-surface" style={{ borderColor: `var(--${start.lines[0]}-line)` }}>
            <TrainFront className="size-3.5" aria-hidden="true" />
          </span>
          Start at <strong className="text-ink">{route.startName}</strong> Metro
        </li>
        {route.stopsList.map((s, i) => {
          const far = s.legKm > 2.2;
          return (
            <li key={s.pandal.id} className="relative grid grid-cols-[32px_1fr] gap-x-3 py-2">
              <span className="mt-1 grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#ffd66b] to-[#ddaa44] text-sm font-bold text-[#1a0c08]">{i + 1}</span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[11px] text-muted">
                  {far ? <Navigation className="size-3" aria-hidden="true" /> : <Footprints className="size-3" aria-hidden="true" />}
                  {formatKm(s.legKm)} · {s.legMinutes} min{far ? ' · auto is easier' : ''}
                </p>
                <Link to={`/pandal/${s.pandal.id}`} className="group mt-0.5 block border border-hair-soft bg-surface/70 px-4 py-3 transition-colors hover:border-gold/70">
                  <span className="block font-display text-lg font-semibold leading-tight group-hover:text-gold-bright">{s.pandal.name}</span>
                  <span className="mt-0.5 block text-xs italic text-gold">{s.pandal.theme || `Near ${s.pandal.station} Metro`}</span>
                  {s.pandal.theme && <span className="mt-0.5 block text-[11px] text-muted">Near {s.pandal.station} Metro</span>}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      {route.note && <p className="mt-4 flex items-start gap-2 text-xs text-muted"><Clock className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" /> {route.note}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <a href={walk.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary !rounded-full">
          <Navigation className="size-3.5" aria-hidden="true" /> Open route in Google Maps
        </a>
        <MapShareButton
          label="QR"
          title={route.title}
          subtitle={`${walk.included} pandals, in walking order`}
          options={[
            { id: 'walking', label: 'Walking', url: walk.url },
            { id: 'driving', label: 'Driving', url: drive.url },
          ]}
          note={
            <>
              Google Maps starts from where you are and visits the pandals in this order.
              {walk.dropped > 0 && ` A link holds at most ${MAX_ROUTE_STOPS} stops, so the first ${MAX_ROUTE_STOPS} are included.`}
            </>
          }
          fileName={route.id}
          className="!rounded-full"
        />
        <Link to="/favorites" className="btn btn-sm btn-ghost !rounded-full">
          <Route className="size-3.5" aria-hidden="true" /> Plan with Metro rides
        </Link>
      </div>
    </section>
  );
}

export default function RoutesPage() {
  usePageTitle('Pandal-hopping routes');
  const routes = useMemo(buildHopRoutes, []);

  return (
    <div className="shell pt-28 md:pt-36">
      <SectionHeading
        as="h1"
        eyebrow="Pandal hopping"
        title={
          <>
            Walking <em className="font-medium text-gold">routes</em>
          </>
        }
        lead="Five ready-made routes through the busiest parts of the city. Each starts at a Metro station, visits the most popular pandals in that area in walking order, and opens as one Google Maps route."
      />

      <nav aria-label="Routes" className="mt-8 flex flex-wrap gap-2">
        {routes.map((r) => (
          <a key={r.id} href={`#${r.id}`} className="btn btn-sm btn-ghost !rounded-full">
            <Landmark className="size-3.5" aria-hidden="true" /> {r.title}
          </a>
        ))}
        <Link to="/explore" className="btn btn-sm btn-ghost !rounded-full">
          <TrainFront className="size-3.5" aria-hidden="true" /> By Metro station
        </Link>
      </nav>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-10 space-y-16 md:mt-14 md:space-y-24">
        {routes.map((r) => (
          <RouteCard key={r.id} route={r} />
        ))}
      </motion.div>

      <p className="mt-16 max-w-2xl text-xs leading-relaxed text-muted">
        Routes are built from this guide's own list and map points: the most popular pandals within walking range of the
        start station, ordered nearest-first. Distances allow for lanes and are estimates; pandal entrances and one-way crowd
        routes change every year, so check Google Maps and Kolkata Police directions on the day.
      </p>
    </div>
  );
}
