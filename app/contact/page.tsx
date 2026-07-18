import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { business, towns } from "@/lib/site-data";

export const metadata: Metadata = { title: "Get a Free Quote", description: "Request a free property-care or detailing quote from Combs Land Management." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Let’s get to work" title="Get a free quote." body="Tell us about the property, what you need, and when you would like it handled. We’ll follow up with clear next steps." />
      <section className="section section-soft"><div className="shell contact-grid"><div className="form-card"><QuoteForm /></div><aside className="contact-aside"><p className="eyebrow eyebrow-light">Contact CLM</p><h2>Prefer to talk it through?</h2><a href={`tel:${business.phoneHref}`}>{business.phone}</a><a href={`mailto:${business.email}`}>{business.email}</a><hr /><h3>Service area</h3><p>{towns.slice(0, 5).join(" · ")} and nearby communities.</p><h3>Hours</h3><p>{business.hours}</p><div className="aside-note"><strong>Free estimates</strong><span>Residential · Commercial · Land</span></div></aside></div></section>
    </>
  );
}
