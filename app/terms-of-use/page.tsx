import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/ui/prose";
import { Container, Section } from "@/components/ui/section";
import { formattedAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use the ${site.legalName} website, ${site.crm.name} and our WhatsApp and Facebook integrations.`,
  alternates: { canonical: "/terms-of-use" },
};

/** Fixed, not the build date: the date terms changed is part of the terms. */
const LAST_UPDATED = "20 October 2026";

/**
 * ⚠️  REVIEW REQUIRED — accurate to how the Website and the CRM work, but not
 * reviewed by a lawyer. Counsel should check the liability cap, indemnity,
 * the 90-day post-termination deletion window, and the jurisdiction
 * (currently Tumkur, Karnataka).
 */
export default function TermsOfUsePage() {
  const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        intro="The terms that apply when you browse this site, send us an enquiry, or use our CRM and its WhatsApp and Facebook integrations."
      />

      <Section>
        <Container>
          <Prose>
            <p className="text-sm text-ink-500">Last updated {LAST_UPDATED}</p>

            <h2 id="about">1. About these terms</h2>
            <p>
              These terms are an agreement between you and {site.legalName} ("SV Lots",
              "we", "us"), registered office at {formattedAddress}. They cover two things:
            </p>
            <ul>
              <li>
                our website at <strong>svlots.com</strong> (the "Website");
              </li>
              <li>
                <strong>{site.crm.name}</strong>, our customer relationship management
                software for real-estate businesses at{" "}
                <a href={site.crm.url}>{site.crm.url.replace("https://", "")}</a> (the
                "Platform"). This includes the Platform's integrations with WhatsApp,
                Facebook, SMS and telephony services.
              </li>
            </ul>
            <p>
              By using the Website or the Platform you agree to these terms and to our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree,
              please do not use them.
            </p>
            <p>In these terms:</p>
            <ul>
              <li>
                a <strong>"Customer"</strong> is a business that subscribes to the
                Platform;
              </li>
              <li>
                an <strong>"Authorised User"</strong> is a person a Customer invites to
                its workspace;
              </li>
              <li>
                <strong>"Customer Data"</strong> is the information a Customer or its
                Authorised Users put into the Platform, or connect to it.
              </li>
            </ul>
            <p>
              If a Customer has signed a separate agreement or order form with us, that
              agreement prevails over these terms wherever the two conflict.
            </p>

            <h2 id="website">2. Using the Website</h2>
            <h3>Information is indicative, not an offer</h3>
            <p>
              Property listings, layout plans, dimensions, areas, prices and availability
              shown on the Website are indicative and for general information only. They
              do not constitute an offer, an invitation to offer, or a contract. Details
              can change without notice, and images, renders and plans may be artistic
              impressions rather than the finished property.
            </p>
            <p>
              <strong>
                Always verify particulars, title and approvals independently, and rely
                only on the executed sale documents.
              </strong>
            </p>
            <h3>Tools and calculators</h3>
            <p>
              The area calculator and any similar tools on the Website are provided as
              convenience aids. They compute geometry from the figures you enter and
              cannot verify those figures. Results are estimates and are not a substitute
              for a survey by a licensed surveyor. Do not rely on them for a transaction,
              registration or legal purpose.
            </p>
            <h3>Third-party content and links</h3>
            <p>
              The Website links to partner and developer websites, and displays project
              material supplied by developers. We are not responsible for the content,
              accuracy or availability of third-party sites, and a link does not imply
              endorsement. Trademarks and project names belong to their respective owners.
            </p>

            <h2 id="accounts">3. Platform accounts</h2>
            <ul>
              <li>
                Access to the Platform is by invitation only. A Customer's workspace
                owner, or an administrator, invites Authorised Users and decides their
                roles and permissions.
              </li>
              <li>
                Each account is for one person. Keep your password confidential, and do
                not share your account.
              </li>
              <li>
                Tell us at {email} straight away if you suspect your account has been
                accessed without permission.
              </li>
              <li>
                A Customer is responsible for everything done through its workspace by its
                Authorised Users. It should remove access promptly when someone leaves.
              </li>
              <li>The details you give us must be accurate and kept up to date.</li>
            </ul>

            <h2 id="customer-data">4. Customer Data and privacy</h2>
            <ul>
              <li>
                <strong>Ownership.</strong> Customers own their Customer Data. We claim no
                ownership of it.
              </li>
              <li>
                <strong>Our licence.</strong> We use Customer Data only to provide, secure
                and support the Platform for that Customer, as described in our Privacy
                Policy.
              </li>
              <li>
                <strong>Roles under the DPDP Act.</strong> The Customer is the Data
                Fiduciary for its Customer Data. We act as its Data Processor.
              </li>
            </ul>
            <p>The Customer is responsible for making sure that:</p>
            <ul>
              <li>it has a lawful basis for collecting and using Customer Data;</li>
              <li>
                it gives people the notices the law requires and obtains any consent
                needed;
              </li>
              <li>Customer Data is accurate;</li>
              <li>
                it responds to requests from people whose data it holds. We will help with
                this where the Platform allows.
              </li>
            </ul>
            <p>Our commitments to Customers:</p>
            <ul>
              <li>
                We protect Customer Data with the measures described in our Privacy
                Policy.
              </li>
              <li>
                We notify the Customer without undue delay if we become aware of a
                personal data breach affecting its data.
              </li>
              <li>
                When a subscription ends, we provide an export on request and delete
                Customer Data within 90 days, unless the law requires us to keep it
                longer.
              </li>
            </ul>

            <h2 id="messaging">5. WhatsApp, SMS, calls and campaigns</h2>
            <p>
              The Platform lets Customers message and call their contacts. Customers are
              responsible for how they use these features, and must:
            </p>
            <ul>
              <li>
                <strong>WhatsApp.</strong> Comply with the WhatsApp Business Terms of
                Service, the WhatsApp Business Messaging Policy, the WhatsApp Commerce
                Policy and Meta's other applicable terms. Message only people who have
                opted in to hear from the Customer on WhatsApp. Use only message templates
                Meta has approved to start conversations. Honour every opt-out request.
              </li>
              <li>
                <strong>SMS and calls.</strong> Comply with the Telecom Regulatory
                Authority of India's Telecom Commercial Communications Customer Preference
                Regulations, 2018. This includes DLT registration of the Customer's
                entity, sender IDs and templates. Respect people's Do-Not-Disturb
                preferences. Do not send unsolicited commercial communications.
              </li>
              <li>
                <strong>Call recording.</strong> Where the Customer turns on call
                recording, tell callers their calls are recorded and obtain any consent
                the law requires.
              </li>
              <li>
                <strong>Campaigns.</strong> Send bulk messages only to contacts with valid
                consent. The Platform automatically skips contacts who have opted out. Do
                not work around that.
              </li>
            </ul>
            <p>
              Message, conversation and call charges from Meta, SMS providers and
              telephony providers are the Customer's responsibility, unless we have agreed
              otherwise in writing. These providers may suspend a number, sender ID or
              account under their own rules. We are not responsible for their decisions.
            </p>

            <h2 id="meta">6. Facebook and WhatsApp connections</h2>
            <p>
              The Platform connects to Meta through the <strong>SV Lots</strong> app. By
              connecting a WhatsApp Business account or a Facebook Page, you confirm the
              following:
            </p>
            <ul>
              <li>
                You are authorised to connect that account or Page on the Customer's
                behalf.
              </li>
              <li>
                You authorise us to access it using only the permissions shown during
                connection, and only for the purposes described in our Privacy Policy.
              </li>
              <li>
                For Lead Ads, the Customer accepts Meta's Lead Ads Terms. Its lead forms
                must link to the Customer's own privacy policy and accurately describe how
                it will use the leads.
              </li>
            </ul>
            <p>
              Your use of Facebook, Instagram and WhatsApp remains governed by Meta's own
              terms. Meta is not a party to these terms and is not responsible for the
              Platform.
            </p>
            <p>You can end a connection at any time in two ways:</p>
            <ul>
              <li>
                in the Platform, disconnect it under <strong>WhatsApp → Numbers</strong>{" "}
                or <strong>Lead capture</strong>, or
              </li>
              <li>
                remove the SV Lots app from your Facebook or Meta Business settings.
              </li>
            </ul>
            <p>
              See our <Link href="/data-deletion">Data Deletion</Link> page for the steps
              and what happens to the data.
            </p>

            <h2 id="ai">7. AI features</h2>
            <p>
              The Platform's optional AI assistant and dictation features generate content
              automatically.
            </p>
            <ul>
              <li>
                Their output can be incomplete or wrong. Review it before you rely on it
                or send it to anyone.
              </li>
              <li>It is not legal, financial, tax or valuation advice.</li>
              <li>
                A Customer decides whether to enable these features and who may use them.
              </li>
            </ul>

            <h2 id="acceptable-use">8. Acceptable use</h2>
            <p>You must not use the Website or the Platform to:</p>
            <ul>
              <li>
                submit false details, other people's personal information without a lawful
                basis, or unlawful, misleading or infringing content;
              </li>
              <li>
                send spam or unsolicited messages, or contact people who have opted out;
              </li>
              <li>
                advertise or market property in breach of the Real Estate (Regulation and
                Development) Act, 2016, or of any other applicable law;
              </li>
              <li>
                attempt to access another Customer's workspace or data, or any part of our
                systems you are not authorised to use;
              </li>
              <li>
                probe, scan or test the security of our systems without our written
                permission;
              </li>
              <li>
                upload malware, or use automated means to scrape, overload or disrupt the
                Website or the Platform;
              </li>
              <li>
                copy, resell, reverse engineer or build a competing product from the
                Platform.
              </li>
            </ul>
            <p>
              We may suspend an account or workspace that breaches this section. Where
              possible we will give notice first, or straight away if needed to protect
              people, our systems, or our standing with Meta and other providers.
            </p>

            <h2 id="fees">9. Fees</h2>
            <p>
              Platform fees, billing periods and payment terms are set out in the
              Customer's order form or agreement with us. Fees are exclusive of GST and
              other applicable taxes unless stated otherwise.
            </p>

            <h2 id="ip">10. Intellectual property</h2>
            <p>
              The Website, the Platform, their design and software, and the {site.name}{" "}
              and {site.crm.name} names and logos belong to {site.legalName} or our
              licensors. You may view and print Website pages for your own use. You may
              not republish, copy or use them commercially without our written permission.
              If you send us feedback or suggestions, we may use them freely.
            </p>

            <h2 id="availability">11. Availability and changes</h2>
            <ul>
              <li>
                We aim to keep the Website and the Platform available. We do not guarantee
                uninterrupted or error-free access.
              </li>
              <li>
                We may carry out maintenance, and we may change, add or remove features.
              </li>
              <li>
                We will give Customers reasonable notice of any change that materially
                reduces the Platform's core functionality.
              </li>
              <li>
                Features that rely on Meta, SMS, telephony or AI providers depend on those
                providers continuing to offer them.
              </li>
            </ul>

            <h2 id="termination">12. Termination</h2>
            <ul>
              <li>
                A Customer may stop using the Platform as set out in its agreement with
                us.
              </li>
              <li>
                We may suspend or end access for a material breach of these terms that is
                not fixed after notice, or immediately where the law requires.
              </li>
              <li>
                When access ends, Customer Data is handled as described in section 4.
              </li>
              <li>
                Sections that by their nature should continue (including sections 4, 10,
                13 and 14) continue after termination.
              </li>
            </ul>

            <h2 id="liability">13. Disclaimers and liability</h2>
            <p>
              The Website and the Platform are provided "as is" and "as available". To the
              extent permitted by law, we disclaim all implied warranties.
            </p>
            <p>To the extent permitted by law, {site.legalName} is not liable for:</p>
            <ul>
              <li>indirect, incidental or consequential loss;</li>
              <li>loss of profits, business or data;</li>
              <li>loss arising from reliance on information published on the Website;</li>
              <li>
                the acts, omissions or outages of Meta or any other third-party service.
              </li>
            </ul>
            <p>
              Our total liability to a Customer in any 12-month period is limited to the
              fees that Customer paid us for the Platform in that period. Nothing in these
              terms limits liability that cannot be limited by law.
            </p>
            <p>
              The Customer will indemnify us against claims arising from its Customer
              Data, or from its messaging, calling or marketing practices in breach of
              these terms or the law.
            </p>

            <h2 id="law">14. Governing law</h2>
            <p>
              These terms are governed by the laws of India, and the courts at Tumkur,
              Karnataka have jurisdiction over any dispute arising from them.
            </p>

            <h2 id="changes">15. Changes to these terms</h2>
            <p>
              We may update these terms. We will publish the revised version on this page
              and update the date at the top. We will tell Customers about material
              changes in advance. Continuing to use the Website or the Platform after a
              change takes effect means you accept the revised terms.
            </p>

            <h2 id="contact">16. Contact and grievances</h2>
            <p>
              Questions or complaints about these terms or the Platform can go to our
              Grievance Officer at {email}, by phone on {site.phone.display}, or by post
              to {site.legalName}, {formattedAddress}.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
