import type { Metadata } from "next";
import { BasketPageView } from "@/components/basket/basket-page-view";
import { getProducts } from "@/lib/catalog/repository";

export const metadata: Metadata = { title: "Basket" };
export default function BasketPage() {
  return <BasketPageView products={getProducts()} />;
}
