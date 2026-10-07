import { animate, useMotionValue, useReducedMotion } from 'motion/react';
import { Minus, Plus, Scan } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { PANDALS, stationPandals } from '@/data';
import { METRO_LINES, STATION_LIST, STATIONS } from '@/data/metroLines';
import { HOOGHLY, project, SVG_H, SVG_W, UNITS_PER_KM } from '@/lib/geo';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

interface View {
  cx: number;
  cy: number;
  w: number;
}
const FULL: View = { cx: SVG_W / 2, cy: SVG_H / 2, w: SVG_W * 1.25 };
const box = (v: View, aspect: number) => `${v.cx - v.w / 2} ${v.cy - v.w / aspect / 2} ${v.w} ${v.w / aspect}`;

const LINE_PATHS = METRO_LINES.map((l) => ({
  line: l,
  d: l.stations
    .map((s, i) => {
      const [x, y] = project(STATIONS[s].lat, STATIONS[s].lng);
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(''),
}));
const RIVER = HOOGHLY.map(([lat, lng], i) => {
  const [x, y] = project(lat, lng);
  return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
}).join('');
const PANDAL_POINTS = PANDALS.map((p) => ({ p, xy: project(p.latitude, p.longitude) }));
const STATION_POINTS = STATION_LIST.map((s) => ({ s, xy: project(s.lat, s.lng) }));
const ALWAYS_LABELLED = new Set(
  METRO_LINES.flatMap((l) => [l.stations[0], l.stations[l.stations.length - 1]]).concat(
    STATION_LIST.filter((s) => s.lines.length > 1 || stationPandals(s.id).length >= 10).map((s) => s.id),
  ),
);

/**
 * Schematic, geographically-true Metro map drawn in SVG. It needs no network,
 * so it doubles as the fallback whenever the street map cannot load.
 */
export default function NetworkMap() {
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const selectedPandalId = useAppStore((s) => s.selectedPandalId);
  const setStation = useAppStore((s) => s.setStation);
  const selectPandal = useAppStore((s) => s.selectPandal);
  const reduced = useReducedMotion();

  const svg = useRef<SVGSVGElement>(null);
  const view = useRef<View>(FULL);
  const aspect = useRef(1.4);
  const cx = useMotionValue(FULL.cx);
  const cy = useMotionValue(FULL.cy);
  const w = useMotionValue(FULL.w);

  const apply = () => svg.current?.setAttribute('viewBox', box({ cx: cx.get(), cy: cy.get(), w: w.get() }, aspect.current));
  const goTo = (next: View, instant = false) => {
    view.current = next;
    const opts = { duration: instant || reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] as const, onUpdate: apply };
    animate(cx, next.cx, opts);
    animate(cy, next.cy, opts);
    animate(w, next.w, opts);
  };

  // Keep the viewBox matched to the container's shape.
  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      aspect.current = e.contentRect.width / Math.max(1, e.contentRect.height);
      // Fit the whole network: limited by height on wide containers.
      FULL.w = Math.max(SVG_W * 1.1, SVG_H * 1.06 * aspect.current);
      if (!useAppStore.getState().stationId) goTo({ ...FULL }, true);
      else apply();
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus on the selected station (or zoom back out).
  useEffect(() => {
    if (stationId) {
      const [x, y] = project(STATIONS[stationId].lat, STATIONS[stationId].lng);
      goTo({ cx: x, cy: y, w: 5.2 * UNITS_PER_KM * Math.max(1, aspect.current) });
    } else goTo({ ...FULL });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  const focused = Boolean(stationId);
  const station = stationId ? STATIONS[stationId] : null;
  const stationXY = station ? project(station.lat, station.lng) : null;
  const selected = useMemo(() => PANDAL_POINTS.find((d) => d.p.id === selectedPandalId), [selectedPandalId]);
  const k = focused ? 0.42 : 1; // marker scale when zoomed in

  // Drag to pan.
  const drag = useRef<{ x: number; y: number } | null>(null);

  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--surface-light),var(--background)_75%)]">
      <svg
        ref={svg}
        viewBox={box(FULL, 1.4)}
        preserveAspectRatio="xMidYMid meet"
        className="size-full touch-none select-none"
        role="group"
        aria-label="Schematic map of the Kolkata Metro with pandal locations"
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          if (!drag.current || !svg.current || e.buttons === 0) return;
          const scale = w.get() / svg.current.clientWidth;
          cx.set(cx.get() - (e.clientX - drag.current.x) * scale);
          cy.set(cy.get() - (e.clientY - drag.current.y) * scale);
          view.current = { cx: cx.get(), cy: cy.get(), w: w.get() };
          drag.current = { x: e.clientX, y: e.clientY };
          apply();
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
      >
        {/* River */}
        <path d={RIVER} fill="none" stroke="var(--blue-line)" strokeOpacity="0.13" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
        <text x="118" y="330" fontSize="11" letterSpacing="5" fill="var(--muted)" opacity="0.6" transform="rotate(78 118 330)">
          HOOGHLY
        </text>

        {/* Walking radius */}
        {stationXY && (
          <g>
            <circle cx={stationXY[0]} cy={stationXY[1]} r={UNITS_PER_KM} fill="var(--gold)" fillOpacity="0.07" stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="3 3" />
            <text x={stationXY[0]} y={stationXY[1] - UNITS_PER_KM - 3} textAnchor="middle" fontSize="4.5" fill="var(--gold)" fontWeight="700" letterSpacing="1">
              1 KM WALK
            </text>
          </g>
        )}

        {/* Lines */}
        {LINE_PATHS.map(({ line: l, d }) => {
          const dim = line !== 'all' && line !== l.id;
          return (
            <g key={l.id} opacity={dim ? 0.18 : 1} style={{ transition: 'opacity .4s' }}>
              <path d={d} fill="none" stroke={`var(--${l.id}-line)`} strokeWidth={14 * k} strokeOpacity="0.16" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} fill="none" stroke={`var(--${l.id}-line)`} strokeWidth={5 * k} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}

        {/* Pandals */}
        <g>
          {PANDAL_POINTS.map(({ p, xy }) => {
            if (line !== 'all' && p.line !== line) return null;
            const near = p.stationId === stationId;
            const r = (near ? 4.6 : p.popularity >= 85 ? 3.4 : 2.4) * k;
            return (
              <circle
                key={p.id}
                cx={xy[0]}
                cy={xy[1]}
                r={r}
                fill="var(--gold-bright)"
                stroke={`var(--${p.line}-line)`}
                strokeWidth={0.9 * k}
                opacity={focused && !near ? 0.3 : 0.92}
                tabIndex={near ? 0 : -1}
                role="button"
                aria-label={`${p.name}, near ${p.station}`}
                className="cursor-pointer outline-none transition-[r] hover:brightness-125 focus-visible:stroke-[var(--cream)]"
                onClick={() => selectPandal(p.id)}
                onKeyDown={(e) => e.key === 'Enter' && selectPandal(p.id)}
              />
            );
          })}
        </g>

        {/* Stations */}
        {STATION_POINTS.map(({ s, xy }) => {
          const on = s.id === stationId;
          const dim = line !== 'all' && !s.lines.includes(line);
          const showLabel = on || (!dim && (focused ? Math.abs(xy[1] - (stationXY?.[1] ?? 0)) < 110 : ALWAYS_LABELLED.has(s.id)));
          const labelLeft = s.lines[0] === 'purple' || s.id === 'howrah' || s.id === 'howrah-maidan' || s.id === 'mahakaran';
          return (
            <g
              key={s.id}
              opacity={dim ? 0.25 : 1}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={`${s.name} station, ${stationPandals(s.id).length} pandals`}
              className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-[var(--gold-bright)]"
              onClick={() => setStation(on ? null : s.id)}
              onKeyDown={(e) => e.key === 'Enter' && setStation(on ? null : s.id)}
            >
              <circle cx={xy[0]} cy={xy[1]} r={12 * k} fill="transparent" />
              {on && <circle cx={xy[0]} cy={xy[1]} r={11 * k} fill="none" stroke="var(--gold-bright)" strokeWidth={1.2 * k} />}
              <circle
                cx={xy[0]}
                cy={xy[1]}
                r={(on ? 7 : 5) * k}
                fill={on ? `var(--${s.lines[0]}-line)` : 'var(--background)'}
                stroke={`var(--${s.lines[0]}-line)`}
                strokeWidth={2.4 * k}
              />
              {showLabel && (
                <text
                  x={xy[0] + (labelLeft ? -11 : 11) * k}
                  y={xy[1] + 3.5 * k}
                  textAnchor={labelLeft ? 'end' : 'start'}
                  fontSize={(on ? 13 : 10.5) * k}
                  fontWeight={on ? 700 : 600}
                  fill={on ? 'var(--gold-bright)' : 'var(--ink)'}
                  stroke="var(--background)"
                  strokeWidth={3 * k}
                  paintOrder="stroke"
                  className={cn('pointer-events-none')}
                >
                  {s.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Selected pandal */}
        {selected && (
          <g pointerEvents="none">
            <circle cx={selected.xy[0]} cy={selected.xy[1]} r={9 * k} fill="none" stroke="var(--red)" strokeWidth={1.4 * k}>
              {!reduced && <animate attributeName="r" values={`${6 * k};${16 * k}`} dur="1.6s" repeatCount="indefinite" />}
              {!reduced && <animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite" />}
            </circle>
            <circle cx={selected.xy[0]} cy={selected.xy[1]} r={5.5 * k} fill="var(--red)" stroke="var(--cream)" strokeWidth={1.4 * k} />
          </g>
        )}
      </svg>

      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-sm border border-hair bg-surface">
        {[
          { label: 'Zoom in', Icon: Plus, run: () => goTo({ ...view.current, w: Math.max(120, view.current.w * 0.7) }) },
          { label: 'Zoom out', Icon: Minus, run: () => goTo({ ...view.current, w: Math.min(FULL.w * 1.2, view.current.w / 0.7) }) },
          { label: 'Show whole network', Icon: Scan, run: () => (stationId ? setStation(null) : goTo({ ...FULL })) },
        ].map(({ label, Icon, run }) => (
          <button key={label} type="button" onClick={run} aria-label={label} title={label} className="grid size-9 place-items-center border-b border-hair-soft text-ink last:border-0 hover:text-gold-bright">
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
