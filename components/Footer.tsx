import Image from "next/image";
import Link from "next/link";
import { business, services } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <Image src="/images/logo.png" alt={business.name} width={132} height={132} />
          </Link>
          <strong>{business.tagline}</strong>
          <p>Local property care for homes, businesses, and land across northwest Oklahoma.</p>
        </div>
        <div>
          <h3>Services</h3>
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>{service.shortTitle}</Link>
          ))}
          <Link href="/detailing">Auto & Truck Detailing</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/about">About</Link>
          <Link href="/work">Our Work</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/contact">Get a Quote</Link>
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <p>{business.location}</p>
          <p>{business.hours}</p>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} {business.name}</span>
        <span>Free estimates · Fully insured · Residential & commercial</span>
      </div>
    </footer>
  );
}
