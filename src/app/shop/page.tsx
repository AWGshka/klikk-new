import type { Metadata } from "next";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getProducts } from "@/lib/catalog/repository";
import type { ProductQuery, ProductSort } from "@/lib/catalog/types";

export const metadata: Metadata = { title: "Shop" };
type SearchParams = Promise<{
  q?: string;
  category?: string;
  brand?: string;
  sort?: ProductSort;
}>;

export default async function ShopPage({
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
  return (
    <section className="page-container listing-page">
      <p className="eyebrow">Browse the range</p>
      <h1>Shop all products</h1>
      <p className="listing-summary">
        {products.length} products to explore across technology, home and
        gaming.
      </p>
      <CatalogFilters action="/shop" query={filters} />
      <ProductGrid products={products} />
    </section>
  );
}
