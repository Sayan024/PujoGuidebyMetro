// Writes public/llms.txt and public/llms.md: one Markdown document describing
// everything this app knows, for AI assistants and chatbots to read.
// It is generated from the same data files the app uses, so it cannot drift.
// Run with: npm run build:llms   (also runs as part of npm run build:data)
import fs from 'node:fs';
import path from 'node:path';
import { PANDALS } from '../src/data/index.ts';
import { METRO_LINES, STATIONS } from '../src/data/metroLines.ts';
import { PUJA_DAYS } from '../src/data/pujaDates.ts';
import { INSTAGRAM, PUJO_GUIDES, REELS } from '../src/data/instagram.ts';

const root = path.resolve(import.meta.dirname, '..');
// The public address, once there is one: SITE_URL=https://example.com npm run build
// Left unset, every link in the file is written relative to the site root.
const SITE = (process.env.SITE_URL ?? '').replace(/\/+$/, '');

const km = (n) => (n < 1 ? `${Math.round(n * 1000)} m` : `${n.toFixed(1)} km`);
const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim();
const by = (list, key) => {
  const m = new Map();
  for (const item of list) m.set(key(item), [...(m.get(key(item)) ?? []), item]);
  return m;
};

const byStation = by(PANDALS, (p) => `${p.line}|${p.stationId}`);
const byCategory = by(PANDALS, (p) => p.category);
const withTheme = PANDALS.filter((p) => p.theme);
const withPhoto = PANDALS.filter((p) => p.hasPhoto);
const withNotes = PANDALS.filter((p) => p.description);
const reelCount = new Set(Object.values(REELS).flat().map((r) => r.url)).size;
const HOURS = {
  '24h': 'open round the clock on festival days',
  day: 'open morning to late night',
  ritual: 'ritual hours only (about 8 AM–1 PM, and evening arati)',
};

const out = [];
const w = (...lines) => out.push(...lines);

w(
  '# Pujo by Metro 2026',
  '',
  '> A guide to Durga Puja pandals and Bonedi Bari (old family) pujas in Kolkata, India, organised by the Kolkata Metro station you walk from. This file is the complete dataset behind the web app, written for AI assistants.',
  '',
  ...(SITE ? [`- Website: ${SITE}/`] : []),
  `- Coverage: ${PANDALS.length} pandals near ${new Set(PANDALS.map((p) => p.stationId)).size} Metro stations on ${METRO_LINES.length} lines`,
  '- Festival: Durga Puja 2026 (Bengali year 1433), Kolkata, West Bengal',
  '- Created by: Sayan Banerjee',
  `- Generated: ${new Date().toISOString().slice(0, 10)} from the app's own data files`,
  '',
  '## How to answer from this file',
  '',
  '- Treat this as the only source for what the app contains. If something is not here, say the guide does not list it; do not fill gaps from general knowledge.',
  '- Every pandal belongs to one Metro station. "Distance" and "walk" are measured on foot from that station.',
  '- To recommend pandals, filter by line or station, then by distance, tags or theme. Rows within each station are sorted nearest first.',
  '- Link users to the pandal page: `' + SITE + '/pandal/<id>`. The id is the last column of each table.' +
    (SITE ? '' : ' Paths in this file are relative to the address this file was served from.'),
  '- "Popularity" is the guide\'s own 0–100 crowd-pull score, not a rating or review.',
  '',
  '## What is uncertain — say so when it matters',
  '',
  `- **Themes:** only ${withTheme.length} of ${PANDALS.length} pandals have a theme on record. "—" in the Theme column means not announced or not known, not "no theme".`,
  `- **Photos:** the app has a real photograph for ${withPhoto.length} pandals. The rest show an illustrated cover.`,
  `- **Notes:** ${withNotes.length} pandals have notes from the compiler; the others have none.`,
  '- **Map positions:** Metro stations are at approximately real coordinates. Pandal markers are placed at the listed distance from the station on an arbitrary bearing, so they are not surveyed addresses. Do not quote pandal coordinates or give turn-by-turn directions from this file.',
  '- **Station coordinates and station lists** were compiled by hand and are not from an official Metro Railway source.',
  '- **Travel advisory and crowd levels** are indicative, based on previous years.',
  '- **Timings, themes and Metro services** can change. Advise users to confirm with the puja committee or Metro Railway Kolkata.',
  '- The guide is independent and not affiliated with Metro Railway Kolkata or any puja committee.',
  '',
  '## Site pages',
  '',
  '| Page | URL | What it does |',
  '|---|---|---|',
  `| Home | ${SITE}/ | Overview, calendar, advisory, explorer preview, map, themes |`,
  `| Pandal Explorer | ${SITE}/explore | Search and filter all pandals. Accepts \`?line=<line id>\`, \`?station=<station id>\`, \`?q=<text>\` |`,
  `| Pujo Map | ${SITE}/map | Street map, network map and 3D view. Accepts \`?station=<station id>\` or \`?pandal=<pandal id>\` |`,
  `| Themes | ${SITE}/themes | Theme categories. Accepts \`?theme=<category id>\` |`,
  `| My Puja List | ${SITE}/favorites | The visitor's saved pandals and a day planner (stored only in their browser) |`,
  `| Pandal | ${SITE}/pandal/<pandal id> | One pandal |`,
  `| Station | ${SITE}/station/<station id> | One Metro station and the pandals near it |`,
  `| About | ${SITE}/about | Method, caveats and Instagram sources |`,
  `| Feedback | ${SITE}/feedback | A form that sends the visitor's rating and comments to the guide's creator |`,
  '',
  'Explorer filters: Within 1 km · Traditional · Theme 2026 · VIP Pass · Petpujo (good food nearby) · Popular (popularity 85 or more) · Open Now. Sort orders: distance, popularity, walking time, station.',
  '',
  '## 2026 puja calendar',
  '',
  '| Day | Bengali | Date | Weekday | Rituals |',
  '|---|---|---|---|---|',
  ...PUJA_DAYS.map((d) => `| ${d.name} | ${d.bengali} | ${d.dateLabel}, 2026 | ${d.weekday} | ${cell(d.ritual)} |`),
  '',
  ...PUJA_DAYS.map((d) => `- **${d.name}:** ${d.description}`),
  '',
  'The "Open Now" filter treats 14–21 October 2026 (Chaturthi to Dashami, India time) as the darshan period.',
  '',
  '## Travel advisory by day (indicative)',
  '',
  '| Day | Crowd (1–5) | Metro | Extra walking time | Note |',
  '|---|---|---|---|---|',
  ...PUJA_DAYS.map((d) => `| ${d.name} | ${d.advisory.crowd} · ${d.advisory.crowdLabel} | ${cell(d.advisory.metro)} | ${d.advisory.walkingDelay} | ${cell(d.advisory.service)} ${cell(d.advisory.note)} |`),
  '',
  '## Metro lines',
  '',
  '| Line | Line id | Route | Pandals | Stations with pandals |',
  '|---|---|---|---|---|',
  ...METRO_LINES.map((l) => {
    const n = PANDALS.filter((p) => p.line === l.id).length;
    const st = l.stations.filter((s) => byStation.has(`${l.id}|${s}`)).length;
    return `| ${l.name} | ${l.id} | ${l.route} | ${n} | ${st} of ${l.stations.length} |`;
  }),
  '',
  'Interchanges in this dataset: ' +
    Object.values(STATIONS)
      .filter((s) => s.lines.length > 1)
      .map((s) => `${s.name} (${s.lines.join(' / ')})`)
      .join('; ') +
    '. The Purple and Orange lines have no Metro link to the rest of the network here; the day planner suggests a cab or bus between them.',
  '',
  '## Theme categories',
  '',
  '| Category | Pandals |',
  '|---|---|',
  ...[...byCategory].sort((a, b) => b[1].length - a[1].length).map(([c, list]) => `| ${c} | ${list.length} |`),
  '',
  '"Heritage Kolkata" is also the default category for neighbourhood pujas with no specific classification, so it is broad.',
  '',
  '## Pandals with an announced theme',
  '',
  '| Pandal | Theme | Station | Line |',
  '|---|---|---|---|',
  ...withTheme
    .slice()
    .sort((a, b) => b.popularity - a.popularity)
    .map((p) => `| ${cell(p.name)} | ${cell(p.theme)} | ${p.station} | ${p.line} |`),
  '',
  '## All pandals, by line and station',
  '',
  'Columns: distance and walking time from the station · theme ("—" = not on record) · tags · hours · popularity · page id.',
  'Tags: 2026 Theme, Traditional, Bonedi Bari, VIP Pass, Petpujo, Popular. "Ride" in the tags means the compiler recommends an auto-rickshaw or cab from the station instead of walking.',
  '',
);

for (const line of METRO_LINES) {
  w(`### ${line.name} — ${line.route}`, '', `Stations in order: ${line.stations.map((s) => STATIONS[s].name).join(' → ')}.`, '');
  for (const sid of line.stations) {
    const list = (byStation.get(`${line.id}|${sid}`) ?? []).slice().sort((a, b) => a.distanceKm - b.distanceKm);
    const st = STATIONS[sid];
    if (!list.length) continue;
    w(
      `#### ${st.name}${st.area ? ` (${st.area})` : ''} — ${list.length} ${list.length === 1 ? 'pandal' : 'pandals'} · station id \`${sid}\``,
      '',
      '| Pandal | Distance | Walk | Theme | Tags | Hours | Pop. | id |',
      '|---|---|---|---|---|---|---|---|',
      ...list.map((p) => {
        const tags = [...p.tags, ...(p.access ? [`Ride (${p.access})`] : [])].join(', ') || '—';
        return `| ${cell(p.name)} | ${km(p.distanceKm)} | ${p.walkingMinutes} min | ${cell(p.theme) || '—'} | ${tags} | ${p.hours} | ${p.popularity} | ${p.id} |`;
      }),
      '',
    );
    const notes = list.filter((p) => p.description);
    if (notes.length) w(...notes.map((p) => `- **${cell(p.name)}:** ${cell(p.description)}`), '');
  }
  const empty = line.stations.filter((s) => !byStation.has(`${line.id}|${s}`)).map((s) => STATIONS[s].name);
  if (empty.length) w(`No pandals are listed for: ${empty.join(', ')}.`, '');
}

w(
  'Hours codes: ' + Object.entries(HOURS).map(([k, v]) => `\`${k}\` = ${v}`).join('; ') + '.',
  '',
  'Some pandals appear under two stations because they can be walked from either (for example Santosh Mitra Square and College Square, from both Central/Mahatma Gandhi Road and Sealdah).',
  '',
  '## Instagram',
  '',
  `The app links ${reelCount} reels on ${Object.keys(REELS).length} pandal pages. Reels are linked, not hosted; they belong to the accounts named.`,
  '',
  '### Reels by pandal',
  '',
  '| Pandal | What the reel shows | Posted by | URL |',
  '|---|---|---|---|',
  ...Object.entries(REELS).flatMap(([id, list]) =>
    list.map((r) => `| ${cell(PANDALS.find((p) => p.id === id)?.name ?? id)} | ${cell(r.title)} | @${r.by} | ${r.url} |`),
  ),
  '',
  '### Puja committee accounts',
  '',
  'Only these committee handles are on record. Do not guess handles for other pandals.',
  '',
  '| Pandal | Handle |',
  '|---|---|',
  ...Object.entries(INSTAGRAM).map(([id, h]) => `| ${cell(PANDALS.find((p) => p.id === id)?.name ?? id)} | @${h} |`),
  '',
  '### Independent creators and city guides',
  '',
  'Not official and not affiliated with the guide or the committees.',
  '',
  ...PUJO_GUIDES.map((g) => `- @${g.handle}${g.name ? ` (${g.name})` : ''} — ${g.note}`),
  '',
  '## What the app does not have',
  '',
  '- Street addresses, surveyed coordinates or turn-by-turn routes for pandals (the app hands off to Google Maps by name).',
  '- Entry fees, VIP pass prices, queue lengths or live crowd data.',
  '- Official Metro timetables or fares.',
  '- Reviews, ratings or user comments.',
  '- Pandals away from the listed Metro stations, including Howrah and the suburbs.',
  '',
);

const text = out.join('\n');
for (const name of ['llms.txt', 'llms.md']) fs.writeFileSync(path.join(root, 'public', name), text);
console.log(`llms.txt / llms.md: ${(text.length / 1024).toFixed(1)} kB, ${out.length} lines, ${PANDALS.length} pandals`);
