import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/catalog/product-grid";
import { BrandRail } from "@/components/home/brand-rail";
import { CampaignCarousel } from "@/components/home/campaign-carousel";
import {
  getCampaignGroups,
  getDiscoveryTiles,
  getEndcapPromos,
  getFeaturedProducts,
} from "@/lib/catalog/repository";

export default function Home() {
  const campaignGroups = getCampaignGroups();
  const discoveryTiles = getDiscoveryTiles();
  const endcapPromos = getEndcapPromos();
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
        <div className="hero-panel" aria-hidden="true">
          <span>01 / Discovery</span>
          <strong>
            Clear products.
            <br />
            Clear decisions.
          </strong>
        </div>
      </section>
      <CampaignCarousel campaigns={campaignGroups[0] ?? []} />
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
        <div className="category-grid category-art-grid">
          {discoveryTiles.map((tile) => (
            <Link className="category-card" href={tile.href} key={tile.name}>
              <Image
                src={tile.image}
                alt={tile.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
              />
            </Link>
          ))}
        </div>
      </section>
      <CampaignCarousel campaigns={campaignGroups[1] ?? []} />
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
      <CampaignCarousel campaigns={campaignGroups[2] ?? []} />
      <section
        className="page-container endcap-promos"
        aria-label="More from Klikk"
      >
        {endcapPromos.map((promo) => (
          <div key={promo.image}>
            <Image
              src={promo.image}
              alt={promo.name}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        ))}
      </section>
    </>
  );
}
