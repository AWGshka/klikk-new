"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/catalog/types";
import { useBasket } from "@/providers/basket-provider";
import { BasketLines } from "./basket-lines";

export function BasketDrawer({ products }: { products: Product[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const { itemCount } = useBasket();
  useEffect(() => {
    function close(event: MouseEvent) {
      if (dropdown.current && !dropdown.current.contains(event.target as Node))
        setIsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);
  return (
    <div className="cart-menu" ref={dropdown}>
      <button
        className="basket-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="cart-dropdown"
        onClick={() => setIsOpen((open) => !open)}
      >
        Cart ({itemCount})
      </button>
      {isOpen && (
        <div className="basket-drawer" id="cart-dropdown">
          <div className="drawer-header">
            <h2>Your cart</h2>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <BasketLines products={products} compact />
          <div className="drawer-actions">
            <Link
              className="text-link"
              href="/cart"
              onClick={() => setIsOpen(false)}
            >
              View cart
            </Link>
            <Link
              className="button"
              href="/checkout"
              onClick={() => setIsOpen(false)}
            >
              Go to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
