import { PANDALS } from '@/data';
import { STATIONS } from '@/data/metroLines';
import type { Pandal } from '@/data/types';
import { haversineKm } from './utils';

export interface HopRouteDef {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  startStationId: string;
  /** Pandals must be within this many km (straight line) of the start station. */
  radiusKm: number;
  stops: number;
  /** Only stops with at least this popularity score. */
  minPopularity: number;
  accepts: (p: Pandal) => boolean;
  note?: string;
}

const NORTH = ['shyambazar', 'shobhabazar-sutanuti', 'girish-park', 'mahatma-gandhi-road', 'central'];
const SOUTH = ['netaji-bhavan', 'jatin-das-park', 'kalighat', 'rabindra-sarovar'];
/** Salt Lake's numbered blocks plus the Lake Town pujas beside them; not Baguiati or New Town. */
const SALT_LAKE_AREA = /salt lake|lake ?town|sreebhumi|golaghata|bangur/i;
const BEHALA = ['taratala', 'behala-bazar', 'behala-chowrasta', 'sakher-bazar', 'thakurpukur', 'majerhat'];
const bonedi = (p: Pandal) => p.category === 'Traditional Bonedi Bari';

export const HOP_ROUTES: HopRouteDef[] = [
  {
    id: 'north-kolkata',
    title: 'North Kolkata classics',
    kicker: 'From Shobhabazar Sutanuti',
    blurb: 'The old city: Kumartuli-side clubs, century-old barowaris and the big theme pandals between Shyambazar and Central.',
    startStationId: 'shobhabazar-sutanuti',
    radiusKm: 3.2,
    stops: 12,
    minPopularity: 85,
    accepts: (p) => NORTH.includes(p.stationId) && !bonedi(p),
  },
  {
    id: 'south-kolkata',
    title: 'South Kolkata theme pandals',
    kicker: 'From Kalighat',
    blurb: 'Big-budget theme pandals across Rashbehari, Gariahat and Dhakuria. Expect long queues in the evening.',
    startStationId: 'kalighat',
    radiusKm: 5,
    stops: 12,
    minPopularity: 85,
    accepts: (p) => SOUTH.includes(p.stationId) && !bonedi(p),
    note: 'The last stops are far apart; an auto between them saves your legs.',
  },
  {
    id: 'salt-lake-lake-town',
    title: 'Salt Lake and Lake Town',
    kicker: 'From City Centre',
    blurb: 'Block-by-block pujas in Salt Lake, with Lake Town and Sreebhumi on the way to the canal side.',
    startStationId: 'city-centre',
    radiusKm: 4,
    stops: 8,
    minPopularity: 70,
    accepts: (p) => SALT_LAKE_AREA.test(`${p.name} ${p.locality ?? ''} ${p.id}`),
  },
  {
    id: 'behala',
    title: 'Behala and Barisha',
    kicker: 'From Taratala',
    blurb: 'The Diamond Harbour Road pujas on the Purple Line, from Taratala down to Sakher Bazar.',
    startStationId: 'taratala',
    radiusKm: 6,
    stops: 6,
    minPopularity: 82,
    accepts: (p) => BEHALA.includes(p.stationId) && !bonedi(p),
  },
  {
    id: 'bonedi-bari-trail',
    title: 'Bonedi bari trail',
    kicker: 'From Shobhabazar Sutanuti',
    blurb: 'Old family pujas of north Kolkata, some more than two centuries old. Visiting hours are limited; dress modestly.',
    startStationId: 'shobhabazar-sutanuti',
    radiusKm: 3.5,
    stops: 6,
    minPopularity: 0,
    accepts: (p) => bonedi(p) && NORTH.includes(p.stationId),
    note: 'Family pujas keep ritual hours. Check timings at the gate and keep the lanes clear.',
  },
];

export interface HopStop {
  pandal: Pandal;
  /** Walking distance from the previous stop (or the start station), in km. */
  legKm: number;
  legMinutes: number;
}

export interface HopRoute extends Omit<HopRouteDef, 'accepts'> {
  startName: string;
  stopsList: HopStop[];
  totalKm: number;
  walkMinutes: number;
  /** Walking plus about 25 minutes at each pandal. */
  totalMinutes: number;
}

/** A straight line understates the walk through lanes, so legs are lengthened by a quarter. */
const walkKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => haversineKm(a, b) * 1.25;
const at = (p: Pandal) => ({ lat: p.latitude, lng: p.longitude });
const key = (p: Pandal) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '');

export function buildHopRoute(def: HopRouteDef): HopRoute {
  const start = STATIONS[def.startStationId];
  const seen = new Set<string>();
  const picked = PANDALS.filter((p) => def.accepts(p) && p.popularity >= def.minPopularity && haversineKm(start, at(p)) <= def.radiusKm)
    // Most popular first; the one nearer the start wins a tie.
    .sort((a, b) => b.popularity - a.popularity || haversineKm(start, at(a)) - haversineKm(start, at(b)))
    .filter((p) => !seen.has(key(p)) && seen.add(key(p)))
    .slice(0, def.stops);

  // Walk order: always go to the nearest pandal not yet visited.
  const left = [...picked];
  const ordered: HopStop[] = [];
  let here: { lat: number; lng: number } = start;
  while (left.length) {
    let best = 0;
    for (let i = 1; i < left.length; i++) if (walkKm(here, at(left[i])) < walkKm(here, at(left[best]))) best = i;
    const [p] = left.splice(best, 1);
    const legKm = walkKm(here, at(p));
    ordered.push({ pandal: p, legKm, legMinutes: Math.max(1, Math.round(legKm * 11)) });
    here = at(p);
  }
  const totalKm = ordered.reduce((n, s) => n + s.legKm, 0);
  const walkMinutes = ordered.reduce((n, s) => n + s.legMinutes, 0);
  const { accepts: _accepts, ...rest } = def;
  void _accepts;
  return { ...rest, startName: start.name, stopsList: ordered, totalKm, walkMinutes, totalMinutes: walkMinutes + ordered.length * 25 };
}

export const buildHopRoutes = (): HopRoute[] => HOP_ROUTES.map(buildHopRoute);
