import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Explorer } from '@/components/Explorer/Explorer';
import { LINE_ORDER, STATIONS } from '@/data/metroLines';
import type { MetroLineId } from '@/data/types';
import { usePageTitle } from '@/hooks/useMedia';
import { useAppStore } from '@/store/appStore';

export default function ExplorerPage() {
  usePageTitle('Pandal Explorer');
  const [params] = useSearchParams();

  // Deep links: /explore?line=blue&station=kalighat&q=bonedi
  useEffect(() => {
    const line = params.get('line');
    const station = params.get('station');
    const q = params.get('q');
    const store = useAppStore.getState();
    if (line && LINE_ORDER.includes(line as MetroLineId)) store.setLine(line as MetroLineId);
    if (station && STATIONS[station]) store.setStation(station);
    if (q) store.setQuery(q);
  }, [params]);

  return <Explorer headingLevel="h1" />;
}
