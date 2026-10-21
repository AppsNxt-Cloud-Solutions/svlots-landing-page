import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/ui/prose";
import { Container, Section } from "@/components/ui/section";
import { formattedAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Deletion",
  description: `How to remove data connected to ${site.legalName} through WhatsApp or Facebook, and how to ask us to delete your personal data.`,
  alternates: { canonical: "/data-deletion" },
};

const LAST_UPDATED = "20 October 2026";

/**
 * The Data Deletion Instructions URL given to Meta for the SV Lots app
 * (App settings → Basic). There is no signed_request deletion callback, so
 * everything a reviewer needs has to be on this page. Keep the menu names in
 * step with the CRM's navigation (apps/web/src/components/shell/nav.ts).
 */
export default function DataDeletionPage() {
  const email = <a href={`mailto:${site.email}`}>{site.email}</a>;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Data Deletion"
        intro="How to disconnect WhatsApp or Facebook from our CRM, and how to ask us to delete your personal data."
      />

      <Section>
        <Container>
          <Prose>
            <p className="text-sm text-ink-500">Last updated {LAST_UPDATED}</p>

            <p>This page covers data held by {site.legalName} ("SV Lots") through:</p>
            <ul>
              <li>our website svlots.com;</li>
              <li>
                {site.crm.name}, our CRM at{" "}
                <a href={site.crm.url}>{site.crm.url.replace("https://", "")}</a>, and
              </li>
              <li>
                the <strong>SV Lots</strong> app on Facebook and WhatsApp.
              </li>
            </ul>
            <p>
              Our <Link href="/privacy-policy">Privacy Policy</Link> describes what we
              collect.
            </p>

            <h2 id="disconnect-in-crm">
              1. Businesses: disconnect WhatsApp or Facebook in the CRM
            </h2>
            <p>
              Sign in to {site.crm.name} as the workspace owner, or as a user allowed to
              manage integrations.
            </p>
            <ul>
              <li>
                <strong>WhatsApp:</strong> go to <strong>WhatsApp → Numbers</strong>,
                choose the number and select <strong>Disconnect</strong>.
              </li>
              <li>
                <strong>Facebook Lead Ads:</strong> go to <strong>Lead capture</strong>.
                Disconnect each Page with <strong>Disconnect Page</strong>, then
                disconnect the Facebook account with <strong>Disconnect</strong>.
              </li>
            </ul>
            <p>
              Disconnecting deletes the stored access token immediately. Disconnected
              Pages are unsubscribed from new-lead notifications. We stop receiving
              messages or leads from that account. Leads and messages already captured
              stay in your workspace, where you can delete them, or you can ask us to
              erase them (see section 3).
            </p>

            <h2 id="remove-from-facebook">
              2. Remove the SV Lots app from Facebook or Meta
            </h2>
            <p>You can also revoke our access directly with Meta:</p>
            <ul>
              <li>
                <strong>Facebook Login / Lead Ads:</strong> on Facebook, open{" "}
                <strong>Settings &amp; privacy → Settings → Business integrations</strong>{" "}
                (or <strong>Apps and websites</strong>), find <strong>SV Lots</strong>,
                and select <strong>Remove</strong>.
              </li>
              <li>
                <strong>WhatsApp Business account:</strong> in Meta Business Suite, open{" "}
                <strong>Settings → Accounts → WhatsApp accounts</strong>, choose the
                account, open <strong>Partners</strong>, and remove{" "}
                <strong>SV Lots</strong>. You can also remove the SV Lots app under{" "}
                <strong>Settings → Integrations → Connected apps</strong>.
              </li>
            </ul>
            <p>
              Once access is removed we can no longer read or send data through that
              account. To have the data we already hold erased, follow section 3.
            </p>

            <h2 id="request-deletion">3. Ask us to delete your data</h2>
            <p>Anyone can ask us to delete their personal data. This includes:</p>
            <ul>
              <li>people who sent us an enquiry;</li>
              <li>people who filled in a Facebook or Instagram lead form;</li>
              <li>people who messaged a business on WhatsApp through our CRM;</li>
              <li>CRM users.</li>
            </ul>
            <ol>
              <li>
                Email {email} with the subject <strong>"Data deletion request"</strong>.
              </li>
              <li>
                Include your name and the phone number or email address the data is linked
                to. If it came through Facebook, also give your Facebook name and the
                business or Page you contacted. If you are a CRM user, also give your
                workspace name.
              </li>
              <li>
                We will reply within 48 hours with a reference number. We may ask you to
                confirm the request from the phone number or email address concerned, so
                that nobody else can delete your data.
              </li>
              <li>We will complete the deletion within 30 days and confirm by email.</li>
            </ol>

            <h2 id="what-is-deleted">4. What is deleted and what may be kept</h2>
            <p>
              We permanently erase your personal data from the CRM and the website
              systems. That includes:
            </p>
            <ul>
              <li>lead and contact records;</li>
              <li>WhatsApp and SMS messages;</li>
              <li>Facebook lead form answers;</li>
              <li>call records and recordings;</li>
              <li>uploaded documents;</li>
              <li>Facebook or WhatsApp access tokens.</li>
            </ul>
            <p>
              Backups roll over automatically, and deleted data leaves them within 30
              days. We may keep a limited record where the law requires it, or where
              needed to establish or defend legal claims. Examples are tax and accounting
              records for completed bookings and payments, and our security audit log. We
              keep such records only as long as required, and use them for no other
              purpose.
            </p>

            <h2 id="business-data">5. If a real-estate business holds your details</h2>
            <p>
              Real-estate businesses use {site.crm.name} to manage their own leads and
              customers. If one of them contacted you, that business decides how your data
              is used. You can ask them directly to delete it. If you write to us instead,
              we will tell the business and carry out the deletion on its instructions, or
              as the law requires. We will keep you informed throughout.
            </p>

            <h2 id="meta-data">6. Data held by Meta</h2>
            <p>
              This page covers the data SV Lots holds. Facebook, Instagram and WhatsApp
              keep their own copy of your lead form answers and messages, under Meta's
              privacy policy. To manage that data, use the privacy controls in your
              Facebook, Instagram or WhatsApp settings.
            </p>

            <h2 id="contact">7. Contact</h2>
            <p>
              Grievance Officer, {site.legalName}: {email}, {site.phone.display},{" "}
              {formattedAddress}.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
