import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://combslandmanagement.com";
  const pages = ["", "/services", "/detailing", "/work", "/about", "/reviews", "/contact"];
  return [...pages, ...services.map((service) => `/services/${service.slug}`)].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" }));
}
