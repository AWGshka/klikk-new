import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-top">
        <Image
          className="footer-logo"
          src="/assets/brand-assets/klikk-logo-2025.png"
          alt="Klikk"
          width={180}
          height={59}
          style={{ width: "auto", height: "auto" }}
        />
        <p>Technology, home and gaming, with people ready to help.</p>
      </div>
      <div className="page-container footer-links">
        <nav aria-label="Help and support">
          <h2>Help & support</h2>
          <Link href="/terms">Returns & warranty</Link>
          <Link href="/about#contact">Contact support</Link>
          <Link href="/about#stores">Find a store</Link>
        </nav>
        <nav aria-label="Company">
          <h2>Company</h2>
          <Link href="/about">About Klikk</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/investor-relations">Investor relations</Link>
        </nav>
        <nav aria-label="Account">
          <h2>Account</h2>
          <Link href="/account">My account</Link>
          <Link href="/cart">My cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
        <div>
          <h2>More ways to shop</h2>
          <a href="https://wa.me/35679792750">
            Message us on WhatsApp
            <br />
            +356 7979 2750
          </a>
          <p>Mon to Sat, 9:00–19:00</p>
        </div>
      </div>
      <div className="page-container footer-bottom">
        <span>© Klikk Ltd 2015–2026</span>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy-policy">Privacy policy</Link>
        <Link href="/cookie-policy">Cookie policy</Link>
      </div>
    </footer>
  );
}
