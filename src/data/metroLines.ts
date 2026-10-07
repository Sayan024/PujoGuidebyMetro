import type { MetroLine, MetroLineId, Station } from './types.ts';

type Row = [id: string, name: string, lat: number, lng: number, area?: string];

const BLUE: Row[] = [
  ['dakshineswar', 'Dakshineswar', 22.6548, 88.3577],
  ['baranagar', 'Baranagar', 22.6436, 88.3655],
  ['noapara', 'Noapara', 22.64, 88.393],
  ['dum-dum', 'Dum Dum', 22.6213, 88.3931],
  ['belgachia', 'Belgachia', 22.6058, 88.3888],
  ['shyambazar', 'Shyambazar', 22.6012, 88.373],
  ['shobhabazar-sutanuti', 'Shobhabazar Sutanuti', 22.5955, 88.3655, 'Sovabazar'],
  ['girish-park', 'Girish Park', 22.5866, 88.363],
  ['mahatma-gandhi-road', 'Mahatma Gandhi Road', 22.5811, 88.3613, 'MG Road'],
  ['central', 'Central', 22.5727, 88.3597],
  ['chandni-chowk', 'Chandni Chowk', 22.5655, 88.3556],
  ['esplanade', 'Esplanade', 22.5646, 88.3515],
  ['park-street', 'Park Street', 22.5546, 88.3508],
  ['maidan', 'Maidan', 22.549, 88.3485],
  ['rabindra-sadan', 'Rabindra Sadan', 22.5412, 88.3473],
  ['netaji-bhavan', 'Netaji Bhavan', 22.5339, 88.3462, 'Bhowanipore'],
  ['jatin-das-park', 'Jatin Das Park', 22.5265, 88.3462, 'Hazra'],
  ['kalighat', 'Kalighat', 22.5175, 88.3458],
  ['rabindra-sarovar', 'Rabindra Sarovar', 22.507, 88.3457],
  ['mahanayak-uttam-kumar', 'Mahanayak Uttam Kumar', 22.4945, 88.3452, 'Tollygunge'],
  ['netaji', 'Netaji (Kudghat)', 22.4812, 88.3462, 'Kudghat'],
  ['masterda-surya-sen', 'Masterda Surya Sen', 22.473, 88.36, 'Bansdroni'],
  ['gitanjali', 'Gitanjali', 22.4697, 88.369, 'Naktala'],
  ['kavi-nazrul', 'Kavi Nazrul', 22.4645, 88.38, 'Garia Bazar'],
  ['shahid-khudiram', 'Shahid Khudiram', 22.4662, 88.3915, 'Briji'],
];

const GREEN: Row[] = [
  ['howrah-maidan', 'Howrah Maidan', 22.583, 88.329],
  ['howrah', 'Howrah', 22.5836, 88.3406],
  ['mahakaran', 'Mahakaran', 22.5722, 88.3478, 'BBD Bagh'],
  ['esplanade', 'Esplanade', 22.5646, 88.3515],
  ['sealdah', 'Sealdah', 22.567, 88.371],
  ['phoolbagan', 'Phoolbagan', 22.572, 88.39],
  ['salt-lake-stadium', 'Salt Lake Stadium', 22.5733, 88.403],
  ['bengal-chemical', 'Bengal Chemical', 22.58, 88.401],
  ['city-centre', 'City Centre', 22.587, 88.408],
  ['central-park', 'Central Park', 22.589, 88.415],
  ['karunamoyee', 'Karunamoyee', 22.586, 88.4215],
  ['sector-v', 'Sector V', 22.581, 88.43, 'Salt Lake Sector V'],
];

const YELLOW: Row[] = [
  ['noapara', 'Noapara', 22.64, 88.393],
  ['dum-dum-cantonment', 'Dum Dum Cantonment', 22.637, 88.412],
  ['jessore-road', 'Jessore Road', 22.642, 88.428],
  ['jai-hind', 'Jai Hind (Airport)', 22.644, 88.44, 'Airport'],
];

const PURPLE: Row[] = [
  ['joka', 'Joka', 22.452, 88.302],
  ['thakurpukur', 'Thakurpukur', 22.464, 88.307],
  ['sakher-bazar', 'Sakher Bazar', 22.476, 88.31],
  ['behala-chowrasta', 'Behala Chowrasta', 22.487, 88.313],
  ['behala-bazar', 'Behala Bazar', 22.4975, 88.318],
  ['taratala', 'Taratala', 22.509, 88.322],
  ['majerhat', 'Majerhat', 22.52, 88.324],
];

const ORANGE: Row[] = [
  ['satyajit-ray', 'Satyajit Ray', 22.483, 88.399, 'Hiland Park'],
  ['jyotirindra-nandi', 'Jyotirindra Nandi', 22.493, 88.399, 'Mukundapur'],
  ['kavi-sukanta', 'Kavi Sukanta', 22.503, 88.399, 'Kalikapur'],
  ['hemanta-mukhopadhyay', 'Hemanta Mukhopadhyay', 22.5135, 88.401, 'Ruby'],
  ['vip-bazar', 'VIP Bazar', 22.525, 88.399],
  ['ritwik-ghatak', 'Ritwik Ghatak', 22.536, 88.3985],
  ['barun-sengupta', 'Barun Sengupta', 22.545, 88.3975, 'Science City'],
  ['beleghata', 'Beleghata', 22.556, 88.399],
];

const ROWS: Record<MetroLineId, Row[]> = {
  blue: BLUE,
  green: GREEN,
  yellow: YELLOW,
  purple: PURPLE,
  orange: ORANGE,
};

export const LINE_ORDER: MetroLineId[] = ['blue', 'green', 'purple', 'orange', 'yellow'];

const META: Record<MetroLineId, Omit<MetroLine, 'id' | 'stations'>> = {
  blue: {
    name: 'Blue Line',
    short: 'Blue',
    color: '#2563EB',
    route: 'Dakshineswar ↔ Shahid Khudiram',
    blurb: 'The north–south spine. North Kolkata heritage, Kumartuli, and the big-ticket pujas of the south.',
  },
  green: {
    name: 'Green Line',
    short: 'Green',
    color: '#10B981',
    route: 'Howrah Maidan ↔ Sector V',
    blurb: 'Under the Hooghly to Sealdah and on to the block pujas of Salt Lake.',
  },
  purple: {
    name: 'Purple Line',
    short: 'Purple',
    color: '#A855F7',
    route: 'Joka ↔ Majerhat',
    blurb: 'Behala’s theme powerhouses, strung along Diamond Harbour Road.',
  },
  orange: {
    name: 'Orange Line',
    short: 'Orange',
    color: '#F97316',
    route: 'Satyajit Ray ↔ Beleghata',
    blurb: 'The EM Bypass corridor — Santoshpur, Ruby and the new-town pujas.',
  },
  yellow: {
    name: 'Yellow Line',
    short: 'Yellow',
    color: '#EAB308',
    route: 'Noapara ↔ Jai Hind (Airport)',
    blurb: 'The airport link through Dum Dum Cantonment and Jessore Road.',
  },
};

export const METRO_LINES: MetroLine[] = LINE_ORDER.map((id) => ({
  id,
  ...META[id],
  stations: ROWS[id].map((r) => r[0]),
}));

export const LINE_BY_ID = Object.fromEntries(METRO_LINES.map((l) => [l.id, l])) as Record<
  MetroLineId,
  MetroLine
>;

export const STATIONS: Record<string, Station> = {};
for (const id of LINE_ORDER) {
  for (const [sid, name, lat, lng, area] of ROWS[id]) {
    const existing = STATIONS[sid];
    if (existing) existing.lines.push(id);
    else STATIONS[sid] = { id: sid, name, area, lat, lng, lines: [id] };
  }
}

export const STATION_LIST: Station[] = Object.values(STATIONS);

export const lineColorVar = (id: MetroLineId) => `var(--${id}-line)`;

/** Position of a station in the network, used for "sort by station". */
export function stationRank(stationId: string, line: MetroLineId): number {
  const li = LINE_ORDER.indexOf(line);
  const si = LINE_BY_ID[line].stations.indexOf(stationId);
  return li * 100 + (si < 0 ? 99 : si);
}
