import { describe, expect, it } from 'vitest';
import { PANDAL_BY_ID } from '@/data';
import { STATIONS } from '@/data/metroLines';
import { MAX_ROUTE_STOPS, destinationOf, pandalDirectionsUrl, routeUrl } from '@/lib/googleMaps';
import { HOP_ROUTES, buildHopRoute } from '@/lib/hopRoutes';
import { buildDayPlan } from '@/lib/route';
import { formatKm, haversineKm } from '@/lib/utils';

const pandal = (id: string) => PANDAL_BY_ID.get(id)!;

describe('google maps links', () => {
  it('keeps the curated destination and falls back to coordinates', () => {
    expect(destinationOf({ mapUrl: 'https://www.google.com/maps/dir/?api=1&destination=22.5,88.3', latitude: 1, longitude: 2 })).toBe('22.5,88.3');
    expect(destinationOf({ mapUrl: 'not a url', latitude: 22.5, longitude: 88.3 })).toBe('22.5,88.3');
    expect(pandalDirectionsUrl(pandal('badamtala-ashar-sangha'))).toMatch(/^https:\/\/www\.google\.com\/maps\//);
  });

  it('builds one route through several stops, capped at the Google Maps limit', () => {
    const stops = Array.from({ length: 14 }, (_, i) => ({ mapUrl: '', latitude: 22.5 + i / 1000, longitude: 88.3 }));
    const r = routeUrl(stops, 'walking');
    const u = new URL(r.url);
    expect(r.included).toBe(MAX_ROUTE_STOPS);
    expect(r.dropped).toBe(4);
    expect(u.searchParams.get('travelmode')).toBe('walking');
    expect(u.searchParams.get('waypoints')!.split('|')).toHaveLength(MAX_ROUTE_STOPS - 1);
    expect(routeUrl(stops.slice(0, 1), 'driving').url).not.toContain('waypoints');
    expect(routeUrl([], 'walking').included).toBe(0);
  });
});

describe('hopping routes', () => {
  for (const def of HOP_ROUTES) {
    it(`${def.id} is a sensible walk from ${def.startStationId}`, () => {
      const route = buildHopRoute(def);
      const start = STATIONS[def.startStationId];
      expect(route.stopsList.length).toBeGreaterThanOrEqual(5);
      expect(route.stopsList.length).toBeLessThanOrEqual(def.stops);
      const names = route.stopsList.map((s) => s.pandal.name.toLowerCase());
      expect(new Set(names).size, 'a pandal appears twice').toBe(names.length);
      for (const s of route.stopsList) {
        expect(def.accepts(s.pandal), s.pandal.id).toBe(true);
        expect(s.pandal.popularity).toBeGreaterThanOrEqual(def.minPopularity);
        expect(haversineKm(start, { lat: s.pandal.latitude, lng: s.pandal.longitude })).toBeLessThanOrEqual(def.radiusKm);
        expect(s.legKm).toBeGreaterThan(0);
      }
      // Always going to the nearest unvisited pandal keeps any single leg from being absurd.
      expect(Math.max(...route.stopsList.map((s) => s.legKm))).toBeLessThan(4);
      expect(route.totalMinutes).toBeGreaterThan(route.walkMinutes);
    });
  }
});

describe('day planner', () => {
  it('orders stations, rides and walks for a few saved pandals', () => {
    const plan = buildDayPlan(['badamtala-ashar-sangha', 'kashi-bose-lane', 'college-square'].map(pandal), 10 * 60);
    expect(plan.steps.length).toBeGreaterThan(3);
    expect(plan.endsAt).toBeGreaterThan(10 * 60);
    expect(plan.totalMinutes).toBe(plan.endsAt - 10 * 60);
    expect(plan.steps.filter((s) => s.kind === 'visit')).toHaveLength(3);
  });

  it('handles an empty list', () => {
    expect(() => buildDayPlan([], 10 * 60)).not.toThrow();
  });
});

describe('formatting', () => {
  it('formats distances', () => {
    expect(formatKm(0.25)).toBe('250 m');
    expect(formatKm(1)).toBe('1.0 km');
    expect(formatKm(12.34)).toBe('12.3 km');
  });
});
