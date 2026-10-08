import type { Feature, FeatureCollection, LineString, Point, Polygon } from 'geojson';
import { PANDALS } from '@/data';
import { PARKING_SPOTS } from '@/data/parking';
import { METRO_LINES, STATION_LIST, STATIONS } from '@/data/metroLines';

/** Area covered by the Metro network, with a small margin. */
export const BOUNDS = { minLat: 22.438, maxLat: 22.668, minLng: 88.283, maxLng: 88.457 };
export const KOLKATA_CENTER: [number, number] = [88.368, 22.553];

export const SVG_W = 720;
export const SVG_H = 1000;
/** SVG units per kilometre on the schematic map. */
export const UNITS_PER_KM = SVG_H / ((BOUNDS.maxLat - BOUNDS.minLat) * 111);

/** Equirectangular projection into the schematic SVG's coordinate space. */
export function project(lat: number, lng: number): [number, number] {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * SVG_W;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * SVG_H;
  return [x, y];
}

/** A ring of points `km` from a centre, as a GeoJSON polygon (the walking radius). */
export function circlePolygon(lat: number, lng: number, km: number, steps = 72): Feature<Polygon> {
  const ring: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    ring.push([lng + (km * Math.sin(a)) / (111 * Math.cos((lat * Math.PI) / 180)), lat + (km * Math.cos(a)) / 111]);
  }
  return { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } };
}

export const linesGeoJSON: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: METRO_LINES.map((l) => ({
    type: 'Feature',
    properties: { id: l.id, color: l.color, name: l.name },
    geometry: { type: 'LineString', coordinates: l.stations.map((s) => [STATIONS[s].lng, STATIONS[s].lat]) },
  })),
};

export const stationsGeoJSON: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: STATION_LIST.map((s) => ({
    type: 'Feature',
    properties: { id: s.id, name: s.name, line: s.lines[0], color: METRO_LINES.find((l) => l.id === s.lines[0])!.color },
    geometry: { type: 'Point', coordinates: [s.lng, s.lat] },
  })),
};

export const pandalsGeoJSON: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: PANDALS.map((p) => ({
    type: 'Feature',
    properties: {
      id: p.id,
      name: p.name,
      line: p.line,
      station: p.stationId,
      popularity: p.popularity,
      color: METRO_LINES.find((l) => l.id === p.line)!.color,
    },
    geometry: { type: 'Point', coordinates: [p.longitude, p.latitude] },
  })),
};

export const parkingGeoJSON: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: PARKING_SPOTS.map((s) => ({
    type: 'Feature',
    properties: {
      id: s.id,
      name: s.name,
      type: s.type,
      paid: s.paid,
      price: s.price,
      walkingMinutes: s.walkingMinutes,
      availability: s.availability,
    },
    geometry: { type: 'Point', coordinates: [s.longitude, s.latitude] },
  })),
};

/** Approximate course of the Hooghly, for the schematic maps only. */
export const HOOGHLY: [number, number][] = [
  [22.668, 88.35],
  [22.645, 88.354],
  [22.62, 88.358],
  [22.6, 88.352],
  [22.585, 88.345],
  [22.572, 88.338],
  [22.56, 88.327],
  [22.548, 88.32],
  [22.54, 88.306],
  [22.534, 88.283],
];
