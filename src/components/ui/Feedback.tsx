import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, HeartOff, Info, RotateCcw } from 'lucide-react';
import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from 'react';
import { useAppStore } from '@/store/appStore';
import { intro } from './intro';
import { DurgaEyes } from './Motifs';

export function Toaster() {
  const toasts = useAppStore((s) => s.toasts);
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(84px+env(safe-area-inset-bottom))] z-[70] flex flex-col items-center gap-2 px-4 lg:bottom-8"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="glass pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium shadow-[var(--shadow)]"
            role="status"
          >
            {t.tone === 'save' ? (
              <Heart className="size-4 shrink-0 fill-red text-red" aria-hidden="true" />
            ) : t.tone === 'remove' ? (
              <HeartOff className="size-4 shrink-0 text-muted" aria-hidden="true" />
            ) : (
              <Info className="size-4 shrink-0 text-gold" aria-hidden="true" />
            )}
            <span className="truncate">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Short opening title card. Shown once per browser session and never for reduced-motion users. */
export function IntroLoader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(intro.pending);
  useEffect(() => {
    if (!show) {
      intro.pending = false;
      return;
    }
    try {
      sessionStorage.setItem('pbm-intro', '1');
    } catch {
      /* private mode: it simply plays again next time */
    }
    const t = setTimeout(() => setShow(false), 1350);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && !reduced && (
        <motion.div
          data-theme="dark"
          className="fixed inset-0 z-[100] grid place-items-center bg-[#120909]"
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          onClick={() => setShow(false)}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scaleY: 0.1 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <DurgaEyes className="h-14 text-gold-bright" />
            </motion.div>
            <motion.p
              className="mt-6 text-[11px] font-bold uppercase tracking-[0.26em] text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.35 }}
            >
              PUJO BY METRO
            </motion.p>
            <motion.p
              className="display mt-1 text-4xl text-[#fff4e6] md:text-5xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
            >
              Pujo Porikroma
            </motion.p>
            <motion.p
              className="display gold-text mt-1 text-5xl md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              2026
            </motion.p>
            <motion.p
              className="font-display mt-2 text-xs italic text-gold-light/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.4 }}
            >
              Meeting Thakur in the Metro
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PageSkeleton() {
  return (
    <div className="shell pt-32 pb-24" aria-busy="true" aria-label="Loading">
      <div className="skeleton h-3 w-40" />
      <div className="skeleton mt-5 h-16 w-[min(560px,80%)]" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton aspect-[4/5]" />
        ))}
      </div>
    </div>
  );
}

interface BoundaryProps {
  children: ReactNode;
  /** Compact fallback for a single widget instead of the full page. */
  fallback?: ReactNode;
  resetKey?: string;
}

export class ErrorBoundary extends Component<BoundaryProps, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Pujo by Metro]', error, info.componentStack);
  }
  componentDidUpdate(prev: BoundaryProps) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }
  render() {
    if (!this.state.failed) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;
    return (
      <div className="shell grid min-h-[70vh] place-items-center pt-28 pb-24 text-center">
        <div>
          <DurgaEyes className="mx-auto h-10 text-gold" />
          <h1 className="display mt-6 text-5xl">Something slipped off the rails</h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            This page ran into a problem. Your saved pandals are safe — reload to pick up where you left off.
          </p>
          <button className="btn btn-primary mt-8" onClick={() => window.location.reload()}>
            <RotateCcw className="size-4" aria-hidden="true" /> Reload
          </button>
        </div>
      </div>
    );
  }
}
