/// <reference path="../types/bun-test.d.ts" />

import { expect, test } from "bun:test";
import { createDemoReference, getBasketTotals } from "./commerce";

const products = [
  { id: "one", price: 25 },
  { id: "two", price: 40 },
] as never[];

test("charges delivery below the free-delivery threshold", () => {
  expect(
    getBasketTotals([{ productId: "one", quantity: 1 }], products),
  ).toEqual({ subtotal: 25, delivery: 5, total: 30 });
});

test("makes delivery free for qualifying baskets and collection", () => {
  expect(
    getBasketTotals([{ productId: "two", quantity: 2 }], products),
  ).toEqual({ subtotal: 80, delivery: 0, total: 80 });
  expect(
    getBasketTotals([{ productId: "one", quantity: 1 }], products, "collect"),
  ).toEqual({ subtotal: 25, delivery: 0, total: 25 });
});

test("creates a clearly synthetic confirmation reference", () => {
  expect(createDemoReference()).toStartWith("DEMO-KLIKK-");
});
