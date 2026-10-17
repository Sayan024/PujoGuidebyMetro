# Pujo by Metro 2026

**Meeting Thakur in the Metro** — a guide to Durga Puja pandals and Bonedi Bari pujas in Kolkata, organised by the Metro station you walk from.

Created entirely by **[Sayan Banerjee](https://github.com/Sayan024)**. Live at <https://pujo-guideby-metro.vercel.app>.

## What it is

- **394 pandals** (including Kolkata major pandals, Howrah & Liluah, and traditional community paras) across **47 Metro stations** on five lines, each with walking distance, map coordinates and, where known, verified car/bike parking.
- A line → station → pandal **explorer** with instant search, filters and sorting; each station lists its most popular pandals first.
- A **Pujo map**: street map, schematic network map and a 3D overview.
- Five **pandal-hopping routes** that open as one Google Maps route, with a QR code to share.
- The 2026 **puja calendar**, a day-by-day **travel advisory** with the special Metro timetable by line, and **bus routes** to each area.
- The Asian Paints Sharad Shamman 2026 **shortlist**.
- **My Puja List** with a day planner that orders stations, Metro rides and walks.
- An **AI assistant** that answers only from the guide's own data.
- Light and dark themes, mobile-first layout, reduced-motion support and a keyboard- and screen-reader-friendly interface (axe-core reports no violations).

Built with React 19, TypeScript, Vite, Tailwind CSS, Motion, React Three Fiber, MapLibre GL and Zustand.

## Run it

Requires Node 22 or newer.

```bash
npm install
cp .env.example .env     # then add your OpenRouter key (see below)
npm run dev              # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server, including the two API routes |
| `npm run typecheck` | TypeScript across the app, API and tests |
| `npm test` | The test suite (Vitest) |
| `npm run build` | Regenerates `public/llms.*` and `public/sitemap.xml`, typechecks, builds to `dist/` |
| `npm run preview` | Serves the production build locally, including the API routes |

## Environment variables

Set these in `.env` locally and in the host's environment settings in production. **Nothing here is ever sent to the browser**: only `VITE_`-prefixed variables are, and this app uses none. `.env` is git-ignored.

| Variable | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | For the assistant | Key for [OpenRouter](https://openrouter.ai). Without it the assistant answers "not configured" and the rest of the site is unaffected. |
| `OPENROUTER_MODEL` | No | One model id, or a comma-separated list tried in order. Free models are retired from time to time; if all of them fail the server falls back to the built-in list in `server/chat.ts`. |
| `SITE_URL` | No | Public address used for links in `llms.txt` and the sitemap. |

## How it fits together

```
src/
  pages/        One file per route (lazy-loaded)
  components/   UI, grouped by feature
  data/         All content: pandals, stations, Metro services, bus routes, reels, themes
  lib/          Pure logic: routes, Google Maps links, day planner, feedback sender
  store/        Zustand store (saved pandals, theme, filters)
server/         Request handlers, written against the web-standard Request/Response
api/            Thin Vercel functions that call the handlers (chat, feedback)
tests/          Vitest suites (data integrity, routes, handlers, the feedback contract)
scripts/        build-llms.mjs (llms.txt, llms.md, sitemap.xml), build-data.mjs (base data import)
```

- **Data is the product.** `src/data/pandals.ts` is the base list. Corrections live in separate overlay files that are applied on top, so re-importing the base data never undoes them: `auditFixes.ts` (positions, stations, merged duplicates), `southKolkata.ts` and `pujoMap.ts` (added pandals and position fixes), `themeUpdates.ts` (2026 themes, artists, popularity). `src/data/index.ts` applies them in order.
- **Metro service times** are in `src/data/metroServices.ts` with their sources. Update that file if Metro Railway Kolkata changes the festival timetable.
- **`public/llms.txt`, `llms.md` and `sitemap.xml` are generated** from the data on every build. Do not edit them by hand.
- **The same handlers run in dev and in production.** `vite.config.ts` mounts `server/chat.ts` and `server/feedback.ts` on the dev and preview servers; in production `api/*.ts` calls them as serverless functions.

### API

| Route | Method | Notes |
|---|---|---|
| `/api/chat` | POST `{ messages: [{ role, content }] }` | Streams a plain-text reply from OpenRouter. At most 12 turns of 1,500 characters; 20 requests per 5 minutes per visitor; tries fallback models if one is gone or busy. |
| `/api/feedback` | POST `{ rating, uses?, worked?, better?, wrong?, email?, trap, elapsed }` | Validates, then posts to a Google Form and reports its real result. 5 per 10 minutes per visitor; a filled honeypot or an instant send is dropped quietly. |

Both refuse a browser request from another website (HTTP 403), accept only POST, validate on the server, and never return stack traces or upstream error bodies.

## Security and privacy

- No secrets in the repository, its history or the client bundle (checked). The OpenRouter key exists only on the server.
- `vercel.json` sets a strict Content-Security-Policy (no inline scripts, no third-party scripts or fonts), HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, a referrer policy and a permissions policy.
- Fonts are bundled with the site; there is no analytics or advertising code. See the in-app **Privacy and terms** page for what is stored and sent.
- `npm audit --omit=dev` reports no vulnerabilities, and CI fails on any high or critical advisory.
- There are no user accounts or database, so there is nothing to authenticate, no per-user records to protect and no migrations or backups to run. Saved pandals live in the visitor's own browser.

## Deploying (Vercel)

1. Import the repository; the framework is detected as Vite and `vercel.json` provides the SPA rewrite, security headers and function limits.
2. Add `OPENROUTER_API_KEY` (and optionally `OPENROUTER_MODEL`, `SITE_URL`) under Settings → Environment Variables, then redeploy.
3. Every push to `main` deploys. To roll back, promote an earlier deployment in the Vercel dashboard.

CI (`.github/workflows/ci.yml`) typechecks, runs the tests, builds and audits dependencies on every push and pull request.

## Known limits

- Pandal positions are map points from OpenStreetMap and press listings, not surveyed addresses, and some small committees are not mapped at all. Distances are straight-line distances lengthened by a quarter, converted at about 11 minutes per kilometre.
- Free AI models are rate-limited and occasionally unavailable; the rate limiter is per server instance, so it is a courtesy limit rather than a hard cap.
- Mobile performance on a slow connection is moderate (Lighthouse lab score around 60); the app is a client-rendered single-page app.

## Licence — all rights reserved

This source is published **for viewing only**. It is not open source.

You may **not** copy, reuse, modify, redistribute, deploy or imitate the code, design or data, and you may not use them to train machine-learning models. See [LICENSE](LICENSE) for the full terms. For permission or a licence, contact the author through his [GitHub profile](https://github.com/Sayan024).

## Third-party content

The pandal photographs in `public/img` were gathered from public sources and belong to their photographers. They are **not** covered by this licence, and no rights in them are claimed or granted. Instagram reels shown in the app are linked, not copied, and belong to their creators. Bus routes come from [Kolkata Bus-O-Pedia](https://www.kolkatabusopedia.com)'s Durga Puja guide posters, and the award shortlist from [Asian Paints Sharad Shamman](https://sharadshamman.asianpaints.com); both are credited in the app.

The soft background dhak (`public/audio`) is a short rhythm from the YouTube video [“Festive rhythm 🪘 Durga puja dhaki”](https://www.youtube.com/shorts/A0g2UWfT5ug) by [TrainzHub](https://www.youtube.com/@TrainsHubJoy), used with credit. It belongs to its creator and is not covered by this licence.

Environment files and API keys are never committed.

## Disclaimer

Distances, themes, timings and Metro information are compiled from public announcements and may be wrong or change. Confirm with the puja committee or Metro Railway Kolkata before you travel. This is an independent guide and is not affiliated with Metro Railway Kolkata or any puja committee.
