# Klikk Store Redesign Roadmap

## Purpose

Turn this project into a credible, high-quality Klikk retail storefront experience without connecting to Klikk's production systems.

The redesign should feel like a real store: customers can browse products, search and filter, inspect product pages, add items to a basket, select delivery, and complete a simulated checkout. It must **not** claim to place real orders, reserve stock, charge cards, or represent live inventory or pricing.

## Source-data boundary

All currently available retail seed data and assets are local, under `.data`:

| Asset | Location | Current quantity |
| --- | --- | ---: |
| Curated showcase products | `.data/products.json` | 24 |
| Complete captured catalogue | `.data/catalogue.json` | 116 |
| Product images | `.data/products/` | 116 |
| Category images | `.data/categories/` | 219 |
| Desktop campaign banners | `.data/banners/wide/` | 11 |
| Other homepage visuals | `.data/banners/other/` | 32 |
| Brand logo tiles | `.data/brand-assets/logos/` | 23 |
| Brand metadata | `.data/brands.json` | 23 |

### Non-production commerce rules

1. Treat all prices, names, promotions, and availability as sample/reference data captured from the public site.
2. Do not expose `sourceImage` URLs in the UI. Use the local files.
3. Do not create a payment-provider integration, payment form that captures card details, or order-submission API.
4. Make the checkout call-to-action explicit: **“Place demo order”** or **“Complete demo checkout”**.
5. Display a short, persistent disclosure before the final checkout action: *“Demo store — no payment is taken and no order is sent to Klikk.”*
6. Never display a product as “in stock” unless the mock data explicitly says so. Prefer neutral labels such as “Available to order” or omit stock labels in the first release.

## Experience goals

- Make discovery fast on mobile and desktop.
- Use Klikk’s category, campaign, and brand assets selectively rather than recreating the legacy visual density.
- Prioritise product imagery, transparent pricing, confidence signals, and useful comparison information.
- Use a clear teal-based Klikk-inspired visual language without duplicating the current site’s interface.
- Keep page loading and interaction responsive with local image assets and client-side basket persistence.

## Target information architecture

```text
/                         Home
/shop                     Product listing, search, filter, sort
/shop/[category]          Category-filtered listing
/product/[slug]           Product detail
/brands                   Brand index and filtered product discovery
/search?q=                Search results
/basket                   Basket and order summary
/checkout                 Delivery/contact form and demo confirmation
/order-confirmation       Simulated order receipt
/about                    Store/service reassurance page
```

Routes can be refined during implementation, but deep links to category, product, basket, and checkout are required.

## Proposed architecture

### Server-rendered content

Use server components for static catalogue data, routes, metadata, and initial product grids. Keep data access behind a small repository module so moving from local JSON to an API later does not require component rewrites.

```text
src/
  app/                    Route layouts and pages
  components/
    layout/               Header, footer, navigation
    home/                 Hero, campaign, category, brand sections
    catalog/              Product card, grid, filters, search, sort
    product/              Gallery, details, related items
    basket/               Drawer, line item, totals, checkout form
    ui/                   Reusable accessible primitives
  lib/
    catalog/              JSON adapters, query/filter helpers, types
    commerce/             Mock basket and checkout contracts
  providers/              Client-side basket provider
```

### Client-side state

Keep client state deliberately small:

- **Basket:** product ID, quantity, and selected variant/options when introduced.
- **UI state:** basket-drawer visibility and optional lightweight toast notifications.
- **Checkout draft:** customer/contact/delivery form values until confirmation.

Persist the basket to `localStorage` after hydration. It should be restored on a returning visit, but the UI must still render safely before client hydration.

### Mock commerce layer

Do not call remote endpoints. Define a local boundary such as:

```ts
type BasketLine = {
  productId: string;
  quantity: number;
};

type DemoOrder = {
  reference: string;
  createdAt: string;
  lines: BasketLine[];
  deliveryMethod: "collect" | "delivery";
  totals: { subtotal: number; delivery: number; total: number };
};
```

The mock order function should validate form fields, calculate deterministic totals, generate a clearly synthetic reference (for example `DEMO-KLIKK-...`), and return an in-memory result used only for the confirmation screen. No customer data should be stored or transmitted.

## Delivery phases

## Phase 0 — Product definition and visual direction

**Goal:** establish scope and a coherent redesign before building screens.

### Work

- Review `.design` material and identify reusable visual direction, if present.
- Choose primary navigation categories from `catalogue.json` rather than copying all 219 categories into the header.
- Define a desktop and mobile layout for home, listing, detail, basket, and checkout.
- Create content rules for product naming, specs, price formatting, sale treatment, and demo-store language.
- Decide the first-release delivery methods and fixed mock delivery fees.

### Deliverables

- Short page-by-page wireframe or annotated design spec.
- Token direction: colour, typography scale, spacing, radii, shadows, and interaction states.
- Final shortlist of homepage categories, campaigns, and brands.

### Acceptance criteria

- Navigation has a manageable number of top-level choices.
- Every user path from discovery through checkout is represented.
- The mock-store disclosure is included in the checkout design.

---

## Phase 1 — Data adapter and foundation

**Goal:** make local data safe and easy to use throughout the app.

### Work

- Add catalogue TypeScript types and a data adapter for `.data/catalogue.json` and `.data/brands.json`.
- Normalise product slugs, brands, prices, images, and category labels into UI-facing records.
- Build query helpers for search, category filtering, brand filtering, sorting, and related-products selection.
- Add image-path handling appropriate for the application’s final local asset strategy.
- Build the root layout, global style foundation, responsive container, and shared header/footer shell.

### Deliverables

- One catalog access API used by all pages, not direct JSON parsing scattered through components.
- Responsive header with search entry point, basket count, and mobile navigation.
- Shared formatters for EUR prices and product labels.

### Acceptance criteria

- A product page can resolve a product by slug.
- Unknown product/category routes produce a proper not-found state.
- No UI relies on the source CDN at runtime.
- Static pages render with JavaScript disabled except for basket-related interactions.

---

## Phase 2 — Browse and discovery

**Goal:** build compelling storefront discovery.

### Work

- Build the home page with:
  - selected wide campaign banner,
  - category discovery tiles,
  - product rails (new, featured, deals),
  - brand logo rail from `brands.json`,
  - service/reassurance blocks.
- Implement `/shop` with search, category/brand filters, sort, clear filters, count, and empty state.
- Use URL search parameters for search/filter/sort state so results are shareable and back/forward navigation works.
- Add `/brands` and brand-filtered browsing.
- Build responsive product cards with image, brand, title, price, short specification, and add-to-basket action.

### Acceptance criteria

- Search finds terms from product name, brand, category, and specification.
- Filters compose predictably and can be cleared in one action.
- Product cards work with keyboard navigation and screen readers.
- Mobile browse does not require horizontal page scrolling.

---

## Phase 3 — Product detail and basket

**Goal:** make evaluation and basket management feel complete.

### Work

- Build `/product/[slug]` with product gallery, key specifications, price, reassurance content, and related products.
- Build an accessible basket drawer for quick review, plus the full `/basket` page.
- Support add, increment, decrement, remove, clear, and quantity validation.
- Show subtotal, mock delivery estimate, and total.
- Prevent duplicate basket logic by keeping all mutations in one basket provider/service.
- Add user feedback for basket actions using accessible live-region notifications.

### Acceptance criteria

- Basket count and totals update immediately after an action.
- Basket persists after a full browser refresh.
- Quantity cannot be less than one or exceed a reasonable mock limit.
- Empty basket has an explanatory state and a return-to-shopping action.
- Basket controls are keyboard operable and announce changes appropriately.

---

## Phase 4 — Demo checkout

**Goal:** complete the end-to-end commerce story safely.

### Work

- Build `/checkout` with contact details and delivery/collection choice.
- Use client-side validation with concise field-level errors.
- Show a full order review before final confirmation.
- Use a clear demo-only final action, such as **Complete demo checkout**.
- Generate a synthetic order confirmation screen with order reference, date, lines, totals, and next steps.
- Clear the persisted basket only after successful mock order generation.

### Acceptance criteria

- Checkout refuses an empty basket.
- No card fields, payment SDKs, payment network requests, or real order requests exist.
- The demo disclosure is visible immediately before confirmation and on the order confirmation screen.
- Browser refresh on confirmation does not expose another user’s data; persistence is local to the visitor only.

---

## Phase 5 — Quality, performance, and launch readiness

**Goal:** turn the prototype into a dependable presentation build.

### Work

- Audit semantic landmarks, headings, focus order, contrast, visible focus, form labels, and reduced-motion behavior.
- Add loading, error, empty, and not-found states across key routes.
- Optimise rendering and image sizing for responsive viewports.
- Add metadata, titles, descriptions, Open Graph fallback imagery, and canonical strategy appropriate for a demo site.
- Add automated coverage for catalogue helpers, basket reducer/service, checkout validation, and critical user flows.
- Run production build, Biome checks, and manual mobile/desktop browser review.

### Acceptance criteria

- `bun run build` succeeds.
- `bun run lint` succeeds.
- Core journeys are tested: browse → product → add to basket → update basket → demo checkout.
- All product prices use consistent EUR formatting.
- The app makes no request to a payment, inventory, or production Klikk API.

## Suggested implementation order

1. Data types and catalogue repository.
2. Design tokens and app shell.
3. Homepage and product-card primitives.
4. Listing, search, filtering, and sort URL state.
5. Product detail.
6. Basket persistence and basket UI.
7. Demo checkout and confirmation.
8. Accessibility, tests, performance pass.

This sequencing delivers a visible storefront early while delaying client state and form complexity until the product catalogue experience is stable.

## Deferred until a real backend exists

Do not design the initial implementation around these features:

- Account registration, login, password reset, order history, or saved addresses.
- Live store availability, delivery quoting, stock reservation, or backorders.
- Coupon validation, gift cards, finance, tax calculation, invoices, or refund workflows.
- Payment collection, tokenisation, webhooks, fraud handling, or PCI obligations.
- Real fulfilment, courier integrations, transactional email, or customer support tickets.

When backend access becomes available, replace the local catalogue repository and mock checkout adapter behind their interfaces. The presentation components and basket UI should need minimal change.

## Definition of done

The redesign is ready to present when a visitor can:

1. Land on a responsive and branded homepage.
2. Discover categories, campaigns, brands, and products.
3. Search, filter, and sort the captured catalogue.
4. Open a product page and understand its key information.
5. Add, edit, and persist items in a basket.
6. Complete a clearly labelled demo checkout.
7. Receive a synthetic order confirmation with no external commerce side effects.
