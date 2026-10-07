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
