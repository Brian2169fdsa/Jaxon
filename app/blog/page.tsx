import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionCta } from "@/components/SectionCta";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Woodward Property Care Blog",
  description: "Practical lawn care, landscaping, cleanup, brush clearing, and detailing advice from Combs Land Management in Woodward, Oklahoma.",
  alternates: { canonical: "/blog" },
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  return (
    <>
      <PageHero
        eyebrow="CLM Field Notes"
        title="Practical property advice for northwest Oklahoma."
        body="Straightforward lawn, landscape, cleanup, brush, and detailing guidance from Combs Land Management in Woodward."
      />

      <section className="section section-white">
        <div className="shell">
          <div className="blog-category-list" aria-label="Blog topics">
            {categories.map((category) => <span key={category}>{category}</span>)}
          </div>

          <Link href={`/blog/${featured.slug}`} className="blog-featured">
            <div className="blog-featured-image">
              <Image src={featured.image} alt={featured.imageAlt} fill loading="eager" fetchPriority="high" sizes="(max-width: 800px) 100vw, 58vw" />
            </div>
            <div className="blog-featured-copy">
              <p className="eyebrow">Featured · {featured.category}</p>
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <div className="blog-meta"><time dateTime={featured.published}>{formatDate(featured.published)}</time><span>{featured.readTime}</span></div>
              <strong>Read the guide <span>→</span></strong>
            </div>
          </Link>

          <div className="section-heading blog-grid-heading">
            <p className="eyebrow">Latest advice</p>
            <h2>Built for Woodward weather, land, and everyday life.</h2>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="blog-card-image" aria-label={`Read ${post.title}`}>
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span>{post.category}</span>
                </Link>
                <div className="blog-card-copy">
                  <div className="blog-meta"><time dateTime={post.published}>{formatDate(post.published)}</time><span>{post.readTime}</span></div>
                  <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.description}</p>
                  <Link href={`/blog/${post.slug}`} className="text-link">Read article →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionCta title="Need help with the property, not just advice?" body="Show Combs Land Management what you are dealing with and get a free, honest quote." />
    </>
  );
}
