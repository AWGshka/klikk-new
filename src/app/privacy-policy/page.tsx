import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Klikk collects, uses and protects personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-container about-hero">
        <p className="eyebrow">Your information</p>
        <h1>Privacy policy</h1>
        <p>
          We explain what personal data we use, why we use it and the choices
          available to you.
        </p>
      </section>

      <section
        className="page-container service-grid"
        aria-label="Privacy at a glance"
      >
        <article>
          <p className="eyebrow">Controller</p>
          <h2>Klikk p.l.c.</h2>
          <p>
            Klikk p.l.c. is responsible for the personal data processed through
            Klikk services and customer interactions.
          </p>
        </article>
        <article>
          <p className="eyebrow">Our purpose</p>
          <h2>Helpful, secure service</h2>
          <p>
            We use data to process purchases, provide support, improve our
            services and communicate where permitted.
          </p>
        </article>
        <article>
          <p className="eyebrow">Your control</p>
          <h2>Rights & choices</h2>
          <p>
            You can ask about the data we hold and exercise your privacy rights
            by contacting our team.
          </p>
        </article>
      </section>

      <section className="page-container section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">How we handle data</p>
            <h2>Processing with purpose</h2>
          </div>
        </div>
        <div className="service-grid">
          <article>
            <h2>What we process</h2>
            <p>
              This can include contact and account details, order and payment
              information, delivery details, support correspondence, and
              technical or usage information from our website.
            </p>
          </article>
          <article>
            <h2>Why & how long</h2>
            <p>
              We process data to fulfil contracts, meet legal obligations,
              protect our services, handle enquiries and, where appropriate,
              pursue our legitimate interests or rely on consent. We retain it
              only for as long as needed for these purposes or required by law.
            </p>
          </article>
          <article>
            <h2>Your rights</h2>
            <p>
              Subject to applicable law, you may request access, correction,
              deletion, restriction, portability or object to processing. You
              may also withdraw consent where processing is based on consent.
            </p>
          </article>
        </div>
      </section>

      <section className="page-container confirmation-page">
        <div className="checkout-disclosure">
          <strong>Privacy questions or requests</strong>
          <p>
            Email <a href="mailto:privacy@klikk.com.mt">privacy@klikk.com.mt</a>{" "}
            or call <a href="tel:80002750">8000 2750</a>. We may need to verify
            your identity before acting on a request.
          </p>
        </div>
      </section>
    </>
  );
}
