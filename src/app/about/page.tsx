import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { STORES } from "@/lib/catalog/stores";

export const metadata: Metadata = {
  title: "Service & stores",
  description:
    "Klikk stores, service centre, warranty and delivery information.",
};

const STATS = [
  { figure: "2007", caption: "First store opened" },
  { figure: "2", caption: "Stores on the island" },
  { figure: "48h", caption: "Warranty diagnosis, quoted first" },
  { figure: "3yr", caption: "Maximum warranty available" },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-container about-hero">
        <h1>
          Two shops, one service centre, eighteen years<span>.</span>
        </h1>
        <p>
          Klikk opened in 2007 and has grown into one of Malta&rsquo;s leading
          retail IT companies. Everything we sell is stocked, serviced and
          warrantied on the island — Apple Authorised Reseller, Acer Authorised
          Service Centre, and in-house warranty work on everything that leaves
          the shop.
        </p>
      </section>

      <section
        className="page-container service-grid"
        id="stores"
        aria-label="Our stores"
      >
        {STORES.map((store) => (
          <article key={store.slug}>
            <div className="store-photo">
              <Image
                src={store.image}
                alt={`Klikk ${store.name}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="store-body">
              <p className="eyebrow">{store.kicker}</p>
              <h2>{store.name}</h2>
              <table className="store-table">
                <tbody>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{store.address}</td>
                  </tr>
                  <tr>
                    <th scope="row">Hours</th>
                    <td>{store.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>{store.phone}</td>
                  </tr>
                  <tr>
                    <th scope="row">On site</th>
                    <td>{store.onSite}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>

      <section
        className="page-container stat-strip"
        aria-label="Klikk in numbers"
      >
        {STATS.map((stat) => (
          <div key={stat.caption}>
            <p className="figure">{stat.figure}</p>
            <p className="caption">{stat.caption}</p>
          </div>
        ))}
      </section>

      <section className="page-container band band-ink" id="warranty">
        <div>
          <p className="eyebrow eyebrow-on-dark">Warranty claim</p>
          <h2>Bring it in with the invoice. We do the rest.</h2>
        </div>
        <div>
          <p>
            Every major brand, including ones we didn&rsquo;t sell. Diagnosis
            inside 48 hours and a quote before any work starts — no third-party
            courier, no waiting on a hotline in another country.
          </p>
          <Link className="button arrow" href="/shop">
            Browse the catalogue
          </Link>
        </div>
      </section>
    </>
  );
}
