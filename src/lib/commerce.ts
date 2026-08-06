import type { Product } from "@/lib/catalog/types";

export const BASKET_LIMIT = 10;
export const DELIVERY_FEE = 5;
export const FREE_DELIVERY_THRESHOLD = 50;

export type BasketLine = { productId: string; quantity: number };
export type DeliveryMethod = "collect" | "delivery";
export type BasketTotals = {
  subtotal: number;
  delivery: number;
  total: number;
};

export function getBasketTotals(
  lines: BasketLine[],
  products: Product[],
  deliveryMethod: DeliveryMethod = "delivery",
): BasketTotals {
  const subtotal = lines.reduce(
    (total, line) =>
      total +
      (products.find((product) => product.id === line.productId)?.price ?? 0) *
        line.quantity,
    0,
  );
  const delivery =
    deliveryMethod === "collect" || subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery };
}

export function createDemoReference() {
  return `DEMO-KLIKK-${Date.now().toString(36).toUpperCase()}`;
}
