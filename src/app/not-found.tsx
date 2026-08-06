import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-container empty-page">
      <p className="eyebrow">404</p>
      <h1>We couldn’t find that page.</h1>
      <p>Try browsing the latest products or returning to the home page.</p>
      <Link className="button" href="/shop">
        Browse products
      </Link>
    </section>
  );
}
