"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, services } from "@/lib/site-data";

const links = [
  ["Services", "/services"],
  ["Detailing", "/detailing"],
  ["Our Work", "/work"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
] as const;

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
