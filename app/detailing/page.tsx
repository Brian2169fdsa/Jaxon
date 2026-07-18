import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionCta } from "@/components/SectionCta";
import { business } from "@/lib/site-data";

export const metadata: Metadata = { title: "Auto & Truck Detailing", description: "Interior and exterior auto and truck detailing in Woodward, Oklahoma." };

export default function DetailingPage() {
  return (
    <>
      <section className="detailing-hero">
        <Image src="/images/detailing-truck.jpg" alt="Professionally detailed black pickup truck" fill priority sizes="100vw" />
        <div className="detailing-overlay" />
        <div className="shell hero-content">
          <p className="eyebrow eyebrow-light">Auto & truck detailing</p>
          <h1>Bring back that clean, sharp, fresh truck feeling.</h1>
          <p>Full interior and exterior detailing for daily drivers, work trucks, and small fleets across Woodward County.</p>
          <div className="button-row"><Link href="/contact" className="button button-primary">Get a Detailing Quote</Link><a href={`tel:${business.phoneHref}`} className="button button-ghost">Call {business.phone}</a></div>
        </div>
      </section>
      <section className="section section-white">
        <div className="shell two-card-grid">
          <article className="card checklist-card"><p className="eyebrow">Exterior</p><h2>Clean, protected, finished.</h2>{["Hand wash and dry", "Wheels, tires, and trim", "Wax or protective finish", "Windows and mirrors"].map((item) => <p key={item}><span>✓</span>{item}</p>)}</article>
          <article className="card checklist-card"><p className="eyebrow">Interior</p><h2>Reset the whole cabin.</h2>{["Seats, carpets, mats, and trunk vacuumed", "Dash, console, doors, and surfaces cleaned", "Interior glass polished", "Freshen and deodorize"].map((item) => <p key={item}><span>✓</span>{item}</p>)}</article>
        </div>
      </section>
      <section className="section section-soft"><div className="shell package-grid"><div><p className="eyebrow">Who it’s for</p><h2>Daily drivers to working fleets.</h2><p>Bring us the vehicle that works hard, carries the family, represents the business, or simply deserves a reset.</p></div><div className="package-panel"><p className="eyebrow eyebrow-light">Packages</p><h3>Pricing built around the vehicle.</h3><p>Vehicle size, condition, and service level affect the quote. Tell us what you drive and what it needs for clear pricing.</p><Link href="/contact" className="button button-white">Request Pricing</Link></div></div></section>
      <section className="section section-white"><div className="shell"><div className="section-heading"><p className="eyebrow">Made for Oklahoma roads</p><h2>Dust, mud, work, and weather are all part of the assignment.</h2></div><div className="local-points-grid">{[["Work trucks & farm rigs", "Gravel road dust and jobsite mud get a full interior and exterior reset."], ["Daily drivers", "Make the car or truck you live in every day feel new again."], ["Small fleets", "Keep business vehicles clean and professional with options for multiple vehicles."]].map(([title, body]) => <article key={title}><span /><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <SectionCta title="Ready to reset your ride?" body="Tell us the vehicle, its condition, and the level of detail you want." />
    </>
  );
}
