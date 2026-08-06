"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
  if (lines.length === 0)
    return (
      <section className="page-container checkout-page">
        <div className="empty-basket">
          <h1>Your basket is empty</h1>
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
      <div>
        <p className="eyebrow">Checkout</p>
        <h1>Complete your order</h1>
        <form onSubmit={complete} noValidate>
          <fieldset>
            <legend>Contact details</legend>
            <label>
              Full name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                autoComplete="name"
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                autoComplete="email"
              />
            </label>
            <label>
              Phone number
              <input
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
                autoComplete="tel"
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Delivery method</legend>
            <label className="radio-label">
              <input
                type="radio"
                checked={form.delivery === "delivery"}
                onChange={() => setForm({ ...form, delivery: "delivery" })}
              />{" "}
              Island-wide delivery {totals.delivery === 0 ? "(Free)" : "(€5)"}
            </label>
            <label className="radio-label">
              <input
                type="radio"
                checked={form.delivery === "collect"}
                onChange={() => setForm({ ...form, delivery: "collect" })}
              />{" "}
              Collect from Birkirkara or Żejtun (Free)
            </label>
          </fieldset>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="checkout-disclosure">
            <strong>Demo store</strong>
            <p>No payment is taken and no order is sent to Klikk.</p>
          </div>
          <button className="button" type="submit">
            Place demo order
          </button>
        </form>
      </div>
      <aside className="order-summary">
        <h2>Order summary</h2>
        <BasketLines
          products={products}
          deliveryMethod={form.delivery}
          compact
        />
        <p className="summary-total">
          <span>Total</span>
          <strong>€{totals.total.toFixed(2)}</strong>
        </p>
      </aside>
    </section>
  );
}
