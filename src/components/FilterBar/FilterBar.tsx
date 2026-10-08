import { motion } from 'motion/react';
import { ArrowDownUp, Clock, Crown, Flame, Footprints, Landmark, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react';
import type { ReactNode } from 'react';
import { useAppStore, type FilterKey, type SortKey } from '@/store/appStore';

export const FILTERS: { id: FilterKey; label: string; icon: ReactNode }[] = [
  { id: 'within1km', label: 'Within 1 km', icon: <Footprints className="size-3.5" /> },
  { id: 'howrahLiluah', label: '📍 Howrah & Liluah', icon: <MapPin className="size-3.5 text-gold" /> },
  { id: 'traditional', label: 'Traditional', icon: <Landmark className="size-3.5" /> },
  { id: 'theme2026', label: 'Theme 2026', icon: <Sparkles className="size-3.5" /> },
  { id: 'vip', label: 'VIP Pass', icon: <Crown className="size-3.5" /> },
  { id: 'petpujo', label: 'Petpujo', icon: <UtensilsCrossed className="size-3.5" /> },
  { id: 'popular', label: 'Popular', icon: <Flame className="size-3.5" /> },
  { id: 'openNow', label: 'Open Now', icon: <Clock className="size-3.5" /> },
];

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'distance', label: 'Distance' },
  { id: 'popularity', label: 'Popularity' },
  { id: 'walking', label: 'Walking time' },
  { id: 'station', label: 'Station' },
];

export function FilterBar() {
  const filters = useAppStore((s) => s.filters);
  const toggle = useAppStore((s) => s.toggleFilter);
  const sort = useAppStore((s) => s.sort);
  const setSort = useAppStore((s) => s.setSort);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div
        role="group"
        aria-label="Filters"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {FILTERS.map((f) => (
          <motion.button
            key={f.id}
            type="button"
            whileTap={{ scale: 0.94 }}
            aria-pressed={filters.includes(f.id)}
            onClick={() => toggle(f.id)}
            className="chip shrink-0"
          >
            <span aria-hidden="true">{f.icon}</span>
            {f.label}
          </motion.button>
        ))}
      </div>

      <label className="flex shrink-0 items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
        <ArrowDownUp className="size-3.5 text-gold" aria-hidden="true" />
        Sort by
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-[38px] rounded-sm border border-hair bg-surface px-3 text-[13px] font-semibold normal-case tracking-normal text-ink outline-none focus:border-gold-bright"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
