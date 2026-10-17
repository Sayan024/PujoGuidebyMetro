# Pujo by Metro 2026

> A guide to Durga Puja pandals and Bonedi Bari (old family) pujas in Kolkata, India, organised by the Kolkata Metro station you walk from. This file is the complete dataset behind the web app, written for AI assistants.

- Coverage: 391 pandals near 47 Metro stations on 5 lines
- Festival: Durga Puja 2026 (Bengali year 1433), Kolkata, West Bengal
- Created by: Sayan Banerjee
- Generated: 2026-10-17 from the app's own data files

## How to answer from this file

- Treat this as the only source for what the app contains. If something is not here, say the guide does not list it; do not fill gaps from general knowledge.
- Every pandal belongs to one Metro station. "Distance" and "walk" are measured on foot from that station.
- To recommend pandals, filter by line or station, then by distance, tags or theme. Rows within each station are sorted nearest first.
- Link users to the pandal page: `/pandal/<id>`. The id is the last column of each table. Paths in this file are relative to the address this file was served from.
- "Popularity" is the guide's own 0–100 crowd-pull score, not a rating or review.

## What is uncertain — say so when it matters

- **Themes:** only 102 of 391 pandals have a theme on record. "—" in the Theme column means not announced or not known, not "no theme".
- **Photos:** the app has a real photograph for 31 pandals. The rest show an illustrated cover.
- **Notes:** 262 pandals have notes from the compiler; the others have none.
- **Map positions:** Metro stations are at approximately real coordinates. Pandal markers are placed at the listed distance from the station on an arbitrary bearing, so they are not surveyed addresses. Do not quote pandal coordinates or give turn-by-turn directions from this file.
- **Station coordinates and station lists** were compiled by hand and are not from an official Metro Railway source.
- **Travel advisory and crowd levels** are indicative, based on previous years.
- **Timings, themes and Metro services** can change. Advise users to confirm with the puja committee or Metro Railway Kolkata.
- The guide is independent and not affiliated with Metro Railway Kolkata or any puja committee.

## Site pages

| Page | URL | What it does |
|---|---|---|
| Home | / | Overview, calendar, advisory, explorer preview, map, award shortlist |
| Pandal Explorer | /explore | Search and filter all pandals. Accepts `?line=<line id>`, `?station=<station id>`, `?q=<text>` |
| Pujo Map | /map | Street map, network map and 3D view. Accepts `?station=<station id>` or `?pandal=<pandal id>` |
| Routes | /routes | Five walking routes, each starting at a Metro station and opening as one Google Maps route |
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
| Blue Line | blue | Dakshineswar ↔ Shahid Khudiram | 224 | 23 of 25 |
| Green Line | green | Howrah Maidan ↔ Sector V | 82 | 10 of 12 |
| Purple Line | purple | Joka ↔ Majerhat | 51 | 6 of 7 |
| Orange Line | orange | Satyajit Ray ↔ Beleghata | 30 | 6 of 8 |
| Yellow Line | yellow | Noapara ↔ Jai Hind (Airport) | 4 | 2 of 4 |

Interchanges in this dataset: Noapara (blue / yellow); Esplanade (blue / green). The Purple and Orange lines have no Metro link to the rest of the network here; the day planner suggests a cab or bus between them.

## Theme categories

| Category | Pandals |
|---|---|
| Heritage Kolkata | 308 |
| Traditional Bonedi Bari | 29 |
| Contemporary Installation | 22 |
| Art & Innovation | 14 |
| Climate & Environment | 8 |
| Mythology | 7 |
| Social Awareness | 2 |
| Technology | 1 |

"Heritage Kolkata" is also the default category for neighbourhood pujas with no specific classification, so it is broad.

## Pandals with an announced theme

| Pandal | Theme | Station | Line |
|---|---|---|---|
| Belur Math Durga Puja & Kumari Puja | Pure Shastric Ritual Tradition (Swami Vivekananda 1901) | Dakshineswar | blue |
| Tala Prattoy | Biyojon (Separation) | Belgachia | blue |
| Sreebhumi Sporting Club | Hawa Mahal | Belgachia | blue |
| Bagbazar Sarbojanin | Sabeki (traditional) | Shyambazar | blue |
| Kashi Bose Lane | Adim (Primal) | Girish Park | blue |
| Mohammad Ali Park | Ancient Ram Mandir | Mahatma Gandhi Road | blue |
| College Square | Jaipur's Albert Hall Museum | Mahatma Gandhi Road | blue |
| Santosh Mitra Square | Sanatani Chetanay Vande Mataram | Central | blue |
| Deshapriya Park | Imagined white-and-gold marble temple | Jatin Das Park | blue |
| Badamtala Ashar Sangha | Kalponik Mondir (Imagined Temple) | Kalighat | blue |
| Tridhara Sammilani | Surasur (Gods and Demons) | Kalighat | blue |
| Chetla Agrani | Vishva Rupe Vishwarupini | Kalighat | blue |
| Ballygunge Cultural | Jojon (Joining) | Kalighat | blue |
| Ekdalia Evergreen | Somnath Temple | Kalighat | blue |
| Mudiali Club | Oitijhyer Lokkotha | Rabindra Sarovar | blue |
| Suruchi Sangha | Padma (Lotus) | Rabindra Sarovar | blue |
| Naktala Udayan Sangha | Kaler Dhwani (Sound of Time) | Gitanjali | blue |
| Santosh Mitra Square | Sanatani Chetanay Vande Mataram | Sealdah | green |
| College Square | Jaipur's Albert Hall Museum | Central | blue |
| 66 Pally | Ek Muthon Agun (A Fistful of Fire) | Kalighat | blue |
| Kasba Bosepukur Sitala Mandir | Chup (Silence) | VIP Bazar | orange |
| Ahiritola Sarbojanin | Maitri Madhuri Anweshane (Searching for Sweet Friendship) | Shobhabazar Sutanuti | blue |
| Behala Notun Dal | Baro Mashe Tero Parbon (Twelve months, thirteen festivals) | Behala Bazar | purple |
| Rajdanga Naba Uday Sangha | Shodhan (Purification) | Hemanta Mukhopadhyay | orange |
| Liluah Agrani Sangha | Prakriti o Matrika (Nature & Motherhood) | Howrah | green |
| Allen Park Durga Puja (Kolkata Sanatani Sangha) | Shiva Leela: Tandav o Laya | Park Street | blue |
| Santragachi Sporting Club | Abhaya Murti o Palli Bangla | Howrah Maidan | green |
| Adi Lake Pally | Lake Market Shanti O Aitihyo | Kalighat | blue |
| Uddipani (Park Circus Sarbojanin Durgotsab) | Sampriti O Barta (Harmony & Social Message) | Sealdah | green |
| Thakurpukur SB Park | Koliyari (Colliery) | Thakurpukur | purple |
| Behala Friends | Shuddhikaran (Purification) | Behala Bazar | purple |
| Behala Club | Tel: The Market of Faith | Taratala | purple |
| Debdaru Fatak Sarbojanin Durgotsab | Matri Rupena Samsthita (Goddess of Life) | Behala Bazar | purple |
| Hartaki Bagan Sarbojanin Durgotsab | Sabeki Shonar Protima O Shanti | Girish Park | blue |
| Tala Barowari | Barowarir Durgabari | Belgachia | blue |
| Telengabagan | Tilottamar Alinder Iti Kotha | Belgachia | blue |
| Dum Dum Park Bharat Chakra | Bonger Roth Kotha (The Story of Bengal's Chariots) | Belgachia | blue |
| Dum Dum Park Tarun Sangha | Banijye Basate Lakshmi | Belgachia | blue |
| Lake Town Adhibasi Brinda | Bengal folk handloom heritage | Belgachia | blue |
| Hatibagan Nabin Pally | Hasikhushi Para | Shyambazar | blue |
| Hatibagan Sarbojanin | Chhandachhara Chhannachhara (Rhythmless, Orderless) | Shyambazar | blue |
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
| Samaj Sebi Sangha | Mahapujoy Mahanayak | Kalighat | blue |
| South City Mall | Jatra | Rabindra Sarovar | blue |
| Lake Gardens Peoples Association | Srijaney – Gaurab Sanyukta | Rabindra Sarovar | blue |
| Beleghata 33 Pally | Uddan (Flight) | Phoolbagan | green |
| New Town Sarbojanin | Padmabhushan | Sector V | green |
| Barisha Sarbojanin | Back to the 1980s | Sakher Bazar | purple |
| Santoshpur Lake Pally | Tandav | Satyajit Ray | orange |
| Rail Pukur United Club | Collage | Central Park | green |
| Bally Sarbojanin Durgotsav | Sabeki Ekchala Murti & Shehnai | Dakshineswar | blue |
| Ariadaha Jubak Sangha | Shantir Utsab (Festival of Peace) | Dakshineswar | blue |
| Beleghata Sarbojanin Durga Puja Committee | Prakriti O Manobota (Nature & Humanity) | Phoolbagan | green |
| Sobhabazar Burtolla Sarbojanin Durgotsab | Purono Kolkatar Pratidhwani (Echoes of Old Calcutta) | Shobhabazar Sutanuti | blue |
| Kidderpore 25 Pally | Paricharan | Majerhat | purple |
| Liluah Goswamipara Sarbojanin | Ancient Temple Carvings of Bengal | Howrah | green |
| Jorabagan Chhatra Sanghaati | Ganga Tire Sutanuti Katha | Shobhabazar Sutanuti | blue |
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
| Shyampukur Sanghatirtha | Shobhabazarer Aitihyo O Shilpo (Heritage of Sovabazar) | Shobhabazar Sutanuti | blue |
| Alpha Athletic Association | Simlar Otit O Bartaman (Past & Present of Simla) | Girish Park | blue |
| Tekiapara Sarbojanin Durgotsab Committee | Maniktalar Sanhati O Pujo | Girish Park | blue |
| Santoshpur Avenue South Club | Nirmaan Binirmaan (Construction-Deconstruction) | Satyajit Ray | orange |
| Kendua Shanti Sangha - Patuli | Aishwaryi | Kavi Nazrul | blue |
| Shimla Vivekananda Sporting Club | Door of Mithila | Girish Park | blue |
| Dakshindari Youth | Ashwamedher Ghora (The Horse of Ashwamedha) | Belgachia | blue |
| Salt Lake FD Block | Nakshi Konar Math | City Centre | green |
| Behala Youngmen's Association | Chhuti (Holiday) | Taratala | purple |
| Rajdanga Amra Kajon Kalyan Samity | Utsarito Aalo (Radiated Light) | Hemanta Mukhopadhyay | orange |
| Yuba Sangha (Nagerbazar) | Ek Pukur Bhalobasa (A Pond Full of Love) | Dum Dum Cantonment | yellow |

## All pandals, by line and station

Columns: distance and walking time from the station · theme ("—" = not on record) · tags · hours · popularity · page id.
Tags: 2026 Theme, Traditional, Bonedi Bari, VIP Pass, Petpujo, Popular. "Ride" in the tags means the compiler recommends an auto-rickshaw or cab from the station instead of walking.

### Blue Line — Dakshineswar ↔ Shahid Khudiram

Stations in order: Dakshineswar → Baranagar → Noapara → Dum Dum → Belgachia → Shyambazar → Shobhabazar Sutanuti → Girish Park → Mahatma Gandhi Road → Central → Chandni Chowk → Esplanade → Park Street → Maidan → Rabindra Sadan → Netaji Bhavan → Jatin Das Park → Kalighat → Rabindra Sarovar → Mahanayak Uttam Kumar → Netaji (Kudghat) → Masterda Surya Sen → Gitanjali → Kavi Nazrul → Shahid Khudiram.

#### Dakshineswar — 5 pandals · station id `dakshineswar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Dakshineswar Dolpere Adi Sarbojanin | 1.1 km | 12 min | — | Tala Belgachia Dakshineswar, North Kolkata | day | 64 | dakshineswar-dolpere-adi-sarbojanin |
| Bally Sarbojanin Durgotsav | 2.1 km | 22 min | Sabeki Ekchala Murti & Shehnai | Bally, Daker Saaj, Centenary Puja, Traditional | day | 85 | bally-sarbojanin |
| Ariadaha Jubak Sangha | 2.1 km | 12 min | Shantir Utsab (Festival of Peace) | Ariadaha, Est 1939, Dakshineswar Belt, FFD Member, Ride (auto) | 24h | 85 | ariadaha-jubak-sangha |
| Bally Chaitalpara Buri Maa (Aatchala) | 2.2 km | 24 min | — | Howrah - Belur & Bally, Howrah, Ride (auto) | day | 64 | bally-chaitalpara-buri-maa |
| Belur Math Durga Puja & Kumari Puja | 2.6 km | 28 min | Pure Shastric Ritual Tradition (Swami Vivekananda 1901) | Kumari Puja, Spiritual Landmark, Maha Ashtami, Vivekananda Tradition | day | 98 | belur-math-kumari-puja |

- **Dakshineswar Dolpere Adi Sarbojanin:** Neighbourhood puja in Dakshineswar, part of the Tala Belgachia Dakshineswar cluster.
- **Bally Sarbojanin Durgotsav:** Historic centennial puja in Bally Khal vicinity. Renowned for strict adherence to Vaishnava and Shakta shastras with exquisite daker saaj idol.
- **Ariadaha Jubak Sangha:** Historic 1939 community celebration at South Nowda Para, Ariadaha. Draws devotees across North 24 Parganas and Dakshineswar with monumental decorative art and serene riverside rituals.
- **Bally Chaitalpara Buri Maa (Aatchala):** Neighbourhood puja in Bally, part of the Howrah - Belur & Bally cluster.
- **Belur Math Durga Puja & Kumari Puja:** Established in 1901 by Swami Vivekananda. World-renowned for the sacred Kumari Puja on Maha Ashtami morning and sublime Vedic chants by the monks of Ramakrishna Math.

#### Baranagar — 2 pandals · station id `baranagar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Baranagar Netaji Colony Lowland | 1.0 km | 11 min | — | — | 24h | 70 | baranagar-netaji-colony-lowland |
| Milangarh Sarbojanin | 1.6 km | 18 min | — | Tala Belgachia Dakshineswar, North Kolkata | day | 64 | milangarh-sarbojanin |

- **Milangarh Sarbojanin:** Neighbourhood puja in Dakshineswar, part of the Tala Belgachia Dakshineswar cluster.

#### Noapara — 2 pandals · station id `noapara`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Nawpara Dadabhai Sangha | 500 m | 6 min | — | — | 24h | 70 | nawpara-dadabhai-sangha |
| Nwapara Udayan Sangha | 600 m | 7 min | — | — | 24h | 70 | nwapara-udayan-sangha |

- **Nawpara Dadabhai Sangha:** Some lists call it Baranagar Dada Bhai Sangha

#### Dum Dum — 5 pandals · station id `dum-dum`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Paikpara 14 Pally | 600 m | 7 min | — | Ride (auto) | day | 70 | paikpara-14-pally |
| Paikpara 15 Pally | 1.1 km | 12 min | — | Ride (auto) | day | 70 | paikpara-15-pally |
| Sinthee Sarbojanin | 1.9 km | 21 min | — | Ride (auto) | day | 70 | sinthee-sarbojanin |
| CIT Sarbojanin | 2.1 km | 23 min | — | Tala Belgachia Dakshineswar, North Kolkata, Ride (auto) | day | 64 | cit-sarbojanin |
| Bandhudal Sporting Club (Sithir More) | 2.3 km | 25 min | — | Ride (auto) | day | 70 | bandhudal-sporting-club-sithir-more |

- **CIT Sarbojanin:** Neighbourhood puja in Tala, part of the Tala Belgachia Dakshineswar cluster.

#### Belgachia — 23 pandals · station id `belgachia`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Belgachia Sarbojanin | 800 m | 9 min | — | — | 24h | 70 | belgachia-sarbojanin |
| Tala Prattoy | 900 m | 10 min | Biyojon (Separation) | 2026 Theme, VIP Pass, Popular | 24h | 96 | tala-prattoy |
| Tala Park | 1.0 km | 11 min | — | — | 24h | 70 | tala-park |
| Laketown Nutan Palli Pradeep Sangha | 1.2 km | 13 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | laketown-nutan-palli-pradeep-sangha |
| Laketown Netaji Sporting Club | 1.4 km | 15 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | laketown-netaji-sporting-club |
| Telengabagan | 1.5 km | 17 min | Tilottamar Alinder Iti Kotha | 2026 Theme, Popular | day | 85 | telengabagan |
| Dakshinpara Durgotsab | 1.5 km | 17 min | — | — | day | 70 | dakshinpara-durgotsab |
| Lake Town Adhibasi Brinda | 1.6 km | 18 min | Bengal folk handloom heritage | 2026 Theme, Popular | day | 85 | lake-town-adhibasi-brinda |
| Shurir Bagan | 1.6 km | 18 min | — | Hatibagan & Beadon St, North Kolkata | day | 64 | shurir-bagan |
| Pragati Pally Adhibasi Brinda | 1.6 km | 18 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | pragati-pally-adhibasi-brinda |
| Tala Barowari | 1.7 km | 19 min | Barowarir Durgabari | 2026 Theme, Traditional, Popular | ritual | 85 | tala-barowari |
| Jawpur Bayam Samiti | 1.7 km | 19 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | jawpur-bayam-samiti |
| Lake Town Association | 1.8 km | 20 min | — | — | day | 70 | lake-town-association |
| Laketown Vivekananda Park | 1.9 km | 21 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | laketown-vivekananda-park |
| Golaghata Sammilani | 2.0 km | 22 min | — | — | day | 70 | golaghata-sammilani |
| Sreebhumi Sporting Club | 2.1 km | 23 min | Hawa Mahal | 2026 Theme, VIP Pass, Popular, Ride (auto) | day | 96 | sreebhumi-sporting-club |
| Dakshindari Youth | 3.0 km | 33 min | Ashwamedher Ghora (The Horse of Ashwamedha) | — | day | 70 | dakshindari-youth |
| Tetultala Netaji Sporting Club | 3.0 km | 33 min | — | Ride (auto) | day | 70 | tetultala-netaji-sporting-club |
| Dum Dum Park Bharat Chakra | 3.3 km | 36 min | Bonger Roth Kotha (The Story of Bengal's Chariots) | 2026 Theme, Popular, Ride (auto) | day | 85 | dum-dum-park-bharat-chakra |
| Dum Dum Park Tarun Sangha | 3.3 km | 36 min | Banijye Basate Lakshmi | 2026 Theme, Popular, Ride (auto) | day | 85 | dum-dum-park-tarun-sangha |
| Dum Dum Park Sarbojanin | 3.6 km | 40 min | — | Ride (auto) | day | 86 | dum-dum-park-sarbojanin |
| Dum Dum Park Yubak Brinda | 3.7 km | 41 min | — | Ride (auto) | day | 84 | dum-dum-park-yubak-brinda |
| Dum Dum Park Tarun Dal | 3.9 km | 43 min | — | Ride (auto) | day | 85 | dum-dum-park-tarun-dal |

- **Tala Prattoy:** 101st year on a new, smaller site; go early
- **Laketown Nutan Palli Pradeep Sangha:** Neighbourhood puja in Lake Town, part of the Dum Dum & Lake Town cluster.
- **Laketown Netaji Sporting Club:** Neighbourhood puja in Lake Town, part of the Dum Dum & Lake Town cluster.
- **Telengabagan:** Old-Kolkata corridors, bridges and balconies. Good late-night stop after Hatibagan
- **Lake Town Adhibasi Brinda:** About 750 m walk from Sreebhumi
- **Shurir Bagan:** Neighbourhood puja in Hedua / Goabagan, part of the Hatibagan & Beadon St cluster.
- **Pragati Pally Adhibasi Brinda:** Neighbourhood puja in Lake Town, part of the Dum Dum & Lake Town cluster.
- **Tala Barowari:** 106th year; the history of Durga Puja itself
- **Jawpur Bayam Samiti:** Neighbourhood puja in Dum Dum Park, part of the Dum Dum & Lake Town cluster.
- **Lake Town Association:** Near Sreebhumi
- **Laketown Vivekananda Park:** Neighbourhood puja in Lake Town, part of the Dum Dum & Lake Town cluster.
- **Sreebhumi Sporting Club:** 953-window replica; traditional idol; 2-hour queues. Also an auto from Central Park (Green Line)
- **Dum Dum Park Bharat Chakra:** Bengal's chariot traditions and wooden craftsmanship. On the Asian Paints Sharad Shamman shortlist
- **Dum Dum Park Tarun Sangha:** Bengal's historic river trade, with boats and docks (also called Beniakatha)

#### Shyambazar — 22 pandals · station id `shyambazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Friends Union Club | 300 m | 3 min | — | Petpujo | 24h | 70 | friends-union-club |
| Shyam Square | 500 m | 6 min | — | Petpujo | 24h | 85 | shyam-square |
| Deshbandhu Ladies Park | 500 m | 6 min | — | Bagbazar & Shyambazar, North Kolkata | day | 64 | deshbandhu-ladies-park |
| Baghbazar 7 Pally Sarbojanin | 500 m | 6 min | — | Bagbazar & Shyambazar, North Kolkata | day | 64 | baghbazar-7-pally-sarbojanin |
| Bidhan Sarani Atlas | 700 m | 8 min | — | Petpujo | 24h | 70 | bidhan-sarani-atlas |
| Naba Baghbazar | 700 m | 8 min | — | Bagbazar & Shyambazar, North Kolkata | day | 64 | naba-baghbazar |
| Sikdar Bagan Sadharan Durgotsav | 800 m | 9 min | Panche Panchaban (The Five Arrows) | 2026 Theme, Petpujo, Popular | 24h | 85 | sikdar-bagan-sadharan-durgotsav |
| Nalin Sarkar Street | 800 m | 9 min | Jalalipi | 2026 Theme, Petpujo, Popular | 24h | 85 | nalin-sarkar-street |
| Hatibagan Sarbojanin | 900 m | 10 min | Chhandachhara Chhannachhara (Rhythmless, Orderless) | 2026 Theme, Petpujo, Popular | 24h | 85 | hatibagan-sarbojanin |
| Shyampukur Adi Sarbojanin | 1.0 km | 11 min | — | Petpujo | 24h | 70 | shyampukur-adi-sarbojanin |
| Baghbazar Pally | 1.0 km | 11 min | — | Bagbazar & Shyambazar, North Kolkata | day | 64 | baghbazar-pally |
| Hatibagan Nabin Pally | 1.1 km | 12 min | Hasikhushi Para | 2026 Theme, Petpujo, Popular | 24h | 85 | hatibagan-nabin-pally |
| Hari Ghosh Street | 1.2 km | 13 min | — | Petpujo | 24h | 70 | hari-ghosh-street |
| Bagbazar Sarbojanin | 1.2 km | 13 min | Sabeki (traditional) | 2026 Theme, Traditional, Bonedi Bari, VIP Pass, Petpujo, Popular | ritual | 96 | bagbazar-sarbojanin |
| Tala Palli | 1.3 km | 14 min | — | Tala Belgachia Dakshineswar, North Kolkata | day | 64 | tala-palli |
| Ultadanga Yuba Brinda | 1.4 km | 15 min | — | Petpujo | day | 70 | ultadanga-yuba-brinda |
| Kabiraj Bagan | 1.6 km | 18 min | — | Petpujo | 24h | 70 | kabiraj-bagan |
| Ultadanga Karbagan | 1.8 km | 20 min | — | Petpujo | day | 70 | ultadanga-karbagan |
| Ultadanga Bidhan Sangha | 1.8 km | 20 min | — | Petpujo | day | 70 | ultadanga-bidhan-sangha |
| Lalabagan Nabankur | 1.9 km | 21 min | — | Petpujo | 24h | 70 | lalabagan-nabankur |
| Ultadanga Pallyshree | 2.5 km | 28 min | — | Petpujo | day | 70 | ultadanga-pallyshree |
| Ultadanga Sangrami | 3.3 km | 36 min | — | Petpujo, Ride (auto) | day | 70 | ultadanga-sangrami |

- **Deshbandhu Ladies Park:** Neighbourhood puja in Deshbandhu Park, Shyambazar, part of the Bagbazar & Shyambazar cluster.
- **Baghbazar 7 Pally Sarbojanin:** Neighbourhood puja in Bagbazar, part of the Bagbazar & Shyambazar cluster.
- **Naba Baghbazar:** Neighbourhood puja in Bagbazar, part of the Bagbazar & Shyambazar cluster.
- **Sikdar Bagan Sadharan Durgotsav:** Wood and metal filigree; idol inspired by old Bengali jewellery boxes. Narrow lane; long queues
- **Nalin Sarkar Street:** Artist: Sanatan Dinda. The Ganga's flow, pollution and erosion; idol styled like carved stone; theme music on Bhupen Hazarika's Bistirno Dupare. On the Adani preview list
- **Hatibagan Sarbojanin:** Century-old houses beside new high-rises: north Kolkata's mixed rhythm. Go early morning. Food nearby: Hatibagan street stalls for jhalmuri, aloo kabli, telebhaja
- **Baghbazar Pally:** Neighbourhood puja in Bagbazar, part of the Bagbazar & Shyambazar cluster.
- **Hatibagan Nabin Pally:** Whole lane repainted in colour; tribute to rhyme-writer Jogindranath Sarkar
- **Bagbazar Sarbojanin:** Ekchala idol with daker saj, on the Ganga bank. Food nearby: Golbari at Shyambazar five-point crossing for mutton kosha (~900 m)
- **Tala Palli:** Neighbourhood puja in Tala, part of the Tala Belgachia Dakshineswar cluster.
- **Ultadanga Yuba Brinda:** Ultadanga; auto
- **Ultadanga Karbagan:** Ultadanga; auto from Shyambazar
- **Ultadanga Bidhan Sangha:** Ultadanga; auto from Shyambazar
- **Lalabagan Nabankur:** Known for eye-catching themes lately
- **Ultadanga Pallyshree:** Ultadanga; auto
- **Ultadanga Sangrami:** Ultadanga; auto

#### Shobhabazar Sutanuti (Sovabazar) — 20 pandals · station id `shobhabazar-sutanuti`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Sobhabazar Burtolla Sarbojanin Durgotsab | 200 m | 3 min | Purono Kolkatar Pratidhwani (Echoes of Old Calcutta) | Sovabazar, Burtolla, Est 1962, Ekchala Pratima | 24h | 85 | sobhabazar-burtolla |
| Shobhabazar Boro Rajbari | 300 m | 3 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | shobhabazar-boro-rajbari |
| Satadal | 300 m | 3 min | — | Hatibagan & Beadon St, North Kolkata | day | 64 | satadal |
| Shobhabazar Choto Rajbari | 400 m | 4 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | shobhabazar-choto-rajbari |
| Shyampukur Sanghatirtha | 500 m | 6 min | Shobhabazarer Aitihyo O Shilpo (Heritage of Sovabazar) | Sovabazar, FFD Member, North Kolkata, Heritage Para | 24h | 82 | shyampukur-sanghatirtha |
| Darjipara Mitra Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | darjipara-mitra-bari |
| Beadon Street Sarbojanin | 700 m | 8 min | — | Petpujo | day | 70 | beadon-street-sarbojanin |
| Chhatu Babu Latu Babu Bari | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari, Petpujo | ritual | 82 | chhatu-babu-latu-babu-bari |
| Hatkhola Goshaipara | 700 m | 8 min | — | Petpujo | 24h | 70 | hatkhola-goshaipara |
| Jagat Mukherjee Park | 700 m | 8 min | Pandulipi (Manuscripts) | 2026 Theme, Petpujo, Popular | 24h | 85 | jagat-mukherjee-park |
| Beniatola Sarbojanin | 700 m | 8 min | — | Petpujo | 24h | 70 | beniatola-sarbojanin |
| Ahiritola Jubak Brinda | 800 m | 9 min | — | Petpujo | 24h | 84 | ahiritola-jubak-brinda |
| Kumartuli Park | 800 m | 9 min | O Ganga Tumi Boichho Keno | 2026 Theme, Petpujo, Popular | 24h | 85 | kumartuli-park |
| Kumartuli Sarbojanin | 800 m | 9 min | Mon Diye Dekhun (Look closely) | 2026 Theme, Petpujo, Popular | day | 85 | kumartuli-sarbojanin |
| Jorabagan Chhatra Sanghaati | 800 m | 9 min | Ganga Tire Sutanuti Katha | Jorabagan, Est 1996, North Kolkata, FFD Member | 24h | 84 | jorabagan-chhatra-sanghaati |
| Ahiritola Sarbojanin | 900 m | 10 min | Maitri Madhuri Anweshane (Searching for Sweet Friendship) | Petpujo | 24h | 88 | ahiritola-sarbojanin |
| Darjipara Sarbojanin | 1.0 km | 11 min | — | Petpujo | 24h | 70 | darjipara-sarbojanin |
| Goabagan Sarbojanin | 1.1 km | 12 min | — | Hatibagan & Beadon St, North Kolkata | day | 64 | goabagan-sarbojanin |
| Nimtala Sarbojanin | 1.2 km | 13 min | — | Petpujo | day | 70 | nimtala-sarbojanin |
| Gouriberia | 1.8 km | 20 min | — | Petpujo | day | 70 | gouriberia |

- **Sobhabazar Burtolla Sarbojanin Durgotsab:** Established in 1962 on Abinash Kabiraj Street, Sovabazar. Steps away from the Metro station, this revered neighborhood puja features traditional Ekchala protima and sweet communal warmth.
- **Shobhabazar Boro Rajbari:** Bonedi bari puja since 1757
- **Satadal:** Neighbourhood puja in Sikdar Bagan, part of the Hatibagan & Beadon St cluster.
- **Shobhabazar Choto Rajbari:** Bonedi bari (family puja); visiting hours limited
- **Shyampukur Sanghatirtha:** Prominent North Kolkata community puja at Purnendu Shishu Udyan, Shyampukur Street. Official member of Forum for Durgotsab (FFD), celebrated for preserving traditional Barowari heritage and community warmth.
- **Darjipara Mitra Bari:** Bonedi bari (family puja); visiting hours limited
- **Chhatu Babu Latu Babu Bari:** Bonedi bari (family puja); visiting hours limited
- **Jagat Mukherjee Park:** 90th year; also walkable from Shyambazar
- **Kumartuli Park:** The Ganga's journey from Gangotri to the delta. Idol-makers' quarter. Food nearby: Mitra Café, Shobhabazar, for fish kabiraji and cabin snacks
- **Kumartuli Sarbojanin:** Pairs easily with Kumartuli Park
- **Jorabagan Chhatra Sanghaati:** Established in 1996 in Jorabagan. Nestled in historic North Kolkata near the riverside, celebrated for youth community leadership, classic clay modelling, and spirited Sindoor Khela.
- **Ahiritola Sarbojanin:** Bengal's mishti and the culture around it, beside the Ganga
- **Goabagan Sarbojanin:** Neighbourhood puja in Hedua / Goabagan, part of the Hatibagan & Beadon St cluster.
- **Gouriberia:** Some lists group it with Ultadanga

#### Girish Park — 27 pandals · station id `girish-park`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Simla Byayam Samiti | 300 m | 3 min | — | — | 24h | 70 | simla-byayam-samiti |
| Tarun Sporting Club | 300 m | 3 min | — | Hatibagan & Beadon St, North Kolkata | day | 64 | tarun-sporting-club |
| Jorasanko Shib Krishna Daw Bari | 400 m | 4 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | jorasanko-shib-krishna-daw-bari |
| Pathuriaghata Pancher Pally | 500 m | 6 min | — | — | day | 70 | pathuriaghata-pancher-pally |
| Jorasanko Sadharan Durgotsav | 600 m | 7 min | — | — | 24h | 70 | jorasanko-sadharan-durgotsav |
| Daw Bari (Bandookwala) | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | daw-bari-bandookwala |
| Sammilita Malapara | 600 m | 7 min | — | Jorabagan & Pathuriaghata, North Kolkata | day | 64 | sammilita-malapara |
| Pathuriaghata Rajbari | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | pathuriaghata-rajbari |
| Bholanath Dham Dutta Bari | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | bholanath-dham-dutta-bari |
| Shamul Dhone Dutta Bari | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | shamul-dhone-dutta-bari |
| Shimla Vivekananda Sporting Club | 800 m | 9 min | Door of Mithila | Hatibagan & Beadon St, North Kolkata | day | 74 | shimla-vivekananda-sporting-club |
| Laha Bari | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | laha-bari |
| Harakutir Ray Banerjee Bari | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | harakutir-ray-banerjee-bari |
| Hartaki Bagan Sarbojanin Durgotsab | 900 m | 10 min | Sabeki Shonar Protima O Shanti | Manicktala, Daker Saaj, Est 1973, FFD Member | 24h | 86 | hartaki-bagan-sarbojanin |
| Alpha Athletic Association | 1.0 km | 12 min | Simlar Otit O Bartaman (Past & Present of Simla) | Manicktala, Simla, Amherst Row, FFD Member | 24h | 82 | alpha-athletic-association |
| Azad Hind Bag (Hedua Park) | 1.0 km | 11 min | — | Hatibagan & Beadon St, North Kolkata | day | 64 | azad-hind-bag |
| Durga Puja of 4 Ghosh Lane | 1.0 km | 11 min | — | Manicktala & Ultadanga, Bonedi Barir Pujo | ritual | 64 | durga-puja-of-4-ghosh-lane |
| Kashi Bose Lane | 1.1 km | 12 min | Adim (Primal) | 2026 Theme, VIP Pass, Popular | 24h | 96 | kashi-bose-lane |
| Chaltabagan Sarbojanin | 1.1 km | 12 min | — | — | day | 70 | chaltabagan-sarbojanin |
| Tekiapara Sarbojanin Durgotsab Committee | 1.1 km | 13 min | Maniktalar Sanhati O Pujo | Maniktala, FFD Member, North Kolkata, Community Para | 24h | 82 | tekiapara-sarbojanin-maniktala |
| Darpanarayan Tagore Street Sarbojanin | 1.1 km | 12 min | — | Jorabagan & Pathuriaghata, North Kolkata | day | 64 | darpanarayan-tagore-street-sarbojanin |
| Chaltabagan Lohapatty | 1.4 km | 15 min | Nishan (The Mark) | 2026 Theme, Popular | day | 85 | chaltabagan-lohapatty |
| Vrindavan Matri Mandir | 1.4 km | 15 min | — | — | 24h | 70 | vrindavan-matri-mandir |
| Hathkhola Dutta Barir Durga Pujo | 1.4 km | 15 min | — | Jorabagan & Pathuriaghata, Bonedi Barir Pujo | ritual | 64 | hathkhola-dutta-barir-durga-pujo |
| Maniktala Saha Bari | 1.5 km | 17 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | maniktala-saha-bari |
| Srimani Barir Durga Pujo | 1.5 km | 17 min | — | Hatibagan & Beadon St, Bonedi Barir Pujo | ritual | 64 | srimani-barir-durga-pujo |
| Sammilita Lalabagan Sarbojanin | 1.8 km | 20 min | — | Manicktala & Ultadanga, North Kolkata | day | 64 | sammilita-lalabagan-sarbojanin |

- **Simla Byayam Samiti:** Traditional; linked to the freedom movement
- **Tarun Sporting Club:** Neighbourhood puja in Manicktala / Amherst Street, part of the Hatibagan & Beadon St cluster.
- **Jorasanko Shib Krishna Daw Bari:** Bonedi bari (family puja); visiting hours limited
- **Daw Bari (Bandookwala):** Bonedi bari (family puja); visiting hours limited
- **Sammilita Malapara:** Neighbourhood puja in Jorabagan, part of the Jorabagan & Pathuriaghata cluster.
- **Pathuriaghata Rajbari:** Bonedi bari (family puja); visiting hours limited
- **Bholanath Dham Dutta Bari:** Bonedi bari (family puja); visiting hours limited
- **Shamul Dhone Dutta Bari:** Bonedi bari (family puja); visiting hours limited
- **Shimla Vivekananda Sporting Club:** Neighbourhood puja in Simla / Bidhan Sarani, part of the Hatibagan & Beadon St cluster.
- **Laha Bari:** Bonedi bari (family puja); visiting hours limited
- **Harakutir Ray Banerjee Bari:** Bonedi bari (family puja); visiting hours limited
- **Hartaki Bagan Sarbojanin Durgotsab:** Established in 1973 on Haritaki Bagan Lane, Manicktala. Celebrated North Kolkata heritage puja famous for its graceful Daker Saaj idol, golden crown ornamentation, and traditional dhak beats.
- **Alpha Athletic Association:** Established in 1977 at Amherst Row in the historic Simla/Manicktala neighborhood. Known for intricate pandal craftsmanship, athletic club legacy, and sacred Sabeki Pratima.
- **Azad Hind Bag (Hedua Park):** Neighbourhood puja in Hedua / Goabagan, part of the Hatibagan & Beadon St cluster.
- **Durga Puja of 4 Ghosh Lane:** Family (bonedi bari) puja in Manicktala / Amherst Street. Visiting hours can be limited; dress modestly.
- **Kashi Bose Lane:** Warli folk-art pandal by artist Anirban. Pakdandi was the 2025 theme
- **Chaltabagan Sarbojanin:** Separate from Chaltabagan Lohapatty
- **Tekiapara Sarbojanin Durgotsab Committee:** Established in 1994 in Maniktala, North Kolkata. Registered member of Forum for Durgotsab (FFD), celebrated for preserving close-knit community traditions, vibrant cultural shows, and classic idol.
- **Darpanarayan Tagore Street Sarbojanin:** Neighbourhood puja in Pathuriaghata, part of the Jorabagan & Pathuriaghata cluster.
- **Chaltabagan Lohapatty:** Ramnami Samaj of Chhattisgarh; music by Pt Vishwa Mohan Bhatt
- **Hathkhola Dutta Barir Durga Pujo:** Family (bonedi bari) puja in Hatkhola. Visiting hours can be limited; dress modestly.
- **Maniktala Saha Bari:** Bonedi bari (family puja); visiting hours limited
- **Srimani Barir Durga Pujo:** Family (bonedi bari) puja in Hatibagan. Visiting hours can be limited; dress modestly.
- **Sammilita Lalabagan Sarbojanin:** Neighbourhood puja in Lalabagan, part of the Manicktala & Ultadanga cluster.

#### Mahatma Gandhi Road (MG Road) — 7 pandals · station id `mahatma-gandhi-road`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Mohammad Ali Park | 400 m | 4 min | Ancient Ram Mandir | VIP Pass, Popular | 24h | 96 | mohammad-ali-park |
| Chorbagan Sil Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | chorbagan-sil-bari |
| Chorbagan Mitra Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | chorbagan-mitra-bari |
| Chorebagan Sarbojanin | 600 m | 7 min | Beyond Sound | 2026 Theme, Popular | 24h | 85 | chorebagan-sarbojanin |
| Thanthania Dutta Bari | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | thanthania-dutta-bari |
| College Square | 1.0 km | 11 min | Jaipur's Albert Hall Museum | 2026 Theme, VIP Pass, Popular | 24h | 96 | college-square |
| Rammohan Sammilani | 1.2 km | 13 min | — | College St & Sealdah, North Kolkata | day | 64 | rammohan-sammilani |

- **Mohammad Ali Park:** 58th year. Inspired by ancient temples dedicated to Lord Ram
- **Chorbagan Sil Bari:** Bonedi bari (family puja); visiting hours limited
- **Chorbagan Mitra Bari:** Bonedi bari (family puja); visiting hours limited
- **Chorebagan Sarbojanin:** By Sushanta Shibani Pal; also reachable from Girish Park
- **Thanthania Dutta Bari:** Bonedi bari (family puja); visiting hours limited
- **College Square:** Replica-inspired pandal after the Albert Hall Museum of Jaipur, known for its illuminated facade. College Street; MG Road and Central Metro are both close
- **Rammohan Sammilani:** Neighbourhood puja in Amherst Street, part of the College St & Sealdah cluster.

#### Central — 7 pandals · station id `central`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Bowbazar Sarbojanin | 600 m | 7 min | — | — | 24h | 70 | bowbazar-sarbojanin |
| College Square | 600 m | 7 min | Jaipur's Albert Hall Museum | VIP Pass, Popular | day | 96 | college-square-sealdah |
| Kapalitola Sarbojanin | 700 m | 8 min | — | — | 24h | 70 | kapalitola-sarbojanin |
| Badan Chand Roy Bari (Kolutolla Rajbari) | 700 m | 8 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | badan-chand-roy-bari-kolutolla-rajbari |
| Ramgopal Saha Bari | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | ramgopal-saha-bari |
| Nilmoni Dutta Thakur Bari | 900 m | 10 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | nilmoni-dutta-thakur-bari |
| Santosh Mitra Square | 1.1 km | 12 min | Sanatani Chetanay Vande Mataram | 2026 Theme, VIP Pass, Popular | day | 96 | santosh-mitra-square |

- **College Square:** Walk along Bowbazar
- **Badan Chand Roy Bari (Kolutolla Rajbari):** Bonedi bari (family puja); visiting hours limited
- **Ramgopal Saha Bari:** Bonedi bari (family puja); visiting hours limited
- **Nilmoni Dutta Thakur Bari:** Bonedi bari (family puja); visiting hours limited
- **Santosh Mitra Square:** In Lebutala Park. Easier from Sealdah (Green Line)

#### Chandni Chowk — 3 pandals · station id `chandni-chowk`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Subodh Mallick Square | 600 m | 7 min | — | — | 24h | 70 | subodh-mallick-square |
| Janbazar Rajbari (Rani Rashmoni Bari) | 800 m | 9 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | janbazar-rajbari-rani-rashmoni-bari |
| Taltala Sarbojanin | 1.7 km | 19 min | Vande Mataram | 2026 Theme, Popular | 24h | 85 | taltala-sarbojanin |

- **Subodh Mallick Square:** Also close to Chandni Chowk
- **Janbazar Rajbari (Rani Rashmoni Bari):** Bonedi bari (family puja); visiting hours limited

#### Park Street — 1 pandal · station id `park-street`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Allen Park Durga Puja (Kolkata Sanatani Sangha) | 800 m | 9 min | Shiva Leela: Tandav o Laya | Park Street, First year, Ganga-style aarti, Central Kolkata | day | 88 | allen-park-park-street |

- **Allen Park Durga Puja (Kolkata Sanatani Sangha):** Park Street's first-ever Durga Puja, in Allen Park, the home of the Christmas festival. Theme by Subrata Bandyopadhyay on Shiva's leela: the Rudra form, his love for Parvati, and the tandava of creation and destruction. Varanasi-style evening aarti from Chaturthi to Dashami, Baul and folk programmes from Purulia, Bankura and North Bengal, all-night jagaran from Ashtami to Navami and sindoor khela on Dashami. Expect big crowds; the Park Street–Middleton Street stretch may close to cars.

#### Rabindra Sadan — 1 pandal · station id `rabindra-sadan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Chakraberia Sarbojanin | 1.2 km | 13 min | — | — | day | 70 | chakraberia-sarbojanin |

- **Chakraberia Sarbojanin:** Also reachable from Netaji Bhavan

#### Netaji Bhavan (Bhowanipore) — 11 pandals · station id `netaji-bhavan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Bhowanipur 75 Pally | 200 m | 2 min | — | — | 24h | 85 | bhowanipur-75-pally |
| 76 Pally | 400 m | 4 min | — | — | 24h | 70 | 76-pally |
| Bhowanipore Mallick Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | bhowanipore-mallick-bari |
| Harish Park | 600 m | 7 min | — | — | 24h | 70 | harish-park |
| 22 Pally (Northern Park) | 600 m | 7 min | — | — | 24h | 70 | 22-pally-northern-park |
| 68 Pally | 700 m | 8 min | — | — | 24h | 70 | 68-pally |
| Paddapukur Youth Association | 800 m | 9 min | — | — | 24h | 70 | paddapukur-youth-association |
| Abasar Sarbojanin | 900 m | 10 min | Anya Jekhane Ananya | 2026 Theme, Popular | 24h | 85 | abasar-sarbojanin |
| Agradut Udayan Sangha | 900 m | 10 min | — | — | 24h | 70 | agradut-udayan-sangha |
| Swadhin Sangha | 1.0 km | 11 min | — | — | 24h | 70 | swadhin-sangha |
| Padmapukur Baroyari | 1.1 km | 12 min | — | Bhowanipore & Hazra, South Kolkata | day | 64 | padmapukur-baroyari |

- **Bhowanipore Mallick Bari:** Bonedi bari (family puja); visiting hours limited
- **Abasar Sarbojanin:** Tribute to painter Shanu Lahiri
- **Padmapukur Baroyari:** Neighbourhood puja in Padmapukur, Bhowanipore, part of the Bhowanipore & Hazra cluster.

#### Jatin Das Park (Hazra) — 13 pandals · station id `jatin-das-park`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Hazra Park Durgotsav | 100 m | 1 min | — | — | 24h | 85 | hazra-park-durgotsav |
| Bakulbagan Sarbojanin | 400 m | 4 min | — | — | 24h | 70 | bakulbagan-sarbojanin |
| Forward Club | 400 m | 4 min | — | — | 24h | 70 | forward-club |
| 23 Pally | 400 m | 4 min | — | — | 24h | 70 | 23-pally |
| Chandranath Chatterjee Street | 400 m | 4 min | — | Bhowanipore & Hazra, South Kolkata | day | 64 | chandranath-chatterjee-street |
| Golmath Durga Puja Samiti | 500 m | 6 min | — | Bhowanipore, South Kolkata | day | 70 | golmath-durga-puja |
| Rupchand Mukherjee Lane Sarbojanin | 500 m | 6 min | — | Bhowanipore & Hazra, South Kolkata | day | 64 | rupchand-mukherjee-lane-sarbojanin |
| Matri Mandir | 900 m | 10 min | — | — | 24h | 70 | matri-mandir |
| Maddox Square | 1.1 km | 12 min | — | VIP Pass, Popular | 24h | 96 | maddox-square |
| Deshapriya Park | 1.2 km | 13 min | Imagined white-and-gold marble temple | 2026 Theme, VIP Pass, Popular | 24h | 96 | deshapriya-park |
| Alipore Sarbojanin | 1.8 km | 20 min | Ramayana: An Epic Woven in Time | 2026 Theme, Popular | day | 85 | alipore-sarbojanin |
| Falguni Sangha | 2.5 km | 28 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | falguni-sangha |
| Ballygunge 21 Pally | 2.9 km | 32 min | — | Ballygunge & Park Circus, South Kolkata, Ride (auto) | day | 64 | ballygunge-21-pally |

- **Hazra Park Durgotsav:** Right at the station
- **Chandranath Chatterjee Street:** Neighbourhood puja in Bhowanipore, part of the Bhowanipore & Hazra cluster.
- **Golmath Durga Puja Samiti:** Rakhal Mukherjee Road, between Abasar and Bakulbagan, north of Hazra More.
- **Rupchand Mukherjee Lane Sarbojanin:** Neighbourhood puja in Bhowanipore, part of the Bhowanipore & Hazra cluster.
- **Maddox Square:** All about the adda, not the pandal
- **Deshapriya Park:** 89th year; idol by Padma Shri Sanatan Rudra Pal
- **Alipore Sarbojanin:** 81st year; artist Anirban Das; auto advised. On the Adani preview list
- **Falguni Sangha:** Neighbourhood puja in Gariahat, part of the Gariahat & Dhakuria cluster.
- **Ballygunge 21 Pally:** Neighbourhood puja in Adi Ballygunge, part of the Ballygunge & Park Circus cluster.

#### Kalighat — 24 pandals · station id `kalighat`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Dilip Smriti Sangha | 100 m | 1 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | dilip-smriti-sangha |
| Badamtala Ashar Sangha | 200 m | 2 min | Kalponik Mondir (Imagined Temple) | VIP Pass, Petpujo, Popular | 24h | 96 | badamtala-ashar-sangha |
| Nepal Bhattacharjee Street | 300 m | 3 min | — | Petpujo | 24h | 85 | nepal-bhattacharjee-street |
| Golden Arrow Club | 300 m | 3 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | golden-arrow-club |
| Sanghasree | 300 m | 3 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | sanghasree |
| 66 Pally | 400 m | 4 min | Ek Muthon Agun (A Fistful of Fire) | Petpujo | 24h | 90 | 66-pally |
| Chotushkone Park Saradia Sammilani | 400 m | 5 min | — | Kalighat, Pratapaditya Road, FFD Member, South Kolkata | 24h | 83 | chotushkone-park-kalighat |
| 64 Pally Durgotsav Committee | 400 m | 5 min | — | Kalighat, Manoharpukur, Est 1945, FFD Member | 24h | 84 | 64-pally-manoharpukur |
| Adi Lake Pally | 500 m | 6 min | Lake Market Shanti O Aitihyo | Lake Market, Lake Place, Est 1972, South Kolkata Landmark | 24h | 87 | adi-lake-pally-kalighat |
| Pratapaditya Road Tricone Park | 600 m | 7 min | — | Petpujo | 24h | 70 | pratapaditya-road-tricone-park |
| The Bengal Boys Training Association | 600 m | 7 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | the-bengal-boys-training-association |
| Bengal United Club | 800 m | 9 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | bengal-united-club |
| Chetla Sarbasadharaner Club | 800 m | 9 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | chetla-sarbasadharaner-club |
| Chetla Agrani | 1.1 km | 12 min | Vishva Rupe Vishwarupini | VIP Pass, Petpujo, Popular | day | 96 | chetla-agrani |
| Tridhara Sammilani | 1.3 km | 14 min | Surasur (Gods and Demons) | VIP Pass, Petpujo, Popular | 24h | 96 | tridhara-sammilani |
| Ballygunge Cultural | 1.3 km | 14 min | Jojon (Joining) | 2026 Theme, VIP Pass, Petpujo, Popular | day | 96 | ballygunge-cultural |
| Manoharpukur Youngs | 1.3 km | 14 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | manoharpukur-youngs |
| Samaj Sebi Sangha | 1.4 km | 15 min | Mahapujoy Mahanayak | 2026 Theme, Popular | 24h | 85 | samaj-sebi-sangha |
| Triangular Park Sarbojanin | 1.6 km | 18 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | triangular-park-sarbojanin |
| Hindusthan Club | 1.9 km | 21 min | Durgadalan | 2026 Theme, Petpujo, Popular | day | 85 | hindusthan-club |
| Hindustan Park | 2.1 km | 23 min | — | Petpujo, Ride (auto) | day | 88 | hindustan-park |
| Singhi Park | 2.3 km | 25 min | — | VIP Pass, Petpujo, Popular, Ride (auto) | day | 96 | singhi-park |
| Ekdalia Evergreen | 2.6 km | 29 min | Somnath Temple | 2026 Theme, VIP Pass, Petpujo, Popular, Ride (auto) | day | 96 | ekdalia-evergreen |
| 19 Pally | 2.9 km | 32 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | 19-pally |

- **Dilip Smriti Sangha:** Neighbourhood puja in Kalighat, part of the Kalighat & Rashbehari cluster.
- **Badamtala Ashar Sangha:** 88th year. A folk tale of Maa Durga and a South Kolkata sadhu, with the idol modelled on Ashok Gupta's 1959 design. Consistent award winner
- **Golden Arrow Club:** Neighbourhood puja on Sardar Sankar Road, Kalighat, part of the Kalighat & Rashbehari cluster.
- **Sanghasree:** Neighbourhood puja in Kalighat, part of the Kalighat & Rashbehari cluster.
- **Chotushkone Park Saradia Sammilani:** Long-standing South Kolkata neighbourhood puja on Pratapaditya Road, Sahanagar near Kalighat. Known for its intimate community ambience, classic protima, and cultural programmes.
- **64 Pally Durgotsav Committee:** Established in 1945 at Manoharpukur / Satish Mukherjee Road, Kalighat. A historic South Kolkata gem known for thoughtful installations, warm neighbourhood hospitality, and vibrant local participation.
- **Adi Lake Pally:** Established in 1972 on Lake Place Road, Lake Market. A cherished South Kolkata cultural hub boasting exquisite illumination, classic clay idols, and beloved bhog distribution.
- **The Bengal Boys Training Association:** Neighbourhood puja in Chetla, part of the Kalighat & Rashbehari cluster.
- **Bengal United Club:** Neighbourhood puja in Kalighat, part of the Kalighat & Rashbehari cluster.
- **Chetla Sarbasadharaner Club:** Neighbourhood puja in Chetla, part of the Kalighat & Rashbehari cluster.
- **Chetla Agrani:** Durga as protector of the universe, with the Vishwarupa of Vishnu. Chetla; auto advised from the Metro
- **Tridhara Sammilani:** Mythological battles: Ram and Ravana, Krishna and Kansa, Durga and the asuras, in artwork, light and sculpture. Look for a 5.5 ft Durga made from 13,000 recycled pens
- **Ballygunge Cultural:** Built from chip packets, bottles and old flex
- **Manoharpukur Youngs:** Neighbourhood puja in Manoharpukur Road, part of the Kalighat & Rashbehari cluster.
- **Samaj Sebi Sangha:** Posters from all 208 Uttam Kumar films
- **Triangular Park Sarbojanin:** Neighbourhood puja in Triangular Park, Rashbehari, part of the Kalighat & Rashbehari cluster.
- **Hindusthan Club:** Gariahat; the pillared hall of old Bengali homes
- **Singhi Park:** Gariahat
- **Ekdalia Evergreen:** Gariahat; traditional idol inside a temple replica. Food nearby: 6 Ballygunge Place (~750 m) for a Bengali dinner
- **19 Pally:** Neighbourhood puja in Gariahat, part of the Gariahat & Dhakuria cluster.

#### Rabindra Sarovar — 18 pandals · station id `rabindra-sarovar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Lake Pally Sarbojanin | 100 m | 1 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | lake-pally-sarbojanin |
| Mudiali Club | 400 m | 4 min | Oitijhyer Lokkotha | 2026 Theme, VIP Pass, Popular | 24h | 96 | mudiali-club |
| Lake Youth Corner | 600 m | 7 min | — | Gariahat & Dhakuria, South Kolkata | day | 64 | lake-youth-corner |
| Sebak Sangha | 700 m | 8 min | — | Kalighat & Rashbehari, South Kolkata | day | 64 | sebak-sangha |
| Shib Mandir Sarbojanin | 800 m | 9 min | Parab | 2026 Theme, Popular | 24h | 85 | shib-mandir-sarbojanin |
| New Alipore Children's Park | 1.1 km | 12 min | — | Tollygunge & New Alipore, South Kolkata | day | 64 | new-alipore-children-s-park |
| Lake Gardens Peoples Association | 1.3 km | 14 min | Srijaney – Gaurab Sanyukta | 2026 Theme, Popular | day | 85 | lake-gardens-peoples-association |
| Suruchi Sangha | 1.5 km | 17 min | Padma (Lotus) | VIP Pass, Petpujo, Popular | day | 96 | suruchi-sangha |
| Pally Mangal Samity (Taltala Ground) | 2.1 km | 23 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | pally-mangal-samity |
| South City Mall | 2.2 km | 24 min | Jatra | 2026 Theme, Popular, Ride (auto) | day | 85 | south-city-mall |
| 95 Pally | 2.3 km | 25 min | — | Jodhpur Park, South Kolkata, Ride (auto) | day | 85 | 95-pally-jodhpur-park |
| Jodhpur Park Sarbojanin | 2.6 km | 29 min | — | Jodhpur Park, South Kolkata, Ride (auto) | day | 86 | jodhpur-park-sarbojanin |
| Poddar Nagar Park | 2.6 km | 29 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | poddar-nagar-park |
| Bandhab Sammilani | 2.8 km | 31 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | bandhab-sammilani |
| 77 Palli | 2.8 km | 31 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | 77-palli |
| Babubagan Sarbojanin | 2.9 km | 32 min | — | Dhakuria, South Kolkata, Ride (auto) | day | 85 | babubagan-sarbojanin |
| Abasarika Club | 3.0 km | 33 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | abasarika-club |
| Selimpur Pally | 3.3 km | 36 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 85 | selimpur-pally |

- **Lake Pally Sarbojanin:** Neighbourhood puja in Mudiali, part of the Kalighat & Rashbehari cluster.
- **Mudiali Club:** Folk tales of heritage
- **Lake Youth Corner:** Neighbourhood puja in Dhakuria / Lake Gardens, part of the Gariahat & Dhakuria cluster.
- **Sebak Sangha:** Neighbourhood puja in Kalighat, part of the Kalighat & Rashbehari cluster.
- **Shib Mandir Sarbojanin:** Rajasthan's Gangaur festival
- **New Alipore Children's Park:** Neighbourhood puja in New Alipore, part of the Tollygunge & New Alipore cluster.
- **Lake Gardens Peoples Association:** 71st year; idol by Utpal Ghosh. Auto advised
- **Suruchi Sangha:** A lotus theme honouring Syama Prasad Mookerjee's life and legacy, with a traditional idol and straw décor. New Alipore; auto advised from the Metro
- **Pally Mangal Samity (Taltala Ground):** Taltala Ground puja off Gariahat Road, on the way to Jadavpur.
- **South City Mall:** The mall's first-ever Durga Puja, built on its own front on Prince Anwar Shah Road
- **95 Pally:** Dhakuria–Jodhpur Park puja on Rahim Ostagar Lane; walk on to Jodhpur Park Sarbojanin.
- **Jodhpur Park Sarbojanin:** Big-budget South Kolkata puja on Jodhpur Park Road, left off Gariahat Road on the way to Jadavpur. 95 Pally is a few minutes north.
- **Poddar Nagar Park:** Neighbourhood puja in Poddar Nagar, Jadavpur, part of the Gariahat & Dhakuria cluster.
- **Bandhab Sammilani:** Neighbourhood puja in Gariahat, part of the Gariahat & Dhakuria cluster.
- **77 Palli:** Neighbourhood puja in Selimpur, part of the Gariahat & Dhakuria cluster.
- **Babubagan Sarbojanin:** Babu Bagan Lane, Dhakuria, right off Gariahat Road opposite Jodhpur Park.
- **Abasarika Club:** Neighbourhood puja in Jodhpur Park, part of the Gariahat & Dhakuria cluster.
- **Selimpur Pally:** Neighbourhood puja in Selimpur, part of the Gariahat & Dhakuria cluster.

#### Mahanayak Uttam Kumar (Tollygunge) — 5 pandals · station id `mahanayak-uttam-kumar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Haridevpur 41 Pally | 1.8 km | 20 min | — | — | day | 86 | haridevpur-41-pally |
| Vivekananda Park Athletic Club | 2.1 km | 23 min | — | Ride (auto) | day | 85 | vivekananda-park-athletic-club |
| Ajeya Sanghati | 2.1 km | 23 min | — | Ride (auto) | day | 88 | ajeya-sanghati |
| Golf Green Phase 1 | 2.2 km | 24 min | — | Tollygunge & New Alipore, South Kolkata, Ride (auto) | day | 64 | golf-green-phase-1 |
| Vivekananda Sporting Club | 2.7 km | 30 min | — | Ride (auto) | day | 70 | vivekananda-sporting-club |

- **Haridevpur 41 Pally:** Auto advised
- **Ajeya Sanghati:** Auto advised
- **Golf Green Phase 1:** Neighbourhood puja in Surya Nagar, Tollygunge, part of the Tollygunge & New Alipore cluster.

#### Netaji (Kudghat) (Kudghat) — 7 pandals · station id `netaji`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Pally Unnayan Samiti (Paschim Putiary) | 700 m | 8 min | — | VIP Pass, Popular | 24h | 96 | naktala-pally-unnayan-samiti |
| Naskarpara Pally Unnayan Samity - Haridevpur | 900 m | 10 min | — | Behala & Barisha, South Kolkata | day | 64 | naskarpara-pally-unnayan-samity-haridevpur |
| Ranikuthi Netaji Jatiya Sebadal | 1.1 km | 12 min | — | Ranikuthi, South Kolkata | day | 70 | netaji-jatiya-sebadal-ranikuthi |
| Judge Bagan Recreation Club | 1.1 km | 12 min | — | Behala & Barisha, South Kolkata | day | 64 | judge-bagan-recreation-club |
| Azadgarh Sarbojanin | 1.4 km | 15 min | — | Tollygunge & New Alipore, South Kolkata | day | 64 | azadgarh-sarbojanin |
| Haridevpur Adarsha Samiti | 1.4 km | 15 min | — | Behala & Barisha, South Kolkata | day | 64 | haridevpur-adarsha-samiti |
| Sodepur Pragati Sangha (Haridevpur) | 1.9 km | 21 min | — | Behala & Barisha, South Kolkata | day | 64 | sodepur-pragati-sangha |

- **Naskarpara Pally Unnayan Samity - Haridevpur:** Neighbourhood puja in Haridevpur, part of the Behala & Barisha cluster.
- **Ranikuthi Netaji Jatiya Sebadal:** Ranikuthi puja on the road from Tollygunge towards Garia, near Netaji (Kudghat) Metro.
- **Judge Bagan Recreation Club:** Neighbourhood puja in Paschim Putiary, part of the Behala & Barisha cluster.
- **Azadgarh Sarbojanin:** Neighbourhood puja in Azadgarh, Tollygunge, part of the Tollygunge & New Alipore cluster.
- **Haridevpur Adarsha Samiti:** Neighbourhood puja in Haridevpur, part of the Behala & Barisha cluster.
- **Sodepur Pragati Sangha (Haridevpur):** Neighbourhood puja in Haridevpur, part of the Behala & Barisha cluster.

#### Masterda Surya Sen (Bansdroni) — 5 pandals · station id `masterda-surya-sen`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Surya Nagar Sarbojanin | 300 m | 3 min | — | Tollygunge & New Alipore, South Kolkata | day | 64 | surya-nagar-sarbojanin |
| Roynagar Unnayan Samiti | 800 m | 9 min | — | — | 24h | 70 | roynagar-unnayan-samiti |
| Netaji Nagar Sarbojanin | 1.1 km | 12 min | — | Garia Naktala Netaji Nagar, South Kolkata | day | 64 | netaji-nagar-sarbojanin |
| Yuba Sangha Club | 1.8 km | 20 min | — | Tollygunge & New Alipore, South Kolkata | day | 64 | yuba-sangha-club |
| Bharat Mata | 2.1 km | 23 min | — | Tollygunge & New Alipore, South Kolkata, Ride (auto) | day | 64 | bharat-mata |

- **Surya Nagar Sarbojanin:** Neighbourhood puja in Surya Nagar, Tollygunge, part of the Tollygunge & New Alipore cluster.
- **Netaji Nagar Sarbojanin:** Neighbourhood puja in Netaji Nagar, part of the Garia Naktala Netaji Nagar cluster.
- **Yuba Sangha Club:** Neighbourhood puja in Netaji Nagar, part of the Tollygunge & New Alipore cluster.
- **Bharat Mata:** Neighbourhood puja in Surya Nagar, Tollygunge, part of the Tollygunge & New Alipore cluster.

#### Gitanjali (Naktala) — 3 pandals · station id `gitanjali`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Naktala Udayan Sangha | 700 m | 8 min | Kaler Dhwani (Sound of Time) | VIP Pass, Popular | 24h | 96 | naktala-udayan-sangha |
| Baishnabghata Balak Samity | 800 m | 9 min | — | — | 24h | 70 | baishnabghata-balak-samity |
| Raipur Club | 1.3 km | 14 min | — | Garia Naktala Netaji Nagar, South Kolkata | day | 64 | raipur-club |

- **Naktala Udayan Sangha:** 40th year. One of the big Naktala crowd-pullers; go early or late
- **Raipur Club:** Neighbourhood puja in Raipur, Garia side, part of the Garia Naktala Netaji Nagar cluster.

#### Kavi Nazrul (Garia Bazar) — 12 pandals · station id `kavi-nazrul`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Garia Nabadurga | 300 m | 3 min | — | — | 24h | 70 | garia-nabadurga |
| Garia Sreerampur Kalyan Samity | 300 m | 3 min | — | Garia Naktala Netaji Nagar, South Kolkata | day | 64 | garia-sreerampur-kalyan-samity |
| Garia Pancha Durga | 500 m | 6 min | — | Garia, South Kolkata | day | 70 | garia-pancha-durga |
| Garia Sabuj Dal | 700 m | 8 min | — | Garia Naktala Netaji Nagar, South Kolkata | day | 64 | garia-sabuj-dal |
| Tarun Sathi | 800 m | 9 min | — | — | 24h | 70 | tarun-sathi |
| Dakshin Phalguni Club | 800 m | 9 min | — | Garia Naktala Netaji Nagar, South Kolkata | day | 64 | dakshin-phalguni-club |
| Shyama Pally | 900 m | 10 min | — | — | 24h | 70 | shyama-pally |
| Baishnabghata Patuli Upanagari | 900 m | 10 min | — | Kasba & Santoshpur, South Kolkata | day | 64 | baishnabghata-patuli-upanagari |
| Jatra Suru Sangha | 900 m | 10 min | — | Garia Naktala Netaji Nagar, South Kolkata | day | 64 | jatra-suru-sangha |
| Kendua Shanti Sangha - Patuli | 1.0 km | 11 min | Aishwaryi | Kasba & Santoshpur, South Kolkata | day | 82 | kendua-shanti-sangha-patuli |
| Kamdahari Purbapara | 1.2 km | 13 min | — | — | day | 70 | kamdahari-purbapara |
| Boral Sukanta Sangha | 1.8 km | 10 min | — | Boral, Garia, Est 1976, Rural Bengal Theme, Ride (auto) | 24h | 84 | boral-sukanta-sangha |

- **Garia Sreerampur Kalyan Samity:** Neighbourhood puja in Garia, part of the Garia Naktala Netaji Nagar cluster.
- **Garia Pancha Durga:** Kamdhari Road, Garia, near Garia Naba Durga at the southern end of the route.
- **Garia Sabuj Dal:** Neighbourhood puja in Garia, part of the Garia Naktala Netaji Nagar cluster.
- **Dakshin Phalguni Club:** Neighbourhood puja in Garia, part of the Garia Naktala Netaji Nagar cluster.
- **Baishnabghata Patuli Upanagari:** Neighbourhood puja in Patuli / Baishnabghata, part of the Kasba & Santoshpur cluster.
- **Jatra Suru Sangha:** Neighbourhood puja in Garia, part of the Garia Naktala Netaji Nagar cluster.
- **Kendua Shanti Sangha - Patuli:** 53rd year. A caged woman whose hair becomes a ladder: a critique of the oppression of women. Patuli
- **Boral Sukanta Sangha:** Established in 1976 at Sukanta Pally, Boral near Garia. Celebrated for transforming the quiet southern locality with evocative rural art, hand-painted alpona, and melodious shondha aarti.

#### Shahid Khudiram (Briji) — 1 pandal · station id `shahid-khudiram`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Patuli Sarbojanin | 1.2 km | 13 min | — | — | day | 70 | patuli-sarbojanin |

No pandals are listed for: Esplanade, Maidan.

### Green Line — Howrah Maidan ↔ Sector V

Stations in order: Howrah Maidan → Howrah → Mahakaran → Esplanade → Sealdah → Phoolbagan → Salt Lake Stadium → Bengal Chemical → City Centre → Central Park → Karunamoyee → Sector V.

#### Howrah Maidan — 9 pandals · station id `howrah-maidan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Howrah Nabagopal Sporting Club | 600 m | 8 min | — | Grand Installation, Central Howrah, Must Visit, Heritage | 24h | 91 | howrah-nabagopal-sporting |
| Ramkrishnapur Sarbojanin Durgotsab | 1.1 km | 13 min | — | Ramkrishnapur, Howrah Riverfront, FFD Member, Sabeki | 24h | 84 | ramkrishnapur-sarbojanin-howrah |
| Baje Shibpur Sammilani | 1.4 km | 16 min | — | Shibpur, Heritage, Dhak Beats, Community Bhog | 24h | 89 | baje-shibpur-sammilani |
| Olabibitala Sarbojanin Durgotsav | 2.0 km | 22 min | — | Shibpur, Handloom Art, Neighbourhood Gem | 24h | 82 | olabibitala-sarbojanin |
| Kadamtala Sarbojanin Durgotsav | 2.2 km | 24 min | — | Kadamtala, Light Gates, Crowd Favorite, Ride (auto) | 24h | 86 | kadamtala-sarbojanin |
| Shibpur Mandirtala Sarbojanin | 2.4 km | 26 min | — | Vidyasagar Setu, Shibpur Landmark, Monumental, Crowd Puller, Ride (auto) | 24h | 93 | shibpur-mandirtala-sarbojanin |
| Santragachi Sporting Club | 3.2 km | 35 min | Abhaya Murti o Palli Bangla | Santragachi, Lakeside Pandal, Chandannagar Lights | 24h | 87 | santragachi-sporting-club |
| Kamardanga Sitalatala | 3.9 km | 43 min | — | Howrah - Shibpur & Andul, Howrah, Ride (auto) | day | 64 | kamardanga-sitalatala |
| Arupara Milan Sangha | 4.1 km | 45 min | — | Howrah - Shibpur & Andul, Howrah, Ride (cab) | day | 64 | arupara-milan-sangha |

- **Howrah Nabagopal Sporting Club:** One of the most celebrated and historic Pujas of central Howrah, renowned for grand architectural installations and intricate Kumartuli idol.
- **Ramkrishnapur Sarbojanin Durgotsab:** Established in 1983 along Gopal Banerjee Lane near Ramkrishnapur Ghat. FFD registered member known for community heritage, traditional Sabeki idol, and Ganga aarti rituals.
- **Baje Shibpur Sammilani:** Treasured heritage community puja of Baje Shibpur, celebrated for aristocratic thakurdalan recreation, dhak competitions, and community bhog.
- **Olabibitala Sarbojanin Durgotsav:** Vibrant neighborhood celebration in Shibpur known for creative pandals celebrating Bengal handloom and village craft.
- **Kadamtala Sarbojanin Durgotsav:** Popular crowd destination on Narasingha Dutta Road in Kadamtala, attracting pandal hoppers with grand lighting gates.
- **Shibpur Mandirtala Sarbojanin:** Iconic South Howrah puja situated at the Vidyasagar Setu approach. Draws lakh of devotees with its monumental pandal art and serene lighting.
- **Santragachi Sporting Club:** Iconic destination near Santragachi Jheel. Combines lakeside serenity with breathtaking illuminations by Chandannagar light artisans.
- **Kamardanga Sitalatala:** Neighbourhood puja in Howrah, part of the Howrah - Shibpur & Andul cluster.
- **Arupara Milan Sangha:** Neighbourhood puja in Howrah, part of the Howrah - Shibpur & Andul cluster.

#### Howrah — 5 pandals · station id `howrah`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Ramkrishnapur Byayam Samity | 900 m | 11 min | — | Ramkrishnapur, Riverside, Dhunuchi Dance, Howrah Station | 24h | 88 | ramkrishnapur-byayam-samity |
| Ghas Bagan Sarbojanin | 1.2 km | 13 min | — | Howrah - Shibpur & Andul, Howrah | day | 64 | ghas-bagan-sarbojanin |
| Salkia Alapani Sangha | 1.8 km | 20 min | — | North Howrah, Craft Heritage, Salkia, Folk Art | 24h | 86 | salkia-alapani-sangha |
| Liluah Agrani Sangha | 4.9 km | 54 min | Prakriti o Matrika (Nature & Motherhood) | Liluah Landmark, Eco Friendly, Art Installation, Ride (cab) | 24h | 88 | liluah-agrani-sangha |
| Liluah Goswamipara Sarbojanin | 5.3 km | 58 min | Ancient Temple Carvings of Bengal | Liluah, Traditional Heritage, Devotional, Ride (cab) | 24h | 84 | liluah-goswamipara |

- **Ramkrishnapur Byayam Samity:** Famed riverside puja close to Ramkrishnapur Ghat and Howrah Railway Station. Renowned for monumental clay work and energetic Dhunuchi dance.
- **Ghas Bagan Sarbojanin:** Neighbourhood puja in Howrah, part of the Howrah - Shibpur & Andul cluster.
- **Salkia Alapani Sangha:** Celebrated North Howrah puja showcasing traditional rural handicrafts, wooden bell craft, and soul-stirring lighting alongside Grand Trunk Road.
- **Liluah Agrani Sangha:** The crowning jewel of Liluah pujas, famed for eco-friendly structures crafted with terracotta tiles, jute ropes, and bamboo lattice.
- **Liluah Goswamipara Sarbojanin:** One of the oldest community pujas in Liluah, maintaining authentic devotional rituals alongside grand facade architecture.

#### Sealdah — 5 pandals · station id `sealdah`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Sealdah Athletic Club | 600 m | 7 min | — | — | 24h | 70 | sealdah-athletic-club |
| Santosh Mitra Square | 800 m | 9 min | Sanatani Chetanay Vande Mataram | 2026 Theme, VIP Pass, Popular | 24h | 96 | santosh-mitra-square-sealdah |
| 37 Pally | 1.1 km | 12 min | — | — | day | 70 | 37-pally |
| Udayan Sangha (Entally) | 1.1 km | 13 min | Entally Saradiya Sammilani | Entally, Sealdah, Green Line, Est 1991 | 24h | 83 | udayan-sangha-entally |
| Uddipani (Park Circus Sarbojanin Durgotsab) | 3.3 km | 36 min | Sampriti O Barta (Harmony & Social Message) | Park Circus, FFD Member, Social Harmony, Central Kolkata, Ride (auto) | day | 87 | uddipani-park-circus |

- **Santosh Mitra Square:** Lebutala Park. 150 years of Vande Mataram; light and sound
- **Udayan Sangha (Entally):** Established in 1991 at Haralal Das Street, Entally. Minutes from Sealdah Metro Station, known for grand chandeliers, community feast, and vibrant pushpanjali on Ashtami morning.
- **Uddipani (Park Circus Sarbojanin Durgotsab):** Established in 2013 at Park Circus Maidan (opposite Don Bosco School). Official member of Forum for Durgotsab (FFD), renowned for promoting inter-community harmony, social causes, and grand visual aesthetics.

#### Phoolbagan — 6 pandals · station id `phoolbagan`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Kankurgachi Yubak Brinda | 800 m | 9 min | — | — | 24h | 70 | kankurgachi-yubak-brinda |
| Beleghata 33 Pally | 900 m | 10 min | Uddan (Flight) | — | 24h | 85 | beleghata-33-pally |
| Beleghata Sarbojanin Durga Puja Committee | 900 m | 11 min | Prakriti O Manobota (Nature & Humanity) | Beleghata, Green Line, FFD Member, Eco Friendly | 24h | 85 | beleghata-sarbojanin-phoolbagan |
| Beliaghata Nabamilan | 900 m | 11 min | — | Beleghata, Subhas Sarobar, Est 1969, Green Line | 24h | 85 | beliaghata-nabamilan |
| Mitali Club (Kankurgachi) | 1.1 km | 12 min | — | — | 24h | 70 | mitali-club-kankurgachi |
| Beleghata Sandhani Club | 1.2 km | 13 min | — | — | day | 70 | beleghata-sandhani-club |

- **Beleghata Sarbojanin Durga Puja Committee:** Located on Dr. Asutosh Sastri Road, Beleghata near Phoolbagan Metro. Official member of Forum for Durgotsab (FFD), noted for socially conscious themes and beautiful illumination.
- **Beliaghata Nabamilan:** Established in 1969 on Dr. Asutosh Sastri Road beside Subhas Sarobar Park. Celebrated for over 50 years of peaceful community celebrations, traditional clay idol, and warm neighborhood hospitality.

#### Salt Lake Stadium — 5 pandals · station id `salt-lake-stadium`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake GB Block | 700 m | 8 min | — | — | 24h | 70 | salt-lake-gb-block |
| Salt Lake JC Block | 1.4 km | 15 min | — | Salt Lake Sector III, Salt Lake | day | 64 | salt-lake-jc-block |
| Salt Lake IB Block | 1.5 km | 17 min | — | — | 24h | 70 | salt-lake-ib-block |
| Salt Lake GD Block | 1.5 km | 17 min | — | — | 24h | 70 | salt-lake-gd-block |
| Salt Lake HB Block | 1.6 km | 18 min | — | Salt Lake Sector III, Salt Lake | day | 64 | salt-lake-hb-block |

- **Salt Lake JC Block:** Neighbourhood puja in Salt Lake Sector III, part of the Salt Lake Sector III cluster.
- **Salt Lake HB Block:** Neighbourhood puja in Salt Lake Sector III, part of the Salt Lake Sector III cluster.

#### Bengal Chemical — 3 pandals · station id `bengal-chemical`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Swapnar Bagan | 700 m | 8 min | — | Beliaghata & Kankurgachi, North Kolkata | day | 64 | swapnar-bagan |
| Salt Lake DA Block | 700 m | 8 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-da-block |
| United Club | 2.0 km | 22 min | — | Manicktala & Ultadanga, North Kolkata | day | 64 | united-club |

- **Swapnar Bagan:** Neighbourhood puja in Kankurgachi, part of the Beliaghata & Kankurgachi cluster.
- **Salt Lake DA Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **United Club:** Neighbourhood puja in Ultadanga, part of the Manicktala & Ultadanga cluster.

#### City Centre — 16 pandals · station id `city-centre`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake EC Block | 300 m | 3 min | — | — | day | 70 | salt-lake-ec-block |
| Salt Lake DB Block | 400 m | 4 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-db-block |
| Laboni Estate | 600 m | 7 min | — | — | day | 70 | laboni-estate |
| Salt Lake CB Block | 600 m | 7 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-cb-block |
| Salt Lake FD Block | 700 m | 8 min | Nakshi Konar Math | Petpujo | 24h | 70 | salt-lake-fd-block |
| Salt Lake CA Block | 900 m | 10 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-ca-block |
| Salt Lake BB Block | 1.0 km | 11 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-bb-block |
| Salt Lake BC Block | 1.0 km | 11 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-bc-block |
| Salt Lake FC Block | 1.0 km | 11 min | — | Salt Lake Sector III, Salt Lake | day | 64 | salt-lake-fc-block |
| Salt Lake BD Block | 1.1 km | 12 min | — | — | 24h | 70 | salt-lake-bd-block |
| Salt Lake AC Block | 1.2 km | 13 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-ac-block |
| Salt Lake BA Block | 1.2 km | 13 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-ba-block |
| Salt Lake GC Block | 1.3 km | 14 min | — | Salt Lake Sector III, Salt Lake | day | 64 | salt-lake-gc-block |
| Salt Lake AB Block | 1.4 km | 15 min | — | — | day | 70 | salt-lake-ab-block |
| Salt Lake AD Block | 1.4 km | 15 min | — | — | day | 70 | salt-lake-ad-block |
| Salt Lake AA Block | 1.5 km | 17 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-aa-block |

- **Salt Lake DB Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Laboni Estate:** Check exact gate on Google Maps
- **Salt Lake CB Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake FD Block:** Gond, Madhubani, Pattachitra and Bengali embroidery folk arts together. On the Asian Paints Sharad Shamman shortlist
- **Salt Lake CA Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake BB Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake BC Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake FC Block:** Neighbourhood puja in Salt Lake Sector III, part of the Salt Lake Sector III cluster.
- **Salt Lake AC Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake BA Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake GC Block:** Neighbourhood puja in Salt Lake Sector III, part of the Salt Lake Sector III cluster.
- **Salt Lake AA Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.

#### Central Park — 16 pandals · station id `central-park`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake CD Block | 500 m | 6 min | — | Salt Lake Sector I, Salt Lake | day | 64 | salt-lake-cd-block |
| Salt Lake BE Block Part 2 | 1.1 km | 12 min | — | — | 24h | 70 | salt-lake-be-block-part-2 |
| Salt Lake BG Block | 1.3 km | 14 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-bg-block |
| Salt Lake AE Block | 1.5 km | 17 min | — | — | day | 70 | salt-lake-ae-block |
| Salt Lake AG Block | 1.7 km | 19 min | — | — | 24h | 70 | salt-lake-ag-block |
| Salt Lake AH Block | 1.7 km | 19 min | — | — | 24h | 70 | salt-lake-ah-block |
| Masterda Smriti Sangha (Prafulla Kanan) | 2.3 km | 25 min | — | Ride (cab) | day | 70 | masterda-smriti-sangha-prafulla-kanan |
| Kestopur Prafullakanan (Poschim) Adhibasibrinda | 2.3 km | 25 min | — | Ride (cab) | day | 70 | kestopur-prafullakanan-poschim-adhibasibrinda |
| Bangur Avenue C Block | 2.5 km | 28 min | — | Ride (auto) | day | 70 | bangur-avenue-c-block |
| Bangur Avenue Protirodh Bahini | 2.6 km | 29 min | — | Dum Dum & Lake Town, North Kolkata, Ride (auto) | day | 64 | bangur-avenue-protirodh-bahini |
| Keshtopur Prafulla Kanan Paschim Adhibasi Brinda | 2.7 km | 30 min | — | Kestopur, VIP Road, Est 1968, Grand Pandal, Ride (auto) | 24h | 87 | keshtopur-prafulla-kanan |
| Nirvik Sangha | 2.8 km | 15 min | — | Baguiati, Est 1920, VIP Road Corridor, Centenary Puja, Ride (auto) | day | 83 | nirvik-sangha-baguiati |
| Aswininagar Bandhu Mahal | 3.5 km | 39 min | — | Ride (auto) | day | 70 | aswininagar-bandhu-mahal |
| Rail Pukur United Club | 3.6 km | 40 min | Collage | 2026 Theme, Popular, Ride (auto) | day | 85 | rail-pukur-united-club |
| Joramandir Sarbojanin | 3.9 km | 43 min | — | Dum Dum & Lake Town, North Kolkata, Ride (auto) | day | 64 | joramandir-sarbojanin |
| Chinar Park Adhibasibrinda | 5.9 km | 65 min | — | Ride (cab) | day | 70 | chinar-park-adhibasibrinda |

- **Salt Lake CD Block:** Neighbourhood puja in Salt Lake Sector I, part of the Salt Lake Sector I cluster.
- **Salt Lake BG Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **Bangur Avenue Protirodh Bahini:** Neighbourhood puja in Bangur Avenue, part of the Dum Dum & Lake Town cluster.
- **Keshtopur Prafulla Kanan Paschim Adhibasi Brinda:** Established in 1968 at Prafulla Kanan West, Kestopur. A perennial crowd favorite along VIP Road, celebrated for massive architectural pavilions and social welfare initiatives.
- **Nirvik Sangha:** Established in 1920 at Jyangra, Baguiati. A centenarian community celebration in the northern VIP Road corridor known for rural Bengal folk art installations.
- **Rail Pukur United Club:** 73rd year; pandal made from old newspapers. Auto
- **Joramandir Sarbojanin:** Neighbourhood puja in VIP Road (Anupama), part of the Dum Dum & Lake Town cluster.

#### Karunamoyee — 10 pandals · station id `karunamoyee`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Karunamayee G Block | 200 m | 2 min | — | Salt Lake Sector II, Salt Lake | day | 64 | karunamayee-g-block |
| Salt Lake CJ Block | 500 m | 6 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-cj-block |
| Salt Lake FE Block | 800 m | 9 min | — | — | day | 70 | salt-lake-fe-block |
| Salt Lake CG Block | 800 m | 9 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-cg-block |
| Salt Lake BJ Block | 900 m | 10 min | — | — | 24h | 70 | salt-lake-bj-block |
| Salt Lake AJ Block | 1.2 km | 13 min | — | — | day | 70 | salt-lake-aj-block |
| Salt Lake BH Block | 1.2 km | 13 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-bh-block |
| Salt Lake AK Block | 1.3 km | 14 min | — | — | day | 70 | salt-lake-ak-block |
| Salt Lake BL Block | 1.3 km | 14 min | — | — | day | 70 | salt-lake-bl-block |
| Salt Lake CE Block | 1.6 km | 18 min | — | — | day | 70 | salt-lake-ce-block |

- **Karunamayee G Block:** Neighbourhood puja in Karunamoyee, part of the Salt Lake Sector II cluster.
- **Salt Lake CJ Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **Salt Lake CG Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **Salt Lake BH Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.

#### Sector V (Salt Lake Sector V) — 7 pandals · station id `sector-v`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Salt Lake CK-CL Block | 600 m | 7 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-ck-cl-block |
| Salt Lake DL Block | 600 m | 7 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-dl-block |
| Salt Lake EE Block | 800 m | 9 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-ee-block |
| Salt Lake AL Block | 900 m | 10 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-al-block |
| Salt Lake BK Block | 900 m | 10 min | — | Salt Lake Sector II, Salt Lake | day | 64 | salt-lake-bk-block |
| New Town Sarbojanin | 4.0 km | 44 min | Padmabhushan | 2026 Theme, Popular | day | 85 | new-town-sarbojanin |
| New Town DB Block Sarbojanin | 5.0 km | 55 min | — | Ride (cab) | day | 70 | new-town-db-block-sarbojanin |

- **Salt Lake CK-CL Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **Salt Lake DL Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **Salt Lake EE Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **Salt Lake AL Block:** Neighbourhood puja in Karunamoyee, part of the Salt Lake Sector II cluster.
- **Salt Lake BK Block:** Neighbourhood puja in Salt Lake Sector II, part of the Salt Lake Sector II cluster.
- **New Town Sarbojanin:** Cab from the station; go late afternoon

No pandals are listed for: Mahakaran, Esplanade.

### Purple Line — Joka ↔ Majerhat

Stations in order: Joka → Thakurpukur → Sakher Bazar → Behala Chowrasta → Behala Bazar → Taratala → Majerhat.

#### Thakurpukur — 1 pandal · station id `thakurpukur`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Thakurpukur SB Park | 1.0 km | 11 min | Koliyari (Colliery) | — | 24h | 86 | thakurpukur-sb-park |

- **Thakurpukur SB Park:** 56th year. A 20 ft deep walk-through coal mine on the Raniganj belt's past and present; the goddess stands for the miners. Artist: Raju Sarkar. On the Adani preview list

#### Sakher Bazar — 8 pandals · station id `sakher-bazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Tapoban | 100 m | 1 min | — | — | 24h | 70 | tapoban |
| Barisha Sarbojanin | 600 m | 7 min | Back to the 1980s | 2026 Theme, Traditional, Bonedi Bari, Popular | ritual | 85 | barisha-sarbojanin |
| Sabarna Roy Chowdhury Aatchala Bari | 600 m | 7 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | sabarna-roy-chowdhury-aatchala-bari |
| Bhola Maheshwartala Sarbojanin | 700 m | 8 min | — | — | 24h | 70 | bhola-maheshwartala-sarbojanin |
| Barisha Sabuj Sathi Club | 700 m | 8 min | — | Behala & Barisha, South Kolkata | day | 64 | barisha-sabuj-sathi-club |
| Barisha Club | 800 m | 9 min | — | Traditional, Bonedi Bari | ritual | 88 | barisha-club |
| Uttar Barisha | 800 m | 9 min | — | Traditional, Bonedi Bari | ritual | 82 | uttar-barisha |
| Amarendra Bhavan (Roy Bari) | 1.0 km | 11 min | Sabeki Ekchala Puja | Traditional, Bonedi Bari | ritual | 82 | amarendra-bhavan-roy-bari |

- **Sabarna Roy Chowdhury Aatchala Bari:** Bonedi bari puja of the Sabarna family
- **Barisha Sabuj Sathi Club:** Neighbourhood puja in Barisha, part of the Behala & Barisha cluster.
- **Barisha Club:** Artists: Eshika Chandra & Deep Das. Behala's heavyweight for social themes
- **Amarendra Bhavan (Roy Bari):** Bonedi bari (family puja); visiting hours limited

#### Behala Chowrasta — 13 pandals · station id `behala-chowrasta`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Barisha Yuba Brinda | 200 m | 2 min | — | Traditional, Bonedi Bari | ritual | 82 | barisha-yuba-brinda |
| Nabalila Para United Club | 200 m | 2 min | — | — | 24h | 70 | nabalila-para-united-club |
| Janakalyan | 300 m | 3 min | — | — | 24h | 70 | janakalyan |
| Barisha Netaji Sangha | 300 m | 3 min | — | Traditional, Bonedi Bari | ritual | 82 | barisha-netaji-sangha |
| Players' Corner | 300 m | 3 min | — | Behala, South Kolkata | day | 84 | players-corner-behala |
| Sabeda Bagan | 500 m | 6 min | — | Behala & Barisha, South Kolkata | day | 64 | sabeda-bagan |
| Acharya Prafulla Sangha - Behala | 500 m | 6 min | — | Behala & Barisha, South Kolkata | day | 64 | acharya-prafulla-sangha-behala |
| Barisha Nabin Sangha | 600 m | 7 min | — | Traditional, Bonedi Bari | ritual | 82 | barisha-nabin-sangha |
| Barisha Tarun Tirtha | 1.1 km | 12 min | — | Traditional, Bonedi Bari | ritual | 82 | barisha-tarun-tirtha |
| Jagarani | 1.2 km | 13 min | — | — | day | 70 | jagarani |
| Sitalatala Kishore Sangha | 1.4 km | 15 min | — | Behala & Barisha, South Kolkata | day | 64 | sitalatala-kishore-sangha |
| Ganbani Sangha | 1.9 km | 21 min | — | Behala & Barisha, South Kolkata | day | 64 | ganbani-sangha |
| Behala Buroshibtala | 3.0 km | 33 min | — | Ride (auto) | day | 70 | behala-buroshibtala |

- **Players' Corner:** Neighbourhood puja off Janakalyan Road by Behala Chowrasta, popularly known as Sourav Ganguly's para puja.
- **Sabeda Bagan:** Neighbourhood puja in Behala, part of the Behala & Barisha cluster.
- **Acharya Prafulla Sangha - Behala:** Neighbourhood puja in Behala, part of the Behala & Barisha cluster.
- **Sitalatala Kishore Sangha:** Neighbourhood puja in Haridevpur, part of the Behala & Barisha cluster.
- **Ganbani Sangha:** Neighbourhood puja in Haridevpur, part of the Behala & Barisha cluster.

#### Behala Bazar — 14 pandals · station id `behala-bazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Durgabari | 300 m | 3 min | — | Behala & Barisha, South Kolkata | day | 64 | durgabari |
| Behala Shree Sangha | 400 m | 4 min | — | — | 24h | 70 | behala-shree-sangha |
| Behala Notun Dal | 400 m | 4 min | Baro Mashe Tero Parbon (Twelve months, thirteen festivals) | 2026 Theme | day | 88 | behala-notun-dal |
| Behala Arcadia Sarbojanin | 400 m | 4 min | — | Behala & Barisha, South Kolkata | day | 64 | behala-arcadia-sarbojanin |
| Behala 11 Pally | 600 m | 7 min | — | — | 24h | 70 | behala-11-pally |
| Debdaru Fatak Sarbojanin Durgotsab | 600 m | 7 min | Matri Rupena Samsthita (Goddess of Life) | Behala, Purple Line, FFD Member, Creative Pandal | 24h | 86 | debdaru-fatak-behala |
| Behala Friends | 700 m | 8 min | Shuddhikaran (Purification) | — | 24h | 86 | behala-friends |
| Mitra Sangha | 700 m | 8 min | — | — | 24h | 70 | mitra-sangha |
| KFR Ground Puja | 700 m | 8 min | — | Behala, South Kolkata | day | 70 | kfr-ground-behala |
| Behala Notun Sangha | 800 m | 9 min | — | — | 24h | 70 | behala-notun-sangha |
| Mukul Sangha | 800 m | 9 min | — | Behala & Barisha, South Kolkata | day | 64 | mukul-sangha |
| Agradut Club | 900 m | 10 min | — | — | day | 70 | agradut-club |
| Prasanta Disha Sarbojanin | 1.3 km | 14 min | — | Behala & Barisha, South Kolkata | day | 64 | prasanta-disha-sarbojanin |
| Behala Adarsha Pally | 1.3 km | 14 min | — | Behala & Barisha, South Kolkata | day | 64 | behala-adarsha-pally |

- **Durgabari:** Neighbourhood puja in Behala, part of the Behala & Barisha cluster.
- **Behala Arcadia Sarbojanin:** Neighbourhood puja in Behala, part of the Behala & Barisha cluster.
- **Debdaru Fatak Sarbojanin Durgotsab:** Established in 1980 at Panchanan Tala, Behala. Highly anticipated for its creative experimental pandal structures, vibrant lighting, and massive festive footfall along the Purple Line corridor.
- **Behala Friends:** Pandal built from iron sheets
- **KFR Ground Puja:** Puja on KFR Ground near the Behala 14 No. bus stop, in the same walk as Behala Friends, Notun Dal and Debdaru Fatak.
- **Mukul Sangha:** Neighbourhood puja in Behala, part of the Behala & Barisha cluster.
- **Prasanta Disha Sarbojanin:** Neighbourhood puja in New Alipore, part of the Behala & Barisha cluster.
- **Behala Adarsha Pally:** Neighbourhood puja in Behala, part of the Behala & Barisha cluster.

#### Taratala — 10 pandals · station id `taratala`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Behala 29 Palli | 300 m | 4 min | — | Taratala, Behala, Est 1934, Historic Para | 24h | 86 | behala-29-palli |
| Behala Youngmen's Association | 600 m | 7 min | Chhuti (Holiday) | — | 24h | 70 | behala-young |
| Aikya Sammilani | 700 m | 8 min | — | — | 24h | 70 | aikya-sammilani |
| Behala Club | 800 m | 9 min | Tel: The Market of Faith | — | day | 86 | behala-club |
| Nandana Yuba Sangha | 1.0 km | 11 min | — | — | day | 70 | nandana-yuba-sangha |
| Naskarpur Sarbojanin | 1.0 km | 11 min | — | — | day | 70 | naskarpur-sarbojanin |
| Netaji Sangha | 1.2 km | 13 min | — | — | day | 70 | netaji-sangha |
| Mitali Sangha | 1.6 km | 18 min | — | — | day | 70 | mitali-sangha |
| Jogajatri Club | 1.6 km | 18 min | — | Tollygunge & New Alipore, South Kolkata | day | 64 | jogajatri-club |
| Parnashree Palli | 2.7 km | 30 min | — | Ride (auto) | day | 70 | parnashree-palli |

- **Behala 29 Palli:** Founded in 1934 on SN Roy Road, Sahapur near Taratala Metro. One of Behala's oldest community pujas, maintaining unbroken 90+ years of devotional barowari legacy.
- **Behala Youngmen's Association:** A "cloud factory" where children play freely and imagine without machines. On the Asian Paints Sharad Shamman shortlist
- **Behala Club:** Oil as faith, commerce, power and geopolitics, with a satirical edge. On the Asian Paints Sharad Shamman shortlist
- **Jogajatri Club:** Neighbourhood puja in New Alipore, part of the Tollygunge & New Alipore cluster.

#### Majerhat — 5 pandals · station id `majerhat`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Kidderpore 25 Pally | 2.6 km | 29 min | Paricharan | Khidirpur, South Kolkata, Ride (auto) | day | 85 | kidderpore-25-pally |
| Kidderpore 74 Pally | 2.8 km | 31 min | — | Khidirpur, South Kolkata, Ride (auto) | day | 82 | kidderpore-74-pally |
| Kabitirtha Sarbojanin | 3.0 km | 33 min | — | Khidirpur, South Kolkata, Ride (auto) | day | 70 | kabitirtha-sarbojanin |
| Nabarag | 3.0 km | 33 min | — | Khidirpur, South Kolkata, Ride (auto) | day | 70 | nabarag-khidirpur |
| Kidderpore Pally Sharadiya | 3.2 km | 35 min | — | Khidirpur, South Kolkata, Ride (auto) | day | 70 | kidderpore-pally-sharadiya |

- **Kidderpore 25 Pally:** One of the Khidirpur cluster at the top of the Diamond Harbour Road route, a short walk from 74 Pally, Kabitirtha and Nabarag.
- **Kidderpore 74 Pally:** Khidirpur neighbourhood puja, a few lanes from 25 Pally; see the whole Khidirpur cluster in one walk.
- **Kabitirtha Sarbojanin:** Watganj–Khidirpur puja off Kabitirtha Sarani, known for large themed pandals. Next door to Nabarag.
- **Nabarag:** Hemchandra Street, Watganj. Pairs with Kabitirtha, two minutes away.
- **Kidderpore Pally Sharadiya:** The last stop of the Khidirpur cluster, north of Kabitirtha.

No pandals are listed for: Joka.

### Orange Line — Satyajit Ray ↔ Beleghata

Stations in order: Satyajit Ray → Jyotirindra Nandi → Kavi Sukanta → Hemanta Mukhopadhyay → VIP Bazar → Ritwik Ghatak → Barun Sengupta → Beleghata.

#### Satyajit Ray (Hiland Park) — 10 pandals · station id `satyajit-ray`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Purba Rajpur | 700 m | 8 min | — | — | day | 70 | purba-rajpur |
| Rabindra Pally Sarbojanin | 1.3 km | 14 min | — | — | day | 70 | rabindra-pally-sarbojanin |
| Avenue Pally Mangal | 1.4 km | 15 min | — | — | day | 70 | avenue-pally-mangal |
| Santoshpur Avenue South Club | 1.4 km | 15 min | Nirmaan Binirmaan (Construction-Deconstruction) | Santoshpur, South Kolkata | day | 82 | santoshpur-avenue-south-club |
| Santoshpur Lake Pally | 1.6 km | 18 min | Tandav | 2026 Theme, Popular | day | 85 | santoshpur-lake-pally |
| Santoshpur Bibekananda Sangha | 1.7 km | 19 min | — | Kasba & Santoshpur, South Kolkata | day | 64 | santoshpur-bibekananda-sangha |
| Green Avenue Sarbojanin | 2.0 km | 22 min | — | Kasba & Santoshpur, South Kolkata | day | 64 | green-avenue-sarbojanin |
| Santoshpur Sonar Tori | 2.1 km | 23 min | — | Kasba & Santoshpur, South Kolkata, Ride (auto) | day | 64 | santoshpur-sonar-tori |
| Santoshpur Trikon Park | 2.2 km | 24 min | — | Ride (auto) | day | 86 | santoshpur-trikon-park |
| Santoshpur Agragami | 2.3 km | 25 min | — | Kasba & Santoshpur, South Kolkata, Ride (auto) | day | 64 | santoshpur-agragami |

- **Santoshpur Avenue South Club:** Cycles of ruin and rebuilding. On the Asian Paints Sharad Shamman shortlist
- **Santoshpur Lake Pally:** Shiva's cosmic dance; 69th year
- **Santoshpur Bibekananda Sangha:** Neighbourhood puja in Santoshpur, part of the Kasba & Santoshpur cluster.
- **Green Avenue Sarbojanin:** Neighbourhood puja in Santoshpur, part of the Kasba & Santoshpur cluster.
- **Santoshpur Sonar Tori:** Neighbourhood puja in Santoshpur, part of the Kasba & Santoshpur cluster.
- **Santoshpur Agragami:** Neighbourhood puja in Santoshpur, part of the Kasba & Santoshpur cluster.

#### Jyotirindra Nandi (Mukundapur) — 1 pandal · station id `jyotirindra-nandi`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Selimpur Naskarpara | 3.2 km | 35 min | — | Gariahat & Dhakuria, South Kolkata, Ride (auto) | day | 64 | selimpur-naskarpara |

- **Selimpur Naskarpara:** Neighbourhood puja in Selimpur, Dhakuria, part of the Gariahat & Dhakuria cluster.

#### Kavi Sukanta (Kalikapur) — 8 pandals · station id `kavi-sukanta`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Greenwood Nook | 100 m | 1 min | — | Kasba & Santoshpur, South Kolkata | day | 64 | greenwood-nook |
| Purbachal Sarbojanin | 300 m | 3 min | — | — | 24h | 70 | purbachal-sarbojanin |
| Kalitala Sporting | 500 m | 6 min | — | — | 24h | 70 | kalitala-sporting |
| Purbachal Shakti Sangha | 1.5 km | 17 min | — | — | day | 70 | purbachal-shakti-sangha |
| Madhya Garfa Sarbojanin | 2.0 km | 22 min | — | — | day | 70 | madhya-garfa-sarbojanin |
| Ramlal Bazar Sarbojanin | 2.1 km | 23 min | — | Ride (auto) | day | 70 | ramlal-bazar-sarbojanin |
| Saraswati Sammilani | 3.2 km | 35 min | — | Ride (auto) | day | 70 | saraswati-sammilani |
| Dhakuria Sarbojanin | 3.8 km | 42 min | — | Ride (auto) | day | 70 | dhakuria-sarbojanin |

- **Greenwood Nook:** Neighbourhood puja in Santoshpur, part of the Kasba & Santoshpur cluster.

#### Hemanta Mukhopadhyay (Ruby) — 4 pandals · station id `hemanta-mukhopadhyay`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Rajdanga Amra Kajon Kalyan Samity | 1.0 km | 11 min | Utsarito Aalo (Radiated Light) | — | 24h | 70 | rajdanga-amra-kajon-kalyan-samity |
| Rajdanga Naba Uday Sangha | 1.3 km | 14 min | Shodhan (Purification) | — | 24h | 88 | rajdanga-naba-uday-sangha |
| VIP Nagar Sarbojanin | 1.3 km | 14 min | — | — | day | 70 | vip-nagar-sarbojanin |
| Rajdanga Tribarna Sangha | 1.5 km | 17 min | — | Kasba & Santoshpur, South Kolkata | day | 64 | rajdanga-tribarna-sangha |

- **Rajdanga Amra Kajon Kalyan Samity:** A tribute to the painter Gaganendranath Tagore. On the Asian Paints Sharad Shamman shortlist
- **Rajdanga Naba Uday Sangha:** A future of deforestation and artificial oxygen, urging conservation. On the Adani preview list and the Asian Paints Sharad Shamman shortlist
- **Rajdanga Tribarna Sangha:** Neighbourhood puja in Rajdanga, Kasba, part of the Kasba & Santoshpur cluster.

#### VIP Bazar — 5 pandals · station id `vip-bazar`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Milan Tirtha | 700 m | 8 min | — | — | 24h | 70 | milan-tirtha |
| Sunil Nagar | 1.6 km | 18 min | — | — | day | 70 | sunil-nagar |
| Kasba Bosepukur Sitala Mandir | 1.7 km | 19 min | Chup (Silence) | — | day | 90 | kasba-bosepukur-sitala-mandir |
| Bosepukur Talbagan | 1.7 km | 19 min | — | — | day | 86 | bosepukur-talbagan |
| Kalyan Sangha | 1.8 km | 20 min | — | — | day | 70 | kalyan-sangha |

- **Kasba Bosepukur Sitala Mandir:** 77th year. A small site that consistently does more with less than pandals five times its size

#### Ritwik Ghatak — 2 pandals · station id `ritwik-ghatak`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Uttar Panchanan Gram Milan | 100 m | 1 min | — | Kasba & Santoshpur, South Kolkata | day | 64 | uttar-panchanan-gram-milan |
| Adi Ballygunge Sarbojanin | 3.1 km | 34 min | — | Ballygunge & Park Circus, South Kolkata, Ride (auto) | day | 64 | adi-ballygunge-sarbojanin |

- **Uttar Panchanan Gram Milan:** Neighbourhood puja in Anandapur, part of the Kasba & Santoshpur cluster.
- **Adi Ballygunge Sarbojanin:** Neighbourhood puja in Adi Ballygunge, part of the Ballygunge & Park Circus cluster.

No pandals are listed for: Barun Sengupta, Beleghata.

### Yellow Line — Noapara ↔ Jai Hind (Airport)

Stations in order: Noapara → Dum Dum Cantonment → Jessore Road → Jai Hind (Airport).

#### Dum Dum Cantonment — 3 pandals · station id `dum-dum-cantonment`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Motijheel Sarbojanin | 1.9 km | 21 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | motijheel-sarbojanin |
| Yuba Sangha (Nagerbazar) | 2.0 km | 22 min | Ek Pukur Bhalobasa (A Pond Full of Love) | — | day | 70 | nagerbazar-yuba-sangha |
| Arjunpur Amra Sabai Club | 2.9 km | 32 min | — | Ride (auto) | day | 70 | arjunpur-amra-sabai-club |

- **Motijheel Sarbojanin:** Neighbourhood puja in Motijheel, Dum Dum, part of the Dum Dum & Lake Town cluster.
- **Yuba Sangha (Nagerbazar):** Bengal's disappearing neighbourhood ponds, with the Telipukur pond as a floating canvas. On the Asian Paints Sharad Shamman shortlist

#### Jessore Road — 1 pandal · station id `jessore-road`

| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |
|---|---|---|---|---|---|---|---|
| Anupama Housing Complex | 1.8 km | 20 min | — | Dum Dum & Lake Town, North Kolkata | day | 64 | anupama-housing-complex |

- **Anupama Housing Complex:** Neighbourhood puja in VIP Road (Anupama), part of the Dum Dum & Lake Town cluster.

No pandals are listed for: Noapara, Jai Hind (Airport).

Hours codes: `24h` = open round the clock on festival days; `day` = open morning to late night; `ritual` = ritual hours only (about 8 AM–1 PM, and evening arati).

Some pandals appear under two stations because they can be walked from either (for example Santosh Mitra Square and College Square, from both Central/Mahatma Gandhi Road and Sealdah).

## Instagram

The app links 45 reels on 32 pandal pages. Reels are linked, not hosted; they belong to the accounts named.

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
| Tala Prattoy | Walkthrough of the Tala Prattoy 2026 pandal | @thebosetalks | https://www.instagram.com/reel/Deca72LSDkP/ |
| Tala Prattoy | Maha Shashthi at the pandal | @talaprattoy | https://www.instagram.com/reel/DekFS1sERrd/ |
| Tala Prattoy | Maha Saptami greetings from the pandal | @talaprattoy | https://www.instagram.com/reel/Dela8lwiosi/ |
| Sreebhumi Sporting Club | Inside the 2026 Sreebhumi pandal | @festive_shorts | https://www.instagram.com/reel/DeezAOtv3PG/ |
| Kumartuli Park | Darshan at Kumartuli Park Sarbajanin | @thebosetalks | https://www.instagram.com/reel/DeldC6lhA40/ |
| Kumartuli Park | A 2026 reel from the committee | @kumartulipark | https://www.instagram.com/reel/DebyEXyI2DP/ |
| Suruchi Sangha | Nabapatrika snan (ritual bath) at Suruchi Sangha | @suruchisangha | https://www.instagram.com/reel/DelRP-NvEv3/ |
| Suruchi Sangha | The 2026 pandal | @suruchisangha | https://www.instagram.com/reel/Delts1Av6_5/ |
| Suruchi Sangha | Pandal glimpses on Shashthi | @suruchisangha | https://www.instagram.com/reel/DekAc_DvUxy/ |
| Singhi Park | Maha Shashthi at Singhi Park | @singhipark | https://www.instagram.com/reel/Dej-48QEcyi/ |
| Ekdalia Evergreen | The 2026 idol and pandal | @festive_shorts | https://www.instagram.com/reel/DeirdPHJ6h4/ |
| Dum Dum Park Tarun Sangha | Wins Berger Priyo Pujo 2026 for its theme "Banijye Basate Lakshmi" | @dumdumparktarunsangha | https://www.instagram.com/reel/Dej_014CPqz/ |
| Badamtala Ashar Sangha | Cinematic walkthrough of the temple-style 2026 pandal | @ayondutta491994 | https://www.instagram.com/reel/DejxF7ShHIq/ |
| Badamtala Ashar Sangha | The puja begins | @badamtalaasharsangha | https://www.instagram.com/reel/Deg-qD4MFS4/ |
| Chetla Agrani | The lit pandal and idol on Panchami | @chetla_agrani | https://www.instagram.com/reel/Deh2dggSi-T/ |
| 66 Pally | The 2026 Durga idol revealed | @66_pally | https://www.instagram.com/reel/DeGj0vtzOzU/ |
| Ballygunge Cultural | Complete first look at the 2026 pandal | @explorewitharitra | https://www.instagram.com/reel/DeV2yguI1s9/ |
| Chorebagan Sarbojanin | Complete first look at the 2026 pandal | @explorewitharitra | https://www.instagram.com/reel/DeUtBhfz56u/ |
| Chorebagan Sarbojanin | Visit to the Chorebagan pandal | @thebosetalks | https://www.instagram.com/reel/DeZGacAvUFG/ |
| South City Mall | Opening of South City Mall's first Durga Puja, with an old market and thakurdalan pandal | @bongnabangali | https://www.instagram.com/reel/Deg_djTtZm6/ |
| Hindustan Park | Pandal and idol made from matchsticks | @bongnabangali | https://www.instagram.com/reel/DedpiLJzxVN/ |
| Jodhpur Park Sarbojanin | The only Durga in Kolkata that rotates 360° | @bongnabangali | https://www.instagram.com/reel/DeccAXKzsEf/ |
| Tala Barowari | A walk through the Tala Barowari pandal | @souradips_photography | https://www.instagram.com/reel/DeeS1CBvva1/ |
| Jagat Mukherjee Park | Visit to the 2026 Jagat Mukherjee Park pandal | @thebosetalks | https://www.instagram.com/reel/Dej0dfxxPsL/ |
| Jagat Mukherjee Park | A pre-puja reel from the committee | @jagatmukherjeepark | https://www.instagram.com/reel/DdoH1HcgmVc/ |
| Samaj Sebi Sangha | Opening of the 81st puja, with Raima Sen and other guests | @samaj_sebi | https://www.instagram.com/reel/DeeLFUkpZZs/ |
| Allen Park Durga Puja (Kolkata Sanatani Sangha) | Durga Puja at Allen Park for the first time | @festive_shorts | https://www.instagram.com/reel/Dego_-tpMBt/ |
| Sikdar Bagan Sadharan Durgotsav | The 2026 Sikdar Bagan pandal | @festive_shorts | https://www.instagram.com/reel/DegFfWkJH8y/ |
| Barisha Club | The 2026 Barisha Club pandal and idol | @festive_shorts | https://www.instagram.com/reel/DedzAliPL_-/ |
| Maddox Square | The 2026 idol at Maddox Square | @kolkata_pujo_4u | https://www.instagram.com/reel/Deeolqtv1v9/ |
| New Town Sarbojanin | The 2026 New Town Sarbajanin pandal | @thebosetalks | https://www.instagram.com/reel/DeemUuuhq7m/ |

### Puja committee accounts

Only these committee handles are on record. Do not guess handles for other pandals.

| Pandal | Handle |
|---|---|
| Tridhara Sammilani | @tridhara_akalbodhan |
| Hatibagan Sarbojanin | @hatibagan_sarbojanin_durgotsav |
| Kumartuli Park | @kumartulipark |
| Tala Prattoy | @talaprattoy |
| Suruchi Sangha | @suruchisangha |
| Singhi Park | @singhipark |
| Dum Dum Park Tarun Sangha | @dumdumparktarunsangha |
| Badamtala Ashar Sangha | @badamtalaasharsangha |
| Chetla Agrani | @chetla_agrani |
| 66 Pally | @66_pally |
| Samaj Sebi Sangha | @samaj_sebi |
| Jagat Mukherjee Park | @jagatmukherjeepark |

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
- @thebosetalks — Pandal walkthroughs from this season
- @festive_shorts — Pandal and idol short reels, many in collaboration with committees
- @kolkata_pujo_4u — Idol and pandal reels
- @souradips_photography — Photographer · pandal walkthroughs
- @ayondutta491994 — Cinematic pandal walkthroughs

## What the app does not have

- Street addresses, surveyed coordinates or turn-by-turn routes for pandals (the app hands off to Google Maps by name).
- Entry fees, VIP pass prices, queue lengths or live crowd data.
- Official Metro timetables or fares.
- Reviews, ratings or user comments.
- Pandals away from the listed Metro stations, including Howrah and the suburbs.
