import Image from "next/image";
import Link from "next/link";
import { getBrands } from "@/lib/catalog/repository";

export function BrandRail() {
  return (
    <section
      className="page-container section-block"
      aria-labelledby="brands-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Authorised and stocked</p>
          <h2 id="brands-title">Explore by brand</h2>
        </div>
        <Link className="text-link arrow" href="/brands">
          All brands
        </Link>
      </div>
      <div className="rule-grid brand-grid">
        {getBrands()
          .slice(0, 8)
          .map((brand) => (
            <Link key={brand.slug} href={`/brands?brand=${brand.slug}`}>
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(max-width: 640px) 50vw, 12.5vw"
              />
            </Link>
          ))}
      </div>
    </section>
  );
}
