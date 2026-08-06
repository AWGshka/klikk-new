import type { Product } from "@/lib/catalog/types";
import { ProductCard } from "./product-card";

type ProductGridProps = { products: Product[]; emptyMessage?: string };

export function ProductGrid({
  products,
  emptyMessage = "No products match those filters.",
}: ProductGridProps) {
  if (products.length === 0)
    return <p className="empty-state">{emptyMessage}</p>;
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
