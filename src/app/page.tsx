import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/catalog/product-grid";
import { BrandRail } from "@/components/home/brand-rail";
import {
  getCampaigns,
  getCategories,
  getFeaturedProducts,
} from "@/lib/catalog/repository";

export default function Home() {
  const categories = getCategories();
  const campaigns = getCampaigns();
  const featuredProducts = getFeaturedProducts(4);

  return (
    <>
      <section className="hero page-container">
        <div className="hero-copy">
          <p className="eyebrow">Technology, made straightforward</p>
          <h1>Bought here. Supported here.</h1>
          <p>
            Discover technology with the detail and service reassurance you need
            before choosing.
          </p>
          <Link className="button button-light" href="/shop">
            Browse the catalogue
          </Link>
        </div>
        {campaigns[0] ? (
          <div className="hero-image">
            <Image
              src={campaigns[0].image}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="hero-panel" aria-hidden="true">
            <span>01 / Discovery</span>
            <strong>
              Clear products.
              <br />
              Clear decisions.
            </strong>
          </div>
        )}
      </section>
      <section
        className="trust-strip page-container"
        aria-label="Store reassurance"
      >
        <p>
          <strong>Local support</strong> Clear product information
        </p>
        <p>
          <strong>Focused choice</strong> Browse by category or brand
        </p>
        <p>
          <strong>Trusted support</strong> Advice when you need it
        </p>
      </section>
      <section
        className="page-container section-block"
        aria-labelledby="categories-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start browsing</p>
            <h2 id="categories-title">Shop by category</h2>
          </div>
          <Link className="text-link" href="/shop">
            All products →
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              className="category-card"
              href={`/shop/${category.slug}`}
              key={category.slug}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 25vw"
                />
              )}
              <span>0{index + 1}</span>
              <strong>{category.name}</strong>
              <small>{category.count} products</small>
            </Link>
          ))}
        </div>
      </section>
      {campaigns[1] && (
        <section className="page-container campaign">
          <Image
            src={campaigns[1].image}
            alt="Featured campaign"
            fill
            sizes="100vw"
          />
          <div>
            <p className="eyebrow">Local catalogue</p>
            <h2>Find your next everyday essential.</h2>
            <Link className="button" href="/shop">
              Shop all products
            </Link>
          </div>
        </section>
      )}
      <section
        className="page-container section-block"
        aria-labelledby="featured-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected for discovery</p>
            <h2 id="featured-title">Featured products</h2>
          </div>
          <Link className="text-link" href="/shop?sort=price-desc">
            Browse catalogue →
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
      <BrandRail />
    </>
  );
}
