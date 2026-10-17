import type { Pandal } from './types.ts';

/**
 * 2026 themes and artists announced by committees and reported in the press
 * (The Federal, Sangbad Pratidin, KolkataKhoj, Local Samosa, Open, Ei Samay),
 * checked October 2026. Where outlets disagree, the theme with more than one
 * report wins; pandals with no reliable report are left blank.
 *
 * Kept apart from the generated pandals.ts so a data rebuild keeps them.
 */
type Update = Partial<Pick<Pandal, 'name' | 'theme' | 'artist' | 'description' | 'category' | 'popularity' | 'traditional'>>;

const NO_ARTIST = 'Not announced';

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
    artist: 'Anirban Das',
    description: '40th year. One of the big Naktala crowd-pullers; go early or late',
  },
  'kasba-bosepukur-sitala-mandir': {
    theme: 'Chup (Silence)',
    description: '77th year. A small site that consistently does more with less than pandals five times its size',
  },
  'rajdanga-naba-uday-sangha': {
    theme: 'Shodhan (Purification)',
    artist: 'Debasis Barui; idol by Saikat Giri',
    description: 'A future of deforestation and artificial oxygen, urging conservation. On the Adani preview list and the Asian Paints Sharad Shamman shortlist',
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
  'behala-club': {
    theme: 'Tel: The Market of Faith',
    artist: 'Pradip Das; idol by Pintu Sikder',
    description: "Oil as faith, commerce, power and geopolitics, with a satirical edge. On the Asian Paints Sharad Shamman shortlist",
  },
  'kidderpore-25-pally': { theme: 'Paricharan', artist: 'Bimal Samanta' },
  // North and central Kolkata
  'ahiritola-sarbojanin': {
    theme: 'Maitri Madhuri Anweshane (Searching for Sweet Friendship)',
    artist: 'Manas Das (idea), Subrata Mridha',
    description: "Bengal's mishti and the culture around it, beside the Ganga",
  },
  'dakshindari-youth': { theme: 'Ashwamedher Ghora (The Horse of Ashwamedha)', category: 'Mythology' },
  'beleghata-33-pally': { theme: 'Uddan (Flight)', artist: 'Riju Kar, Ganesh Haloi & Shib Sankar Das' },
  'hatibagan-sarbojanin': { theme: 'Chhandachhara Chhannachhara (Rhythmless, Orderless)', artist: 'Rabindranath Roy' },
  'hatibagan-nabin-pally': { artist: 'Arighna Saha' },
  'jagat-mukherjee-park': { artist: 'Abhijit Ghatak; idol by Amal Pal' },
  'chorebagan-sarbojanin': { artist: 'Sushanta Shibani Pal' },
  'santosh-mitra-square': { artist: 'Shibshankar Das' },
  'santosh-mitra-square-sealdah': { artist: 'Shibshankar Das' },
  'taltala-sarbojanin': { artist: 'Amit & Arindam' },

  // ── Content audit, October 2026 ─────────────────────────────────────────────────────────
  // Corrections and new 2026 reports
  'college-square': { theme: "Jaipur's Albert Hall Museum", description: 'Replica-inspired pandal after the Albert Hall Museum of Jaipur, known for its illuminated facade. College Street; MG Road and Central Metro are both close' },
  'college-square-sealdah': { theme: "Jaipur's Albert Hall Museum" },
  'mohammad-ali-park': { theme: 'Ancient Ram Mandir', description: '58th year. Inspired by ancient temples dedicated to Lord Ram' },
  'chetla-agrani': {
    theme: 'Vishva Rupe Vishwarupini',
    description: 'Durga as protector of the universe, with the Vishwarupa of Vishnu. Chetla; auto advised from the Metro',
  },
  'kendua-shanti-sangha-patuli': { theme: 'Aishwaryi', description: '53rd year. A caged woman whose hair becomes a ladder: a critique of the oppression of women. Patuli' },
  'chaltabagan-lohapatty': { artist: 'Aditi Chakraborty; idol by Pallab Jana' },
  'kashi-bose-lane': { artist: 'Anirban Das' },
  'south-city-mall': { artist: 'Subhankar Dutta', description: "The mall's first-ever Durga Puja, built on its own front on Prince Anwar Shah Road" },
  'samaj-sebi-sangha': { artist: 'Biswanath De; idol by Arighna Saha' },
  'golden-arrow-club': { description: 'Neighbourhood puja on Sardar Sankar Road, Kalighat, part of the Kalighat & Rashbehari cluster.' },
  'naktala-pally-unnayan-samiti': { name: 'Pally Unnayan Samiti (Paschim Putiary)' },

  // Placeholder themes: a road name or "Sabeki Ekchala Puja" stuck on club pujas, with no 2026 report
  '64-pally-manoharpukur': { theme: '', artist: NO_ARTIST },
  'chotushkone-park-kalighat': { theme: '', artist: NO_ARTIST },
  'barisha-club': { theme: '', category: 'Heritage Kolkata', traditional: false },
  'barisha-netaji-sangha': { theme: '', category: 'Heritage Kolkata', traditional: false },
  'barisha-yuba-brinda': { theme: '', category: 'Heritage Kolkata', traditional: false },
  'barisha-nabin-sangha': { theme: '', category: 'Heritage Kolkata', traditional: false },
  'barisha-tarun-tirtha': { theme: '', category: 'Heritage Kolkata', traditional: false },
  'uttar-barisha': { theme: '', category: 'Heritage Kolkata', traditional: false },
  // Themes and artists with no 2026 report anywhere (Howrah, Beleghata, Baguiati): blank, not invented
  'shibpur-mandirtala-sarbojanin': { theme: '', artist: NO_ARTIST },
  'howrah-nabagopal-sporting': { theme: '', artist: NO_ARTIST },
  'baje-shibpur-sammilani': { theme: '', artist: NO_ARTIST },
  'kadamtala-sarbojanin': { theme: '', artist: NO_ARTIST },
  'ramkrishnapur-sarbojanin-howrah': { theme: '', artist: NO_ARTIST },
  'olabibitala-sarbojanin': { theme: '', artist: NO_ARTIST },
  'ramkrishnapur-byayam-samity': { theme: '', artist: NO_ARTIST },
  'salkia-alapani-sangha': { theme: '', artist: NO_ARTIST },
  'boral-sukanta-sangha': { theme: '', artist: NO_ARTIST },
  'beliaghata-nabamilan': { theme: '', artist: NO_ARTIST },
  'keshtopur-prafulla-kanan': { theme: '', artist: NO_ARTIST },
  'nirvik-sangha-baguiati': { theme: '', artist: NO_ARTIST },
  'behala-29-palli': { theme: '', artist: NO_ARTIST },

  // Asian Paints Sharad Shamman 2026 shortlist (sharadshamman.asianpaints.com), October 2026
  'behala-young': {
    name: "Behala Youngmen's Association",
    theme: 'Chhuti (Holiday)',
    artist: 'Sanatan Dinda',
    category: 'Art & Innovation',
    description: 'A "cloud factory" where children play freely and imagine without machines. On the Asian Paints Sharad Shamman shortlist',
  },
  'dum-dum-park-bharat-chakra': {
    theme: "Bonger Roth Kotha (The Story of Bengal's Chariots)",
    artist: 'Manash Das; idol by Saikat Basu',
    description: "Bengal's chariot traditions and wooden craftsmanship. On the Asian Paints Sharad Shamman shortlist",
  },
  'salt-lake-fd-block': {
    theme: 'Nakshi Konar Math',
    artist: 'Prasanta Pal; idol by Tapan Majhi',
    category: 'Art & Innovation',
    description: 'Gond, Madhubani, Pattachitra and Bengali embroidery folk arts together. On the Asian Paints Sharad Shamman shortlist',
  },
  'rajdanga-amra-kajon-kalyan-samity': {
    theme: 'Utsarito Aalo (Radiated Light)',
    artist: 'Purnendu Dey',
    description: 'A tribute to the painter Gaganendranath Tagore. On the Asian Paints Sharad Shamman shortlist',
  },
  'nagerbazar-yuba-sangha': {
    name: 'Yuba Sangha (Nagerbazar)',
    theme: 'Ek Pukur Bhalobasa (A Pond Full of Love)',
    artist: 'Bhabatosh Sutar',
    description: "Bengal's disappearing neighbourhood ponds, with the Telipukur pond as a floating canvas. On the Asian Paints Sharad Shamman shortlist",
  },
  'santoshpur-avenue-south-club': {
    theme: 'Nirmaan Binirmaan (Construction-Deconstruction)',
    artist: 'Susanta Shibani Paul',
    description: 'Cycles of ruin and rebuilding. On the Asian Paints Sharad Shamman shortlist',
  },
};

export function applyThemeUpdate(p: Pandal): Pandal {
  const u = THEME_UPDATES[p.id];
  const popularity = Math.max(p.popularity, POPULARITY[p.id] ?? 0);
  if (!u) return popularity === p.popularity ? p : { ...p, popularity };
  // A theme that was blanked is no longer a "2026 theme".
  const theme2026 = 'theme' in u ? Boolean(u.theme) : p.theme2026 || Boolean(p.theme);
  return { ...p, ...u, popularity, theme2026 };
}
