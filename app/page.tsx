import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { SectionCta } from "@/components/SectionCta";
import { business, reviews, services, towns } from "@/lib/site-data";

const steps = [
  ["01", "Tell us about the property", "Send the address, what you need, and a couple of photos if you have them."],
  ["02", "Get a clear, honest quote", "We look it over and give you straight, up-front pricing with no pressure."],
  ["03", "We show up and get it done", "Clean, on time, and finished right. You come home to a handled property."],
];

const why = [
  ["Locally owned", "You’re hiring a neighbor who understands northwest Oklahoma properties."],
  ["One crew, whole property", "From mowing to clearing to detailing, it all stays under one roof."],
  ["Reliable by default", "Clear schedules, straight answers, and follow-through every time."],
  ["Homes to acreage", "Residential, commercial, rentals, and land—small jobs and big resets."],
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image src="/images/home-hero.jpg" alt="A freshly mowed Oklahoma property" fill priority sizes="100vw" />
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <p className="eyebrow eyebrow-light">Property care · Woodward County, Oklahoma</p>
          <h1>The cleanest property on the block starts here.</h1>
          <p className="hero-copy">Lawn mowing, garden beds, yard cleanup, and brush clearing for homes, businesses, and land. One local crew for the whole property.</p>
          <div className="button-row">
            <Link href="/contact" className="button button-primary">Get a Free Quote</Link>
            <a href={`tel:${business.phoneHref}`} className="button button-white">Call {business.phone}</a>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          {["Locally owned", "Free estimates", "Residential & commercial", "Fully insured"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="section section-white">
        <div className="shell service-quick-grid">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <span className="blue-rule" />
              <h3>{service.shortTitle}</h3>
              <p>{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Sound familiar?</p>
              <h2>From overgrown and behind—to clean, sharp, and handled.</h2>
            </div>
            <p>Property work piles up fast. CLM brings the crew, equipment, and follow-through to reset the whole place.</p>
          </div>
          <div className="problem-grid">
            <article className="card problem-card">
              <p className="card-label muted">The problem</p>
              {["Grass gets ahead every week", "Beds lose their edges and fill with weeds", "Storm debris becomes a permanent pile", "Brush turns usable land into a jungle"].map((item) => <p key={item}><span>—</span>{item}</p>)}
            </article>
            <article className="card answer-card">
              <p className="card-label">The CLM answer</p>
              {["Reliable service on a schedule", "Crisp edges and finished beds", "Debris hauled away for good", "Overgrowth cleared back to usable ground"].map((item) => <p key={item}><span>✓</span>{item}</p>)}
            </article>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>One crew for the whole property.</h2>
            <p>Routine care, seasonal resets, and heavy overgrowth—all handled with the same attention to detail.</p>
          </div>
          <div className="service-card-grid">
            {services.map((service, index) => (
              <Link className={`service-card service-art-${index + 1}`} href={`/services/${service.slug}`} key={service.slug}>
                <div className="service-card-art"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="service-card-copy">
                  <p className="eyebrow">{service.eyebrow}</p>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <strong>Learn more <span>→</span></strong>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/detailing" className="detailing-link-card">
            <span>Also keeping cars and trucks sharp</span>
            <strong>Explore Auto & Truck Detailing →</strong>
          </Link>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Simple process</p>
            <h2>Easy to start. Done right.</h2>
          </div>
          <div className="steps-grid">
            {steps.map(([number, title, body]) => (
              <article className="card step-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-band section">
        <div className="shell work-band-grid">
          <div>
            <p className="eyebrow eyebrow-light">See the difference</p>
            <h2>The before-and-after says it all.</h2>
            <p>From shaggy to sharp and overgrown to open, see what a CLM visit does for a property.</p>
            <Link href="/work" className="button button-white">View Our Work</Link>
          </div>
          <div className="before-after-teaser">
            <div className="teaser-image before"><span>Before</span></div>
            <div className="teaser-image after"><span>After</span></div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Why people call us</p>
            <h2>Local, dependable, and easy to work with.</h2>
          </div>
          <div className="why-grid">
            {why.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell detailing-feature">
          <div>
            <p className="eyebrow">More than lawns</p>
            <h2>Keep your ride as sharp as your property.</h2>
            <p>Full interior and exterior detailing for cars, trucks, and small work fleets. Same local crew, same attention to detail.</p>
            <Link href="/detailing" className="button button-dark">See Detailing</Link>
          </div>
          <Image src="/images/home-detailing.jpg" alt="A professionally detailed black truck" width={1200} height={675} sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
      </section>

      <section className="section section-white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">What people are saying</p>
            <h2>Trusted across Woodward County.</h2>
          </div>
          <div className="review-grid">
            {reviews.slice(0, 3).map(([quote, name, town]) => (
              <article className="review-card" key={name}><span className="stars">★★★★★</span><blockquote>“{quote}”</blockquote><p>{name} · {town}</p></article>
            ))}
          </div>
          <Link href="/reviews" className="text-link">Read more reviews →</Link>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell area-grid">
          <div>
            <p className="eyebrow">Where we work</p>
            <h2>Proudly serving northwest Oklahoma.</h2>
            <p>Based in Woodward and serving nearby homes, businesses, and land. If you are close, ask—we will tell you straight.</p>
            <div className="town-list">{towns.map((town) => <span key={town}>{town}</span>)}</div>
          </div>
          <iframe title="Woodward County service area" src="https://www.google.com/maps?q=Woodward+County,+Oklahoma&z=9&output=embed" loading="lazy" />
        </div>
      </section>

      <section className="section section-white">
        <div className="narrow">
          <div className="section-heading">
            <p className="eyebrow">Common questions</p>
            <h2>Good to know before we start.</h2>
          </div>
          <Faq />
        </div>
      </section>

      <SectionCta />
    </>
  );
}
