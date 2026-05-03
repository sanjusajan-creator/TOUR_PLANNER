<!-- refreshed: 2026-05-03 -->
# Codebase Structure

**Analysis Date:** 2026-05-03

## Directory Layout

```
[project-root]/
├── index.html              # Main HTML entry point (all UI views)
├── style.css               # Custom styling (~4800 lines)
├── script.js               # Legacy JS (main logic, ~1600 lines)
├── manifest.json           # PWA manifest configuration
├── sw.js                   # Service worker for offline support
├── js/                     # ES6 module JavaScript
│   ├── main.js             # Main entry point, initialization
│   ├── components.js       # Reusable HTML component factory
│   └── modules/            # Feature modules (ES6)
│       ├── index.js        # Barrel file exports all modules
│       ├── navigation.js  # View navigation and page transitions
│       ├── tracking.js    # Train tracking simulation
│       ├── pdf.js         # PDF viewing with password
│       ├── games.js       # Entertainment/games functionality
│       └── packing.js     # Packing list functionality
├── lib/                    # Third-party libraries
│   └── pdf.js/            # PDF.js library
│       ├── pdf.min.js     # PDF.js main library
│       └── pdf.worker.min.js  # PDF.js web worker
└── (images/)              # Image assets in root (jpg, avif, webp, png)
```

## Directory Purposes

**Root Directory (`/`):**
- Purpose: Main application entry points and static assets
- Contains: HTML, CSS, JS, PWA config, images
- Key files: `index.html`, `style.css`, `manifest.json`, `sw.js`

**JavaScript Directory (`js/`):**
- Purpose: Modular JavaScript application code
- Contains: ES6 modules with clear separation of concerns
- Key files: `main.js`, `components.js`

**Modules Directory (`js/modules/`):**
- Purpose: Feature-specific modules following barrel pattern
- Contains: Navigation, tracking, PDF, games, packing
- Key files: `index.js` (exports), individual feature modules

**Library Directory (`lib/`):**
- Purpose: Third-party library code
- Contains: PDF.js library files
- Key files: `pdf.min.js`, `pdf.worker.min.js`

## Key File Locations

**Entry Points:**
- `index.html`: Main application HTML with all views
- `js/main.js`: JavaScript application entry (loads via ES6 modules)

**Configuration:**
- `manifest.json`: PWA configuration (name, icons, display mode)
- `sw.js`: Service worker for offline caching

**Core Logic:**
- `js/main.js`: Initialization, event delegation, keyboard shortcuts
- `js/modules/navigation.js`: View switching, page visibility
- `js/modules/tracking.js`: Train position simulation
- `script.js`: Legacy standalone functions (also used)

**Testing:**
- No test directory (no automated tests in this project)

## Naming Conventions

**Files:**
- camelCase.js: JavaScript files
- kebab-case.css: CSS files
- lowercase.html: HTML files
- snake_case.json: JSON config files

**Directories:**
- kebab-case: All directories use lowercase with hyphens (js/, lib/, modules/)

**JavaScript Modules:**
- camelCase with descriptive names: `navigation.js`, `tracking.js`, `pdf.js`

**CSS Classes:**
- kebab-case: `.page-active`, `.reveal-on-scroll`, `.train-card`
- Bootstrap classes: `.btn`, `.card`, `.carousel`
- Custom prefixes: `.stn-`, `.marudhar-`, `.sainik-` for feature-specific styles

## Where to Add New Code

**New Feature (JavaScript):**
- Implementation: `js/modules/` (create new module file)
- Export: Add to `js/modules/index.js` barrel export
- Usage: Import in `js/main.js`

**New UI Section (HTML):**
- Implementation: Add to `index.html` before closing body
- Styling: Add to `style.css` (or create feature-specific CSS section)
- Navigation: Add data-action handler in `js/main.js` setupEventDelegation()

**New Tracking Route:**
- Implementation: Add route data in `js/modules/tracking.js`
- Example: `tripSchedule`, `marudharFullRoute`, `sainikFullRoute` arrays
- UI: Add day section in `index.html` with appropriate tracker

**New PDF Document:**
- Implementation: Add to project root (PDF files)
- Password: Add entry to `pdfPasswordsEncoded` in `script.js:6`
- UI: Add clickable card in PDF section of `index.html`

**Styling Changes:**
- Implementation: Add to `style.css`
- Use existing patterns: responsive media queries, hover effects, transitions

## Special Directories

**lib/pdf.js:**
- Purpose: PDF.js library for in-browser PDF rendering
- Generated: No (third-party, downloaded)
- Committed: Yes (in repo)

**js/modules:**
- Purpose: Feature modules following ES6 module pattern
- Generated: No (hand-written)
- Committed: Yes (in repo)

## Important Project Notes

- **Single HTML file approach:** All views (home, day1-day10, PDFs, Aadhar, Entertainment) exist in `index.html` as hidden sections
- **Dual JS approach:** Both `script.js` (legacy) and `js/main.js` (ES6 modules) exist - recommend using ES6 modules pattern
- **Static data:** No backend; all tracking data is hardcoded arrays (tripSchedule, route arrays)
- **PWA enabled:** Service worker + manifest for offline-capable installable app
- **No build step:** Vanilla JS/CSS, no bundler (Webpack, Vite, etc.)

---

*Structure analysis: 2026-05-03*