# Klikk Redesign Handoff

> **Required reading:** Every agent must read this entire file before making a meaningful change. After a meaningful change, update the Current snapshot and add a newest-first Change log entry before replying to the user. The binding protocol is in `.docs/AGENTS.md`.

## Current snapshot

- **Last updated:** 2026-08-06
- **Active phase:** Phase 0 — Product definition and visual direction
- **Project goal:** Redesign Klikk as a realistic, responsive Next.js storefront demo.
- **Commerce boundary:** Presentation/demo only. No live Klikk inventory, prices, customer accounts, order systems, payments, fulfilment, or transactional email.
- **Runtime:** Next.js `16.3.0`, React `19.2.8`, TypeScript, Tailwind CSS 4, Biome, Bun `1.3.14`.
- **Data source:** Captured public Klikk homepage content, normalised and cached locally under `.data`. Treat all data as reference/sample content, not live commerce data.
- **Application implementation:** No storefront UI has been implemented yet; the repository remains at the starter-app stage.
- **Documentation location:** All project Markdown files are kept under `.docs`; `.docs/AGENTS.md` contains the agent operating protocol.

### Available local retail data

| Asset                      | Location                          | Count | Notes                                                                              |
| -------------------------- | --------------------------------- | ----: | ---------------------------------------------------------------------------------- |
| Showcase product seed data | `.data/products.json`             |    24 | Curated entries for focused sections.                                              |
| Complete product manifest  | `.data/catalogue.json`            |   116 | Includes local paths, original source references, product/category/asset metadata. |
| Product imagery            | `.data/products/`                 |   116 | Public source images cached locally.                                               |
| Category imagery           | `.data/categories/`               |   219 | Public source images cached locally.                                               |
| Wide desktop banners       | `.data/banners/wide/`             |    11 | Verified `1776 × 332` campaign images.                                             |
| Other homepage visuals     | `.data/banners/other/`            |    32 | Category tiles, mobile campaigns, and feature artwork.                             |
| Brand logos                | `.data/brand-assets/logos/`       |    23 | See `.data/brands.json`.                                                           |
| Brand heading artwork      | `.data/brand-assets/section-art/` |     1 | Original source artwork.                                                           |
| Sale/energy overlays       | `.data/overlays/`                 |     4 | Original source badges.                                                            |

### Design and implementation direction

- The agreed implementation plan is `.docs/REDESIGN-ROADMAP.md`.
- The first implementation phase is **Phase 0**, followed by data adapter/foundation, discovery, product/basket, demo checkout, and quality validation.
- The basket must be client-side/local only. A demo checkout may generate a synthetic reference but must never send an order or collect payment details.
- Use local cached images in the UI; do not expose or depend on the original CDN URLs at runtime.
- Before changing application code, read the applicable local Next.js 16 guidance under `node_modules/next/dist/docs/`.

### Outstanding work

1. Review `.design` assets/material and decide the concrete visual direction for Phase 0.
2. Define a concise primary-navigation category set and homepage content selection from the captured assets.
3. Implement Phase 1 only after the Phase 0 design decisions are recorded here.
4. Decide the final local-asset serving/import strategy compatible with Next.js 16 before implementing image components.

### Known limitations and validation state

- Product/asset data is a captured snapshot, not a live feed. Prices, promotions, and availability can be stale or inaccurate.
- No dedicated brand-media route was found on the public Klikk site; the 23 original brand tiles were identified in the homepage’s `upload/files` asset collection.
- There is no current user-interface, test suite, or production build validation for storefront behavior because no application implementation has started.
- Asset validation completed: all 407 unique manifest-referenced cached files existed locally and were non-empty at the time of validation.

## Change log

### 2026-08-06 — Documentation consolidated under `.docs`

- **Phase:** Project governance
- **Summary:** Moved the project agent protocol from the repository root into `.docs` to keep all Markdown documentation in one location.
- **Files changed:** `AGENTS.md` removed; `.docs/AGENTS.md`, `.docs/HANDOFF.md` updated
- **Validation:** Documentation structure was reviewed after the move. No application build or test was run because this was documentation-only work.
- **Next step / blocker:** Read `.docs/HANDOFF.md` and `.docs/AGENTS.md` before all future meaningful changes.

### 2026-08-06 — Handoff protocol established

- **Phase:** Project governance
- **Summary:** Added the mandatory cross-session handoff protocol and initial project state record.
- **Files changed:** `AGENTS.md`, `.docs/HANDOFF.md`
- **Validation:** Files were created successfully. No application build or test was run because this was documentation-only work.
- **Next step / blocker:** Begin Phase 0 design review; all future meaningful changes must update this handoff.

### 2026-08-06 — Storefront roadmap documented

- **Phase:** Planning
- **Summary:** Added the phased plan for a local-data-backed Klikk demo storefront, including mock basket and checkout safety boundaries.
- **Files changed:** `.docs/REDESIGN-ROADMAP.md`
- **Validation:** Documentation was created successfully. No application build or test was run.
- **Next step / blocker:** Use the roadmap to make and record Phase 0 design decisions.

### 2026-08-06 — Public Klikk reference data and images cached

- **Phase:** Data preparation
- **Summary:** Captured/normalised public homepage product data and cached local product, category, campaign, brand, and overlay images. Split wide desktop banners from other homepage imagery and brand logos.
- **Files changed:** `.data/products.json`, `.data/catalogue.json`, `.data/brands.json`, `.data/products/`, `.data/categories/`, `.data/banners/`, `.data/brand-assets/`, `.data/overlays/`
- **Validation:** Verified 407 unique manifest-referenced cached files existed and were non-empty. Verified 11 wide banners at `1776 × 332`.
- **Next step / blocker:** Consume data through a typed application-layer adapter; do not treat it as live commerce data.
