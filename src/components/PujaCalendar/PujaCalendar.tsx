import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Reveal, SectionHeading, SmartImage } from '@/components/ui/primitives';
import { currentPujaDay, PUJA_DAYS, type PujaDay } from '@/data/pujaDates';
import { useIsDesktop } from '@/hooks/useMedia';
import { cn, daysUntil } from '@/lib/utils';

function countdown(day: PujaDay) {
  const start = daysUntil(day.date);
  const end = daysUntil(day.endDate ?? day.date);
  if (start <= 0 && end >= 0) return { label: 'Today', live: true };
  if (start > 0) return { label: start === 1 ? 'Tomorrow' : `In ${start} days`, live: false };
  return { label: 'Completed', live: false };
}

const dayNumber = (d: PujaDay) => d.dateLabel.replace('October ', '');

function DayPanel({ day, active, onActivate }: { day: PujaDay; active: boolean; onActivate: () => void }) {
  const when = countdown(day);
  return (
    <li
      className={cn(
        'group relative min-w-0 overflow-hidden border-t-2 transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        active ? 'grow-[3.4] border-gold-bright' : 'grow border-hair',
      )}
      style={{ flexBasis: 0 }}
      onMouseEnter={onActivate}
    >
      <button
        type="button"
        onClick={onActivate}
        onFocus={onActivate}
        aria-expanded={active}
        aria-label={`${day.name}, ${day.weekday} ${day.dateLabel}`}
        className="relative block h-[460px] w-full text-left"
      >
        <SmartImage
          name={day.image}
          alt=""
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="absolute inset-0"
          imgClassName={cn(
            'transition-[filter,transform,opacity] duration-700',
            active ? 'scale-100 !opacity-90' : 'scale-110 !opacity-25 grayscale',
          )}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[#120909] via-[#120909]/70 to-[#120909]/20" />

        <span className="absolute inset-x-5 top-5 flex items-start justify-between">
          <span>
            <span
              className={cn(
                'display block whitespace-nowrap text-[clamp(2.2rem,3.1vw,3.8rem)] transition-colors duration-500',
                active ? 'text-gold-bright' : 'text-[#fff4e6]/80',
              )}
            >
              {dayNumber(day)}
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8aeb0]">October</span>
          </span>
          {active && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                'mt-2 rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em]',
                when.live ? 'bg-red text-white' : 'border border-[#ddaa44]/50 text-[#ffd66b]',
              )}
            >
              {when.label}
            </motion.span>
          )}
        </span>

        <span className="absolute inset-x-5 bottom-5 block text-[#fff4e6]">
          <AnimatePresence initial={false}>
            {active && (
              <motion.span
                key="bn"
                className="mb-1 block font-bn text-lg text-[#ffd66b]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                exit={{ opacity: 0 }}
                lang="bn"
              >
                {day.bengali}
              </motion.span>
            )}
          </AnimatePresence>
          <span
            className={cn(
              'block font-display font-semibold leading-tight transition-[font-size] duration-500',
              active ? 'text-[2.1rem]' : 'text-xl',
            )}
          >
            {day.name}
          </span>
          <AnimatePresence initial={false}>
            {active && (
              <motion.span
                key="body"
                className="block overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.25 } }}
              >
                <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#ddaa44]">
                  {day.weekday} · {day.ritual}
                </span>
                <span className="mt-3 block max-w-md text-sm leading-relaxed text-[#eadbd3]">{day.description}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </li>
  );
}

export function PujaCalendar() {
  const desktop = useIsDesktop();
  const [activeId, setActiveId] = useState(() => currentPujaDay().id);

  return (
    <section id="calendar" aria-labelledby="calendar-title" className="relative pt-20 md:pt-28">
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Sharadiya 1433"
          title={
            <span id="calendar-title">
              2026 Puja <em className="font-medium text-gold">timings</em>
            </span>
          }
        />
        <Reveal delay={0.1} className="max-w-sm text-sm text-muted lg:text-right">
          Six days from Mahalaya to Dashami. Ashtami spans two calendar days this year, with Sandhi Puja at the
          junction.
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-10 md:mt-14">
        {desktop ? (
          <ol className="shell flex gap-1.5" onMouseLeave={() => setActiveId(currentPujaDay().id)}>
            {PUJA_DAYS.map((d) => (
              <DayPanel key={d.id} day={d} active={d.id === activeId} onActivate={() => setActiveId(d.id)} />
            ))}
          </ol>
        ) : (
          <ol
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
            aria-label="Puja days, swipe sideways"
          >
            {PUJA_DAYS.map((d) => {
              const when = countdown(d);
              return (
                <li key={d.id} className="relative h-[400px] w-[80vw] max-w-[360px] shrink-0 snap-center overflow-hidden border-t-2 border-gold">
                  <SmartImage name={d.image} alt="" sizes="80vw" className="absolute inset-0" imgClassName="!opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120909] via-[#120909]/75 to-[#120909]/10" />
                  <div className="absolute inset-x-5 top-4 flex items-start justify-between">
                    <p className="display text-5xl text-[#ffd66b]">{dayNumber(d)}</p>
                    <span className={cn('rounded-sm px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', when.live ? 'bg-red text-white' : 'border border-[#ddaa44]/50 text-[#ffd66b]')}>
                      {when.label}
                    </span>
                  </div>
                  <div className="absolute inset-x-5 bottom-5 text-[#fff4e6]">
                    <p className="font-bn text-base text-[#ffd66b]" lang="bn">{d.bengali}</p>
                    <h3 className="font-display text-3xl font-semibold">{d.name}</h3>
                    <p className="mt-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#ddaa44]">
                      {d.weekday} · {d.ritual}
                    </p>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#eadbd3]">{d.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </Reveal>
    </section>
  );
}
