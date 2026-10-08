import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Car, Footprints, Heart, MapPin, MapPinned, TrainFront } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { InstagramGlyph } from '@/components/ui/Motifs';
import { LineBadge } from '@/components/ui/primitives';
import { instagramOf, instagramUrl } from '@/data/instagram';
import type { Pandal } from '@/data/types';
import { useIsFavorite } from '@/hooks/useFavorites';
import { useCanHover } from '@/hooks/useMedia';
import { cn, formatKm, themeLabel } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';
import { PandalCover } from './PandalCover';

export function SaveButton({
  pandal,
  variant = 'icon',
  className,
}: {
  pandal: Pick<Pandal, 'id' | 'name'>;
  variant?: 'icon' | 'label';
  className?: string;
}) {
  const saved = useIsFavorite(pandal.id);
  const toggle = useAppStore((s) => s.toggleFavorite);
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(pandal.id, pandal.name);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${pandal.name} from My Puja List` : `Save ${pandal.name} to My Puja List`}
      className={cn(
        variant === 'icon' ? 'icon-btn size-[38px] shrink-0' : 'btn btn-sm btn-ghost',
        saved && 'border-red/60 text-red',
        className,
      )}
    >
      <motion.span
        key={String(saved)}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 520, damping: 14 }}
        className="grid place-items-center"
      >
        <Heart className={cn('size-4', saved && 'fill-red')} aria-hidden="true" />
      </motion.span>
      {variant === 'label' && <span>{saved ? 'Saved' : 'Save'}</span>}
    </motion.button>
  );
}

/** Link to the committee's Instagram. Renders nothing when no confirmed handle is on record. */
export function InstagramLink({ pandal, variant = 'icon', className }: { pandal: Pick<Pandal, 'id' | 'name'>; variant?: 'icon' | 'handle'; className?: string }) {
  const handle = instagramOf(pandal.id);
  if (!handle) return null;
  return (
    <a
      href={instagramUrl(handle)}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label={`${pandal.name} on Instagram, @${handle} (opens in a new tab)`}
      title={`@${handle}`}
      className={cn(
        variant === 'icon'
          ? 'icon-btn size-[38px] shrink-0'
          : 'group/ig flex min-w-0 items-center gap-3 border border-hair-soft bg-surface/70 px-4 py-3 transition-colors hover:border-gold/70',
        className,
      )}
    >
      <InstagramGlyph className={variant === 'handle' ? 'size-5 shrink-0 text-gold' : undefined} />
      {variant === 'handle' && (
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Committee on Instagram</span>
          <span className="block truncate text-[15px] font-semibold group-hover/ig:text-gold-bright">@{handle}</span>
        </span>
      )}
    </a>
  );
}

function PandalCardImpl({ pandal: p, priority }: { pandal: Pandal; priority?: boolean }) {
  const canHover = useCanHover();
  const reduced = useReducedMotion();
  const tilt = canHover && !reduced;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 20 });

  return (
    <motion.article
      className="group relative [perspective:1100px]"
      onPointerMove={(e) => {
        if (!tilt) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div
        style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className="panel relative flex h-full overflow-hidden transition-[border-color,box-shadow,translate] duration-300 group-hover:-translate-y-1 group-hover:border-gold/70 group-hover:shadow-[var(--glow)] sm:flex-col"
      >
        {/* Image */}
        <Link
          to={`/pandal/${p.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block w-[34%] shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-full"
        >
          <PandalCover
            pandal={p}
            eager={priority}
            className="absolute inset-0"
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#120909]/85 via-transparent to-transparent" />
          <LineBadge line={p.line} className="absolute left-2.5 top-2.5 max-sm:hidden" />
          {p.popularity >= 85 && (
            <span className="absolute right-2.5 top-2.5 rounded-sm bg-[#120909]/75 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#ffd66b] backdrop-blur max-sm:hidden">
              Popular
            </span>
          )}
          <span className="absolute inset-x-3 bottom-2.5 hidden items-center gap-1.5 text-xs font-semibold text-[#fff4e6] sm:flex">
            <TrainFront className="size-3.5" style={{ color: `var(--${p.line}-line)` }} aria-hidden="true" />
            {p.station}
          </span>
        </Link>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-5">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold text-muted sm:hidden">
            <span className="size-2 rounded-full" style={{ background: `var(--${p.line}-line)` }} aria-hidden="true" />
            {p.station}
          </p>
          <h3 className="font-display text-[1.15rem] font-semibold leading-tight sm:text-[1.4rem]">
            <Link to={`/pandal/${p.id}`} className="outline-none after:absolute after:inset-0 after:content-[''] sm:after:hidden">
              {p.name}
            </Link>
          </h3>
          <p className={cn('mt-1 line-clamp-1 text-[13px]', p.theme ? 'italic text-gold' : 'text-muted')}>{themeLabel(p)}</p>

          <dl className="mt-3 flex items-center gap-4 text-[13px] sm:mt-4 sm:gap-5">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-gold" aria-hidden="true" />
              <dt className="sr-only">Distance from station</dt>
              <dd className="font-semibold tabular-nums">{formatKm(p.distanceKm)}</dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Footprints className="size-3.5 text-gold" aria-hidden="true" />
              <dt className="sr-only">Walking time</dt>
              <dd className="font-semibold tabular-nums">{p.walkingMinutes} min walk</dd>
            </div>
          </dl>

          <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex" aria-label="Tags">
            {p.locality && (
              <li className="tag border-gold/40 text-gold-light">
                📍 {p.locality}
              </li>
            )}
            {p.parking && p.parking.length > 0 && (
              <li className="tag border-emerald-800/40 bg-emerald-950/40 text-emerald-300">
                🚗 Parking
              </li>
            )}
            {p.tags.slice(0, 3).map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          <div className="relative z-10 mt-auto flex items-center gap-2 pt-3.5 sm:pt-5">
            <Link to={`/pandal/${p.id}`} className="btn btn-sm btn-primary flex-1 max-sm:hidden">
              View details <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                useAppStore.getState().setParkingModalPandalId(p.id);
              }}
              className="btn btn-sm btn-ghost max-sm:h-[34px] max-sm:px-2.5 text-xs text-gold-light"
              aria-label={`Parking near ${p.name}`}
              title="Parking bays and drop-off points"
            >
              <Car className="size-3.5 text-gold" aria-hidden="true" />
              <span>Parking</span>
            </button>
            <Link
              to={`/map?pandal=${p.id}`}
              className="btn btn-sm btn-ghost max-sm:h-[34px] max-sm:px-2.5"
              aria-label={`View ${p.name} on the map`}
            >
              <MapPinned className="size-3.5" aria-hidden="true" />
              <span>Map</span>
            </Link>
            <InstagramLink pandal={p} className="max-sm:size-[34px]" />
            <SaveButton pandal={p} className="max-sm:size-[34px]" />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export const PandalCard = memo(PandalCardImpl);
