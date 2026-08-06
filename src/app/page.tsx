import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/catalog/product-grid";
import { BrandRail } from "@/components/home/brand-rail";
import { CampaignCarousel } from "@/components/home/campaign-carousel";
import { Ticker } from "@/components/home/ticker";
import { formatPrice } from "@/lib/catalog/format";
import { getWeeklyDeals } from "@/lib/catalog/promotions";
import {
  getCampaignGroups,
  getCategories,
  getFeaturedProducts,
  getProducts,
} from "@/lib/catalog/repository";
import { getStock, stockDetail } from "@/lib/catalog/stores";

export default function Home() {
  const campaignGroups = getCampaignGroups();
  const categories = getCategories();
  // The hero carries the flagship, as the mockup does — highest price wins.
  const [hero] = getProducts({ sort: "price-desc" });
  const rail = getFeaturedProducts(8).filter((item) => item.id !== hero?.id);
  const deals = getWeeklyDeals(5);
  const catalogueSize = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      <section className="hero page-container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-on-dark">
            Apple Authorised Reseller · Acer Authorised Service Centre
          </p>
          <h1 id="hero-title">
            Bought in Malta. Fixed in Malta<span>.</span>
          </h1>
          <p>
            Two shops and our own service centre behind them. Everything we sell
            is stocked here, repaired here and warrantied here — by the people
            who sold it to you. Since 2007.
          </p>
          <div className="hero-cta">
            <Link className="button" href="/shop">
              Browse the catalogue
            </Link>
            <Link className="button-light" href="/about">
              Warranty &amp; service
            </Link>
          </div>
          <p className="hero-stats">
            <span>2 stores</span>
            <span className="sep" aria-hidden="true">
              ◢
            </span>
            <span>48h warranty diagnosis</span>
            <span className="sep" aria-hidden="true">
              ◢
            </span>
            <span>Free delivery over €50</span>
          </p>
        </div>
        {hero && (
          <div className="hero-panel">
            <span className="hero-flag">
              <span>New — {hero.brand}</span>
            </span>
            <div className="hero-media">
              <Image
                src={hero.image}
                alt={hero.name}
                width={520}
                height={330}
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div className="hero-facts">
              <div>
                <p className="eyebrow">{hero.brand}</p>
                <h3>{hero.name}</h3>
                <span className="stock-meter">
                  {stockDetail(getStock(hero))}
                </span>
              </div>
              <div className="hero-buy">
                <Link
                  className="button button-ink"
                  href={`/product/${hero.slug}`}
                >
                  View
                </Link>
                <p className="price">{formatPrice(hero.price)}</p>
                <span className="finance">
                  or {formatPrice(Math.round(hero.price / 24))}/mo over 24
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      <Ticker
        items={[
          "Free island-wide delivery over €50",
          "48h warranty diagnosis, quoted first",
          "Collect from Birkirkara in 30 minutes",
          "Apple Authorised Reseller",
          "Acer Authorised Service Centre",
        ]}
      />

      <section
        className="trust-strip page-container"
        aria-label="Why buy from Klikk"
      >
        <div>
          <strong>Stock you can stand in front of</strong>
          <span>Per-store counts, shown on every product</span>
        </div>
        <div>
          <strong>Acer Service Centre</strong>
          <span>The only authorised one on the island</span>
        </div>
        <div>
          <strong>Next working day</strong>
          <span>Malta &amp; Gozo · free over €50</span>
        </div>
        <div>
          <strong>Up to 3 years warranty</strong>
          <span>Handled in Birkirkara, not shipped abroad</span>
        </div>
      </section>

      <section
        className="page-container section-block"
        aria-labelledby="deals-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Until Sunday, 23:59</p>
            <h2 id="deals-title">This week&rsquo;s prices</h2>
          </div>
          <Link className="text-link arrow" href="/shop?sort=price-desc">
            All deals
          </Link>
        </div>
        <table className="deals-table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Where it is</th>
              <th scope="col">Was</th>
              <th scope="col">Now</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.product.id}>
                <td className="deal-name">
                  <Link href={`/product/${deal.product.slug}`}>
                    {deal.product.name}
                  </Link>
                </td>
                <td className="text-muted">{deal.product.category}</td>
                <td className="deal-where">{deal.where}</td>
                <td className="deal-was">{formatPrice(deal.was)}</td>
                <td>
                  <span className="chip-skew">
                    <span>{formatPrice(deal.now)}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section
        className="page-container section-block"
        aria-labelledby="categories-title"
      >
        <div className="section-heading">
          <h2 id="categories-title">Shop by category</h2>
          <span className="section-note">
            {categories.length} aisles, {catalogueSize.toLocaleString("en-MT")}{" "}
            products
          </span>
        </div>
        <div className="rule-grid category-grid">
          {categories.map((category, index) => (
            <Link
              className="category-card"
              href={`/shop/${category.slug}`}
              key={category.slug}
            >
              <span className="index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="label">{category.name}</span>
              <span className="count">{category.count} products</span>
            </Link>
          ))}
        </div>
      </section>

      <CampaignCarousel campaigns={campaignGroups[0] ?? []} />

      <section
        className="page-container section-block"
        aria-labelledby="featured-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Off the shop floor</p>
            <h2 id="featured-title">Bought most this month</h2>
          </div>
          <Link className="text-link arrow" href="/shop">
            Browse everything
          </Link>
        </div>
        <ProductGrid products={rail.slice(0, 8)} />
      </section>

      <section className="band band-accent page-container">
        <h2>If it breaks, you know where we are.</h2>
        <div>
          <p>
            That is the whole difference between a box shipped from abroad and a
            machine bought in Birkirkara. Bring it in with your invoice —
            diagnosis inside 48 hours, quoted before we touch it.
          </p>
          <Link className="button" href="/about#warranty">
            Start a warranty claim
          </Link>
        </div>
      </section>

      <BrandRail />
    </>
  );
}
