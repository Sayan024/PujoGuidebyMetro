import { motion } from 'motion/react';
import { ArrowRight, CalendarClock, SearchX, TrainFront, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterBar, FILTERS } from '@/components/FilterBar/FilterBar';
import { MetroSelector } from '@/components/MetroSelector/MetroSelector';
import { PandalCard } from '@/components/PandalCard/PandalCard';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { StationTimeline } from '@/components/StationTimeline/StationTimeline';
import { EmptyState, Reveal } from '@/components/ui/primitives';
import { LINE_BY_ID, STATIONS } from '@/data/metroLines';
import { useIsDesktop } from '@/hooks/useMedia';
import { usePandalSearch } from '@/hooks/usePandalSearch';
import { cn, isFestivalOn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

const PAGE = 12;

function ActiveContext({ total }: { total: number }) {
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const setStation = useAppStore((s) => s.setStation);
  const filters = useAppStore((s) => s.filters);
  const reset = useAppStore((s) => s.resetExplorer);
  const query = useAppStore((s) => s.query);
  const station = stationId ? STATIONS[stationId] : null;
  const dirty = line !== 'all' || stationId || filters.length > 0 || query !== '';

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p className="font-display text-2xl font-semibold md:text-3xl" aria-live="polite">
        <span className="tabular-nums text-gold-bright">{total}</span> {total === 1 ? 'pandal' : 'pandals'}
        <span className="text-muted">
          {station ? ' near ' : line !== 'all' ? ' on the ' : ' across Kolkata'}
          {!station && line !== 'all' && LINE_BY_ID[line].name}
        </span>
        {station && <span>{station.name}</span>}
      </p>
      {station && (
        <span className="flex items-center gap-2">
          <Link to={`/station/${station.id}`} className="chip h-8 text-xs">
            <TrainFront className="size-3.5" aria-hidden="true" /> Station guide
          </Link>
          <button type="button" className="chip h-8 text-xs" onClick={() => setStation(null)}>
            <X className="size-3.5" aria-hidden="true" /> Clear station
          </button>
        </span>
      )}
      {dirty && (
        <button type="button" onClick={reset} className="ml-auto text-xs font-semibold text-muted underline-offset-4 hover:text-gold-bright hover:underline">
          Reset all
        </button>
      )}
    </div>
  );
}

function NoResults() {
  const filters = useAppStore((s) => s.filters);
  const query = useAppStore((s) => s.query);
  const reset = useAppStore((s) => s.resetExplorer);
  const toggle = useAppStore((s) => s.toggleFilter);

  // "Open now" before the festival is the most likely reason for an empty list.
  if (filters.includes('openNow') && !isFestivalOn())
    return (
      <EmptyState
        icon={<CalendarClock className="size-6" />}
        title="The pandals are still being built"
        action={
          <button className="btn btn-sm btn-primary" onClick={() => toggle('openNow')}>
            Show all pandals
          </button>
        }
      >
        Darshan opens from Chaturthi, 14 October 2026. Until then “Open now” has nothing to show — browse everything
        and save your shortlist.
      </EmptyState>
    );

  return (
    <EmptyState
      icon={<SearchX className="size-6" />}
      title={query ? `Nothing found for “${query}”` : 'No pandals match these filters'}
      action={
        <button className="btn btn-sm btn-primary" onClick={reset}>
          Reset search & filters
        </button>
      }
    >
      Try a station or locality name, switch Metro line, or remove
      {filters.length ? ` “${FILTERS.find((f) => f.id === filters[filters.length - 1])?.label}”` : ' a filter'}.
    </EmptyState>
  );
}

/**
 * The product core: line → station → pandal. `preview` is the home-page cut
 * that hands over to the full /explore page.
 */
export function Explorer({ preview = false, headingLevel = 'h2' }: { preview?: boolean; headingLevel?: 'h1' | 'h2' }) {
  const desktop = useIsDesktop();
  const { results, perStation, isStale } = usePandalSearch();
  const [visible, setVisible] = useState(preview ? 6 : PAGE);
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null);
  const Heading = headingLevel;

  // A new query starts from the top of the list again.
  const signature = results.length + (results[0]?.id ?? '') + (results[results.length - 1]?.id ?? '');
  useEffect(() => setVisible(preview ? 6 : PAGE), [signature, preview]);

  // Full explorer: keep loading as the reader nears the end.
  useEffect(() => {
    if (preview || !sentinel) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible((v) => v + PAGE),
      { rootMargin: '600px' },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [preview, sentinel]);

  const shown = results.slice(0, visible);

  return (
    <section id="explore" aria-labelledby="explore-title" className={cn('shell', preview ? 'pt-24 md:pt-36' : 'pt-28 md:pt-36')}>
      <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
        <Reveal>
          <p className="eyebrow">Pandal Explorer</p>
          <Heading id="explore-title" className="display mt-4 text-[clamp(2.8rem,8vw,7.5rem)]">
            Find your <em className="gold-text gold-text-auto font-medium">Puja</em>
          </Heading>
        </Reveal>
        <Reveal delay={0.1} className="max-w-sm pb-2 text-base text-muted lg:text-right lg:text-lg">
          Choose a Metro line. Pick a station. Find your Thakur.
        </Reveal>
      </div>

      <Reveal delay={0.05} className="mt-8 space-y-4 md:mt-12">
        <MetroSelector layoutId={preview ? 'line-tab-home' : 'line-tab'} />
        <SearchBar resultCount={results.length} />
        <FilterBar />
      </Reveal>

      {!desktop && (
        <div className="mt-6 border-y border-hair-soft py-4">
          <StationTimeline counts={perStation} orientation="horizontal" />
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-10">
        {desktop && (
          <aside aria-label="Metro stations" className="sticky top-24 self-start">
            <StationTimeline counts={perStation} orientation="vertical" />
          </aside>
        )}

        <div className="min-w-0">
          <ActiveContext total={results.length} />

          {results.length === 0 ? (
            <div className="mt-6">
              <NoResults />
            </div>
          ) : (
            <ul
              className={cn(
                'mt-6 grid gap-3 transition-opacity sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 3xl:grid-cols-4',
                isStale && 'opacity-60',
              )}
            >
              {shown.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(i % PAGE, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PandalCard pandal={p} />
                </motion.li>
              ))}
            </ul>
          )}

          {preview && results.length > shown.length && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-6">
              <p className="text-sm text-muted">
                Showing {shown.length} of {results.length}
              </p>
              <Link to="/explore" className="btn btn-primary">
                Open the full explorer <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          )}
          {!preview && results.length > shown.length && (
            <div ref={setSentinel} className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="skeleton h-40 sm:h-80" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
