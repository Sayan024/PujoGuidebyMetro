import type { FeatureCollection } from 'geojson';
import { Map as MlMap, NavigationControl, setWorkerUrl, type FilterSpecification, type GeoJSONSource } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef } from 'react';
import { PANDAL_BY_ID } from '@/data';
import { STATIONS } from '@/data/metroLines';
import { circlePolygon, KOLKATA_CENTER, linesGeoJSON, pandalsGeoJSON, stationsGeoJSON } from '@/lib/geo';
import { useAppStore } from '@/store/appStore';

// MapLibre 6 ships its worker as a separate module; hand it the bundled URL.
setWorkerUrl(workerUrl);

const STYLES = {
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};
const EMPTY: FeatureCollection = { type: 'FeatureCollection', features: [] };

/**
 * The real navigation map. If the style or tiles cannot be loaded it reports
 * back through `onUnavailable` so the parent can show the schematic map instead.
 */
export default function StreetMap({ interactiveScroll, onUnavailable }: { interactiveScroll: boolean; onUnavailable: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const theme = useAppStore((s) => s.theme);
  const line = useAppStore((s) => s.line);
  const stationId = useAppStore((s) => s.stationId);
  const selectedPandalId = useAppStore((s) => s.selectedPandalId);

  // Latest values for the style-load handler, which outlives individual renders.
  const live = useRef({ theme, line, stationId, selectedPandalId });
  live.current = { theme, line, stationId, selectedPandalId };
  const unavailable = useRef(onUnavailable);
  unavailable.current = onUnavailable;

  const sync = (map: MlMap) => {
    if (!map.getLayer('pandals')) return;
    const { line, stationId, selectedPandalId } = live.current;
    const lineFilter = line === 'all' ? null : (['==', ['get', 'line'], line] as FilterSpecification);
    map.setFilter('pandals', lineFilter);
    map.setPaintProperty('lines', 'line-opacity', line === 'all' ? 0.95 : ['case', ['==', ['get', 'id'], line], 1, 0.2]);
    map.setPaintProperty('lines-glow', 'line-opacity', line === 'all' ? 0.22 : ['case', ['==', ['get', 'id'], line], 0.35, 0.04]);
    map.setFilter('pandal-selected', ['==', ['get', 'id'], selectedPandalId ?? '']);
    map.setFilter('station-selected', ['==', ['get', 'id'], stationId ?? '']);
    map.setPaintProperty('pandals', 'circle-opacity', stationId ? ['case', ['==', ['get', 'station'], stationId], 1, 0.3] : 0.9);
    const st = stationId ? STATIONS[stationId] : null;
    (map.getSource('radius') as GeoJSONSource).setData(st ? circlePolygon(st.lat, st.lng, 1) : EMPTY);
  };

  useEffect(() => {
    if (!container.current) return;
    let loaded = false;
    let dead = false;
    const fail = (force = false) => {
      if ((force || !loaded) && !dead) {
        dead = true;
        unavailable.current();
      }
    };

    let map: MlMap;
    try {
      map = new MlMap({
        container: container.current,
        style: STYLES[live.current.theme],
        center: KOLKATA_CENTER,
        zoom: 10.9,
        minZoom: 9.5,
        maxZoom: 17,
        attributionControl: { compact: true },
        cooperativeGestures: !interactiveScroll,
      });
    } catch {
      fail();
      return;
    }
    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), 'bottom-right');

    // No style after a few seconds means the tile host is unreachable.
    const timer = window.setTimeout(() => fail(), 7000);
    map.on('error', (e) => {
      const status = (e.error as { status?: number } | undefined)?.status;
      // A dead worker can never draw tiles, even if the style itself arrived.
      if (/worker/i.test(e.error?.message ?? '')) fail(true);
      else if (!loaded && (status === undefined || status >= 400)) fail();
    });

    map.on('style.load', () => {
      loaded = true;
      clearTimeout(timer);
      const dark = live.current.theme === 'dark';
      const font = (map
        .getStyle()
        .layers.find((l) => l.type === 'symbol' && Array.isArray(l.layout?.['text-font']) && !/italic/i.test(String(l.layout['text-font'])))?.layout as { 'text-font'?: string[] } | undefined)?.[
        'text-font'
      ] ?? ['Open Sans Regular'];

      map.addSource('lines', { type: 'geojson', data: linesGeoJSON });
      map.addSource('stations', { type: 'geojson', data: stationsGeoJSON });
      map.addSource('pandals', { type: 'geojson', data: pandalsGeoJSON });
      map.addSource('radius', { type: 'geojson', data: EMPTY });

      map.addLayer({ id: 'radius-fill', type: 'fill', source: 'radius', paint: { 'fill-color': '#DDAA44', 'fill-opacity': 0.09 } });
      map.addLayer({
        id: 'radius-line',
        type: 'line',
        source: 'radius',
        paint: { 'line-color': '#DDAA44', 'line-width': 1.5, 'line-dasharray': [2, 2.5], 'line-opacity': 0.8 },
      });
      map.addLayer({
        id: 'lines-glow',
        type: 'line',
        source: 'lines',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': 12, 'line-blur': 8, 'line-opacity': 0.22 },
      });
      map.addLayer({
        id: 'lines',
        type: 'line',
        source: 'lines',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2.5, 15, 6] },
      });
      map.addLayer({
        id: 'pandals',
        type: 'circle',
        source: 'pandals',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, ['case', ['>=', ['get', 'popularity'], 85], 3.2, 2.2], 15, ['case', ['>=', ['get', 'popularity'], 85], 9, 7]],
          'circle-color': dark ? '#FFD66B' : '#C4182B',
          'circle-stroke-color': ['get', 'color'],
          'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 2.5],
        },
      });
      map.addLayer({
        id: 'pandal-selected',
        type: 'circle',
        source: 'pandals',
        filter: ['==', ['get', 'id'], ''],
        paint: {
          'circle-radius': 13,
          'circle-color': '#E52D3F',
          'circle-stroke-color': '#FFF4E6',
          'circle-stroke-width': 3,
        },
      });
      map.addLayer({
        id: 'stations',
        type: 'circle',
        source: 'stations',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3.2, 15, 8],
          'circle-color': dark ? '#120909' : '#FFFAF3',
          'circle-stroke-color': ['get', 'color'],
          'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 10, 1.8, 15, 3.5],
        },
      });
      map.addLayer({
        id: 'station-selected',
        type: 'circle',
        source: 'stations',
        filter: ['==', ['get', 'id'], ''],
        paint: { 'circle-radius': 11, 'circle-color': ['get', 'color'], 'circle-stroke-color': '#FFF4E6', 'circle-stroke-width': 3 },
      });
      map.addLayer({
        id: 'station-labels',
        type: 'symbol',
        source: 'stations',
        minzoom: 11.6,
        layout: {
          'text-field': ['get', 'name'],
          'text-font': font,
          'text-size': ['interpolate', ['linear'], ['zoom'], 11.6, 10.5, 15, 13.5],
          'text-anchor': 'left',
          'text-offset': [0.9, 0],
          'text-max-width': 9,
        },
        paint: {
          'text-color': dark ? '#FFF4E6' : '#3A0A14',
          'text-halo-color': dark ? '#120909' : '#FFFAF3',
          'text-halo-width': 1.6,
        },
      });
      sync(map);
    });

    for (const layer of ['pandals', 'stations']) {
      map.on('mouseenter', layer, () => (map.getCanvas().style.cursor = 'pointer'));
      map.on('mouseleave', layer, () => (map.getCanvas().style.cursor = ''));
    }
    map.on('click', 'pandals', (e) => {
      const id = e.features?.[0]?.properties?.id as string | undefined;
      if (id) useAppStore.getState().selectPandal(id);
    });
    map.on('click', 'stations', (e) => {
      // A pandal sitting on top of the station marker wins the click.
      if (map.queryRenderedFeatures(e.point, { layers: ['pandals'] }).length) return;
      const id = e.features?.[0]?.properties?.id as string | undefined;
      if (id) useAppStore.getState().setStation(id);
    });

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(container.current);

    return () => {
      dead = true;
      clearTimeout(timer);
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // The map is created once; later changes are applied by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theme: swap the basemap; our layers are re-added by the style.load handler.
  const firstTheme = useRef(true);
  useEffect(() => {
    if (firstTheme.current) {
      firstTheme.current = false;
      return;
    }
    mapRef.current?.setStyle(STYLES[theme]);
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    if (map?.isStyleLoaded()) sync(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line, stationId, selectedPandalId]);

  // Camera follows the selection.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const p = selectedPandalId ? PANDAL_BY_ID.get(selectedPandalId) : null;
    const st = stationId ? STATIONS[stationId] : null;
    if (p) map.flyTo({ center: [p.longitude, p.latitude], zoom: Math.max(map.getZoom(), 14.6), duration: reduce ? 0 : 1100 });
    else if (st) map.flyTo({ center: [st.lng, st.lat], zoom: 13.9, duration: reduce ? 0 : 1300 });
  }, [stationId, selectedPandalId]);

  // MapLibre sets position: relative on its container, so sizing is done by a wrapper.
  return (
    <div className="absolute inset-0">
      <div ref={container} style={{ width: '100%', height: '100%' }} role="application" aria-label="Street map of Kolkata Metro lines and pandals" />
    </div>
  );
}
