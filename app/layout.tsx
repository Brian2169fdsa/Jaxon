import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { business } from "@/lib/site-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://combslandmanagement.com"),
  title: { default: `${business.name} | Woodward County, Oklahoma`, template: `%s | ${business.name}` },
  description: "Lawn mowing, garden beds, yard cleanup, brush clearing, and detailing across Woodward County, Oklahoma.",
  openGraph: {
    title: business.name,
    description: "Clearing. Cleaning. Transforming. Local property care across northwest Oklahoma.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: "Clearing. Cleaning. Transforming. Local property care across northwest Oklahoma.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    areaServed: business.location,
    telephone: business.phone,
    email: business.email,
    image: "https://combslandmanagement.com/images/logo.png",
  };

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
