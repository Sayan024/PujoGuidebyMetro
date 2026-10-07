import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { ArrowDown, Compass, Map as MapIcon } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { intro } from '@/components/ui/intro';
import { Counter, MagneticLink } from '@/components/ui/primitives';
import { TempleArches } from '@/components/ui/Motifs';
import { BONEDI_COUNT, STATIONS_WITH_PANDALS, TOTAL_PANDALS } from '@/data';
import { METRO_LINES } from '@/data/metroLines';
import { useCan3D, useCanHover, useOnScreen } from '@/hooks/useMedia';
import { img } from '@/lib/utils';
import { HeroBackdrop } from './HeroBackdrop';
import { heroPointer } from './pointer';

const HeroScene3D = lazy(() => import('./HeroScene3D'));

const EASE = [0.22, 1, 0.36, 1] as const;

function RevealLine({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: '108%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: delay + i * 0.09, ease: EASE }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const canHover = useCanHover();
  const can3D = useCan3D();
  const [sectionRef, onScreen] = useOnScreen<HTMLElement>();
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [mount3D, setMount3D] = useState(false);
  const [ready3D, setReady3D] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  // Entrance timings start after the opening title card, when it plays.
  const [base] = useState(() => (intro.pending ? 1.15 : 0.1));
  const fade = (delay: number, y = 18) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: base + delay, ease: EASE },
  });

  // The WebGL scene is fetched only after the hero text has painted and the browser is idle.
  useEffect(() => {
    if (!can3D) return;
    const start = () => setMount3D(true);
    const idle = window.requestIdleCallback?.(start, { timeout: 2200 });
    const timer = idle === undefined ? window.setTimeout(start, 900) : undefined;
    return () => {
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [can3D]);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Cursor parallax (desktop pointers only), smoothed with springs.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const parallax = canHover && !reduced;

  const { scrollYProgress } = useScroll({ target: node ? { current: node } : undefined, offset: ['start start', 'end start'] });
  const scrollShift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const contentShift = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const contentFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const durgaX = useTransform(sx, (v) => v * -16);
  const durgaY = useTransform([sy, scrollShift], ([p, s]: number[]) => p * -10 + s);
  const sceneX = useTransform(sx, (v) => v * 12);
  const sceneY = useTransform([sy, scrollShift], ([p, s]: number[]) => p * 6 + s * 0.5);
  const ornamentX = useTransform(sx, (v) => v * 26);
  const ornamentY = useTransform(sy, (v) => v * 18);

  const stats = [
    { value: TOTAL_PANDALS, label: 'Pandals mapped' },
    { value: STATIONS_WITH_PANDALS, label: 'Metro stations' },
    { value: METRO_LINES.length, label: 'Metro lines' },
    { value: BONEDI_COUNT, label: 'Bonedi Bari pujas' },
  ];

  return (
    <div className="relative">
      <section
        ref={(el) => {
          sectionRef(el);
          setNode(el);
        }}
        data-theme="dark"
        aria-labelledby="hero-title"
        className="grain relative isolate h-[90svh] min-h-[660px] overflow-hidden bg-[#120909] lg:h-screen lg:min-h-[720px]"
        onPointerMove={(e) => {
          if (!parallax) return;
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          mx.set(x);
          my.set(y);
          heroPointer.x = x;
          heroPointer.y = y;
        }}
      >
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 78% 38%, #7a1c2a 0%, #4a1022 34%, transparent 70%), radial-gradient(60% 60% at 20% 20%, #3b1140 0%, transparent 70%), linear-gradient(180deg, #1a0a14 0%, #2a0d18 55%, #120909 100%)',
          }}
        />

        {/* Kolkata scene: vector poster, replaced by WebGL when available */}
        <motion.div
          className="absolute inset-0 opacity-60 lg:opacity-100"
          style={{ x: sceneX, y: sceneY, scale: 1.04 }}
          animate={{ opacity: ready3D ? 0 : undefined }}
          transition={{ duration: 1.2 }}
        >
          <HeroBackdrop animated={!reduced && onScreen && !ready3D} />
        </motion.div>
        {mount3D && (
          <Suspense fallback={null}>
            <motion.div
              className="absolute inset-0"
              style={{ y: sceneY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: ready3D ? 1 : 0 }}
              transition={{ duration: 1.4 }}
            >
              <HeroScene3D active={onScreen && tabVisible} onReady={() => setReady3D(true)} />
            </motion.div>
          </Suspense>
        )}

        {/* Durga */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[50%] lg:inset-y-0 lg:right-auto lg:h-auto lg:w-[42vw] lg:max-w-[860px]"
          style={{ x: durgaX, y: durgaY }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: base, ease: EASE }}
        >
          <img
            src={img('sreebhumi', 1200)}
            srcSet={`${img('sreebhumi', 480)} 480w, ${img('sreebhumi', 1200)} 1200w`}
            sizes="(min-width: 1024px) 42vw, 100vw"
            alt="Durga idol adorned in gold, with the trident and ten arms"
            fetchPriority="high"
            className="size-full object-cover object-[50%_22%] lg:object-[62%_22%] [mask-image:linear-gradient(to_bottom,#000_45%,transparent_98%)] lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(to_right,#000_38%,transparent_96%),linear-gradient(to_top,transparent_0%,#000_26%)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(112,21,37,0.35),transparent_60%)] mix-blend-multiply" />
        </motion.div>

        {/* Legibility scrims */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_62%_at_50%_52%,rgba(18,9,9,0.72),transparent_75%)] max-lg:bg-[linear-gradient(to_top,#120909_38%,rgba(18,9,9,0.55)_62%,transparent_86%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#120909] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#120909]/80 to-transparent" />

        {/* Floating ornament */}
        {parallax && (
          <motion.div
            aria-hidden="true"
            className="absolute right-[6%] top-[16%] hidden size-2 rounded-full bg-gold-bright shadow-[0_0_24px_6px_rgba(255,214,107,0.55)] xl:block"
            style={{ x: ornamentX, y: ornamentY }}
          />
        )}

        {/* Copy */}
        <motion.div
          className="shell relative z-10 flex h-full flex-col items-center justify-end pb-10 text-center lg:justify-center lg:pb-16 lg:pt-24"
          style={{ y: contentShift, opacity: contentFade }}
        >
          <motion.div {...fade(0)} className="hidden max-w-2xl sm:block">
            <p lang="sa" className="font-bn text-[clamp(0.95rem,1.25vw,1.2rem)] leading-relaxed text-gold-bright">
              ॥ যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা । নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ ॥
            </p>
            <p className="mt-1.5 text-[12.5px] italic text-muted">
              “To the Goddess who abides in all beings as the Mother — Namaste, Namaste, Namaste, Namo Namah.”
            </p>
          </motion.div>

          <motion.p
            {...fade(0.15)}
            className="glass mt-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold-bright sm:text-[11px]"
          >
            <span aria-hidden="true">🌺</span> Happy Sharadiya 1433
            <span className="h-3 w-px bg-hair" aria-hidden="true" /> Durga Puja 2026
          </motion.p>

          <h1 id="hero-title" className="display mt-5 text-[#fff4e6]">
            <RevealLine
              text="PUJO BY METRO"
              delay={base + 0.25}
              className="block text-[clamp(2.5rem,min(7vw,11.5vh),8rem)] drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]"
            />
            <span className="block overflow-hidden">
              <motion.span
                className="gold-text block text-[clamp(4.6rem,min(12.5vw,20vh),14rem)] leading-[0.86]"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: base + 0.5, ease: EASE }}
              >
                2026
              </motion.span>
            </span>
          </h1>

          <motion.p {...fade(0.75)} className="mt-4 font-display text-[clamp(1.1rem,1.9vw,1.75rem)] italic text-gold-bright">
            <span aria-hidden="true">🚇</span> Meeting Thakur in the Metro <span aria-hidden="true">🪷</span>
          </motion.p>
          <motion.p {...fade(0.85)} className="mt-3 max-w-[34rem] text-[15px] text-[#eadbd3] md:text-base">
            Discover {TOTAL_PANDALS}+ Durga Puja pandals and Bonedi Bari celebrations near Kolkata Metro stations.
          </motion.p>

          <motion.div {...fade(1)} className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <MagneticLink to="/explore" className="btn-primary">
              <Compass className="size-4" aria-hidden="true" /> Explore pandals
            </MagneticLink>
            <MagneticLink to="/map" className="btn-ghost">
              <MapIcon className="size-4" aria-hidden="true" /> View Metro map
            </MagneticLink>
          </motion.div>

          <motion.dl
            {...fade(1.2, 10)}
            className="mt-9 hidden w-full max-w-3xl grid-cols-4 divide-x divide-hair border-y border-hair lg:grid [@media(max-height:820px)]:hidden"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-3">
                <dd className="font-display text-3xl font-semibold text-gold-bright">
                  <Counter value={s.value} />
                </dd>
                <dt className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <a
          href="#calendar"
          className="absolute bottom-7 right-[clamp(16px,4vw,72px)] z-10 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted transition-colors hover:text-gold-bright lg:flex"
        >
          Scroll
          <motion.span animate={reduced ? undefined : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="size-4" aria-hidden="true" />
          </motion.span>
        </a>
      </section>

      {/* Thakurdalan arches cut the hero into the page colour of the active theme */}
      <TempleArches className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-7 w-full text-bg md:h-10" />
    </div>
  );
}
