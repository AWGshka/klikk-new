import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <p className="eyebrow">KLIKK · Malta</p>
          <p>Technology, service and support in one clear retail experience.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/shop">Shop all</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/about">Service & stores</Link>
        </nav>
        <p className="demo-notice">
          Demo store — product data is a local reference snapshot. No orders are
          sent or payments taken.
        </p>
      </div>
    </footer>
  );
}
