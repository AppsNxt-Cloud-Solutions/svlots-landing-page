import {
  Check,
  KeyRound,
  Mail,
  MessageCircle,
  Phone,
  ScrollText,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import mountainLake from "@/assets/images/hero/mountain-lake.webp";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { ScrollLine } from "@/components/motion/scroll-progress";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/card";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import {
  crmClosing,
  crmEnquiry,
  crmSignupUrl,
  faqs,
  pricing,
  steps,
  talkToUs,
  trust,
} from "@/content/crm";
import { site, telHref, whatsappHref } from "@/lib/site";

/* ── Trust ────────────────────────────────────────────────────────────────── */

const trustIcons: ReactNode[] = [
  <ShieldCheck key="workspace" className="size-5" strokeWidth={1.6} />,
  <Users key="roles" className="size-5" strokeWidth={1.6} />,
  <ScrollText key="audit" className="size-5" strokeWidth={1.6} />,
  <KeyRound key="sign-in" className="size-5" strokeWidth={1.6} />,
];

export function Trust() {
  return (
    <Section tone="alt">
      <Container>
        <SectionHeading eyebrow={trust.eyebrow} title={trust.title} align="center" />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item, index) => (
            <StaggerItem key={item.title} className="h-full">
              <FeatureCard title={item.title} icon={trustIcons[index]}>
                {item.body}
              </FeatureCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

/* ── Three steps ──────────────────────────────────────────────────────────── */

export function Steps() {
  return (
    <Section size="lg">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={steps.eyebrow} title={steps.title} />
          <Reveal delay={0.15} className="mt-9">
            <ButtonLink href={crmSignupUrl} external size="lg">
              Create your workspace
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="relative">
          <ScrollLine className="absolute top-6 bottom-6 left-6 w-px" />
          {steps.items.map((step, index) => (
            <li key={step.title} className="relative flex gap-7 pb-14 last:pb-0">
              <Reveal direction="none" blur={false} amount={0.8}>
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-400 bg-surface font-display text-lg text-gold-700 shadow-soft">
                  {index + 1}
                </span>
              </Reveal>
              <Reveal delay={0.08} amount={0.6} className="pt-2">
                <h3 className="text-2xl">{step.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-ink-600">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ── Pricing ──────────────────────────────────────────────────────────────── */

export function Pricing() {
  return (
    <section className="relative grain isolate overflow-hidden bg-ink-950 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -z-10 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl"
      />
      <Container className="text-center">
        <Reveal blur={false}>
          <Eyebrow onDark>{pricing.eyebrow}</Eyebrow>
        </Reveal>
        <TextMask
          text={pricing.title}
          as="h2"
          accentWords={[0]}
          className="mx-auto mt-6 max-w-3xl text-6xl text-white"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            {pricing.body}
          </p>
        </Reveal>

        <Stagger className="mx-auto mt-12 grid max-w-3xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
          {pricing.included.map((item) => (
            <StaggerItem key={item}>
              <p className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink-100">
                <Check aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                {item}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-12">
          <ButtonLink href={crmSignupUrl} external size="lg">
            Start free
          </ButtonLink>
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-ink-400">
            {pricing.footnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */

export function Faq() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow="Questions" title="Before you sign up" />
        <Stagger className="divide-y divide-ink-200 border-y border-ink-200">
          {faqs.map((faq) => (
            <StaggerItem key={faq.q}>
              <details className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg text-ink-900 transition-colors hover:text-gold-700 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="relative size-4 shrink-0 text-gold-600 transition-transform duration-300 ease-brand group-open:rotate-45"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-ink-600">{faq.a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

/* ── Talk to us ───────────────────────────────────────────────────────────── */

export function TalkToUs() {
  return (
    <Section tone="warm" id="talk-to-us">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={talkToUs.eyebrow}
            title={talkToUs.title}
            intro={talkToUs.body}
          />
          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-4 text-ink-800">
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-700"
                >
                  <Phone aria-hidden="true" className="size-4 text-gold-600" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-700"
                >
                  <MessageCircle aria-hidden="true" className="size-4 text-gold-600" />
                  Message us on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-700"
                >
                  <Mail aria-hidden="true" className="size-4 text-gold-600" />
                  {site.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm
            enquiry={{ ...crmEnquiry, messagePlaceholder: talkToUs.messagePlaceholder }}
            successActions={
              <ButtonLink href={crmSignupUrl} external variant="secondary">
                Start free while you wait
              </ButtonLink>
            }
          />
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Closing ──────────────────────────────────────────────────────────────── */

export function CrmClosing() {
  return (
    <section className="relative grain isolate overflow-hidden bg-ink-950 py-24 md:py-32">
      <Image
        src={mountainLake}
        alt=""
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/85 via-ink-950/70 to-ink-950"
      />
      <Container className="text-center">
        <TextMask
          text={crmClosing.title}
          as="h2"
          accentWords={[2]}
          className="mx-auto max-w-3xl text-5xl text-white"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            {crmClosing.body}
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href={crmSignupUrl} external size="lg">
            Start free
          </ButtonLink>
          <ButtonLink href="#talk-to-us" size="lg" variant="onDark">
            Talk to us
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
