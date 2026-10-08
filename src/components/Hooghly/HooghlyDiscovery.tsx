import { ArrowRight, Compass, TrainFront, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/primitives';
import { useAppStore } from '@/store/appStore';

interface LocalityCard {
  name: string;
  tagline: string;
  metroConnection: string;
  pandalNames: string[];
  filterKeyword: string;
  icon: string;
}

const LOCALITIES: LocalityCard[] = [
  {
    name: 'Howrah Maidan & Central',
    tagline: 'Heart of the Green Line underwater metro terminal',
    metroConnection: 'Howrah Maidan Metro (Green Line)',
    pandalNames: ['Howrah Nabagopal Sporting', 'Ramkrishnapur Byayam Samity', 'Kadamtala Sarbojanin'],
    filterKeyword: 'Howrah',
    icon: '🚇',
  },
  {
    name: 'Shibpur & Mandirtala',
    tagline: 'Grand installations along the Vidyasagar Setu approach',
    metroConnection: 'Howrah Maidan / Rabindra Sadan connection',
    pandalNames: ['Shibpur Mandirtala Sarbojanin', 'Baje Shibpur Sammilani', 'Olabibitala Sarbojanin'],
    filterKeyword: 'Shibpur',
    icon: '🏛',
  },
  {
    name: 'Belur Math & Sacred Riverfront',
    tagline: 'World-renowned Kumari Puja founded by Swami Vivekananda (1901)',
    metroConnection: 'Dakshineswar Metro (Blue Line + Ferry) or Belur local',
    pandalNames: ['Belur Math Kumari Puja', 'Belur Bazar Sarbojanin'],
    filterKeyword: 'Belur',
    icon: '🛕',
  },
  {
    name: 'Liluah & Agrani Corridor',
    tagline: 'Eco-friendly terracotta and bamboo wonder structures',
    metroConnection: 'Howrah Maidan Metro + 10 min transit',
    pandalNames: ['Liluah Agrani Sangha', 'Liluah Goswamipara Sarbojanin'],
    filterKeyword: 'Liluah',
    icon: '🌿',
  },
  {
    name: 'Santragachi Lakeside',
    tagline: 'Jheel reflections & Chandannagar illuminations',
    metroConnection: 'Howrah Maidan Metro + Kona Expressway shuttle',
    pandalNames: ['Santragachi Sporting Club'],
    filterKeyword: 'Santragachi',
    icon: '🌊',
  },
  {
    name: 'Bally Khal & Riverbend',
    tagline: 'Centenary sabeki ekchala daker saaj heritage',
    metroConnection: 'Dakshineswar Metro (via Bally Bridge)',
    pandalNames: ['Bally Sarbojanin Durgotsav'],
    filterKeyword: 'Bally',
    icon: '🔔',
  },
];

export function HooghlyDiscovery() {
  const navigate = useNavigate();
  const setQuery = useAppStore((s) => s.setQuery);
  const toggleFilter = useAppStore((s) => s.toggleFilter);
  const filters = useAppStore((s) => s.filters);

  const handleSelectLocality = (keyword: string) => {
    setQuery(keyword);
    if (!filters.includes('howrahLiluah')) {
      toggleFilter('howrahLiluah');
    }
    navigate('/explore');
  };

  return (
    <section id="hooghly" aria-labelledby="hooghly-title" className="shell pt-24 md:pt-36">
      <SectionHeading
        eyebrow="Across the river"
        title={
          <span id="hooghly-title">
            Puja Across the <em className="font-medium text-gold">Hooghly</em>
          </span>
        }
        lead="Travel through India’s first underwater Metro tunnel to explore authentic pandals in Howrah, Shibpur, Liluah, Belur, Santragachi, and Bally."
      />

      {/* Underwater Metro Milestone Banner */}
      <div className="mt-8 rounded-md border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-surface to-[#1e0e12] p-6 text-sm sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Waves className="size-6" />
          </span>
          <div>
            <h4 className="font-display text-lg font-bold text-ink">
              Green Line Underwater Metro Experience
            </h4>
            <p className="mt-0.5 text-xs text-muted">
              Ride 520 metres beneath the Hooghly riverbed in just 45 seconds between Mahakaran and Howrah Station.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            useAppStore.getState().setLine('green');
            navigate('/explore');
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:mt-0 shrink-0"
        >
          View Green Line Pujas <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* Locality Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LOCALITIES.map((loc) => (
          <div
            key={loc.name}
            className="group flex flex-col justify-between rounded-md border border-hair bg-surface/70 p-6 transition-all hover:border-gold/60 hover:shadow-[0_4px_25px_rgba(230,168,58,0.12)]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden="true">{loc.icon}</span>
                <span className="rounded bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-light">
                  {loc.filterKeyword}
                </span>
              </div>

              <h4 className="font-display mt-3 text-xl font-bold text-ink group-hover:text-gold-bright transition-colors">
                {loc.name}
              </h4>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                {loc.tagline}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <TrainFront className="size-3.5 shrink-0" />
                <span className="truncate">{loc.metroConnection}</span>
              </div>

              {/* Notable Pandals */}
              <div className="mt-4 border-t border-hair-soft pt-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted block">
                  Prominent Celebrations
                </span>
                <ul className="mt-1.5 space-y-1 text-xs text-ink/80">
                  {loc.pandalNames.map((pn) => (
                    <li key={pn} className="truncate flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-gold shrink-0" />
                      {pn}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSelectLocality(loc.filterKeyword)}
              className="btn btn-sm btn-ghost mt-6 w-full justify-between group-hover:border-gold/50"
            >
              <span>Explore {loc.filterKeyword}</span>
              <Compass className="size-3.5 text-gold" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
