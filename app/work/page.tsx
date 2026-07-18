import type { Metadata } from "next";
import { BeforeAfter } from "@/components/BeforeAfter";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";

export const metadata: Metadata = { title: "Our Work", description: "Before-and-after property transformations from Combs Land Management." };

const projects = [
  ["Lawn & Mowing", "Residential mow, trim, and edge", "Woodward, OK"],
  ["Garden Beds", "Bed refresh and fresh mulch", "Woodward, OK"],
  ["Yard Cleanup", "Storm limb and debris haul-off", "Woodward County"],
  ["Brush Clearing", "Overgrown fence line reclaimed", "Woodward County"],
  ["Detailing", "Full interior and exterior detail", "Woodward, OK"],
];

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="See what a CLM visit does." body="The best way to understand the work is to see the transformation. Drag each handle to compare the before and after." />
      <section className="section section-white"><div className="shell work-grid">{projects.map(([category, title, location], index) => <article key={title}><BeforeAfter variant={index} /><p className="eyebrow">{category}</p><h3>{title}</h3><p>{location}</p></article>)}</div></section>
      <SectionCta title="Want results like these?" />
    </>
  );
}
