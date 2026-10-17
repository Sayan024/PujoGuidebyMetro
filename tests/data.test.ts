import { describe, expect, it } from 'vitest';
import { PANDALS, PANDAL_BY_ID, PANDALS_BY_STATION, TOTAL_PANDALS, nearestPandal, stationPandals } from '@/data';
import { AUDIT_ALIASES, AUDIT_POSITIONS, AUDIT_STATIONS } from '@/data/auditFixes';
import { BUS_AREAS, busAreasOf } from '@/data/busGuide';
import { INSTAGRAM, REELS, instagramOf } from '@/data/instagram';
import { LINE_BY_ID, METRO_LINES, STATIONS } from '@/data/metroLines';
import { LINE_SERVICES, orangeLineSuspended } from '@/data/metroServices';
import { PIN_FIXES } from '@/data/pujoMap';
import { SHARAD_SHAMMAN_2026 } from '@/data/sharadShamman';
import { LOCATION_FIXES } from '@/data/southKolkata';
import { THEME_UPDATES } from '@/data/themeUpdates';

const CATEGORIES = new Set([
  'Heritage Kolkata', 'Mythology', 'Technology', 'Climate & Environment', 'Social Awareness',
  'Art & Innovation', 'Traditional Bonedi Bari', 'Contemporary Installation',
]);

describe('pandals', () => {
  it('has a plausible number of pandals and unique ids', () => {
    expect(TOTAL_PANDALS).toBeGreaterThan(350);
    const ids = PANDALS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(PANDALS.map((p) => [p.id, p] as const))('%s is well formed', (_id, p) => {
    expect(p.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(p.name.trim().length).toBeGreaterThan(2);
    // Kolkata, Howrah and the northern suburbs the guide covers.
    expect(p.latitude).toBeGreaterThan(22.4);
    expect(p.latitude).toBeLessThan(22.7);
    expect(p.longitude).toBeGreaterThan(88.2);
    expect(p.longitude).toBeLessThan(88.5);
    expect(STATIONS[p.stationId], `unknown station ${p.stationId}`).toBeDefined();
    expect(STATIONS[p.stationId].name).toBe(p.station);
    expect(p.distanceKm).toBeGreaterThan(0);
    expect(p.walkingMinutes).toBeGreaterThan(0);
    expect(p.popularity).toBeGreaterThanOrEqual(0);
    expect(p.popularity).toBeLessThanOrEqual(100);
    expect(CATEGORIES.has(p.category), `bad category ${p.category}`).toBe(true);
    expect(p.mapUrl).toMatch(/^https:\/\/www\.google\.com\/maps\//);
    expect(typeof p.theme).toBe('string');
    // A theme flagged as 2026 must actually have one.
    if (p.theme2026) expect(p.theme.trim().length).toBeGreaterThan(0);
  });

  it('sits on the line of its station', () => {
    for (const p of PANDALS) expect(STATIONS[p.stationId].lines, p.id).toContain(p.line);
  });

  it('is indexed under every station and lists the most popular first', () => {
    expect([...PANDALS_BY_STATION.values()].flat().length).toBe(TOTAL_PANDALS);
    for (const list of PANDALS_BY_STATION.values()) {
      for (let i = 1; i < list.length; i++) expect(list[i - 1].popularity).toBeGreaterThanOrEqual(list[i].popularity);
    }
    const station = [...PANDALS_BY_STATION.keys()].find((s) => stationPandals(s).length > 3)!;
    const nearest = nearestPandal(station)!;
    expect(stationPandals(station).every((p) => p.distanceKm >= nearest.distanceKm)).toBe(true);
  });
});

describe('corrections and references point at real pandals', () => {
  const exists = (id: string) => PANDAL_BY_ID.has(id);

  it('audit position and station fixes', () => {
    for (const id of Object.keys(AUDIT_POSITIONS)) expect(exists(id), id).toBe(true);
    for (const [id, station] of Object.entries(AUDIT_STATIONS)) {
      expect(exists(id), id).toBe(true);
      expect(STATIONS[station], `station ${station}`).toBeDefined();
      expect(PANDAL_BY_ID.get(id)!.stationId).toBe(station);
    }
    for (const id of [...Object.keys(LOCATION_FIXES), ...Object.keys(PIN_FIXES)]) expect(exists(id), id).toBe(true);
  });

  it('merged duplicates keep working and resolve to a surviving page', () => {
    for (const [from, to] of Object.entries(AUDIT_ALIASES)) {
      expect(PANDALS.some((p) => p.id === from), `${from} should be gone`).toBe(false);
      expect(PANDAL_BY_ID.get(from), `${from} should open ${to}`).toBe(PANDAL_BY_ID.get(to));
    }
  });

  it('theme updates', () => {
    for (const id of Object.keys(THEME_UPDATES)) expect(exists(id), id).toBe(true);
  });

  it('bus guide covers real pandals and gives usable routes', () => {
    for (const area of BUS_AREAS) {
      expect(area.origins.length, area.id).toBeGreaterThan(0);
      for (const id of area.pandalIds) expect(exists(id), `${area.id}: ${id}`).toBe(true);
      for (const o of area.origins) expect(o.buses.length, `${area.id} from ${o.from}`).toBeGreaterThan(0);
    }
    expect(busAreasOf('suruchi-sangha').length).toBe(2);
    expect(busAreasOf('no-such-pandal')).toEqual([]);
  });

  it('Instagram reels and handles', () => {
    for (const [id, list] of Object.entries(REELS)) {
      expect(exists(id), id).toBe(true);
      for (const r of list) {
        expect(r.url, id).toMatch(/^https:\/\/www\.instagram\.com\/reel\/[\w-]+\/$/);
        expect(r.by).toMatch(/^[a-z0-9._]{1,30}$/i);
        expect(r.title.length).toBeGreaterThan(5);
      }
    }
    // (Santosh Mitra Square is deliberately listed under two ids that share their reels, so check each pandal alone.)
    for (const [id, list] of Object.entries(REELS)) {
      const urls = list.map((r) => r.url);
      expect(new Set(urls).size, `${id} lists a reel twice`).toBe(urls.length);
    }
    for (const id of Object.keys(INSTAGRAM)) {
      expect(exists(id), id).toBe(true);
      expect(instagramOf(id), id).toBeTruthy();
    }
  });

  it('Sharad Shamman shortlist', () => {
    expect(SHARAD_SHAMMAN_2026).toHaveLength(12);
    for (const s of SHARAD_SHAMMAN_2026) if (s.pandalId) expect(exists(s.pandalId), s.pandalId).toBe(true);
  });
});

describe('Metro', () => {
  it('every line has stations that exist, and a service entry for each phase', () => {
    for (const line of METRO_LINES) {
      for (const s of line.stations) expect(STATIONS[s], `${line.id}: ${s}`).toBeDefined();
      const svc = LINE_SERVICES[line.id];
      expect(svc, line.id).toBeDefined();
      for (const phase of ['sashthi', 'saptami-navami', 'dashami'] as const) expect(svc.phases[phase].detail.length).toBeGreaterThan(5);
    }
    expect(LINE_BY_ID.orange.id).toBe('orange');
  });

  it('only the Blue and Green lines run overnight; Orange stops after 16 October', () => {
    expect(LINE_SERVICES.blue.phases['saptami-navami'].hours).toMatch(/4:00 AM/);
    expect(LINE_SERVICES.green.phases['saptami-navami'].hours).toMatch(/3:59 AM/);
    expect(LINE_SERVICES.orange.phases['saptami-navami'].hours).toBeNull();
    expect(LINE_SERVICES.orange.phases.dashami.hours).toBeNull();
    expect(LINE_SERVICES.orange.phases.sashthi.hours).not.toBeNull();
  });

  it('the Orange Line notice shows until the end of Dashami, India time', () => {
    expect(orangeLineSuspended(new Date('2026-10-17T05:00:00Z'))).toBe(true);
    expect(orangeLineSuspended(new Date('2026-10-21T17:00:00Z'))).toBe(true); // 22:30 on the 21st in Kolkata
    expect(orangeLineSuspended(new Date('2026-10-21T19:00:00Z'))).toBe(false); // already the 22nd in Kolkata
  });
});
