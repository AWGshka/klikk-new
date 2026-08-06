"use client";

import { useState } from "react";
import { useBasket } from "@/providers/basket-provider";

type AddToBasketProps = {
  productId: string;
  label?: string;
  className?: string;
};

export function AddToBasket({
  productId,
  label = "Add to basket",
  className = "add-to-basket",
}: AddToBasketProps) {
  const { add } = useBasket();
  const [message, setMessage] = useState("");

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          add(productId);
          setMessage("Added to basket");
        }}
      >
        {message || label}
      </button>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
    </>
  );
}
