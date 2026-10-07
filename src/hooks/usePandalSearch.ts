import { useDeferredValue, useMemo } from 'react';
import { PANDALS } from '@/data';
import { STATIONS, stationRank } from '@/data/metroLines';
import type { Pandal } from '@/data/types';
import { isOpenNow } from '@/lib/utils';
import { useAppStore, type FilterKey, type LineFilter, type SortKey } from '@/store/appStore';

// One lower-cased haystack per pandal, built once.
const HAYSTACK = new Map<string, string>(
  PANDALS.map((p) => [
    p.id,
    [p.name, p.station, STATIONS[p.stationId]?.area, p.theme, p.category, p.artist, p.description, p.tags.join(' '), `${p.line} line`]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  ]),
);

const PREDICATES: Record<FilterKey, (p: Pandal, now: Date) => boolean> = {
  within1km: (p) => p.distanceKm <= 1,
  traditional: (p) => p.traditional,
  theme2026: (p) => p.theme2026,
  vip: (p) => p.vip,
  petpujo: (p) => p.petpujo,
  popular: (p) => p.popularity >= 85,
  openNow: (p, now) => isOpenNow(p, now),
};

const SORTERS: Record<SortKey, (a: Pandal, b: Pandal) => number> = {
  distance: (a, b) => a.distanceKm - b.distanceKm || b.popularity - a.popularity,
  popularity: (a, b) => b.popularity - a.popularity || a.distanceKm - b.distanceKm,
  walking: (a, b) => a.walkingMinutes - b.walkingMinutes || b.popularity - a.popularity,
  station: (a, b) =>
    stationRank(a.stationId, a.line) - stationRank(b.stationId, b.line) || a.distanceKm - b.distanceKm,
};

export interface SearchParams {
  line: LineFilter;
  stationId: string | null;
  query: string;
  filters: FilterKey[];
  sort: SortKey;
}

export function searchPandals({ line, stationId, query, filters, sort }: SearchParams, now = new Date()): Pandal[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return PANDALS.filter((p) => {
    if (line !== 'all' && p.line !== line) return false;
    if (stationId && p.stationId !== stationId) return false;
    if (filters.some((f) => !PREDICATES[f](p, now))) return false;
    if (terms.length) {
      const hay = HAYSTACK.get(p.id)!;
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  }).sort(SORTERS[sort]);
}

/** Live results for the explorer, driven by the shared store. */
export function usePandalSearch() {
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const query = useAppStore((s) => s.query);
  const filters = useAppStore((s) => s.filters);
  const sort = useAppStore((s) => s.sort);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchPandals({ line, stationId, query: deferredQuery, filters, sort }),
    [line, stationId, deferredQuery, filters, sort],
  );
  // Counts per station ignore the station filter so the timeline can show what each stop offers.
  const perStation = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of searchPandals({ line, stationId: null, query: deferredQuery, filters, sort: 'station' }))
      counts.set(p.stationId, (counts.get(p.stationId) ?? 0) + 1);
    return counts;
  }, [line, deferredQuery, filters]);

  return { results, perStation, isStale: deferredQuery !== query };
}
