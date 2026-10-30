import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Prose } from "@/components/ui/prose";
import { Container, Section } from "@/components/ui/section";
import { formattedAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses, shares and protects personal information across svlots.com, ${site.crm.name} and our WhatsApp and Facebook integrations.`,
  alternates: { canonical: "/privacy-policy" },
};

/** Fixed, not the build date: the date a policy changed is part of the policy. */
const LAST_UPDATED = "29 October 2026";

/**
 * ⚠️  REVIEW REQUIRED — written to match what svlots.com and the CRM
 * (bhoomi-crm repo) technically do as of the date above, and to cover what
 * Meta App Review checks for the SV Lots app. It has not been reviewed by a
 * lawyer. Keep it true when the product changes: a new third-party provider, a
 * new kind of personal data, or a change to what is sent to Meta, OpenAI or
 * Google needs an update here.
 */
export default function PrivacyPolicyPage() {
  const email = <a href={`mailto:${site.email}`}>{site.email}</a>;
  const crm = <a href={site.crm.url}>{site.crm.url.replace("https://", "")}</a>;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro="What we collect through our website, our CRM and our WhatsApp and Facebook integrations, why we collect it, who we share it with, and what you can ask us to do with it."
      />

      <Section>
        <Container>
          <Prose>
            <p className="text-sm text-ink-500">Last updated {LAST_UPDATED}</p>

            <h2 id="who-we-are">1. Who we are and what this policy covers</h2>
            <p>
              {site.legalName} ("SV Lots", "we", "us", "our") is a company incorporated in
              India with its registered office at {formattedAddress}. This policy explains
              how we handle personal information when you:
            </p>
            <ul>
              <li>
                visit or send an enquiry through our website, <strong>svlots.com</strong>{" "}
                (the "Website");
              </li>
              <li>
                use <strong>{site.crm.name}</strong>, our customer relationship management
                software for real-estate businesses at {crm} (the "Platform"), whether as
                a member of our own team or as a user at a business that subscribes to it;
              </li>
              <li>
                connect a WhatsApp Business account or a Facebook Page to the Platform
                through the <strong>SV Lots</strong> app on Meta's developer platform (the
                "SV Lots App"); or
              </li>
              <li>
                are a property buyer, enquirer or other contact whose details are held in
                the Platform, including details received from WhatsApp, Facebook or
                Instagram Lead Ads, SMS or phone calls.
              </li>
            </ul>
            <p>
              The Platform is developed for us by {site.developer.name}, which acts as our
              technology service provider.
            </p>

            <h2 id="roles">2. Our role: when we decide and when our customers decide</h2>
            <p>
              Under India's Digital Personal Data Protection Act, 2023 (the "DPDP Act"),
              whoever decides why and how personal data is processed is the{" "}
              <strong>Data Fiduciary</strong>. Whoever processes it on their behalf is a{" "}
              <strong>Data Processor</strong>.
            </p>
            <ul>
              <li>
                <strong>We are the Data Fiduciary</strong> for Website enquiries, for the
                accounts of people who sign in to the Platform, and for the property
                enquiries and contacts that SV Lots itself manages.
              </li>
              <li>
                <strong>Our business customers are the Data Fiduciary</strong> for the
                leads, contacts, messages and other records they bring into their own
                workspace on the Platform ("Customer Data"). We process Customer Data only
                to provide the Platform to that customer, on their instructions and under
                our agreement with them. Each customer's workspace is kept separate from
                every other customer's.
              </li>
            </ul>
            <p>
              If a real-estate business using the Platform contacted you, please send
              requests about your data to that business first. If you contact us instead,
              we will pass your request to them and help them deal with it.
            </p>

            <h2 id="information-we-collect">3. Information we collect</h2>

            <h3>3.1 On the Website</h3>
            <ul>
              <li>
                <strong>Enquiry forms.</strong> Your name, phone number, email address,
                city (if you give it), the service you are interested in, and your
                message.
              </li>
              <li>
                <strong>Staff sign-in.</strong> Our team signs in to manage the Website
                content. We set a session cookie for that purpose only.
              </li>
              <li>
                <strong>Usage data.</strong> Aggregated, non-identifying statistics about
                page visits and site performance (Vercel Web Analytics and Speed
                Insights). These do not use cookies and do not track you across other
                websites.
              </li>
              <li>
                <strong>Technical data.</strong> Your IP address and browser user-agent,
                processed by our hosting and network providers to deliver the Website and
                protect it from abuse.
              </li>
            </ul>

            <h3>3.2 Platform user accounts</h3>
            <ul>
              <li>
                <strong>Self-serve sign-up.</strong> When you create a workspace at {crm},
                we collect your name, work email address, mobile number and the name of
                your firm, and the password you choose. We use them to create your
                workspace and its owner account and to verify your email address: we email
                you a single-use verification link through Resend, and the workspace is
                created only once that link is used. Sign-ups that are never verified are
                not turned into accounts.
              </li>
              <li>
                <strong>Account details.</strong> Name, work email address, phone number,
                role and team, and the workspace you belong to.
              </li>
              <li>
                <strong>Credentials.</strong> Your password, which we store only as a
                one-way salted hash, never in readable form.
              </li>
              <li>
                <strong>Security and activity records.</strong> Sign-in times, session
                records (IP address and browser user-agent), failed sign-in attempts, and
                an audit log of important actions, such as who changed a record and when.
              </li>
            </ul>

            <h3>3.3 Customer Data held in the Platform</h3>
            <p>Depending on which features a business uses, a workspace may contain:</p>
            <ul>
              <li>
                <strong>Leads and contacts.</strong> Name, phone and alternate phone
                number, email address, lead source, budget, property preferences (property
                type, size, preferred locality), projects of interest, notes, pipeline
                stage, any custom fields the business defines, and the team member
                assigned to the lead.
              </li>
              <li>
                <strong>Activities.</strong> Tasks, follow-ups, site-visit schedules and
                outcomes, and meeting notes.
              </li>
              <li>
                <strong>Bookings and payments.</strong> The unit booked, agreed price,
                agreement and registration dates, payment schedules, and payment records:
                amount, mode (for example cheque, UPI or bank transfer) and reference
                number.{" "}
                <strong>
                  The Platform does not process payments and does not collect card or bank
                  login details.
                </strong>
              </li>
              <li>
                <strong>Commissions and referral partners.</strong> Partner name, contact
                details, city, commission share, and payout amounts and references.
              </li>
              <li>
                <strong>Documents.</strong> Files a business uploads, such as agreements,
                receipts, floor plans and photographs. These may include identity
                documents a buyer has provided to the business.
              </li>
              <li>
                <strong>Communications.</strong> WhatsApp and SMS messages sent and
                received through the Platform, with their delivery and read status; call
                logs (numbers, duration, outcome and notes); and, where the business turns
                on call recording, recordings of calls placed through the Platform.
              </li>
              <li>
                <strong>Marketing preferences.</strong> Campaign recipient lists and
                opt-out records, including opt-outs sent by replying "STOP".
              </li>
              <li>
                <strong>Public project enquiries.</strong> Name, phone number, email
                address and message submitted through a business's public project page on
                the Platform.
              </li>
            </ul>

            <h3 id="meta">
              3.4 Information we receive from Meta (WhatsApp and Facebook)
            </h3>
            <p>
              The Platform connects to Meta Platforms through the SV Lots App. A business
              chooses whether to connect it. We receive only the information below, and
              only for the WhatsApp Business accounts and Facebook Pages the business
              authorises.
            </p>
            <p>
              <strong>WhatsApp Business Platform (Cloud API).</strong> When a business
              connects a WhatsApp Business number, we receive:
            </p>
            <ul>
              <li>
                the WhatsApp Business Account ID, phone number ID, display phone number
                and verified business name;
              </li>
              <li>the Facebook user ID and name of the person who connected it;</li>
              <li>an access token, which we store encrypted;</li>
              <li>the business's message templates and their approval status.</li>
            </ul>
            <p>
              When customers message that business, or when the business messages them, we
              receive and store:
            </p>
            <ul>
              <li>the customer's WhatsApp phone number and profile name;</li>
              <li>the text of the message and its timestamp;</li>
              <li>delivery and read receipts.</li>
            </ul>
            <p>
              We do not download photos, videos, audio, documents, locations or contact
              cards sent over WhatsApp. The Platform records only that such a message
              arrived. If the business turns the option on, a message from a new number
              can create a lead with that phone number and profile name. We use the
              permissions <code>whatsapp_business_management</code>,{" "}
              <code>whatsapp_business_messaging</code> and{" "}
              <code>business_management</code> only to:
            </p>
            <ul>
              <li>connect and manage the business's numbers and message templates;</li>
              <li>send and receive the business's messages;</li>
              <li>show conversations to the business's authorised team members.</li>
            </ul>
            <p>
              <strong>Facebook and Instagram Lead Ads.</strong> When a business connects a
              Facebook account through Facebook Login for Business, we receive:
            </p>
            <ul>
              <li>that person's Facebook user ID and name;</li>
              <li>
                the Pages they manage (ID, name, category and a Page access token, stored
                encrypted);
              </li>
              <li>their ad accounts (ID, name and currency);</li>
              <li>the questions on the business's lead forms.</li>
            </ul>
            <p>
              When someone submits one of that business's lead forms, we receive their
              answers. These usually include name, phone number and email address, plus
              any other questions the business asked. We also receive the time of the
              submission and the names of the ad, ad set and campaign it came from. Each
              submission becomes a lead in that business's workspace. We use these
              permissions only for that:
            </p>
            <ul>
              <li>
                <code>leads_retrieval</code>, <code>pages_manage_ads</code>: read lead
                form submissions and form questions;
              </li>
              <li>
                <code>pages_show_list</code>, <code>pages_read_engagement</code>: list the
                Pages the person manages and read basic Page details;
              </li>
              <li>
                <code>pages_manage_metadata</code>: subscribe the chosen Pages to new-lead
                notifications;
              </li>
              <li>
                <code>ads_management</code>: show which ad, ad set and campaign a lead
                came from.
              </li>
            </ul>
            <p>
              <strong>How we limit our use of Meta data.</strong> We use information
              received from Meta only to provide the features described above to the
              business that connected it, and in line with Meta's Platform Terms and
              Developer Policies.
            </p>
            <ul>
              <li>We do not sell it.</li>
              <li>
                We do not use it for advertising, or to build profiles of people outside
                the business's own workspace.
              </li>
              <li>We do not share it with data brokers.</li>
              <li>
                We do not combine one business's Meta data with another business's data.
              </li>
            </ul>

            <h3>3.5 Information from other service providers</h3>
            <ul>
              <li>
                <strong>Telephony (Exotel).</strong> Call status, duration and, where
                enabled, the call recording for calls placed through the Platform.
              </li>
              <li>
                <strong>SMS (MSG91).</strong> Delivery receipts for SMS messages sent
                through the Platform.
              </li>
            </ul>

            <h2 id="how-we-use">4. How we use information</h2>
            <ul>
              <li>
                To respond to Website enquiries and discuss the property or service you
                asked about.
              </li>
              <li>
                To provide the Platform: storing and showing records to authorised team
                members, and sending and receiving WhatsApp, SMS and email messages and
                calls on a business's instructions.
              </li>
              <li>
                To send service emails, such as sign-up verification links, team
                invitations and password resets.
              </li>
              <li>
                To keep the Platform secure: authenticating users, preventing abuse,
                detecting errors, keeping audit records and backing up data.
              </li>
              <li>To provide support and fix problems a business reports to us.</li>
              <li>
                To meet legal, tax and accounting obligations and to enforce our
                agreements.
              </li>
            </ul>
            <p>
              We do not sell personal information. We do not use Customer Data for our own
              marketing. We do not use Customer Data or data received from Meta to train
              artificial-intelligence models.
            </p>

            <h2 id="ai">5. Optional AI features</h2>
            <p>
              The Platform includes an optional AI assistant and voice dictation. A
              business decides whether to enable them and which team members may use them.
            </p>
            <ul>
              <li>
                <strong>Assistant.</strong> When a user asks it a question, we send the
                question and the workspace records needed to answer it (for example the
                relevant leads, tasks, site visits or bookings) to our AI provider.
              </li>
              <li>
                <strong>Dictation.</strong> When a user records a voice note, we send the
                audio to our AI provider to turn it into text.
              </li>
            </ul>
            <p>
              Our AI providers are OpenAI and Google (Gemini). We use their business API
              services, under terms that do not let them use this data to train their
              models. We do not store assistant conversations.
            </p>

            <h2 id="consent">6. Legal basis and consent</h2>
            <p>We process personal data:</p>
            <ul>
              <li>with your consent, for example when you send us an enquiry;</li>
              <li>to perform our agreement with a business that uses the Platform;</li>
              <li>to comply with law;</li>
              <li>for the other legitimate uses the DPDP Act permits.</li>
            </ul>
            <p>Each business using the Platform is responsible for:</p>
            <ul>
              <li>having a lawful basis for the Customer Data it brings in;</li>
              <li>
                getting the consent the law requires before it contacts people, including
                WhatsApp opt-in and the rules for SMS and calls;
              </li>
              <li>telling people when their calls are recorded.</li>
            </ul>
            <p>
              You can withdraw your consent at any time by emailing {email}. For WhatsApp
              marketing messages, you can also reply "STOP". Withdrawing consent does not
              affect processing that took place before you withdrew it.
            </p>

            <h2 id="sharing">7. Who we share information with</h2>
            <p>
              We share personal information only with the service providers who help us
              run the Website and the Platform. Each receives only what it needs for its
              task.
            </p>
            <ul>
              <li>
                <strong>Oracle Cloud Infrastructure</strong>: hosting of the Platform, its
                database, uploaded files and backups.
              </li>
              <li>
                <strong>Vercel</strong>: hosting and cookieless analytics for the Website.
              </li>
              <li>
                <strong>Amazon Web Services</strong>: storage of project images shown on
                the Website.
              </li>
              <li>
                <strong>Cloudflare</strong>: domain name and network security services.
              </li>
              <li>
                <strong>Meta Platforms</strong> (WhatsApp and Facebook): delivery of
                WhatsApp messages and receipt of Lead Ads submissions, for businesses that
                connect them.
              </li>
              <li>
                <strong>MSG91</strong> (Walkover Web Solutions): SMS delivery.
              </li>
              <li>
                <strong>Exotel</strong>: click-to-call telephony and call recordings.
              </li>
              <li>
                <strong>Resend</strong>: service emails, including sign-up verification
                links, and Website enquiry notifications to our team.
              </li>
              <li>
                <strong>OpenAI and Google</strong>: the optional AI features in section 5.
              </li>
              <li>
                <strong>Sentry and Grafana Labs</strong>: error and performance
                monitoring. We remove personal details, cookies, passwords and access
                tokens before data is sent to them.
              </li>
              <li>
                <strong>{site.developer.name}</strong>: development, maintenance and
                support of the Platform.
              </li>
            </ul>
            <p>We may also disclose information:</p>
            <ul>
              <li>where the law, a court or a government authority requires it;</li>
              <li>
                to protect the rights, safety or property of SV Lots, our users or others;
              </li>
              <li>
                to a successor if our business is reorganised or sold, in which case this
                policy will continue to apply to your information.
              </li>
            </ul>
            <p>
              If a property is marketed together with a developer, we will tell you before
              passing your details to that developer.
            </p>

            <h2 id="transfers">8. Where information is processed</h2>
            <p>
              Some of our service providers, including Meta, OpenAI, Google, Vercel,
              Resend, Sentry and Grafana Labs, may process information outside India.
            </p>
            <ul>
              <li>
                We transfer data only as the DPDP Act permits, and never to a country the
                Government of India has restricted.
              </li>
              <li>We rely on these providers' contractual commitments to protect it.</li>
            </ul>

            <h2 id="cookies">9. Cookies and similar technologies</h2>
            <ul>
              <li>
                <strong>Website.</strong> No advertising or cross-site tracking cookies,
                and no Meta Pixel. Our analytics are cookieless. The only cookie is a
                session cookie for our staff who sign in.
              </li>
              <li>
                <strong>Platform.</strong> One strictly necessary, secure, HTTP-only
                session cookie keeps you signed in. The browser also stores one setting,
                your preferred dictation language. The Platform uses no analytics,
                advertising or third-party tracking scripts.
              </li>
            </ul>

            <h2 id="retention">10. How long we keep information</h2>
            <ul>
              <li>
                <strong>Website enquiries</strong>: for as long as needed to deal with
                your enquiry and meet legal and accounting obligations, then deleted.
              </li>
              <li>
                <strong>Customer Data</strong>: for as long as the business keeps it in
                its workspace and its subscription is active. When a subscription ends, we
                return the business's data on request and delete it within 90 days, unless
                the law requires us to keep it longer.
              </li>
              <li>
                <strong>Meta access tokens</strong>: deleted as soon as a business
                disconnects its WhatsApp number or Facebook account from the Platform.
                After that, we receive no new data from that account.
              </li>
              <li>
                <strong>Audit and security logs</strong>: kept for up to 7 years, for
                security, fraud prevention and legal compliance.
              </li>
              <li>
                <strong>Backups</strong>: database and file backups roll over
                automatically, and deleted data leaves them within 30 days.
              </li>
            </ul>

            <h2 id="security">11. How we protect information</h2>
            <ul>
              <li>
                All traffic to the Website and the Platform is encrypted in transit (HTTPS
                with HSTS).
              </li>
              <li>
                Passwords are stored only as salted one-way hashes. Access tokens and API
                keys for Meta, SMS and telephony services are encrypted with AES-256-GCM
                and are never shown to the browser.
              </li>
              <li>
                Messages from Meta and our other providers are checked for a valid
                cryptographic signature before we accept them.
              </li>
              <li>
                Each business's workspace is isolated from the others. Access within a
                workspace is controlled by roles and permissions.
              </li>
              <li>
                Sign-in is protected by account lockout and rate limits, and sessions time
                out after inactivity.
              </li>
              <li>Important changes are written to a tamper-resistant audit log.</li>
              <li>
                Our hosting provider encrypts stored data at the infrastructure level, and
                we take nightly backups.
              </li>
            </ul>
            <p>
              No system is perfectly secure. If a personal data breach affects you, we
              will notify you and the Data Protection Board of India as the law requires.
              Where a business is the Data Fiduciary, we will notify that business.
            </p>

            <h2 id="your-rights">12. Your rights</h2>
            <p>Under the DPDP Act and other applicable law, you can:</p>
            <ul>
              <li>
                ask for a summary of the personal data we hold about you and how we use
                it;
              </li>
              <li>ask us to correct, complete or update it;</li>
              <li>ask us to erase it;</li>
              <li>withdraw consent, or ask us to stop contacting you;</li>
              <li>
                nominate another person to exercise these rights if you die or become
                unable to do so;
              </li>
              <li>have a grievance addressed by us.</li>
            </ul>
            <p>
              To make a request, email {email}. We may need to verify your identity first.
              We aim to respond within 30 days. If you are not satisfied with our
              response, you may complain to the Data Protection Board of India.
            </p>

            <h2 id="data-deletion">13. Deleting your data</h2>
            <p>
              Our <Link href="/data-deletion">Data Deletion</Link> page explains how to
              remove data connected through WhatsApp or Facebook and how to ask us to
              erase your personal data. In short:
            </p>
            <ul>
              <li>
                A business can disconnect its WhatsApp number or Facebook account in the
                Platform at any time.
              </li>
              <li>Anyone can remove the SV Lots App from their Facebook settings.</li>
              <li>Anyone can email {email} with the subject "Data deletion request".</li>
            </ul>

            <h2 id="children">14. Children</h2>
            <p>
              The Website and the Platform are meant for adults and businesses. We do not
              knowingly collect personal data from anyone under 18. If you think a child
              has given us their information, contact us and we will delete it.
            </p>

            <h2 id="grievance-officer">15. Grievance Officer and contact</h2>
            <p>
              For any question, request or complaint about your personal data or this
              policy, contact our Grievance Officer:
            </p>
            <ul>
              <li>
                <strong>Grievance Officer</strong>, {site.legalName}
              </li>
              <li>Email: {email}</li>
              <li>Phone: {site.phone.display}</li>
              <li>Address: {formattedAddress}</li>
            </ul>
            <p>
              We will acknowledge your complaint within 48 hours and aim to resolve it
              within 30 days.
            </p>

            <h2 id="changes">16. Changes to this policy</h2>
            <p>
              If we change this policy, we will publish the revised version on this page
              and update the date at the top. If a change materially affects how we use
              personal data, we will also notify the businesses that use the Platform.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
