import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Car, Clock, DoorOpen, Flag, Hourglass, Play, Footprints, MapPin, MapPinned, Navigation, Palette, SearchX, ShieldCheck, Sparkles, TrainFront } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InstagramLink, PandalCard, SaveButton } from '@/components/PandalCard/PandalCard';
import { PandalCover } from '@/components/PandalCard/PandalCover';
import { EmptyState, LineBadge } from '@/components/ui/primitives';
import { PANDAL_BY_ID, stationPandals } from '@/data';
import { reelsOf } from '@/data/instagram';
import { themeIdOf } from '@/data/themes';
import { usePageTitle } from '@/hooks/useMedia';
import { formatKm, isFestivalOn, isOpenNow, summaryOf } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-t border-hair-soft py-4">
      <span className="mt-0.5 text-gold" aria-hidden="true">
        {icon}
      </span>
      <div>
        <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">{label}</dt>
        <dd className="mt-1 text-[15px]">{children}</dd>
      </div>
    </div>
  );
}

export default function PandalDetail() {
  const { id = '' } = useParams();
  const p = PANDAL_BY_ID.get(id);
  usePageTitle(p ? `${p.name} · ${p.station} Metro` : 'Pandal not found');

  if (!p)
    return (
      <div className="shell pt-36">
        <EmptyState
          icon={<SearchX className="size-6" />}
          title="We couldn’t find that pandal"
          action={
            <Link to="/explore" className="btn btn-primary">
              Back to the explorer
            </Link>
          }
        >
          The link may be out of date, or the pandal has been renamed in this year’s list.
        </EmptyState>
      </div>
    );

  const nearby = stationPandals(p.stationId)
    .filter((o) => o.id !== p.id)
    .slice(0, 4);
  const open = isOpenNow(p);
  const reels = reelsOf(p.id);

  return (
    <article>
      {/* Cinematic header */}
      <header data-theme="dark" className="grain relative isolate flex min-h-[68vh] items-end overflow-hidden bg-[#120909] md:min-h-[76vh]">
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
          <PandalCover pandal={p} bare alt={`${p.name} pandal`} sizes="100vw" eager className="absolute inset-0" imgClassName={p.hasPhoto ? 'object-[50%_30%]' : undefined} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120909] via-[#120909]/55 to-[#120909]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#120909]/80 to-transparent" />

        <div className="shell relative pb-10 pt-32 md:pb-16">
          <Link to="/explore" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted hover:text-gold-bright">
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Pandal Explorer
          </Link>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <LineBadge line={p.line} />
              {p.tags.map((t) => (
                <span key={t} className="tag bg-[#120909]/50 backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="display mt-4 max-w-5xl text-[clamp(2.6rem,7.5vw,7rem)]">{p.name}</h1>
            {p.theme ? (
              <p className="mt-3 font-display text-xl italic text-gold-bright md:text-2xl">{p.theme}</p>
            ) : (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-hair px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                <Hourglass className="size-3.5 text-gold" aria-hidden="true" /> 2026 theme not announced yet
              </p>
            )}
          </motion.div>
        </div>
      </header>

      <div className="shell grid gap-10 pt-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)] lg:gap-16 lg:pt-16">
        <div>
          <p className="max-w-2xl font-display text-[clamp(1.25rem,2vw,1.7rem)] leading-snug">{summaryOf(p)}</p>
          <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
            <Fact icon={<Sparkles className="size-4" />} label="Theme category">
              <Link to={`/themes?theme=${themeIdOf(p.category)}`} className="underline decoration-hair underline-offset-4 hover:text-gold-bright">
                {p.category}
              </Link>
            </Fact>
            <Fact icon={<Palette className="size-4" />} label="Artist / idol makers">
              {p.artist}
            </Fact>
            <Fact icon={<Clock className="size-4" />} label="Darshan">
              {p.darshanTime}
            </Fact>
            <Fact icon={<DoorOpen className="size-4" />} label="Suggested Metro exit">
              {p.metroExit}
            </Fact>
          </dl>
          {reels.length > 0 && (
            <section aria-labelledby="reels-title" className="mt-2 border-t border-hair-soft pt-6">
              <h2 id="reels-title" className="eyebrow">Watch on Instagram</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {reels.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 border border-hair bg-surface px-4 py-3.5 transition-colors hover:border-gold"
                      aria-label={`${r.title}, a reel by @${r.by} (opens Instagram in a new tab)`}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e52d3f] to-[#701525] text-white">
                        <Play className="size-4 translate-x-px fill-current" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold leading-snug group-hover:text-gold-bright">{r.title}</span>
                        <span className="block truncate text-xs text-muted">Reel by @{r.by}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <p className="mt-6 border-t border-hair-soft pt-4 text-xs text-muted">
            {!p.hasPhoto && 'We don’t have a photograph of this pandal yet, so the cover above is an illustration. '}
            The map marker is placed at the listed walking distance from the station, not at a surveyed address. Use
            “Get directions” for turn-by-turn walking.
          </p>
        </div>

        {/* Getting there */}
        <aside className="panel self-start p-6 md:p-7 lg:sticky lg:top-28" aria-label="Getting there">
          <p className="eyebrow">Getting there</p>
          <Link to={`/station/${p.stationId}`} className="group mt-4 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border-[3px]" style={{ borderColor: `var(--${p.line}-line)` }}>
              <TrainFront className="size-5" style={{ color: `var(--${p.line}-line)` }} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold leading-tight group-hover:text-gold-bright">{p.station}</span>
              <span className="text-xs text-muted">Nearest Metro station</span>
            </span>
          </Link>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-hair-soft bg-hair-soft">
            <div className="bg-surface p-4">
              <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                <MapPin className="size-3.5 text-gold" aria-hidden="true" /> Distance
              </dt>
              <dd className="display mt-1.5 text-4xl text-gold-bright">{formatKm(p.distanceKm)}</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                <Footprints className="size-3.5 text-gold" aria-hidden="true" /> On foot
              </dt>
              <dd className="display mt-1.5 text-4xl text-gold-bright">
                {p.walkingMinutes}
                <small className="ml-1 font-sans text-xs font-bold uppercase tracking-widest">min</small>
              </dd>
            </div>
          </dl>

          <p className="mt-4 flex items-center gap-2.5 text-sm">
            <span className={`size-2.5 rounded-full ${open ? 'bg-[#10B981]' : 'bg-muted'}`} aria-hidden="true" />
            {open ? 'Open for darshan now' : isFestivalOn() ? 'Closed at the moment' : 'Darshan opens from 14 October'}
          </p>

          <div className="mt-6 grid gap-2.5">
            <a href={p.mapUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              <Navigation className="size-4" aria-hidden="true" /> Get directions
            </a>
            <div className="grid grid-cols-2 gap-2.5">
              <Link to={`/map?pandal=${p.id}`} className="btn btn-sm btn-ghost h-11">
                <MapPinned className="size-4" aria-hidden="true" /> View map
              </Link>
              <SaveButton pandal={p} variant="label" className="h-11" />
            </div>
            <InstagramLink pandal={p} variant="handle" />
          </div>

          {/* Parking Discovery Card */}
          <div className="mt-6 rounded-sm border border-hair-soft bg-surface/80 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                <Car className="size-3.5 text-gold" /> Parking Near Pandal
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                {p.parking && p.parking.length > 0 ? 'Verified' : 'Public Bays'}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              {p.parking && p.parking.length > 0
                ? `${p.parking.length} verified car/bike bays identified nearby.`
                : 'Check municipal bays or ride Kolkata Metro to avoid evening road diversions.'}
            </p>
            <button
              type="button"
              onClick={() => useAppStore.getState().setParkingModalPandalId(p.id)}
              className="btn btn-sm btn-ghost mt-3 w-full justify-center text-xs text-gold-light"
            >
              <Car className="size-3.5" /> View Parking & Drop-offs
            </button>
          </div>

          {/* Verification & Report Correction */}
          <div className="mt-5 flex items-center justify-between border-t border-hair-soft pt-4 text-xs text-muted">
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              {p.verificationStatus === 'verified' ? 'Verified 2026' : 'Community Data'}
            </span>
            <button
              type="button"
              onClick={() => {
                useAppStore.getState().openFeedbackModal({
                  pandal: p.name,
                  station: p.station,
                  line: p.line,
                  type: 'Incorrect information on pandal',
                });
              }}
              className="inline-flex items-center gap-1 font-semibold text-gold-light hover:underline"
            >
              <Flag className="size-3" /> Report incorrect info
            </button>
          </div>
        </aside>
      </div>

      {nearby.length > 0 && (
        <section aria-labelledby="nearby-title" className="shell pt-20 md:pt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="nearby-title" className="display text-[clamp(2rem,4.5vw,4rem)]">
              Also from <em className="font-medium text-gold">{p.station}</em>
            </h2>
            <Link to={`/station/${p.stationId}`} className="btn btn-sm btn-ghost">
              All {stationPandals(p.stationId).length} at this station
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {nearby.map((o) => (
              <li key={o.id}>
                <PandalCard pandal={o} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
