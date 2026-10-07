import { ArrowRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Explorer } from '@/components/Explorer/Explorer';
import { MyPujaListSection } from '@/components/Favorites/MyPujaList';
import { Hero } from '@/components/Hero/Hero';
import NetworkMap from '@/components/MetroMap/NetworkMap';
import { PujoMap } from '@/components/MetroMap/PujoMap';
import { MetroDiscovery } from '@/components/MetroSelector/MetroDiscovery';
import { PujaCalendar } from '@/components/PujaCalendar/PujaCalendar';
import { ThemeGallery } from '@/components/ThemeGallery/ThemeGallery';
import { TravelAdvisory } from '@/components/TravelAdvisory/TravelAdvisory';
import { Reveal, SectionHeading } from '@/components/ui/primitives';
import { TOTAL_PANDALS } from '@/data';
import { useIsDesktop, useNearViewport, usePageTitle } from '@/hooks/useMedia';

function MapChapter() {
  const desktop = useIsDesktop();
  const [ref, near] = useNearViewport<HTMLDivElement>('600px');

  return (
    <section id="map" aria-labelledby="map-title" className="pt-24 md:pt-36">
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Interactive map"
          title={
            <span id="map-title">
              Pujo <em className="font-medium text-gold">map</em>
            </span>
          }
          lead={`All ${TOTAL_PANDALS} pandals against the Metro network. Tap a station for its one-kilometre walking radius.`}
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

export default function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <PujaCalendar />
      <TravelAdvisory />
      <MetroDiscovery />
      <Explorer preview />
      <MapChapter />

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

      <MyPujaListSection />
    </>
  );
}
