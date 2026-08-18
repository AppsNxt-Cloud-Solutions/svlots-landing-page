import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section } from "@/components/ui/section";
import { articles, formatArticleDate } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical guidance on land investment, documentation and the Karnataka property market from the SV Lots team.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="What we have learned, written down"
        accentWords={[4]}
        intro="Practical notes on documentation, land value and the market — written for people making an actual decision."
      />

      <Section>
        <Container>
          {/* Lead article */}
          {lead && (
            <Link
              href={`/insights/${lead.slug}`}
              className="group grid gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className="overflow-hidden rounded-card bg-ink-100">
                <Image
                  src={lead.cover}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 92vw"
                  className="aspect-16/10 size-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                  {lead.category}
                  <span aria-hidden="true" className="h-px w-6 rule-gold" />
                  <span className="text-ink-500 normal-case tracking-normal">
                    {formatArticleDate(lead.date)} · {lead.readingMinutes} min read
                  </span>
                </p>
                <h2 className="mt-5 text-4xl text-balance-tight transition-colors duration-300 group-hover:text-gold-700">
                  {lead.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">
                  {lead.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-gold-700">
                  Read the article
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          )}

          {/* Remaining */}
          {rest.length > 0 && (
            <Stagger className="mt-20 grid gap-8 border-t border-ink-200 pt-14 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <StaggerItem key={article.slug}>
                  <Link href={`/insights/${article.slug}`} className="group block">
                    <div className="overflow-hidden rounded-card bg-ink-100">
                      <Image
                        src={article.cover}
                        alt=""
                        placeholder="blur"
                        sizes="(min-width: 1024px) 33vw, 92vw"
                        className="aspect-16/10 size-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
                      {article.category}
                    </p>
                    <h3 className="mt-3 text-xl transition-colors duration-300 group-hover:text-gold-700">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {article.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-ink-500">
                      {formatArticleDate(article.date)} · {article.readingMinutes} min
                      read
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>
    </>
  );
}
