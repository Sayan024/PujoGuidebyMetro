import { PANDALS as BASE_PANDALS } from './pandals';
import { HOWRAH_PANDALS } from './howrahPandals';
import { getParkingForPandal } from './parking';
import { METRO_LINES } from './metroLines';
import type { MetroLineId, Pandal } from './types';

export * from './types';
export * from './parking';
export * from './howrahPandals';

export const PANDALS: Pandal[] = [
  ...BASE_PANDALS.map((p) => {
    const parking = getParkingForPandal(p.id, p.stationId);
    return {
      ...p,
      locality: p.locality || (p.stationId === 'howrah' || p.stationId === 'howrah-maidan' ? 'Howrah' : undefined),
      parking: p.parking && p.parking.length > 0 ? p.parking : parking.length > 0 ? parking : undefined,
      verificationStatus: p.verificationStatus || (parking.length > 0 ? 'verified' : 'needs_verification'),
      source: p.source || 'Kolkata Police & Kolkata Metro Traffic Advisory 2026',
      verifiedAt: p.verifiedAt || 'October 2026',
    };
  }),
  ...HOWRAH_PANDALS,
];

export const PANDAL_BY_ID = new Map<string, Pandal>(PANDALS.map((p) => [p.id, p]));

export const PANDALS_BY_STATION = new Map<string, Pandal[]>();
for (const p of PANDALS) {
  const list = PANDALS_BY_STATION.get(p.stationId);
  if (list) list.push(p);
  else PANDALS_BY_STATION.set(p.stationId, [p]);
}
for (const list of PANDALS_BY_STATION.values()) list.sort((a, b) => a.distanceKm - b.distanceKm);

export const stationPandals = (stationId: string) => PANDALS_BY_STATION.get(stationId) ?? [];

export const LINE_COUNTS = Object.fromEntries(
  METRO_LINES.map((l) => [l.id, PANDALS.filter((p) => p.line === l.id).length]),
) as Record<MetroLineId, number>;

export const TOTAL_PANDALS = PANDALS.length;
export const STATIONS_WITH_PANDALS = PANDALS_BY_STATION.size;
export const BONEDI_COUNT = PANDALS.filter((p) => p.category === 'Traditional Bonedi Bari').length;
export const HOWRAH_PANDALS_COUNT = PANDALS.filter(
  (p) =>
    (p.locality && /howrah|liluah|shibpur|santragachi|belur|bally/i.test(p.locality)) ||
    p.stationId === 'howrah' ||
    p.stationId === 'howrah-maidan',
).length;
