import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Klikk delivery, withdrawal and warranty terms.",
};

export default function TermsPage() {
  return (
    <>
      <section className="page-container about-hero">
        <p className="eyebrow">Buying with Klikk</p>
        <h1>Terms & conditions</h1>
        <p>
          Clear information for ordering, delivery, returns and warranty
          support.
        </p>
      </section>

      <section
        className="page-container service-grid"
        aria-label="Terms summary"
      >
        <article>
          <p className="eyebrow">Delivery</p>
          <h2>From order to door</h2>
          <p>
            Delivery arrangements, availability and timing are confirmed as part
            of your order. Please make sure the delivery details you provide are
            complete and accurate.
          </p>
        </article>
        <article>
          <p className="eyebrow">Withdrawal</p>
          <h2>15 days to decide</h2>
          <p>
            Consumers may withdraw from an eligible distance purchase within 15
            days, subject to the exclusions and conditions below.
          </p>
        </article>
        <article>
          <p className="eyebrow">Warranty</p>
          <h2>Support that lasts</h2>
          <p>
            Consumer purchases are covered by a two-year warranty. Business
            purchases, batteries and clearance items are covered for one year.
          </p>
        </article>
      </section>

      <section className="page-container section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The detail</p>
            <h2>Orders, returns & warranty</h2>
          </div>
        </div>
        <div className="service-grid">
          <article>
            <h2>Delivery</h2>
            <p>
              We aim to fulfil orders using the delivery or collection option
              selected at checkout. Delivery times are estimates and may depend
              on product availability, address access and circumstances outside
              our control.
            </p>
          </article>
          <article>
            <h2>Withdrawal & returns</h2>
            <p>
              To exercise the 15-day withdrawal right, notify Klikk within that
              period and return the item in the condition required for return.
              Proof of purchase may be requested.
            </p>
          </article>
          <article>
            <h2>Exclusions</h2>
            <p>
              Withdrawal and warranty cover do not apply to every issue or
              product. Exclusions include damage caused by misuse, accidents,
              unauthorised repairs, normal wear, or failure to follow product
              instructions. Hygiene-sensitive, personalised or otherwise
              non-returnable goods may also be excluded where applicable.
            </p>
          </article>
        </div>
      </section>

      <section className="page-container confirmation-page">
        <div className="checkout-disclosure">
          <strong>Need help with an order?</strong>
          <p>
            Keep your order information handy when contacting the Klikk support
            team so we can help you quickly.
          </p>
        </div>
      </section>
    </>
  );
}
