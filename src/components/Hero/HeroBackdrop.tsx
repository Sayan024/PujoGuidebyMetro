import { memo } from 'react';

// Howrah Bridge profile: two towers with the suspended span dipping between them.
const DECK_Y = 596;
const TOWERS = [730, 970];
function chordY(x: number) {
  const [a, b] = TOWERS;
  const top = 418;
  const anchor = DECK_Y - 14;
  if (x <= a) return anchor + (top - anchor) * ((x - 610) / (a - 610)) ** 1.6;
  if (x >= b) return anchor + (top - anchor) * ((1090 - x) / (1090 - b)) ** 1.6;
  const mid = (a + b) / 2;
  const t = Math.abs(x - mid) / ((b - a) / 2);
  return 512 - (512 - top) * t ** 1.8;
}

const truss: string[] = [];
for (let x = 610; x <= 1090; x += 20) {
  const y = chordY(x);
  truss.push(`M${x} ${DECK_Y}V${y.toFixed(1)}`);
  if (x < 1090) truss.push(`M${x} ${DECK_Y}L${x + 20} ${chordY(x + 20).toFixed(1)}`);
}
const chord = Array.from({ length: 49 }, (_, i) => {
  const x = 610 + i * 10;
  return `${i ? 'L' : 'M'}${x} ${chordY(x).toFixed(1)}`;
}).join('');

// [x, width, height] silhouettes along the far bank.
const SKYLINE: [number, number, number][] = [
  [0, 70, 46], [64, 44, 78], [112, 60, 54], [176, 38, 96], [218, 74, 60], [296, 48, 110], [348, 66, 70],
  [418, 40, 88], [462, 80, 52], [546, 44, 74], [1096, 52, 82], [1152, 40, 120], [1196, 70, 64],
  [1380, 50, 96], [1434, 44, 132], [1482, 66, 76], [1552, 48, 104],
];
const WINDOWS = Array.from({ length: 70 }, (_, i) => {
  const b = SKYLINE[(i * 7) % SKYLINE.length];
  const rx = ((i * 37) % 100) / 100;
  const ry = ((i * 53) % 100) / 100;
  return { x: b[0] + 6 + rx * (b[1] - 12), y: DECK_Y - 8 - ry * (b[2] - 14), o: 0.35 + ((i * 17) % 60) / 100 };
});
const RIPPLES = Array.from({ length: 34 }, (_, i) => ({
  x: 560 + ((i * 97) % 980),
  y: 742 + ((i * 41) % 150),
  w: 26 + ((i * 29) % 90),
  d: (i % 7) * 0.5,
}));

/**
 * The Kolkata evening scene drawn as vectors. It is the hero's poster frame:
 * shown immediately, kept on phones and for reduced-motion users, and
 * cross-faded out when the WebGL scene is ready on capable desktops.
 */
function HeroBackdropImpl({ animated = true }: { animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hb-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd9a0" />
          <stop offset="0.7" stopColor="#f39a4a" />
          <stop offset="1" stopColor="#d9612d" />
        </radialGradient>
        <radialGradient id="hb-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ff8a3d" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#c0392b" stopOpacity="0.18" />
          <stop offset="1" stopColor="#701525" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a121b" />
          <stop offset="1" stopColor="#120909" />
        </linearGradient>
        <linearGradient id="hb-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb25e" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffb25e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hb-train" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3ecf5" />
          <stop offset="1" stopColor="#b9a9c4" />
        </linearGradient>
      </defs>

      <circle cx="1210" cy="330" r="420" fill="url(#hb-halo)" />
      <circle cx="1210" cy="330" r="92" fill="url(#hb-moon)" />

      {/* Far bank */}
      <g fill="#1b0a11">
        {SKYLINE.map(([x, w, h]) => (
          <rect key={x} x={x} y={DECK_Y - h} width={w} height={h + 130} />
        ))}
        {/* Domed landmark */}
        <path d="M1262 596v-86h16v-22c0-26 22-44 44-48v-18h6v18c22 4 44 22 44 48v22h16v86Z" />
        <rect x="1240" y="548" width="170" height="60" />
      </g>
      <g fill="#ffcb7a">
        {WINDOWS.map((w, i) => (
          <rect key={i} x={w.x} y={w.y} width="3" height="4" opacity={w.o} />
        ))}
      </g>

      {/* Howrah Bridge */}
      <g stroke="#2a0f17" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d={truss.join('')} strokeWidth="2" />
        <path d={chord} strokeWidth="5" />
        <path d={`M560 ${DECK_Y}H1140`} strokeWidth="9" />
        {TOWERS.map((x) => (
          <path key={x} d={`M${x - 9} ${DECK_Y + 130}V${chordY(x) - 4}M${x + 9} ${DECK_Y + 130}V${chordY(x) - 4}`} strokeWidth="7" />
        ))}
      </g>
      <path d={chord} stroke="#ff9d57" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
      <g fill="#ffd66b">
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx={572 + i * 24} cy={DECK_Y - 9} r="1.8" opacity={0.5 + (i % 3) * 0.2} />
        ))}
      </g>

      {/* River */}
      <rect x="0" y="722" width="1600" height="178" fill="url(#hb-water)" />
      <rect x="1120" y="722" width="180" height="178" fill="url(#hb-shaft)" />
      <g stroke="#ffc978" strokeLinecap="round" strokeWidth="2">
        {RIPPLES.map((r, i) => (
          <path
            key={i}
            d={`M${r.x} ${r.y}h${r.w}`}
            opacity="0.5"
            style={animated ? { animation: `flicker ${3 + (i % 4)}s ease-in-out ${r.d}s infinite` } : undefined}
          />
        ))}
      </g>

      {/* Metro viaduct and train */}
      <g transform="rotate(-3.5 1600 650)">
        <g fill="#1a0a10">
          {[900, 1060, 1220, 1380, 1540].map((x) => (
            <path key={x} d={`M${x} 668h44l-8 16v90h-28v-90Z`} />
          ))}
          <rect x="820" y="650" width="900" height="20" />
          <rect x="820" y="640" width="900" height="6" opacity="0.8" />
        </g>
        <g style={animated ? { animation: 'train-glide 16s ease-in-out infinite' } : undefined}>
          {[0, 1, 2, 3].map((c) => {
            const x = 1010 + c * 190;
            return (
              <g key={c}>
                <rect x={x} y="588" width="184" height="54" rx="7" fill="url(#hb-train)" />
                <rect x={x} y="622" width="184" height="9" fill="#8b3fd6" />
                <rect x={x} y="631" width="184" height="11" rx="3" fill="#3a2a44" />
                {[0, 1, 2, 3, 4].map((w) => (
                  <rect key={w} x={x + 12 + w * 34} y="598" width="24" height="18" rx="2" fill="#ffd98f" opacity={0.95} />
                ))}
              </g>
            );
          })}
          <path d="M1010 596q-22 4-30 46h30Z" fill="#e7deec" />
          <circle cx="990" cy="634" r="4" fill="#fff3c9" />
          <path d="M986 634L820 618v36Z" fill="#ffe9a8" opacity="0.14" />
        </g>
      </g>
    </svg>
  );
}

export const HeroBackdrop = memo(HeroBackdropImpl);
