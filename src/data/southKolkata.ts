import type { Pandal } from './types.ts';
import { STATIONS, STATION_LIST } from './metroLines.ts';

/**
 * South Kolkata alignment, cross-checked against the hand-drawn puja-hopping maps
 * (Behala–Khidirpur along Diamond Harbour Road, Hazra–Gariahat–Jadavpur–Garia, and
 * Santoshpur–Patuli off the E.M. Bypass).
 *
 * Coordinates are the pandal points mapped on OpenStreetMap (October 2026). Kept apart
 * from the generated pandals.ts so a data rebuild does not undo them.
 */
export const LOCATION_FIXES: Record<string, [lat: number, lng: number]> = {
  // Bhowanipore, Hazra and Kalighat
  'chakraberia-sarbojanin': [22.53357, 88.3522],
  'bhowanipur-75-pally': [22.5326, 88.34544],
  'harish-park': [22.53054, 88.34367],
  'abasar-sarbojanin': [22.52814, 88.34867],
  '68-pally': [22.52888, 88.34629],
  '76-pally': [22.53374, 88.34305],
  'paddapukur-youth-association': [22.52936, 88.34971],
  '22-pally-northern-park': [22.5354, 88.35037],
  'hazra-park-durgotsav': [22.52484, 88.34614],
  'bakulbagan-sarbojanin': [22.52682, 88.34795],
  'forward-club': [22.52313, 88.34363],
  '23-pally': [22.52546, 88.34408],
  'matri-mandir': [22.51951, 88.35075],
  'maddox-square': [22.52651, 88.35485],
  'alipore-sarbojanin': [22.51963, 88.33366],
  '66-pally': [22.51824, 88.34286],
  'badamtala-ashar-sangha': [22.51793, 88.34416],
  'nepal-bhattacharjee-street': [22.51803, 88.34329],
  'pratapaditya-road-tricone-park': [22.51354, 88.34465],
  'chetla-agrani': [22.51643, 88.33719],
  'suruchi-sangha': [22.5091, 88.33418],
  // Rashbehari to Gariahat, and the lakes
  'deshapriya-park': [22.51844, 88.35352],
  'tridhara-sammilani': [22.51958, 88.35535],
  'hindustan-park': [22.51787, 88.36209],
  'hindusthan-club': [22.51951, 88.36059],
  'ballygunge-cultural': [22.51588, 88.35582],
  'singhi-park': [22.52122, 88.36301],
  'ekdalia-evergreen': [22.52125, 88.36596],
  'samaj-sebi-sangha': [22.51474, 88.356],
  'shib-mandir-sarbojanin': [22.51106, 88.35002],
  'mudiali-club': [22.51007, 88.34663],
  'lake-gardens-peoples-association': [22.50597, 88.35611],
  'dhakuria-sarbojanin': [22.51003, 88.37199],
  'saraswati-sammilani': [22.51068, 88.37645],
  // Tollygunge, Haridevpur and Naktala
  'vivekananda-park-athletic-club': [22.48136, 88.33731],
  'vivekananda-sporting-club': [22.47632, 88.33859],
  'haridevpur-41-pally': [22.48302, 88.33842],
  'ajeya-sanghati': [22.48096, 88.33753],
  'naktala-pally-unnayan-samiti': [22.47815, 88.34219],
  'naktala-udayan-sangha': [22.47449, 88.36657],
  'garia-nabadurga': [22.46248, 88.38092],
  // Behala and Barisha, Diamond Harbour Road
  'barisha-sarbojanin': [22.47999, 88.30808],
  'barisha-club': [22.48071, 88.31295],
  tapoban: [22.47649, 88.31034],
  'bhola-maheshwartala-sarbojanin': [22.48085, 88.30884],
  'uttar-barisha': [22.48056, 88.31439],
  'barisha-yuba-brinda': [22.48573, 88.31202],
  janakalyan: [22.48462, 88.31266],
  'barisha-netaji-sangha': [22.48573, 88.31534],
  'nabalila-para-united-club': [22.488, 88.31423],
  'barisha-nabin-sangha': [22.4832, 88.311],
  'barisha-tarun-tirtha': [22.48041, 88.3178],
  jagarani: [22.4898, 88.32224],
  'behala-11-pally': [22.49992, 88.32215],
  'behala-shree-sangha': [22.49791, 88.32036],
  'behala-notun-dal': [22.49629, 88.31765],
  'mitra-sangha': [22.50079, 88.32276],
  'agradut-club': [22.5026, 88.31192],
  'nandana-yuba-sangha': [22.50186, 88.32536],
  'behala-club': [22.50537, 88.31428],
  'netaji-sangha': [22.50516, 88.31143],
  'naskarpur-sarbojanin': [22.5071, 88.31229],
  'behala-29-pally': [22.50703, 88.32276],
  'behala-young': [22.51091, 88.32354],
  'mitali-sangha': [22.50464, 88.33244],
  'parnashree-palli': [22.50902, 88.29914],
  // Santoshpur, Kasba and the E.M. Bypass
  'santoshpur-lake-pally': [22.49178, 88.38319],
  'santoshpur-trikon-park': [22.49318, 88.37845],
  'avenue-pally-mangal': [22.48967, 88.38295],
  'rabindra-pally-sarbojanin': [22.48253, 88.38241],
  'purba-rajpur': [22.48961, 88.3916],
  'madhya-garfa-sarbojanin': [22.50258, 88.38536],
  'ramlal-bazar-sarbojanin': [22.50753, 88.38515],
  'purbachal-sarbojanin': [22.50609, 88.39853],
  'kalitala-sporting': [22.50611, 88.39736],
  'rajdanga-naba-uday-sangha': [22.51695, 88.39143],
  'kasba-bosepukur-sitala-mandir': [22.51917, 88.38475],
  'vip-nagar-sarbojanin': [22.5237, 88.39886],
  'sunil-nagar': [22.52851, 88.3848],
  'milan-tirtha': [22.5286, 88.39311],
};

const kmBetween = (aLat: number, aLng: number, bLat: number, bLng: number) => {
  const r = Math.PI / 180;
  const h = Math.sin(((bLat - aLat) * r) / 2) ** 2 + Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(((bLng - aLng) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

/** Ties a pandal to its nearest Metro station, with walking figures from that station. */
export function alignToMetro(p: Pandal, lat: number, lng: number): Pandal {
  let station = STATIONS[p.stationId];
  let crow = station ? kmBetween(lat, lng, station.lat, station.lng) : Infinity;
  for (const s of STATION_LIST) {
    const d = kmBetween(lat, lng, s.lat, s.lng);
    // Keep the listed station unless another is clearly closer.
    if (d < crow - 0.15) [station, crow] = [s, d];
  }
  // Straight line × 1.25 approximates the walk through the lanes; ~11 minutes per km.
  const distanceKm = Math.max(0.1, Math.round(crow * 1.25 * 10) / 10);
  const moved = station.id !== p.stationId;
  return {
    ...p,
    station: station.name,
    stationId: station.id,
    line: station.lines.includes(p.line) ? p.line : station.lines[0],
    distanceKm,
    walkingMinutes: Math.round(distanceKm * 11),
    access: distanceKm > 4 ? 'cab' : distanceKm > 2 ? (p.access ?? 'auto') : p.access,
    metroExit: moved ? `${station.name} Metro` : p.metroExit,
    latitude: lat,
    longitude: lng,
    mapUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`,
  };
}

/** A new pandal record, tied to its nearest Metro station. */
export const newPandal = (id: string, name: string, lat: number, lng: number, locality: string, description: string, extra: Partial<Pandal> = {}): Pandal =>
  alignToMetro(
    {
      id,
      name,
      station: '',
      stationId: '',
      line: 'blue',
      distanceKm: 0,
      walkingMinutes: 0,
      theme: '',
      category: 'Heritage Kolkata',
      popularity: 70,
      image: 'durga_face',
      hasPhoto: false,
      description,
      artist: 'Not announced',
      darshanTime: 'Open morning to late night during puja days',
      hours: 'day',
      metroExit: '',
      latitude: lat,
      longitude: lng,
      tags: [locality, 'South Kolkata'],
      mapUrl: '',
      traditional: true,
      theme2026: false,
      vip: false,
      petpujo: false,
      locality,
      source: 'Hand-drawn South Kolkata puja-hopping map; location from OpenStreetMap',
      verifiedAt: 'October 2026',
      verificationStatus: 'needs_verification',
      ...extra,
    },
    lat,
    lng,
  );

/** Pandals on the hopping maps that the guide did not list before. */
export const SOUTH_KOLKATA_ADDITIONS: Pandal[] = [
  // Khidirpur cluster, the northern end of the Behala route
  newPandal('kidderpore-25-pally', 'Kidderpore 25 Pally', 22.53848, 88.3266, 'Khidirpur', 'One of the Khidirpur cluster at the top of the Diamond Harbour Road route, a short walk from 74 Pally, Kabitirtha and Nabarag.'),
  newPandal('kidderpore-74-pally', 'Kidderpore 74 Pally', 22.53978, 88.32512, 'Khidirpur', 'Khidirpur neighbourhood puja, a few lanes from 25 Pally; see the whole Khidirpur cluster in one walk.'),
  newPandal('kabitirtha-sarbojanin', 'Kabitirtha Sarbojanin', 22.54113, 88.3216, 'Khidirpur', 'Watganj–Khidirpur puja off Kabitirtha Sarani, known for large themed pandals. Next door to Nabarag.'),
  newPandal('nabarag-khidirpur', 'Nabarag', 22.5413, 88.32079, 'Khidirpur', 'Hemchandra Street, Watganj. Pairs with Kabitirtha, two minutes away.'),
  newPandal('kidderpore-pally-sharadiya', 'Kidderpore Pally Sharadiya', 22.54306, 88.32109, 'Khidirpur', 'The last stop of the Khidirpur cluster, north of Kabitirtha.'),
  // Behala, Diamond Harbour Road
  newPandal('players-corner-behala', "Players' Corner", 22.48533, 88.3138, 'Behala', "Neighbourhood puja off Janakalyan Road by Behala Chowrasta, popularly known as Sourav Ganguly's para puja.", { popularity: 76 }),
  newPandal('kfr-ground-behala', 'KFR Ground Puja', 22.50234, 88.32171, 'Behala', 'Puja on KFR Ground near the Behala 14 No. bus stop, in the same walk as Behala Friends, Notun Dal and Debdaru Fatak.'),
  // Hazra
  newPandal('golmath-durga-puja', 'Golmath Durga Puja Samiti', 22.52693, 88.34954, 'Bhowanipore', 'Rakhal Mukherjee Road, between Abasar and Bakulbagan, north of Hazra More.'),
  // Jadavpur, off Gariahat Road
  newPandal('jodhpur-park-sarbojanin', 'Jodhpur Park Sarbojanin', 22.50458, 88.3656, 'Jodhpur Park', 'Big-budget South Kolkata puja on Jodhpur Park Road, left off Gariahat Road on the way to Jadavpur. 95 Pally is a few minutes north.', { popularity: 80 }),
  newPandal('95-pally-jodhpur-park', '95 Pally', 22.50834, 88.36323, 'Jodhpur Park', 'Dhakuria–Jodhpur Park puja on Rahim Ostagar Lane; walk on to Jodhpur Park Sarbojanin.', { popularity: 76 }),
  newPandal('babubagan-sarbojanin', 'Babubagan Sarbojanin', 22.50793, 88.36864, 'Dhakuria', 'Babu Bagan Lane, Dhakuria, right off Gariahat Road opposite Jodhpur Park.', { popularity: 74 }),
  newPandal('netaji-jatiya-sebadal-ranikuthi', 'Ranikuthi Netaji Jatiya Sebadal', 22.48334, 88.35464, 'Ranikuthi', 'Ranikuthi puja on the road from Tollygunge towards Garia, near Netaji (Kudghat) Metro.'),
  // Garia
  newPandal('garia-pancha-durga', 'Garia Pancha Durga', 22.46154, 88.3783, 'Garia', 'Kamdhari Road, Garia, near Garia Naba Durga at the southern end of the route.'),
  // Park Street
  newPandal(
    'allen-park-park-street',
    'Allen Park Durga Puja (Kolkata Sanatani Sangha)',
    22.55028,
    88.35447,
    'Park Street',
    "Park Street's first-ever Durga Puja, in Allen Park, the home of the Christmas festival. Theme by Subrata Bandyopadhyay on Shiva's leela: the Rudra form, his love for Parvati, and the tandava of creation and destruction. Varanasi-style evening aarti from Chaturthi to Dashami, Baul and folk programmes from Purulia, Bankura and North Bengal, all-night jagaran from Ashtami to Navami and sindoor khela on Dashami. Expect big crowds; the Park Street–Middleton Street stretch may close to cars.",
    {
      theme: 'Shiva Leela: Tandav o Laya',
      category: 'Mythology',
      artist: 'Subrata Bandyopadhyay',
      popularity: 88,
      theme2026: true,
      traditional: false,
      darshanTime: 'Evening aarti daily from Chaturthi to Dashami; open till late night',
      tags: ['Park Street', 'First year', 'Ganga-style aarti', 'Central Kolkata'],
      source: 'Sangbad Pratidin, Organiser and Zee 24 Ghanta reports; location from OpenStreetMap',
      verificationStatus: 'verified',
    },
  ),
];
