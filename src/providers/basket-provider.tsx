"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BASKET_LIMIT, type BasketLine } from "@/lib/commerce";

type BasketContextValue = {
  lines: BasketLine[];
  itemCount: number;
  add: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const BasketContext = createContext<BasketContextValue | null>(null);
const storageKey = "klikk-basket";

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
      if (Array.isArray(saved))
        setLines(
          saved.filter(
            (line): line is BasketLine =>
              typeof line?.productId === "string" &&
              Number.isInteger(line?.quantity) &&
              line.quantity > 0 &&
              line.quantity <= BASKET_LIMIT,
          ),
        );
    } catch {
      window.localStorage.removeItem(storageKey);
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated)
      window.localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [hasHydrated, lines]);

  const value = useMemo<BasketContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((total, line) => total + line.quantity, 0),
      add(productId) {
        setLines((current) => {
          const existing = current.find((line) => line.productId === productId);
          return existing
            ? current.map((line) =>
                line.productId === productId
                  ? {
                      ...line,
                      quantity: Math.min(BASKET_LIMIT, line.quantity + 1),
                    }
                  : line,
              )
            : [...current, { productId, quantity: 1 }];
        });
      },
      updateQuantity(productId, quantity) {
        setLines((current) =>
          quantity < 1
            ? current.filter((line) => line.productId !== productId)
            : current.map((line) =>
                line.productId === productId
                  ? {
                      ...line,
                      quantity: Math.min(BASKET_LIMIT, Math.floor(quantity)),
                    }
                  : line,
              ),
        );
      },
      remove(productId) {
        setLines((current) =>
          current.filter((line) => line.productId !== productId),
        );
      },
      clear() {
        setLines([]);
      },
    }),
    [lines],
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used within BasketProvider");
  return context;
}
