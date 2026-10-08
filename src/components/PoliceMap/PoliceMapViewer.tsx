import { motion } from 'motion/react';
import {
  Download,
  Info,
  PhoneCall,
  RotateCcw,
  Shield,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type MapZone = 'all' | 'north' | 'south' | 'port' | 'suburban';

interface ZonePreset {
  id: MapZone;
  label: string;
  badge: string;
  scale: number;
  xPct: number;
  yPct: number;
  description: string;
}

const ZONES: ZonePreset[] = [
  {
    id: 'all',
    label: 'All Kolkata',
    badge: 'Overview',
    scale: 1,
    xPct: 0,
    yPct: 0,
    description: 'Complete Kolkata Police Puja traffic & parking guide overview',
  },
  {
    id: 'north',
    label: 'North & Central',
    badge: 'Zone I',
    scale: 2.2,
    xPct: 0,
    yPct: 0.32,
    description: 'Shyambazar, Bagbazar, Sovabazar, Manicktala, College Sq, Mohammad Ali Park',
  },
  {
    id: 'south',
    label: 'South & SE',
    badge: 'Zone II',
    scale: 2.2,
    xPct: -0.2,
    yPct: -0.1,
    description: 'Gariahat, Deshapriya Park, Ballygunge, Tridhara, Ekdalia, Kalighat, Hazra',
  },
  {
    id: 'port',
    label: 'Port & SW',
    badge: 'Zone III',
    scale: 2.4,
    xPct: 0.28,
    yPct: -0.1,
    description: 'Kidderpore, Garden Reach, Hastings, Khidirpur & Diamond Harbour Rd',
  },
  {
    id: 'suburban',
    label: 'Behala & Jadavpur',
    badge: 'Zone IV',
    scale: 2.2,
    xPct: 0,
    yPct: -0.42,
    description: 'Taratala, Behala Chowrasta, Barisha, Jadavpur, Naktala, Garia',
  },
];

const EMERGENCY_NUMBERS = [
  { label: 'Kolkata Police Control', number: '100 / 1090' },
  { label: 'Traffic Police Helpline', number: '1073' },
  { label: 'Traffic Control (Landline)', number: '033-22143644' },
  { label: 'Ambulance Emergency', number: '102' },
  { label: 'Women Helpline', number: '1091' },
];

interface PoliceMapViewerProps {
  className?: string;
  initialZone?: MapZone;
  height?: string;
  showEmergencyBar?: boolean;
}

export function PoliceMapViewer({
  className,
  initialZone = 'all',
  height = '100%',
  showEmergencyBar = true,
}: PoliceMapViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeZone, setActiveZone] = useState<MapZone>(initialZone);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLegend, setShowLegend] = useState(false);
  const [showHelpline, setShowHelpline] = useState(false);
  const [hdLoaded, setHdLoaded] = useState(false);

  // Pinch-to-zoom multi-touch tracking
  const touchDistRef = useRef<number | null>(null);

  // Jump to zone preset
  const jumpToZone = useCallback((zoneId: MapZone) => {
    setActiveZone(zoneId);
    const preset = ZONES.find((z) => z.id === zoneId) || ZONES[0];
    const el = containerRef.current;
    if (!el) {
      setScale(preset.scale);
      return;
    }
    const width = el.clientWidth;
    const height = el.clientHeight;
    setScale(preset.scale);
    setOffset({
      x: preset.xPct * width,
      y: preset.yPct * height,
    });
  }, []);

  const handleZoom = (delta: number) => {
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 0.8), 4.5);
      if (next <= 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    jumpToZone('all');
  };

  // Drag start
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with primary mouse button or touch
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Dragging
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Dampen offsets to keep image within view
    const maxBoundX = (el.clientWidth * (scale - 0.7)) / 2 + 150;
    const maxBoundY = (el.clientHeight * (scale - 0.7)) / 2 + 250;

    setOffset({
      x: Math.max(Math.min(newX, maxBoundX), -maxBoundX),
      y: Math.max(Math.min(newY, maxBoundY), -maxBoundY),
    });
  };

  // Drag end
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  // Mouse wheel zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
      setScale((prev) => {
        const next = Math.min(Math.max(prev + zoomFactor, 0.8), 4.5);
        if (next <= 1) setOffset({ x: 0, y: 0 });
        return next;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Multi-touch gestures (pinch to zoom)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

      if (touchDistRef.current !== null) {
        const diff = dist - touchDistRef.current;
        const zoomDelta = diff * 0.008;
        setScale((prev) => Math.min(Math.max(prev + zoomDelta, 0.8), 4.5));
      }
      touchDistRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    touchDistRef.current = null;
  };

  return (
    <div
      data-theme="dark"
      className={cn(
        'relative isolate flex flex-col overflow-hidden bg-[#12070a] select-none text-ink',
        className,
      )}
      style={{ height }}
    >
      {/* Top Bar: Official Branding + Zone Preset Pills */}
      <div className="z-20 flex flex-wrap items-center justify-between gap-2 border-b border-hair-soft bg-[#18090d]/90 px-3 py-2.5 backdrop-blur-md sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-sm bg-red/20 text-red border border-red/40">
            <Shield className="size-4" />
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-bright">
              Kolkata Police Puja Guide
              <span className="hidden rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-semibold text-gold sm:inline-block">
                Traffic & Route Map
              </span>
            </h4>
            <p className="text-[10px] text-muted truncate max-w-[200px] sm:max-w-none">
              Official IndianOil & Kolkata Police Traffic Circulation & Parking Master Plan
            </p>
          </div>
        </div>

        {/* Zone Selector Pills */}
        <div className="no-scrollbar flex max-w-full items-center gap-1 overflow-x-auto py-0.5">
          {ZONES.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => jumpToZone(zone.id)}
              className={cn(
                'whitespace-nowrap rounded-sm px-2.5 py-1 text-[11px] font-semibold transition-all',
                activeZone === zone.id
                  ? 'bg-gold-bright text-[#18080b] shadow-sm font-bold'
                  : 'bg-surface/80 text-muted hover:text-ink hover:bg-surface-elevated',
              )}
              title={zone.description}
            >
              {zone.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Map Surface */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center p-2',
        )}
      >
        <div
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1)',
            transformOrigin: 'center center',
          }}
          className="relative max-h-full max-w-full flex items-center justify-center will-change-transform"
        >
          {/* Low-res Fast Preview WebP */}
          <img
            src="/img/kolkata-police-puja-map-preview.webp"
            alt="Kolkata Police Puja Guide Map preview"
            className={cn(
              'max-h-[82vh] w-auto object-contain transition-opacity duration-300 drop-shadow-2xl',
              hdLoaded ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100',
            )}
            draggable={false}
          />

          {/* High-Res HD WebP */}
          <img
            src="/img/kolkata-police-puja-map-hd.webp"
            alt="Official Kolkata Police Puja Guide Map (Full High-Resolution)"
            onLoad={() => setHdLoaded(true)}
            className={cn(
              'max-h-[82vh] w-auto object-contain transition-opacity duration-300 drop-shadow-2xl',
              hdLoaded ? 'opacity-100' : 'opacity-0',
            )}
            draggable={false}
          />
        </div>

        {/* Floating Zoom & Action Controls */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 rounded-sm border border-hair bg-[#1a080d]/90 p-1 backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={() => handleZoom(0.35)}
            className="flex size-8 items-center justify-center rounded-sm text-muted hover:text-ink hover:bg-surface transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => handleZoom(-0.35)}
            className="flex size-8 items-center justify-center rounded-sm text-muted hover:text-ink hover:bg-surface transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex size-8 items-center justify-center rounded-sm text-muted hover:text-ink hover:bg-surface transition-colors"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="size-4" />
          </button>
          <div className="my-0.5 h-px bg-hair" />
          <a
            href="/img/kolkata-police-puja-map.jpg"
            download="Kolkata-Police-Puja-Guide-Map-2026.jpg"
            target="_blank"
            rel="noreferrer"
            className="flex size-8 items-center justify-center rounded-sm text-gold-bright hover:bg-gold/15 transition-colors"
            title="Download Official High-Res Map (JPG)"
            aria-label="Download High-Res Map"
          >
            <Download className="size-4" />
          </a>
        </div>

        {/* Floating Legend & Helpline Buttons (Left) */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowLegend(!showLegend)}
            className={cn(
              'flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors shadow-lg',
              showLegend
                ? 'border-gold-bright bg-gold-bright text-[#16070a]'
                : 'border-hair bg-[#1a080d]/85 text-muted hover:text-ink hover:bg-surface',
            )}
          >
            <Info className="size-3.5" />
            <span className="hidden sm:inline">Map</span> Legend & Key
          </button>

          <button
            type="button"
            onClick={() => setShowHelpline(!showHelpline)}
            className={cn(
              'flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors shadow-lg',
              showHelpline
                ? 'border-red bg-red text-white'
                : 'border-hair bg-[#1a080d]/85 text-red hover:bg-red/15',
            )}
          >
            <PhoneCall className="size-3.5" />
            <span className="hidden sm:inline">Police</span> Emergency
          </button>
        </div>

        {/* Collapsible Map Legend Drawer */}
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-16 left-4 z-30 max-w-sm rounded-sm border border-hair bg-[#1a080d]/95 p-4 text-xs backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-hair-soft pb-2 mb-2">
              <span className="font-bold uppercase tracking-wider text-gold-bright">Official Map Legend</span>
              <button
                type="button"
                onClick={() => setShowLegend(false)}
                className="text-muted hover:text-ink text-sm px-1"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2 text-ink">
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-blue-500/20 text-blue-400 font-bold text-[10px]">
                  🅿️
                </span>
                <div>
                  <p className="font-semibold text-blue-300">Designated Vehicle Parking</p>
                  <p className="text-[11px] text-muted">Authorized parking bays for cars and two-wheelers.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-red/20 text-red font-bold text-[10px]">
                  🛑
                </span>
                <div>
                  <p className="font-semibold text-red">No Entry / Pedestrian Roads</p>
                  <p className="text-[11px] text-muted">Closed to vehicular traffic from 3:00 PM to 4:00 AM.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                  ➡️
                </span>
                <div>
                  <p className="font-semibold text-amber-300">One-Way Circulation Streams</p>
                  <p className="text-[11px] text-muted">Mandatory traffic movement directions around pandals.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded bg-purple-500/20 text-purple-400 font-bold text-[10px]">
                  🚓
                </span>
                <div>
                  <p className="font-semibold text-purple-300">Police Assistance Booths</p>
                  <p className="text-[11px] text-muted">Kolkata Police on-duty assistance kiosks and medical posts.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Collapsible Helpline Drawer */}
        {showHelpline && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-16 left-4 z-30 max-w-xs rounded-sm border border-red/40 bg-[#1e070c]/95 p-4 text-xs backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-red/20 pb-2 mb-2">
              <span className="font-bold uppercase tracking-wider text-red flex items-center gap-1.5">
                <PhoneCall className="size-3.5" /> 24x7 Emergency Helplines
              </span>
              <button
                type="button"
                onClick={() => setShowHelpline(false)}
                className="text-muted hover:text-ink text-sm px-1"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              {EMERGENCY_NUMBERS.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-3">
                  <span className="text-muted text-[11px]">{item.label}</span>
                  <a
                    href={`tel:${item.number.split(' ')[0]}`}
                    className="font-mono font-bold text-gold-bright hover:underline"
                  >
                    {item.number}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Bottom Information / Advice bar */}
      {showEmergencyBar && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hair-soft bg-[#140608] px-3 py-2 text-[11px] text-muted sm:px-4">
          <p className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-gold-bright animate-pulse" />
            <span>
              Tip: Drag to pan, scroll or pinch to zoom. Use zone buttons above to focus on specific Kolkata sectors.
            </span>
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">Traffic Restrictions: 3:00 PM – 4:00 AM daily</span>
            <a
              href="/img/kolkata-police-puja-map.jpg"
              download="Kolkata-Police-Puja-Guide-Map-2026.jpg"
              className="text-gold-bright hover:underline font-semibold flex items-center gap-1"
            >
              <Download className="size-3" /> Download High-Res Map (4.2 MB)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
