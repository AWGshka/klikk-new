import Link from "next/link";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getStock, STORES } from "@/lib/catalog/stores";
import type { Product, ProductQuery, ProductSort } from "@/lib/catalog/types";

const SORTS: Array<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "name-asc", label: "A–Z" },
];

export type ListingQuery = ProductQuery & { store?: string };

type ListingViewProps = {
  action: string;
  title: string;
  crumb: string;
  query: ListingQuery;
  products: Product[];
};

/** Applies the v2 "in stock at" filter, which is derived rather than stored. */
export function filterByStore(products: Product[], store?: string) {
  if (!store) return products;
  const index = STORES.findIndex((entry) => entry.slug === store);
  if (index < 0) return products;
  return products.filter((product) => getStock(product)[index].units > 0);
}

export function ListingView({
  action,
  title,
  crumb,
  query,
  products,
}: ListingViewProps) {
  const sortHref = (sort: ProductSort) => {
    const params = new URLSearchParams();
    if (query.search) params.set("q", query.search);
    if (query.category) params.set("category", query.category);
    if (query.brand) params.set("brand", query.brand);
    if (query.store) params.set("store", query.store);
    params.set("sort", sort);
    return `${action}?${params.toString()}`;
  };
  const active = query.sort ?? "featured";

  return (
    <section className="page-container listing-page">
      <div className="listing-summary">
        <div>
          <p className="breadcrumb">
            <Link href="/">Home</Link>{" "}
            <span className="sep" aria-hidden="true">
              ◢
            </span>{" "}
            <strong>{crumb}</strong>
          </p>
          <h1>{title}</h1>
        </div>
        <div className="listing-controls">
          <span className="result-count">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
          <nav className="sort-seg" aria-label="Sort products">
            {SORTS.map((sort) => (
              <Link
                key={sort.value}
                href={sortHref(sort.value)}
                aria-current={active === sort.value ? "true" : undefined}
              >
                {sort.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="catalog-layout">
        <CatalogFilters action={action} query={query} />
        <div className="catalog-results">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="empty-state">
              <h2>Nothing matches those filters.</h2>
              <p>
                Widen the store filter, or call Birkirkara on +356 2750 2750 —
                half of what we can get in isn&rsquo;t on the shelf.
              </p>
              <Link className="button" href={action}>
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
