import { motion } from 'motion/react';
import { Hourglass } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PandalCard } from '@/components/PandalCard/PandalCard';
import { ThemeGallery } from '@/components/ThemeGallery/ThemeGallery';
import { EmptyState, SectionHeading } from '@/components/ui/primitives';
import { PANDALS } from '@/data';
import { THEME_BY_ID } from '@/data/themes';
import { usePageTitle } from '@/hooks/useMedia';

export default function ThemesPage() {
  const [params] = useSearchParams();
  const theme = THEME_BY_ID[params.get('theme') ?? ''];
  usePageTitle(theme ? `${theme.name} pandals` : '2026 Theme Gallery');
  const listRef = useRef<HTMLElement>(null);

  const pandals = useMemo(
    () => (theme ? PANDALS.filter((p) => p.category === theme.name).sort((a, b) => b.popularity - a.popularity) : []),
    [theme],
  );

  useEffect(() => {
    if (theme) listRef.current?.scrollIntoView({ block: 'start' });
  }, [theme]);

  return (
    <div className="shell pt-28 md:pt-36">
      <SectionHeading
        as="h1"
        eyebrow="Theme discovery"
        title={
          <>
            2026 theme <em className="font-medium text-gold">gallery</em>
          </>
        }
        lead="Eight ways to read the season. Choose a theme to see every pandal that belongs to it."
      />
      <div className="mt-10 md:mt-14">
        <ThemeGallery activeId={theme?.id} />
      </div>

      {theme && (
        <section ref={listRef} aria-labelledby="theme-list-title" className="scroll-mt-28 pt-16 md:pt-24">
          <p className="eyebrow">{theme.kicker}</p>
          <h2 id="theme-list-title" className="display mt-3 text-[clamp(2.2rem,5vw,4.5rem)]">
            {theme.name}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{theme.description}</p>

          {pandals.length ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
              {pandals.map((p, i) => (
                <motion.li
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                >
                  <PandalCard pandal={p} />
                </motion.li>
              ))}
            </ul>
          ) : (
            <EmptyState className="mt-8" icon={<Hourglass className="size-6" />} title="Themes still under wraps">
              No committee has announced a {theme.name.toLowerCase()} theme for 2026 yet. Announcements usually arrive in
              the weeks before Mahalaya.
            </EmptyState>
          )}
        </section>
      )}
    </div>
  );
}
