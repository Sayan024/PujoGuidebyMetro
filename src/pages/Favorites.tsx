import { AnimatePresence } from 'motion/react';
import { ArrowRight, HeartOff, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItineraryStats, SavedRow, useItinerary } from '@/components/Favorites/MyPujaList';
import { RoutePlanner } from '@/components/RoutePlanner/RoutePlanner';
import { EmptyState, SectionHeading } from '@/components/ui/primitives';
import { usePageTitle } from '@/hooks/useMedia';

export default function FavoritesPage() {
  usePageTitle('My Puja List');
  const { pandals, included, count, clear } = useItinerary();
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="shell pt-28 md:pt-36">
      <SectionHeading
        as="h1"
        eyebrow="Your itinerary"
        title={
          <>
            My Puja <em className="font-medium text-gold">list</em>
          </>
        }
        lead="Your saved pandals, kept on this device, and the Metro route that strings them together."
      />

      {count === 0 ? (
        <EmptyState
          className="mt-12"
          icon={<HeartOff className="size-6" />}
          title="Nothing saved yet"
          action={
            <>
              <Link to="/explore" className="btn btn-primary">
                Browse pandals <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/themes" className="btn btn-ghost">
                Browse by theme
              </Link>
            </>
          }
        >
          Tap the heart on any pandal to add it here. Once you have a few, the planner will order the stations and work
          out your Metro rides and walks.
        </EmptyState>
      ) : (
        <>
          <ItineraryStats className="mt-10 md:mt-14" />

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-10">
            <section aria-labelledby="saved-title">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 id="saved-title" className="font-display text-3xl font-semibold">
                    Saved pandals
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {included.length} of {count} included in the day plan. Untick any you want to leave for another day.
                  </p>
                </div>
                {confirming ? (
                  <span className="flex shrink-0 items-center gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        clear();
                        setConfirming(false);
                      }}
                    >
                      Clear {count}
                    </button>
                    <button className="btn btn-sm btn-ghost" onClick={() => setConfirming(false)}>
                      Keep
                    </button>
                  </span>
                ) : (
                  <button className="btn btn-sm btn-ghost shrink-0" onClick={() => setConfirming(true)}>
                    <Trash2 className="size-3.5" aria-hidden="true" /> Clear list
                  </button>
                )}
              </div>
              <ul className="mt-6 grid gap-2.5">
                <AnimatePresence initial={false}>
                  {pandals.map((p) => (
                    <SavedRow key={p.id} pandal={p} selectable />
                  ))}
                </AnimatePresence>
              </ul>
            </section>

            <RoutePlanner pandals={included} />
          </div>
        </>
      )}
    </div>
  );
}
