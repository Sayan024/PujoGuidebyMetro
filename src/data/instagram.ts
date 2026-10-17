/**
 * Instagram accounts run by the puja committees, keyed by pandal id.
 *
 * Add a line only for an account you have opened and confirmed belongs to the
 * committee — fan pages and location tags with the same name are common.
 * Write the handle without "@". Pandals not listed here simply show no link.
 */
export const INSTAGRAM: Record<string, string> = {
  // Found via web search on 7 Oct 2026. The Tridhara and Hatibagan profiles were opened and
  // describe themselves as the committee's own; the Kumartuli Park profile could not be opened.
  'tridhara-sammilani': 'tridhara_akalbodhan',
  'hatibagan-sarbojanin': 'hatibagan_sarbojanin_durgotsav',
  'kumartuli-park': 'kumartulipark',
  // Opened during the October 2026 audit; each posts as the committee itself.
  "tala-prattoy": "talaprattoy",
  "suruchi-sangha": "suruchisangha",
  "singhi-park": "singhipark",
  "dum-dum-park-tarun-sangha": "dumdumparktarunsangha",
  "badamtala-ashar-sangha": "badamtalaasharsangha",
  "chetla-agrani": "chetla_agrani",
  "66-pally": "66_pally",
  "samaj-sebi-sangha": "samaj_sebi",
  "jagat-mukherjee-park": "jagatmukherjeepark",
};

export interface InstagramSource {
  handle: string;
  /** Display name as shown on the profile; omitted where only the handle is known. */
  name?: string;
  note: string;
}

/**
 * Independent creators and city guides covering the season. They are not puja
 * committees and are never presented as official. Accounts whose reels appear
 * on pandal pages are credited automatically (see creditedSources).
 */
export const PUJO_GUIDES: InstagramSource[] = [
  { handle: 'explorewitharitra', name: 'Aritra AK Kundu', note: 'First-look reels that name the pandal and location' },
  { handle: 'thekolkatabuzz', name: 'The Kolkata Buzz', note: 'City guide · Pujo reels and updates' },
  { handle: 'bongnabangali', name: 'Bong Na Bangali', note: 'Bengali festival creator · idols and pandal previews' },
  { handle: 'kolkatar_golpo', name: 'Kolkatar Golpo', note: 'City guide · theme reveals and first looks' },
  { handle: 'subha_yatra', note: 'Pandal preparation videos' },
  { handle: 'addymukheerjee', note: 'Behind-the-scenes pandal making' },
  { handle: 'behaya__', name: 'Bipradev Roy', note: 'Cinematic pandal reels (locations usually unnamed)' },
  { handle: 'durgapujakolkata', name: 'Durga Puja Kolkata', note: 'Photo updates from the pandals' },
  { handle: 'mr_kolkata_vlogger', note: 'Pandal walk-throughs' },
  { handle: 'kolkatacityofjoy', note: 'Pandal previews' },
  { handle: 'kalkatian', note: 'Pujo season posts' },
  { handle: 'pixel.tuhin_', note: 'Pandals beyond the city, including Howrah' },
  { handle: 'thebosetalks', note: 'Pandal walkthroughs from this season' },
  { handle: 'festive_shorts', note: 'Pandal and idol short reels, many in collaboration with committees' },
  { handle: 'kolkata_pujo_4u', note: 'Idol and pandal reels' },
  { handle: 'souradips_photography', note: 'Photographer · pandal walkthroughs' },
  { handle: 'ayondutta491994', note: 'Cinematic pandal walkthroughs' },
];

const HANDLE = /^[a-z0-9._]{1,30}$/i;

/** The committee's handle, or undefined when none is recorded (or the entry is malformed). */
export function instagramOf(pandalId: string): string | undefined {
  const handle = INSTAGRAM[pandalId]?.replace(/^@/, '');
  return handle && HANDLE.test(handle) ? handle : undefined;
}

export const instagramUrl = (handle: string) => `https://www.instagram.com/${handle}/`;

export interface PandalReel {
  /** Clean reel URL, without share or tracking parameters. */
  url: string;
  title: string;
  /** Handle of the account that posted it. */
  by: string;
}

/**
 * Reels showing a specific pandal, keyed by pandal id. Each was opened and its
 * caption checked against the pandal before being added.
 */
// Santosh Mitra Square is listed twice (walked from Central and from Sealdah); both pages share these.
const SANTOSH_MITRA_SQUARE: PandalReel[] = [
  {
    url: 'https://www.instagram.com/reel/DeFQhCCTl8M/',
    title: 'The 2026 idol arrives at the pandal from Mintu Pal’s Kumartuli studio',
    by: 'bongnabangali',
  },
  {
    url: 'https://www.instagram.com/reel/DeEwa0-z9VG/',
    title: 'The idol sets out from Kumartuli',
    by: 'bongnabangali',
  },
];

export const REELS: Record<string, PandalReel[]> = {
  'santosh-mitra-square': SANTOSH_MITRA_SQUARE,
  'santosh-mitra-square-sealdah': SANTOSH_MITRA_SQUARE,
  'behala-notun-dal': [
    {
      url: 'https://www.instagram.com/reel/DeMgwRVN3vQ/',
      title: 'The 2026 theme: “Baro Mashe Tero Parbon”, Bengal’s festival calendar in one pandal',
      by: 'kolkatar_golpo',
    },
    {
      url: 'https://www.instagram.com/reel/DeMnQE7zU_j/',
      title: 'Exclusive first look at the 2026 Maa Durga idol',
      by: 'explorewitharitra',
    },
    {
      url: 'https://www.instagram.com/reel/Dd6xQ5JTxoj/',
      title: 'Last-moment preparation and the evening look',
      by: 'explorewitharitra',
    },
  ],
  'chaltabagan-lohapatty': [
    {
      url: 'https://www.instagram.com/reel/DeKSKlVThzF/',
      title: 'Exclusive first look: “Nishan”, the 2026 theme',
      by: 'thekolkatabuzz',
    },
  ],
  'deshapriya-park': [
    {
      url: 'https://www.instagram.com/reel/Dd9f3S0zosn/',
      title: 'Exclusive first look at the 2026 Maa Durga idol',
      by: 'explorewitharitra',
    },
  ],
  'hatibagan-sarbojanin': [
    {
      url: 'https://www.instagram.com/reel/DeKAXUGzVka/',
      title: 'First look at Chokkhudan, the painting of the eyes',
      by: 'explorewitharitra',
    },
    {
      url: 'https://www.instagram.com/reel/DeEthRxTN9j/',
      title: 'Preparations for the 2026 theme, “Chhanda Chhara Channahara”',
      by: 'subha_yatra',
    },
    {
      url: 'https://www.instagram.com/reel/DeLgQsgvyI1/',
      title: 'The making: a pandal built from wooden chairs',
      by: 'addymukheerjee',
    },
  ],
  'tridhara-sammilani': [
    {
      url: 'https://www.instagram.com/reel/Dd5g0Hih7u-/',
      title: 'Preparations under way at the pandal ground',
      by: 'tridhara_akalbodhan',
    },
    {
      url: 'https://www.instagram.com/reel/Ddy1gxwBgIt/',
      title: 'The 2026 puja theme song',
      by: 'tridhara_akalbodhan',
    },
  ],
  'nalin-sarkar-street': [
    {
      url: 'https://www.instagram.com/reel/DdyrcO6zwne/',
      title: 'Exclusive first look at Sanatan Dinda’s 2026 work',
      by: 'explorewitharitra',
    },
  ],
  'ahiritola-sarbojanin': [
    {
      url: 'https://www.instagram.com/reel/Dd4HOPGzjNH/',
      title: 'First look at the 2026 Durga pratima',
      by: 'explorewitharitra',
    },
  ],
  // Found and independently verified in the October 2026 content audit: each URL was opened and its
  // caption names the pandal and the 2026 season.
  "tala-prattoy": [
    { url: "https://www.instagram.com/reel/Deca72LSDkP/", title: "Walkthrough of the Tala Prattoy 2026 pandal", by: "thebosetalks" },
    { url: "https://www.instagram.com/reel/DekFS1sERrd/", title: "Maha Shashthi at the pandal", by: "talaprattoy" },
    { url: "https://www.instagram.com/reel/Dela8lwiosi/", title: "Maha Saptami greetings from the pandal", by: "talaprattoy" },
  ],
  "sreebhumi-sporting-club": [
    { url: "https://www.instagram.com/reel/DeezAOtv3PG/", title: "Inside the 2026 Sreebhumi pandal", by: "festive_shorts" },
  ],
  "kumartuli-park": [
    { url: "https://www.instagram.com/reel/DeldC6lhA40/", title: "Darshan at Kumartuli Park Sarbajanin", by: "thebosetalks" },
    { url: "https://www.instagram.com/reel/DebyEXyI2DP/", title: "A 2026 reel from the committee", by: "kumartulipark" },
  ],
  "suruchi-sangha": [
    { url: "https://www.instagram.com/reel/DelRP-NvEv3/", title: "Nabapatrika snan (ritual bath) at Suruchi Sangha", by: "suruchisangha" },
    { url: "https://www.instagram.com/reel/Delts1Av6_5/", title: "The 2026 pandal", by: "suruchisangha" },
    { url: "https://www.instagram.com/reel/DekAc_DvUxy/", title: "Pandal glimpses on Shashthi", by: "suruchisangha" },
  ],
  "singhi-park": [
    { url: "https://www.instagram.com/reel/Dej-48QEcyi/", title: "Maha Shashthi at Singhi Park", by: "singhipark" },
  ],
  "ekdalia-evergreen": [
    { url: "https://www.instagram.com/reel/DeirdPHJ6h4/", title: "The 2026 idol and pandal", by: "festive_shorts" },
  ],
  "dum-dum-park-tarun-sangha": [
    { url: "https://www.instagram.com/reel/Dej_014CPqz/", title: "Wins Berger Priyo Pujo 2026 for its theme \"Banijye Basate Lakshmi\"", by: "dumdumparktarunsangha" },
  ],
  "badamtala-ashar-sangha": [
    { url: "https://www.instagram.com/reel/DejxF7ShHIq/", title: "Cinematic walkthrough of the temple-style 2026 pandal", by: "ayondutta491994" },
    { url: "https://www.instagram.com/reel/Deg-qD4MFS4/", title: "The puja begins", by: "badamtalaasharsangha" },
  ],
  "chetla-agrani": [
    { url: "https://www.instagram.com/reel/Deh2dggSi-T/", title: "The lit pandal and idol on Panchami", by: "chetla_agrani" },
  ],
  "66-pally": [
    { url: "https://www.instagram.com/reel/DeGj0vtzOzU/", title: "The 2026 Durga idol revealed", by: "66_pally" },
  ],
  "ballygunge-cultural": [
    { url: "https://www.instagram.com/reel/DeV2yguI1s9/", title: "Complete first look at the 2026 pandal", by: "explorewitharitra" },
  ],
  "chorebagan-sarbojanin": [
    { url: "https://www.instagram.com/reel/DeUtBhfz56u/", title: "Complete first look at the 2026 pandal", by: "explorewitharitra" },
    { url: "https://www.instagram.com/reel/DeZGacAvUFG/", title: "Visit to the Chorebagan pandal", by: "thebosetalks" },
  ],
  "south-city-mall": [
    { url: "https://www.instagram.com/reel/Deg_djTtZm6/", title: "Opening of South City Mall's first Durga Puja, with an old market and thakurdalan pandal", by: "bongnabangali" },
  ],
  "hindustan-park": [
    { url: "https://www.instagram.com/reel/DedpiLJzxVN/", title: "Pandal and idol made from matchsticks", by: "bongnabangali" },
  ],
  "jodhpur-park-sarbojanin": [
    { url: "https://www.instagram.com/reel/DeccAXKzsEf/", title: "The only Durga in Kolkata that rotates 360°", by: "bongnabangali" },
  ],
  "tala-barowari": [
    { url: "https://www.instagram.com/reel/DeeS1CBvva1/", title: "A walk through the Tala Barowari pandal", by: "souradips_photography" },
  ],
  "jagat-mukherjee-park": [
    { url: "https://www.instagram.com/reel/Dej0dfxxPsL/", title: "Visit to the 2026 Jagat Mukherjee Park pandal", by: "thebosetalks" },
    { url: "https://www.instagram.com/reel/DdoH1HcgmVc/", title: "A pre-puja reel from the committee", by: "jagatmukherjeepark" },
  ],
  "samaj-sebi-sangha": [
    { url: "https://www.instagram.com/reel/DeeLFUkpZZs/", title: "Opening of the 81st puja, with Raima Sen and other guests", by: "samaj_sebi" },
  ],
  "allen-park-park-street": [
    { url: "https://www.instagram.com/reel/Dego_-tpMBt/", title: "Durga Puja at Allen Park for the first time", by: "festive_shorts" },
  ],
  "sikdar-bagan-sadharan-durgotsav": [
    { url: "https://www.instagram.com/reel/DegFfWkJH8y/", title: "The 2026 Sikdar Bagan pandal", by: "festive_shorts" },
  ],
  "barisha-club": [
    { url: "https://www.instagram.com/reel/DedzAliPL_-/", title: "The 2026 Barisha Club pandal and idol", by: "festive_shorts" },
  ],
  "maddox-square": [
    { url: "https://www.instagram.com/reel/Deeolqtv1v9/", title: "The 2026 idol at Maddox Square", by: "kolkata_pujo_4u" },
  ],
  "new-town-sarbojanin": [
    { url: "https://www.instagram.com/reel/DeemUuuhq7m/", title: "The 2026 New Town Sarbajanin pandal", by: "thebosetalks" },
  ],
};

export const reelsOf = (pandalId: string): PandalReel[] => REELS[pandalId] ?? [];

/** Every account whose reels are linked from a pandal page, with how many, most-used first. */
export function creditedSources(): (InstagramSource & { reels: number })[] {
  const counts = new Map<string, Set<string>>();
  for (const list of Object.values(REELS))
    for (const r of list) counts.set(r.by, (counts.get(r.by) ?? new Set<string>()).add(r.url));
  return [...counts]
    .map(([handle, urls]) => ({
      ...(PUJO_GUIDES.find((g) => g.handle === handle) ?? { handle, note: 'Puja committee account' }),
      reels: urls.size,
    }))
    .sort((a, b) => b.reels - a.reels);
}

/** Committee accounts on record, as [pandal id, handle] pairs. */
export function committeeAccounts(): [string, string][] {
  return Object.keys(INSTAGRAM).flatMap((id) => {
    const handle = instagramOf(id);
    return handle ? [[id, handle] as [string, string]] : [];
  });
}
