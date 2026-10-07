import { memo } from 'react';
import { Alpana, DurgaEyes, TempleArches } from '@/components/ui/Motifs';
import { SmartImage } from '@/components/ui/primitives';
import type { Pandal } from '@/data/types';
import { cn, hashUnit } from '@/lib/utils';

// Festival tints the line colour is blended into, so neighbours on one line still differ.
const TINTS = ['#701525', '#8a3b12', '#5b1d6b', '#7a1c2a', '#3b2a6b', '#6b4a12'];

const SKIP = new Set(['the', 'of', 'and', 'club', 'sarbojanin', 'sarbojonin', 'durgotsav', 'puja', 'samiti', 'sangha']);

/** Up to two initials from the words that actually identify the pandal. */
function monogram(name: string) {
  const words = name.replace(/\(.*?\)/g, '').split(/[\s-]+/).filter(Boolean);
  const strong = words.filter((w) => !SKIP.has(w.toLowerCase()));
  const pick = (strong.length ? strong : words).slice(0, 2);
  return pick.map((w) => (/^\d/.test(w) ? w.match(/^\d+/)![0] : w[0].toUpperCase())).join('');
}

/**
 * Generated cover for a pandal with no photograph: its Metro line colour, an
 * alpana rosette and a monogram, varied per pandal so a grid never repeats.
 * It replaces the stock photo the source list reused for most entries.
 */
function PandalArtImpl({ pandal: p, className, bare }: { pandal: Pandal; className?: string; bare?: boolean }) {
  const a = hashUnit(p.id, 1);
  const b = hashUnit(p.id, 2);
  const c = hashUnit(p.id, 3);
  const bonedi = p.category === 'Traditional Bonedi Bari';
  const line = `var(--${p.line}-line)`;
  const tint = TINTS[Math.floor(hashUnit(p.id, 4) * TINTS.length) % TINTS.length];

  return (
    <div
      role="img"
      aria-label={`Illustrated cover for ${p.name}; no photograph yet`}
      className={cn('relative overflow-hidden [container-type:size]', className)}
      style={{
        background: `radial-gradient(120% 110% at ${15 + a * 70}% ${b * 60}%, color-mix(in srgb, ${line} ${26 + c * 26}%, ${tint}) 0%, color-mix(in srgb, ${tint} 45%, #150a0d) 48%, #150a0d 100%)`,
      }}
    >
      <Alpana
        petals={bonedi ? 12 : 16}
        className="absolute aspect-square h-[190%] text-[#ffd66b] opacity-[0.2]"
        style={{ left: `${-45 + a * 70}%`, top: `${-70 + b * 50}%`, transform: `rotate(${Math.round(c * 45)}deg)` }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{ background: `linear-gradient(${120 + a * 80}deg, transparent 40%, color-mix(in srgb, ${line} 30%, transparent) 100%)` }}
      />
      {bonedi && <TempleArches className="absolute inset-x-0 bottom-0 h-[16%] w-full text-[#120909]/70" />}

      {/* Page headers already print the name large, so they take the art without the monogram. */}
      {!bare && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5cqh]">
          <DurgaEyes className="h-[11cqh] min-h-2.5 text-[#ffd66b]/85" />
          <span
            aria-hidden="true"
            className="font-display font-bold leading-none tracking-tight text-[#fff4e6] drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
            style={{ fontSize: 'min(34cqh, 30cqw)' }}
          >
            {monogram(p.name)}
          </span>
        </div>
      )}
    </div>
  );
}

export const PandalArt = memo(PandalArtImpl);

/** The picture slot for a pandal: its own photo when one exists, generated art otherwise (or if the photo fails). */
export function PandalCover({
  pandal,
  className,
  imgClassName,
  sizes,
  eager,
  alt = '',
  bare,
}: {
  pandal: Pandal;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
  alt?: string;
  bare?: boolean;
}) {
  if (!pandal.hasPhoto) return <PandalArt pandal={pandal} bare={bare} className={className} />;
  return (
    <SmartImage
      name={pandal.image}
      alt={alt}
      sizes={sizes}
      eager={eager}
      className={className}
      imgClassName={imgClassName}
      fallback={<PandalArt pandal={pandal} bare={bare} className="absolute inset-0" />}
    />
  );
}
