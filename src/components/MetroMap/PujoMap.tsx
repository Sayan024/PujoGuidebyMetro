import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Box, Footprints, Map as MapIcon, MapPin, Navigation, Share2, Shield, TrainFront, WifiOff, X } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InstagramLink, SaveButton } from '@/components/PandalCard/PandalCard';
import { PandalCover } from '@/components/PandalCard/PandalCover';
import { ErrorBoundary } from '@/components/ui/Feedback';
import { LineBadge, LineDot } from '@/components/ui/primitives';
import { PANDAL_BY_ID, stationPandals } from '@/data';
import { METRO_LINES, STATIONS } from '@/data/metroLines';
import { useCan3D, usePrefersReducedMotion } from '@/hooks/useMedia';
import { cn, formatKm, themeLabel } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import NetworkMap from './NetworkMap';
import { PoliceMapViewer } from '@/components/PoliceMap/PoliceMapViewer';

const StreetMap = lazy(() => import('./StreetMap'));
const Metro3D = lazy(() => import('./Metro3D'));

type ViewMode = 'street' | 'network' | '3d' | 'police';

function MapSkeleton({ label }: { label: string }) {
  return (
    <div className="skeleton absolute inset-0 grid place-items-center" aria-busy="true">
      <p className="rounded-sm bg-surface/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-muted">{label}</p>
    </div>
  );
}

function LineLegend() {
  const line = useAppStore((s) => s.line);
  const setLine = useAppStore((s) => s.setLine);
  return (
    <div role="radiogroup" aria-label="Show Metro line" className="glass no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-sm p-1">
      <button
        type="button"
        role="radio"
        aria-checked={line === 'all'}
        onClick={() => setLine('all')}
        className={cn('h-8 shrink-0 rounded-[2px] px-3 text-[11px] font-bold uppercase tracking-[0.14em]', line === 'all' ? 'bg-gold-bright text-[#1a0c08]' : 'text-muted hover:text-ink')}
      >
        All
      </button>
      {METRO_LINES.map((l) => (
        <button
          key={l.id}
          type="button"
          role="radio"
          aria-checked={line === l.id}
          onClick={() => setLine(l.id)}
          className={cn(
            'flex h-8 shrink-0 items-center gap-2 rounded-[2px] px-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors',
            line === l.id ? 'text-white' : 'text-muted hover:text-ink',
          )}
          style={line === l.id ? { background: `var(--${l.id}-line)` } : undefined}
        >
          <span className="size-2.5 rounded-full" style={{ background: line === l.id ? '#fff' : `var(--${l.id}-line)` }} aria-hidden="true" />
          {l.short}
        </button>
      ))}
    </div>
  );
}

function StationPanel() {
  const stationId = useAppStore((s) => s.stationId);
  const setStation = useAppStore((s) => s.setStation);
  const selectedPandalId = useAppStore((s) => s.selectedPandalId);
  const selectPandal = useAppStore((s) => s.selectPandal);
  const station = stationId ? STATIONS[stationId] : null;
  const list = station ? stationPandals(station.id) : [];

  return (
    <AnimatePresence mode="wait">
      {station ? (
        <motion.aside
          key={station.id}
          aria-label={`${station.name} station`}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="glass flex max-h-full w-[320px] flex-col rounded-sm"
        >
          <header className="border-b border-hair p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                  {station.lines.map((l) => (
                    <LineDot key={l} line={l} />
                  ))}
                  Metro station
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight">{station.name}</h3>
                {station.area && <p className="text-xs text-muted">{station.area}</p>}
              </div>
              <button type="button" className="icon-btn size-8 shrink-0" onClick={() => setStation(null)} aria-label="Clear station">
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-3 flex items-center gap-4 text-xs text-muted">
              <span>
                <strong className="text-base text-gold-bright">{list.length}</strong> pandals
              </span>
              {list[0] && <span>nearest {formatKm(list[0].distanceKm)}</span>}
              <Link to={`/station/${station.id}`} className="ml-auto flex items-center gap-1 font-semibold text-gold-bright hover:underline">
                Guide <ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
            </p>
          </header>
          {list.length ? (
            <ul className="thin-scroll min-h-0 flex-1 overflow-y-auto p-1.5">
              {list.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => selectPandal(p.id)}
                    aria-pressed={p.id === selectedPandalId}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-[2px] px-2.5 py-2 text-left transition-colors hover:bg-surface-2',
                      p.id === selectedPandalId && 'bg-surface-2',
                    )}
                  >
                    <MapPin className={cn('size-4 shrink-0', p.id === selectedPandalId ? 'text-red' : 'text-gold')} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold">{p.name}</span>
                      <span className="block truncate text-[11px] text-muted">{themeLabel(p)}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-muted">{formatKm(p.distanceKm)}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-sm text-muted">No pandals are listed within walking distance of this station yet.</p>
          )}
        </motion.aside>
      ) : (
        <motion.p
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="glass flex items-center gap-2.5 rounded-sm px-3.5 py-2.5 text-xs font-medium text-muted"
        >
          <TrainFront className="size-4 text-gold" aria-hidden="true" />
          Select a station to see its 1 km walking radius
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function PandalInfoCard() {
  const id = useAppStore((s) => s.selectedPandalId);
  const selectPandal = useAppStore((s) => s.selectPandal);
  const pushToast = useAppStore((s) => s.pushToast);
  const p = id ? PANDAL_BY_ID.get(id) : undefined;

  const share = async () => {
    if (!p) return;
    const url = `${location.origin}/pandal/${p.id}`;
    try {
      if (navigator.share) await navigator.share({ title: p.name, text: `${p.name} — near ${p.station} Metro`, url });
      else {
        await navigator.clipboard.writeText(url);
        pushToast('Link copied');
      }
    } catch {
      /* share sheet dismissed */
    }
  };

  return (
    <AnimatePresence>
      {p && (
        <motion.article
          key={p.id}
          aria-label={p.name}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          className="glass pointer-events-auto flex w-full max-w-[440px] overflow-hidden rounded-sm shadow-[var(--shadow)]"
        >
          <PandalCover pandal={p} sizes="140px" className="w-[112px] shrink-0 sm:w-[136px]" />
          <div className="min-w-0 flex-1 p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <LineBadge line={p.line} />
              <button type="button" className="-mr-1 -mt-1 grid size-7 place-items-center text-muted hover:text-ink" onClick={() => selectPandal(null)} aria-label="Close">
                <X className="size-4" />
              </button>
            </div>
            <h3 className="mt-2 truncate font-display text-xl font-semibold leading-tight">{p.name}</h3>
            <p className="truncate text-xs text-muted">{p.station}</p>
            <p className="mt-2 flex items-center gap-4 text-[13px] font-semibold tabular-nums">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-gold" aria-hidden="true" />
                {formatKm(p.distanceKm)}
              </span>
              <span className="flex items-center gap-1.5">
                <Footprints className="size-3.5 text-gold" aria-hidden="true" />
                {p.walkingMinutes} min walk
              </span>
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <Link to={`/pandal/${p.id}`} className="btn btn-sm btn-primary flex-1 !px-2.5">
                View details
              </Link>
              <a href={p.mapUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost !px-2.5" aria-label={`Get walking directions to ${p.name} in Google Maps`}>
                <Navigation className="size-3.5" aria-hidden="true" />
                <span className="max-sm:hidden">Directions</span>
              </a>
              <InstagramLink pandal={p} />
              <SaveButton pandal={p} />
              <button type="button" className="icon-btn size-[38px] max-sm:hidden" onClick={share} aria-label="Share this pandal">
                <Share2 className="size-4" />
              </button>
            </div>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}

/** Map surface with four views sharing one selection: street map, schematic network, 3D overview, and official Kolkata Police traffic guide map. */
export function PujoMap({
  variant = 'section',
  initialMode = 'street',
}: {
  variant?: 'section' | 'page';
  initialMode?: ViewMode;
}) {
  const can3D = useCan3D();
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<ViewMode>(initialMode);
  const [streetDown, setStreetDown] = useState(false);
  const online = typeof navigator === 'undefined' ? true : navigator.onLine;

  useEffect(() => {
    if (!online) setStreetDown(true);
  }, [online]);

  const effective: ViewMode = mode === 'street' && streetDown ? 'network' : mode === '3d' && !can3D ? 'network' : mode;
  const views: { id: ViewMode; label: string; Icon: typeof MapIcon; disabled?: boolean }[] = [
    { id: 'street', label: 'Street', Icon: MapIcon, disabled: streetDown },
    { id: 'network', label: 'Network', Icon: TrainFront },
    ...(can3D ? [{ id: '3d' as const, label: '3D', Icon: Box }] : []),
    { id: 'police', label: 'Police Guide', Icon: Shield },
  ];

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden border-hair bg-surface',
        variant === 'page' ? 'h-full' : 'h-[76vh] min-h-[540px] border-y lg:mx-[clamp(16px,4vw,72px)] lg:border',
      )}
    >
      <ErrorBoundary resetKey={effective} fallback={<NetworkMap />}>
        <Suspense fallback={<MapSkeleton label="Loading map" />}>
          {effective === 'street' && <StreetMap interactiveScroll={variant === 'page'} onUnavailable={() => setStreetDown(true)} />}
          {effective === 'network' && <NetworkMap />}
          {effective === '3d' && <Metro3D animate={!reduced} />}
          {effective === 'police' && (
            <div className="absolute inset-0 pt-[52px]">
              <PoliceMapViewer height="100%" showEmergencyBar={variant === 'page'} />
            </div>
          )}
        </Suspense>
      </ErrorBoundary>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start gap-2 md:inset-x-4 md:top-4">
        <div role="tablist" aria-label="Map view" className="glass pointer-events-auto flex gap-1 rounded-sm p-1">
          {views.map(({ id, label, Icon, disabled }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={effective === id}
              disabled={disabled}
              onClick={() => setMode(id)}
              className={cn(
                'relative flex h-8 items-center gap-2 rounded-[2px] px-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors disabled:opacity-40',
                effective === id ? 'text-[#1a0c08]' : 'text-muted hover:text-ink',
              )}
            >
              {effective === id && (
                <motion.span layoutId={`map-view-${variant}`} className="absolute inset-0 rounded-[2px] bg-gold-bright" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <Icon className="relative size-3.5" aria-hidden="true" />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
        {effective !== 'police' && (
          <div className="pointer-events-auto min-w-0 max-w-full">
            <LineLegend />
          </div>
        )}
      </div>

      {streetDown && effective === 'street' && (
        <p role="status" className="glass absolute left-1/2 top-[104px] z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-sm px-3 py-2 text-xs text-muted md:top-16">
          <WifiOff className="size-3.5 text-gold" aria-hidden="true" />
          Street tiles are unavailable — showing the network map
        </p>
      )}

      {/* Station panel (desktop) - only on metro maps */}
      {effective !== 'police' && (
        <div className="pointer-events-none absolute bottom-4 left-4 top-[72px] z-10 hidden items-start lg:flex">
          <div className="pointer-events-auto flex max-h-full">
            <StationPanel />
          </div>
        </div>
      )}

      {/* Selected pandal - only on metro maps */}
      {effective !== 'police' && (
        <div
          className={cn(
            'pointer-events-none absolute inset-x-3 z-10 flex justify-center lg:inset-x-auto lg:right-16',
            variant === 'page' ? 'bottom-4' : 'bottom-4',
          )}
        >
          <PandalInfoCard />
        </div>
      )}
    </div>
  );
}
