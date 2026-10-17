import { ArrowUpRight, Award, Brush, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeading } from '@/components/ui/primitives';
import { SHARAD_SHAMMAN_2026, SHARAD_SHAMMAN_URL, type ShortlistedPuja } from '@/data/sharadShamman';

function Card({ p }: { p: ShortlistedPuja }) {
  const same = p.themeArtist === p.idolArtist;
  const body = (
    <>
      <span className="flex items-start justify-between gap-3">
        <span className="font-display text-lg font-semibold leading-tight group-hover:text-gold-bright">{p.name}</span>
        {p.pandalId && <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted group-hover:text-gold-bright" aria-hidden="true" />}
      </span>
      <span className="mt-2 block font-display text-[15px] italic leading-snug text-gold">{p.theme}</span>
      <span className="mt-2 block text-xs leading-relaxed text-muted">{p.about}</span>
      <span className="mt-3 flex items-start gap-2 text-[11px] text-muted">
        <Brush className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
        <span>
          {same ? (
            <>Theme and idol: {p.themeArtist}</>
          ) : (
            <>
              Theme: {p.themeArtist} · Idol: {p.idolArtist}
            </>
          )}
        </span>
      </span>
    </>
  );
  const cls = 'group flex h-full flex-col border border-hair-soft bg-surface/70 px-5 py-4 transition-colors';
  return p.pandalId ? (
    <Link to={`/pandal/${p.pandalId}`} className={`${cls} hover:border-gold/70`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Home-page chapter: the pujas shortlisted for the Asian Paints Sharad Shamman awards. */
export function SharadShammanSection() {
  return (
    <section id="sharad-shamman" aria-labelledby="shamman-heading" className="shell pt-24 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Asian Paints Sharad Shamman 2026"
          title={
            <span id="shamman-heading">
              Final-round <em className="font-medium text-gold">shortlist</em>
            </span>
          }
          lead="Twelve pujas reached the final round of the awards this year. Winners are announced after the festival; here is who is in the running, with their themes and artists."
        />
        <Reveal delay={0.1}>
          <a href={SHARAD_SHAMMAN_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Award className="size-4" aria-hidden="true" /> Official list <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 md:mt-14">
        {SHARAD_SHAMMAN_2026.map((p, i) => (
          <li key={p.name}>
            <Reveal delay={Math.min(i, 5) * 0.04} className="h-full">
              <Card p={p} />
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-muted">
        Themes and artists as published by{' '}
        <a href={SHARAD_SHAMMAN_URL} target="_blank" rel="noreferrer" className="underline decoration-hair underline-offset-4 hover:text-gold-bright">
          Asian Paints Sharad Shamman
        </a>
        . This guide is not affiliated with the awards.
      </p>
    </section>
  );
}
