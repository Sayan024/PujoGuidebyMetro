import { memo } from 'react';

interface TrishulMarkerProps {
  x: number;
  y: number;
  scale?: number;
  selected?: boolean;
  highlighted?: boolean;
  color?: string;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  title?: string;
}

/**
 * Custom SVG Durga Trishul (Trident) map marker.
 * Embodying the divine prowess of Maa Durga with three golden flame prongs,
 * vermillion core, crescent lotus base, and glowing aura.
 */
export const TrishulMarker = memo(function TrishulMarker({
  x,
  y,
  scale = 1,
  selected = false,
  highlighted = false,
  color = '#e6a83a',
  className = '',
  onClick,
  onKeyDown,
  title,
}: TrishulMarkerProps) {
  const size = selected ? 32 * scale : highlighted ? 26 * scale : 20 * scale;
  const half = size / 2;

  return (
    <g
      transform={`translate(${x - half}, ${y - half})`}
      className={`cursor-pointer transition-transform duration-300 ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      aria-label={title}
    >
      {/* Animated selection pulse aura */}
      {selected && (
        <circle cx={half} cy={half} r={half * 1.5} fill="none" stroke="#ef3340" strokeWidth="2" opacity="0.8">
          <animate attributeName="r" values={`${half * 1.1};${half * 2.2}`} dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Outer Halo Background */}
      <circle
        cx={half}
        cy={half}
        r={half * 0.9}
        fill={selected ? '#2a0a10' : '#18080a'}
        stroke={selected ? '#ef3340' : color}
        strokeWidth={selected ? 2.2 : 1.2}
        className="filter drop-shadow-[0_2px_6px_rgba(230,168,58,0.4)]"
      />

      {/* Trishul Graphic inside the halo */}
      <g transform={`translate(${half * 0.2}, ${half * 0.16}) scale(${size / 48})`}>
        <defs>
          <linearGradient id={`gold-trishul-${x}-${y}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd978" />
            <stop offset="60%" stopColor="#e6a83a" />
            <stop offset="100%" stopColor="#c4841d" />
          </linearGradient>
        </defs>

        {/* Central Spear Tip */}
        <path
          d="M 19 6 C 19 6, 20.5 1, 24 0 C 27.5 1, 29 6, 29 6 C 29 13, 26.5 17, 25 19 L 25 38 L 23 38 L 23 19 C 21.5 17, 19 13, 19 6 Z"
          fill={`url(#gold-trishul-${x}-${y})`}
        />

        {/* Left Outer Prong */}
        <path
          d="M 10 14 C 11 8, 15 5, 17 4 C 15 8, 16 14, 18 17 C 20 20, 21.5 22, 23 23 L 22.5 24.5 C 19.5 24, 16 22, 13 19 C 10.5 16.5, 9.5 15, 10 14 Z"
          fill="#ffd978"
        />

        {/* Right Outer Prong */}
        <path
          d="M 38 14 C 37 8, 33 5, 31 4 C 33 8, 32 14, 30 17 C 28 20, 26.5 22, 25 23 L 25.5 24.5 C 28.5 24, 32 22, 35 19 C 37.5 16.5, 38.5 15, 38 14 Z"
          fill="#ffd978"
        />

        {/* Vermillion Third Eye / Bindu in Center */}
        <ellipse cx="24" cy="13" rx="1.6" ry="2.6" fill="#ef3340" />

        {/* Base Lotus / Crescent Support */}
        <path
          d="M 16 28 C 20 31, 28 31, 32 28 C 30 33, 18 33, 16 28 Z"
          fill="#e6a83a"
        />

        {/* Trishul Handle */}
        <rect x="23" y="24" width="2" height="18" rx="1" fill={`url(#gold-trishul-${x}-${y})`} />
      </g>
    </g>
  );
});

/**
 * Parking Map Marker (Car, Bike, or Drop-off)
 */
export const ParkingMarker = memo(function ParkingMarker({
  x,
  y,
  type = 'car',
  scale = 1,
  selected = false,
  onClick,
  title,
}: {
  x: number;
  y: number;
  type: 'car' | 'bike' | 'both' | 'dropoff';
  scale?: number;
  selected?: boolean;
  onClick?: () => void;
  title?: string;
}) {
  const size = (selected ? 24 : 18) * scale;
  const half = size / 2;

  const bg = type === 'car' ? '#2563EB' : type === 'bike' ? '#059669' : '#D97706';
  const label = type === 'car' ? '🚗' : type === 'bike' ? '🏍' : '📍';

  return (
    <g
      transform={`translate(${x - half}, ${y - half})`}
      className="cursor-pointer transition-transform hover:scale-125"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={title}
    >
      <circle cx={half} cy={half} r={half * 0.9} fill={bg} stroke="#FFF" strokeWidth="1.2" opacity="0.9" />
      <text
        x={half}
        y={half + 3.5 * scale}
        textAnchor="middle"
        fontSize={10 * scale}
        className="pointer-events-none select-none"
      >
        {label}
      </text>
    </g>
  );
});

/**
 * Generates an SVG Data URI for MapLibre GL image source.
 */
export function getTrishulSvgString(selected = false): string {
  const stroke = selected ? '#ef3340' : '#e6a83a';
  const fill = selected ? '#2a0a10' : '#18080a';
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />
      <path d="M 17 8 C 17 8, 18 4, 20 3 C 22 4, 23 8, 23 8 C 23 13, 21.5 16, 20.8 18 L 20.8 32 L 19.2 32 L 19.2 18 C 18.5 16, 17 13, 17 8 Z" fill="#ffd978" />
      <path d="M 11 14 C 12 10, 15 8, 17 7 C 15 10, 16 14, 17.5 16 C 19 18, 20 19, 21 20 L 20.5 21 C 18.5 20.5, 16 19, 13.5 17 Z" fill="#ffd978" />
      <path d="M 29 14 C 28 10, 25 8, 23 7 C 25 10, 24 14, 22.5 16 C 21 18, 20 19, 19 20 L 19.5 21 C 21.5 20.5, 24 19, 26.5 17 Z" fill="#ffd978" />
      <ellipse cx="20" cy="13" rx="1.4" ry="2.2" fill="#ef3340" />
      <rect x="19.2" y="20" width="1.6" height="13" rx="0.8" fill="#e6a83a" />
    </svg>
  `.trim();
}

export function getParkingSvgString(type: 'car' | 'bike' | 'dropoff'): string {
  const bg = type === 'car' ? '#2563EB' : type === 'bike' ? '#059669' : '#D97706';
  const emoji = type === 'car' ? '🚗' : type === 'bike' ? '🏍' : '📍';
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="13" fill="${bg}" stroke="#ffffff" stroke-width="2" />
      <text x="15" y="19" font-size="13" text-anchor="middle" font-family="sans-serif">${emoji}</text>
    </svg>
  `.trim();
}
