import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { reviews } from "@/lib/site-data";

export const metadata: Metadata = { title: "Reviews", description: "What Woodward County customers say about Combs Land Management." };

export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="Trusted across Woodward County." body="People hire us to take something off their plate. They come back because we show up and do it right." />
      <section className="section section-white"><div className="shell review-grid review-grid-full">{reviews.map(([quote, name, town]) => <article className="review-card" key={name}><span className="stars">★★★★★</span><blockquote>“{quote}”</blockquote><div className="review-person"><span>{name.split(" ").map((part) => part[0]).join("")}</span><p>{name} · {town}</p></div></article>)}</div></section>
      <section className="section section-soft"><div className="narrow review-prompt"><div><h2>Had a great experience with CLM?</h2><p>A review helps neighbors find a local crew they can count on.</p></div><span className="button button-primary" aria-label="Review link coming soon">Review Link Coming Soon</span></div></section>
      <SectionCta title="Ready to join them?" />
    </>
  );
}
