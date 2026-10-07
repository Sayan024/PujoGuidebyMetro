import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeading, SmartImage } from '@/components/ui/primitives';
import { Diya, InstagramGlyph } from '@/components/ui/Motifs';
import { committeeAccounts, creditedSources, instagramUrl, PUJO_GUIDES } from '@/data/instagram';
import { BONEDI_COUNT, PANDAL_BY_ID, STATIONS_WITH_PANDALS, TOTAL_PANDALS } from '@/data';
import { usePageTitle } from '@/hooks/useMedia';

export function NotFound() {
  usePageTitle('Page not found');
  return (
    <div className="shell grid min-h-[80vh] place-items-center pt-28 text-center">
      <div>
        <p className="display gold-text gold-text-auto text-[clamp(6rem,22vw,16rem)]">404</p>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">This platform has no train</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">The page you were looking for doesn’t exist. The pandals, however, very much do.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
          <Link to="/explore" className="btn btn-primary">
            Explore pandals <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SourceRow({ handle, name, note, trailing }: { handle: string; name?: string; note: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <InstagramGlyph className="size-[18px] shrink-0 text-gold" />
      <a
        href={instagramUrl(handle)}
        target="_blank"
        rel="noreferrer"
        className="min-w-0 flex-1 hover:text-gold-bright"
        aria-label={`@${handle} on Instagram (opens in a new tab)`}
      >
        <span className="block truncate text-[15px] font-semibold">@{handle}</span>
        <span className="block truncate text-xs text-muted">{name ? `${name} · ${note}` : note}</span>
      </a>
      {trailing && <span className="shrink-0 text-xs font-semibold tabular-nums text-muted">{trailing}</span>}
    </div>
  );
}

export default function About() {
  usePageTitle('About');
  const credited = creditedSources();
  return (
    <div className="shell pt-28 md:pt-36">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div className="min-w-0">
          <SectionHeading
            as="h1"
            eyebrow="About this guide"
            title={
              <>
                Thakur dekha, <em className="font-medium text-gold">by Metro</em>
              </>
            }
          />
          <Reveal delay={0.1} className="mt-8 max-w-2xl space-y-5 text-[17px] leading-relaxed text-ink/90">
            <p>
              For five nights every autumn Kolkata walks. Roads close, buses crawl, and the fastest way between two
              pandals is almost always underground. Pujo by Metro starts from that fact: instead of listing pandals by
              neighbourhood, it lists them by the station you step out of.
            </p>
            <p>
              The guide covers {TOTAL_PANDALS} sarbojanin pujas and {BONEDI_COUNT} Bonedi Bari celebrations across{' '}
              {STATIONS_WITH_PANDALS} stations on the Blue, Green, Purple, Orange and Yellow lines, each with a walking
              distance and time so you can decide what is worth the queue.
            </p>
            <p>
              Save the ones you want, and the day planner orders your stations, counts the Metro stops and tells you
              roughly when you will be home.
            </p>
          </Reveal>

          <Reveal delay={0.12} id="creator" className="panel mt-12 flex scroll-mt-28 flex-col overflow-hidden sm:flex-row">
            <SmartImage
              name="sayan"
              alt="Sayan Banerjee, smiling with arms crossed, in a cream printed kurta"
              sizes="(min-width: 640px) 240px, 100vw"
              className="aspect-[4/5] w-full shrink-0 sm:aspect-auto sm:w-[240px]"
              imgClassName="object-[50%_22%]"
              fallback={
                <div
                  role="img"
                  aria-label="Sayan Banerjee"
                  className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_30%,#8a1b2c,#2a0d17_70%)]"
                >
                  <span className="display text-6xl text-[#ffd66b]">SB</span>
                </div>
              }
            />
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="eyebrow">The maker</p>
              <h2 className="display mt-3 text-[clamp(2rem,3.4vw,3rem)]">Sayan Banerjee</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/90">
                Pujo by Metro 2026 is created entirely by Sayan Banerjee — the idea, the pandal list and the site you are
                reading.
              </p>
              <p lang="bn" className="mt-4 font-bn text-base text-gold">
                শুভ শারদীয়া — ঠাকুর দেখা শুভ হোক।
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid gap-px border border-hair bg-hair sm:grid-cols-2">
            {[
              ['How distances work', 'Distance and minutes are measured on foot from the station named on each card, at an unhurried pace. On Ashtami and Navami nights add the delay shown in the travel advisory.'],
              ['How the map works', 'Metro lines and stations are drawn at their real positions. Pandal markers sit at their listed distance from the station; use “Get directions” for the exact walking route.'],
              ['What is saved', 'Your Puja List, plan and theme preference stay in this browser’s local storage. Nothing is uploaded and there is no account.'],
              ['Accuracy', 'Themes, timings and special Metro services are compiled from public announcements and can change at short notice. Confirm with the puja committee or Metro Railway Kolkata.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-surface p-6">
                <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold">
                  <Diya className="h-5 text-gold" /> {title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-12 scroll-mt-28" id="sources">
            <h2 className="eyebrow">Instagram sources</h2>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Reels linked from pandal pages belong to the accounts below and open on Instagram; nothing is copied or
              re-hosted here. Creators and city guides are independent of this guide and of the puja committees.
            </p>

            <h3 className="mt-7 font-display text-xl font-semibold">Reels used in this guide</h3>
            <ul className="mt-3 divide-y divide-hair-soft border-y border-hair-soft">
              {credited.map((g) => (
                <li key={g.handle}>
                  <SourceRow handle={g.handle} name={g.name} note={g.note} trailing={`${g.reels} ${g.reels === 1 ? 'reel' : 'reels'}`} />
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-xl font-semibold">Committee accounts</h3>
            <ul className="mt-3 divide-y divide-hair-soft border-y border-hair-soft">
              {committeeAccounts().map(([id, handle]) => (
                <li key={id}>
                  <SourceRow
                    handle={handle}
                    name={PANDAL_BY_ID.get(id)?.name}
                    note="Puja committee"
                    trailing={
                      <Link to={`/pandal/${id}`} className="text-gold-bright hover:underline">
                        Pandal page
                      </Link>
                    }
                  />
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-display text-xl font-semibold">Also covering the season</h3>
            <ul className="mt-3 divide-y divide-hair-soft border-y border-hair-soft">
              {PUJO_GUIDES.filter((g) => !credited.some((c) => c.handle === g.handle)).map((g) => (
                <li key={g.handle}>
                  <SourceRow handle={g.handle} name={g.name} note={g.note} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative min-h-[420px] lg:sticky lg:top-28 lg:h-[72vh] lg:self-start">
          <SmartImage name="kumartuli" alt="Unfinished clay idols in a Kumartuli workshop" sizes="(min-width:1024px) 45vw, 100vw" className="absolute inset-0 border border-hair" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#120909] to-transparent p-6 pt-24 text-[#fff4e6]">
            <p className="font-display text-2xl italic">“Ma aschen.”</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#c8aeb0]">Kumartuli, the potters’ quarter near Shobhabazar Sutanuti</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
