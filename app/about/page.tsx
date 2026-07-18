import type { Metadata } from "next";
import Image from "next/image";
import { SectionCta } from "@/components/SectionCta";

export const metadata: Metadata = { title: "About", description: "Local property care rooted in Woodward County, Oklahoma." };

export default function AboutPage() {
  return (
    <>
      <section className="section section-white"><div className="shell about-hero"><div><p className="eyebrow">About Combs Land Management</p><h1>Local hands, doing honest work.</h1><p>CLM is a locally owned lawn care, cleanup, and property-transformation company serving Woodward and northwest Oklahoma. The idea is simple: show up, do great work, and treat every property like it is our own.</p></div><div className="about-image"><Image src="/images/home-hero.jpg" alt="Freshly maintained Oklahoma land" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></div></section>
      <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">What we’re about</p><h2>Simple standards. Better service.</h2></div><div className="values-grid">{[["Show up.", "We keep our schedule and our word."], ["Do it right.", "Clean cuts, sharp edges, and jobs finished all the way."], ["Keep it honest.", "Free, up-front quotes and fair pricing without surprises."], ["Take care of neighbors.", "We live and work here. Your reputation becomes ours too."]].map(([title, body]) => <article className="card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="section section-white"><div className="shell rooted-grid"><div><p className="eyebrow">Rooted in Woodward</p><h2>We live where we work.</h2><p>We are not a franchise routed in from a distant city. The properties we care for belong to neighbors, friends, local businesses, and landowners we see around town.</p><p>We understand the red dirt, Bermuda and fescue, wind, storm seasons, and fast-moving overgrowth that come with northwest Oklahoma.</p></div><div className="facts-panel">{[["Woodward, OK", "Locally based and locally owned"], ["Regional service", "Woodward and surrounding counties"], ["Homes to land", "Residential, commercial, and acreage"], ["Mon–Sat", "Responsive scheduling and straight answers"]].map(([stat, label]) => <div key={stat}><strong>{stat}</strong><span>{label}</span></div>)}</div></div></section>
      <section className="tagline-band"><p><span>Clearing.</span> Cleaning. <span>Transforming.</span></p></section>
      <SectionCta title="Let’s take something off your plate." />
    </>
  );
}
