<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project operating protocol

## Mandatory handoff record

`.docs/HANDOFF.md` is the project’s cross-session source of truth.

Before making any meaningful change, every agent must:

1. Read `.docs/HANDOFF.md` in full.
2. Confirm the active phase, constraints, current status, outstanding work, and known validation state.
3. Preserve user changes and work only within the documented scope.

After making any meaningful change, update `.docs/HANDOFF.md` in the same turn before responding. This applies to code, content, configuration, data, documentation, assets, tests, and design changes.

A meaningful change affects project behavior, visuals, data, architecture, documentation, assets, validation, or the next agent’s understanding of the project. A read-only investigation with no findings does not require an update.

## Handoff update rules

- Update **Current snapshot** to reflect the state after the change.
- Add a newest-first **Change log** entry with date, phase, summary, files changed, validation, and next step/blocker.
- State facts only; do not claim validation was performed unless it actually was.
- Record failed validation and limitations so later agents do not repeat or misinterpret them.
- Keep entries concise; consolidate older entries when the log becomes difficult to scan.
- Do not store secrets, credentials, personal data, payment details, or raw user input in the handoff.

## Commerce safety boundary

This redesign is a presentation/demo storefront. Do not connect it to Klikk production inventory, pricing, customer accounts, order systems, payment providers, fulfilment services, or transactional email unless the user explicitly changes that requirement.
