import { useEffect, useState, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/** True once the element has come near the viewport; used to defer heavy sections. */
export function useNearViewport<T extends Element>(rootMargin = '400px') {
  const [node, setNode] = useState<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!node || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, seen, rootMargin]);
  return [setNode, seen] as const;
}

/** Whether the element is currently on screen. */
export function useOnScreen<T extends Element>() {
  const [node, setNode] = useState<T | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, [node]);
  return [setNode, visible] as const;
}

/**
 * The 3D scenes are an enhancement: desktop-class devices with WebGL, enough
 * cores/memory, no data-saver and no reduced-motion preference.
 */
export function useCan3D() {
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    if ((nav.hardwareConcurrency ?? 4) < 4 || (nav.deviceMemory ?? 4) < 4) return;
    try {
      const canvas = document.createElement('canvas');
      setCapable(Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl')));
    } catch {
      setCapable(false);
    }
  }, []);
  return desktop && !reduced && capable;
}

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} · Pujo by Metro 2026`
      : 'Pujo by Metro 2026 | Kolkata Durga Puja Pandal Guide';
  }, [title]);
}
