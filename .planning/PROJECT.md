# Tour Planner PWA

## What This Is

A Progressive Web App for planning and managing a Delhi-Agra-Jaipur tour. Provides train tracking, ticket/Aadhar PDF viewing, packing list management, and destination information. Built as a single-page application with offline support.

## Core Value

Travelers can access their complete tour itinerary, tickets, and essential information offline from their mobile device throughout the journey.

## Requirements

### Validated

- ✓ Image carousel with Delhi, Agra, Jaipur destination photos — v1.0
- ✓ Train tracking simulation with station markers and progress bar — v1.0
- ✓ PDF ticket viewer with password protection — v1.0
- ✓ Aadhar card document viewer — v1.0
- ✓ Entertainment section with external game links — v1.0
- ✓ Packing list management with checkboxes — v1.0
- ✓ PWA with offline caching via service worker — v1.0

### Active

- [ ] [User-defined enhancement to add]

### Out of Scope

- [Backend server] — Static-only deployment, no server-side features
- [User accounts/authentication] — Single-user local app
- [Real-time train APIs] — Uses simulated tracking data

## Context

**Existing codebase:** Brownfield project with existing HTML/CSS/JS implementation.
- Single `index.html` (~4300 lines) with all views embedded
- `script.js` contains application logic
- `style.css` with custom CSS + Bootstrap 5
- `js/modules/` for modular JS components
- `lib/pdf.js/` for PDF rendering
- `sw.js` service worker for PWA

**Technical environment:**
- Browser-based SPA (no backend)
- Bootstrap 5.3.8 UI framework
- PDF.js 2.16.105 for document viewing
- Service Worker for offline support
- ES6+ JavaScript

**Known issues from codebase analysis:**
- Base64-encoded PDF passwords (security through obscurity)
- Large inline HTML (~8000+ lines combined)
- Mixed inline `onclick` and `data-action` patterns

## Constraints

- **Tech Stack**: Bootstrap 5, vanilla JavaScript, PDF.js — no framework migration planned
- **Offline First**: Must work without internet via service worker
- **Mobile-First**: Responsive design for mobile use during travel

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static-only deployment | Simplest hosting, no backend needed | ✓ Good |
| Client-side PDF passwords | Quick implementation for family use | ⚠️ Revisit - security weakness |
| Single HTML file | All content available offline | ⚠️ Revisit - maintainability |

---

*Last updated: 2026-05-03 after initialization*