import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { business, services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.website;
  const pages = ["", "/services", "/detailing", "/work", "/about", "/reviews", "/contact"];

  return [
    ...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : .8 })),
    ...services.map((service) => ({ url: `${base}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    { url: `${base}/blog`, changeFrequency: "weekly" as const, priority: .8 },
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(`${post.published}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: .7,
    })),
  ];
}
