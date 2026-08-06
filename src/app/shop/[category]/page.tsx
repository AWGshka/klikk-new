import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getCategoryBySlug, getProducts } from "@/lib/catalog/repository";
import type { ProductSort } from "@/lib/catalog/types";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ brand?: string; sort?: ProductSort }>;
};

export async function generateMetadata({
  params,
}: Pick<CategoryPageProps, "params">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  return category ? { title: category.name } : {};
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const [{ category: slug }, query] = await Promise.all([params, searchParams]);
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const filters = {
    category: category.slug,
    brand: query.brand,
    sort: query.sort,
  };
  const products = getProducts(filters);
  return (
    <section className="page-container listing-page">
      <Link className="back-link" href="/shop">
        ← Shop all products
      </Link>
      <p className="eyebrow">Catalogue</p>
      <h1>{category.name}</h1>
      <p className="listing-summary">{products.length} products to explore</p>
      <div className="catalog-layout">
        <CatalogFilters action={`/shop/${category.slug}`} query={filters} />
        <div className="catalog-results">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
