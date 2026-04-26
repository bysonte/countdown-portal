# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # tsc && vite build
npm run preview   # Preview production build
```

No test framework is configured.

## Architecture

A single-page React + Vite countdown timer portal for a group trip departing **2026-09-13T08:30:00-03:00**. All application logic lives in `src/App.jsx` (no routing, no feature directories).

### Sections (rendered in order)

| Section | Library | Notes |
|---------|---------|-------|
| Countdown | `react-countdown` | Target date hardcoded in `App.jsx`; shows "¡YA EMPEZÓ!" on completion |
| Map | `react-leaflet` | Marker at New York (40.7128, -74.0060); Leaflet CSS imported in `main.jsx` |
| Photo gallery | `react-responsive-carousel` | External Unsplash URLs; autoPlay enabled |
| Music player | `react-icons/fi` | Loads `/public/music/adventure-of-a-lifetime.mp3`; auto-play with browser-block fallback |

### Installed but unused libraries

`axios`, `date-fns`, `framer-motion`, `react-router-dom` — installed but not yet wired up.

### Styling

`App.css` uses glassmorphism with CSS gradient animations. No CSS-in-JS or utility framework. Spanish (`lang="es"`) throughout.

### TypeScript note

The project uses `.jsx` files (not `.tsx`) despite having TypeScript configured with strict mode. `src/main.ts` and `src/counter.ts` are unused Vite template artifacts.
