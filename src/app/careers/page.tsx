import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build your career with the team at Klikk.",
};

export default function CareersPage() {
  return (
    <>
      <section className="page-container about-hero">
        <p className="eyebrow">Where technology meets opportunity</p>
        <h1>Grow with Klikk</h1>
        <p>
          We are a team of passionate people in a fast-paced, innovative
          environment, helping customers make technology work for everyday life.
        </p>
      </section>

      <section className="page-container service-grid" aria-label="Our culture">
        <article>
          <p className="eyebrow">Customer focus</p>
          <h2>Make every interaction count</h2>
          <p>
            We put helpful, meaningful customer experiences at the centre of
            what we do.
          </p>
        </article>
        <article>
          <p className="eyebrow">Teamwork & growth</p>
          <h2>Learn together</h2>
          <p>
            We share ideas, recognise talent and create room to develop within
            Klikk and the wider GO group.
          </p>
        </article>
        <article>
          <p className="eyebrow">Reliability</p>
          <h2>Own the outcome</h2>
          <p>
            We value energy, a positive attitude and people who follow through
            for their colleagues and customers.
          </p>
        </article>
      </section>

      <section className="page-container section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Perks & benefits</p>
            <h2>Support for work and life</h2>
          </div>
        </div>
        <div className="service-grid">
          <article>
            <h2>Everyday support</h2>
            <p>
              Unlimited GO services, hybrid and flexible work where the role
              allows, and private health insurance.
            </p>
          </article>
          <article>
            <h2>Wellbeing</h2>
            <p>
              Paid private therapy sessions with the Richmond Foundation, paid
              pregnancy-loss leave, and a learning and wellness budget.
            </p>
          </article>
          <article>
            <h2>Recognition & development</h2>
            <p>
              Training, growth and development opportunities, plus employee
              recognition for work that makes a difference.
            </p>
          </article>
        </div>
      </section>

      <section className="page-container section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recruitment process</p>
            <h2>What to expect</h2>
          </div>
        </div>
        <div className="service-grid">
          <article>
            <p className="eyebrow">01</p>
            <h2>Apply online</h2>
            <p>Send your CV and tell us why the opportunity interests you.</p>
          </article>
          <article>
            <p className="eyebrow">02–03</p>
            <h2>Screening & interview</h2>
            <p>
              We begin with a short screening call, then invite suitable
              candidates to meet the hiring team virtually or in person.
            </p>
          </article>
          <article>
            <p className="eyebrow">04</p>
            <h2>Offer call</h2>
            <p>
              Your People Partner talks through the contract, benefits and what
              to expect in your first days.
            </p>
          </article>
        </div>
      </section>

      <section className="page-container confirmation-page">
        <div className="checkout-disclosure">
          <strong>Interested in joining us?</strong>
          <p>
            Send your CV to{" "}
            <a href="mailto:vacancy@klikk.com.mt">vacancy@klikk.com.mt</a>. We
            welcome applications for current and future opportunities.
          </p>
        </div>
      </section>
    </>
  );
}
