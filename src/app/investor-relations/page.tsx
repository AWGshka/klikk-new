import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor relations",
  description: "Company profile and investor documents from Klikk.",
};

export default function InvestorRelationsPage() {
  return (
    <>
      <section className="page-container about-hero">
        <p className="eyebrow">Investor relations</p>
        <h1>Information for investors</h1>
        <p>
          A central place for company information, financial reporting and
          market announcements.
        </p>
      </section>

      <section
        className="page-container service-grid"
        aria-label="Investor overview"
      >
        <article>
          <p className="eyebrow">Company profile</p>
          <h2>Klikk at a glance</h2>
          <p>
            Explore the company profile and the role Klikk plays in Malta’s
            technology and electronics retail landscape.
          </p>
        </article>
        <article>
          <p className="eyebrow">Financial reporting</p>
          <h2>Performance & progress</h2>
          <p>
            Find financial reports and interim updates that provide a clear view
            of company performance.
          </p>
        </article>
        <article>
          <p className="eyebrow">Announcements</p>
          <h2>Stay informed</h2>
          <p>
            Review company announcements and updates relevant to investors and
            the wider market.
          </p>
        </article>
      </section>

      <section className="page-container section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Document hub</p>
            <h2>Investor resources</h2>
          </div>
        </div>
        <div className="service-grid">
          <article>
            <h2>Financial reports</h2>
            <p>
              Annual financial reports and related disclosures for a detailed
              view of the company’s results and position.
            </p>
          </article>
          <article>
            <h2>Interim reports</h2>
            <p>
              Periodic financial updates and interim reporting to follow
              progress throughout the year.
            </p>
          </article>
          <article>
            <h2>Company announcements</h2>
            <p>
              Formal announcements, notices and other communications for the
              investor community.
            </p>
          </article>
        </div>
      </section>

      <section className="page-container confirmation-page">
        <div className="checkout-disclosure">
          <strong>Looking for a specific document?</strong>
          <p>
            The document hub is organised by report type to make investor
            information easy to locate and review.
          </p>
        </div>
      </section>
    </>
  );
}
