# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (HMR on localhost:5173)
npm run build     # tsc && vite build  (output → dist/)
npm run preview   # Preview the production build locally

# One-time setup tasks
node scripts/optimize-photos.mjs   # Convert/resize raw photos in public/album/ → public/album/web/*.webp
node scripts/seed-cocktails.js     # Seed 51 cocktails into Neon DB (run once per DB)
```

No test framework is configured.

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in the values:

| Variable | Purpose |
|---|---|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API — enable "Maps JavaScript API" in GCP Console; restrict to `localhost:5173/*` and your production domain |
| `VITE_NEON_DATABASE_URL` | Neon serverless PostgreSQL connection string; accessed directly from the browser via `@neondatabase/serverless` |

If `VITE_GOOGLE_MAPS_API_KEY` is absent, `MapSection` renders a graceful "map unavailable" message instead of crashing.

## Architecture

Single-page React + Vite app (no routing) for a group trip to Punta Cana departing **2026-09-12T02:00:00-03:00**. Spanish throughout (`lang="es"`).

**All trip constants** (target date, destination coords, hotel marker, music metadata, photo list, progress labels, album URL) live in `src/config/trip.ts` as the `TRIP` object — edit there first for any content changes.

### Component tree

```
App.jsx
├── Hero.tsx                  ← Full-viewport section
│   ├── PhotoBackground.tsx   ← 6-cell grid background; each cell A/B crossfades every ~3 s
│   ├── CountdownDisplay.tsx  ← Wires together the countdown, progress, and cocktail widget
│   │   ├── FlipCountdown/    ← Custom flip-digit countdown (no external library); shows "¡YA EMPEZÓ!" when complete
│   │   ├── FlightProgress/   ← Animated plane-on-track progress bar (Jan 2026 → Sep 2026)
│   │   └── CocktailGenerator.tsx  ← Fetches a random cocktail from Neon DB
│   │       └── FlightActionButton/   ← Reusable styled button with loading state
│   └── ScrollIndicator.tsx
├── MapSection.tsx            ← Google Maps hybrid view pinned to Meliá Caribe Beach Resort
├── PhotoGrid.tsx             ← Static photo grid + optional Google Photos album link
├── MusicPlayer.tsx           ← Fixed FAB; auto-plays /public/jerusalema.mp3 (browser-block safe)
│   ├── useAudioAnalyser.ts   ← Web Audio API hook (WeakMap cache — StrictMode-safe)
│   └── SpectrumAnalyzer.tsx  ← Canvas bar visualizer driven by the analyser node
└── PlaneLoader.tsx           ← Decorative floating plane (always rendered)
```

`WeatherWidget.tsx` exists but is **not mounted in App.jsx**. A lighter weather fetch runs directly inside `Hero.tsx` to show current temperature in the header badge (no key required — uses open-meteo.com free API at Punta Cana coords).

### Styling

Plain CSS only — no Tailwind, no CSS-in-JS. Glassmorphism + CSS gradient animations live in `src/App.css`. Complex components with many rules keep a co-located `.css` file (e.g. `FlipCountdown.css`, `FlightProgress.css`, `PlaneLoader.css`, `FlightActionButton.css`).

### TypeScript / JSX mix

Most components are `.tsx`. The entry points (`src/App.jsx`, `src/main.jsx`) remain `.jsx`. TypeScript is configured with strict mode; add type annotations when creating new components.

### Photo workflow

1. Drop raw photos (JPG/PNG/HEIC/HEIF) into `public/album/`.
2. Run `node scripts/optimize-photos.mjs` — converts and resizes to ≤1440 px wide `.webp` files in `public/album/web/`. The script is incremental (skips already-converted files).
3. Add the new paths to the `photos` array in `src/config/trip.ts`.

### Deployment

Docker multi-stage build (Node 20 → Nginx alpine) via `Dockerfile`. Portainer stack definition is in `stack-portainer.yml`. Windows deployment script: `deploy.ps1`.
