import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/ui/prose";
import { Container, Section } from "@/components/ui/section";
import { formattedAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects the personal information you share through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

/**
 * ⚠️  REVIEW REQUIRED — this describes what the site technically does today and
 * is written to be accurate, but it has not been reviewed by a lawyer. Have
 * counsel check it before launch, particularly the retention period and the
 * DPDP Act grievance-officer details, which need a named contact.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="What we collect when you use this site, why we collect it, and what you can ask us to do with it."
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

            <h2>Who we are</h2>
            <p>
              {site.legalName} ("SV Lots", "we", "us") operates this website. Our
              registered office is at {formattedAddress}. You can reach us about anything
              in this policy at <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <h2>Information we collect</h2>
            <p>
              We only collect what you choose to send us. There is no account registration
              on this site and we do not buy personal data from third parties.
            </p>
            <ul>
              <li>
                <strong>Enquiry forms.</strong> When you submit the contact form or
                request a call back about a service, we receive your name, phone number,
                email address, city where provided, the service you asked about, and your
                message.
              </li>
              <li>
                <strong>Usage data.</strong> We collect aggregated, non-identifying
                analytics about which pages are visited and how the site performs. This is
                used to improve the site, not to profile you.
              </li>
              <li>
                <strong>Technical data.</strong> Our hosting provider processes your IP
                address and browser user-agent as a normal part of serving the site and
                protecting it from abuse.
              </li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To respond to your enquiry and discuss the property or service.</li>
              <li>
                To follow up by phone or email about that enquiry. We do not add you to an
                unrelated marketing list without your consent.
              </li>
              <li>To maintain, secure and improve this website.</li>
            </ul>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. We share it only with service
              providers who help us run the site and respond to you — our hosting
              provider, our email provider, and our own back-office systems. Where a
              property is marketed in partnership with a developer, we will tell you
              before passing your details on.
            </p>

            <h2>Cookies</h2>
            <p>
              This site does not use advertising or cross-site tracking cookies. Any
              cookies set are strictly necessary for the site to function, or are
              first-party analytics measuring aggregate usage.
            </p>

            <h2>Retention</h2>
            <p>
              We keep enquiry details for as long as needed to deal with your enquiry and
              to meet our legal and accounting obligations, after which they are deleted.
              You can ask us to delete them sooner.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us to give you a copy of the information we hold about you,
              correct it if it is wrong, or delete it. You can also ask us to stop
              contacting you. Email <a href={`mailto:${site.email}`}>{site.email}</a> and
              we will respond within a reasonable period.
            </p>

            <h2>Security</h2>
            <p>
              Data is transmitted over encrypted connections and access to enquiry data is
              limited to staff who need it. No system is perfectly secure, but we take
              reasonable technical and organisational measures to protect your
              information.
            </p>

            <h2>Changes</h2>
            <p>
              If we change this policy we will update the date above and publish the
              revised version on this page.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
