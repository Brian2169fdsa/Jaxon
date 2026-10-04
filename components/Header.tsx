"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import mustangDetailImage from "../Cinematic Red Mustang in Wet Garage.png";
import { blogPosts } from "@/lib/blog-data";
import { business, reviews, services, towns } from "@/lib/site-data";

const links = [
  ["Services", "/services"],
  ["Detailing", "/detailing"],
  ["Our Work", "/work"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
] as const;

const detailingCards = [
  ["Interior & Exterior", "Clean daily drivers, work trucks, and small fleets.", "/detailing", mustangDetailImage, "Cinematic red Mustang after a professional detail"],
  ["Quote a Detail", "Send the vehicle and service details for a free estimate.", "/contact", "/images/detailing-truck.jpg", "Professionally detailed black pickup truck"],
] as const;

const workCards = [
  ["Lawn & Mowing", "See mowing, trimming, and edging transformations.", "/work", "/images/work/lawn-after.jpg", "Freshly mowed lawn after service"],
  ["Garden Beds", "Fresh mulch, cleaned beds, and crisp borders.", "/work", "/images/work/garden-after.jpg", "Clean garden bed after service"],
  ["Cleanup", "Storm debris and yard waste cleared away.", "/work", "/images/work/cleanup-after.jpg", "Clean yard after debris removal"],
  ["Brush Clearing", "Overgrowth opened back up into usable ground.", "/work", "/images/work/brush-after.jpg", "Fence line opened after brush clearing"],
] as const;

const aboutCards = [
  ["Local Crew", "Based in Woodward and built for northwest Oklahoma properties.", "/about", "/images/about-crew.jpg", "Combs Land Management crew"],
  ["Ready to Roll", "One crew for mowing, cleanup, beds, brush, and detailing.", "/about", "/images/clm-work-truck.jpg", "Combs Land Management work truck"],
] as const;

const reviewImages = [
  "/images/reviews/sarah-m.png",
  "/images/reviews/dale-t.png",
  "/images/reviews/rachel-k.png",
  "/images/reviews/mike-d.svg",
] as const;

const reviewCards = reviews.slice(0, 4).map(([quote, name, town], index) => [
  name,
  `${quote} - ${town}`,
  "/reviews",
  reviewImages[index],
  `${name} customer portrait illustration`,
] as const);

const blogCards = blogPosts.slice(0, 4).map((post) => [post.title, post.description, `/blog/${post.slug}`, post.image, post.imageAlt] as const);

const contactCards = [
  ["Call CLM", business.phone, `tel:${business.phoneHref}`, "/images/logo.png", `${business.name} logo`],
  ["Request a Quote", "Tell us about the property and what needs done.", "/contact", "/images/clm-work-truck.jpg", "Combs Land Management work truck"],
] as const;

type MegaCard = readonly [string, string, string, string | StaticImageData, string];

const megaContent = {
  Detailing: {
    eyebrow: "Auto & truck detailing",
    title: "Keep the vehicle as sharp as the property.",
    body: "Interior and exterior detailing for daily drivers, work trucks, and small fleets.",
    href: "/detailing",
    cta: "Explore detailing",
    cards: detailingCards satisfies readonly MegaCard[],
  },
  "Our Work": {
    eyebrow: "Before and after",
    title: "See the property transformations.",
    body: "Compare finished work across lawns, beds, cleanup, brush clearing, and detailing.",
    href: "/work",
    cta: "View the gallery",
    cards: workCards,
  },
  About: {
    eyebrow: "About CLM",
    title: "A local crew built around follow-through.",
    body: `Serving ${towns.slice(0, 5).join(", ")} and nearby communities with practical property care.`,
    href: "/about",
    cta: "Meet the crew",
    cards: aboutCards,
  },
  Reviews: {
    eyebrow: "Customer feedback",
    title: "Trusted across Woodward County.",
    body: "Read what local homeowners, landowners, and businesses say about the work.",
    href: "/reviews",
    cta: "Read reviews",
    cards: reviewCards,
  },
  Blog: {
    eyebrow: "Field notes",
    title: "Local property advice for Oklahoma weather.",
    body: "Browse lawn care, cleanup, landscaping, brush clearing, and detailing guides.",
    href: "/blog",
    cta: "Read the blog",
    cards: blogCards,
  },
  Contact: {
    eyebrow: "Start here",
    title: "Call or send the quote details.",
    body: "Share the address, the service you need, and photos if you have them.",
    href: "/contact",
    cta: "Get a free quote",
    cards: contactCards,
  },
} as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function renderMega(label: keyof typeof megaContent) {
    const item = megaContent[label];

    return (
      <div className="mega-menu">
        <div className="mega-menu-intro">
          <p className="eyebrow">{item.eyebrow}</p>
          <strong>{item.title}</strong>
          <span>{item.body}</span>
          <Link href={item.href}>{item.cta}</Link>
        </div>
        <div className="mega-link-grid">
          {item.cards.map(([title, body, href, image, imageAlt]) => (
            <Link className="mega-image-card" href={href} key={`${label}-${title}`}>
              <span className="mega-service-image">
                <Image src={image} alt={imageAlt} fill sizes="260px" />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{body}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label={`${business.name} home`}>
            <Image src="/images/logo-nav.jpg" alt={business.name} width={120} height={95} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              label === "Services" ? (
                <div className="nav-mega" key={href}>
                  <Link href={href} className={pathname.startsWith(href) ? "nav-mega-trigger active" : "nav-mega-trigger"}>
                    {label}
                  </Link>
                  <div className="mega-menu">
                    <div className="mega-menu-intro">
                      <p className="eyebrow">Property services</p>
                      <strong>One local crew for the whole property.</strong>
                      <span>Lawn care, cleanup, beds, and brush clearing across northwest Oklahoma.</span>
                      <Link href="/services">View all services</Link>
                    </div>
                    <div className="mega-service-grid">
                      {services.map((service) => (
                        <Link className="mega-service-card" href={`/services/${service.slug}`} key={service.slug}>
                          <span className="mega-service-image">
                            <Image src={service.image} alt={service.title} fill sizes="190px" />
                          </span>
                          <span>
                            <strong>{service.shortTitle}</strong>
                            <small>{service.description}</small>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : label in megaContent ? (
                <div className="nav-mega" key={href}>
                  <Link href={href} className={pathname.startsWith(href) ? "nav-mega-trigger active" : "nav-mega-trigger"}>
                    {label}
                  </Link>
                  {renderMega(label as keyof typeof megaContent)}
                </div>
              ) : (
                <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : ""}>
                  {label}
                </Link>
              )
            ))}
          </nav>
          <div className="header-actions">
            <a className="button button-outline header-call" href={`tel:${business.phoneHref}`}>
              Call {business.phone}
            </a>
            <Link className="button button-primary" href="/contact">Get a Free Quote</Link>
          </div>
          <button
            className={open ? "menu-button open" : "menu-button"}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {open && (
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <a href={`tel:${business.phoneHref}`}>Call {business.phone}</a>
          </nav>
        )}
      </header>
      <div className="mobile-action-bar">
        <a href={`tel:${business.phoneHref}`}>Call</a>
        <Link href="/contact">Get a Free Quote</Link>
      </div>
    </>
  );
}
