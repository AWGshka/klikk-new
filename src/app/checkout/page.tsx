import type { Metadata } from "next";
import { CheckoutView } from "@/components/basket/checkout-view";
import { getProducts } from "@/lib/catalog/repository";
export const metadata: Metadata = { title: "Checkout" };
export default function CheckoutPage() {
  return <CheckoutView products={getProducts()} />;
}
