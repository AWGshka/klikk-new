# Klikk design preview

Open [`dc.html`](./dc.html) directly in a browser. It is the preserved Klikk redesign preview, including all six original screens:

1. Homepage
2. Category — Laptops
3. Product detail
4. Basket & checkout
5. Stores & about
6. Mobile

## Design direction

- Modernist retail interface for Klikk Computers, Malta
- Archivo typeface with a near-monochrome ground and a single red accent
- Square corners, strong 2px rules, visible modular grids, and flush-left labels
- Product availability, price, warranty, and store location are prominent throughout

## Files

- `dc.html` — the only preview entry point and complete design source
- `styles.css` — local tokens plus the small compatibility layer required to render the original canvas markup in a regular browser

The preview is self-contained: it needs no Next.js app, local server, or design-canvas runtime. Existing product-image URLs are retained; slots without a source render a labelled local placeholder.

When changing the design, edit `dc.html` first and keep it directly browser-openable. Do not add generated design-canvas runtime files back into this folder.
