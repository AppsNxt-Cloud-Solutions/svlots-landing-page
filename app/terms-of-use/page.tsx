import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/ui/prose";
import { Container, Section } from "@/components/ui/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use the ${site.legalName} website.`,
};

/**
 * ⚠️  REVIEW REQUIRED — accurate to how the site works, but not reviewed by a
 * lawyer. Counsel should check the liability and governing-law clauses, and
 * confirm the jurisdiction (currently stated as Tumkur, Karnataka).
 */
export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        intro="The terms that apply when you browse this site or send us an enquiry."
      />

      <Section>
        <Container>
          <Prose>
            <p className="text-sm text-ink-500">
              Last updated{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <h2>Acceptance</h2>
            <p>
              By using this website you agree to these terms. If you do not agree, please
              do not use the site.
            </p>

            <h2>Information is indicative, not an offer</h2>
            <p>
              Property listings, layout plans, dimensions, areas, prices and availability
              shown on this site are indicative and for general information only. They do
              not constitute an offer, an invitation to offer, or a contract. Details can
              change without notice, and images, renders and plans may be artistic
              impressions rather than the finished property.
            </p>
            <p>
              <strong>
                Always verify particulars, title and approvals independently, and rely
                only on the executed sale documents.
              </strong>
            </p>

            <h2>Tools and calculators</h2>
            <p>
              The area calculator and any similar tools on this site are provided as
              convenience aids. They compute geometry from the figures you enter and
              cannot verify those figures. Results are estimates and are not a substitute
              for a survey by a licensed surveyor. Do not rely on them for a transaction,
              registration or legal purpose.
            </p>

            <h2>Third-party content and links</h2>
            <p>
              This site links to partner and developer websites, and displays project
              material supplied by developers. We are not responsible for the content,
              accuracy or availability of third-party sites, and a link does not imply
              endorsement. Trademarks and project names belong to their respective owners.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The site design, text and the {site.name} name and logo are owned by{" "}
              {site.legalName} or used with permission. You may view and print pages for
              your own use, but you may not republish, copy or use them commercially
              without written permission.
            </p>

            <h2>Acceptable use</h2>
            <ul>
              <li>
                Do not submit false details, other people's personal information, or
                unlawful content through our forms.
              </li>
              <li>
                Do not attempt to gain unauthorised access to the site or its underlying
                systems.
              </li>
              <li>Do not use automated means to scrape, overload or disrupt the site.</li>
            </ul>

            <h2>Availability</h2>
            <p>
              We aim to keep the site available but do not guarantee uninterrupted access.
              We may change, suspend or withdraw any part of the site at any time.
            </p>

            <h2>Liability</h2>
            <p>
              To the extent permitted by law, {site.legalName} is not liable for loss
              arising from reliance on information published on this site, or from any
              inability to use it. Nothing in these terms limits liability that cannot be
              limited by law.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of India, and the courts at Tumkur,
              Karnataka have jurisdiction over any dispute arising from them.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
