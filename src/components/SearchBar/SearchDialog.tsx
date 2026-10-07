import { AnimatePresence, motion } from 'motion/react';
import { CornerDownLeft, Search, SearchX, TrainFront } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineDot } from '@/components/ui/primitives';
import { stationPandals } from '@/data';
import { STATION_LIST } from '@/data/metroLines';
import { searchPandals } from '@/hooks/usePandalSearch';
import { cn, formatKm } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

interface Hit {
  key: string;
  to: string;
  title: string;
  meta: string;
  kind: 'station' | 'pandal';
  line: (typeof STATION_LIST)[number]['lines'][number];
}

/** Global quick search (Ctrl/⌘ K): jump straight to a station or pandal. */
export function SearchDialog() {
  const open = useAppStore((s) => s.searchOpen);
  const setOpen = useAppStore((s) => s.setSearchOpen);
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!useAppStore.getState().searchOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      restoreFocus.current = document.activeElement as HTMLElement;
      setQ('');
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else restoreFocus.current?.focus?.();
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    const stations = STATION_LIST.filter(
      (s) => term && (s.name.toLowerCase().includes(term) || s.area?.toLowerCase().includes(term)),
    )
      .slice(0, 4)
      .map<Hit>((s) => ({
        key: `s-${s.id}`,
        to: `/station/${s.id}`,
        title: s.name,
        meta: `${s.area ? `${s.area} · ` : ''}${stationPandals(s.id).length} pandals nearby`,
        kind: 'station',
        line: s.lines[0],
      }));
    const pandals = searchPandals({ line: 'all', stationId: null, query: term, filters: [], sort: 'popularity' })
      .slice(0, term ? 8 : 6)
      .map<Hit>((p) => ({
        key: `p-${p.id}`,
        to: `/pandal/${p.id}`,
        title: p.name,
        meta: [p.station, formatKm(p.distanceKm), p.theme || p.category].join(' · '),
        kind: 'pandal',
        line: p.line,
      }));
    return [...stations, ...pandals];
  }, [q]);

  const go = (hit?: Hit) => {
    if (!hit) return;
    setOpen(false);
    navigate(hit.to);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close search" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search pandals and stations"
            className="panel relative w-full max-w-2xl overflow-hidden rounded-md"
            initial={{ y: -18, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, hits.length - 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              }
              if (e.key === 'Enter') go(hits[cursor]);
            }}
          >
            <div className="flex items-center gap-3 border-b border-hair px-5">
              <Search className="size-5 shrink-0 text-gold" aria-hidden="true" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setCursor(0);
                }}
                placeholder="Search pandal, station, locality or theme…"
                className="h-16 w-full bg-transparent text-lg outline-none placeholder:text-muted/70"
                role="combobox"
                aria-expanded="true"
                aria-controls="quick-search-results"
                aria-activedescendant={hits[cursor] ? `hit-${hits[cursor].key}` : undefined}
                aria-label="Search"
              />
              <kbd className="hidden rounded-sm border border-hair-soft px-2 py-0.5 text-[10px] text-muted sm:block">Esc</kbd>
            </div>

            <ul id="quick-search-results" role="listbox" className="thin-scroll max-h-[52vh] overflow-y-auto p-2">
              {!q && <li className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">Most visited</li>}
              {hits.map((h, i) => (
                <li key={h.key} id={`hit-${h.key}`} role="option" aria-selected={i === cursor}>
                  <button
                    type="button"
                    onClick={() => go(h)}
                    onMouseEnter={() => setCursor(i)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-colors',
                      i === cursor && 'bg-surface-2',
                    )}
                  >
                    {h.kind === 'station' ? (
                      <TrainFront className="size-4 shrink-0" style={{ color: `var(--${h.line}-line)` }} aria-hidden="true" />
                    ) : (
                      <LineDot line={h.line} className="mx-[3px]" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{h.title}</span>
                      <span className="block truncate text-xs text-muted">{h.meta}</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">{h.kind}</span>
                    {i === cursor && <CornerDownLeft className="size-3.5 text-gold" aria-hidden="true" />}
                  </button>
                </li>
              ))}
              {hits.length === 0 && (
                <li className="flex flex-col items-center px-4 py-12 text-center">
                  <SearchX className="size-6 text-gold" aria-hidden="true" />
                  <p className="mt-3 font-display text-xl">No pandal or station matches “{q}”</p>
                  <p className="mt-1 text-sm text-muted">Try a locality like Behala, a station, or a theme such as Bonedi.</p>
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
