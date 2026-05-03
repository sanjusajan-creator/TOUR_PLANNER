# External Integrations

**Analysis Date:** 2026-05-03

## APIs & External Services

**Maps & Location:**
- **Google Maps** - Embedded maps and directions
  - Embed API: `maps.google.com` (via iframe)
  - Directions API: `google.com/maps/dir/`
  - Used in: Train station maps, hotel navigation

**Fonts:**
- **Google Fonts (Outfit)** - Custom typography
  - URL: `fonts.googleapis.com/css2?family=Outfit:wght@400;700;800&display=swap`

## Data Storage

**Databases:**
- None (data is hardcoded in HTML/JS)

**File Storage:**
- Local PDF files (project files)
  - Examples: `QLN AGC.pdf`, `AF JP.pdf`
  - Password-protected with PDF.js rendering

**Caching:**
- Service Worker (`sw.js`) - Offline asset caching
  - Cache name: `tour-planner-v1`

## CDNs & External Resources

**CSS Framework:**
- Bootstrap CSS 5.3.8 - `cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css`
- Bootstrap Icons 1.11.1 - `cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.css`
- Animate.css 4.1.1 - `cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css`

**PDF Library:**
- PDF.js 2.16.105 (lib/pdf.js/pdf.min.js - bundled locally)
- PDF.js Worker: `cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`

## Authentication & Identity

**Auth Provider:**
- None (client-side only)
- PDF passwords stored as Base64-encoded strings in `script.js`
  - SECURITY NOTE: Only for obfuscation, not true security

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- Console logging via `console.log()` / `console.error()`

## PWA Integration

**Service Worker:**
- File: `sw.js`
- Strategy: Cache-first for static assets, network-first for HTML
- Cached assets: `/index.html`, `/style.css`, `/lib/pdf.js/pdf.min.js`

**Offline Support:**
- Pre-cached critical assets on install
- Fallback to cached `index.html` when offline
- Background cache updates

## Environment Configuration

**Required env vars:**
- None (static project)

**Secrets location:**
- None

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- External game URLs (opened in new tabs)
  - `ludo-sepia-omega.vercel.app/`
  - `sanjusajan-creator.github.io/Chess`
  - `carrom-board-black.vercel.app/`
  - And 5 more games...

---

*Integration audit: 2026-05-03*