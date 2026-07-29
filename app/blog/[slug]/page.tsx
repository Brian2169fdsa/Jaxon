import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionCta } from "@/components/SectionCta";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/blog-data";
import { business } from "@/lib/site-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published,
      authors: [business.name],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        image: `${business.website}${post.image}`,
        datePublished: post.published,
        dateModified: post.published,
        author: { "@type": "Organization", name: business.name, url: business.website },
        publisher: { "@type": "Organization", name: business.name, url: business.website },
        mainEntityOfPage: `${business.website}/blog/${post.slug}`,
        about: post.keywords,
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <article>
        <header className="blog-article-hero">
          <div className="narrow">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>{post.category}</span>
            </nav>
            <p className="eyebrow eyebrow-light">{post.category}</p>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div className="blog-meta blog-meta-light"><time dateTime={post.published}>{formatDate(post.published)}</time><span>{post.readTime}</span><span>By {business.name}</span></div>
          </div>
        </header>

        <div className="blog-article-image shell">
          <Image src={post.image} alt={post.imageAlt} fill loading="eager" fetchPriority="high" sizes="(max-width: 800px) 100vw, 1200px" />
        </div>

        <section className="section section-white blog-article-section">
          <div className="shell blog-article-layout">
            <div className="blog-article-body">
              <p className="blog-lead">{post.lead}</p>

              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}

              <section className="blog-tip-box">
                <p className="eyebrow">Quick checklist</p>
                <h2>Put these tips to work.</h2>
                <ul>{post.tips.map((tip) => <li key={tip}><span>✓</span>{tip}</li>)}</ul>
              </section>

              <section className="blog-clm-note">
                <p className="eyebrow eyebrow-light">How CLM can help</p>
                <h2>Local work with a clear finish.</h2>
                <p>{post.clmNote}</p>
                <Link href="/contact" className="button button-white">Get a Free Quote</Link>
              </section>

              <section>
                <p className="eyebrow">Common questions</p>
                <h2>Good to know.</h2>
                <div className="blog-faq">
                  {post.faq.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}
                </div>
              </section>

              {post.source && <p className="blog-source">For additional research-based Oklahoma guidance, visit <a href={post.source.url} target="_blank" rel="noreferrer">{post.source.label}</a>.</p>}
            </div>

            <aside className="blog-article-aside">
              <div>
                <p className="eyebrow">Need a hand?</p>
                <h2>Let Combs Land Management handle it.</h2>
                <p>Free estimates for homes, businesses, rentals, and land across Woodward County.</p>
                <Link href="/contact" className="button button-primary">Request a Quote</Link>
                <a href={`tel:${business.phoneHref}`}>Call {business.phone}</a>
              </div>
              <nav aria-label="Related services">
                <strong>Explore services</strong>
                <Link href="/services/lawn-mowing">Lawn mowing</Link>
                <Link href="/services/garden-beds">Garden beds</Link>
                <Link href="/services/yard-cleanup">Yard cleanup</Link>
                <Link href="/services/brush-clearing">Brush clearing</Link>
                <Link href="/detailing">Auto and truck detailing</Link>
              </nav>
            </aside>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">Keep reading</p>
              <h2>More advice for Woodward properties.</h2>
            </div>
            <div className="blog-related-grid">
              {relatedPosts.map((related) => (
                <Link href={`/blog/${related.slug}`} key={related.slug}>
                  <div><Image src={related.image} alt={related.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
                  <span>{related.category}</span>
                  <h3>{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <SectionCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
