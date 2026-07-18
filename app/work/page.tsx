import type { Metadata } from "next";
import { BeforeAfter } from "@/components/BeforeAfter";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";

export const metadata: Metadata = { title: "Our Work", description: "Before-and-after property transformations from Combs Land Management." };

const projects = [
  ["Lawn & Mowing", "Residential mow, trim, and edge", "Woodward, OK", "/images/work/lawn-before.jpg", "/images/work/lawn-after.jpg"],
  ["Garden Beds", "Bed refresh and fresh mulch", "Woodward, OK", "/images/work/garden-before.jpg", "/images/work/garden-after.jpg"],
  ["Yard Cleanup", "Storm limb and debris haul-off", "Woodward County", "/images/work/cleanup-before.jpg", "/images/work/cleanup-after.jpg"],
  ["Brush Clearing", "Overgrown fence line reclaimed", "Woodward County", "/images/work/brush-before.jpg", "/images/work/brush-after.jpg"],
  ["Detailing", "Full exterior detail", "Woodward, OK", "/images/work/detail-before.jpg", "/images/work/detail-after.jpg"],
];

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="See what a CLM visit does." body="The best way to understand the work is to see the transformation. Drag each handle to compare the before and after." />
      <section className="section section-white"><div className="shell work-grid">{projects.map(([category, title, location, before, after]) => <article key={title}><BeforeAfter before={before} after={after} beforeAlt={`${title} before service`} afterAlt={`${title} after service`} /><p className="eyebrow">{category}</p><h3>{title}</h3><p>{location}</p></article>)}</div></section>
      <SectionCta title="Want results like these?" />
    </>
  );
}
