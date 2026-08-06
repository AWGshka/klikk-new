"use client";

import Link from "next/link";
import type { Product } from "@/lib/catalog/types";
import { getBasketTotals } from "@/lib/commerce";
import { useBasket } from "@/providers/basket-provider";
import { BasketLines } from "./basket-lines";

export function BasketPageView({ products }: { products: Product[] }) {
  const { lines, clear } = useBasket();
  const totals = getBasketTotals(lines, products);
  return (
    <section className="page-container basket-page">
      <div>
        <p className="eyebrow">Your selections</p>
        <h1>Your cart</h1>
        <BasketLines products={products} />
      </div>
      {lines.length > 0 && (
        <aside className="order-summary">
          <h2>Order summary</h2>
          <p>
            <span>Subtotal</span>
            <strong>€{totals.subtotal.toFixed(2)}</strong>
          </p>
          <p>
            <span>Estimated delivery</span>
            <strong>
              {totals.delivery === 0
                ? "Free"
                : `€${totals.delivery.toFixed(2)}`}
            </strong>
          </p>
          <p className="summary-total">
            <span>Total</span>
            <strong>€{totals.total.toFixed(2)}</strong>
          </p>
          <Link className="button" href="/checkout">
            Proceed to checkout
          </Link>
          <button className="text-button" type="button" onClick={clear}>
            Clear cart
          </button>
        </aside>
      )}
    </section>
  );
}
