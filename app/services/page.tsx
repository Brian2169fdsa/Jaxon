import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Property Services",
  description: "Lawn mowing, garden beds, yard cleanup, brush clearing, and detailing in Woodward County, Oklahoma.",
};

const seasons = [
  ["Spring", "Green-up mowing, bed cleanup and mulch, plus winter debris and storm cleanup."],
  ["Summer", "Consistent mowing at the right height, bed upkeep, and clean edging all season."],
  ["Fall", "Leaves and debris hauled off, a final cut, and beds buttoned up before winter."],
  ["Anytime", "Brush clearing, overgrowth removal, and auto or truck detailing when you need it."],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Everything your property needs—handled by one local crew." body="From a weekly mow to reclaiming an overgrown back lot, CLM keeps homes, businesses, and land clean, sharp, and usable." />
      <section className="section section-white">
        <div className="shell service-card-grid">
          {services.map((service, index) => (
            <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
              <div className="service-card-art"><Image src={service.image} alt={service.title} fill sizes="(max-width: 560px) 100vw, (max-width: 1080px) 50vw, 25vw" /><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="service-card-copy"><p className="eyebrow">{service.eyebrow}</p><h2>{service.title}</h2><p>{service.description}</p><strong>Learn more →</strong></div>
            </Link>
          ))}
        </div>
        <Link href="/detailing" className="services-detailing-card shell-inset">
          <div><p className="eyebrow">Also</p><h2>Auto & Truck Detailing</h2><p>Full interior and exterior detailing for daily drivers, work trucks, and small fleets.</p><strong>See detailing →</strong></div>
          <Image src="/images/detailing-truck.jpg" alt="Detailed black pickup truck" width={1672} height={941} />
        </Link>
      </section>
      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">Made for northwest Oklahoma</p><h2>One call handles the whole property—through every season.</h2><p>Instead of juggling separate crews, you get one local team that knows the ground and follows through.</p></div>
          <div className="season-grid">{seasons.map(([season, body]) => <article className="card" key={season}><p className="eyebrow">{season}</p><p>{body}</p></article>)}</div>
        </div>
      </section>
      <SectionCta title="Not sure what you need?" body="Show us the property and we’ll help you figure out the smartest next step." />
    </>
  );
}
