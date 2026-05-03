# Requirements

**Last updated:** 2026-05-03

---

## v1 Requirements

### Navigation & UI

- [ ] **UI-01**: Image carousel displays destination photos (Delhi, Agra, Jaipur)
- [ ] **UI-02**: Responsive layout works on mobile devices
- [ ] **UI-03**: Navigation between views is smooth with CSS transitions

### Train Tracking

- [ ] **TRACK-01**: Train progress bar shows current position
- [ ] **TRACK-02**: Station markers display on route map
- [ ] **TRACK-03**: Progress updates every 60 seconds

### Document Viewing

- [ ] **DOC-01**: PDF tickets viewable with password protection
- [ ] **DOC-02**: Aadhar card documents viewable
- [ ] **DOC-03**: PDF rendering works offline

### Entertainment & Utilities

- [ ] **ENT-01**: External game links accessible
- [ ] **ENT-02**: Retro grid animations play smoothly
- [ ] **PACK-01**: Packing list items can be checked/unchecked

### PWA Features

- [ ] **PWA-01**: App works offline via service worker
- [ ] **PWA-02**: Installable on mobile devices

---

## v2 Requirements (Deferred)

*Features identified but not in initial scope*

- [ ] **SEC-01**: Secure password storage for PDFs (currently base64)
- [ ] **PERF-01**: Lazy-load day views to reduce initial load size

---

## Out of Scope

*Explicitly excluded with reasoning*

| Exclusion | Reason |
|-----------|--------|
| Backend server | Static deployment meets current needs |
| User authentication | Single-user family app, no accounts needed |
| Real-time train APIs | Simulation adequate for current use case |
| Multi-day tours | Single tour focus |

---

## Traceability

| REQ ID | Phase | Plan | Status |
|--------|-------|------|--------|
| UI-01 | 1 | maintain | Validated |
| UI-02 | 1 | maintain | Validated |
| UI-03 | 1 | maintain | Validated |
| TRACK-01 | 1 | maintain | Validated |
| TRACK-02 | 1 | maintain | Validated |
| TRACK-03 | 1 | maintain | Validated |
| DOC-01 | 1 | maintain | Validated |
| DOC-02 | 1 | maintain | Validated |
| DOC-03 | 1 | maintain | Validated |
| ENT-01 | 1 | maintain | Validated |
| ENT-02 | 1 | maintain | Validated |
| PACK-01 | 1 | maintain | Validated |
| PWA-01 | 1 | maintain | Validated |
| PWA-02 | 1 | maintain | Validated |

---

*Requirements validated from existing codebase (brownfield). User can add new requirements via `/gsd-add-requirements`.*