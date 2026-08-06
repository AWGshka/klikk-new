import Image from "next/image";
import Link from "next/link";
import { EMAIL, PHONE, WHATSAPP } from "@/lib/catalog/stores";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-top">
        <div>
          <Image
            className="footer-logo"
            src="/assets/brand-assets/klikk-logo-2025.png"
            alt="Klikk"
            width={150}
            height={49}
            style={{ width: "9.375rem", height: "auto" }}
          />
          <p>
            Klikk Ltd — Triq Dun Karm, Birkirkara BKR 4019 · Tal-Barrani Road,
            Żejtun. Retail IT in Malta since 2007.
          </p>
        </div>
        <nav className="footer-links" aria-label="Shop">
          <h2>Shop</h2>
          <Link href="/shop/laptops">Laptops</Link>
          <Link href="/shop/desktop-pcs">Desktops &amp; Rock PCs</Link>
          <Link href="/shop/gaming">Gaming</Link>
          <Link href="/shop?sort=price-asc">This week&rsquo;s prices</Link>
        </nav>
        <nav className="footer-links" aria-label="Service">
          <h2>Service</h2>
          <Link href="/about#warranty">Warranty claim</Link>
          <Link href="/terms">Warranty terms</Link>
          <Link href="/terms#returns">Returns &amp; refunds</Link>
          <Link href="/investor-relations">Klikk for Business</Link>
        </nav>
        <nav className="footer-links" aria-label="Contact">
          <h2>Contact</h2>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
          <a href={`https://wa.me/356${WHATSAPP.replace(/\s/g, "")}`}>
            WhatsApp {WHATSAPP}
          </a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </nav>
      </div>
      <div className="page-container footer-bottom">
        <span>© Klikk Ltd 2007–2026</span>
        <span>
          <Link href="/terms">Terms</Link> ·{" "}
          <Link href="/privacy-policy">Privacy policy</Link> ·{" "}
          <Link href="/cookie-policy">Cookie policy</Link> ·{" "}
          <Link href="/careers">Careers</Link>
        </span>
      </div>
    </footer>
  );
}
