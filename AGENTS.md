# GSD Project Guidelines

**Project:** Tour Planner PWA
**Type:** Brownfield web application

---

## Context

This is an existing Tour Planner PWA for Delhi-Agra-Jaipur trip. The codebase is already mapped in `.planning/codebase/`.

### Existing Architecture

- **Stack:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, PDF.js
- **Pattern:** Single-page application with view switching via CSS display
- **PWA:** Service worker for offline support

### Validated Features (from existing code)

All features in Phase 1 are already validated (built and working). New work should focus on:
- Maintenance
- Technical debt reduction
- User-requested enhancements

---

## Workflow

Use these commands to advance through the project:

- `/gsd-progress` — View current progress
- `/gsd-discuss-phase 1` — Discuss next steps for Phase 1
- `/gsd-plan-phase 1` — Create execution plan for Phase 1
- `/gsd-execute-phase 1` — Execute Phase 1 plans
- `/gsd-add-requirements` — Add new requirements

---

## Constraints

- **No backend:** Static-only deployment
- **Mobile-first:** Must work on mobile devices during travel
- **Offline-first:** All features must work without internet

---

## Forbidden Patterns

- Do NOT add server-side code (Node, Python, etc.)
- Do NOT add user authentication systems
- Do NOT introduce new frameworks (React, Vue, etc.)

---

## File Locations

| File | Purpose |
|------|---------|
| `.planning/PROJECT.md` | Project context |
| `.planning/REQUIREMENTS.md` | Requirements list |
| `.planning/ROADMAP.md` | Phase definitions |
| `.planning/STATE.md` | Current state |
| `.planning/config.json` | Workflow settings |
| `.planning/codebase/` | Existing architecture docs |

---

*Generated: 2026-05-03*