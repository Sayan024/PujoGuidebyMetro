import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { Compass, Heart, Home, Map as MapIcon, Menu, Moon, Search, Shield, Sun, X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { DurgaEyes, Lotus } from '@/components/ui/Motifs';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

const LINKS = [
  { to: '/', label: 'Home', section: 'top' },
  { to: '/explore', label: 'Pandal Explorer', section: 'explore' },
  { to: '/map', label: 'Metro Map', section: 'map' },
  { to: '/themes', label: 'Themes', section: 'themes' },
  { to: '/favorites', label: 'My Puja List', section: 'my-list' },
  { to: '/about', label: 'About', section: '' },
];

/** On the home page the indicator follows the section being read; elsewhere it follows the route. */
function useActiveLink() {
  const { pathname } = useLocation();
  const [section, setSection] = useState('top');
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;
    setSection('top');
    const ids = LINKS.map((l) => l.section).filter((s) => s && s !== 'top');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    // Sections mount lazily, so look them up after the first paint as well.
    const attach = () => ids.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id)!));
    attach();
    const t = setTimeout(attach, 1200);
    const onScroll = () => window.scrollY < window.innerHeight * 0.5 && setSection('top');
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome]);

  if (isHome) return LINKS.find((l) => l.section === section)?.to ?? '/';
  if (pathname.startsWith('/pandal') || pathname.startsWith('/station')) return '/explore';
  return LINKS.find((l) => l.to !== '/' && pathname.startsWith(l.to))?.to ?? '';
}

function ThemeToggle({ className }: { className?: string }) {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn('icon-btn overflow-hidden', className)}
      aria-label={isDark ? 'Switch to Daylight Kolkata theme' : 'Switch to Dark Puja theme'}
      title={isDark ? 'Daylight Kolkata' : 'Dark Puja'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.22 }}
        >
          {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function FavoritesLink() {
  const count = useAppStore((s) => s.favorites.length);
  return (
    <Link to="/favorites" className="icon-btn" aria-label={`My Puja List, ${count} saved`}>
      <Heart className={cn('size-[18px]', count > 0 && 'fill-red text-red')} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className="absolute -right-1.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold-bright px-1 text-[10px] font-bold text-[#1a0c08]"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const active = useActiveLink();
  const openSearch = useAppStore((s) => s.setSearchOpen);
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => setDrawer(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  // Over the cinematic hero the bar is transparent and always uses the dark palette.
  const overHero = pathname === '/' && !scrolled;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[90] -translate-y-24 rounded-sm bg-gold-bright px-4 py-2 text-sm font-bold text-[#1a0c08] transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        data-theme={overHero ? 'dark' : undefined}
        className="fixed inset-x-0 top-0 z-50 px-[clamp(8px,2.4vw,40px)] pt-2.5 md:pt-3.5"
      >
        <nav
          aria-label="Primary"
          className="nav-pill relative mx-auto flex h-[62px] max-w-[1480px] items-center gap-3 px-4 md:px-6"
        >
          <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Pujo Porikroma by Metro 2026, home">
            <DurgaEyes className="h-[22px] text-gold-bright transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col text-left leading-tight">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Pujo by Metro</span>
              <span className="font-display text-[15px] font-bold text-ink md:text-[16.5px]">
                Pujo Porikroma <em className="text-gold-bright">2026</em>
              </span>
            </div>
          </Link>

          <ul className="mx-auto hidden items-center xl:flex">
            {LINKS.map((l, i) => (
              <Fragment key={l.to}>
                {i > 0 && <li aria-hidden="true" className="mx-0.5 size-[5px] rotate-45 bg-gold/55" />}
                <li>
                  <NavLink
                    to={l.to}
                    aria-current={active === l.to ? 'page' : undefined}
                    className={cn(
                      'relative isolate block whitespace-nowrap rounded-full px-3 py-2 font-display text-[11.5px] font-bold uppercase tracking-[0.12em] transition-colors 2xl:px-4 2xl:text-[12.5px]',
                      active === l.to ? 'text-white' : 'text-ink hover:text-red',
                    )}
                  >
                    {active === l.to && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#e3112f] to-[#b00220] shadow-[inset_0_0_0_2px_#ffb800,0_4px_12px_-4px_rgba(217,4,41,0.6)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </NavLink>
                </li>
              </Fragment>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <button
              type="button"
              onClick={() => openSearch(true)}
              className="icon-btn 2xl:inline-flex 2xl:w-auto 2xl:items-center 2xl:gap-2.5 2xl:px-3.5"
              aria-label="Search pandals and stations"
            >
              <Search className="size-[18px]" />
              <span className="hidden text-xs font-medium text-muted 2xl:inline">Search</span>
              <kbd className="hidden rounded-md border border-hair-soft px-1.5 font-mono text-[10px] text-muted 2xl:inline">Ctrl K</kbd>
            </button>
            <SoundToggle className="hidden sm:inline-grid" />
            <ThemeToggle className="hidden sm:inline-grid" />
            <span className="hidden lg:block">
              <FavoritesLink />
            </span>
            <button
              type="button"
              onClick={() => useAppStore.getState().openPoliceMapModal()}
              className="btn btn-sm btn-ghost hidden !rounded-full xl:inline-flex items-center gap-1.5 !px-2.5 text-xs text-gold-bright"
              title="Official Kolkata Police Traffic & Route Map"
            >
              <Shield className="size-3.5 text-red" />
              <span className="hidden 2xl:inline">Police Map</span>
            </button>
            <button
              type="button"
              className="icon-btn xl:hidden"
              onClick={() => setDrawer(true)}
              aria-label="Open menu"
              aria-expanded={drawer}
              aria-controls="mobile-drawer"
            >
              <Menu className="size-5" />
            </button>
          </div>

          <motion.span
            aria-hidden="true"
            className="absolute inset-x-3 bottom-0 h-px origin-left bg-gold-bright/70"
            style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
          />
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close menu" onClick={() => setDrawer(false)} />
            <motion.div
              className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col border-l border-hair bg-surface px-6 pb-8 pt-5"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DurgaEyes className="h-6 text-gold-bright" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted">Pujo by Metro</span>
                    <span className="font-display text-sm font-bold text-ink">
                      Pujo Porikroma <span className="text-gold-bright">2026</span>
                    </span>
                  </div>
                </div>
                <button className="icon-btn" onClick={() => setDrawer(false)} aria-label="Close menu" autoFocus>
                  <X className="size-5" />
                </button>
              </div>
              <ul className="mt-8 flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-hair-soft"
                  >
                    <Link
                      to={l.to}
                      className={cn(
                        'flex items-center justify-between py-4 font-display text-[26px] font-semibold',
                        active === l.to ? 'text-gold-bright' : 'text-ink',
                      )}
                    >
                      {l.label}
                      <span className="text-xs font-sans text-muted">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + LINKS.length * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-hair-soft"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setDrawer(false);
                      useAppStore.getState().openPoliceMapModal();
                    }}
                    className="flex w-full items-center justify-between py-4 font-display text-[26px] font-semibold text-ink text-left"
                  >
                    <span>Police Traffic Map</span>
                    <span className="rounded bg-red/20 border border-red/40 px-2 py-0.5 font-sans text-[10px] font-bold text-red uppercase tracking-wider">
                      Official
                    </span>
                  </button>
                </motion.li>
              </ul>
              <div className="mt-auto flex items-center justify-between pt-8">
                <p className="flex items-center gap-2 font-bn text-sm text-gold">
                  <Lotus className="h-4" /> শুভ শারদীয়া ১৪৩৩
                </p>
                <span className="flex gap-2">
                  <SoundToggle className="inline-grid" />
                  <ThemeToggle className="inline-grid" />
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile tab bar: a floating pill with a raised Map button */}
      <nav
        aria-label="Quick navigation"
        className="nav-pill fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-50 grid h-[64px] grid-cols-5 items-center px-1.5 lg:hidden"
      >
        {[
          { to: '/', label: 'Home', Icon: Home },
          { to: '/explore', label: 'Explore', Icon: Compass },
          { to: '/map', label: 'Map', Icon: MapIcon },
          { to: '/favorites', label: 'Saved', Icon: Heart },
        ].map(({ to, label, Icon }, i) => {
          const on = to === '/' ? pathname === '/' : pathname.startsWith(to) || (to === '/explore' && /^\/(pandal|station)/.test(pathname));
          const isMap = to === '/map';
          const link = (
            <Link
              key={to}
              to={to}
              aria-current={on ? 'page' : undefined}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 font-display text-[9.5px] font-bold uppercase tracking-[0.1em]',
                isMap
                  ? '-mt-8 size-[66px] justify-self-center rounded-full border-[3px] border-[#ffb800] bg-gradient-to-b from-[#e3112f] to-[#a8021c] text-white shadow-[0_10px_24px_-6px_rgba(217,4,41,0.7)] ring-4 ring-[var(--surface)]'
                  : on
                    ? 'h-[50px] justify-self-center rounded-full bg-gradient-to-b from-[#e3112f] to-[#b00220] px-3 text-white shadow-[inset_0_0_0_2px_#ffb800]'
                    : 'h-[50px] text-ink/80',
              )}
            >
              <span className="relative">
                <Icon className={isMap ? 'size-6' : 'size-[19px]'} aria-hidden="true" />
                {to === '/favorites' && <SavedDot />}
              </span>
              {label}
            </Link>
          );
          // The raised Map button sits in the middle of the five slots; More takes the last.
          return i === 2 ? <Fragment key={to}>{link}</Fragment> : link;
        })}
        <button
          type="button"
          onClick={() => setDrawer(true)}
          aria-label="More: open the full menu"
          aria-expanded={drawer}
          aria-controls="mobile-drawer"
          className="flex h-[50px] flex-col items-center justify-center gap-0.5 font-display text-[9.5px] font-bold uppercase tracking-[0.1em] text-ink/80"
        >
          <Menu className="size-[19px]" aria-hidden="true" />
          More
        </button>
      </nav>
    </>
  );
}

function SavedDot() {
  const count = useAppStore((s) => s.favorites.length);
  if (!count) return null;
  return (
    <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[9px] font-bold text-white">
      {count}
    </span>
  );
}
