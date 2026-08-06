import Link from "next/link";
import { formatPrice } from "@/lib/catalog/format";
import {
  getBrands,
  getCategories,
  getProducts,
} from "@/lib/catalog/repository";
import { getStock, STORES } from "@/lib/catalog/stores";
import type { ProductQuery } from "@/lib/catalog/types";

type CatalogFiltersProps = {
  action: string;
  query: ProductQuery & { store?: string };
};

/**
 * v2 filter rail. Every control is a link, so filtering keeps working without
 * client JavaScript and every filtered view stays shareable as a URL.
 */
export function CatalogFilters({ action, query }: CatalogFiltersProps) {
  const categories = getCategories();
  const brands = getBrands();
  const all = getProducts({ search: query.search });

  const href = (patch: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const next = { ...query, ...patch };
    if (next.search) params.set("q", next.search);
    if (next.category) params.set("category", next.category);
    if (next.brand) params.set("brand", next.brand);
    if (next.store) params.set("store", next.store);
    if (next.sort) params.set("sort", next.sort);
    const qs = params.toString();
    return qs ? `${action}?${qs}` : action;
  };

  const storeCounts = STORES.map((store, index) => ({
    store,
    count: all.filter((product) => getStock(product)[index].units > 0).length,
  }));

  const prices = all.map((product) => product.price);
  const low = prices.length > 0 ? Math.min(...prices) : 0;
  const high = prices.length > 0 ? Math.max(...prices) : 0;

  const brandCounts = brands
    .map((brand) => ({
      brand,
      count: all.filter(
        (product) => product.brand.toLowerCase() === brand.name.toLowerCase(),
      ).length,
    }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <aside className="catalog-filters" aria-label="Filter products">
      <div className="filter-group">
        <h2>In stock at</h2>
        <p className="filter-note">The filter no marketplace can offer you.</p>
        <div>
          <Link
            className="filter-option"
            href={href({ store: undefined })}
            aria-current={!query.store ? "true" : undefined}
          >
            <span className="swatch" aria-hidden="true" />
            <span className="name">Any store</span>
            <span className="count">{all.length}</span>
          </Link>
          {storeCounts.map(({ store, count }) => (
            <Link
              className="filter-option"
              key={store.slug}
              href={href({ store: store.slug })}
              aria-current={query.store === store.slug ? "true" : undefined}
            >
              <span className="swatch" aria-hidden="true" />
              <span className="name">{store.name}</span>
              <span className="count">{count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="filter-divider" />

      <div className="filter-group">
        <h2>Budget</h2>
        <div className="budget-range">
          <span>{formatPrice(low)}</span>
          <span>{formatPrice(high)}</span>
        </div>
        <div className="budget-track" aria-hidden="true">
          <span style={{ right: "24%" }} />
        </div>
      </div>

      <div className="filter-divider" />

      <div className="filter-group">
        <h2>What for</h2>
        <div className="chip-row">
          {categories.map((category) => (
            <Link
              className="chip"
              key={category.slug}
              href={href({
                category:
                  query.category === category.slug ? undefined : category.slug,
              })}
              aria-current={
                query.category === category.slug ? "true" : undefined
              }
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="filter-divider" />

      <div className="filter-group">
        <h2>Brand</h2>
        <div className="brand-list">
          {brandCounts.slice(0, 6).map(({ brand, count }) => (
            <Link
              key={brand.slug}
              href={href({
                brand: query.brand === brand.slug ? undefined : brand.slug,
              })}
              aria-current={query.brand === brand.slug ? "true" : undefined}
            >
              {brand.name} <span className="count">({count})</span>
            </Link>
          ))}
          <Link className="text-link arrow" href="/brands">
            Show all {brandCounts.length} brands
          </Link>
        </div>
      </div>

      <div className="filter-promo">
        <strong>Not sure which one?</strong>
        <p>
          Walk into Birkirkara and hold three of them. No commission, no upsell.
        </p>
        <Link className="arrow" href="/about#stores">
          Opening hours
        </Link>
      </div>
    </aside>
  );
}
