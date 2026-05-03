# Codebase Concerns

**Analysis Date:** 2026-05-03

## Security Considerations

### Critical: Base64-Encoded PDF Passwords in Source Code

**Risk:** Passwords for PDF files are stored as base64-encoded strings directly in `script.js` (lines 6-21). While the code comment acknowledges this is insecure ("for production use, consider storing these on a secure backend"), these credentials can be trivially decoded by anyone with access to the source code.

**Files:** `script.js`

**Current mitigation:** None - this is a known vulnerability.

**Recommendations:**
- Remove client-side PDF password storage entirely
- Implement a server-side API endpoint that validates user identity before serving PDFs
- Use a proper authentication system with session tokens
- If client-side password entry is required, hash passwords client-side and verify against server

---

### Medium: External Game Links as Open Redirects

**Risk:** In `index.html` (lines 459-565), game links use `window.open()` to external Vercel-hosted applications. These external sites could:
- Be taken offline (link rot)
- Be replaced with malicious content
- Change their URL structure

**Files:** `index.html`, `script.js`

**Current mitigation:** `isValidExternalUrl()` function in `script.js` (lines 55-88) only whitelists `google.com`, `maps.google.com`, `www.google.com`, and `cdnjs.cloudflare.com`. Game links bypass this validation entirely using inline onclick handlers.

**Recommendations:**
- Remove inline onclick handlers (`onclick="window.open('https://...')"`)
- Implement URL validation for all external links
- Consider self-hosting games or removing less-critical game links

---

### Medium: Sensitive Data in Client-Side Code

**Risk:** The application embeds:
- Aadhaar reference numbers in filenames (`eAadhaar_*.pdf`)
- Train numbers and detailed journey itineraries
- Hotel names and booking references

**Files:** `index.html`, `script.js`

**Current mitigation:** None - this data is visible in source code.

**Recommendations:**
- Implement server-side retrieval of itinerary data based on authenticated session
- Avoid using identifiable filenames for sensitive documents

---

## Technical Debt

### High: Monolithic script.js File

**Issue:** All JavaScript functionality is contained in a single ~1500+ line `script.js` file. This creates:
- Difficulty in maintenance and debugging
- No code splitting or lazy loading
- Potential memory bloat from unused functions
- Testing challenges

**Files:** `script.js`

**Impact:** Application performance degrades as the codebase grows.

**Fix approach:** Split into modular files:
- `js/modules/navigation.js` - Navigation logic
- `js/modules/tracking.js` - Train tracking logic
- `js/modules/pdf.js` - PDF handling
- See `js/main.js` lines 6-10 shows intended module structure exists but is not being used

---

### High: Service Worker Incomplete Caching

**Issue:** The service worker (`sw.js`, lines 5-10) only caches:
- `/`
- `/index.html`
- `/style.css`
- `/lib/pdf.js/pdf.min.js`

Critical files NOT cached:
- `script.js` - Main application logic
- All game links are external and not cached

**Files:** `sw.js`

**Impact:** App fails to load fully offline because main JavaScript is not cached.

**Fix approach:**
```javascript
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',  // Add this
  '/manifest.json',  // Add this
  '/lib/pdf.js/pdf.min.js'
];
```

---

### Medium: Unbounded Memory Cache

**Issue:** `pdfDocumentCache` in `script.js` (line 109) is a `Map()` that caches PDF documents in memory indefinitely. For a multi-page PDF touring document, this could consume significant memory.

**Files:** `script.js`, lines 109, 513-534

**Impact:** Memory leaks, particularly on mobile devices.

**Fix approach:**
- Implement LRU cache with size limits
- Clear cache on navigation away from PDF viewer
- Add cache eviction policy

---

### Medium: Hardcoded Trip Dates

**Issue:** The application contains hardcoded dates throughout:
- `script.js` line 775: `"2026-05-24T00:00:00"` - Trip start
- `script.js` line 776: `"2026-05-26T23:59:59"` - Trip end
- Similar hardcoded dates for Marudhar (line 993) and Sainik (line 1077, 1308)

**Files:** `script.js`

**Impact:** Code requires modification for each new trip instance.

**Fix approach:** Move dates to configuration object or load from external JSON.

---

## Known Bugs / Fragile Areas

### High: Day Navigation Edge Case

**Issue:** In `prevDay()` function (`script.js`, lines 368-376):
```javascript
function prevDay() {
  if (currentDay > 1) {
    showDay("day" + (currentDay - 1));
  } else if (currentDay === 1) {
    goHome();
  } else if (currentDay === 0) {
    showDay("day10");
  }
}
```
When `currentDay === 0` (home), clicking "Prev" jumps to day10, but the dropdown text doesn't update correctly.

**Files:** `script.js`, lines 368-376

**Trigger:** Navigate to home, then click Prev button.

**Workaround:** None fully functional.

**Fix approach:** Add explicit dropdown text update in the `currentDay === 0` case.

---

### Medium: Double-Firing Event Listeners

**Issue:** Some event listeners may be added multiple times:
- `document.addEventListener("DOMContentLoaded", ...)` in both `script.js` (line 378) and potential duplicate in other contexts
- Carousel initialization happens in both inline scripts and `main.js`

**Files:** `script.js`, `index.html`

**Impact:** Functions execute multiple times, causing unexpected behavior.

**Fix approach:** Remove duplicate DOMContentLoaded handlers, consolidate initialization.

---

### Medium: Missing Null Checks Before Function Calls

**Issue:** Multiple functions call `document.getElementById()` and immediately use the result without null checks:
- `updateDropdownText()` (line 247) - queries dropdown items without verifying elements exist
- `setInitialDate()` (line 770) - accesses `formatted-date-display` without check
- Many tracker functions assume DOM elements exist

**Files:** `script.js`

**Impact:** Application throws errors and fails when accessing pages without required elements.

**Fix approach:**
```javascript
function updateDropdownText(id) {
  const dropBtn = document.getElementById("dropBtn");
  if (!dropBtn) return;  // Early return pattern needed
  
  const items = document.querySelectorAll(".dropdown-item");
  // ...
}
```

---

### Low: Inconsistent Function Definitions

**Issue:** Mixed patterns for function declarations:
- Function declarations: `function showDay(id) { ... }`
- Arrow functions in eventListeners: `el.addEventListener('click', () => { ... });`
- Some functions use JSDoc, others don't

**Files:** `script.js`

**Impact:** Code readability and maintenance challenges.

**Fix approach:** Adopt consistent style (prefer arrow functions for callbacks, JSDoc for public APIs).

---

## Performance Bottlenecks

### Medium: Heavy DOM Querying in Scroll Observer

**Issue:** `initScrollAnimations()` in `main.js` (lines 185-252) queries all matching elements on every initialization:
```javascript
const elementsToAnimate = document.querySelectorAll(selectors);
```
This runs frequently during page navigation, querying potentially hundreds of elements.

**Files:** `main.js`, lines 185-252

**Fix approach:**
- Cache element queries
- Use event delegation instead of per-element observers
- Implement MutationObserver for dynamic content

---

### Low: Unoptimized CSS Selectors

**Issue:** Heavy use of general selectors:
- `.card:hover { ... }` applies to ALL cards globally
- Too many compound selectors causing style recalculation

**Files:** `style.css`

**Impact:** Slight performance degradation on low-end devices.

**Fix approach:** Use more specific classes for interactive elements.

---

## Accessibility Considerations

### Medium: Missing ARIA Attributes

**Issue:** Many interactive elements lack proper ARIA attributes:
- Dropdown toggle (line 150 in `index.html`) has `aria-haspopup="listbox"` but may not match actual behavior
- Game cards lack `role="button"` despite being clickable
- No `aria-live` regions for dynamic content updates (toast messages, tracker updates)

**Files:** `index.html`

**Recommendations:**
- Add `role="button"` and `tabindex="0"` to interactive card elements
- Add `aria-live="polite"` to status display areas
- Ensure all buttons have accessible names

---

### Medium: Focus Management

**Issue:** Keyboard navigation exists (`main.js` lines 345-393) but:
- No visible focus indicators for custom interactive elements
- Focus can get trapped in modal states
- No skip-to-content links

**Files:** `index.html`, `style.css`

**Recommendations:**
- Add visible focus rings: `.game-card:focus { outline: 2px solid var(--primary); }`
- Implement focus trapping in modals
- Add skip links for accessibility

---

## Testing Gaps

### High: No Test Suite Detected

**Issue:** No test files found in the project directory:
- No Jest, Vitest, or other test configuration
- No `*.test.js` or `*.spec.js` files
- No E2E test setup (Cypress, Playwright)

**Impact:** No regression protection, bugs introduced undetected.

**Recommendations:**
- Add unit tests for utility functions (`getPdfPassword`, `isValidExternalUrl`)
- Add integration tests for navigation flows
- Consider E2E tests for critical user paths

---

### Low: No Linting

**Issue:** No ESLint or similar linting configuration detected.

**Fix approach:** Add `.eslintrc.json` with sensible rules for a frontend project.

---

## Dependencies at Risk

### High: External CDN Reliance

**Issue:** Heavy dependency on external CDNs:
- Bootstrap 5.3.8 from `cdn.jsdelivr.net`
- Bootstrap Icons from `cdnjs.cloudflare.com`
- Google Fonts (Outfit)
- Animate.css from `cdnjs.cloudflare.com`
- PDF.js from `cdnjs.cloudflare.com`

**Risk:** If any CDN goes down or changes, application breaks.

**Impact:** Complete failure if offline or CDN unavailable.

**Fix approach:**
- Self-host critical dependencies (Bootstrap, CSS)
- Have fallback fonts
- Implement offline caching strategy

---

### Low: Game External Links

**Risk:** Game links point to external Vercel apps:
- `https://ludo-sepia-omega.vercel.app/`
- `https://sanjusajan-creator.github.io/Chess`
- Multiple other game URLs

**Current status:** Unknown if these remain available.

**Recommendations:**
- Self-host games or link to stable alternatives
- Add fallback messaging if game unavailable

---

## Architectural Anti-Patterns

### Medium: Global Variable Pollution

**Issue:** Heavy use of window-scoped global variables:
- `currentDay` - implicitly global
- `currentPdfFile`, `currentPdfPassword`, `isPdfUnlocked` - window properties
- Direct DOM manipulation from functions without encapsulation

**Files:** `script.js`

**Fix approach:** Use IIFE or module pattern to encapsulate:
```javascript
const TourPlanner = (function() {
  let currentDay = 0;
  
  function showDay(id) { /* ... */ }
  
  return { showDay };
})();
```

---

### Low: Inline Event Handlers

**Issue:** In `index.html`:
- Line 150: `data-bs-toggle="dropdown"` (Bootstrap, acceptable)
- Lines 471-565: Inline onclick handlers on game cards

**Files:** `index.html`

**Fix approach:** Use event delegation (as planned in `main.js`).

---

## Summary Priority List

| Priority | Issue | Impact |
|----------|-------|--------|
| Critical | Base64 PDF passwords | Security vulnerability |
| High | Service worker incomplete caching | Offline failure |
| High | No tests | Quality risk |
| Medium | External CDN reliance | Availability |
| Medium | Global variable pollution | Maintainability |
| Medium | Unbounded PDF cache | Memory leak |
| Low | Missing ARIA | Accessibility |
| Low | No linting | Code quality |

---

*Concerns audit: 2026-05-03*