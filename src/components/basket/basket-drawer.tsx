"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/catalog/types";
import { useBasket } from "@/providers/basket-provider";
import { BasketLines } from "./basket-lines";

export function BasketDrawer({ products }: { products: Product[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { itemCount } = useBasket();
  return (
    <>
      <button
        className="basket-trigger"
        type="button"
        onClick={() => dialog.current?.showModal()}
      >
        Basket ({itemCount})
      </button>
      <dialog className="basket-drawer" ref={dialog} aria-label="Your basket">
        <div className="drawer-header">
          <h2>Your basket</h2>
          <button type="button" onClick={() => dialog.current?.close()}>
            Close
          </button>
        </div>
        <BasketLines products={products} compact />
        <div className="drawer-actions">
          <Link
            className="button"
            href="/basket"
            onClick={() => dialog.current?.close()}
          >
            View basket
          </Link>
        </div>
      </dialog>
    </>
  );
}
