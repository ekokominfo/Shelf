# Complete Shelf

Local React/Vite integration of the official Working Volumes document, using Three.js r165. Run `pnpm install`, `pnpm dev`, `pnpm build`, and `pnpm verify`.

The user approved the current official HTML on 2026-10-17. It is served byte-for-byte at `/landing-pages/complete-shelf-v2.html` (SHA-256 `8f1256796bab42b0d60e187176dfcc9d9df33cec1d22ca6f3c3767dcfeca4cb9`). It differs from the originally requested revision; see `source-verification.json`. This current upstream version loads its cover/wood images from Supabase, Three.js from jsDelivr, and Inter from Google Fonts, so internet access is needed.

The registered source bundle and its three matching React/CSS files are retained in `vendor/threeui`. The iframe host is copied without changes. The missing upstream typography helper is replaced only at the surrounding host boundary with a local adapter for the configured props. Desktop typography overrides preserve authored mobile breakpoints. The complete HTML is never imported into the JavaScript bundle; only the React host is lazy-loaded.

The authored renderer caps pixel ratio at 1.5 on mobile and 2 on desktop. Context loss intentionally displays its static catalog and requests a reload. Renderer code, animations, input handling, and document lifecycle remain untouched.

## Verification

TypeScript validation, production build, and source-integrity checks passed. Headless Edge checks passed at 1440×900 (DPR 1) and 390×844 (DPR 3, touch, reduced motion): seven volume tabs, previous/next navigation, book opening, page-turn control, Escape dismissal, no horizontal document overflow, and actual WebGL context-loss fallback. No uncaught JavaScript errors were observed. Screenshots and results are in `artifacts/` after running `scripts/browser-check.cjs` with Playwright available (or `PLAYWRIGHT_PACKAGE` pointing to its installed package).

Mobile rendering retains the upstream 1.5 DPR cap, so it is below native backing resolution on DPR 3 devices. Exhaustive GPU resource accounting, pointer-drag gestures, and tab-visibility suspension were not instrumented; the original lifecycle implementation is preserved.
