import Image from "next/image";
import Link from "next/link";
import { AddToBasket } from "@/components/basket/add-to-basket";
import { formatPrice } from "@/lib/catalog/format";
import { getStock, stockSummary, totalUnits } from "@/lib/catalog/stores";
import type { Product } from "@/lib/catalog/types";

type ProductCardProps = { product: Product; badge?: string };

export function ProductCard({ product, badge }: ProductCardProps) {
  const stock = getStock(product);
  const held = totalUnits(stock) > 0;

  return (
    <article className="product-card">
      <Link className="product-image" href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
        />
        {badge && <span className="product-badge">{badge}</span>}
        {!badge && held && <span className="product-badge">In stock</span>}
      </Link>
      <div className="product-card-body">
        <p className="eyebrow">{product.brand}</p>
        <h3>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        {product.specification && (
          <p className="product-card-spec">{product.specification}</p>
        )}
        <div className="product-card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="stock">{stockSummary(stock)}</span>
        </div>
      </div>
      <AddToBasket productId={product.id} />
    </article>
  );
}
