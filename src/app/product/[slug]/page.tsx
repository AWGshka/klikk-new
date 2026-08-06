import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBasket } from "@/components/basket/add-to-basket";
import { ProductGrid } from "@/components/catalog/product-grid";
import { formatPrice } from "@/lib/catalog/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog/repository";
import { getStock, stockMeter, totalUnits } from "@/lib/catalog/stores";

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
  const stock = getStock(product);
  const held = totalUnits(stock) > 0;
  const specs = (product.specification ?? "")
    .split(/\s*[·,]\s*/)
    .filter(Boolean);

  return (
    <>
      <article className="page-container product-detail">
        <p className="product-crumbs breadcrumb">
          <Link href="/">Home</Link>{" "}
          <span className="sep" aria-hidden="true">
            ◢
          </span>{" "}
          <Link href={`/shop/${product.categorySlug}`}>{product.category}</Link>{" "}
          <span className="sep" aria-hidden="true">
            ◢
          </span>{" "}
          <strong>{product.name}</strong>
        </p>

        <div className="product-layout">
          <div className="product-gallery">
            <div className="gallery-main">
              <Image
                src={product.image}
                alt={product.name}
                width={720}
                height={520}
                priority
                sizes="(max-width: 1100px) 100vw, 55vw"
              />
            </div>

            <div className="product-specification">
              <h2>Specification</h2>
              <p>
                As configured for this reference. Other builds are order-in, 5
                working days.
              </p>
              <table className="spec-table">
                <tbody>
                  <tr>
                    <th scope="row">Brand</th>
                    <td>{product.brand}</td>
                  </tr>
                  <tr>
                    <th scope="row">Category</th>
                    <td>{product.category}</td>
                  </tr>
                  {specs.map((entry, index) => (
                    <tr key={entry}>
                      <th scope="row">
                        {index === 0 ? "Key specification" : "Also"}
                      </th>
                      <td>{entry}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">Warranty</th>
                    <td>2 years, handled at our Birkirkara service centre</td>
                  </tr>
                  <tr>
                    <th scope="row">Invoice</th>
                    <td>Maltese VAT invoice issued with every order</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="product-purchase">
            <div>
              <p className="eyebrow">{product.brand}</p>
              <h1>{product.name}</h1>
              <span className="product-meta">
                Ref {product.id} · {product.category} · Maltese VAT invoice
              </span>
            </div>

            <div className="product-price">
              <div>
                <p className="amount">{formatPrice(product.price)}</p>
                <span className="vat">
                  incl. VAT · {formatPrice(Math.round(product.price / 24))}/mo
                  over 24 months
                </span>
              </div>
              {held && (
                <span className="chip-skew">
                  <span>In stock today</span>
                </span>
              )}
            </div>

            <div className="stock-panel">
              <h2>Where it physically is</h2>
              {stock.map(({ store, units }) => (
                <div className="stock-row" key={store.slug}>
                  <span>
                    {store.name} — {store.address.split(",")[0]}
                  </span>
                  <span
                    className={
                      units > 0 ? "stock-meter in-stock" : "stock-meter"
                    }
                  >
                    {stockMeter(units)}{" "}
                    {units > 0 ? `${units} in stock` : "order-in, 48h"}
                  </span>
                </div>
              ))}
              <span className="stock-note">
                Per-store presence for this demo catalogue, not a live feed.
              </span>
            </div>

            <div className="purchase-actions">
              <AddToBasket productId={product.id} className="button" />
            </div>
            <Link className="button-light button-block" href="/about#stores">
              Reserve for collection today
            </Link>

            <div className="product-facts">
              <p>
                <strong>Delivered tomorrow</strong> — order before 15:00, Malta
                &amp; Gozo, free over €50.
              </p>
              <p>
                <strong>2-year warranty</strong> — handled at our own service
                centre in Birkirkara.
              </p>
              <p>
                <strong>14-day returns</strong> — unopened, refunded to the
                original method.
              </p>
            </div>

            {related.length > 0 && (
              <div className="addons">
                <h2>Add while you&rsquo;re here</h2>
                {related.slice(0, 3).map((addon) => (
                  <div className="addon-row" key={addon.id}>
                    <Link href={`/product/${addon.slug}`}>{addon.name}</Link>
                    <span className="actions">
                      <strong>{formatPrice(addon.price)}</strong>
                      <AddToBasket
                        productId={addon.id}
                        label="Add"
                        className=""
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <section
        className="page-container section-block"
        aria-labelledby="related-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Same aisle</p>
            <h2 id="related-title">Also in {product.category}</h2>
          </div>
          <Link
            className="text-link arrow"
            href={`/shop/${product.categorySlug}`}
          >
            All {product.category}
          </Link>
        </div>
        <ProductGrid products={related} />
      </section>
    </>
  );
}
