import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MetroLineId } from '@/data/types';

export type ThemeMode = 'dark' | 'light';
export type LineFilter = MetroLineId | 'all';
export type FilterKey = 'within1km' | 'traditional' | 'theme2026' | 'vip' | 'petpujo' | 'popular' | 'openNow';
export type SortKey = 'distance' | 'popularity' | 'walking' | 'station';

export interface Toast {
  id: number;
  message: string;
  tone: 'save' | 'remove' | 'info';
}

interface AppState {
  // persisted
  theme: ThemeMode;
  favorites: string[];
  /** Saved pandals left out of the day plan. */
  planSkipped: string[];
  planStartMinutes: number;

  // explorer (session)
  line: LineFilter;
  stationId: string | null;
  query: string;
  filters: FilterKey[];
  sort: SortKey;

  // map + ui (session)
  selectedPandalId: string | null;
  searchOpen: boolean;
  toasts: Toast[];

  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  toggleFavorite: (id: string, name?: string) => void;
  clearFavorites: () => void;
  togglePlanSkip: (id: string) => void;
  setPlanStart: (m: number) => void;

  setLine: (l: LineFilter) => void;
  setStation: (id: string | null) => void;
  setQuery: (q: string) => void;
  toggleFilter: (f: FilterKey) => void;
  setSort: (s: SortKey) => void;
  resetExplorer: () => void;

  selectPandal: (id: string | null) => void;
  setSearchOpen: (open: boolean) => void;
  pushToast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
}

let toastId = 0;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      favorites: [],
      planSkipped: [],
      planStartMinutes: 10 * 60,

      line: 'all',
      stationId: null,
      query: '',
      filters: [],
      sort: 'popularity',

      selectedPandalId: null,
      searchOpen: false,
      toasts: [],

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),

      toggleFavorite: (id, name) => {
        const saved = get().favorites.includes(id);
        set({
          favorites: saved ? get().favorites.filter((f) => f !== id) : [...get().favorites, id],
          planSkipped: get().planSkipped.filter((f) => f !== id),
        });
        get().pushToast(
          saved ? `Removed${name ? ` ${name}` : ''} from My Puja List` : `Saved${name ? ` ${name}` : ''} to My Puja List`,
          saved ? 'remove' : 'save',
        );
      },
      clearFavorites: () => set({ favorites: [], planSkipped: [] }),
      togglePlanSkip: (id) =>
        set({
          planSkipped: get().planSkipped.includes(id)
            ? get().planSkipped.filter((f) => f !== id)
            : [...get().planSkipped, id],
        }),
      setPlanStart: (planStartMinutes) => set({ planStartMinutes }),

      // Changing line clears a station that is not on the new line.
      setLine: (line) => set({ line, stationId: null }),
      setStation: (stationId) => set({ stationId, selectedPandalId: null }),
      setQuery: (query) => set({ query }),
      toggleFilter: (f) =>
        set({ filters: get().filters.includes(f) ? get().filters.filter((x) => x !== f) : [...get().filters, f] }),
      setSort: (sort) => set({ sort }),
      resetExplorer: () => set({ line: 'all', stationId: null, query: '', filters: [] }),

      selectPandal: (selectedPandalId) => set({ selectedPandalId }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      pushToast: (message, tone = 'info') => {
        const id = ++toastId;
        set({ toasts: [...get().toasts.slice(-2), { id, message, tone }] });
        setTimeout(() => get().dismissToast(id), 2800);
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: 'pujo-by-metro',
      version: 1,
      partialize: (s) => ({
        theme: s.theme,
        favorites: s.favorites,
        planSkipped: s.planSkipped,
        planStartMinutes: s.planStartMinutes,
      }),
    },
  ),
);
