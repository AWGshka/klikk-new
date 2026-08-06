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
const storageKey = "klikk-cart";
const legacyStorageKey = "klikk-basket";

function validLines(value: unknown): BasketLine[] {
  return Array.isArray(value)
    ? value.filter(
        (line): line is BasketLine =>
          typeof line?.productId === "string" &&
          Number.isInteger(line?.quantity) &&
          line.quantity > 0 &&
          line.quantity <= BASKET_LIMIT,
      )
    : [];
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [hasSyncedAccount, setHasSyncedAccount] = useState(false);

  useEffect(() => {
    try {
      setLines(
        validLines(
          JSON.parse(
            window.localStorage.getItem(storageKey) ??
              window.localStorage.getItem(legacyStorageKey) ??
              "[]",
          ),
        ),
      );
    } catch {
      window.localStorage.removeItem(storageKey);
    }
    window.localStorage.removeItem(legacyStorageKey);
    setHasHydrated(true);
  }, []);
  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [hasHydrated, lines]);
  useEffect(() => {
    if (!hasHydrated) return;
    fetch("/api/cart")
      .then(async (response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (result?.lines?.length) setLines(validLines(result.lines));
      })
      .finally(() => setHasSyncedAccount(true));
  }, [hasHydrated]);
  useEffect(() => {
    if (!hasHydrated || !hasSyncedAccount) return;
    void fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });
  }, [hasHydrated, hasSyncedAccount, lines]);

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
