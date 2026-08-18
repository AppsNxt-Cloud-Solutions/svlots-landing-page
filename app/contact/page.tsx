import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import treeSunset from "@/assets/images/hero/tree-sunset.webp";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/section";
import { formattedAddress, site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Talk to ${site.legalName} about land, layouts, survey or valuation. Call ${site.phone.display} or send an enquiry — our office is in Tumkur, Karnataka.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are looking for"
        accentWords={[1]}
        image={treeSunset}
        imageAlt=""
        intro="Send an enquiry and it reaches the team directly, or call us if you would rather talk it through."
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Direct contact routes first — calls convert best in this market */}
          <div>
            <Reveal>
              <h2 className="text-2xl">Reach us directly</h2>
              <span aria-hidden="true" className="mt-5 block h-px w-12 rule-gold" />
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-7">
                <li>
                  <p className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                    Phone
                  </p>
                  <a
                    href={telHref}
                    className="mt-2 flex items-center gap-3 text-lg text-ink-900 transition-colors hover:text-gold-700"
                  >
                    <Phone aria-hidden="true" className="size-4 text-gold-600" />
                    {site.phone.display}
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-gold-700"
                  >
                    <MessageCircle aria-hidden="true" className="size-4 text-gold-600" />
                    Message on WhatsApp
                  </a>
                </li>

                <li>
                  <p className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 flex items-center gap-3 text-ink-900 transition-colors hover:text-gold-700"
                  >
                    <Mail aria-hidden="true" className="size-4 text-gold-600" />
                    {site.email}
                  </a>
                </li>

                <li>
                  <p className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                    Office
                  </p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex gap-3 leading-relaxed text-ink-700 transition-colors hover:text-gold-700"
                  >
                    <MapPin
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-gold-600"
                    />
                    {formattedAddress}
                  </a>
                </li>

                <li>
                  <p className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                    Hours
                  </p>
                  <p className="mt-2 flex items-center gap-3 text-ink-700">
                    <Clock aria-hidden="true" className="size-4 text-gold-600" />
                    Monday to Saturday, 9:30am – 6:30pm
                  </p>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal direction="left">
            {/* Suspense: the form reads useSearchParams for ?service= */}
            <Suspense
              fallback={
                <div className="h-125 rounded-card border border-ink-200 bg-surface-alt" />
              }
            >
              <ContactForm />
            </Suspense>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
