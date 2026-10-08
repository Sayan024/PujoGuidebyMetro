import { Link } from 'react-router-dom';
import { Alpana, DurgaEyes, InstagramGlyph, Lotus } from '@/components/ui/Motifs';
import { DHAK_CREDIT } from '@/data/credits';
import { instagramUrl, PUJO_GUIDES } from '@/data/instagram';
import { TOTAL_PANDALS } from '@/data';
import { METRO_LINES } from '@/data/metroLines';
import { img } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

export function Footer() {
  const setLine = useAppStore((s) => s.setLine);
  return (
    <footer className="relative mt-28 overflow-hidden border-t border-hair pb-[calc(84px+env(safe-area-inset-bottom))] md:mt-40 lg:pb-0">
      <Alpana className="pointer-events-none absolute -left-52 -top-40 size-[620px] text-gold opacity-[0.06]" />
      <div className="shell relative py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <DurgaEyes className="h-8 text-gold-bright" />
            <div className="mt-6">
              <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-muted">PUJO BY METRO</span>
              <p className="display mt-1 text-[clamp(2rem,4vw,3.6rem)]">
                Pujo Porikroma <span className="gold-text gold-text-auto">2026</span>
              </p>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold-light">
              Meeting Thakur in the Metro
            </p>
            <p lang="bn" className="mt-2 flex items-center gap-2 font-bn text-base text-gold">
              <Lotus className="h-4" /> মেট্রোয় ঠাকুর দেখা
            </p>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Your Metro-powered Durga Puja journey across Kolkata & Howrah. Discovering {TOTAL_PANDALS} pandals, Bonedi Bari celebrations, and verified car/bike parking.
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ['/explore', 'Pandal Explorer'],
                ['/map', 'Pujo Map'],
                ['/map?view=police', 'Kolkata Police Traffic Map'],
                ['/themes', '2026 Theme Gallery'],
                ['/favorites', 'My Puja List & day planner'],
                ['/about', 'About this guide'],
                ['/feedback', 'Send feedback'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-ink/85 underline-offset-4 hover:text-gold-bright hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Metro lines">
            <h2 className="eyebrow">By Metro line</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {METRO_LINES.map((l) => (
                <li key={l.id}>
                  <Link
                    to="/explore"
                    onClick={() => setLine(l.id)}
                    className="flex items-center gap-2.5 text-ink/85 underline-offset-4 hover:text-gold-bright hover:underline"
                  >
                    <span className="size-2.5 rounded-full" style={{ background: `var(--${l.id}-line)` }} aria-hidden="true" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Before you go</h2>
            <p className="mt-5 text-sm text-muted">
              Walking distances, themes and timings are compiled from public announcements and may change. Check Metro
              Railway Kolkata for special service timings and follow Kolkata Police crowd directions on the day.
            </p>
            <h2 className="eyebrow mt-8">Pujo in reels</h2>
            <ul className="mt-4 space-y-3">
              {PUJO_GUIDES.slice(0, 3).map((g) => (
                <li key={g.handle}>
                  <a
                    href={instagramUrl(g.handle)}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 text-sm"
                    aria-label={`${g.name ?? g.handle} on Instagram, @${g.handle} (opens in a new tab)`}
                  >
                    <InstagramGlyph className="mt-0.5 size-[18px] shrink-0 text-gold" />
                    <span>
                      <span className="block font-semibold text-ink/90 group-hover:text-gold-bright">@{g.handle}</span>
                      <span className="block text-xs text-muted">{g.note}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <Link to="/about#sources" className="text-xs font-semibold text-gold-bright underline-offset-4 hover:underline">
                  All {PUJO_GUIDES.length} Instagram sources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-gold mt-14" />
        <p className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Link to="/about#creator" className="group flex items-center gap-2.5 text-ink/85 hover:text-gold-bright">
              <img
                src={img('sayan', 480)}
                alt=""
                width="28"
                height="28"
                loading="lazy"
                className="size-7 rounded-full border border-hair object-cover object-[50%_18%]"
                onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
              />
              <span>
                Created by <strong className="font-semibold">Sayan Banerjee</strong>
              </span>
            </Link>
            <span aria-hidden="true">·</span>
            <span>© 2026 Pujo by Metro. An independent guide, not affiliated with Metro Railway Kolkata.</span>
            <span aria-hidden="true">·</span>
            <span>
              Dhak:{' '}
              <a href={DHAK_CREDIT.videoUrl} target="_blank" rel="noreferrer" className="font-semibold text-ink/85 underline-offset-4 hover:text-gold-bright hover:underline">
                {DHAK_CREDIT.channel} on YouTube
              </a>
            </span>
          </span>
          <span lang="bn" className="font-bn text-sm text-gold">
            শুভ শারদীয়া ১৪৩৩
          </span>
        </p>
      </div>
    </footer>
  );
}
