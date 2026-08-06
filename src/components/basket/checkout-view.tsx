"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice } from "@/lib/catalog/format";
import { PHONE } from "@/lib/catalog/stores";
import type { Product } from "@/lib/catalog/types";
import {
  createDemoReference,
  type DeliveryMethod,
  getBasketTotals,
} from "@/lib/commerce";
import { useBasket } from "@/providers/basket-provider";
import { BasketLines } from "./basket-lines";

type FormState = {
  name: string;
  email: string;
  phone: string;
  delivery: DeliveryMethod;
};

export function CheckoutView({ products }: { products: Product[] }) {
  const router = useRouter();
  const { lines, clear } = useBasket();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    delivery: "delivery",
  });
  const [error, setError] = useState("");
  const totals = getBasketTotals(lines, products, form.delivery);
  const vat = totals.total - totals.total / 1.18;

  if (lines.length === 0)
    return (
      <section className="page-container checkout-page">
        <div className="empty-basket">
          <h1>Nothing in here yet.</h1>
          <p>Add a product before checking out.</p>
        </div>
      </section>
    );

  function complete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !/^\S+@\S+\.\S+$/.test(form.email) ||
      !form.phone.trim()
    ) {
      setError("Please complete your name, email address and phone number.");
      return;
    }
    const reference = createDemoReference();
    void fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "order",
        order: { reference, total: totals.total },
      }),
    });
    window.sessionStorage.setItem(
      "klikk-demo-order",
      JSON.stringify({
        reference,
        createdAt: new Date().toISOString(),
        lines,
        delivery: form.delivery,
        totals,
      }),
    );
    clear();
    router.push(`/order-confirmation?ref=${reference}`);
  }

  return (
    <section className="page-container checkout-page">
      <div className="step-bar">
        <ol>
          <li>01 — Basket</li>
          <li aria-current="step">02 — Delivery</li>
          <li>03 — Payment</li>
        </ol>
        <span>Stuck? Call Birkirkara — {PHONE}</span>
      </div>

      <form className="checkout-layout" onSubmit={complete} noValidate>
        <div className="basket-lines">
          <h1>How do you want it?</h1>
          <p>
            On a two-store island, collection is usually faster than any
            courier.
          </p>

          <div className="fulfilment">
            <h2>Delivery method</h2>
            <div className="fulfilment-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "collect"}
                  onChange={() => setForm({ ...form, delivery: "collect" })}
                />
                <span className="row">
                  <span className="name">Collect from store</span>
                  <span className="price free">Free</span>
                </span>
                <p>
                  Birkirkara or Żejtun, ready in 30 minutes. Bring ID matching
                  the card.
                </p>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="delivery"
                  checked={form.delivery === "delivery"}
                  onChange={() => setForm({ ...form, delivery: "delivery" })}
                />
                <span className="row">
                  <span className={totals.delivery === 0 ? "name" : "name"}>
                    Island-wide delivery
                  </span>
                  <span
                    className={totals.delivery === 0 ? "price free" : "price"}
                  >
                    {totals.delivery === 0
                      ? "Free"
                      : formatPrice(totals.delivery)}
                  </span>
                </span>
                <p>
                  Malta &amp; Gozo, next working day when ordered before 15:00.
                  Free over €50.
                </p>
              </label>
            </div>
          </div>

          <div className="fulfilment">
            <h2>Contact details</h2>
            <div className="account-form">
              <div>
                <label htmlFor="checkout-name">Full name</label>
                <input
                  id="checkout-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="checkout-email">Email address</label>
                <input
                  id="checkout-email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="checkout-phone">Phone number</label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  autoComplete="tel"
                />
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <BasketLines
            products={products}
            deliveryMethod={form.delivery}
            compact
            readOnly
          />
          <p className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(totals.subtotal)}</strong>
          </p>
          <p className="summary-row">
            <span>
              {form.delivery === "collect"
                ? "Collect from store"
                : "Island-wide delivery"}
            </span>
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
          <div className="checkout-disclosure">
            <strong>Demo store</strong>
            <p>No payment is taken and no order is sent to Klikk.</p>
          </div>
          <button className="button button-block" type="submit">
            Place demo order
          </button>
        </aside>
      </form>
    </section>
  );
}
