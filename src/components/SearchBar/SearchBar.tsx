import { Search, X } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function SearchBar({ resultCount }: { resultCount: number }) {
  const query = useAppStore((s) => s.query);
  const setQuery = useAppStore((s) => s.setQuery);
  return (
    <div role="search" className="group relative">
      <Search
        className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-gold transition-transform group-focus-within:scale-110"
        aria-hidden="true"
      />
      <input
        type="search"
        inputMode="search"
        enterKeyHint="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search pandal, station, locality or theme…"
        aria-label="Search pandals by name, station, locality or theme"
        className="h-[60px] w-full rounded-sm border border-hair bg-surface/70 pl-14 pr-32 text-base outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-gold-bright focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--gold)_18%,transparent)] md:h-[68px] md:text-lg [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
        <span className="text-xs font-semibold tabular-nums text-muted" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </span>
        {query && (
          <button type="button" onClick={() => setQuery('')} className="icon-btn size-9" aria-label="Clear search">
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
