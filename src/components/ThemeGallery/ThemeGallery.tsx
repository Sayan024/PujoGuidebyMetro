import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SmartImage } from '@/components/ui/primitives';
import { THEMES } from '@/data/themes';
import { cn } from '@/lib/utils';

// An editorial, uneven grid: three rows whose column spans never repeat.
const SPANS = ['lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-7', 'lg:col-span-5'];

export function ThemeGallery({ activeId }: { activeId?: string }) {
  return (
    <div role="list" className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-12">
      {THEMES.map((t, i) => {
        const active = t.id === activeId;
        return (
          <Reveal
            key={t.id}
            role="listitem"
            delay={(i % 3) * 0.07}
            className={cn(SPANS[i], i === 0 || i === 7 ? 'col-span-2' : 'col-span-1')}
          >
              <Link
                to={`/themes?theme=${t.id}`}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'group relative block h-[250px] overflow-hidden border outline-offset-4 transition-[border-color,box-shadow] duration-500 sm:h-[320px] lg:h-[380px]',
                  active ? 'border-gold-bright shadow-[var(--glow)]' : 'border-hair-soft hover:border-gold/70',
                )}
              >
                <SmartImage
                  name={t.image}
                  alt=""
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12] group-focus-visible:scale-[1.12]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#120909] via-[#120909]/45 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                <span className="absolute left-4 top-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#ffd66b] md:left-6 md:top-5">
                  <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span className="h-px w-6 bg-[#ffd66b]/60" aria-hidden="true" />
                  <span className="max-sm:hidden">{t.kicker}</span>
                </span>
                <ArrowUpRight
                  className="absolute right-4 top-4 size-5 -translate-x-2 translate-y-2 text-[#ffd66b] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:right-6 md:top-5"
                  aria-hidden="true"
                />

                <span className="absolute inset-x-4 bottom-4 block text-[#fff4e6] md:inset-x-6 md:bottom-6">
                  <span className="block translate-y-0 transition-transform duration-500 ease-out [@media(hover:hover)]:translate-y-[4.6rem] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-visible:translate-y-0">
                    <span className="block font-display text-[1.35rem] font-semibold leading-[1.05] sm:text-3xl lg:text-[2.3rem]">
                      {t.name}
                    </span>
                    <span className="mt-2 flex items-baseline gap-2 text-[#ffd66b]">
                      <span className="font-display text-2xl font-semibold tabular-nums">{t.count}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        {t.count === 1 ? 'pandal' : 'pandals'}
                      </span>
                    </span>
                    <span className="mt-2 hidden max-w-md text-[13.5px] leading-snug text-[#eadbd3] transition-opacity duration-500 sm:block [@media(hover:hover)]:h-[3.4rem] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100">
                      {t.description}
                    </span>
                  </span>
                </span>
              </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
