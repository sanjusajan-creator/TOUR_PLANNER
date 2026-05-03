# Coding Conventions

**Analysis Date:** 2026-05-03

## Naming Patterns

**Files:**
- Use kebab-case: `script.js`, `style.css`, `main.js`, `components.js`
- Configuration: `manifest.json`

**Functions:**
- Use camelCase: `showDay()`, `goHome()`, `updateTracker()`, `initMarkers()`
- Action functions use `data-action` attributes: `data-action="show-day"`, `data-action="prev-day"`

**Variables:**
- camelCase: `currentDay`, `pdfDocumentCache`, `isPdfUnlocked`
- booleans prefixed with `is`/`has`: `isPdfUnlocked`, `isValidExternalUrl()`

**Constants:**
- UPPER_SNAKE_CASE: `PDF_WORKER_SRC`, `CACHE_NAME`, `ASSETS_TO_CACHE`
- Located at top of files or in dedicated const blocks

**CSS Classes:**
- kebab-case: `train-card`, `days-head`, `carousel-item`, `reveal-on-scroll`
- BEM-inspired compound classes: `btn-track`, `game-card`, `vault-card`

**HTML IDs:**
- kebab-case: `nav-wrapper`, `dropContainer`, `station-marker-container`, `journey-date`

## Code Style

**Formatting:**
- No explicit Prettier or formatter config found
- Bootstrap 5 utility classes used extensively
- Mix of inline styles in HTML and CSS file

**Linting:**
- No ESLint config detected
- No code quality enforcement

**JavaScript Standard:**
- Uses ES6+ features (const/let, arrow functions, template literals, async/await)
- Module imports in `js/main.js`: `import * as Module from './modules/module.js'`
- Functions exported as global on `window` object
- Mix of patterns: some functions use `function` keyword, others use arrow functions

**Example Pattern:**
```javascript
// Constant at top
const PDF_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

// Global state
let currentDay = 0;

// Function declaration (camelCase)
function showDay(id) {
  if (!id) return;
  // function body
}

// Event listener pattern
document.addEventListener("DOMContentLoaded", () => {
  // initialization
});
```

## Import Organization

**Order in Files (script.js):**
1. Global variables and constants
2. Utility/helper functions
3. Navigation functions (`showDay`, `goHome`, etc.)
4. PDF handling functions
5. Tracking functions
6. UI/render functions
7. Event listeners at bottom
8. `window.onload` setup

**Libraries (CDN):**
- Bootstrap 5.3.8 (CSS + JS)
- Bootstrap Icons 1.11.1
- Animate.css 4.1.1
- PDF.js (local in lib/)
- Google Fonts (Outfit)

**HTML Script Loading:**
```html
<script src="lib/pdf.js/pdf.min.js"></script>
<!-- Inlined inline for service worker -->
<script>
  if ('serviceWorker' in navigator) { ... }
</script>
```

## Error Handling

**Patterns:**
- Try-catch blocks in critical functions
- Console logging with context: `console.log()`, `console.warn()`, `console.error()`
- User-facing alerts for errors: `alert("Error message")`
- Graceful degradation with fallbacks

**Example:**
```javascript
function getPdfPassword(file) {
  try {
    if (!file || typeof file !== 'string') {
      console.warn("Invalid PDF file parameter");
      return '';
    }
    // ... function body
  } catch (e) {
    console.error("Error decoding PDF password:", e);
    return '';
  }
}
```

## Logging

**Framework:** Console API
- `console.log()` - General logging
- `console.warn()` - Warnings for non-critical issues
- `console.error()` - Errors requiring attention
- Prefix with context: `"[DOM Rescue] Moving #" + id`, `"Service Worker:"`

**Patterns:**
- Debug logs in development: many `console.log()` statements in `script.js`
- Prefix module names: `"[DOM Rescue]"`, `"Tour Planner:"`, `"Service Worker:"`

## Comments

**When to Comment:**
- Complex logic blocks (e.g., train schedule calculations)
- Security notes: `// SECURITY NOTE: PDF passwords are encoded in base64...`
- Section separators with descriptions
- JSDoc-style `@description` in `js/components.js`

**JSDoc Usage:**
```javascript
/**
 * @description Setup event delegation for data-action elements to replace inline onclick handlers
 * @returns {void}
 */
function setupEventDelegation() { ... }
```

## Function Design

**Size:** Large monolithic functions in `script.js` (~1500+ lines)
- Single `script.js` contains all navigation, PDF, tracking, and UI logic
- `js/main.js` (~464 lines) attempts modular organization

**Parameters:**
- Simple: single primitive or object
- Complex: options object pattern in `js/components.js`

**Return Values:**
- Explicit returns in utility functions
- No return (void) for event handlers
- DOM manipulation directly in functions

**Example:**
```javascript
function showDay(id) {
  if (!id) return;
  // ... function body
}
```

## Module Design

**Exports:**
- ES6 modules in `js/` directory use `export function name()`
- Main script uses global function registry on `window` object
- `js/components.js` exports factory functions: `createDayCard()`, `createTrainCard()`

**Barrel Files:**
- No barrel files (`index.js`) detected
- Direct imports: `import * as Navigation from './modules/navigation.js'`

**Global Registry Pattern:**
```javascript
// Functions exposed globally
window.currentDay = currentDay;
window.isPdfUnlocked = false;
window.reinitScrollAnimations = reinitScrollAnimations;
```

## Special Patterns Used

**Data Attributes:**
- Navigation: `<a data-action="go-home">`
- Day selection: `<a data-action="show-day" data-day="day1">`
- File references: `<button data-action="view-pdf" data-file="file.pdf">`

**Service Worker (PWA):**
```javascript
const CACHE_NAME = 'tour-planner-v1';
self.addEventListener('install', (event) => { ... });
self.addEventListener('fetch', (event) => { ... });
```

**PDF Handling:**
- Base64 encoded passwords stored in object
- `pdfDocumentCache` Map for caching
- Render with concurrency: `CONCURRENCY = 3`

---

*Convention analysis: 2026-05-03*