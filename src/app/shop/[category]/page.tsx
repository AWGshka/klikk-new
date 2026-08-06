import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/catalog/format";
import { getCategoryBySlug, getProducts } from "@/lib/catalog/repository";

type CategoryPageProps = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const products = getProducts({ category: category.slug });

  return (
    <section className="page-container listing-page">
      <p className="eyebrow">Catalogue</p>
      <h1>{category.name}</h1>
      <p className="listing-summary">
        {category.count} locally captured reference products
      </p>
      <div className="product-list">
        {products.map((product) => (
          <article className="product-row" key={product.id}>
            <div>
              <p className="eyebrow">{product.brand}</p>
              <h2>{product.name}</h2>
              {product.specification && <p>{product.specification}</p>}
            </div>
            <strong>{formatPrice(product.price)}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
