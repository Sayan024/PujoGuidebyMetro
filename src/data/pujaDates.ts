export type CrowdLevel = 1 | 2 | 3 | 4 | 5;

export interface PujaDay {
  id: string;
  name: string;
  short: string;
  bengali: string;
  /** ISO start date (and end date for tithis that span two days). */
  date: string;
  endDate?: string;
  dateLabel: string;
  weekday: string;
  ritual: string;
  description: string;
  image: string;
  /** Indicative travel conditions for the day. */
  advisory: {
    crowd: CrowdLevel;
    crowdLabel: string;
    metro: string;
    walkingDelay: string;
    service: string;
    note: string;
  };
}

export const PUJA_DAYS: PujaDay[] = [
  {
    id: 'mahalaya',
    name: 'Mahalaya',
    short: 'Mahalaya',
    bengali: 'মহালয়া',
    date: '2026-10-10',
    dateLabel: 'October 10',
    weekday: 'Saturday',
    ritual: 'Pitru Paksha ends · Devi Paksha begins',
    description:
      'Dawn tarpan on the Ganga ghats and the Mahishasuramardini broadcast. At Kumartuli the eyes of the goddess are painted — Chokkhudaan.',
    image: 'mahalaya',
    advisory: {
      crowd: 2,
      crowdLabel: 'Moderate',
      metro: 'Regular weekend timetable',
      walkingDelay: '+0–5 min',
      service: 'Early crowds near the river ghats; normal services through the day.',
      note: 'A calm day for Kumartuli. Use Shobhabazar Sutanuti and walk west towards the ghats.',
    },
  },
  {
    id: 'sashthi',
    name: 'Mahasashthi',
    short: 'Sashthi',
    bengali: 'মহাষষ্ঠী',
    date: '2026-10-16',
    dateLabel: 'October 16',
    weekday: 'Friday',
    ritual: 'Bodhan · Amantran · Adhivas',
    description:
      'The goddess is unveiled and welcomed. Pandals open in full and the first evening queues form across the city.',
    image: 'shashthi',
    advisory: {
      crowd: 3,
      crowdLabel: 'Busy',
      metro: 'Extended evening services',
      walkingDelay: '+5–10 min',
      service: 'Office-hour and pandal crowds overlap between 5 and 9 PM.',
      note: 'The best night for the big-ticket theme pujas before the weekend rush arrives.',
    },
  },
  {
    id: 'saptami',
    name: 'Mahasaptami',
    short: 'Saptami',
    bengali: 'মহাসপ্তমী',
    date: '2026-10-17',
    dateLabel: 'October 17',
    weekday: 'Saturday',
    ritual: 'Nabapatrika snan · Pran Pratishtha',
    description:
      'Before sunrise the Nabapatrika — Kola Bou — is bathed in the Ganga and installed beside Ganesha. The puja begins in earnest.',
    image: 'saptami',
    advisory: {
      crowd: 4,
      crowdLabel: 'Heavy',
      metro: 'Special services, late into the night',
      walkingDelay: '+10–15 min',
      service: 'Entry is regulated at the busiest stations after 6 PM.',
      note: 'Queues build at Kalighat, Rabindra Sarovar and Shyambazar. Start north, finish south.',
    },
  },
  {
    id: 'ashtami',
    name: 'Maha Ashtami',
    short: 'Ashtami',
    bengali: 'মহাষ্টমী',
    date: '2026-10-18',
    endDate: '2026-10-19',
    dateLabel: 'October 18–19',
    weekday: 'Sunday – Monday',
    ritual: 'Pushpanjali · Kumari Puja · Sandhi Puja',
    description:
      'Morning anjali in new clothes, Kumari Puja, and the Sandhi Puja with 108 lamps at the junction of Ashtami and Navami — the tithi runs across two calendar days this year.',
    image: 'ashtami',
    advisory: {
      crowd: 5,
      crowdLabel: 'Very heavy',
      metro: 'Special services through the night',
      walkingDelay: '+15–20 min',
      service: 'Expect platform holding and one-way exits at major stations.',
      note: 'Expect heavy crowds around major stations during Ashtami and Navami. Allow additional walking time.',
    },
  },
  {
    id: 'navami',
    name: 'Mahanavami',
    short: 'Navami',
    bengali: 'মহানবমী',
    date: '2026-10-20',
    dateLabel: 'October 20',
    weekday: 'Tuesday',
    ritual: 'Navami Homa · Bhog · Dhunuchi naach',
    description:
      'The sacrificial fire, community bhog at noon and dhunuchi dancing to the dhak after dark. The last full night of pandal hopping.',
    image: 'navami',
    advisory: {
      crowd: 5,
      crowdLabel: 'Very heavy',
      metro: 'Special services through the night',
      walkingDelay: '+15–20 min',
      service: 'The busiest night of the year on the Blue Line.',
      note: 'Expect heavy crowds around major stations during Ashtami and Navami. Allow additional walking time.',
    },
  },
  {
    id: 'dashami',
    name: 'Vijaya Dashami',
    short: 'Dashami',
    bengali: 'বিজয়া দশমী',
    date: '2026-10-21',
    dateLabel: 'October 21',
    weekday: 'Wednesday',
    ritual: 'Darpan Visarjan · Sindoor Khela · Immersion',
    description:
      'Married women bid farewell with vermilion, the idols travel to the river, and the city exchanges Shubho Bijoya with sweets.',
    image: 'dashami',
    advisory: {
      crowd: 3,
      crowdLabel: 'Busy',
      metro: 'Reduced holiday timetable',
      walkingDelay: '+5–10 min',
      service: 'Immersion processions close roads near the ghats from the afternoon.',
      note: 'Bonedi Bari immersions begin early. Roads to Babughat and Bagbazar ghat close first.',
    },
  },
];

/** The day the advisory should open on: the current tithi, or the next one coming up. */
export function currentPujaDay(now = new Date()): PujaDay {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
  return PUJA_DAYS.find((d) => (d.endDate ?? d.date) >= today) ?? PUJA_DAYS[PUJA_DAYS.length - 1];
}
