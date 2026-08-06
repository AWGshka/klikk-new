import type { Metadata } from "next";
import {
  filterByStore,
  type ListingQuery,
  ListingView,
} from "@/components/catalog/listing-view";
import { getProducts } from "@/lib/catalog/repository";
import type { ProductSort } from "@/lib/catalog/types";

export const metadata: Metadata = { title: "Shop" };

type SearchParams = Promise<{
  q?: string;
  category?: string;
  brand?: string;
  store?: string;
  sort?: ProductSort;
}>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const filters: ListingQuery = {
    search: query.q,
    category: query.category,
    brand: query.brand,
    store: query.store,
    sort: query.sort,
  };
  const products = filterByStore(getProducts(filters), filters.store);

  return (
    <ListingView
      action="/shop"
      title="Everything we stock"
      crumb="Shop"
      query={filters}
      products={products}
    />
  );
}
