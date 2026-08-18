import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Prose } from "@/components/ui/prose";
import { Container, Section } from "@/components/ui/section";
import { articleSlugs, formatArticleDate, getArticle } from "@/content/insights";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

/** params is a Promise in Next 16 — use the generated PageProps helper. */
export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  // Static prefix keeps the dynamic import bounded to this directory.
  const { default: Body } = await import(`@/content/insights/${slug}.mdx`);

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        date={article.date}
        slug={article.slug}
      />
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        intro={
          <span className="text-sm text-ink-500">
            {formatArticleDate(article.date)} · {article.readingMinutes} min read
          </span>
        }
      />

      <Section>
        <Container>
          <div className="mb-14 overflow-hidden rounded-card bg-ink-100">
            <Image
              src={article.cover}
              alt=""
              placeholder="blur"
              priority
              sizes="100vw"
              className="aspect-21/9 size-full object-cover"
            />
          </div>

          <Prose>
            <Body />
          </Prose>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink-200 pt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-gold-700"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All insights
            </Link>
            <ButtonLink href="/contact">Discuss a property</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
