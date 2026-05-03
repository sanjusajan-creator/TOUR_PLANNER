<!-- refreshed: 2026-05-03 -->
# Architecture

**Analysis Date:** 2026-05-03

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                        Browser / Client Layer                           │
│                        (PWA - index.html + CSS + JS)                    │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Navigation │  │   Tracking   │  │  PDF Viewer  │  │   Games    │ │
│  │   Module     │  │   Module     │  │    Module    │  │   Module   │ │
│  │ js/nav.js    │  │ js/tracking.js│ │ js/pdf.js    │  │ js/games.js│ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│                     Service Worker (sw.js)                               │
│                  PWA Offline Support + Caching                           │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Navigation | View switching, page transitions, DOM management | `js/modules/navigation.js` |
| Tracking | Train position simulation, station markers, progress calculation | `js/modules/tracking.js` |
| PDF Viewer | PDF rendering with password protection using PDF.js | `js/modules/pdf.js` |
| Games | External game links, retro grid animations | `js/modules/games.js` |
| Packing | Packing list management | `js/modules/packing.js` |
| Main Entry | Event delegation, initialization, keyboard shortcuts | `js/main.js` |
| Components | Reusable HTML template generation | `js/components.js` |

## Pattern Overview

**Overall:** Single Page Application (SPA) with Multi-View Navigation

**Key Characteristics:**
- Single HTML page with all views hidden/shown via CSS display toggling
- Event delegation for data-action elements (replaces inline onclick)
- Module-based JavaScript with barrel exports in `js/modules/index.js`
- CSS-driven page transitions (opacity + transform animations)
- PWA with service worker for offline asset caching

## Layers

**UI Layer (index.html + style.css):**
- Purpose: All UI content in single HTML file, styled with Bootstrap 5 + custom CSS
- Location: `index.html`, `style.css`
- Contains: Navbar, carousel, day sections, PDF modal, game cards
- Depends on: Bootstrap 5, Bootstrap Icons, Animate.css, Google Fonts

**JavaScript Application Layer (js/main.js + js/modules/):**
- Purpose: Application logic, view management, tracking simulation
- Location: `js/`
- Contains: Navigation, tracking, PDF, games, packing modules
- Depends on: pdf.js library, Bootstrap JS

**Infrastructure Layer (sw.js + manifest.json):**
- Purpose: PWA capabilities, offline caching
- Location: `sw.js`, `manifest.json`
- Contains: Service worker caching strategy, app manifest
- Depends on: Browser service worker API

## Data Flow

### Primary Request Path - View Navigation

1. **User clicks nav link** (`index.html` data-action elements)
   - Event delegation in `js/main.js` calls Navigation module functions
   
2. **Navigation.showDay()** (`js/modules/navigation.js:150`)
   - Hides all views via `hideAll()`
   - Shows target day section with CSS display toggle
   - Adds `.page-active` class for animation
   - Updates navbar state for day mode

3. **CSS transition triggers** (`style.css:310-341`)
   - Opacity and transform transitions provide smooth page changes

### Train Tracking Flow

1. **Window onload** (`js/main.js:447`)
   - `Tracking.initMarkers()` - renders station markers
   - `Tracking.setInitialDate()` - sets default date
   - `Tracking.updateTracker()` - calculates position

2. **updateTracker()** (`script.js:665` / `js/modules/tracking.js`)
   - Computes elapsed minutes from departure date
   - Maps elapsed time to progress percentage
   - Updates progress bar, train icon position, station markers

3. **60-second interval** (`script.js:767`)
   - Auto-refreshes tracking position every minute

### PDF Viewing Flow

1. **User clicks PDF card** (`index.html` data-action="view-pdf")
   - Calls `PDF.viewPDF(file)` 

2. **Password prompt modal** (`script.js:436`)
   - Shows Bootstrap modal with password input

3. **PDF.loadPdfWithJs()** (`script.js:496`)
   - Uses pdf.js to render with password
   - Caches rendered PDF in `pdfDocumentCache` Map
   - Renders pages to canvas elements

## Key Abstractions

**Navigation State:**
- `currentDay` - Current day number (0 = home, 1-10 = day pages)
- `window.isPdfUnlocked` - PDF viewing state
- Pattern: Global state with view switching via CSS

**Tracking Data:**
- `tripSchedule` - Array of station objects with time/distance
- `marudharFullRoute` - Extended route data for day 4
- `sainikFullRoute` - Extended route data for day 5
- Pattern: Static data for simulation, computed progress from time

**PDF Security:**
- `pdfPasswordsEncoded` - Base64 encoded passwords (obfuscation only)
- Pattern: Client-side password lookup with base64 encoding

## Entry Points

**index.html:**
- Location: `index.html`
- Triggers: Browser loads page
- Responsibilities: All UI markup, Bootstrap/MD bootstrap, PDF.js library

**js/main.js:**
- Location: `js/main.js` (via ES6 module imports)
- Triggers: DOMContentLoaded event
- Responsibilities: Initialize all modules, setup event handlers, keyboard shortcuts

**sw.js:**
- Location: `sw.js`
- Triggers: Service worker registration in index.html
- Responsibilities: Cache-first strategy for offline support

## Architectural Constraints

- **SPA Pattern:** Single HTML file with all views in DOM (performance trade-off, ~8000+ lines)
- **Global State:** `currentDay`, `isPdfUnlocked`, `currentPdfFile` stored on window
- **No Backend:** All data is static/hardcoded (no API calls)
- **PDF Passwords:** Base64 encoded in JavaScript (security note: obfuscation only, not encryption)

## Anti-Patterns

### Inline Event Handlers

**What happens:** Mixed inline `onclick` and `data-action` attributes throughout index.html
- Example: `data-action="show-day" data-day="day1"` vs inline onclick in some places

**Why it's wrong:** Inconsistent pattern makes maintenance harder; `data-action` with event delegation is preferred

**Do this instead:** Use event delegation exclusively as implemented in `js/main.js:70` - all click handlers through `setupEventDelegation()`

### Base64 PDF Passwords in Source

**What happens:** PDF passwords hardcoded as base64 in `script.js:6`
- Example: `'QLN AGC.pdf': 'MjQyNg=='`

**Why it's wrong:** Anyone can decode base64 to get passwords; security through obscurity only

**Do this instead:** For production, move passwords to secure backend API or use proper encryption

### Large Inline HTML

**What happens:** All 10 day views + PDF section + Aadhar + Entertainment all in single HTML file (~8000+ lines)

**Why it's wrong:** Initial page size large; harder to maintain; cannot lazy-load views

**Do this instead:** Consider separate HTML files per view or dynamic loading of day sections

## Error Handling

**Strategy:** Try-catch with console logging; fallback UI states

**Patterns:**
- `script.js:666` - Tracking update wrapped in try-catch, silently fails
- `script.js:49` - PDF password decode error returns empty string
- No user-facing error modals for all failure cases (basic alerts only)

## Cross-Cutting Concerns

**Logging:** `console.log`, `console.warn`, `console.error` throughout - no centralized logging

**Validation:**
- `script.js:55` - URL validation for external links (whitelist of trusted domains)
- `script.js:25` - PDF filename format validation with regex

**Authentication:** None (PDF password is only barrier, very weak)

---

*Architecture analysis: 2026-05-03*