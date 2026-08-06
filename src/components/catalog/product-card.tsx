import Image from "next/image";
import Link from "next/link";
import { AddToBasket } from "@/components/basket/add-to-basket";
import { formatPrice } from "@/lib/catalog/format";
import type { Product } from "@/lib/catalog/types";

type ProductCardProps = { product: Product };

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-image" href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
        />
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
          <strong>{formatPrice(product.price)}</strong>
          <AddToBasket productId={product.id} />
        </div>
      </div>
    </article>
  );
}
