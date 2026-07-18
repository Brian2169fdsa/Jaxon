import Link from "next/link";
import { SectionCta } from "@/components/SectionCta";
import { business, towns, type Service } from "@/lib/site-data";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <section className={`service-detail-hero service-hero-${service.slug}`}>
        <div className="shell service-hero-grid">
          <div>
            <p className="eyebrow eyebrow-light">{service.eyebrow}</p>
            <h1>{service.title} in Woodward County</h1>
            <p>{service.description} Built for the weather, grass, and ground we know here.</p>
            <div className="button-row">
              <Link href="/contact" className="button button-primary">Get a Free Quote</Link>
              <a href={`tel:${business.phoneHref}`} className="button button-ghost">Call {business.phone}</a>
            </div>
          </div>
          <div className="service-number" aria-hidden="true">{service.shortTitle.split(" ").map((word) => word[0]).join("")}</div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell service-included-grid">
          <div>
            <p className="eyebrow">What’s included</p>
            <h2>A complete visit—not half a job.</h2>
            <p>Every property is different, but our standard is the same: clear expectations, careful work, and a clean final pass.</p>
          </div>
          <ul className="check-list">
            {service.included.map((item) => <li key={item}><span>✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell two-card-grid">
          <article className="card"><p className="eyebrow">Who it’s for</p><h3>Properties that need dependable attention.</h3><p>{service.who}</p></article>
          <article className="card card-blue"><p className="eyebrow eyebrow-light">Why CLM</p><h3>Local equipment. Local accountability.</h3><p>{service.why}</p></article>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Built for this part of Oklahoma</p>
            <h2>{service.localTitle}</h2>
            <p>{service.localBody}</p>
          </div>
          <div className="local-points-grid">
            {service.points.map(([title, body]) => <article key={title}><span /><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="service-area-strip">
        <div className="shell">
          <strong>Where we work</strong>
          <div className="town-list">{towns.map((town) => <span key={town}>{town}</span>)}</div>
        </div>
      </section>
      <SectionCta title={`Ready to schedule ${service.shortTitle.toLowerCase()}?`} />
    </>
  );
}
