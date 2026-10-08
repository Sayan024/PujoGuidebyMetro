import { ArrowRight, Download, Maximize2, MessageSquareHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Explorer } from '@/components/Explorer/Explorer';
import { MyPujaListSection } from '@/components/Favorites/MyPujaList';
import { Hero } from '@/components/Hero/Hero';
import { MahalayaMorning } from '@/components/Mahalaya/MahalayaMorning';
import NetworkMap from '@/components/MetroMap/NetworkMap';
import { PujoMap } from '@/components/MetroMap/PujoMap';
import { MetroDiscovery } from '@/components/MetroSelector/MetroDiscovery';
import { PujaCalendar } from '@/components/PujaCalendar/PujaCalendar';
import { TravelAdvisory } from '@/components/TravelAdvisory/TravelAdvisory';
import { PoliceMapSection } from '@/components/PoliceMap/PoliceMapSection';
import { ThemeGallery } from '@/components/ThemeGallery/ThemeGallery';
import { Reveal, SectionHeading } from '@/components/ui/primitives';
import { TOTAL_PANDALS } from '@/data';
import { useIsDesktop, useNearViewport, usePageTitle } from '@/hooks/useMedia';
import { useAppStore } from '@/store/appStore';
import { downloadFeedbackCsv, getQueuedFeedback } from '@/data/feedbackStore';

function MapChapter() {
  const desktop = useIsDesktop();
  const [ref, near] = useNearViewport<HTMLDivElement>('600px');

  return (
    <section id="map" aria-labelledby="map-title" className="pt-24 md:pt-36">
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Interactive Trishul Map"
          title={
            <span id="map-title">
              Pujo Porikroma <em className="font-medium text-gold">map</em>
            </span>
          }
          lead={`All ${TOTAL_PANDALS} pandals marked with sacred Durga Trishul markers alongside verified car & bike parking hubs.`}
        />
        <Reveal delay={0.1}>
          <Link to="/map" className="btn btn-ghost">
            <Maximize2 className="size-4" aria-hidden="true" /> Full-screen map
          </Link>
        </Reveal>
      </div>

      <div ref={ref} className="mt-10 md:mt-14">
        {desktop ? (
          // The map libraries are only fetched once the reader is about to reach this chapter.
          near ? <PujoMap /> : <div className="skeleton mx-[clamp(16px,4vw,72px)] h-[76vh] min-h-[540px]" />
        ) : (
          // Phones get a still of the network; the interactive map opens as its own full-screen page.
          <Link to="/map" className="relative mx-4 block h-[420px] overflow-hidden border border-hair" aria-label="Open the full-screen Pujo map">
            <div className="pointer-events-none absolute inset-0">{near && <NetworkMap />}</div>
            <span className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            <span className="btn btn-primary absolute inset-x-4 bottom-4">
              Open full-screen map <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}

function FeedbackChapter() {
  const openFeedback = useAppStore((s) => s.openFeedbackModal);
  const queueCount = getQueuedFeedback().length;

  return (
    <section id="feedback-section" aria-labelledby="feedback-title" className="shell pt-24 md:pt-36">
      <div className="rounded-md border border-hair bg-gradient-to-br from-[#241014] via-surface to-[#160a0d] p-8 md:p-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-2">
              <MessageSquareHeart className="size-4 text-gold-bright" /> Continuous Improvement
            </p>
            <h3 id="feedback-title" className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl">
              Found a changed route, parking bay or new 2026 theme?
            </h3>
            <p className="mt-2 text-sm text-muted">
              Help us maintain 100% ground-accurate data for Kolkata & Howrah. Feedback is instantly saved to our local queue and synced to organizers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openFeedback()}
              className="btn btn-primary"
            >
              <MessageSquareHeart className="size-4" /> Share Feedback / Report Info
            </button>
            <button
              type="button"
              onClick={downloadFeedbackCsv}
              className="btn btn-ghost"
              title="Download local feedback entries"
            >
              <Download className="size-4" /> Export CSV ({queueCount})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageTitle();
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Puja Timings & Calendar */}
      <PujaCalendar />

      {/* 3. Mahalaya Morning Countdown & Audio Experience */}
      <MahalayaMorning />

      {/* 4. Travel Advisory */}
      <TravelAdvisory />

      {/* 5. Metro Line Discovery */}
      <MetroDiscovery />

      {/* 6. Pandal Explorer Preview */}
      <Explorer preview />

      {/* 8. Interactive Trishul Map */}
      <MapChapter />

      {/* 9. Official Kolkata Police Puja Guide Map */}
      <PoliceMapSection />

      {/* 10. 2026 Theme Gallery */}
      <section id="themes" aria-labelledby="themes-title" className="shell pt-24 md:pt-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Theme discovery"
            title={
              <span id="themes-title">
                2026 theme <em className="font-medium text-gold">gallery</em>
              </span>
            }
            lead="From three-hundred-year-old thakurdalans to walk-through installations — browse the season by what you want to see."
          />
          <Reveal delay={0.1}>
            <Link to="/themes" className="btn btn-ghost">
              All themes <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 md:mt-14">
          <ThemeGallery />
        </div>
      </section>

      {/* 11. My Puja List */}
      <MyPujaListSection />

      {/* 12. Community Feedback & Reporting */}
      <FeedbackChapter />
    </>
  );
}
