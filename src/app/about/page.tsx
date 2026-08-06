import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Service & stores",
  description: "Klikk stores, support and delivery information.",
};
export default function AboutPage() {
  return (
    <>
      <section className="page-container about-hero">
        <p className="eyebrow">Klikk Malta</p>
        <h1>Technology is better with people behind it.</h1>
        <p>
          From choosing the right device to keeping it working, Klikk brings
          retail, support and service together.
        </p>
      </section>
      <section className="page-container service-grid">
        <article>
          <p className="eyebrow">Visit us</p>
          <h2>Two stores, one team</h2>
          <p>
            Visit Klikk in Birkirkara or Żejtun for product advice, collection
            and support.
          </p>
        </article>
        <article>
          <p className="eyebrow">Talk to us</p>
          <h2>Helpful support</h2>
          <p>
            Message the Klikk team on WhatsApp at{" "}
            <a href="https://wa.me/35679792750">+356 7979 2750</a> for help
            choosing a product.
          </p>
        </article>
        <article>
          <p className="eyebrow">Shop with confidence</p>
          <h2>Delivery & warranty</h2>
          <p>
            Choose collection or island-wide delivery. Our team can help with
            warranty and after-sales questions.
          </p>
        </article>
      </section>
      <section className="page-container about-callout">
        <h2>Find the right technology for your day-to-day.</h2>
        <Link className="button button-light" href="/shop">
          Shop the range
        </Link>
      </section>
    </>
  );
}
