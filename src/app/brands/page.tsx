import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/catalog/product-grid";
import { getBrands, getProducts } from "@/lib/catalog/repository";

export const metadata: Metadata = { title: "Brands" };
type SearchParams = Promise<{ brand?: string }>;

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { brand } = await searchParams;
  const brands = getBrands();
  const products = brand ? getProducts({ brand }) : [];
  return (
    <section className="page-container listing-page">
      <p className="eyebrow">Brand directory</p>
      <h1>Explore by brand</h1>
      <p className="listing-summary">
        Choose a brand to view matching products.
      </p>
      <div className="brand-grid brand-directory">
        {brands.map((item) => (
          <Link
            className={item.slug === brand ? "is-selected" : ""}
            key={item.slug}
            href={`/brands?brand=${item.slug}`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 960px) 25vw, 16vw"
            />
          </Link>
        ))}
      </div>
      {brand && (
        <div className="brand-results">
          <div className="section-heading">
            <h2>
              {brands.find((item) => item.slug === brand)?.name ?? "Brand"}
            </h2>
            <Link className="text-link" href="/brands">
              Clear brand →
            </Link>
          </div>
          <ProductGrid
            products={products}
            emptyMessage="No products match this brand yet."
          />
        </div>
      )}
    </section>
  );
}
