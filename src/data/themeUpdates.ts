import type { Pandal } from './types.ts';

/**
 * 2026 themes and artists announced by committees and reported in the press
 * (The Federal, Sangbad Pratidin, KolkataKhoj, Local Samosa, Open, Ei Samay),
 * checked October 2026. Where outlets disagree, the theme with more than one
 * report wins; pandals with no reliable report are left blank.
 *
 * Kept apart from the generated pandals.ts so a data rebuild keeps them.
 */
type Update = Partial<Pick<Pandal, 'theme' | 'artist' | 'description' | 'category' | 'popularity'>>;

/**
 * Big-name pujas the source lists left at the default score. Station lists put the most
 * popular first, so these need a score that reflects their crowds.
 * 90+: city-wide crowd-pullers · 85–89: major · 80–84: well known locally.
 */
const POPULARITY: Record<string, number> = {
  '66-pally': 90,
  'kasba-bosepukur-sitala-mandir': 90,
  'behala-notun-dal': 88,
  'barisha-club': 88,
  'ahiritola-sarbojanin': 88,
  'hindustan-park': 88,
  'rajdanga-naba-uday-sangha': 88,
  'ajeya-sanghati': 88,
  'behala-club': 86,
  'behala-friends': 86,
  'thakurpukur-sb-park': 86,
  'dum-dum-park-sarbojanin': 86,
  'bosepukur-talbagan': 86,
  'haridevpur-41-pally': 86,
  'jodhpur-park-sarbojanin': 86,
  'santoshpur-trikon-park': 86,
  'nepal-bhattacharjee-street': 85,
  'dum-dum-park-tarun-dal': 85,
  'vivekananda-park-athletic-club': 85,
  'shyam-square': 85,
  '95-pally-jodhpur-park': 85,
  'babubagan-sarbojanin': 85,
  'selimpur-pally': 85,
  'beleghata-33-pally': 85,
  'bhowanipur-75-pally': 85,
  'hazra-park-durgotsav': 85,
  'kidderpore-25-pally': 85,
  'dum-dum-park-yubak-brinda': 84,
  'ahiritola-jubak-brinda': 84,
  'players-corner-behala': 84,
  'kendua-shanti-sangha-patuli': 82,
  'kidderpore-74-pally': 82,
};

export const THEME_UPDATES: Record<string, Update> = {
  // South Kolkata
  'suruchi-sangha': {
    theme: 'Padma (Lotus)',
    description: "A lotus theme honouring Syama Prasad Mookerjee's life and legacy, with a traditional idol and straw décor. New Alipore; auto advised from the Metro",
  },
  'badamtala-ashar-sangha': {
    theme: 'Kalponik Mondir (Imagined Temple)',
    artist: 'Rono Bandopadhyay & Pallab Jana',
    description: "88th year. A folk tale of Maa Durga and a South Kolkata sadhu, with the idol modelled on Ashok Gupta's 1959 design. Consistent award winner",
  },
  '66-pally': { theme: 'Ek Muthon Agun (A Fistful of Fire)' },
  'tridhara-sammilani': {
    theme: 'Surasur (Gods and Demons)',
    description: 'Mythological battles: Ram and Ravana, Krishna and Kansa, Durga and the asuras, in artwork, light and sculpture. Look for a 5.5 ft Durga made from 13,000 recycled pens',
  },
  'naktala-udayan-sangha': {
    theme: 'Kaler Dhwani (Sound of Time)',
    description: '40th year. One of the big Naktala crowd-pullers; go early or late',
  },
  'kasba-bosepukur-sitala-mandir': {
    theme: 'Chup (Silence)',
    description: '77th year. A small site that consistently does more with less than pandals five times its size',
  },
  'rajdanga-naba-uday-sangha': {
    theme: 'Shodhan',
    description: 'Artist: Debasis Barui. The cost of environmental destruction. On the Adani preview list',
    category: 'Climate & Environment',
  },
  'hindusthan-club': { artist: 'Shibsankar Das (mandap)' },
  'ballygunge-cultural': { artist: 'Sushanta Shibani Pal' },
  'deshapriya-park': { artist: 'Sanatan Rudra Pal (idol)' },
  'mudiali-club': { artist: 'Biman Saha' },
  'santoshpur-lake-pally': { artist: 'Rintu Das' },
  'alipore-sarbojanin': { artist: 'Anirban Das' },
  // Behala and Khidirpur
  'thakurpukur-sb-park': {
    theme: 'Koliyari (Colliery)',
    description: "56th year. A 20 ft deep walk-through coal mine on the Raniganj belt's past and present; the goddess stands for the miners. Artist: Raju Sarkar. On the Adani preview list",
    category: 'Social Awareness',
  },
  'behala-friends': { theme: 'Shuddhikaran (Purification)', description: 'Pandal built from iron sheets' },
  'behala-club': { artist: 'Pradip Das; idol by Pintu Shikdar' },
  'kidderpore-25-pally': { theme: 'Paricharan', artist: 'Bimal Samanta' },
  // North and central Kolkata
  'ahiritola-sarbojanin': {
    theme: 'Madhuri Mishtir Onneshan (In Search of Sweetness)',
    artist: 'Manas Das (idea), Subrata Mridha',
    description: "Bengal's mishti and the culture around it, beside the Ganga",
  },
  'dakshindari-youth': { theme: 'Ashwamedher Ghora (The Horse of Ashwamedha)', category: 'Mythology' },
  'beleghata-33-pally': { theme: 'Uddan (Flight)', artist: 'Riju Kar, Ganesh Haloi & Shib Sankar Das' },
  'hatibagan-sarbojanin': { artist: 'Rabindranath Roy' },
  'hatibagan-nabin-pally': { artist: 'Arighna Saha' },
  'jagat-mukherjee-park': { artist: 'Abhijit Ghatak; idol by Amal Pal' },
  'chorebagan-sarbojanin': { artist: 'Sushanta Shibani Pal' },
  'santosh-mitra-square': { artist: 'Shibshankar Das' },
  'santosh-mitra-square-sealdah': { artist: 'Shibshankar Das' },
  'taltala-sarbojanin': { artist: 'Amit & Arindam' },
};

export function applyThemeUpdate(p: Pandal): Pandal {
  const u = THEME_UPDATES[p.id];
  const popularity = Math.max(p.popularity, POPULARITY[p.id] ?? 0);
  if (!u) return popularity === p.popularity ? p : { ...p, popularity };
  return { ...p, ...u, popularity, theme2026: Boolean(u.theme ?? p.theme) || p.theme2026 };
}
