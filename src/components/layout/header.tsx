import Link from "next/link";
import { BasketDrawer } from "@/components/basket/basket-drawer";
import { getCategories, getProducts } from "@/lib/catalog/repository";

export function Header() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="page-container utility-content">
          <span>Klikk Computers · Malta</span>
          <span>Technology, service and support</span>
        </div>
      </div>
      <div className="page-container header-main">
        <Link className="wordmark" href="/" aria-label="Klikk home">
          KLIKK
          <span aria-hidden="true" />
        </Link>
        <form className="site-search" action="/search">
          <label className="sr-only" htmlFor="site-search">
            Search the catalogue
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search laptops, phones, gaming and more"
          />
          <button type="submit">Search</button>
        </form>
        <nav className="header-actions" aria-label="Utility navigation">
          <Link href="/about">Service</Link>
          <BasketDrawer products={products} />
        </nav>
      </div>
      <nav
        className="primary-nav page-container"
        aria-label="Product categories"
      >
        {categories.map((category) => (
          <Link key={category.slug} href={`/shop/${category.slug}`}>
            {category.name}
          </Link>
        ))}
      </nav>
      <details className="mobile-nav page-container">
        <summary>Browse categories</summary>
        <nav aria-label="Mobile product categories">
          {categories.map((category) => (
            <Link key={category.slug} href={`/shop/${category.slug}`}>
              {category.name}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
