import { PANDALS } from './pandals';
import { METRO_LINES } from './metroLines';
import type { MetroLineId, Pandal } from './types';

export { PANDALS };

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
