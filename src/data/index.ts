import { PANDALS as BASE_PANDALS } from './pandals.ts';
import { HOWRAH_PANDALS } from './howrahPandals.ts';
import { COMMUNITY_PARAS } from './communityParas.ts';
import { getParkingForPandal } from './parking.ts';
import { LOCATION_FIXES, SOUTH_KOLKATA_ADDITIONS, alignToMetro } from './southKolkata.ts';
import { PIN_FIXES, PUJO_MAP_ADDITIONS } from './pujoMap.ts';
import { applyThemeUpdate } from './themeUpdates.ts';
import { METRO_LINES } from './metroLines.ts';
import type { MetroLineId, Pandal } from './types.ts';

export * from './types.ts';
export * from './parking.ts';
export * from './howrahPandals.ts';
export * from './communityParas.ts';

/** Moves a pandal to its checked position; re-ties parking if that changes its station. */
function relocate(p: Pandal): Pandal {
  const fix = LOCATION_FIXES[p.id] ?? PIN_FIXES[p.id];
  if (!fix) return p;
  const moved = alignToMetro(p, ...fix);
  if (moved.stationId === p.stationId) return moved;
  const parking = getParkingForPandal(moved.id, moved.stationId);
  return { ...moved, parking: parking.length > 0 ? parking : undefined };
}

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
  ...COMMUNITY_PARAS,
  ...[...SOUTH_KOLKATA_ADDITIONS, ...PUJO_MAP_ADDITIONS].map((p) => {
    const parking = getParkingForPandal(p.id, p.stationId);
    return { ...p, parking: parking.length > 0 ? parking : undefined };
  }),
]
  .map(relocate)
  .map(applyThemeUpdate);

export const PANDAL_BY_ID = new Map<string, Pandal>(PANDALS.map((p) => [p.id, p]));

export const PANDALS_BY_STATION = new Map<string, Pandal[]>();
for (const p of PANDALS) {
  const list = PANDALS_BY_STATION.get(p.stationId);
  if (list) list.push(p);
  else PANDALS_BY_STATION.set(p.stationId, [p]);
}
// Most popular first; the closer one wins a tie.
for (const list of PANDALS_BY_STATION.values()) list.sort((a, b) => b.popularity - a.popularity || a.distanceKm - b.distanceKm);

/** A station's pandals, most popular first. */
export const stationPandals = (stationId: string) => PANDALS_BY_STATION.get(stationId) ?? [];

/** The pandal with the shortest walk from a station. */
export const nearestPandal = (stationId: string): Pandal | undefined =>
  stationPandals(stationId).reduce<Pandal | undefined>((best, p) => (!best || p.distanceKm < best.distanceKm ? p : best), undefined);

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
export const COMMUNITY_PARAS_COUNT = COMMUNITY_PARAS.length;

