import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'motion/react';
import { ImageOff } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { LINE_BY_ID } from '@/data/metroLines';
import type { MetroLineId } from '@/data/types';
import { useCanHover } from '@/hooks/useMedia';
import { cn, img } from '@/lib/utils';
import { Lotus } from './Motifs';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content in the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; y?: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
  as: Tag = 'h2',
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <Reveal className={cn(align === 'center' && 'text-center', className)}>
      <p className={cn('eyebrow flex items-center gap-3', align === 'center' && 'justify-center')}>
        <Lotus className="h-3.5 opacity-80" />
        {eyebrow}
      </p>
      <Tag className="display mt-4 text-[clamp(2.4rem,6vw,5.6rem)] text-ink">{title}</Tag>
      {lead && (
        <p className={cn('mt-5 max-w-xl text-base text-muted md:text-lg', align === 'center' && 'mx-auto')}>{lead}</p>
      )}
    </Reveal>
  );
}

/** Animated count-up that runs once when visible. */
export function Counter({ value, decimals = 0, className }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = useReducedMotion();
  const from = useRef(0);
  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduced) {
      node.textContent = value.toFixed(decimals);
      return;
    }
    const controls = animate(from.current, value, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => (node.textContent = v.toFixed(decimals)),
    });
    from.current = value;
    return () => controls.stop();
  }, [value, decimals, inView, reduced]);
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {(0).toFixed(decimals)}
    </span>
  );
}

/** Link styled as a button that leans towards the cursor. */
export function MagneticLink({ className, children, ...props }: LinkProps & { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const canHover = useCanHover();
  const reduced = useReducedMotion();
  const active = canHover && !reduced;
  return (
    <motion.span
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (!active) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.97 }}
    >
      <Link className={cn('btn', className)} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}

/** Lazy responsive image with a shimmer placeholder and a designed fallback when it fails. */
export function SmartImage({
  name,
  alt,
  sizes = '(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw',
  className,
  imgClassName,
  eager,
  fallback,
}: {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** Shown instead of the generic "photo unavailable" panel when the file fails to load. */
  fallback?: ReactNode;
}) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  // One failed request is often transient (a restarting server, a rebuild, a flaky
  // connection), so the image is retried once, with a fresh URL, before giving up.
  const [attempt, setAttempt] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const bust = attempt ? `?retry=${attempt}` : '';
  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setState('ready');
  }, []);
  return (
    <div className={cn('relative overflow-hidden bg-surface', className)}>
      {state === 'loading' && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {state === 'error' && fallback ? (
        fallback
      ) : state === 'error' ? (
        <div
          role="img"
          aria-label={`${alt} — photo unavailable`}
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_30%,var(--surface-light),var(--surface))] text-muted"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <ImageOff className="size-5 text-gold" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Photo unavailable</span>
          </div>
        </div>
      ) : (
        <img
          key={attempt}
          ref={ref}
          src={img(name, 480) + bust}
          srcSet={`${img(name, 480)}${bust} 480w, ${img(name, 1200)}${bust} 1200w`}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => {
            if (attempt === 0) {
              window.setTimeout(() => setAttempt(1), 700);
              setState('loading');
            } else setState('error');
          }}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-500',
            state === 'ready' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

export function LineDot({ line, className }: { line: MetroLineId; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block size-2.5 shrink-0 rounded-full', className)}
      style={{ background: `var(--${line}-line)`, boxShadow: `0 0 10px var(--${line}-line)` }}
    />
  );
}

export function LineBadge({ line, className }: { line: MetroLineId; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-sm px-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white',
        className,
      )}
      style={{ background: `color-mix(in srgb, var(--${line}-line) 82%, #000)` }}
    >
      {LINE_BY_ID[line].short} line
    </span>
  );
}

export function EmptyState({
  icon,
  title,
  children,
  action,
  className,
}: {
  icon: ReactNode;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center overflow-hidden border border-dashed border-hair px-6 py-14 text-center',
        className,
      )}
    >
      <div className="mb-5 grid size-14 place-items-center rounded-full border border-hair text-gold">{icon}</div>
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      {children && <p className="mt-2 max-w-md text-sm text-muted">{children}</p>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
