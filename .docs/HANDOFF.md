# Klikk Redesign Handoff

> **Required reading:** Every agent must read this entire file before making a meaningful change. After a meaningful change, update the Current snapshot and add a newest-first Change log entry before replying to the user. The binding protocol is in `.docs/AGENTS.md`.

## Current snapshot

- **Last updated:** 2026-08-06
- **Active phase:** Phase 2 — Browse and discovery (ready to begin)
- **Project goal:** Redesign Klikk as a realistic, responsive Next.js storefront demo.
- **Commerce boundary:** Presentation/demo only. No live Klikk inventory, prices, customer accounts, order systems, payments, fulfilment, or transactional email.
- **Runtime:** Next.js `16.3.0`, React `19.2.8`, TypeScript, Tailwind CSS 4, Biome, Bun `1.3.14`.
- **Data source:** Captured public Klikk homepage content, normalised and cached locally under `.data` with concise local asset names. Treat all data as reference/sample content, not live commerce data.
- **Application implementation:** Phase 1 foundation is implemented: typed local catalogue adapter, local public asset copies, shared EUR formatters, responsive shell, and minimal product/category resolution routes.
- **Documentation location:** All project Markdown files are kept under `.docs`; `.docs/AGENTS.md` contains the agent operating protocol.

### Available local retail data

| Asset                      | Location                          | Count | Notes                                                                              |
| -------------------------- | --------------------------------- | ----: | ---------------------------------------------------------------------------------- |
| Showcase product seed data | `.data/products.json`             |    24 | Curated entries for focused sections.                                              |
| Complete product manifest  | `.data/catalogue.json`            |   116 | Includes local paths, original source references, product/category/asset metadata. |
| Product imagery            | `.data/products/`                 |   140 | `product-<id>` catalogue images plus `showcase-<id>` curated images.               |
| Category imagery           | `.data/categories/`               |   219 | `category-<nnn>` sequence.                                                         |
| Wide desktop banners       | `.data/banners/wide/`             |    11 | `banner-wide-<nnn>` sequence; verified `1776 × 332` campaign images.               |
| Other homepage visuals     | `.data/banners/other/`            |    32 | `banner-<nnn>` sequence.                                                           |
| Brand logos                | `.data/brand-assets/logos/`       |    23 | `brand-<nnn>` sequence; see `.data/brands.json`.                                   |
| Brand heading artwork      | `.data/brand-assets/section-art/` |    44 | `brand-heading-<nnn>` sequence; one selected record is manifest-referenced.        |
| Sale/energy overlays       | `.data/overlays/`                 |     4 | `overlay-<nnn>` sequence.                                                          |

### Design and implementation direction

- The agreed implementation plan is `.docs/REDESIGN-ROADMAP.md`; Phase 0 decisions are recorded in `.docs/PHASE-0-DESIGN-SPEC.md`.
- The basket must be client-side/local only. A demo checkout may generate a synthetic reference but must never send an order or collect payment details.
- All UI image paths are mapped from the private `.data` source paths to copied local static assets under `public/assets/`; manifests contain concise local paths only and no original CDN `sourceImage` fields.
- The installed Next.js package does not contain the referenced `dist/docs/` directory. `node_modules/next/AGENTS.md` was reviewed; use the generated route types and current package declarations where applicable.

### Outstanding work

1. Begin Phase 2: build local-asset-backed homepage campaign, product-card and discovery sections.
2. Implement `/shop`, `/search`, and `/brands` with shareable URL search/filter/sort state.
3. Revisit brand/category inference if richer captured metadata becomes available; the full catalogue records do not include these fields.
4. Add a bundled local Archivo font only if licensing/source files are supplied; do not introduce an external runtime font request.

### Known limitations and validation state

- Product/asset data is a captured snapshot, not a live feed. Prices, promotions, and availability can be stale or inaccurate.
- No dedicated brand-media route was found on the public Klikk site; the 23 original brand tiles were identified in the homepage’s `upload/files` asset collection.
- No automated test suite exists yet. Validation for the Phase 1 foundation is recorded in the newest change-log entry.
- Asset validation completed: all 431 unique manifest-referenced cached files resolve in both `.data` and `public/assets`. The cached set contains 474 local image files, including intentionally retained unreferenced artwork.

## Change log

### 2026-08-06 — Local asset names and manifests simplified

- **Phase:** Phase 1 — Data adapter and foundation
- **Summary:** Renamed cached and public image copies to concise deterministic names, such as `product-<id>`, `showcase-<id>`, `category-<nnn>`, and `banner-<nnn>`. Updated every JSON manifest image path and removed original CDN `sourceImage` fields, including category, campaign, brand, and selected artwork records.
- **Files changed:** `.data/catalogue.json`, `.data/products.json`, `.data/brands.json`, `.data/products/`, `.data/categories/`, `.data/banners/`, `.data/brand-assets/`, `.data/overlays/`, `public/assets/`, `.docs/HANDOFF.md`
- **Validation:** Recursive verification found 455 manifest image references (431 unique), all resolving in both private and public local paths; no `sourceImage` fields remain in JSON manifests. `bun run lint` and `bun run build` passed.
- **Next step / blocker:** Continue Phase 2 browse and discovery using concise public asset paths. Do not reintroduce source CDN URL fields.

### 2026-08-06 — Phases 0 and 1 completed

- **Phase:** Phase 0 — Product definition and visual direction; Phase 1 — Data adapter and foundation
- **Summary:** Recorded the modernist design direction, page wireframes, content rules, primary navigation, local-demo language, and mock delivery rules. Added a typed catalogue repository with normalisation, filtering, sorting and related-product helpers; copied local image assets into `public/assets`; and replaced the starter UI with an accessible responsive shell and product/category slug-resolution routes.
- **Files changed:** `.docs/PHASE-0-DESIGN-SPEC.md`, `.docs/HANDOFF.md`, `biome.json`, `public/assets/`, `src/lib/catalog/`, `src/components/layout/`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/app/product/[slug]/page.tsx`, `src/app/shop/[category]/page.tsx`
- **Validation:** `bun run lint` passed (11 application/config files checked). `bun run build` passed; `/` is static and product/category dynamic routes compiled. Biome scope intentionally excludes preserved `.design` and captured `.data` reference archives, which contain legacy lint/format issues unrelated to the app source.
- **Next step / blocker:** Begin Phase 2 browse and discovery work. The full captured catalogue has no native brand/category metadata, so current labels are intentionally inferred by the repository.

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
