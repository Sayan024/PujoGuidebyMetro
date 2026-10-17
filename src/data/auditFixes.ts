/**
 * Corrections from a content audit of every pandal (October 2026): each was checked against
 * OpenStreetMap and 2026 press, then re-checked by a second reviewer before being accepted.
 * Kept apart from the generated pandals.ts so a data rebuild keeps them.
 */

/** Pandals whose stored point was clearly off. Several are area-level (the club's own plot is not mapped). */
export const AUDIT_POSITIONS: Record<string, [lat: number, lng: number]> = {
  "shyam-square": [22.6009, 88.3688],
  "paikpara-14-pally": [22.6186, 88.3899],
  "paikpara-15-pally": [22.6185, 88.3849],
  "golaghata-sammilani": [22.5961, 88.4003],
  "bandhudal-sporting-club-sithir-more": [22.631, 88.379],
  "sinthee-sarbojanin": [22.629, 88.381],
  "tala-park": [22.6115, 88.3841],
  "lake-town-association": [22.6057, 88.403],
  "chhatu-babu-latu-babu-bari": [22.5904, 88.365],
  "darjipara-mitra-bari": [22.5912, 88.3648],
  "beadon-street-sarbojanin": [22.5905, 88.366],
  "friends-union-club": [22.60303, 88.37436],
  "nimtala-sarbojanin": [22.5922, 88.3566],
  "shobhabazar-boro-rajbari": [22.59683, 88.36719],
  "college-square": [22.575, 88.365],
  "pathuriaghata-rajbari": [22.588, 88.3577],
  "laha-bari": [22.5808, 88.3665],
  "subodh-mallick-square": [22.5639, 88.3597],
  "rammohan-sammilani": [22.5773, 88.3694],
  "jorasanko-shib-krishna-daw-bari": [22.5856, 88.3597],
  "taltala-sarbojanin": [22.55454, 88.36217],
  "south-city-mall": [22.50158, 88.36171],
  "kadamtala-sarbojanin": [22.5928, 88.3151],
  "shibpur-mandirtala-sarbojanin": [22.5697, 88.3174],
  "sealdah-athletic-club": [22.571, 88.3719],
  "uddipani-park-circus": [22.5436, 88.37],
  "salt-lake-ib-block": [22.5719, 88.4148],
  "salt-lake-gb-block": [22.5767, 88.4075],
  "bangur-avenue-c-block": [22.6065, 88.4105],
  "masterda-smriti-sangha-prafulla-kanan": [22.603, 88.424],
  "kestopur-prafullakanan-poschim-adhibasibrinda": [22.603, 88.424],
  "aswininagar-bandhu-mahal": [22.6073, 88.4339],
  "arjunpur-amra-sabai-club": [22.6199, 88.4255],
  "chinar-park-adhibasibrinda": [22.6236, 88.441],
  "rail-pukur-united-club": [22.6119, 88.4273],
  "nagerbazar-yuba-sangha": [22.6228, 88.4141],
};

/** The Metro station people actually use, where the listed one was wrong. */
export const AUDIT_STATIONS: Record<string, string> = {
  'beadon-street-sarbojanin': 'shobhabazar-sutanuti',
  'samaj-sebi-sangha': 'kalighat',
  'liluah-agrani-sangha': 'howrah',
  'liluah-goswamipara': 'howrah',
  'college-square-sealdah': 'central',
  'subodh-mallick-square': 'chandni-chowk',
  'rammohan-sammilani': 'mahatma-gandhi-road',
  // Baguiati / Kestopur sit on VIP Road, nearest the Green Line's Central Park and City Centre
  'masterda-smriti-sangha-prafulla-kanan': 'central-park',
  'kestopur-prafullakanan-poschim-adhibasibrinda': 'central-park',
  'keshtopur-prafulla-kanan': 'central-park',
  'aswininagar-bandhu-mahal': 'central-park',
  'rail-pukur-united-club': 'central-park',
  'arjunpur-amra-sabai-club': 'dum-dum-cantonment',
  'chinar-park-adhibasibrinda': 'central-park',
  'nagerbazar-yuba-sangha': 'dum-dum-cantonment',
};

/** The same puja listed twice: the removed id still opens the surviving page. */
export const AUDIT_ALIASES: Record<string, string> = {
  'ramdulal-nibas-durga-pujo': 'chhatu-babu-latu-babu-bari',
  'lebutala-sarbojanin': 'santosh-mitra-square',
  'ajeyo-sanhati-haridevpur': 'ajeya-sanghati',
  'behala-29-pally': 'behala-29-palli',
};
