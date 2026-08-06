import Link from "next/link";
import { getCategories } from "@/lib/catalog/repository";

export default function Home() {
  const categories = getCategories();

  return (
    <>
      <section className="hero page-container">
        <div className="hero-copy">
          <p className="eyebrow">Technology, made straightforward</p>
          <h1>Bought here. Supported here.</h1>
          <p>
            Explore a focused local catalogue, with the product detail and
            reassurance you need before choosing.
          </p>
          <Link className="button button-light" href="/shop">
            Browse the catalogue
          </Link>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <span>01 / Foundation</span>
          <strong>
            Clear products.
            <br />
            Clear decisions.
          </strong>
        </div>
      </section>
      <section
        className="page-container section-block"
        aria-labelledby="categories-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Start browsing</p>
          <h2 id="categories-title">Shop by category</h2>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              className="category-card"
              href={`/shop/${category.slug}`}
              key={category.slug}
            >
              <span>0{index + 1}</span>
              <strong>{category.name}</strong>
              <small>{category.count} sample products</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
