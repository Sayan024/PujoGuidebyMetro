import { TriangleAlert } from 'lucide-react';
import { STATIONS } from '@/data/metroLines';
import { orangeLineSuspended, ORANGE_LINE_NOTICE } from '@/data/metroServices';
import { cn } from '@/lib/utils';

/**
 * Shown on pages for places reached by the Orange Line, which has no trains from 17 to 21 October.
 * Stations shared with a running line say so instead.
 */
export function OrangeLineNotice({ stationId, className }: { stationId: string; className?: string }) {
  const station = STATIONS[stationId];
  if (!station || !station.lines.includes('orange') || !orangeLineSuspended()) return null;
  const others = station.lines.filter((l) => l !== 'orange');
  return (
    <p
      role="note"
      className={cn('flex items-start gap-3 border border-red/40 bg-red/10 px-4 py-3 text-sm leading-snug text-ink', className)}
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red" aria-hidden="true" />
      <span>
        <strong className="font-semibold">No Orange Line trains, 17–21 October.</strong>{' '}
        {others.length
          ? `${station.name} is also on the ${others.map((l) => `${l[0].toUpperCase()}${l.slice(1)} Line`).join(' and ')}, which keeps running.`
          : ORANGE_LINE_NOTICE.replace('The Orange Line has no Metro services from 17 to 21 October. ', '')}
      </span>
    </p>
  );
}
