import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: "How Klikk uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <section className="page-container about-hero">
        <p className="eyebrow">Your preferences</p>
        <h1>Cookie policy</h1>
        <p>
          Cookies help keep Klikk working smoothly and let you choose the
          experience that is right for you.
        </p>
      </section>

      <section
        className="page-container service-grid"
        aria-label="Cookie categories"
      >
        <article>
          <p className="eyebrow">Always on</p>
          <h2>Necessary</h2>
          <p>
            These cookies are required for core website functions, including
            security, navigation and remembering essential choices.
          </p>
        </article>
        <article>
          <p className="eyebrow">With consent</p>
          <h2>Analytics</h2>
          <p>
            Analytics cookies help us understand how visitors use our website so
            we can measure and improve the experience.
          </p>
        </article>
        <article>
          <p className="eyebrow">With consent</p>
          <h2>Marketing & functional</h2>
          <p>
            Marketing cookies support relevant advertising. Functional cookies
            remember preferences and enhance features that are not essential.
          </p>
        </article>
      </section>

      <section className="page-container section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your choice matters</p>
            <h2>Consent for optional cookies</h2>
          </div>
        </div>
        <div className="checkout-disclosure">
          <strong>Necessary cookies are essential.</strong>
          <p>
            Analytics, marketing and functional cookies are only used after you
            actively choose your preferences. You can change or withdraw your
            optional-cookie choices at any time through the cookie preferences
            available on the site.
          </p>
        </div>
      </section>
    </>
  );
}
