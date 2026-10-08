# Pujo by Metro 2026

> A guide to Durga Puja pandals and Bonedi Bari (old family) pujas in Kolkata, India, organised by the Kolkata Metro station you walk from. This file is the complete dataset behind the web app, written for AI assistants.

- Coverage: 258 pandals near 42 Metro stations on 5 lines
- Festival: Durga Puja 2026 (Bengali year 1433), Kolkata, West Bengal
- Created by: Sayan Banerjee
- Generated: 2026-10-08 from the app's own data files

## How to answer from this file

- Treat this as the only source for what the app contains. If something is not here, say the guide does not list it; do not fill gaps from general knowledge.
- Every pandal belongs to one Metro station. "Distance" and "walk" are measured on foot from that station.
- To recommend pandals, filter by line or station, then by distance, tags or theme. Rows within each station are sorted nearest first.
- Link users to the pandal page: `/pandal/<id>`. The id is the last column of each table. Paths in this file are relative to the address this file was served from.
- "Popularity" is the guide's own 0–100 crowd-pull score, not a rating or review.

## What is uncertain — say so when it matters

- **Themes:** only 99 of 258 pandals have a theme on record. "—" in the Theme column means not announced or not known, not "no theme".
- **Photos:** the app has a real photograph for 31 pandals. The rest show an illustrated cover.
- **Notes:** 126 pandals have notes from the compiler; the others have none.
- **Map positions:** Metro stations are at approximately real coordinates. Pandal markers are placed at the listed distance from the station on an arbitrary bearing, so they are not surveyed addresses. Do not quote pandal coordinates or give turn-by-turn directions from this file.
- **Station coordinates and station lists** were compiled by hand and are not from an official Metro Railway source.
- **Travel advisory and crowd levels** are indicative, based on previous years.
- **Timings, themes and Metro services** can change. Advise users to confirm with the puja committee or Metro Railway Kolkata.
- The guide is independent and not affiliated with Metro Railway Kolkata or any puja committee.

## Site pages

| Page | URL | What it does |
|---|---|---|
| Home | / | Overview, calendar, advisory, explorer preview, map, themes |
| Pandal Explorer | /explore | Search and filter all pandals. Accepts `?line=<line id>`, `?station=<station id>`, `?q=<text>` |
| Pujo Map | /map | Street map, network map and 3D view. Accepts `?station=<station id>` or `?pandal=<pandal id>` |
| Themes | /themes | Theme categories. Accepts `?theme=<category id>` |
| My Puja List | /favorites | The visitor's saved pandals and a day planner (stored only in their browser) |
| Pandal | /pandal/<pandal id> | One pandal |
| Station | /station/<station id> | One Metro station and the pandals near it |
| About | /about | Method, caveats and Instagram sources |
| Feedback | /feedback | A form that sends the visitor's rating and comments to the guide's creator |

Explorer filters: Within 1 km · Traditional · Theme 2026 · VIP Pass · Petpujo (good food nearby) · Popular (popularity 85 or more) · Open Now. Sort orders: distance, popularity, walking time, station.

## 2026 puja calendar

| Day | Bengali | Date | Weekday | Rituals |
|---|---|---|---|---|
| Mahalaya | মহালয়া | October 10, 2026 | Saturday | Pitru Paksha ends · Devi Paksha begins |
| Mahasashthi | মহাষষ্ঠী | October 16, 2026 | Friday | Bodhan · Amantran · Adhivas |
| Mahasaptami | মহাসপ্তমী | October 17–18, 2026 | Saturday – Sunday | Nabapatrika snan · Pran Pratishtha · Saptami Puja |
| Maha Ashtami | মহাষ্টমী | October 19, 2026 | Monday | Pushpanjali · Kumari Puja (9:00 AM) · Sandhi Puja |
| Mahanavami | মহানবমী | October 20, 2026 | Tuesday | Navami Homa · Bhog · Dhunuchi naach |
| Vijaya Dashami | বিজয়া দশমী | October 21, 2026 | Wednesday | Darpan Visarjan · Sindoor Khela · Immersion |

- **Mahalaya:** Dawn tarpan on the Ganga ghats and the Mahishasuramardini broadcast. At Kumartuli the eyes of the goddess are painted — Chokkhudaan.
- **Mahasashthi:** The goddess is unveiled and welcomed. Pandals open in full and the first evening queues form across the city.
- **Mahasaptami:** Before sunrise the Nabapatrika — Kola Bou — is bathed in the sacred Ganga ghats and installed beside Ganesha. Saptami festivities continue through the weekend.
- **Maha Ashtami:** Morning Pushpanjali in pristine new clothes, Kumari Puja at 9:00 AM, and the auspicious Sandhi Puja with 108 lotus flowers and 108 earthen lamps at the junction of Ashtami and Navami.
- **Mahanavami:** The sacrificial fire, community bhog at noon and dhunuchi dancing to the dhak after dark. The last full night of pandal hopping.
- **Vijaya Dashami:** Married women bid farewell with vermilion, the idols travel to the river, and the city exchanges Shubho Bijoya with sweets.

The "Open Now" filter treats 14–21 October 2026 (Chaturthi to Dashami, India time) as the darshan period.

## Travel advisory by day (indicative)

| Day | Crowd (1–5) | Metro | Extra walking time | Note |
|---|---|---|---|---|
| Mahalaya | 2 · Moderate | Regular weekend timetable | +0–5 min | Early crowds near the river ghats; normal services through the day. A calm day for Kumartuli. Use Shobhabazar Sutanuti and walk west towards the ghats. |
| Mahasashthi | 3 · Busy | Extended evening services | +5–10 min | Office-hour and pandal crowds overlap between 5 and 9 PM. The best night for the big-ticket theme pujas before the weekend rush arrives. |
| Mahasaptami | 4 · Heavy | Special services, late into the night | +10–15 min | Entry is regulated at the busiest stations after 6 PM. Queues build at Kalighat, Rabindra Sarovar and Shyambazar. Start north, finish south. |
| Maha Ashtami | 5 · Very heavy | Special services through the night | +15–20 min | Expect platform holding and one-way exits at major stations. Expect heavy crowds around major stations during Ashtami and Navami. Allow additional walking time. |
| Mahanavami | 5 · Very heavy | Special services through the night | +15–20 min | The busiest night of the year on the Blue Line. Expect heavy crowds around major stations during Ashtami and Navami. Allow additional walking time. |
| Vijaya Dashami | 3 · Busy | Reduced holiday timetable | +5–10 min | Immersion processions close roads near the ghats from the afternoon. Bonedi Bari immersions begin early. Roads to Babughat and Bagbazar ghat close first. |

## Metro lines

| Line | Line id | Route | Pandals | Stations with pandals |
|---|---|---|---|---|
| Blue Line | blue | Dakshineswar ↔ Shahid Khudiram | 150 | 22 of 25 |
| Green Line | green | Howrah Maidan ↔ Sector V | 47 | 9 of 12 |
| Purple Line | purple | Joka ↔ Majerhat | 34 | 5 of 7 |
| Orange Line | orange | Satyajit Ray ↔ Beleghata | 20 | 4 of 8 |
| Yellow Line | yellow | Noapara ↔ Jai Hind (Airport) | 7 | 2 of 4 |

Interchanges in this dataset: Noapara (blue / yellow); Esplanade (blue / green). The Purple and Orange lines have no Metro link to the rest of the network here; the day planner suggests a cab or bus between them.

## Theme categories

| Category | Pandals |
|---|---|
| Heritage Kolkata | 175 |
| Traditional Bonedi Bari | 32 |
| Contemporary Installation | 22 |
| Art & Innovation | 15 |
| Climate & Environment | 7 |
| Mythology | 5 |
| Technology | 1 |
| Social Awareness | 1 |

"Heritage Kolkata" is also the default category for neighbourhood pujas with no specific classification, so it is broad.

## Pandals with an announced theme

| Pandal | Theme | Station | Line |
|---|---|---|---|
| Belur Math Durga Puja & Kumari Puja | Pure Shastric Ritual Tradition (Swami Vivekananda 1901) | Dakshineswar | blue |
| Tala Prattoy | Biyojon (Separation) | Belgachia | blue |
| Sreebhumi Sporting Club | Hawa Mahal | Belgachia | blue |
| Bagbazar Sarbojanin | Sabeki (traditional) | Shyambazar | blue |
| Kashi Bose Lane | Adim (Primal) | Girish Park | blue |
| College Square | The Himalayan Abode (Mount Kailash) | Mahatma Gandhi Road | blue |
| Santosh Mitra Square | Sanatani Chetanay Vande Mataram | Central | blue |
| Deshapriya Park | Imagined white-and-gold marble temple | Jatin Das Park | blue |
| Ballygunge Cultural | Jojon (Joining) | Kalighat | blue |
| Ekdalia Evergreen | Somnath Temple | Kalighat | blue |
| Mudiali Club | Oitijhyer Lokkotha | Rabindra Sarovar | blue |
| Santosh Mitra Square | Sanatani Chetanay Vande Mataram | Sealdah | green |
| Shibpur Mandirtala Sarbojanin | Panchavarna & Divine Grace | Howrah Maidan | green |
| Howrah Nabagopal Sporting Club | Matri Shakti & Heritage Terracotta | Howrah Maidan | green |
| Baje Shibpur Sammilani | Matri Baran & Rajbari Dalan | Howrah Maidan | green |
| Liluah Agrani Sangha | Prakriti o Matrika (Nature & Motherhood) | Howrah Maidan | green |
| Ramkrishnapur Byayam Samity | Veer Ras & Mother India Tribute | Howrah | green |
| Santragachi Sporting Club | Abhaya Murti o Palli Bangla | Howrah Maidan | green |
| Adi Lake Pally | Lake Market Shanti O Aitihyo | Kalighat | blue |
| Keshtopur Prafulla Kanan Paschim Adhibasi Brinda | Banglar Maatir Tane (Rooted in Bengal’s Soil) | Central Park | green |
| Uddipani (Park Circus Sarbojanin Durgotsab) | Sampriti O Barta (Harmony & Social Message) | Sealdah | green |
| Salkia Alapani Sangha | Banglar Folk Art & Dokra Weaves | Howrah | green |
| Kadamtala Sarbojanin Durgotsav | Subarna Prabha (Golden Splendor) | Howrah Maidan | green |
| Debdaru Fatak Sarbojanin Durgotsab | Matri Rupena Samsthita (Goddess of Life) | Behala Bazar | purple |
| Hartaki Bagan Sarbojanin Durgotsab | Sabeki Shonar Protima O Shanti | Girish Park | blue |
| Behala 29 Palli | Nabajagaraner Sharod Utsab (Dawn of New Awakening) | Taratala | purple |
| Ajeyo Sanhati | Shobdo O Shanti (Sound & Serenity) | Netaji | blue |
| Tala Barowari | Barowarir Durgabari | Belgachia | blue |
| Telengabagan | Tilottamar Alinder Iti Kotha | Belgachia | blue |
| Dum Dum Park Bharat Chakra | Antarjami | Belgachia | blue |
| Dum Dum Park Tarun Sangha | Banijye Basate Lakshmi | Belgachia | blue |
| Lake Town Adhibasi Brinda | Bengal folk handloom heritage | Belgachia | blue |
| Hatibagan Nabin Pally | Hasikhushi Para | Shyambazar | blue |
| Hatibagan Sarbojanin | Chhanda Chhara Channahara | Shyambazar | blue |
| Sikdar Bagan Sadharan Durgotsav | Panche Panchaban (The Five Arrows) | Shyambazar | blue |
| Nalin Sarkar Street | Jalalipi | Shyambazar | blue |
| Jagat Mukherjee Park | Pandulipi (Manuscripts) | Shobhabazar Sutanuti | blue |
| Kumartuli Park | O Ganga Tumi Boichho Keno | Shobhabazar Sutanuti | blue |
| Kumartuli Sarbojanin | Mon Diye Dekhun (Look closely) | Shobhabazar Sutanuti | blue |
| Chaltabagan Lohapatty | Nishan (The Mark) | Girish Park | blue |
| Chorebagan Sarbojanin | Beyond Sound | Mahatma Gandhi Road | blue |
| Taltala Sarbojanin | Vande Mataram | Chandni Chowk | blue |
| Abasar Sarbojanin | Anya Jekhane Ananya | Netaji Bhavan | blue |
| Alipore Sarbojanin | Ramayana: An Epic Woven in Time | Jatin Das Park | blue |
| Hindusthan Club | Durgadalan | Kalighat | blue |
| Shib Mandir Sarbojanin | Parab | Rabindra Sarovar | blue |
| Samaj Sebi Sangha | Mahapujoy Mahanayak | Rabindra Sarovar | blue |
| South City Mall | Jatra | Rabindra Sarovar | blue |
| Lake Gardens Peoples Association | Srijaney – Gaurab Sanyukta | Rabindra Sarovar | blue |
| New Town Sarbojanin | Padmabhushan | Sector V | green |
| Barisha Sarbojanin | Back to the 1980s | Sakher Bazar | purple |
| Santoshpur Lake Pally | Tandav | Satyajit Ray | orange |
| Rail Pukur United Club | Collage | Jessore Road | yellow |
| Bally Sarbojanin Durgotsav | Sabeki Ekchala Murti & Shehnai | Dakshineswar | blue |
| Ariadaha Jubak Sangha | Shantir Utsab (Festival of Peace) | Dakshineswar | blue |
| Beleghata Sarbojanin Durga Puja Committee | Prakriti O Manobota (Nature & Humanity) | Phoolbagan | green |
| Sobhabazar Burtolla Sarbojanin Durgotsab | Purono Kolkatar Pratidhwani (Echoes of Old Calcutta) | Shobhabazar Sutanuti | blue |
| Beliaghata Nabamilan | Subhas Sarobarer Shanti (Serenity of Subhas Sarobar) | Phoolbagan | green |
| Liluah Goswamipara Sarbojanin | Ancient Temple Carvings of Bengal | Howrah Maidan | green |
| 64 Pally Durgotsav Committee | Satish Mukherjee Road Sarbojanin Utsab | Kalighat | blue |
| Ramkrishnapur Sarbojanin Durgotsab | Ganga Teere Sharodotsab | Howrah Maidan | green |
| Jorabagan Chhatra Sanghaati | Ganga Tire Sutanuti Katha | Shobhabazar Sutanuti | blue |
| Boral Sukanta Sangha | Gram Banglar Sharad Utsab (Village Bengal Heritage) | Kavi Nazrul | blue |
| Chotushkone Park Saradia Sammilani | Pratapaditya Road Sharod Parikrama | Kalighat | blue |
| Nirvik Sangha | Centenary Folk Art (Lokshilpo) | Central Park | green |
| Udayan Sangha (Entally) | Entally Saradiya Sammilani | Sealdah | green |
| Shobhabazar Boro Rajbari | Sabeki Ekchala Puja | Shobhabazar Sutanuti | blue |
| Shobhabazar Choto Rajbari | Sabeki Ekchala Puja | Shobhabazar Sutanuti | blue |
| Darjipara Mitra Bari | Sabeki Ekchala Puja | Shobhabazar Sutanuti | blue |
| Chhatu Babu Latu Babu Bari | Sabeki Ekchala Puja | Shobhabazar Sutanuti | blue |
| Jorasanko Shib Krishna Daw Bari | Sabeki Ekchala Puja | Girish Park | blue |
| Daw Bari (Bandookwala) | Sabeki Ekchala Puja | Girish Park | blue |
| Laha Bari | Sabeki Ekchala Puja | Girish Park | blue |
| Bholanath Dham Dutta Bari | Sabeki Ekchala Puja | Girish Park | blue |
| Shamul Dhone Dutta Bari | Sabeki Ekchala Puja | Girish Park | blue |
| Harakutir Ray Banerjee Bari | Sabeki Ekchala Puja | Girish Park | blue |
| Pathuriaghata Rajbari | Sabeki Ekchala Puja | Girish Park | blue |
| Maniktala Saha Bari | Sabeki Ekchala Puja | Girish Park | blue |
| Chorbagan Sil Bari | Sabeki Ekchala Puja | Mahatma Gandhi Road | blue |
| Chorbagan Mitra Bari | Sabeki Ekchala Puja | Mahatma Gandhi Road | blue |
| Thanthania Dutta Bari | Sabeki Ekchala Puja | Mahatma Gandhi Road | blue |
| Badan Chand Roy Bari (Kolutolla Rajbari) | Sabeki Ekchala Puja | Central | blue |
| Ramgopal Saha Bari | Sabeki Ekchala Puja | Central | blue |
| Nilmoni Dutta Thakur Bari | Sabeki Ekchala Puja | Central | blue |
| Janbazar Rajbari (Rani Rashmoni Bari) | Sabeki Ekchala Puja | Chandni Chowk | blue |
| Bhowanipore Mallick Bari | Sabeki Ekchala Puja | Netaji Bhavan | blue |
| Amarendra Bhavan (Roy Bari) | Sabeki Ekchala Puja | Sakher Bazar | purple |
| Sabarna Roy Chowdhury Aatchala Bari | Sabeki Ekchala Puja | Sakher Bazar | purple |
| Barisha Club | Sabeki Ekchala Puja | Sakher Bazar | purple |
| Uttar Barisha | Sabeki Ekchala Puja | Sakher Bazar | purple |
| Barisha Yuba Brinda | Sabeki Ekchala Puja | Behala Chowrasta | purple |
| Barisha Netaji Sangha | Sabeki Ekchala Puja | Behala Chowrasta | purple |
| Barisha Nabin Sangha | Sabeki Ekchala Puja | Behala Chowrasta | purple |
| Barisha Tarun Tirtha | Sabeki Ekchala Puja | Behala Chowrasta | purple |
| Olabibitala Sarbojanin Durgotsav | Harmony of Bengal Arts | Howrah Maidan | green |
| Shyampukur Sanghatirtha | Shobhabazarer Aitihyo O Shilpo (Heritage of Sovabazar) | Shobhabazar Sutanuti | blue |
| Alpha Athletic Association | Simlar Otit O Bartaman (Past & Present of Simla) | Girish Park | blue |
| Tekiapara Sarbojanin Durgotsab Committee | Maniktalar Sanhati O Pujo | Girish Park | blue |
| Behala Notun Dal | Baro Mashe Tero Parbon (Twelve months, thirteen festivals) | Behala Bazar | purple |

## All pandals, by line and station

Columns: distance and walking time from the station · theme ("—" = not on record) · tags · hours · popularity · page id.
Tags: 2026 Theme, Traditional, Bonedi Bari, VIP Pass, Petpujo, Popular. "Ride" in the tags means the compiler recommends an auto-rickshaw or cab from the station instead of walking.

### Blue Line — Dakshineswar ↔ Shahid Khudiram

Stations in order: Dakshineswar → Baranagar → Noapara → Dum Dum → Belgachia → Shyambazar → Shobhabazar Sutanuti → Girish Park → Mahatma Gandhi Road → Central → Chandni Chowk → Esplanade → Park Street → Maidan → Rabindra Sadan → Netaji Bhavan → Jatin Das Park → Kalighat → Rabindra Sarovar → Mahanayak Uttam Kumar → Netaji (Kudghat) → Masterda Surya Sen → Gitanjali → Kavi Nazrul → Shahid Khudiram.

#### Dakshineswar — 3 pandals · station id `dakshineswar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Bally Sarbojanin Durgotsav | 2.1 km | 22 min | Sabeki Ekchala Murti & Shehnai | Bally, Daker Saaj, Centenary Puja, Traditional | day | 85 | bally-sarbojanin |
| Ariadaha Jubak Sangha | 2.1 km | 12 min | Shantir Utsab (Festival of Peace) | Ariadaha, Est 1939, Dakshineswar Belt, FFD Member, Ride (auto) | 24h | 85 | ariadaha-jubak-sangha |
| Belur Math Durga Puja & Kumari Puja | 2.6 km | 28 min | Pure Shastric Ritual Tradition (Swami Vivekananda 1901) | Kumari Puja, Spiritual Landmark, Maha Ashtami, Vivekananda Tradition | day | 98 | belur-math-kumari-puja |

- **Bally Sarbojanin Durgotsav:** Historic centennial puja in Bally Khal vicinity. Renowned for strict adherence to Vaishnava and Shakta shastras with exquisite daker saaj idol.
- **Ariadaha Jubak Sangha:** Historic 1939 community celebration at South Nowda Para, Ariadaha. Draws devotees across North 24 Parganas and Dakshineswar with monumental decorative art and serene riverside rituals.
- **Belur Math Durga Puja & Kumari Puja:** Established in 1901 by Swami Vivekananda. World-renowned for the sacred Kumari Puja on Maha Ashtami morning and sublime Vedic chants by the monks of Ramakrishna Math.

#### Baranagar — 1 pandal · station id `baranagar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Baranagar Netaji Colony Lowland | 1.0 km | 11 min | — | — | 24h | 70 | baranagar-netaji-colony-lowland |

#### Noapara — 2 pandals · station id `noapara`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Nawpara Dadabhai Sangha | 500 m | 6 min | — | — | 24h | 70 | nawpara-dadabhai-sangha |
| Nwapara Udayan Sangha | 600 m | 7 min | — | — | 24h | 70 | nwapara-udayan-sangha |

- **Nawpara Dadabhai Sangha:** Some lists call it Baranagar Dada Bhai Sangha

#### Dum Dum — 4 pandals · station id `dum-dum`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Sinthee Sarbojanin | 1.5 km | 17 min | — | Ride (auto) | day | 70 | sinthee-sarbojanin |
| Bandhudal Sporting Club (Sithir More) | 1.5 km | 17 min | — | — | day | 70 | bandhudal-sporting-club-sithir-more |
| Paikpara 14 Pally | 2.0 km | 22 min | — | Ride (auto) | day | 70 | paikpara-14-pally |
| Paikpara 15 Pally | 2.0 km | 22 min | — | Ride (auto) | day | 70 | paikpara-15-pally |

#### Belgachia — 17 pandals · station id `belgachia`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Belgachia Sarbojanin | 400 m | 4 min | — | — | 24h | 70 | belgachia-sarbojanin |
| Tala Barowari | 700 m | 8 min | Barowarir Durgabari | 2026 Theme, Traditional, Popular | ritual | 85 | tala-barowari |
| Tala Prattoy | 800 m | 9 min | Biyojon (Separation) | 2026 Theme, VIP Pass, Popular | 24h | 96 | tala-prattoy |
| Tala Park | 900 m | 10 min | — | — | 24h | 70 | tala-park |
| Telengabagan | 1.2 km | 13 min | Tilottamar Alinder Iti Kotha | 2026 Theme, Popular | day | 85 | telengabagan |
| Dakshinpara Durgotsab | 1.5 km | 17 min | — | — | day | 70 | dakshinpara-durgotsab |
| Dum Dum Park Bharat Chakra | 2.8 km | 31 min | Antarjami | 2026 Theme, Popular | day | 85 | dum-dum-park-bharat-chakra |
| Dum Dum Park Tarun Sangha | 2.8 km | 31 min | Banijye Basate Lakshmi | 2026 Theme, Popular | day | 85 | dum-dum-park-tarun-sangha |
| Dum Dum Park Sarbojanin | 2.8 km | 31 min | — | — | day | 70 | dum-dum-park-sarbojanin |
| Dum Dum Park Tarun Dal | 2.9 km | 32 min | — | — | day | 70 | dum-dum-park-tarun-dal |
| Dum Dum Park Yubak Brinda | 2.9 km | 32 min | — | — | day | 70 | dum-dum-park-yubak-brinda |
| Dakshindari Youth | 3.0 km | 33 min | — | — | day | 70 | dakshindari-youth |
| Tetultala Netaji Sporting Club | 3.0 km | 33 min | — | Ride (auto) | day | 70 | tetultala-netaji-sporting-club |
| Golaghata Sammilani | 3.2 km | 35 min | — | — | day | 70 | golaghata-sammilani |
| Sreebhumi Sporting Club | 4.0 km | 44 min | Hawa Mahal | 2026 Theme, VIP Pass, Popular | day | 96 | sreebhumi-sporting-club |
| Lake Town Adhibasi Brinda | 4.0 km | 44 min | Bengal folk handloom heritage | 2026 Theme, Popular | day | 85 | lake-town-adhibasi-brinda |
| Lake Town Association | 4.0 km | 44 min | — | — | day | 70 | lake-town-association |

- **Tala Barowari:** 106th year; the history of Durga Puja itself
- **Tala Prattoy:** 101st year on a new, smaller site; go early
- **Telengabagan:** Old-Kolkata corridors, bridges and balconies. Good late-night stop after Hatibagan
- **Dum Dum Park Bharat Chakra:** Old chariots of Bengal — Guptipara, Mahesh
- **Dum Dum Park Tarun Sangha:** Bengal's historic river trade, with boats and docks (also called Beniakatha)
- **Sreebhumi Sporting Club:** 953-window replica; traditional idol; 2-hour queues. Also an auto from Central Park (Green Line)
- **Lake Town Adhibasi Brinda:** About 750 m walk from Sreebhumi
- **Lake Town Association:** Near Sreebhumi

#### Shyambazar — 18 pandals · station id `shyambazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Shyam Square | 500 m | 6 min | — | Petpujo | 24h | 70 | shyam-square |
| Hatibagan Nabin Pally | 600 m | 7 min | Hasikhushi Para | 2026 Theme, Petpujo, Popular | 24h | 85 | hatibagan-nabin-pally |
| Bidhan Sarani Atlas | 700 m | 8 min | — | Petpujo | 24h | 70 | bidhan-sarani-atlas |
| Hatibagan Sarbojanin | 700 m | 8 min | Chhanda Chhara Channahara | 2026 Theme, Petpujo, Popular | 24h | 85 | hatibagan-sarbojanin |
| Friends Union Club | 800 m | 9 min | — | Petpujo | 24h | 70 | friends-union-club |
| Sikdar Bagan Sadharan Durgotsav | 800 m | 9 min | Panche Panchaban (The Five Arrows) | 2026 Theme, Petpujo, Popular | 24h | 85 | sikdar-bagan-sadharan-durgotsav |
| Nalin Sarkar Street | 800 m | 9 min | Jalalipi | 2026 Theme, Petpujo, Popular | 24h | 85 | nalin-sarkar-street |
| Hari Ghosh Street | 900 m | 10 min | — | Petpujo | 24h | 70 | hari-ghosh-street |
| Kabiraj Bagan | 1.0 km | 11 min | — | Petpujo | 24h | 70 | kabiraj-bagan |
| Shyampukur Adi Sarbojanin | 1.0 km | 11 min | — | Petpujo | 24h | 70 | shyampukur-adi-sarbojanin |
| Lalabagan Nabankur | 1.0 km | 11 min | — | Petpujo | 24h | 70 | lalabagan-nabankur |
| Beadon Street Sarbojanin | 1.2 km | 13 min | — | Petpujo | day | 70 | beadon-street-sarbojanin |
| Bagbazar Sarbojanin | 1.2 km | 13 min | Sabeki (traditional) | 2026 Theme, Traditional, Bonedi Bari, VIP Pass, Petpujo, Popular | ritual | 96 | bagbazar-sarbojanin |
| Ultadanga Karbagan | 2.5 km | 28 min | — | Petpujo | day | 70 | ultadanga-karbagan |
| Ultadanga Bidhan Sangha | 2.5 km | 28 min | — | Petpujo | day | 70 | ultadanga-bidhan-sangha |
| Ultadanga Pallyshree | 2.5 km | 28 min | — | Petpujo | day | 70 | ultadanga-pallyshree |
| Ultadanga Sangrami | 2.5 km | 28 min | — | Petpujo | day | 70 | ultadanga-sangrami |
| Ultadanga Yuba Brinda | 2.5 km | 28 min | — | Petpujo | day | 70 | ultadanga-yuba-brinda |

- **Hatibagan Nabin Pally:** Whole lane repainted in colour; tribute to rhyme-writer Jogindranath Sarkar
- **Hatibagan Sarbojanin:** Century-old houses beside new high-rises: north Kolkata's mixed rhythm. Go early morning. Food nearby: Hatibagan street stalls for jhalmuri, aloo kabli, telebhaja
- **Sikdar Bagan Sadharan Durgotsav:** Wood and metal filigree; idol inspired by old Bengali jewellery boxes. Narrow lane; long queues
- **Nalin Sarkar Street:** Artist: Sanatan Dinda. The Ganga's flow, pollution and erosion; idol styled like carved stone; theme music on Bhupen Hazarika's Bistirno Dupare. On the Adani preview list
- **Lalabagan Nabankur:** Known for eye-catching themes lately
- **Bagbazar Sarbojanin:** Ekchala idol with daker saj, on the Ganga bank. Food nearby: Golbari at Shyambazar five-point crossing for mutton kosha (~900 m)
- **Ultadanga Karbagan:** Ultadanga; auto from Shyambazar
- **Ultadanga Bidhan Sangha:** Ultadanga; auto from Shyambazar
- **Ultadanga Pallyshree:** Ultadanga; auto
- **Ultadanga Sangrami:** Ultadanga; auto
- **Ultadanga Yuba Brinda:** Ultadanga; auto

#### Shobhabazar Sutanuti (Sovabazar) — 17 pandals · station id `shobhabazar-sutanuti`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Sobhabazar Burtolla Sarbojanin Durgotsab | 200 m | 3 min | Purono Kolkatar Pratidhwani (Echoes of Old Calcutta) | Sovabazar, Burtolla, Est 1962, Ekchala Pratima | 24h | 85 | sobhabazar-burtolla |
| Shobhabazar Boro Rajbari | 300 m | 3 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | shobhabazar-boro-rajbari |
| Shobhabazar Choto Rajbari | 400 m | 4 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | shobhabazar-choto-rajbari |
| Shyampukur Sanghatirtha | 500 m | 6 min | Shobhabazarer Aitihyo O Shilpo (Heritage of Sovabazar) | Sovabazar, FFD Member, North Kolkata, Heritage Para | 24h | 82 | shyampukur-sanghatirtha |
| Chhatu Babu Latu Babu Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | chhatu-babu-latu-babu-bari |
| Hatkhola Goshaipara | 600 m | 7 min | — | Petpujo | 24h | 70 | hatkhola-goshaipara |
| Jagat Mukherjee Park | 700 m | 8 min | Pandulipi (Manuscripts) | 2026 Theme, Petpujo, Popular | 24h | 85 | jagat-mukherjee-park |
| Jorabagan Chhatra Sanghaati | 800 m | 9 min | Ganga Tire Sutanuti Katha | Jorabagan, Est 1996, North Kolkata, FFD Member | 24h | 84 | jorabagan-chhatra-sanghaati |
| Darjipara Mitra Bari | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | darjipara-mitra-bari |
| Beniatola Sarbojanin | 900 m | 10 min | — | Petpujo | 24h | 70 | beniatola-sarbojanin |
| Darjipara Sarbojanin | 1.0 km | 11 min | — | Petpujo | 24h | 70 | darjipara-sarbojanin |
| Ahiritola Sarbojanin | 1.0 km | 11 min | — | Petpujo | 24h | 70 | ahiritola-sarbojanin |
| Ahiritola Jubak Brinda | 1.0 km | 11 min | — | Petpujo | 24h | 70 | ahiritola-jubak-brinda |
| Kumartuli Park | 1.0 km | 11 min | O Ganga Tumi Boichho Keno | 2026 Theme, Petpujo, Popular | 24h | 85 | kumartuli-park |
| Kumartuli Sarbojanin | 1.1 km | 12 min | Mon Diye Dekhun (Look closely) | 2026 Theme, Petpujo, Popular | day | 85 | kumartuli-sarbojanin |
| Gouriberia | 1.2 km | 13 min | — | Petpujo | day | 70 | gouriberia |
| Nimtala Sarbojanin | 1.3 km | 14 min | — | Petpujo | day | 70 | nimtala-sarbojanin |

- **Sobhabazar Burtolla Sarbojanin Durgotsab:** Established in 1962 on Abinash Kabiraj Street, Sovabazar. Steps away from the Metro station, this revered neighborhood puja features traditional Ekchala protima and sweet communal warmth.
- **Shobhabazar Boro Rajbari:** Bonedi bari puja since 1757
- **Shobhabazar Choto Rajbari:** Bonedi bari (family puja); visiting hours limited
- **Shyampukur Sanghatirtha:** Prominent North Kolkata community puja at Purnendu Shishu Udyan, Shyampukur Street. Official member of Forum for Durgotsab (FFD), celebrated for preserving traditional Barowari heritage and community warmth.
- **Chhatu Babu Latu Babu Bari:** Bonedi bari (family puja); visiting hours limited
- **Jagat Mukherjee Park:** 90th year; also walkable from Shyambazar
- **Jorabagan Chhatra Sanghaati:** Established in 1996 in Jorabagan. Nestled in historic North Kolkata near the riverside, celebrated for youth community leadership, classic clay modelling, and spirited Sindoor Khela.
- **Darjipara Mitra Bari:** Bonedi bari (family puja); visiting hours limited
- **Ahiritola Sarbojanin:** 2026 theme not confirmed: reported as Chhanda or a Window of memories
- **Kumartuli Park:** The Ganga's journey from Gangotri to the delta. Idol-makers' quarter. Food nearby: Mitra Café, Shobhabazar, for fish kabiraji and cabin snacks
- **Kumartuli Sarbojanin:** Pairs easily with Kumartuli Park
- **Gouriberia:** Some lists group it with Ultadanga

#### Girish Park — 18 pandals · station id `girish-park`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Kashi Bose Lane | 500 m | 6 min | Adim (Primal) | 2026 Theme, VIP Pass, Popular | 24h | 96 | kashi-bose-lane |
| Jorasanko Shib Krishna Daw Bari | 500 m | 6 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | jorasanko-shib-krishna-daw-bari |
| Jorasanko Sadharan Durgotsav | 600 m | 7 min | — | — | 24h | 70 | jorasanko-sadharan-durgotsav |
| Daw Bari (Bandookwala) | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | daw-bari-bandookwala |
| Laha Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | laha-bari |
| Simla Byayam Samiti | 800 m | 9 min | — | — | 24h | 70 | simla-byayam-samiti |
| Vrindavan Matri Mandir | 800 m | 9 min | — | — | 24h | 70 | vrindavan-matri-mandir |
| Bholanath Dham Dutta Bari | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | bholanath-dham-dutta-bari |
| Shamul Dhone Dutta Bari | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | shamul-dhone-dutta-bari |
| Harakutir Ray Banerjee Bari | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | harakutir-ray-banerjee-bari |
| Hartaki Bagan Sarbojanin Durgotsab | 900 m | 10 min | Sabeki Shonar Protima O Shanti | Manicktala, Daker Saaj, Est 1973, FFD Member | 24h | 86 | hartaki-bagan-sarbojanin |
| Alpha Athletic Association | 1.0 km | 12 min | Simlar Otit O Bartaman (Past & Present of Simla) | Manicktala, Simla, Amherst Row, FFD Member | 24h | 82 | alpha-athletic-association |
| Chaltabagan Lohapatty | 1.1 km | 12 min | Nishan (The Mark) | 2026 Theme, Popular | day | 85 | chaltabagan-lohapatty |
| Chaltabagan Sarbojanin | 1.1 km | 12 min | — | — | day | 70 | chaltabagan-sarbojanin |
| Tekiapara Sarbojanin Durgotsab Committee | 1.1 km | 13 min | Maniktalar Sanhati O Pujo | Maniktala, FFD Member, North Kolkata, Community Para | 24h | 82 | tekiapara-sarbojanin-maniktala |
| Pathuriaghata Pancher Pally | 1.2 km | 13 min | — | — | day | 70 | pathuriaghata-pancher-pally |
| Pathuriaghata Rajbari | 1.2 km | 13 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | pathuriaghata-rajbari |
| Maniktala Saha Bari | 1.5 km | 17 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | maniktala-saha-bari |

- **Kashi Bose Lane:** Warli folk-art pandal by artist Anirban. Pakdandi was the 2025 theme
- **Jorasanko Shib Krishna Daw Bari:** Bonedi bari (family puja); visiting hours limited
- **Daw Bari (Bandookwala):** Bonedi bari (family puja); visiting hours limited
- **Laha Bari:** Bonedi bari (family puja); visiting hours limited
- **Simla Byayam Samiti:** Traditional; linked to the freedom movement
- **Bholanath Dham Dutta Bari:** Bonedi bari (family puja); visiting hours limited
- **Shamul Dhone Dutta Bari:** Bonedi bari (family puja); visiting hours limited
- **Harakutir Ray Banerjee Bari:** Bonedi bari (family puja); visiting hours limited
- **Hartaki Bagan Sarbojanin Durgotsab:** Established in 1973 on Haritaki Bagan Lane, Manicktala. Celebrated North Kolkata heritage puja famous for its graceful Daker Saaj idol, golden crown ornamentation, and traditional dhak beats.
- **Alpha Athletic Association:** Established in 1977 at Amherst Row in the historic Simla/Manicktala neighborhood. Known for intricate pandal craftsmanship, athletic club legacy, and sacred Sabeki Pratima.
- **Chaltabagan Lohapatty:** Ramnami Samaj of Chhattisgarh; music by Pt Vishwa Mohan Bhatt
- **Chaltabagan Sarbojanin:** Separate from Chaltabagan Lohapatty
- **Tekiapara Sarbojanin Durgotsab Committee:** Established in 1994 in Maniktala, North Kolkata. Registered member of Forum for Durgotsab (FFD), celebrated for preserving close-knit community traditions, vibrant cultural shows, and classic idol.
- **Pathuriaghata Rajbari:** Bonedi bari (family puja); visiting hours limited
- **Maniktala Saha Bari:** Bonedi bari (family puja); visiting hours limited

#### Mahatma Gandhi Road (MG Road) — 7 pandals · station id `mahatma-gandhi-road`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Mohammad Ali Park | 400 m | 4 min | — | VIP Pass, Popular | 24h | 96 | mohammad-ali-park |
| Chorbagan Sil Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | chorbagan-sil-bari |
| Chorbagan Mitra Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | chorbagan-mitra-bari |
| Chorebagan Sarbojanin | 600 m | 7 min | Beyond Sound | 2026 Theme, Popular | 24h | 85 | chorebagan-sarbojanin |
| Thanthania Dutta Bari | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | thanthania-dutta-bari |
| College Square | 900 m | 10 min | The Himalayan Abode (Mount Kailash) | 2026 Theme, VIP Pass, Popular | 24h | 96 | college-square |
| Lebutala Sarbojanin | 1.0 km | 11 min | — | — | 24h | 70 | lebutala-sarbojanin |

- **Mohammad Ali Park:** Theme not yet unveiled; huge crowds
- **Chorbagan Sil Bari:** Bonedi bari (family puja); visiting hours limited
- **Chorbagan Mitra Bari:** Bonedi bari (family puja); visiting hours limited
- **Chorebagan Sarbojanin:** By Sushanta Shibani Pal; also reachable from Girish Park
- **Thanthania Dutta Bari:** Bonedi bari (family puja); visiting hours limited
- **College Square:** Lakeside pandal; best around sunset
- **Lebutala Sarbojanin:** Some guides treat this as Santosh Mitra Square itself; check on the day

#### Central — 7 pandals · station id `central`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Subodh Mallick Square | 500 m | 6 min | — | — | 24h | 70 | subodh-mallick-square |
| Bowbazar Sarbojanin | 600 m | 7 min | — | — | 24h | 70 | bowbazar-sarbojanin |
| Kapalitola Sarbojanin | 700 m | 8 min | — | — | 24h | 70 | kapalitola-sarbojanin |
| Badan Chand Roy Bari (Kolutolla Rajbari) | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | badan-chand-roy-bari-kolutolla-rajbari |
| Ramgopal Saha Bari | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | ramgopal-saha-bari |
| Nilmoni Dutta Thakur Bari | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | nilmoni-dutta-thakur-bari |
| Santosh Mitra Square | 1.3 km | 14 min | Sanatani Chetanay Vande Mataram | 2026 Theme, VIP Pass, Popular | day | 96 | santosh-mitra-square |

- **Subodh Mallick Square:** Also close to Chandni Chowk
- **Badan Chand Roy Bari (Kolutolla Rajbari):** Bonedi bari (family puja); visiting hours limited
- **Ramgopal Saha Bari:** Bonedi bari (family puja); visiting hours limited
- **Nilmoni Dutta Thakur Bari:** Bonedi bari (family puja); visiting hours limited
- **Santosh Mitra Square:** In Lebutala Park. Easier from Sealdah (Green Line)

#### Chandni Chowk — 2 pandals · station id `chandni-chowk`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Janbazar Rajbari (Rani Rashmoni Bari) | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | janbazar-rajbari-rani-rashmoni-bari |
| Taltala Sarbojanin | 1.0 km | 11 min | Vande Mataram | 2026 Theme, Popular | 24h | 85 | taltala-sarbojanin |

- **Janbazar Rajbari (Rani Rashmoni Bari):** Bonedi bari (family puja); visiting hours limited

#### Rabindra Sadan — 1 pandal · station id `rabindra-sadan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Chakraberia Sarbojanin | 1.2 km | 13 min | — | — | day | 70 | chakraberia-sarbojanin |

- **Chakraberia Sarbojanin:** Also reachable from Netaji Bhavan

#### Netaji Bhavan (Bhowanipore) — 10 pandals · station id `netaji-bhavan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Bhowanipur 75 Pally | 500 m | 6 min | — | — | 24h | 70 | bhowanipur-75-pally |
| Bhowanipore Mallick Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | bhowanipore-mallick-bari |
| Harish Park | 600 m | 7 min | — | — | 24h | 70 | harish-park |
| Abasar Sarbojanin | 700 m | 8 min | Anya Jekhane Ananya | 2026 Theme, Popular | 24h | 85 | abasar-sarbojanin |
| 68 Pally | 700 m | 8 min | — | — | 24h | 70 | 68-pally |
| 76 Pally | 800 m | 9 min | — | — | 24h | 70 | 76-pally |
| Paddapukur Youth Association | 800 m | 9 min | — | — | 24h | 70 | paddapukur-youth-association |
| Agradut Udayan Sangha | 900 m | 10 min | — | — | 24h | 70 | agradut-udayan-sangha |
| 22 Pally (Northern Park) | 1.0 km | 11 min | — | — | 24h | 70 | 22-pally-northern-park |
| Swadhin Sangha | 1.0 km | 11 min | — | — | 24h | 70 | swadhin-sangha |

- **Bhowanipore Mallick Bari:** Bonedi bari (family puja); visiting hours limited
- **Abasar Sarbojanin:** Tribute to painter Shanu Lahiri

#### Jatin Das Park (Hazra) — 8 pandals · station id `jatin-das-park`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Hazra Park Durgotsav | 200 m | 3 min | — | — | 24h | 70 | hazra-park-durgotsav |
| Bakulbagan Sarbojanin | 600 m | 7 min | — | — | 24h | 70 | bakulbagan-sarbojanin |
| Forward Club | 700 m | 8 min | — | — | 24h | 70 | forward-club |
| 23 Pally | 800 m | 9 min | — | — | 24h | 70 | 23-pally |
| Matri Mandir | 900 m | 10 min | — | — | 24h | 70 | matri-mandir |
| Maddox Square | 1.0 km | 11 min | — | VIP Pass, Popular | 24h | 96 | maddox-square |
| Deshapriya Park | 1.0 km | 11 min | Imagined white-and-gold marble temple | 2026 Theme, VIP Pass, Popular | 24h | 96 | deshapriya-park |
| Alipore Sarbojanin | 1.6 km | 18 min | Ramayana: An Epic Woven in Time | 2026 Theme, Popular | day | 85 | alipore-sarbojanin |

- **Hazra Park Durgotsav:** Right at the station
- **Maddox Square:** All about the adda, not the pandal
- **Deshapriya Park:** 89th year; idol by Padma Shri Sanatan Rudra Pal
- **Alipore Sarbojanin:** 81st year; artist Anirban Das; auto advised. On the Adani preview list

#### Kalighat — 14 pandals · station id `kalighat`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Chotushkone Park Saradia Sammilani | 400 m | 5 min | Pratapaditya Road Sharod Parikrama | Kalighat, Pratapaditya Road, FFD Member, South Kolkata | 24h | 83 | chotushkone-park-kalighat |
| 64 Pally Durgotsav Committee | 400 m | 5 min | Satish Mukherjee Road Sarbojanin Utsab | Kalighat, Manoharpukur, Est 1945, FFD Member | 24h | 84 | 64-pally-manoharpukur |
| 66 Pally | 500 m | 6 min | — | Petpujo | 24h | 70 | 66-pally |
| Adi Lake Pally | 500 m | 6 min | Lake Market Shanti O Aitihyo | Lake Market, Lake Place, Est 1972, South Kolkata Landmark | 24h | 87 | adi-lake-pally-kalighat |
| Badamtala Ashar Sangha | 600 m | 7 min | — | VIP Pass, Petpujo, Popular | 24h | 96 | badamtala-ashar-sangha |
| Nepal Bhattacharjee Street | 600 m | 7 min | — | Petpujo | 24h | 70 | nepal-bhattacharjee-street |
| Tridhara Sammilani | 800 m | 9 min | — | VIP Pass, Petpujo, Popular | 24h | 96 | tridhara-sammilani |
| Pratapaditya Road Tricone Park | 900 m | 10 min | — | Petpujo | 24h | 70 | pratapaditya-road-tricone-park |
| Chetla Agrani | 1.5 km | 17 min | — | VIP Pass, Petpujo, Popular | day | 96 | chetla-agrani |
| Hindustan Park | 1.5 km | 17 min | — | Petpujo | day | 70 | hindustan-park |
| Hindusthan Club | 2.0 km | 22 min | Durgadalan | 2026 Theme, Petpujo, Popular | day | 85 | hindusthan-club |
| Ballygunge Cultural | 2.0 km | 22 min | Jojon (Joining) | 2026 Theme, VIP Pass, Petpujo, Popular | day | 96 | ballygunge-cultural |
| Singhi Park | 2.2 km | 24 min | — | VIP Pass, Petpujo, Popular | day | 96 | singhi-park |
| Ekdalia Evergreen | 2.5 km | 28 min | Somnath Temple | 2026 Theme, VIP Pass, Petpujo, Popular | day | 96 | ekdalia-evergreen |

- **Chotushkone Park Saradia Sammilani:** Long-standing South Kolkata neighbourhood puja on Pratapaditya Road, Sahanagar near Kalighat. Known for its intimate community ambience, classic protima, and cultural programmes.
- **64 Pally Durgotsav Committee:** Established in 1945 at Manoharpukur / Satish Mukherjee Road, Kalighat. A historic South Kolkata gem known for thoughtful installations, warm neighbourhood hospitality, and vibrant local participation.
- **Adi Lake Pally:** Established in 1972 on Lake Place Road, Lake Market. A cherished South Kolkata cultural hub boasting exquisite illumination, classic clay idols, and beloved bhog distribution.
- **Badamtala Ashar Sangha:** Consistent award winner
- **Tridhara Sammilani:** Theme not yet unveiled
- **Chetla Agrani:** 2026 theme not confirmed: reported as Aantarik Anubhooti or Bengal folk life
- **Hindusthan Club:** Gariahat; the pillared hall of old Bengali homes
- **Ballygunge Cultural:** Built from chip packets, bottles and old flex
- **Singhi Park:** Gariahat
- **Ekdalia Evergreen:** Gariahat; traditional idol inside a temple replica. Food nearby: 6 Ballygunge Place (~750 m) for a Bengali dinner

#### Rabindra Sarovar — 6 pandals · station id `rabindra-sarovar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Shib Mandir Sarbojanin | 600 m | 7 min | Parab | 2026 Theme, Popular | 24h | 85 | shib-mandir-sarbojanin |
| Mudiali Club | 700 m | 8 min | Oitijhyer Lokkotha | 2026 Theme, VIP Pass, Popular | 24h | 96 | mudiali-club |
| Samaj Sebi Sangha | 1.0 km | 11 min | Mahapujoy Mahanayak | 2026 Theme, Popular | 24h | 85 | samaj-sebi-sangha |
| Lake Gardens Peoples Association | 1.8 km | 20 min | Srijaney – Gaurab Sanyukta | 2026 Theme, Popular | day | 85 | lake-gardens-peoples-association |
| Suruchi Sangha | 2.0 km | 22 min | — | VIP Pass, Petpujo, Popular | day | 96 | suruchi-sangha |
| South City Mall | 2.2 km | 24 min | Jatra | 2026 Theme, Popular | day | 85 | south-city-mall |

- **Shib Mandir Sarbojanin:** Rajasthan's Gangaur festival
- **Mudiali Club:** Folk tales of heritage
- **Samaj Sebi Sangha:** Posters from all 208 Uttam Kumar films
- **Lake Gardens Peoples Association:** 71st year; idol by Utpal Ghosh. Auto advised
- **Suruchi Sangha:** 2026 theme not confirmed: reported as Utsho or Padma. New Alipore; auto advised. Food nearby: Gupta Brothers for rosogolla and sandesh (confirm nearest branch)
- **South City Mall:** First-year puja at the mall

#### Mahanayak Uttam Kumar (Tollygunge) — 4 pandals · station id `mahanayak-uttam-kumar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Vivekananda Park Athletic Club | 1.5 km | 17 min | — | — | day | 70 | vivekananda-park-athletic-club |
| Vivekananda Sporting Club | 1.5 km | 17 min | — | — | day | 70 | vivekananda-sporting-club |
| Haridevpur 41 Pally | 2.0 km | 22 min | — | — | day | 70 | haridevpur-41-pally |
| Ajeya Sanghati | 2.0 km | 22 min | — | — | day | 70 | ajeya-sanghati |

- **Haridevpur 41 Pally:** Auto advised
- **Ajeya Sanghati:** Auto advised

#### Netaji (Kudghat) (Kudghat) — 2 pandals · station id `netaji`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Ajeyo Sanhati | 900 m | 10 min | Shobdo O Shanti (Sound & Serenity) | Haridevpur, Netaji Kudghat, Est 1980, Theme Puja | 24h | 86 | ajeyo-sanhati-haridevpur |
| Naktala Pally Unnayan Samiti | 1.0 km | 11 min | — | VIP Pass, Popular | 24h | 96 | naktala-pally-unnayan-samiti |

- **Ajeyo Sanhati:** Established in 1980 on Mahatma Gandhi Road, Haridevpur. One of South Kolkata's most innovative theme pujas, known for profound conceptual installations and musical soundscapes.

#### Masterda Surya Sen (Bansdroni) — 1 pandal · station id `masterda-surya-sen`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Roynagar Unnayan Samiti | 800 m | 9 min | — | — | 24h | 70 | roynagar-unnayan-samiti |

#### Gitanjali (Naktala) — 2 pandals · station id `gitanjali`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Naktala Udayan Sangha | 500 m | 6 min | — | VIP Pass, Popular | 24h | 96 | naktala-udayan-sangha |
| Baishnabghata Balak Samity | 800 m | 9 min | — | — | 24h | 70 | baishnabghata-balak-samity |

- **Naktala Udayan Sangha:** Theme not yet unveiled

#### Kavi Nazrul (Garia Bazar) — 5 pandals · station id `kavi-nazrul`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Garia Nabadurga | 600 m | 7 min | — | — | 24h | 70 | garia-nabadurga |
| Tarun Sathi | 800 m | 9 min | — | — | 24h | 70 | tarun-sathi |
| Shyama Pally | 900 m | 10 min | — | — | 24h | 70 | shyama-pally |
| Kamdahari Purbapara | 1.2 km | 13 min | — | — | day | 70 | kamdahari-purbapara |
| Boral Sukanta Sangha | 1.8 km | 10 min | Gram Banglar Sharad Utsab (Village Bengal Heritage) | Boral, Garia, Est 1976, Rural Bengal Theme, Ride (auto) | 24h | 84 | boral-sukanta-sangha |

- **Boral Sukanta Sangha:** Established in 1976 at Sukanta Pally, Boral near Garia. Celebrated for transforming the quiet southern locality with evocative rural art, hand-painted alpona, and melodious shondha aarti.

#### Shahid Khudiram (Briji) — 1 pandal · station id `shahid-khudiram`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Patuli Sarbojanin | 1.2 km | 13 min | — | — | day | 70 | patuli-sarbojanin |

No pandals are listed for: Esplanade, Park Street, Maidan.

### Green Line — Howrah Maidan ↔ Sector V

Stations in order: Howrah Maidan → Howrah → Mahakaran → Esplanade → Sealdah → Phoolbagan → Salt Lake Stadium → Bengal Chemical → City Centre → Central Park → Karunamoyee → Sector V.

#### Howrah Maidan — 9 pandals · station id `howrah-maidan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Howrah Nabagopal Sporting Club | 600 m | 8 min | Matri Shakti & Heritage Terracotta | Grand Installation, Central Howrah, Must Visit, Heritage | 24h | 91 | howrah-nabagopal-sporting |
| Ramkrishnapur Sarbojanin Durgotsab | 1.1 km | 13 min | Ganga Teere Sharodotsab | Ramkrishnapur, Howrah Riverfront, FFD Member, Sabeki | 24h | 84 | ramkrishnapur-sarbojanin-howrah |
| Baje Shibpur Sammilani | 1.4 km | 16 min | Matri Baran & Rajbari Dalan | Shibpur, Heritage, Dhak Beats, Community Bhog | 24h | 89 | baje-shibpur-sammilani |
| Olabibitala Sarbojanin Durgotsav | 1.6 km | 18 min | Harmony of Bengal Arts | Shibpur, Handloom Art, Neighbourhood Gem | 24h | 82 | olabibitala-sarbojanin |
| Kadamtala Sarbojanin Durgotsav | 1.7 km | 19 min | Subarna Prabha (Golden Splendor) | Kadamtala, Light Gates, Crowd Favorite | 24h | 86 | kadamtala-sarbojanin |
| Shibpur Mandirtala Sarbojanin | 2.2 km | 24 min | Panchavarna & Divine Grace | Vidyasagar Setu, Shibpur Landmark, Monumental, Crowd Puller | 24h | 93 | shibpur-mandirtala-sarbojanin |
| Santragachi Sporting Club | 3.2 km | 35 min | Abhaya Murti o Palli Bangla | Santragachi, Lakeside Pandal, Chandannagar Lights | 24h | 87 | santragachi-sporting-club |
| Liluah Agrani Sangha | 3.4 km | 36 min | Prakriti o Matrika (Nature & Motherhood) | Liluah Landmark, Eco Friendly, Art Installation | 24h | 88 | liluah-agrani-sangha |
| Liluah Goswamipara Sarbojanin | 3.8 km | 40 min | Ancient Temple Carvings of Bengal | Liluah, Traditional Heritage, Devotional | 24h | 84 | liluah-goswamipara |

- **Howrah Nabagopal Sporting Club:** One of the most celebrated and historic Pujas of central Howrah, renowned for grand architectural installations and intricate Kumartuli idol.
- **Ramkrishnapur Sarbojanin Durgotsab:** Established in 1983 along Gopal Banerjee Lane near Ramkrishnapur Ghat. FFD registered member known for community heritage, traditional Sabeki idol, and Ganga aarti rituals.
- **Baje Shibpur Sammilani:** Treasured heritage community puja of Baje Shibpur, celebrated for aristocratic thakurdalan recreation, dhak competitions, and community bhog.
- **Olabibitala Sarbojanin Durgotsav:** Vibrant neighborhood celebration in Shibpur known for creative pandals celebrating Bengal handloom and village craft.
- **Kadamtala Sarbojanin Durgotsav:** Popular crowd destination on Narasingha Dutta Road in Kadamtala, attracting pandal hoppers with grand lighting gates.
- **Shibpur Mandirtala Sarbojanin:** Iconic South Howrah puja situated at the Vidyasagar Setu approach. Draws lakh of devotees with its monumental pandal art and serene lighting.
- **Santragachi Sporting Club:** Iconic destination near Santragachi Jheel. Combines lakeside serenity with breathtaking illuminations by Chandannagar light artisans.
- **Liluah Agrani Sangha:** The crowning jewel of Liluah pujas, famed for eco-friendly structures crafted with terracotta tiles, jute ropes, and bamboo lattice.
- **Liluah Goswamipara Sarbojanin:** One of the oldest community pujas in Liluah, maintaining authentic devotional rituals alongside grand facade architecture.

#### Howrah — 2 pandals · station id `howrah`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Ramkrishnapur Byayam Samity | 900 m | 11 min | Veer Ras & Mother India Tribute | Ramkrishnapur, Riverside, Dhunuchi Dance, Howrah Station | 24h | 88 | ramkrishnapur-byayam-samity |
| Salkia Alapani Sangha | 1.8 km | 20 min | Banglar Folk Art & Dokra Weaves | North Howrah, Craft Heritage, Salkia, Folk Art | 24h | 86 | salkia-alapani-sangha |

- **Ramkrishnapur Byayam Samity:** Famed riverside puja close to Ramkrishnapur Ghat and Howrah Railway Station. Renowned for monumental clay work and energetic Dhunuchi dance.
- **Salkia Alapani Sangha:** Celebrated North Howrah puja showcasing traditional rural handicrafts, wooden bell craft, and soul-stirring lighting alongside Grand Trunk Road.

#### Sealdah — 6 pandals · station id `sealdah`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Sealdah Athletic Club | 400 m | 4 min | — | — | 24h | 70 | sealdah-athletic-club |
| Santosh Mitra Square | 800 m | 9 min | Sanatani Chetanay Vande Mataram | 2026 Theme, VIP Pass, Popular | 24h | 96 | santosh-mitra-square-sealdah |
| Udayan Sangha (Entally) | 1.1 km | 13 min | Entally Saradiya Sammilani | Entally, Sealdah, Green Line, Est 1991 | 24h | 83 | udayan-sangha-entally |
| College Square | 1.5 km | 17 min | — | VIP Pass, Popular | day | 96 | college-square-sealdah |
| 37 Pally | 1.5 km | 17 min | — | — | day | 70 | 37-pally |
| Uddipani (Park Circus Sarbojanin Durgotsab) | 2.2 km | 12 min | Sampriti O Barta (Harmony & Social Message) | Park Circus, FFD Member, Social Harmony, Central Kolkata, Ride (auto) | day | 87 | uddipani-park-circus |

- **Santosh Mitra Square:** Lebutala Park. 150 years of Vande Mataram; light and sound
- **Udayan Sangha (Entally):** Established in 1991 at Haralal Das Street, Entally. Minutes from Sealdah Metro Station, known for grand chandeliers, community feast, and vibrant pushpanjali on Ashtami morning.
- **College Square:** Walk along Bowbazar
- **Uddipani (Park Circus Sarbojanin Durgotsab):** Established in 2013 at Park Circus Maidan (opposite Don Bosco School). Official member of Forum for Durgotsab (FFD), renowned for promoting inter-community harmony, social causes, and grand visual aesthetics.

#### Phoolbagan — 6 pandals · station id `phoolbagan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Beleghata 33 Pally | 700 m | 8 min | — | — | 24h | 70 | beleghata-33-pally |
| Mitali Club (Kankurgachi) | 800 m | 9 min | — | — | 24h | 70 | mitali-club-kankurgachi |
| Kankurgachi Yubak Brinda | 800 m | 9 min | — | — | 24h | 70 | kankurgachi-yubak-brinda |
| Beleghata Sarbojanin Durga Puja Committee | 900 m | 11 min | Prakriti O Manobota (Nature & Humanity) | Beleghata, Green Line, FFD Member, Eco Friendly | 24h | 85 | beleghata-sarbojanin-phoolbagan |
| Beliaghata Nabamilan | 900 m | 11 min | Subhas Sarobarer Shanti (Serenity of Subhas Sarobar) | Beleghata, Subhas Sarobar, Est 1969, Green Line | 24h | 85 | beliaghata-nabamilan |
| Beleghata Sandhani Club | 1.2 km | 13 min | — | — | day | 70 | beleghata-sandhani-club |

- **Beleghata Sarbojanin Durga Puja Committee:** Located on Dr. Asutosh Sastri Road, Beleghata near Phoolbagan Metro. Official member of Forum for Durgotsab (FFD), noted for socially conscious themes and beautiful illumination.
- **Beliaghata Nabamilan:** Established in 1969 on Dr. Asutosh Sastri Road beside Subhas Sarobar Park. Celebrated for over 50 years of peaceful community celebrations, traditional clay idol, and warm neighborhood hospitality.

#### Salt Lake Stadium — 3 pandals · station id `salt-lake-stadium`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake IB Block | 800 m | 9 min | — | — | 24h | 70 | salt-lake-ib-block |
| Salt Lake GB Block | 900 m | 10 min | — | — | 24h | 70 | salt-lake-gb-block |
| Salt Lake GD Block | 1.0 km | 11 min | — | — | 24h | 70 | salt-lake-gd-block |

#### City Centre — 6 pandals · station id `city-centre`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake FD Block | 600 m | 7 min | — | Petpujo | 24h | 70 | salt-lake-fd-block |
| Salt Lake BD Block | 800 m | 9 min | — | — | 24h | 70 | salt-lake-bd-block |
| Laboni Estate | 1.2 km | 13 min | — | — | day | 70 | laboni-estate |
| Salt Lake EC Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-ec-block |
| Salt Lake AB Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-ab-block |
| Salt Lake AD Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-ad-block |

- **Salt Lake FD Block:** Theme: Rainbow Kaleidoscope (colour maze with rotating prisms). Salt Lake's biggest crowd. Food nearby: Bhojohori Manna (Salt Lake branch, short cab) for bhetki cutlet, topse fry
- **Laboni Estate:** Check exact gate on Google Maps

#### Central Park — 7 pandals · station id `central-park`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake AG Block | 700 m | 8 min | — | — | 24h | 70 | salt-lake-ag-block |
| Salt Lake AH Block | 800 m | 9 min | — | — | 24h | 70 | salt-lake-ah-block |
| Salt Lake BE Block Part 2 | 900 m | 10 min | — | — | 24h | 70 | salt-lake-be-block-part-2 |
| Salt Lake AE Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-ae-block |
| Keshtopur Prafulla Kanan Paschim Adhibasi Brinda | 2.1 km | 12 min | Banglar Maatir Tane (Rooted in Bengal’s Soil) | Kestopur, VIP Road, Est 1968, Grand Pandal, Ride (auto) | 24h | 87 | keshtopur-prafulla-kanan |
| Nirvik Sangha | 2.8 km | 15 min | Centenary Folk Art (Lokshilpo) | Baguiati, Est 1920, VIP Road Corridor, Centenary Puja, Ride (auto) | day | 83 | nirvik-sangha-baguiati |
| Bangur Avenue C Block | 3.0 km | 33 min | — | Ride (auto) | day | 70 | bangur-avenue-c-block |

- **Keshtopur Prafulla Kanan Paschim Adhibasi Brinda:** Established in 1968 at Prafulla Kanan West, Kestopur. A perennial crowd favorite along VIP Road, celebrated for massive architectural pavilions and social welfare initiatives.
- **Nirvik Sangha:** Established in 1920 at Jyangra, Baguiati. A centenarian community celebration in the northern VIP Road corridor known for rural Bengal folk art installations.

#### Karunamoyee — 6 pandals · station id `karunamoyee`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake BJ Block | 700 m | 8 min | — | — | 24h | 70 | salt-lake-bj-block |
| Salt Lake CE Block | 1.2 km | 13 min | — | — | day | 70 | salt-lake-ce-block |
| Salt Lake AK Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-ak-block |
| Salt Lake FE Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-fe-block |
| Salt Lake AJ Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-aj-block |
| Salt Lake BL Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-bl-block |

#### Sector V (Salt Lake Sector V) — 2 pandals · station id `sector-v`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| New Town Sarbojanin | 4.0 km | 44 min | Padmabhushan | 2026 Theme, Popular | day | 85 | new-town-sarbojanin |
| New Town DB Block Sarbojanin | 5.0 km | 55 min | — | Ride (cab) | day | 70 | new-town-db-block-sarbojanin |

- **New Town Sarbojanin:** Cab from the station; go late afternoon

No pandals are listed for: Mahakaran, Esplanade, Bengal Chemical.

### Purple Line — Joka ↔ Majerhat

Stations in order: Joka → Thakurpukur → Sakher Bazar → Behala Chowrasta → Behala Bazar → Taratala → Majerhat.

#### Thakurpukur — 1 pandal · station id `thakurpukur`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Thakurpukur SB Park | 1.0 km | 11 min | — | — | 24h | 70 | thakurpukur-sb-park |

- **Thakurpukur SB Park:** Theme: Raniganj coal mines. Artist: Raju Sarkar. On the Adani preview list

#### Sakher Bazar — 7 pandals · station id `sakher-bazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Barisha Sarbojanin | 500 m | 6 min | Back to the 1980s | 2026 Theme, Traditional, Bonedi Bari, Popular | ritual | 85 | barisha-sarbojanin |
| Sabarna Roy Chowdhury Aatchala Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | sabarna-roy-chowdhury-aatchala-bari |
| Tapoban | 600 m | 7 min | — | — | 24h | 70 | tapoban |
| Bhola Maheshwartala Sarbojanin | 700 m | 8 min | — | — | 24h | 70 | bhola-maheshwartala-sarbojanin |
| Barisha Club | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | barisha-club |
| Amarendra Bhavan (Roy Bari) | 1.0 km | 11 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | amarendra-bhavan-roy-bari |
| Uttar Barisha | 1.5 km | 17 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | uttar-barisha |

- **Sabarna Roy Chowdhury Aatchala Bari:** Bonedi bari puja of the Sabarna family
- **Barisha Club:** Artists: Eshika Chandra & Deep Das. Behala's heavyweight for social themes
- **Amarendra Bhavan (Roy Bari):** Bonedi bari (family puja); visiting hours limited

#### Behala Chowrasta — 8 pandals · station id `behala-chowrasta`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Barisha Yuba Brinda | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | barisha-yuba-brinda |
| Janakalyan | 700 m | 8 min | — | — | 24h | 70 | janakalyan |
| Barisha Netaji Sangha | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | barisha-netaji-sangha |
| Nabalila Para United Club | 800 m | 9 min | — | — | 24h | 70 | nabalila-para-united-club |
| Barisha Nabin Sangha | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | barisha-nabin-sangha |
| Behala Buroshibtala | 1.2 km | 13 min | — | — | day | 70 | behala-buroshibtala |
| Jagarani | 1.5 km | 17 min | — | — | day | 70 | jagarani |
| Barisha Tarun Tirtha | 1.5 km | 17 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | barisha-tarun-tirtha |

#### Behala Bazar — 8 pandals · station id `behala-bazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Debdaru Fatak Sarbojanin Durgotsab | 600 m | 7 min | Matri Rupena Samsthita (Goddess of Life) | Behala, Purple Line, FFD Member, Creative Pandal | 24h | 86 | debdaru-fatak-behala |
| Behala Friends | 700 m | 8 min | — | — | 24h | 70 | behala-friends |
| Behala 11 Pally | 700 m | 8 min | — | — | 24h | 70 | behala-11-pally |
| Behala Shree Sangha | 800 m | 9 min | — | — | 24h | 70 | behala-shree-sangha |
| Behala Notun Sangha | 800 m | 9 min | — | — | 24h | 70 | behala-notun-sangha |
| Mitra Sangha | 900 m | 10 min | — | — | 24h | 70 | mitra-sangha |
| Behala Notun Dal | 1.5 km | 17 min | Baro Mashe Tero Parbon (Twelve months, thirteen festivals) | 2026 Theme | day | 70 | behala-notun-dal |
| Agradut Club | 1.5 km | 17 min | — | — | day | 70 | agradut-club |

- **Debdaru Fatak Sarbojanin Durgotsab:** Established in 1980 at Panchanan Tala, Behala. Highly anticipated for its creative experimental pandal structures, vibrant lighting, and massive festive footfall along the Purple Line corridor.

#### Taratala — 10 pandals · station id `taratala`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Behala 29 Palli | 300 m | 4 min | Nabajagaraner Sharod Utsab (Dawn of New Awakening) | Taratala, Behala, Est 1934, Historic Para | 24h | 86 | behala-29-palli |
| Behala 29 Pally | 600 m | 7 min | — | — | 24h | 70 | behala-29-pally |
| Aikya Sammilani | 700 m | 8 min | — | — | 24h | 70 | aikya-sammilani |
| Behala Young | 800 m | 9 min | — | — | 24h | 70 | behala-young |
| Behala Club | 1.5 km | 17 min | — | — | day | 70 | behala-club |
| Nandana Yuba Sangha | 1.5 km | 17 min | — | — | day | 70 | nandana-yuba-sangha |
| Naskarpur Sarbojanin | 1.5 km | 17 min | — | — | day | 70 | naskarpur-sarbojanin |
| Netaji Sangha | 1.5 km | 17 min | — | — | day | 70 | netaji-sangha |
| Mitali Sangha | 2.0 km | 22 min | — | — | day | 70 | mitali-sangha |
| Parnashree Palli | 2.0 km | 22 min | — | — | day | 70 | parnashree-palli |

- **Behala 29 Palli:** Founded in 1934 on SN Roy Road, Sahapur near Taratala Metro. One of Behala's oldest community pujas, maintaining unbroken 90+ years of devotional barowari legacy.
- **Behala Club:** Theme: Tel (oil), after Haraprasad Shastri's satire. Artist: Pradip Das. On the Adani preview list

No pandals are listed for: Joka, Majerhat.

### Orange Line — Satyajit Ray ↔ Beleghata

Stations in order: Satyajit Ray → Jyotirindra Nandi → Kavi Sukanta → Hemanta Mukhopadhyay → VIP Bazar → Ritwik Ghatak → Barun Sengupta → Beleghata.

#### Satyajit Ray (Hiland Park) — 5 pandals · station id `satyajit-ray`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Purba Rajpur | 1.5 km | 17 min | — | — | day | 70 | purba-rajpur |
| Santoshpur Lake Pally | 2.0 km | 22 min | Tandav | 2026 Theme, Popular | day | 85 | santoshpur-lake-pally |
| Santoshpur Trikon Park | 2.0 km | 22 min | — | — | day | 70 | santoshpur-trikon-park |
| Rabindra Pally Sarbojanin | 2.0 km | 22 min | — | — | day | 70 | rabindra-pally-sarbojanin |
| Avenue Pally Mangal | 2.0 km | 22 min | — | — | day | 70 | avenue-pally-mangal |

- **Santoshpur Lake Pally:** Shiva's cosmic dance; 69th year

#### Kavi Sukanta (Kalikapur) — 7 pandals · station id `kavi-sukanta`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Purbachal Sarbojanin | 700 m | 8 min | — | — | 24h | 70 | purbachal-sarbojanin |
| Kalitala Sporting | 800 m | 9 min | — | — | 24h | 70 | kalitala-sporting |
| Purbachal Shakti Sangha | 1.5 km | 17 min | — | — | day | 70 | purbachal-shakti-sangha |
| Ramlal Bazar Sarbojanin | 1.5 km | 17 min | — | — | day | 70 | ramlal-bazar-sarbojanin |
| Madhya Garfa Sarbojanin | 1.5 km | 17 min | — | — | day | 70 | madhya-garfa-sarbojanin |
| Saraswati Sammilani | 1.8 km | 20 min | — | — | day | 70 | saraswati-sammilani |
| Dhakuria Sarbojanin | 2.0 km | 22 min | — | — | day | 70 | dhakuria-sarbojanin |

#### Hemanta Mukhopadhyay (Ruby) — 3 pandals · station id `hemanta-mukhopadhyay`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Rajdanga Naba Uday Sangha | 1.0 km | 11 min | — | — | 24h | 70 | rajdanga-naba-uday-sangha |
| Rajdanga Amra Kajon Kalyan Samity | 1.0 km | 11 min | — | — | 24h | 70 | rajdanga-amra-kajon-kalyan-samity |
| VIP Nagar Sarbojanin | 1.5 km | 17 min | — | — | day | 70 | vip-nagar-sarbojanin |

- **Rajdanga Naba Uday Sangha:** Artist: Debasis Barui. On the Adani preview list
- **Rajdanga Amra Kajon Kalyan Samity:** Artist: Purnendu Dey. On the Adani preview list

#### VIP Bazar — 5 pandals · station id `vip-bazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Milan Tirtha | 600 m | 7 min | — | — | 24h | 70 | milan-tirtha |
| Sunil Nagar | 1.5 km | 17 min | — | — | day | 70 | sunil-nagar |
| Kasba Bosepukur Sitala Mandir | 1.5 km | 17 min | — | — | day | 70 | kasba-bosepukur-sitala-mandir |
| Bosepukur Talbagan | 1.5 km | 17 min | — | — | day | 70 | bosepukur-talbagan |
| Kalyan Sangha | 1.8 km | 20 min | — | — | day | 70 | kalyan-sangha |

- **Kasba Bosepukur Sitala Mandir:** 77th year; 2026 theme not confirmed: most reports say Chup (silence, inspired by Ramprasad), one says Dhongsho. Late night: auto from Kalighat (Blue Line)

No pandals are listed for: Jyotirindra Nandi, Ritwik Ghatak, Barun Sengupta, Beleghata.

### Yellow Line — Noapara ↔ Jai Hind (Airport)

Stations in order: Noapara → Dum Dum Cantonment → Jessore Road → Jai Hind (Airport).

#### Jessore Road — 4 pandals · station id `jessore-road`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Nagerbazar Yuba Sangha | 1.5 km | 17 min | — | — | day | 70 | nagerbazar-yuba-sangha |
| Arjunpur Amra Sabai Club | 2.0 km | 22 min | — | Ride (auto) | day | 70 | arjunpur-amra-sabai-club |
| Aswininagar Bandhu Mahal | 2.0 km | 22 min | — | Ride (auto) | day | 70 | aswininagar-bandhu-mahal |
| Rail Pukur United Club | 2.0 km | 22 min | Collage | 2026 Theme, Popular | day | 85 | rail-pukur-united-club |

- **Nagerbazar Yuba Sangha:** Artist: Bhabatosh Sutar. On the Adani preview list
- **Rail Pukur United Club:** 73rd year; pandal made from old newspapers. Auto

#### Jai Hind (Airport) (Airport) — 3 pandals · station id `jai-hind`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Chinar Park Adhibasibrinda | 3.0 km | 33 min | — | Ride (cab) | day | 70 | chinar-park-adhibasibrinda |
| Masterda Smriti Sangha (Prafulla Kanan) | 4.0 km | 44 min | — | Ride (cab) | day | 70 | masterda-smriti-sangha-prafulla-kanan |
| Kestopur Prafullakanan (Poschim) Adhibasibrinda | 4.0 km | 44 min | — | Ride (cab) | day | 70 | kestopur-prafullakanan-poschim-adhibasibrinda |

No pandals are listed for: Noapara, Dum Dum Cantonment.

Hours codes: `24h` = open round the clock on festival days; `day` = open morning to late night; `ritual` = ritual hours only (about 8 AM–1 PM, and evening arati).

Some pandals appear under two stations because they can be walked from either (for example Santosh Mitra Square and College Square, from both Central/Mahatma Gandhi Road and Sealdah).

## Instagram

The app links 14 reels on 9 pandal pages. Reels are linked, not hosted; they belong to the accounts named.

### Reels by pandal

| Pandal | What the reel shows | Posted by | URL |
|---|---|---|---|
| Santosh Mitra Square | The 2026 idol arrives at the pandal from Mintu Pal’s Kumartuli studio | @bongnabangali | https://www.instagram.com/reel/DeFQhCCTl8M/ |
| Santosh Mitra Square | The idol sets out from Kumartuli | @bongnabangali | https://www.instagram.com/reel/DeEwa0-z9VG/ |
| Santosh Mitra Square | The 2026 idol arrives at the pandal from Mintu Pal’s Kumartuli studio | @bongnabangali | https://www.instagram.com/reel/DeFQhCCTl8M/ |
| Santosh Mitra Square | The idol sets out from Kumartuli | @bongnabangali | https://www.instagram.com/reel/DeEwa0-z9VG/ |
| Behala Notun Dal | The 2026 theme: “Baro Mashe Tero Parbon”, Bengal’s festival calendar in one pandal | @kolkatar_golpo | https://www.instagram.com/reel/DeMgwRVN3vQ/ |
| Behala Notun Dal | Exclusive first look at the 2026 Maa Durga idol | @explorewitharitra | https://www.instagram.com/reel/DeMnQE7zU_j/ |
| Behala Notun Dal | Last-moment preparation and the evening look | @explorewitharitra | https://www.instagram.com/reel/Dd6xQ5JTxoj/ |
| Chaltabagan Lohapatty | Exclusive first look: “Nishan”, the 2026 theme | @thekolkatabuzz | https://www.instagram.com/reel/DeKSKlVThzF/ |
| Deshapriya Park | Exclusive first look at the 2026 Maa Durga idol | @explorewitharitra | https://www.instagram.com/reel/Dd9f3S0zosn/ |
| Hatibagan Sarbojanin | First look at Chokkhudan, the painting of the eyes | @explorewitharitra | https://www.instagram.com/reel/DeKAXUGzVka/ |
| Hatibagan Sarbojanin | Preparations for the 2026 theme, “Chhanda Chhara Channahara” | @subha_yatra | https://www.instagram.com/reel/DeEthRxTN9j/ |
| Hatibagan Sarbojanin | The making: a pandal built from wooden chairs | @addymukheerjee | https://www.instagram.com/reel/DeLgQsgvyI1/ |
| Tridhara Sammilani | Preparations under way at the pandal ground | @tridhara_akalbodhan | https://www.instagram.com/reel/Dd5g0Hih7u-/ |
| Tridhara Sammilani | The 2026 puja theme song | @tridhara_akalbodhan | https://www.instagram.com/reel/Ddy1gxwBgIt/ |
| Nalin Sarkar Street | Exclusive first look at Sanatan Dinda’s 2026 work | @explorewitharitra | https://www.instagram.com/reel/DdyrcO6zwne/ |
| Ahiritola Sarbojanin | First look at the 2026 Durga pratima | @explorewitharitra | https://www.instagram.com/reel/Dd4HOPGzjNH/ |

### Puja committee accounts

Only these committee handles are on record. Do not guess handles for other pandals.

| Pandal | Handle |
|---|---|
| Tridhara Sammilani | @tridhara_akalbodhan |
| Hatibagan Sarbojanin | @hatibagan_sarbojanin_durgotsav |
| Kumartuli Park | @kumartulipark |

### Independent creators and city guides

Not official and not affiliated with the guide or the committees.

- @explorewitharitra (Aritra AK Kundu) — First-look reels that name the pandal and location
- @thekolkatabuzz (The Kolkata Buzz) — City guide · Pujo reels and updates
- @bongnabangali (Bong Na Bangali) — Bengali festival creator · idols and pandal previews
- @kolkatar_golpo (Kolkatar Golpo) — City guide · theme reveals and first looks
- @subha_yatra — Pandal preparation videos
- @addymukheerjee — Behind-the-scenes pandal making
- @behaya__ (Bipradev Roy) — Cinematic pandal reels (locations usually unnamed)
- @durgapujakolkata (Durga Puja Kolkata) — Photo updates from the pandals
- @mr_kolkata_vlogger — Pandal walk-throughs
- @kolkatacityofjoy — Pandal previews
- @kalkatian — Pujo season posts
- @pixel.tuhin_ — Pandals beyond the city, including Howrah

## What the app does not have

- Street addresses, surveyed coordinates or turn-by-turn routes for pandals (the app hands off to Google Maps by name).
- Entry fees, VIP pass prices, queue lengths or live crowd data.
- Official Metro timetables or fares.
- Reviews, ratings or user comments.
- Pandals away from the listed Metro stations, including Howrah and the suburbs.
