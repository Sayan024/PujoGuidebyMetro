import type { MetroLineId } from './types.ts';

/**
 * Kolkata Metro's special Durga Puja 2026 services, as announced by Metro Railway Kolkata and reported by
 * India TV News (8 Oct), BusinessToday / The Indian Express (13 Oct) and The Daily Jagran (13 Oct, updated 17 Oct).
 * Where reports left a figure out, it is left out here too. Always confirm on the day with Metro Railway Kolkata.
 */
export type ServicePhase = 'sashthi' | 'saptami-navami' | 'dashami';

export interface LineService {
  /** Hours the special timetable runs; null when the line does not run. */
  hours: string | null;
  detail: string;
}

export const PHASE_LABEL: Record<ServicePhase, string> = {
  sashthi: '15–16 October',
  'saptami-navami': '17–20 October',
  dashami: '21 October',
};

export const LINE_SERVICES: Record<MetroLineId, { name: string; route: string; phases: Record<ServicePhase, LineService> }> = {
  blue: {
    name: 'Blue Line',
    route: 'Dakshineswar – Shahid Khudiram',
    phases: {
      sashthi: { hours: '6:00 AM – 11:00 PM', detail: '284 trains, every 6 min at peak. Last trains about 10:50 PM, with extras at 11 PM to Mahanayak Uttam Kumar and Dum Dum.' },
      'saptami-navami': { hours: '1:00 PM – about 4:00 AM', detail: '248 trains a day, every 6 min at peak. Last trains 3:46 AM from Dakshineswar and 3:48 AM from Shahid Khudiram, with extras at 4 AM. No trains before 1 PM.' },
      dashami: { hours: '1:00 PM – 10:30 PM', detail: '140 trains, every 8 min. Last trains 10:20 PM, with extras at 10:30 PM to Dum Dum and Mahanayak Uttam Kumar.' },
    },
  },
  green: {
    name: 'Green Line',
    route: 'Howrah Maidan – Salt Lake Sector V',
    phases: {
      sashthi: { hours: '6:00 AM – 11:00 PM', detail: '240 trains, every 6 min at peak. Last trains 11 PM in both directions.' },
      'saptami-navami': { hours: '1:30 PM – about 3:59 AM', detail: '192 trains a day, every 8 min at peak. Last trains 3:52 AM from Howrah Maidan and 3:59 AM from Sector V. No trains before 1:30 PM.' },
      dashami: { hours: '1:30 PM – 10:30 PM', detail: '74 trains, every 15 min.' },
    },
  },
  yellow: {
    name: 'Yellow Line',
    route: 'Noapara – Jai Hind (Airport)',
    phases: {
      sashthi: { hours: '7:18 AM – 9:20 PM', detail: '120 trains, every 12 min at rush hour, plus five direct trains between Jai Hind and Shahid Khudiram.' },
      'saptami-navami': { hours: '3:00 PM – 10:53 PM', detail: '72 trains a day. Ends the evening early: not an overnight line.' },
      dashami: { hours: '3:00 PM – 9:38 PM', detail: '62 trains.' },
    },
  },
  purple: {
    name: 'Purple Line',
    route: 'Joka – Majerhat',
    phases: {
      sashthi: { hours: '6:40 AM – 9:26 PM', detail: '84 trains, every 21 min at peak.' },
      'saptami-navami': { hours: '3:00 PM – 10:55 PM', detail: '38 trains a day. Not an overnight line.' },
      dashami: { hours: '3:00 PM – 10:55 PM', detail: '38 trains.' },
    },
  },
  orange: {
    name: 'Orange Line',
    route: 'Kavi Subhash – Beleghata',
    phases: {
      sashthi: { hours: '7:40 AM – 8:45 PM', detail: '62 trains, every 25 min. This is its last running day before the break.' },
      'saptami-navami': { hours: null, detail: 'No Metro services on the Orange Line from 17 to 21 October.' },
      dashami: { hours: null, detail: 'No Metro services on the Orange Line.' },
    },
  },
};

export const SERVICE_SOURCE_NOTE =
  'Special timetable announced by Metro Railway Kolkata, as reported by India TV News, BusinessToday and The Daily Jagran. Timings can change; confirm with Metro Railway Kolkata before you travel.';

export const ORANGE_LINE_NOTICE =
  'The Orange Line has no Metro services from 17 to 21 October. Plan to arrive by bus, auto or cab, or from the nearest running Metro station.';

/** True from the start of the break until the end of Dashami (IST). */
export function orangeLineSuspended(now = new Date()): boolean {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  return today <= '2026-10-21';
}
