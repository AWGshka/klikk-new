# Klikk Phase 0 Design Specification

## Direction

Adopt the supplied **Modernist retail** direction from `.design`: an almost-monochrome canvas, warm white product surfaces, one Klikk red-orange accent, square corners, visible rules, and modular grids. The store should prioritise product clarity and local service reassurance over the density of the legacy site.

Use `Archivo, Arial, Helvetica, sans-serif` as the display and body stack. Archivo is optional until it is bundled locally; the system fallback keeps the current build network-independent.

## Tokens

| Token | Value / rule |
| --- | --- |
| Canvas | `#f3f2f2` |
| Paper | `#ffffff` |
| Ink | `#201e1d` |
| Accent | `#ec3013`; dark hover `#ae1800` |
| Supporting accent | `#ffe0d9` |
| Rules | 1px internal / 2px major boundaries |
| Radius | None |
| Shadows | None; hierarchy comes from scale, rules and contrast |
| Spacing | 8px base, with 16px, 24px, 32px, 48px, 64px and 96px steps |
| Focus | 3px red-orange outline with 3px offset |
| Motion | No essential animation; respect reduced-motion preferences |

## Navigation and catalogue rules

Primary navigation has eight top-level categories, all backed by normalised catalogue records:

1. Laptops
2. Desktop PCs
3. Phones
4. Tablets & Wearables
5. Gaming
6. TV & Audio
7. Home & Smart
8. Computing & Accessories

The header contains the wordmark, search entry point, service link and basket count. Desktop uses an eight-cell navigation row. Mobile uses a semantic collapsed category list; search remains visible above it.

Product cards and details use: brand eyebrow, unmodified captured product name, optional derived short specification, and `en-MT` EUR formatting. No stock, sale percentage, financing, warranty duration or promotion claim is shown unless a future mock record explicitly carries it.

The local catalogue is reference/sample content. It must be described as non-live where it can influence a decision, and must never expose source CDN links in the UI.

## Home content shortlist

Phase 2 should select content from the existing local files only:

- **Categories:** the eight primary groups above.
- **Campaigns:** one current wide campaign from `public/assets/banners/wide/`, plus no more than two supporting tiles from `public/assets/banners/other/`.
- **Brands:** Apple, Samsung, Xiaomi, Gigabyte, Lenovo, Razer, Philips and Dyson from the local brand tiles.
- **Product rails:** featured, newest captured entries and price-led picks. These are labels for local reference records, not availability or active retail promotions.

## Page wireframes

### Home

1. Utility bar with local-demo context.
2. Header/search/category navigation.
3. Two-panel hero: service promise plus local campaign/product artwork.
4. Reassurance strip.
5. Category grid, selected campaign, product rails and brand grid.
6. Service/store close and footer disclosure.

### Listing and search

Desktop: page title/count and filters beside a product grid. Mobile: filter/sort controls precede a one- or two-column grid. Search, category, brand and sort are URL state. Empty states include a return-to-all-products action.

### Product detail

Desktop: gallery beside a purchase panel; mobile: gallery, information and add action stack. The panel shows brand, name, local reference price, neutral availability language, key specification table and service reassurance. Related local products follow.

### Basket and checkout

Basket has editable line items and a persistent summary. Checkout has contact and delivery/collection sections followed by review. First-release mock methods are **collect from store (€0)** and **island delivery (€5)**, with free mock delivery over **€50**. Immediately before the final action show: **“Demo store — no payment is taken and no order is sent to Klikk.”** The only final CTA is **“Place demo order”**.

## Responsive behaviour

Use a centred maximum-width container. Desktop starts at 901px, tablet/mobile collapse the primary navigation into the category disclosure, and content grids reduce before any horizontal page overflow. Rules and spacing remain visible on small screens; touch targets are at least 44px tall.
