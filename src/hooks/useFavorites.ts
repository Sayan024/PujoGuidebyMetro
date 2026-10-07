import { useMemo } from 'react';
import { PANDAL_BY_ID } from '@/data';
import type { Pandal } from '@/data/types';
import { useAppStore } from '@/store/appStore';

export function useIsFavorite(id: string) {
  return useAppStore((s) => s.favorites.includes(id));
}

export function useFavorites() {
  const ids = useAppStore((s) => s.favorites);
  const toggle = useAppStore((s) => s.toggleFavorite);
  const clear = useAppStore((s) => s.clearFavorites);

  return useMemo(() => {
    // Ids that no longer exist in the dataset are ignored rather than shown broken.
    const pandals = ids.map((id) => PANDAL_BY_ID.get(id)).filter((p): p is Pandal => Boolean(p));
    const stations = new Set(pandals.map((p) => p.stationId));
    return {
      ids,
      pandals,
      count: pandals.length,
      stationCount: stations.size,
      walkingKm: pandals.reduce((sum, p) => sum + p.distanceKm, 0),
      toggle,
      clear,
    };
  }, [ids, toggle, clear]);
}
