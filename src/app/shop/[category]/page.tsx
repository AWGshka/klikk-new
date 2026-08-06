import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  filterByStore,
  type ListingQuery,
  ListingView,
} from "@/components/catalog/listing-view";
import { getCategoryBySlug, getProducts } from "@/lib/catalog/repository";
import type { ProductSort } from "@/lib/catalog/types";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ brand?: string; store?: string; sort?: ProductSort }>;
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

  const filters: ListingQuery = {
    category: category.slug,
    brand: query.brand,
    store: query.store,
    sort: query.sort,
  };
  const products = filterByStore(getProducts(filters), filters.store);

  return (
    <ListingView
      action={`/shop/${category.slug}`}
      title={category.name}
      crumb={category.name}
      query={filters}
      products={products}
    />
  );
}
