import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeading } from '@/components/ui/primitives';
import { usePageTitle } from '@/hooks/useMedia';

const CREATOR = 'https://github.com/Sayan024';

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-hair-soft pt-8">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/90">{children}</div>
    </section>
  );
}

const ext = 'font-semibold text-gold-text underline underline-offset-4 hover:text-ink';

/** What the site does with data, and the terms of use, written from how the app actually works. */
export default function PrivacyPage() {
  usePageTitle('Privacy and terms');
  return (
    <div className="shell pb-8 pt-28 md:pt-36">
      <SectionHeading
        as="h1"
        eyebrow="Privacy and terms"
        title={
          <>
            Your <em className="font-medium text-gold">data</em>, plainly
          </>
        }
        lead="There are no accounts, no ads and no analytics on this site. Here is everything that is stored or sent, and the terms of use."
      />
      <Reveal className="mt-10 max-w-3xl space-y-8">
        <p className="text-xs text-muted">Last updated 17 October 2026.</p>

        <Block title="Kept on your own device">
          <p>
            Your saved pandals, your day-planner start time, light or dark mode and the sound setting are kept in your browser&rsquo;s own
            storage so they are still there next time. A short-lived note that you have seen the intro is kept for the browser session, and a
            timestamp stops the feedback form being sent twice in a row. None of this is sent to the site or to anyone else. Clearing your
            browser&rsquo;s site data removes it.
          </p>
        </Block>

        <Block title="Feedback and corrections">
          <p>
            If you send feedback or report a correction, your rating, the text you write and your email address (only if you choose to give
            one) go through this site&rsquo;s server to a Google Form that belongs to the guide&rsquo;s creator. Google&rsquo;s own{' '}
            <a className={ext} href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              privacy policy
            </a>{' '}
            applies to the form. Nothing you send is kept on this site or in your browser.
          </p>
          <p>
            The creator reads responses to fix mistakes and improve the guide, and uses an email address only to reply to you. Please do not
            put anything private in a message. To have a response removed, contact the creator through{' '}
            <a className={ext} href={CREATOR} target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
        </Block>

        <Block title="The AI assistant">
          <p>
            When you ask the assistant a question, your recent messages are sent through this site&rsquo;s server to{' '}
            <a className={ext} href="https://openrouter.ai/privacy" target="_blank" rel="noreferrer">
              OpenRouter
            </a>{' '}
            and the model provider it routes to, together with the guide&rsquo;s own data, so a reply can be written. The site does not store
            the conversation. Free models are run by third parties under their own terms, so do not share personal details. Replies come from
            a language model and can be wrong; check anything important with the puja committee.
          </p>
          <p>
            To stop one visitor using up the free quota, the server briefly remembers how many questions came from your internet address. This
            is held in memory only and expires within minutes.
          </p>
        </Block>

        <Block title="Your location">
          <p>
            The parking finder asks your browser for your location only when you press its button. It is used on your device to sort parking
            spots by distance and is not sent to this site or anyone else. You can refuse, and everything else still works.
          </p>
        </Block>

        <Block title="Other services your browser contacts">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Map tiles.</strong> The street map loads map images from CARTO, built on OpenStreetMap data, so your internet address
              reaches them when you open the map.
            </li>
            <li>
              <strong>Hosting.</strong> The site is hosted on Vercel, which keeps ordinary server logs (such as your internet address and the
              pages requested).
            </li>
            <li>
              <strong>Links you choose to open.</strong> Google Maps, Instagram, YouTube and other sites receive your visit only when you
              open their links; their own policies apply.
            </li>
          </ul>
          <p>Fonts are served from this site, and there are no advertising or analytics scripts.</p>
        </Block>

        <Block title="Terms of use">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Accuracy.</strong> Distances, themes, timings and Metro information are gathered from public announcements and may be
              wrong or change, especially during the festival. Confirm with the puja committee or Metro Railway Kolkata before you travel.
              This is an independent guide and is not affiliated with Metro Railway Kolkata, Kolkata Police or any puja committee.
            </li>
            <li>
              <strong>Licence.</strong> The code, design and data are published for viewing only, with all rights reserved. You may not
              copy, reuse, redistribute or imitate them, or use them to train machine-learning models. See the{' '}
              <a className={ext} href={`${CREATOR}/PujoGuidebyMetro/blob/main/LICENSE`} target="_blank" rel="noreferrer">
                licence
              </a>
              . Photographs, reels and audio belong to their creators and are credited on the{' '}
              <Link className={ext} to="/about">
                About page
              </Link>
              .
            </li>
            <li>
              <strong>Use at your own risk.</strong> Crowds, road closures and queues are not in anyone&rsquo;s control. Follow the instructions
              of Kolkata Police and event staff on the day.
            </li>
          </ul>
        </Block>

        <Block title="Questions">
          <p>
            Contact the creator, Sayan Banerjee, through{' '}
            <a className={ext} href={CREATOR} target="_blank" rel="noreferrer">
              GitHub
            </a>{' '}
            or the{' '}
            <Link className={ext} to="/feedback">
              feedback page
            </Link>
            .
          </p>
        </Block>
      </Reveal>
    </div>
  );
}
