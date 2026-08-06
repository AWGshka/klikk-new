"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/catalog/format";
import { PHONE } from "@/lib/catalog/stores";
import type { Product } from "@/lib/catalog/types";
import { getBasketTotals } from "@/lib/commerce";
import { useBasket } from "@/providers/basket-provider";
import { BasketLines } from "./basket-lines";

export function BasketPageView({ products }: { products: Product[] }) {
  const { lines, clear } = useBasket();
  const totals = getBasketTotals(lines, products);
  const vat = totals.total - totals.total / 1.18;
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <section className="page-container basket-page">
      <div className="step-bar">
        <ol>
          <li aria-current="step">01 — Basket</li>
          <li>02 — Delivery</li>
          <li>03 — Payment</li>
        </ol>
        <span>Stuck? Call Birkirkara — {PHONE}</span>
      </div>

      <div className="basket-layout">
        <div className="basket-lines">
          <h1>Your basket</h1>
          <p>
            {itemCount === 0
              ? "Nothing selected yet."
              : `${itemCount} ${itemCount === 1 ? "item" : "items"} — held here while you decide.`}
          </p>
          <BasketLines products={products} />
        </div>

        {lines.length > 0 && (
          <aside className="order-summary">
            <h2>Order summary</h2>
            <p className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(totals.subtotal)}</strong>
            </p>
            <p className="summary-row">
              <span>Estimated delivery</span>
              <strong>
                {totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}
              </strong>
            </p>
            <p className="summary-row">
              <span>Of which VAT (18%)</span>
              <span className="vat">{formatPrice(Math.round(vat))}</span>
            </p>
            <p className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(totals.total)}</strong>
            </p>
            <Link className="button button-block" href="/checkout">
              Continue to payment ◢
            </Link>
            <p>
              Card, bank transfer, or pay in store on collection. 14-day returns
              on unopened items. Warranty is handled here, not by a brand
              hotline abroad.
            </p>
            <div className="collection-note">
              <strong>Collecting from Birkirkara</strong>
              <p>
                Triq Dun Karm, BKR 4019. Ready in 30 minutes, Mon–Sat
                09:00–19:00. Bring ID matching the card.
              </p>
            </div>
            <button className="text-button" type="button" onClick={clear}>
              Clear basket
            </button>
          </aside>
        )}
      </div>
    </section>
  );
}
