import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/catalog/format";
import { getProductBySlug } from "@/lib/catalog/repository";

type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name } : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <article className="page-container detail-page">
      <Link className="back-link" href={`/shop/${product.categorySlug}`}>
        ← {product.category}
      </Link>
      <p className="eyebrow">{product.brand}</p>
      <h1>{product.name}</h1>
      {product.specification && (
        <p className="product-specification">{product.specification}</p>
      )}
      <p className="product-price">{formatPrice(product.price)}</p>
      <p className="demo-notice">
        Reference product data only. Availability and pricing are not live.
      </p>
    </article>
  );
}
