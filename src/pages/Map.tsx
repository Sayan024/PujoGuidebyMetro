import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PujoMap } from '@/components/MetroMap/PujoMap';
import { PANDAL_BY_ID } from '@/data';
import { STATIONS } from '@/data/metroLines';
import { usePageTitle } from '@/hooks/useMedia';
import { useAppStore } from '@/store/appStore';

/** Full-screen map. Deep links: /map?pandal=<id>, /map?station=<id>, /map?view=police */
export default function MapPage() {
  const [params] = useSearchParams();
  const isPoliceView = params.get('view') === 'police';
  usePageTitle(isPoliceView ? 'Kolkata Police Puja Guide Map' : 'Pujo Map');

  useEffect(() => {
    const store = useAppStore.getState();
    const pandal = PANDAL_BY_ID.get(params.get('pandal') ?? '');
    const station = params.get('station');
    if (pandal) {
      store.setLine('all');
      store.setStation(pandal.stationId);
      store.selectPandal(pandal.id);
    } else if (station && STATIONS[station]) {
      store.setLine('all');
      store.setStation(station);
    }
  }, [params]);

  return (
    <div className="fixed inset-0 pb-[calc(90px+env(safe-area-inset-bottom))] pt-[78px] lg:pb-0 lg:pt-[84px]">
      <h1 className="sr-only">Pujo Map — Kolkata Metro lines, stations, pandals and Kolkata Police Guide Map</h1>
      <PujoMap variant="page" initialMode={isPoliceView ? 'police' : 'street'} />
    </div>
  );
}
