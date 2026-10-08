import { useState } from 'react';
import { TrainFront, Car, Bike, AlertTriangle, Clock, Footprints, DollarSign, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/primitives';

interface DestinationOption {
  id: string;
  name: string;
  zone: string;
  metroAdvice: {
    durationMin: number;
    walkingMin: number;
    cost: string;
    trafficRisk: 'Zero' | 'Low' | 'Medium';
    verdict: 'Highly Recommended';
  };
  carAdvice: {
    durationMin: number;
    walkingMin: number;
    cost: string;
    trafficRisk: 'High' | 'Severe';
    verdict: 'Heavy Diversions';
  };
  bikeAdvice: {
    durationMin: number;
    walkingMin: number;
    cost: string;
    trafficRisk: 'Moderate' | 'High';
    verdict: 'Nimble but Choked Lanes';
  };
}

const DESTINATIONS: DestinationOption[] = [
  {
    id: 'howrah-cluster',
    name: 'Howrah Maidan & Shibpur Mandirtala',
    zone: 'Across the Hooghly (Green Line)',
    metroAdvice: {
      durationMin: 12,
      walkingMin: 6,
      cost: '₹10 - ₹15',
      trafficRisk: 'Zero',
      verdict: 'Highly Recommended',
    },
    carAdvice: {
      durationMin: 55,
      walkingMin: 18,
      cost: '₹120 + ₹40 Parking',
      trafficRisk: 'Severe',
      verdict: 'Heavy Diversions',
    },
    bikeAdvice: {
      durationMin: 28,
      walkingMin: 8,
      cost: '₹35 fuel + ₹10 Parking',
      trafficRisk: 'Moderate',
      verdict: 'Nimble but Choked Lanes',
    },
  },
  {
    id: 'north-heritage',
    name: 'Bagbazar, Kumartuli & Sovabazar',
    zone: 'North Kolkata Heritage (Blue Line)',
    metroAdvice: {
      durationMin: 15,
      walkingMin: 7,
      cost: '₹10 - ₹15',
      trafficRisk: 'Zero',
      verdict: 'Highly Recommended',
    },
    carAdvice: {
      durationMin: 65,
      walkingMin: 22,
      cost: '₹150 + ₹60 Parking',
      trafficRisk: 'Severe',
      verdict: 'Heavy Diversions',
    },
    bikeAdvice: {
      durationMin: 32,
      walkingMin: 9,
      cost: '₹40 fuel + ₹15 Parking',
      trafficRisk: 'Moderate',
      verdict: 'Nimble but Choked Lanes',
    },
  },
  {
    id: 'south-bigticket',
    name: 'Mudiali, Shib Mandir & Rashbehari',
    zone: 'South Kolkata (Blue Line - Kalighat)',
    metroAdvice: {
      durationMin: 18,
      walkingMin: 8,
      cost: '₹10 - ₹20',
      trafficRisk: 'Zero',
      verdict: 'Highly Recommended',
    },
    carAdvice: {
      durationMin: 75,
      walkingMin: 25,
      cost: '₹180 + ₹50 Parking',
      trafficRisk: 'Severe',
      verdict: 'Heavy Diversions',
    },
    bikeAdvice: {
      durationMin: 38,
      walkingMin: 10,
      cost: '₹45 fuel + ₹20 Parking',
      trafficRisk: 'Moderate',
      verdict: 'Nimble but Choked Lanes',
    },
  },
  {
    id: 'east-sreebhumi',
    name: 'Sreebhumi Sporting Club & Lake Town',
    zone: 'VIP Road Corridor (Ultadanga/Bidhan Nagar)',
    metroAdvice: {
      durationMin: 22,
      walkingMin: 14,
      cost: '₹15 - ₹20',
      trafficRisk: 'Low',
      verdict: 'Highly Recommended',
    },
    carAdvice: {
      durationMin: 90,
      walkingMin: 30,
      cost: '₹220 + ₹50 Parking',
      trafficRisk: 'Severe',
      verdict: 'Heavy Diversions',
    },
    bikeAdvice: {
      durationMin: 45,
      walkingMin: 12,
      cost: '₹55 fuel + ₹20 Parking',
      trafficRisk: 'High',
      verdict: 'Nimble but Choked Lanes',
    },
  },
];

export function TravelDecisionEngine() {
  const [selectedDestId, setSelectedDestId] = useState<string>('howrah-cluster');
  const dest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  return (
    <section id="travel-options" aria-labelledby="travel-options-title" className="shell pt-24 md:pt-36">
      <SectionHeading
        eyebrow="Travel decision engine"
        title={
          <span id="travel-options-title">
            How should I go? <em className="font-medium text-gold">Metro vs Car vs Bike</em>
          </span>
        }
        lead="Direct comparison for peak puja evenings. All timings and crowd delays are verified estimates based on Kolkata Police traffic notifications."
      />

      {/* Destination Selector Tabs */}
      <div className="no-scrollbar mt-10 -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {DESTINATIONS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelectedDestId(d.id)}
            className={`rounded-sm px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all sm:text-sm ${
              selectedDestId === d.id
                ? 'bg-gold-bright text-[#1a0c08] shadow-[0_0_15px_rgba(230,168,58,0.4)]'
                : 'border border-hair bg-surface/70 text-ink/80 hover:border-gold/50'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Comparative 3-Column Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Metro Option (Recommended) */}
        <div className="relative flex flex-col justify-between rounded-md border-2 border-gold/70 bg-gradient-to-b from-[#2a1217] to-[#180a0c] p-6 shadow-xl">
          <div className="absolute -top-3.5 right-6 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1a0c08]">
            Best Choice
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                <TrainFront className="size-6" />
              </span>
              <div>
                <h4 className="font-display text-xl font-bold text-ink">Kolkata Metro</h4>
                <span className="inline-block rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase text-gold-light">
                  Estimated
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3.5 text-sm">
              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <Clock className="size-4 text-gold" /> Travel Time
                </span>
                <span className="font-bold text-emerald-400 tabular-nums">~{dest.metroAdvice.durationMin} mins</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <Footprints className="size-4 text-gold" /> Walking to Pandal
                </span>
                <span className="font-bold text-ink tabular-nums">{dest.metroAdvice.walkingMin} mins</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <DollarSign className="size-4 text-gold" /> Approx Cost
                </span>
                <span className="font-bold text-ink">{dest.metroAdvice.cost}</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <ShieldCheck className="size-4 text-gold" /> Road Closure Risk
                </span>
                <span className="font-bold text-emerald-400">None (Bypasses Surface Traffic)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-sm bg-emerald-950/40 border border-emerald-800/60 p-3 text-xs text-emerald-300">
            ✓ Fixed frequency, AC comfort, completely immune to 5 PM - 4 AM road barricades.
          </div>
        </div>

        {/* Car Option */}
        <div className="flex flex-col justify-between rounded-md border border-hair bg-surface/70 p-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-red/20 text-red">
                <Car className="size-6" />
              </span>
              <div>
                <h4 className="font-display text-xl font-bold text-ink">Personal Car / Cab</h4>
                <span className="inline-block rounded bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase text-muted">
                  Estimated
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3.5 text-sm">
              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <Clock className="size-4 text-gold" /> Travel Time
                </span>
                <span className="font-bold text-red tabular-nums">~{dest.carAdvice.durationMin} mins</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <Footprints className="size-4 text-gold" /> Walking from Lot
                </span>
                <span className="font-bold text-ink tabular-nums">{dest.carAdvice.walkingMin} mins walk</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <DollarSign className="size-4 text-gold" /> Approx Cost
                </span>
                <span className="font-bold text-ink">{dest.carAdvice.cost}</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <AlertTriangle className="size-4 text-red" /> Road Closure Risk
                </span>
                <span className="font-bold text-red">{dest.carAdvice.trafficRisk} Diversions</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-sm bg-red/10 border border-red/30 p-3 text-xs text-red-200">
            ⚠️ Major roads become one-way or pedestrian-only after 4 PM. Parking is scarce and situated 500m-1km away.
          </div>
        </div>

        {/* Bike Option */}
        <div className="flex flex-col justify-between rounded-md border border-hair bg-surface/70 p-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-amber-500/20 text-amber-400">
                <Bike className="size-6" />
              </span>
              <div>
                <h4 className="font-display text-xl font-bold text-ink">Two-Wheeler / Bike</h4>
                <span className="inline-block rounded bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase text-muted">
                  Estimated
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3.5 text-sm">
              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <Clock className="size-4 text-gold" /> Travel Time
                </span>
                <span className="font-bold text-amber-400 tabular-nums">~{dest.bikeAdvice.durationMin} mins</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <Footprints className="size-4 text-gold" /> Walking from Stand
                </span>
                <span className="font-bold text-ink tabular-nums">{dest.bikeAdvice.walkingMin} mins walk</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <DollarSign className="size-4 text-gold" /> Approx Cost
                </span>
                <span className="font-bold text-ink">{dest.bikeAdvice.cost}</span>
              </div>

              <div className="flex items-center justify-between border-b border-hair-soft pb-2.5">
                <span className="flex items-center gap-2 text-muted">
                  <AlertTriangle className="size-4 text-amber-400" /> Lane Restrictions
                </span>
                <span className="font-bold text-amber-300">{dest.bikeAdvice.trafficRisk} Chokepoints</span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-sm bg-amber-950/30 border border-amber-800/40 p-3 text-xs text-amber-200">
            ℹ️ Easier parking in bylanes, but narrow arterial roads are barricaded for pedestrian queues.
          </div>
        </div>
      </div>
    </section>
  );
}
