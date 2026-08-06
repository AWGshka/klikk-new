"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  reference: string;
  createdAt: string;
  delivery: "collect" | "delivery";
  totals: { total: number };
};
export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("klikk-demo-order");
      if (saved) setOrder(JSON.parse(saved));
    } catch {}
  }, []);
  return (
    <section className="page-container confirmation-page">
      <p className="eyebrow">Order confirmation</p>
      <h1>{order ? "Your demo order is confirmed" : "Order confirmation"}</h1>
      {order ? (
        <>
          <p>
            Your reference is <strong>{order.reference}</strong>.
          </p>
          <p>
            {order.delivery === "collect"
              ? "We’ll prepare your collection details for Birkirkara or Żejtun."
              : "Your selected delivery method is island-wide delivery."}
          </p>
          <p>
            Total: <strong>€{order.totals.total.toFixed(2)}</strong>
          </p>
        </>
      ) : (
        <p>Your order details are available in this browser session only.</p>
      )}
      <div className="checkout-disclosure">
        <strong>Demo store</strong>
        <p>No payment is taken and no order is sent to Klikk.</p>
      </div>
      <Link className="button" href="/shop">
        Continue shopping
      </Link>
    </section>
  );
}
