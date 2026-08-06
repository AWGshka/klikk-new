import type { Metadata } from "next";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getProducts } from "@/lib/catalog/repository";
import type { ProductQuery, ProductSort } from "@/lib/catalog/types";

export const metadata: Metadata = { title: "Search" };
type SearchParams = Promise<{
  q?: string;
  category?: string;
  brand?: string;
  sort?: ProductSort;
}>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const filters: ProductQuery = {
    search: query.q,
    category: query.category,
    brand: query.brand,
    sort: query.sort,
  };
  const products = getProducts(filters);
  const label = query.q?.trim()
    ? `Results for “${query.q.trim()}”`
    : "Search the catalogue";
  return (
    <section className="page-container listing-page">
      <p className="eyebrow">Search</p>
      <h1>{label}</h1>
      <p className="listing-summary">{products.length} matching products</p>
      <div className="catalog-layout">
        <CatalogFilters action="/search" query={filters} />
        <div className="catalog-results">
          <ProductGrid
            products={products}
            emptyMessage="Try a different product, brand or category."
          />
        </div>
      </div>
    </section>
  );
}
