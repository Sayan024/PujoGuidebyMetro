import type { Pandal } from './types.ts';
import { newPandal } from './southKolkata.ts';

/**
 * Pins from "The Ultimate Pujo Map of Kolkata and Howrah" (Google My Maps), October 2026.
 * GENERATED from the map's KML by a curation script; review changes before regenerating.
 *
 * PIN_FIXES moves pandals whose stored position was clearly off. Positions already checked
 * against OpenStreetMap (southKolkata.ts) are never moved.
 */
export const PIN_FIXES: Record<string, [lat: number, lng: number]> = {
  "ahiritola-jubak-brinda": [22.5945, 88.3595], // was 1316 m off
  "ahiritola-sarbojanin": [22.596, 88.3587], // was 1352 m off
  "bagbazar-sarbojanin": [22.6048, 88.3647], // was 280 m off
  "belgachia-sarbojanin": [22.609217, 88.383423], // was 551 m off
  "beniatola-sarbojanin": [22.594, 88.3605], // was 1247 m off
  "chaltabagan-lohapatty": [22.5878, 88.3738], // was 287 m off
  "gouriberia": [22.594547, 88.379227], // was 1344 m off
  "hari-ghosh-street": [22.5935, 88.368], // was 1582 m off
  "hatibagan-nabin-pally": [22.5937, 88.3741], // was 1271 m off
  "hatibagan-sarbojanin": [22.5948, 88.3728], // was 423 m off
  "nalin-sarkar-street": [22.5958, 88.3712], // was 966 m off
  "kashi-bose-lane": [22.5913, 88.3698], // was 1046 m off
  "hatkhola-goshaipara": [22.597885, 88.360771], // was 987 m off
  "kumartuli-park": [22.5985, 88.3603], // was 1369 m off
  "kumartuli-sarbojanin": [22.5998, 88.3612], // was 1313 m off
  "lalabagan-nabankur": [22.588247, 88.377106], // was 1547 m off
  "ultadanga-bidhan-sangha": [22.592875, 88.383232], // was 3403 m off
  "pathuriaghata-pancher-pally": [22.589, 88.36], // was 1341 m off
  "jagat-mukherjee-park": [22.5993, 88.369], // was 1073 m off
  "simla-byayam-samiti": [22.585285, 88.365097], // was 812 m off
  "tala-barowari": [22.6085, 88.3755], // was 1322 m off
  "tala-prattoy": [22.6089319, 88.382574], // was 664 m off
  "telengabagan": [22.5952, 88.3862], // was 654 m off
  "ultadanga-karbagan": [22.5955, 88.3855], // was 2878 m off
  "ultadanga-yuba-brinda": [22.595916, 88.3823154], // was 908 m off
  "kabiraj-bagan": [22.593855, 88.382729], // was 1331 m off
  "mohammad-ali-park": [22.5788, 88.3595], // was 503 m off
  "college-square-sealdah": [22.5747, 88.364], // was 1921 m off
  "janbazar-rajbari-rani-rashmoni-bari": [22.56, 88.355], // was 1193 m off
  "santosh-mitra-square": [22.5665, 88.3645], // was 660 m off
  "santosh-mitra-square-sealdah": [22.5665, 88.3645], // was 1144 m off
  "vrindavan-matri-mandir": [22.5825241, 88.3732045], // was 1624 m off
  "beleghata-33-pally": [22.566563, 88.393852], // was 882 m off
  "beleghata-sandhani-club": [22.565, 88.396], // was 1710 m off
  "mitali-club-kankurgachi": [22.58, 88.392], // was 1242 m off
  "lake-town-adhibasi-brinda": [22.604, 88.4015], // was 2950 m off
  "sreebhumi-sporting-club": [22.6013, 88.4048], // was 4123 m off
  "salt-lake-ae-block": [22.59856, 88.409409], // was 982 m off
  "salt-lake-ab-block": [22.593313, 88.3997852], // was 581 m off
  "salt-lake-ad-block": [22.596855, 88.406448], // was 1569 m off
  "salt-lake-ag-block": [22.598421, 88.423286], // was 1335 m off
  "salt-lake-ah-block": [22.594231, 88.427269], // was 1760 m off
  "salt-lake-aj-block": [22.592161, 88.428291], // was 1751 m off
  "salt-lake-ak-block": [22.5891537, 88.4313014], // was 2219 m off
  "salt-lake-bd-block": [22.5948864, 88.4082726], // was 358 m off
  "salt-lake-be-block-part-2": [22.596836, 88.412193], // was 653 m off
  "salt-lake-ce-block": [22.5949341, 88.4131218], // was 433 m off
  "salt-lake-ec-block": [22.5852613, 88.4092955], // was 1057 m off
  "laboni-estate": [22.583099, 88.4069754], // was 684 m off
  "salt-lake-bj-block": [22.590794, 88.42672], // was 1079 m off
  "salt-lake-bl-block": [22.5846852, 88.4313014], // was 279 m off
  "salt-lake-fd-block": [22.583464, 88.412216], // was 1020 m off
  "salt-lake-fe-block": [22.5815762, 88.4179705], // was 1504 m off
  "salt-lake-gd-block": [22.576777, 88.414162], // was 2001 m off
  "salt-lake-ib-block": [22.5735, 88.411], // was 1439 m off
  "dum-dum-park-bharat-chakra": [22.610662, 88.41433], // was 4920 m off
  "dum-dum-park-sarbojanin": [22.6094363, 88.4164052], // was 1904 m off
  "dum-dum-park-tarun-sangha": [22.610723, 88.413628], // was 1231 m off
  "dum-dum-park-yubak-brinda": [22.605478, 88.417732], // was 2410 m off
  "dum-dum-park-tarun-dal": [22.611732, 88.418739], // was 1035 m off
  "37-pally": [22.574528, 88.368446], // was 1612 m off
  "bosepukur-talbagan": [22.517492, 88.38533], // was 1365 m off
  "purbachal-shakti-sangha": [22.505142, 88.389214], // was 1640 m off
  "ultadanga-sangrami": [22.590536, 88.395699], // was 4401 m off
  "behala-buroshibtala": [22.502289, 88.329735], // was 2872 m off
  "shibpur-mandirtala-sarbojanin": [22.5715, 88.3225], // was 705 m off
  "olabibitala-sarbojanin": [22.575529, 88.315788], // was 961 m off
};

type Row = [id: string, name: string, lat: number, lng: number, locality: string, area: string, region: string, bonedi: boolean];

/** Pujas on the map that the guide did not list. */
const ROWS: Row[] = [
  ["baghbazar-pally", "Baghbazar Pally", 22.604, 88.366, "Bagbazar", "Bagbazar & Shyambazar", "North Kolkata", false],
  ["naba-baghbazar", "Naba Baghbazar", 22.605097, 88.370171, "Bagbazar", "Bagbazar & Shyambazar", "North Kolkata", false],
  ["ramdulal-nibas-durga-pujo", "Ramdulal Nibas Durga Pujo", 22.5905, 88.368, "Beadon Street", "Hatibagan & Beadon St", "Bonedi Barir Pujo", true],
  ["dakshineswar-dolpere-adi-sarbojanin", "Dakshineswar Dolpere Adi Sarbojanin", 22.659449, 88.364433, "Dakshineswar", "Tala Belgachia Dakshineswar", "North Kolkata", false],
  ["deshbandhu-ladies-park", "Deshbandhu Ladies Park", 22.601, 88.377, "Deshbandhu Park, Shyambazar", "Bagbazar & Shyambazar", "North Kolkata", false],
  ["srimani-barir-durga-pujo", "Srimani Barir Durga Pujo", 22.5818002, 88.3738888, "Hatibagan", "Hatibagan & Beadon St", "Bonedi Barir Pujo", true],
  ["hathkhola-dutta-barir-durga-pujo", "Hathkhola Dutta Barir Durga Pujo", 22.5928457, 88.3549315, "Hatkhola", "Jorabagan & Pathuriaghata", "Bonedi Barir Pujo", true],
  ["azad-hind-bag", "Azad Hind Bag (Hedua Park)", 22.5875, 88.3705, "Hedua / Goabagan", "Hatibagan & Beadon St", "North Kolkata", false],
  ["goabagan-sarbojanin", "Goabagan Sarbojanin", 22.59124, 88.372864, "Hedua / Goabagan", "Hatibagan & Beadon St", "North Kolkata", false],
  ["sammilita-lalabagan-sarbojanin", "Sammilita Lalabagan Sarbojanin", 22.587385, 88.376923, "Lalabagan", "Manicktala & Ultadanga", "North Kolkata", false],
  ["durga-puja-of-4-ghosh-lane", "Durga Puja of 4 Ghosh Lane", 22.585108, 88.370789, "Manicktala / Amherst Street", "Manicktala & Ultadanga", "Bonedi Barir Pujo", true],
  ["darpanarayan-tagore-street-sarbojanin", "Darpanarayan Tagore Street Sarbojanin", 22.587505, 88.354111, "Pathuriaghata", "Jorabagan & Pathuriaghata", "North Kolkata", false],
  ["joramandir-sarbojanin", "Joramandir Sarbojanin", 22.613289, 88.429512, "VIP Road (Anupama)", "Dum Dum & Lake Town", "North Kolkata", false],
  ["shimla-vivekananda-sporting-club", "Shimla Vivekananda Sporting Club", 22.587, 88.369, "Simla / Bidhan Sarani", "Hatibagan & Beadon St", "North Kolkata", false],
  ["tala-palli", "Tala Palli", 22.609, 88.378, "Tala", "Tala Belgachia Dakshineswar", "North Kolkata", false],
  ["durgabari", "Durgabari", 22.499889, 88.315765, "Behala", "Behala & Barisha", "South Kolkata", false],
  ["bharat-mata", "Bharat Mata", 22.488014, 88.36248, "Surya Nagar, Tollygunge", "Tollygunge & New Alipore", "South Kolkata", false],
  ["shurir-bagan", "Shurir Bagan", 22.594559, 88.387566, "Hedua / Goabagan", "Hatibagan & Beadon St", "North Kolkata", false],
  ["sammilita-malapara", "Sammilita Malapara", 22.588, 88.3585, "Jorabagan", "Jorabagan & Pathuriaghata", "North Kolkata", false],
  ["ghas-bagan-sarbojanin", "Ghas Bagan Sarbojanin", 22.591923, 88.343468, "Howrah", "Howrah - Shibpur & Andul", "Howrah", false],
  ["rammohan-sammilani", "Rammohan Sammilani", 22.581205, 88.375031, "Amherst Street", "College St & Sealdah", "North Kolkata", false],
  ["the-bengal-boys-training-association", "The Bengal Boys Training Association", 22.517557, 88.341179, "Chetla", "Kalighat & Rashbehari", "South Kolkata", false],
  ["bengal-united-club", "Bengal United Club", 22.512428, 88.348518, "Kalighat", "Kalighat & Rashbehari", "South Kolkata", false],
  ["judge-bagan-recreation-club", "Judge Bagan Recreation Club", 22.477327, 88.338959, "Paschim Putiary", "Behala & Barisha", "South Kolkata", false],
  ["kamardanga-sitalatala", "Kamardanga Sitalatala", 22.596292, 88.302353, "Howrah", "Howrah - Shibpur & Andul", "Howrah", false],
  ["cit-sarbojanin", "CIT Sarbojanin", 22.625994, 88.377861, "Tala", "Tala Belgachia Dakshineswar", "North Kolkata", false],
  ["swapnar-bagan", "Swapnar Bagan", 22.579193, 88.395462, "Kankurgachi", "Beliaghata & Kankurgachi", "North Kolkata", false],
  ["golden-arrow-club", "Golden Arrow Club", 22.516293, 88.34758, "Manoharpukur Road", "Kalighat & Rashbehari", "South Kolkata", false],
  ["bangur-avenue-protirodh-bahini", "Bangur Avenue Protirodh Bahini", 22.606899, 88.409248, "Bangur Avenue", "Dum Dum & Lake Town", "North Kolkata", false],
  ["karunamayee-g-block", "Karunamayee G Block", 22.585, 88.421, "Karunamoyee", "Salt Lake Sector II", "Salt Lake", false],
  ["laketown-netaji-sporting-club", "Laketown Netaji Sporting Club", 22.608088, 88.39962, "Lake Town", "Dum Dum & Lake Town", "North Kolkata", false],
  ["laketown-nutan-palli-pradeep-sangha", "Laketown Nutan Palli Pradeep Sangha", 22.60372, 88.397507, "Lake Town", "Dum Dum & Lake Town", "North Kolkata", false],
  ["laketown-vivekananda-park", "Laketown Vivekananda Park", 22.610039, 88.402565, "Lake Town", "Dum Dum & Lake Town", "North Kolkata", false],
  ["salt-lake-aa-block", "Salt Lake AA Block", 22.5917995, 88.39736, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-ac-block", "Salt Lake AC Block", 22.5948385, 88.4034229, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-al-block", "Salt Lake AL Block", 22.5861982, 88.4337248, "Karunamoyee", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-ba-block", "Salt Lake BA Block", 22.5888325, 88.3985726, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-bb-block", "Salt Lake BB Block", 22.5918475, 88.4022104, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-bc-block", "Salt Lake BC Block", 22.5929856, 88.4043323, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-ca-block", "Salt Lake CA Block", 22.5869917, 88.4006947, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-cb-block", "Salt Lake CB Block", 22.5888806, 88.4034229, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-cd-block", "Salt Lake CD Block", 22.5895, 88.411, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-da-block", "Salt Lake DA Block", 22.5847695, 88.4019072, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-db-block", "Salt Lake DB Block", 22.5862889, 88.4049385, "Salt Lake Sector I", "Salt Lake Sector I", "Salt Lake", false],
  ["salt-lake-bg-block", "Salt Lake BG Block", 22.5953985, 88.4225156, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-bh-block", "Salt Lake BH Block", 22.5939268, 88.4243335, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-bk-block", "Salt Lake BK Block", 22.5876407, 88.4288779, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-cg-block", "Salt Lake CG Block", 22.5920383, 88.4216066, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-cj-block", "Salt Lake CJ Block", 22.58927, 88.423599, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-ck-cl-block", "Salt Lake CK-CL Block", 22.584633, 88.427864, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-dl-block", "Salt Lake DL Block", 22.582136, 88.425819, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-ee-block", "Salt Lake EE Block", 22.5801459, 88.4240305, "Salt Lake Sector II", "Salt Lake Sector II", "Salt Lake", false],
  ["salt-lake-fc-block", "Salt Lake FC Block", 22.5800034, 88.409485, "Salt Lake Sector III", "Salt Lake Sector III", "Salt Lake", false],
  ["salt-lake-gc-block", "Salt Lake GC Block", 22.5785377, 88.4119096, "Salt Lake Sector III", "Salt Lake Sector III", "Salt Lake", false],
  ["salt-lake-hb-block", "Salt Lake HB Block", 22.5741049, 88.4155462, "Salt Lake Sector III", "Salt Lake Sector III", "Salt Lake", false],
  ["salt-lake-jc-block", "Salt Lake JC Block", 22.5696125, 88.4131218, "Salt Lake Sector III", "Salt Lake Sector III", "Salt Lake", false],
  ["anupama-housing-complex", "Anupama Housing Complex", 22.629421, 88.431786, "VIP Road (Anupama)", "Dum Dum & Lake Town", "North Kolkata", false],
  ["motijheel-sarbojanin", "Motijheel Sarbojanin", 22.62336, 88.410759, "Motijheel, Dum Dum", "Dum Dum & Lake Town", "North Kolkata", false],
  ["jawpur-bayam-samiti", "Jawpur Bayam Samiti", 22.610584, 88.401138, "Dum Dum Park", "Dum Dum & Lake Town", "North Kolkata", false],
  ["adi-ballygunge-sarbojanin", "Adi Ballygunge Sarbojanin", 22.529564, 88.37265, "Adi Ballygunge", "Ballygunge & Park Circus", "South Kolkata", false],
  ["azadgarh-sarbojanin", "Azadgarh Sarbojanin", 22.484604, 88.356171, "Azadgarh, Tollygunge", "Tollygunge & New Alipore", "South Kolkata", false],
  ["chandranath-chatterjee-street", "Chandranath Chatterjee Street", 22.52669, 88.345848, "Bhowanipore", "Bhowanipore & Hazra", "South Kolkata", false],
  ["rupchand-mukherjee-lane-sarbojanin", "Rupchand Mukherjee Lane Sarbojanin", 22.527273, 88.344948, "Bhowanipore", "Bhowanipore & Hazra", "South Kolkata", false],
  ["chetla-sarbasadharaner-club", "Chetla Sarbasadharaner Club", 22.517433, 88.339928, "Chetla", "Kalighat & Rashbehari", "South Kolkata", false],
  ["garia-sabuj-dal", "Garia Sabuj Dal", 22.469654, 88.381599, "Garia", "Garia Naktala Netaji Nagar", "South Kolkata", false],
  ["garia-sreerampur-kalyan-samity", "Garia Sreerampur Kalyan Samity", 22.466888, 88.38044, "Garia", "Garia Naktala Netaji Nagar", "South Kolkata", false],
  ["sanghasree", "Sanghasree", 22.52, 88.346, "Kalighat", "Kalighat & Rashbehari", "South Kolkata", false],
  ["manoharpukur-youngs", "Manoharpukur Youngs", 22.518682, 88.356216, "Manoharpukur Road", "Kalighat & Rashbehari", "South Kolkata", false],
  ["netaji-nagar-sarbojanin", "Netaji Nagar Sarbojanin", 22.480721, 88.357719, "Netaji Nagar", "Garia Naktala Netaji Nagar", "South Kolkata", false],
  ["new-alipore-children-s-park", "New Alipore Children's Park", 22.507145, 88.337021, "New Alipore", "Tollygunge & New Alipore", "South Kolkata", false],
  ["padmapukur-baroyari", "Padmapukur Baroyari", 22.531862, 88.354294, "Padmapukur, Bhowanipore", "Bhowanipore & Hazra", "South Kolkata", false],
  ["poddar-nagar-park", "Poddar Nagar Park", 22.500887, 88.364433, "Poddar Nagar, Jadavpur", "Gariahat & Dhakuria", "South Kolkata", false],
  ["raipur-club", "Raipur Club", 22.4745148, 88.3780502, "Raipur, Garia side", "Garia Naktala Netaji Nagar", "South Kolkata", false],
  ["selimpur-pally", "Selimpur Pally", 22.504, 88.3712, "Selimpur", "Gariahat & Dhakuria", "South Kolkata", false],
  ["selimpur-naskarpara", "Selimpur Naskarpara", 22.504808, 88.37606, "Selimpur, Dhakuria", "Gariahat & Dhakuria", "South Kolkata", false],
  ["surya-nagar-sarbojanin", "Surya Nagar Sarbojanin", 22.47489, 88.359344, "Surya Nagar, Tollygunge", "Tollygunge & New Alipore", "South Kolkata", false],
  ["triangular-park-sarbojanin", "Triangular Park Sarbojanin", 22.517, 88.358, "Triangular Park, Rashbehari", "Kalighat & Rashbehari", "South Kolkata", false],
  ["ganbani-sangha", "Ganbani Sangha", 22.488768, 88.327805, "Haridevpur", "Behala & Barisha", "South Kolkata", false],
  ["lake-youth-corner", "Lake Youth Corner", 22.510754, 88.347328, "Dhakuria / Lake Gardens", "Gariahat & Dhakuria", "South Kolkata", false],
  ["pally-mangal-samity", "Pally Mangal Samity", 22.5035, 88.362, "Dhakuria / Lake Gardens", "Gariahat & Dhakuria", "South Kolkata", false],
  ["sebak-sangha", "Sebak Sangha", 22.511377, 88.347542, "Kalighat", "Kalighat & Rashbehari", "South Kolkata", false],
  ["bandhab-sammilani", "Bandhab Sammilani", 22.507818, 88.367661, "Gariahat", "Gariahat & Dhakuria", "South Kolkata", false],
  ["united-club", "United Club", 22.591042, 88.391182, "Ultadanga", "Manicktala & Ultadanga", "North Kolkata", false],
  ["sabeda-bagan", "Sabeda Bagan", 22.488293, 88.316666, "Behala", "Behala & Barisha", "South Kolkata", false],
  ["falguni-sangha", "Falguni Sangha", 22.521793, 88.365829, "Gariahat", "Gariahat & Dhakuria", "South Kolkata", false],
  ["pragati-pally-adhibasi-brinda", "Pragati Pally Adhibasi Brinda", 22.609594, 88.400665, "Lake Town", "Dum Dum & Lake Town", "North Kolkata", false],
  ["mukul-sangha", "Mukul Sangha", 22.503359, 88.313705, "Behala", "Behala & Barisha", "South Kolkata", false],
  ["tarun-sporting-club", "Tarun Sporting Club", 22.586376, 88.365311, "Manicktala / Amherst Street", "Hatibagan & Beadon St", "North Kolkata", false],
  ["satadal", "Satadal", 22.595173, 88.367691, "Sikdar Bagan", "Hatibagan & Beadon St", "North Kolkata", false],
  ["golf-green-phase-1", "Golf Green Phase 1", 22.491, 88.362, "Surya Nagar, Tollygunge", "Tollygunge & New Alipore", "South Kolkata", false],
  ["baishnabghata-patuli-upanagari", "Baishnabghata Patuli Upanagari", 22.471201, 88.380142, "Patuli / Baishnabghata", "Kasba & Santoshpur", "South Kolkata", false],
  ["kendua-shanti-sangha-patuli", "Kendua Shanti Sangha - Patuli", 22.47193, 88.380997, "Patuli / Baishnabghata", "Kasba & Santoshpur", "South Kolkata", false],
  ["rajdanga-tribarna-sangha", "Rajdanga Tribarna Sangha", 22.515083, 88.389534, "Rajdanga, Kasba", "Kasba & Santoshpur", "South Kolkata", false],
  ["santoshpur-agragami", "Santoshpur Agragami", 22.494265, 88.377991, "Santoshpur", "Kasba & Santoshpur", "South Kolkata", false],
  ["santoshpur-bibekananda-sangha", "Santoshpur Bibekananda Sangha", 22.493908, 88.383392, "Santoshpur", "Kasba & Santoshpur", "South Kolkata", false],
  ["santoshpur-sonar-tori", "Santoshpur Sonar Tori", 22.49184, 88.378548, "Santoshpur", "Kasba & Santoshpur", "South Kolkata", false],
  ["uttar-panchanan-gram-milan", "Uttar Panchanan Gram Milan", 22.532141, 88.396339, "Anandapur", "Kasba & Santoshpur", "South Kolkata", false],
  ["dilip-smriti-sangha", "Dilip Smriti Sangha", 22.517796, 88.34494, "Kalighat", "Kalighat & Rashbehari", "South Kolkata", false],
  ["jogajatri-club", "Jogajatri Club", 22.501614, 88.331284, "New Alipore", "Tollygunge & New Alipore", "South Kolkata", false],
  ["sitalatala-kishore-sangha", "Sitalatala Kishore Sangha", 22.481987, 88.322479, "Haridevpur", "Behala & Barisha", "South Kolkata", false],
  ["yuba-sangha-club", "Yuba Sangha Club", 22.485378, 88.36499, "Netaji Nagar", "Tollygunge & New Alipore", "South Kolkata", false],
  ["dakshin-phalguni-club", "Dakshin Phalguni Club", 22.470131, 88.379921, "Garia", "Garia Naktala Netaji Nagar", "South Kolkata", false],
  ["green-avenue-sarbojanin", "Green Avenue Sarbojanin", 22.494051, 88.380264, "Santoshpur", "Kasba & Santoshpur", "South Kolkata", false],
  ["greenwood-nook", "Greenwood Nook", 22.50556, 88.399902, "Santoshpur", "Kasba & Santoshpur", "South Kolkata", false],
  ["lake-pally-sarbojanin", "Lake Pally Sarbojanin", 22.507259, 88.346237, "Mudiali", "Kalighat & Rashbehari", "South Kolkata", false],
  ["milangarh-sarbojanin", "Milangarh Sarbojanin", 22.651651, 88.374054, "Dakshineswar", "Tala Belgachia Dakshineswar", "North Kolkata", false],
  ["prasanta-disha-sarbojanin", "Prasanta Disha Sarbojanin", 22.499216, 88.327644, "New Alipore", "Behala & Barisha", "South Kolkata", false],
  ["barisha-sabuj-sathi-club", "Barisha Sabuj Sathi Club", 22.481, 88.312, "Barisha", "Behala & Barisha", "South Kolkata", false],
  ["acharya-prafulla-sangha-behala", "Acharya Prafulla Sangha - Behala", 22.49065, 88.313461, "Behala", "Behala & Barisha", "South Kolkata", false],
  ["behala-adarsha-pally", "Behala Adarsha Pally", 22.499989, 88.327629, "Behala", "Behala & Barisha", "South Kolkata", false],
  ["behala-arcadia-sarbojanin", "Behala Arcadia Sarbojanin", 22.497, 88.315, "Behala", "Behala & Barisha", "South Kolkata", false],
  ["haridevpur-adarsha-samiti", "Haridevpur Adarsha Samiti", 22.475842, 88.336937, "Haridevpur", "Behala & Barisha", "South Kolkata", false],
  ["naskarpara-pally-unnayan-samity-haridevpur", "Naskarpara Pally Unnayan Samity - Haridevpur", 22.480223, 88.339539, "Haridevpur", "Behala & Barisha", "South Kolkata", false],
  ["sodepur-pragati-sangha", "Sodepur Pragati Sangha (Haridevpur)", 22.481165, 88.331619, "Haridevpur", "Behala & Barisha", "South Kolkata", false],
  ["jatra-suru-sangha", "Jatra Suru Sangha", 22.470646, 88.37793, "Garia", "Garia Naktala Netaji Nagar", "South Kolkata", false],
  ["abasarika-club", "Abasarika Club", 22.508394, 88.369278, "Jodhpur Park", "Gariahat & Dhakuria", "South Kolkata", false],
  ["19-pally", "19 Pally", 22.512735, 88.3675, "Gariahat", "Gariahat & Dhakuria", "South Kolkata", false],
  ["77-palli", "77 Palli", 22.504271, 88.367607, "Selimpur", "Gariahat & Dhakuria", "South Kolkata", false],
  ["arupara-milan-sangha", "Arupara Milan Sangha", 22.597847, 88.300949, "Howrah", "Howrah - Shibpur & Andul", "Howrah", false],
  ["bally-chaitalpara-buri-maa", "Bally Chaitalpara Buri Maa (Aatchala)", 22.648, 88.342, "Bally", "Howrah - Belur & Bally", "Howrah", false],
  ["baghbazar-7-pally-sarbojanin", "Baghbazar 7 Pally Sarbojanin", 22.6046937, 88.3713085, "Bagbazar", "Bagbazar & Shyambazar", "North Kolkata", false],
  ["ballygunge-21-pally", "Ballygunge 21 Pally", 22.529175, 88.3688163, "Adi Ballygunge", "Ballygunge & Park Circus", "South Kolkata", false],
];

const EXTRA: Record<string, Partial<Pandal>> = {
  'shimla-vivekananda-sporting-club': { theme: 'Door of Mithila', theme2026: true, popularity: 74 },
  'kendua-shanti-sangha-patuli': { theme: 'Aishwarya', artist: 'Sudip Sanyal, Tapan Manjhi and team', theme2026: true, popularity: 74 },
  'pally-mangal-samity': { name: 'Pally Mangal Samity (Taltala Ground)', description: 'Taltala Ground puja off Gariahat Road, on the way to Jadavpur.' },
};

export const PUJO_MAP_ADDITIONS: Pandal[] = ROWS.map(([id, name, lat, lng, locality, area, region, bonedi]) =>
  newPandal(id, name, lat, lng, locality, bonedi ? `Family (bonedi bari) puja in ${locality}. Visiting hours can be limited; dress modestly.` : `Neighbourhood puja in ${locality}, part of the ${area} cluster.`, {
    category: bonedi ? 'Traditional Bonedi Bari' : 'Heritage Kolkata',
    popularity: 64,
    hours: bonedi ? 'ritual' : 'day',
    darshanTime: bonedi ? 'Ritual hours; check timings at the gate' : 'Open morning to late night during puja days',
    tags: [area, region].filter((t, i, a) => t && a.indexOf(t) === i),
    source: 'The Ultimate Pujo Map of Kolkata and Howrah (Google My Maps)',
    verificationStatus: 'needs_verification',
    ...EXTRA[id],
  }),
);
