"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/catalog/format";
import { getStock, stockSummary } from "@/lib/catalog/stores";
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
  readOnly = false,
}: {
  products: Product[];
  deliveryMethod?: DeliveryMethod;
  compact?: boolean;
  readOnly?: boolean;
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
        <h2>Nothing in here yet.</h2>
        <p>
          Two shops, one service centre, and everything on the shelf is on the
          site.
        </p>
        <Link className="button" href="/shop">
          Browse the catalogue
        </Link>
      </div>
    );

  return (
    <div className={compact ? "basket-line-list compact" : "basket-line-list"}>
      {items.map(({ product, quantity }) => (
        <article className="basket-line" key={product.id}>
          <div className="basket-line-image">
            <Image src={product.image} alt="" fill sizes="128px" />
          </div>
          <div>
            <h3>
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            <p className="spec">
              {product.specification ??
                `${product.brand} · ${product.category}`}
            </p>
            <p className="stock">{stockSummary(getStock(product))}</p>
          </div>
          <div className="basket-line-actions">
            <p className="line-total">
              {formatPrice(product.price * quantity)}
            </p>
            {readOnly ? (
              <p className="line-quantity">
                <span className="qty">Qty {quantity}</span>
              </p>
            ) : (
              <div className="line-quantity">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${product.name}`}
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >
                  –
                </button>
                <span className="qty">{quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${product.name}`}
                  disabled={quantity >= BASKET_LIMIT}
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="remove"
                  onClick={() => remove(product.id)}
                >
                  Remove
                </button>
              </div>
            )}
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
