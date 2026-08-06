import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBasket } from "@/components/basket/add-to-basket";
import { ProductGrid } from "@/components/catalog/product-grid";
import { formatPrice } from "@/lib/catalog/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog/repository";

type ProductPageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product
    ? {
        title: product.name,
        description: product.specification ?? product.name,
      }
    : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  return (
    <>
      <article className="page-container product-detail">
        <Link className="back-link" href={`/shop/${product.categorySlug}`}>
          ← {product.category}
        </Link>
        <div className="product-layout">
          <div className="product-gallery">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="product-purchase">
            <p className="eyebrow">{product.brand}</p>
            <h1>{product.name}</h1>
            {product.specification && (
              <p className="product-specification">{product.specification}</p>
            )}
            <p className="product-price">{formatPrice(product.price)}</p>
            <AddToBasket productId={product.id} />
            <dl className="product-facts">
              <div>
                <dt>Collection</dt>
                <dd>Available from Birkirkara or Żejtun</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Island-wide delivery available</dd>
              </div>
              <div>
                <dt>Support</dt>
                <dd>Advice and after-sales support from Klikk</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
      <section
        className="page-container section-block"
        aria-labelledby="related-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 id="related-title">You may also like</h2>
          </div>
        </div>
        <ProductGrid products={related} />
      </section>
    </>
  );
}
