import type { Product } from "@/lib/catalog/types";

/**
 * v2 leads on "where it physically is". The captured catalogue carries no stock
 * field, so per-store presence is DERIVED DETERMINISTICALLY from the product id
 * — the same way brand and category are inferred elsewhere in this repository.
 *
 * This is presentation/demo data. It is stable across renders (so server and
 * client agree) but it is not, and must never be presented internally as, real
 * Klikk inventory.
 */

export type Store = {
  slug: string;
  name: string;
  kicker: string;
  address: string;
  hours: string;
  phone: string;
  onSite: string;
  /** Captured local artwork, shown desaturated as the storefront panel. */
  image: string;
};

export const STORES: Store[] = [
  {
    slug: "birkirkara",
    name: "Birkirkara",
    kicker: "Main store & service centre",
    address: "Triq Dun Karm (Birkirkara Bypass), BKR 4019",
    hours: "Monday to Saturday, 09:00–19:00",
    phone: "+356 2750 2750 · WhatsApp 7979 2750",
    onSite: "Service centre, Rock PC assembly, business desk",
    image: "/assets/banners/wide/banner-wide-001.jpg",
  },
  {
    slug: "zejtun",
    name: "Żejtun",
    kicker: "South",
    address: "Tal-Barrani Road, Żejtun",
    hours: "Monday to Saturday, 09:00–19:00",
    phone: "+356 2750 2750",
    onSite: "Sales, collections, warranty drop-off",
    image: "/assets/banners/wide/banner-wide-002.jpg",
  },
];

export const PHONE = "+356 2750 2750";
export const WHATSAPP = "7979 2750";
export const EMAIL = "info@klikk.com.mt";

export type StoreStock = { store: Store; units: number };

const MAX_UNITS = 5;

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Per-store unit counts for a product. Deterministic, derived from the id. */
export function getStock(product: Pick<Product, "id">): StoreStock[] {
  const seed = hash(product.id);
  return STORES.map((store, index) => ({
    store,
    units: (seed >> (index * 4)) % (MAX_UNITS + 1),
  }));
}

/** `■■■□□` presence meter for a unit count. */
export function stockMeter(units: number) {
  return "■".repeat(units) + "□".repeat(Math.max(0, MAX_UNITS - units));
}

export function totalUnits(stock: StoreStock[]) {
  return stock.reduce((sum, entry) => sum + entry.units, 0);
}

/** Short "where it is" line used on cards, rows and the hero. */
export function stockSummary(stock: StoreStock[]) {
  const held = stock.filter((entry) => entry.units > 0);
  if (held.length === 0) return "Order-in, 48h";
  return held
    .map((entry) => `${entry.units} in ${entry.store.name}`)
    .join(" · ");
}

/** Longer variant that names the order-in store, as the hero panel does. */
export function stockDetail(stock: StoreStock[]) {
  const held = stock.filter((entry) => entry.units > 0);
  const ordered = stock.filter((entry) => entry.units === 0);
  if (held.length === 0) return "Order-in for both stores, 48h";
  const parts = held.map((entry) => `${entry.units} in ${entry.store.name}`);
  if (ordered.length > 0) {
    parts.push(`order-in for ${ordered.map((e) => e.store.name).join(" & ")}`);
  }
  return parts.join(" · ");
}
