"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog/format";
import type { Product } from "@/lib/catalog/types";
import {
  BASKET_LIMIT,
  type DeliveryMethod,
  getBasketTotals,
} from "@/lib/commerce";
import { useBasket } from "@/providers/basket-provider";

export function BasketLines({
  products,
  deliveryMethod = "delivery",
  compact = false,
}: {
  products: Product[];
  deliveryMethod?: DeliveryMethod;
  compact?: boolean;
}) {
  const { lines, updateQuantity, remove } = useBasket();
  const items = lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  const totals = getBasketTotals(lines, products, deliveryMethod);
  if (items.length === 0)
    return (
      <div className="empty-basket">
        <h2>Your basket is empty</h2>
        <p>Discover technology for work, play and home.</p>
        <Link className="button" href="/shop">
          Continue shopping
        </Link>
      </div>
    );
  return (
    <div className={compact ? "basket-lines compact" : "basket-lines"}>
      {items.map(({ product, quantity }) => (
        <article className="basket-line" key={product.id}>
          <div className="basket-line-image">
            <Image src={product.image} alt="" fill sizes="96px" />
          </div>
          <div>
            <p className="eyebrow">{product.brand}</p>
            <h3>
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <div className="quantity-control">
            <label>
              <span className="sr-only">Quantity for {product.name}</span>
              <input
                type="number"
                min="1"
                max={BASKET_LIMIT}
                value={quantity}
                onChange={(event) =>
                  updateQuantity(product.id, Number(event.target.value))
                }
              />
            </label>
            <button type="button" onClick={() => remove(product.id)}>
              Remove
            </button>
          </div>
        </article>
      ))}
      <div className="basket-total">
        <span>Subtotal</span>
        <strong>{formatPrice(totals.subtotal)}</strong>
      </div>
    </div>
  );
}
