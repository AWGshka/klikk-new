import Image from "next/image";
import Link from "next/link";
import { BasketDrawer } from "@/components/basket/basket-drawer";
import { getCategories, getProducts } from "@/lib/catalog/repository";
import { PHONE } from "@/lib/catalog/stores";

export function Header() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="page-container utility-content">
          <span>Birkirkara &amp; Żejtun — Mon to Sat, 09:00–19:00</span>
          <span>
            <span>Island-wide delivery, next working day</span>
            <a
              className="utility-phone"
              href={`tel:${PHONE.replace(/\s/g, "")}`}
            >
              {PHONE}
            </a>
          </span>
        </div>
      </div>
      <div className="page-container header-main">
        <Link className="brand-logo" href="/" aria-label="Klikk home">
          <Image
            src="/assets/brand-assets/klikk-logo-2025.png"
            alt="Klikk"
            width={168}
            height={55}
            style={{ width: "10.5rem", height: "auto" }}
            priority
          />
        </Link>
        <form className="site-search" action="/search">
          <label className="sr-only" htmlFor="site-search">
            Search the catalogue
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search the catalogue — “thinkpad 16gb”, “rtx 5070”, “iphone 17”"
          />
          <button type="submit">Search</button>
        </form>
        <nav className="header-actions" aria-label="Utility navigation">
          <Link href="/about">Service</Link>
          <span className="header-sep" aria-hidden="true">
            ◢
          </span>
          <Link href="/account">Account</Link>
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
