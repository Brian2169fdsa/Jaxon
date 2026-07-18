"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business } from "@/lib/site-data";

const links = [
  ["Services", "/services"],
  ["Detailing", "/detailing"],
  ["Our Work", "/work"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label={`${business.name} home`}>
            <Image src="/images/logo.png" alt={business.name} width={92} height={92} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : ""}>
                {label}
              </Link>
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
