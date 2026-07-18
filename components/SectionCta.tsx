import Link from "next/link";
import { business } from "@/lib/site-data";

export function SectionCta({
  title = "Ready for a property that feels handled?",
  body = "Tell us what you need and we’ll get you a free, honest quote.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section-cta">
      <div className="narrow center">
        <p className="eyebrow eyebrow-light">Ready when you are</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="button-row center-row">
          <Link className="button button-white" href="/contact">Get a Free Quote</Link>
          <a className="button button-ghost" href={`tel:${business.phoneHref}`}>Call {business.phone}</a>
        </div>
      </div>
    </section>
  );
}
