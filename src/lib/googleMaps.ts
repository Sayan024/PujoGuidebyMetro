import type { Pandal } from '@/data/types';

type Locatable = Pick<Pandal, 'mapUrl' | 'latitude' | 'longitude'>;

const MAPS_ORIGIN = 'https://www.google.com/maps';

/**
 * Where Google Maps should take someone for this pandal. Each pandal carries a
 * curated directions link; its destination (exact coordinates or a precise place
 * name) is reused, and the map coordinates are only a fallback.
 */
export function destinationOf(p: Locatable): string {
  try {
    const d = new URL(p.mapUrl).searchParams.get('destination');
    if (d) return d;
  } catch {
    /* not a valid link: fall through to coordinates */
  }
  return `${p.latitude},${p.longitude}`;
}

/** Turn-by-turn walking directions to one pandal, opened in Google Maps (app or web). */
export function pandalDirectionsUrl(p: Locatable): string {
  if (p.mapUrl?.startsWith(`${MAPS_ORIGIN}/`)) return p.mapUrl;
  return `${MAPS_ORIGIN}/dir/?${new URLSearchParams({ api: '1', destination: destinationOf(p), travelmode: 'walking' })}`;
}

/** Google Maps links carry at most one destination plus nine stops on the way. */
export const MAX_ROUTE_STOPS = 10;

export type RouteMode = 'walking' | 'driving';

/**
 * One Google Maps route through several pandals, in the given order, starting
 * from wherever the person is. Google Maps cannot mix public transport with
 * intermediate stops, so this is a walking or driving route.
 */
export function routeUrl(stops: Locatable[], mode: RouteMode): { url: string; included: number; dropped: number } {
  const picked = stops.slice(0, MAX_ROUTE_STOPS).map(destinationOf);
  const params = new URLSearchParams({ api: '1', destination: picked[picked.length - 1] ?? '', travelmode: mode });
  if (picked.length > 1) params.set('waypoints', picked.slice(0, -1).join('|'));
  return { url: `${MAPS_ORIGIN}/dir/?${params}`, included: picked.length, dropped: Math.max(0, stops.length - picked.length) };
}
