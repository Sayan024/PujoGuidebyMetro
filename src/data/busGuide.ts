/**
 * "How to reach" bus routes for the Durga Puja areas, from Kolkata Bus-O-Pedia's puja guide posters
 * (North Kolkata phases 1–7, South Kolkata phases 1–12). Bus numbers are copied as published; routes and
 * diversions can change during the festival, so the guide points people to Bus-O-Pedia for the latest.
 * https://www.kolkatabusopedia.com
 */
export const BUS_GUIDE_CREDIT = {
  name: 'Kolkata Bus-O-Pedia',
  site: 'https://www.kolkatabusopedia.com',
  facebook: 'https://www.facebook.com/Kolbusopedia',
  instagram: 'https://www.instagram.com/kolbusopedia/',
};

export interface BusOrigin {
  /** Where the journey starts, as the poster words it. */
  from: string;
  /** The bus (or "bound") the poster names, e.g. "Shyambazar bound". */
  bound: string;
  buses: string[];
  /** What to do after getting off. */
  then?: string;
}

export interface BusArea {
  id: string;
  /** Area name as the poster headlines it. */
  title: string;
  region: 'North' | 'South';
  /** Pandal ids in this guide that the poster lists for the area. */
  pandalIds: string[];
  origins: BusOrigin[];
  /** The poster's Metro advice: the station, and the bus to take from it where it names one. */
  metro: { station: string; bound?: string; buses?: string[]; then?: string };
  /** A tram option the poster gives. */
  tram?: string;
}

export const BUS_AREAS: BusArea[] = [
  // ───────────── North Kolkata ─────────────
  {
    id: 'north-girish-park-sovabazar-bagbazar-tala',
    title: 'Girish Park, Sovabazar, Bagbazar and Tala',
    region: 'North',
    pandalIds: ['darpanarayan-tagore-street-sarbojanin', 'pathuriaghata-pancher-pally', 'ahiritola-sarbojanin', 'beniatola-sarbojanin', 'jagat-mukherjee-park', 'shobhabazar-boro-rajbari', 'shobhabazar-choto-rajbari', 'kumartuli-park', 'kumartuli-sarbojanin', 'bagbazar-sarbojanin', 'tala-barowari', 'tala-prattoy'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Shyambazar bound', buses: ['215/1', '219/1', 'S9A', '47B', '242', '215A'] },
      { from: 'Sealdah', bound: 'Shyambazar / Bagbazar bound', buses: ['240', '230', '227'] },
      { from: 'North East Kolkata', bound: 'Shyambazar bound', buses: ['91C', '79B', '93', 'DN18'] },
      { from: 'South Kolkata', bound: 'Shyambazar bound', buses: ['222', '227', '3C/1', '230', '47B', 'S9A'] },
    ],
    metro: { station: 'Shyambazar, Sovabazar Sutanuti or Girish Park' },
  },
  {
    id: 'north-hatibagan',
    title: 'Hatibagan',
    region: 'North',
    pandalIds: ['sikdar-bagan-sadharan-durgotsav', 'hatibagan-nabin-pally', 'nalin-sarkar-street', 'hatibagan-sarbojanin', 'kashi-bose-lane'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Hatibagan bound', buses: ['219', '78/1', '34B', '215A'] },
      { from: 'Sealdah', bound: 'Khanna bound', buses: ['3C/1', '230', '227', '30D'], then: 'walk towards Hatibagan' },
      { from: 'North East Kolkata', bound: 'Hatibagan bound', buses: ['211', '215A'] },
      { from: 'South Kolkata', bound: 'Khanna / Hatibagan / Sovabazar bound', buses: ['234', '227', '3C/1', 'S9A'] },
    ],
    metro: { station: 'Sovabazar Sutanuti', then: 'walk towards Hatibagan' },
    tram: 'Tram route 5 (Esplanade – Shyambazar) from the CTC tram depot.',
  },
  {
    id: 'north-kankurgachi',
    title: 'Kankurgachi',
    region: 'North',
    pandalIds: ['kankurgachi-yubak-brinda', 'beleghata-33-pally', 'mitali-club-kankurgachi'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Kankurgachi bound', buses: ['44', 'VS1', 'VS2', 'AC39', '46', '46B'] },
      { from: 'Sealdah', bound: 'Kankurgachi bound', buses: ['44', '44/1', '45', '221', 'S3B'] },
      { from: 'North East Kolkata', bound: 'Kankurgachi bound', buses: ['79D', '237', '45'] },
      { from: 'South Kolkata', bound: 'Kankurgachi bound', buses: ['221', '223', '45', '45A'] },
    ],
    metro: { station: 'Phoolbagan' },
  },
  {
    id: 'north-ultadanga',
    title: 'Ultadanga',
    region: 'North',
    pandalIds: ['ultadanga-sangrami', 'ultadanga-pallyshree', 'golaghata-sammilani', 'ultadanga-karbagan', 'telengabagan'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Ultadanga bound', buses: ['215A', 'L238', '217', '30C/1'] },
      { from: 'Sealdah', bound: 'Ultadanga bound', buses: ['260', '30C/1'] },
      { from: 'North East Kolkata', bound: 'Ultadanga bound', buses: ['211', 'K1', '260', 'KB16', 'KB22', 'S30'] },
      { from: 'South Kolkata', bound: 'Ultadanga bound', buses: ['45', 'AC50A', 'AC37', 'V1'] },
    ],
    metro: { station: 'Sovabazar Sutanuti', bound: 'Ultadanga bound', buses: ['211', '215A'] },
  },
  {
    id: 'north-manicktala',
    title: 'Manicktala',
    region: 'North',
    pandalIds: ['chaltabagan-sarbojanin', 'lalabagan-nabankur', 'vrindavan-matri-mandir', 'shimla-vivekananda-sporting-club', 'simla-byayam-samiti'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Manicktala bound', buses: ['L238', 'AC39', 'VS2', 'VS1', '230', '237'] },
      { from: 'Sealdah', bound: 'Manicktala bound', buses: ['230', '260', '227', '3C/1'] },
      { from: 'North East Kolkata', bound: 'Manicktala bound', buses: ['L238', '30C/1', '237', 'Birati mini', 'Baguati mini', '260'] },
      { from: 'South Kolkata', bound: 'Manicktala bound', buses: ['227', '3C/1', '234', 'S3B'] },
    ],
    metro: { station: 'Girish Park or Sealdah', bound: 'Manicktala bound', buses: ['L238', '237', '230', '3C/1'] },
  },
  {
    id: 'north-central',
    title: 'Central (College Street)',
    region: 'North',
    pandalIds: ['mohammad-ali-park', 'college-square', 'santosh-mitra-square'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Central bound', buses: ['L238', '78', '222', '242', 'S9A'] },
      { from: 'Sealdah', bound: 'College Street bound', buses: ['240', '44', '28', '72'] },
      { from: 'North East Kolkata', bound: 'Central bound', buses: ['237', 'AC39', 'VS1', 'VS2', 'Birati mini', 'Baguati mini'] },
      { from: 'South Kolkata', bound: 'Central bound', buses: ['222', '47B', 'S9A'] },
    ],
    metro: { station: 'M.G. Road' },
  },
  {
    id: 'north-lake-town-dum-dum-park',
    title: 'Lake Town and Dum Dum Park',
    region: 'North',
    pandalIds: ['sreebhumi-sporting-club', 'lake-town-adhibasi-brinda', 'laketown-netaji-sporting-club', 'dum-dum-park-bharat-chakra', 'dum-dum-park-yubak-brinda', 'dum-dum-park-tarun-dal', 'dum-dum-park-tarun-sangha', 'kestopur-prafullakanan-poschim-adhibasibrinda', 'arjunpur-amra-sabai-club'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Dum Dum Park bound', buses: ['12C/2', '44', '46', '237', '30C', 'L238'] },
      { from: 'Sealdah', bound: 'Dum Dum Park bound', buses: ['45', '44', '12C/2'] },
      { from: 'North Kolkata', bound: 'Dum Dum Park bound', buses: ['211', '91C'] },
      { from: 'South Kolkata', bound: 'Dum Dum Park bound', buses: ['V1', 'AC37', 'AC50A', 'Barasat Baruipur / Garia', '45', '45A'] },
    ],
    metro: { station: 'Belgachia', bound: 'Dum Dum Park bound', buses: ['227', '3C/1', '79B', '93'] },
  },
  // ───────────── South Kolkata ─────────────
  {
    id: 'south-behala-barisha-thakurpukur',
    title: 'Behala, Barisha and Thakurpukur',
    region: 'South',
    pandalIds: ['behala-friends', 'behala-notun-dal', 'behala-shree-sangha', 'debdaru-fatak-behala', 'barisha-club', 'barisha-tarun-tirtha', 'barisha-yuba-brinda', 'thakurpukur-sb-park'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Thakurpukur / Behala bound', buses: ['S12D', 'AC52', '12C/1A', '18A', '18D'] },
      { from: 'Sealdah', bound: 'Thakurpukur / Behala bound', buses: ['S3A', 'S3B', '235'] },
      { from: 'Ballygunge / Gariahat', bound: 'Thakurpukur / Behala bound', buses: ['18C', '18B/1', 'SD76', 'S22', 'S3W'] },
      { from: 'Diamond Harbour / Amtala', bound: 'Thakurpukur / Behala bound', buses: ['SD18', '83', '235', 'SD76', 'ACT37'] },
    ],
    metro: { station: 'Rabindra Sarobar', bound: 'Behala bound', buses: ['SD4', '21/1'] },
  },
  {
    id: 'south-kasba-new-alipore',
    title: 'Kasba and New Alipore',
    region: 'South',
    pandalIds: ['kasba-bosepukur-sitala-mandir', 'bosepukur-talbagan', 'rajdanga-naba-uday-sangha', 'suruchi-sangha', 'behala-buroshibtala'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Kasba bound', buses: ['AC24', '47B', '3C/1', 'Anandapur mini'] },
      { from: 'Sealdah', bound: 'Kasba bound', buses: ['3C/1', '45A'] },
      { from: 'Ballygunge / Rashbehari', bound: 'Ruby bound', buses: ['3C/1', 'V1', 'S22', '18C', 'AC24'] },
      { from: 'North and North East Kolkata', bound: 'Kasba bound', buses: ['V1', '3C/1', '47B', 'Barasat Bgarden', 'D10'] },
    ],
    metro: { station: 'Kalighat', bound: 'Kasba bound', buses: ['18C', '3C/1', 'V1', 'AC24'] },
  },
  {
    id: 'south-chetla-alipore',
    title: 'Chetla and Alipore',
    region: 'South',
    pandalIds: ['chetla-agrani', 'alipore-sarbojanin', 'chetla-akal-bodhan', 'suruchi-sangha', 'behala-buroshibtala'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Rashbehari bound', buses: ['E1', 'S7', 'AC6', '41', '37A'], then: 'walk towards Chetla' },
      { from: 'Sealdah', bound: 'Rashbehari bound', buses: ['21/1', '3C/1'], then: 'walk towards Chetla' },
      { from: 'Ruby / Ballygunge', bound: 'Rashbehari bound', buses: ['SD76', 'S22', 'AC24', 'EB3', 'V1'], then: 'walk towards Chetla' },
      { from: 'Thakurpukur / Behala', bound: 'Rashbehari bound', buses: ['21/1', 'S22', 'S3W', 'ACT35', 'SD76'], then: 'walk towards Chetla' },
    ],
    metro: { station: 'Kalighat', then: 'walk towards Chetla' },
  },
  {
    id: 'south-gariahat',
    title: 'Gariahat',
    region: 'South',
    pandalIds: ['ekdalia-evergreen', 'singhi-park', 'hindustan-park', 'hindusthan-club'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Gariahat bound', buses: ['S10A', 'AC5', '37A', '80B'] },
      { from: 'Sealdah', bound: 'Gariahat bound', buses: ['3C/1', '45', '45A', '234', '223'] },
      { from: 'North or North East Kolkata', bound: 'Gariahat bound', buses: ['S9A', 'V1', '45', '234'] },
      { from: 'Thakurpukur / Behala', bound: 'Gariahat bound', buses: ['S22', 'S3W', 'SD76', '18B/1', '18C'] },
    ],
    metro: { station: 'Kalighat', bound: 'Gariahat bound', buses: ['EB3', 'AC24', '3C/1'] },
  },
  {
    id: 'south-kidderpore',
    title: 'Kidderpore',
    region: 'South',
    pandalIds: ['kidderpore-25-pally', 'kidderpore-75-pally', 'nabarag-khidirpur', 'kidderpore-pally-sharadiya', 'kabitirtha-sarbojanin', 'kidderpore-udayan'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Kidderpore bound', buses: ['12C', 'S12D', 'AC52', '37', '17'] },
      { from: 'Sealdah', bound: 'Kidderpore bound', buses: ['3A', '3B', '227', '235'] },
      { from: 'Ballygunge / Jadavpur', bound: 'Kidderpore bound', buses: ['1', '1A'] },
      { from: 'Thakurpukur / Behala', bound: 'Kidderpore bound', buses: ['3A', '3B', '12C/1A', 'AC52'] },
    ],
    metro: { station: 'Jatin Das Park', bound: 'Kidderpore bound', buses: ['1', '1A', '42A', '17'] },
  },
  {
    id: 'south-haridevpur',
    title: 'Haridevpur',
    region: 'South',
    pandalIds: ['haridevpur-41-pally', 'ajeya-sanghati', 'vivekananda-sporting-club', 'vivekananda-park-athletic-club'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Haridevpur bound', buses: ['S4C', '40B', '12C/1B'] },
      { from: 'Ballygunge / Jadavpur', bound: 'Haridevpur bound', buses: ['Sarada Park mini', 'AC31', 'S31', 'D10'] },
      { from: 'Thakurpukur', bound: 'Haridevpur bound', buses: ['40B', '12C/1B', 'D10'] },
    ],
    metro: { station: 'Mahanayak Uttam Kumar (Tollygunge)', bound: 'Haridevpur bound', buses: ['40B', 'S31', 'AC31'] },
  },
  {
    id: 'south-garia-naktala',
    title: 'Garia and Naktala',
    region: 'South',
    pandalIds: ['garia-nabadurga', 'garia-pancha-durga', 'jatra-suru-sangha', 'naktala-udayan-sangha'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Garia bound', buses: ['S5', 'S7', 'AC5', 'AC6', '80A', '80B', 'Garia mini', 'Naktala mini'] },
      { from: 'Sealdah', bound: 'Garia bound', buses: ['45', '45B', 'KB17'] },
      { from: 'Gariahat / Jadavpur', bound: 'Garia bound', buses: ['45', '218', 'AC5'] },
      { from: 'Thakurpukur / Behala', bound: 'Garia bound', buses: ['SD5'] },
      { from: 'North and North East Kolkata', bound: 'Garia bound', buses: ['AC50A', 'AC37', 'AC37A'] },
    ],
    metro: { station: 'Kavi Nazrul (Garia Bazar) or Gitanjali (Naktala)' },
  },
  {
    id: 'south-bhowanipore',
    title: 'Bhowanipore',
    region: 'South',
    pandalIds: ['rupchand-mukherjee-lane-sarbojanin', 'abasar-sarbojanin', 'golmath-durga-puja', 'chakraberia-sarbojanin'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Bhowanipore bound', buses: ['S5', 'S7', 'AC6', 'AC1', '37A', 'E1', 'S10A', 'S9A', '41'] },
      { from: 'Sealdah', bound: 'Bhowanipore bound', buses: ['21/1', '3C/1'] },
      { from: 'Ballygunge / Jadavpur', bound: 'Bhowanipore bound', buses: ['3C/1', 'E1', 'AC1', 'AC24'] },
      { from: 'Thakurpukur / Behala', bound: 'Hazra bound', buses: ['18C', '18B/1', 'SD8'] },
      { from: 'North and North East Kolkata', bound: 'Bhowanipore bound', buses: ['47B', 'S9A', '3C/1'] },
    ],
    metro: { station: 'Netaji Bhavan' },
  },
  {
    id: 'south-rashbehari',
    title: 'Rashbehari',
    region: 'South',
    pandalIds: ['mudiali-club', 'shib-mandir-sarbojanin', 'badamtala-ashar-sangha', '66-pally', 'nepal-bhattacharjee-street'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Rashbehari bound', buses: ['E1', 'AC1', '37A', '41', 'S7'] },
      { from: 'Sealdah', bound: 'Rashbehari bound', buses: ['45B', '3C/1', '21/1'] },
      { from: 'Ballygunge / Jadavpur', bound: 'Rashbehari bound', buses: ['37A', 'E1', 'S5', 'AC5'] },
      { from: 'Thakurpukur / Behala', bound: 'Rashbehari bound', buses: ['SD76', '21/1', 'S22', 'S3W'] },
      { from: 'North and North East Kolkata', bound: 'Rashbehari bound', buses: ['3C/1', '47B', 'V1'] },
    ],
    metro: { station: 'Kalighat' },
  },
  {
    id: 'south-deshapriya-park',
    title: 'Deshapriya Park',
    region: 'South',
    pandalIds: ['deshapriya-park', 'tridhara-sammilani', 'ballygunge-cultural', 'samaj-sebi-sangha', 'maddox-square'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Deshapriya Park bound', buses: ['E1', 'AC5', 'S5', 'S10A', 'S9A', '212'] },
      { from: 'Sealdah', bound: 'Deshapriya Park bound', buses: ['234', '221'] },
      { from: 'Ballygunge / Jadavpur', bound: 'Deshapriya Park bound', buses: ['3C/1', 'AC24', 'AC5', '1B', '80B', '13C'] },
      { from: 'Thakurpukur / Behala', bound: 'Deshapriya Park bound', buses: ['SD76', 'S22', 'S3W', 'ACT35'] },
      { from: 'North and North East Kolkata', bound: 'Rashbehari bound', buses: ['D10', 'Barasat Bgarden', '3C/1', '234', 'S9A', 'V1'] },
    ],
    metro: { station: 'Kalighat', then: 'walk towards Deshapriya Park' },
  },
  {
    id: 'south-dhakuria',
    title: 'Dhakuria and Jodhpur Park',
    region: 'South',
    pandalIds: ['babubagan-sarbojanin', '95-pally-jodhpur-park', 'selimpur-pally', 'jodhpur-park-sarbojanin'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Dhakuria bound', buses: ['E1', 'AC5', 'S5', '37', '37A'] },
      { from: 'Sealdah', bound: 'Dhakuria bound', buses: ['45', '223', '234'] },
      { from: 'Rashbehari / Gariahat', bound: 'Dhakuria bound', buses: ['13C', '80B', 'AC5', '45'] },
      { from: 'Thakurpukur / Behala', bound: 'Jadavpur PS bound', buses: ['SD4', 'S31', 'AC31'] },
      { from: 'North and North East Kolkata', bound: 'Dhakuria bound', buses: ['45', '223', '234', '240'] },
    ],
    metro: { station: 'Rabindra Sarovar', bound: 'Jadavpur PS bound', buses: ['1A', '45B', '47B', 'AC1'] },
  },
  {
    id: 'south-santoshpur',
    title: 'Santoshpur',
    region: 'South',
    pandalIds: ['santoshpur-lake-pally', 'santoshpur-avenue-south-club', 'santoshpur-trikon-park', 'pally-mangal-samity'],
    origins: [
      { from: 'Howrah / Esplanade', bound: 'Santoshpur bound', buses: ['37A Santoshpur mini'], then: 'or take E1 or AC1 up to Sulekha, then walk towards Santoshpur' },
      { from: 'Sealdah', bound: 'Jadavpur bound', buses: ['45'], then: 'then walk towards Santoshpur' },
      { from: 'Gariahat / Ruby', bound: 'Santoshpur bound', buses: ['S9', 'AC9', '37A', 'SD16'] },
      { from: 'Thakurpukur / Behala', bound: 'Santoshpur bound', buses: ['SD16'], then: 'or take S31 or AC31 up to Sulekha, then walk towards Santoshpur' },
      { from: 'North and North East Kolkata', bound: 'Ajaynagar bound', buses: ['Barasat Baruipur', 'AC50A', 'AC37'], then: 'then a Santoshpur-bound bus: S9, AC9, 1A or 1B' },
    ],
    metro: { station: 'Rabindra Sarobar', bound: 'Santoshpur bound', buses: ['1A'] },
  },
];

const AREAS_BY_PANDAL = new Map<string, BusArea[]>();
for (const a of BUS_AREAS) for (const id of a.pandalIds) AREAS_BY_PANDAL.set(id, [...(AREAS_BY_PANDAL.get(id) ?? []), a]);

/** The bus guides for a pandal's area, when the posters cover it (a few pandals sit on two posters). */
export const busAreasOf = (pandalId: string): BusArea[] => AREAS_BY_PANDAL.get(pandalId) ?? [];
