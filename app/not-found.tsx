import type { Metadata } from "next";
import mountainLake from "@/assets/images/hero/mountain-lake.webp";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { primaryNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** The Angular app had no wildcard route: a bad URL rendered the shell with an
 *  empty content area and no way forward. */
export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="We couldn't find that page"
        accentWords={[3]}
        image={mountainLake}
        intro="The page may have moved during our site rebuild. Everything below is one click away."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="onDark">
            Contact us
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="alt" size="sm">
        <Container>
          <h2 className="text-2xl">Explore</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <ButtonLink href={item.href} variant="ghost" className="px-0">
                  {item.label} →
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
