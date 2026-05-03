# Technology Stack

**Analysis Date:** 2026-05-03

## Languages

**Primary:**
- **HTML5** - Primary markup language for `index.html`
- **CSS3** - Styling in `style.css` with modern features (CSS variables, glassmorphism, animations)
- **JavaScript (ES6+)** - Main application logic in `script.js` and `js/` modules

**Secondary:**
- **JSON** - Used in `manifest.json` for PWA configuration

## Runtime

**Environment:**
- Browser-based (client-side only, no server runtime)

**Package Manager:**
- Not applicable (static project with CDN dependencies)

## Frameworks

**Core:**
- **Bootstrap 5.3.8** - CSS framework for UI components
  - Location: CDN (jsdelivr)
  - Used for: Navbar, carousels, cards, modals, grid system

**PWA:**
- **Service Worker** (`sw.js`) - Offline caching and PWA support

**PDF Rendering:**
- **PDF.js 2.16.105** - In-browser PDF rendering
  - Location: `lib/pdf.js/pdf.min.js`
  - Worker: `lib/pdf.js/pdf.worker.min.js`

## CSS Libraries

- **Bootstrap Icons 1.11.1** - Icon set via CDN
- **Animate.css 4.1.1** - CSS animations via CDN
- **Google Fonts (Outfit)** - Custom typography

## Build/Dev Tools

- **No build step required** - Static HTML/CSS/JS deployment
- **VS Code** - `.vscode/settings.json` for editor configuration

## Key Dependencies

**Critical:**
- `pdf.js 2.16.105` - PDF rendering (`lib/pdf.js/pdf.min.js`)
- `bootstrap 5.3.8` - UI framework (CDN)
- `bootstrap-icons 1.11.1` - Icons (CDN)

**Infrastructure:**
- Google Fonts (Outfit) - Typography
- Animate.css - UI animations

## Configuration

**Environment:**
- No .env files (static hosting)
- PWA manifest: `manifest.json`

**Build:**
- No build configuration files (npm, webpack, etc.)
- Service worker config: `sw.js`

## Platform Requirements

**Development:**
- Modern browser with ES6+ support
- Service Worker support (for PWA features)

**Production:**
- Static file hosting (any web server)
- HTTPS required (for Service Worker)

---

*Stack analysis: 2026-05-03*