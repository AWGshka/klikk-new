"use client";

import { useState } from "react";
import { useBasket } from "@/providers/basket-provider";

export function AddToBasket({ productId }: { productId: string }) {
  const { add } = useBasket();
  const [message, setMessage] = useState("");
  return (
    <div className="add-to-basket">
      <button
        type="button"
        onClick={() => {
          add(productId);
          setMessage("Added to cart");
        }}
      >
        Add to cart
      </button>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
