import { Check } from "lucide-react";
import apiKeys from "@/assets/images/crm/api-keys.webp";
import webhooks from "@/assets/images/crm/webhooks.webp";
import { ScreenFrame } from "@/components/crm/screen-frame";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { developers } from "@/content/crm";

/** For the technical reader: a real request, the response, and the screens behind them. */
export function Developers() {
  return (
    <Section tone="ink" size="lg" className="relative grain isolate overflow-hidden">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            onDark
            eyebrow={developers.eyebrow}
            title={developers.title}
            intro={developers.body}
          />
          <ul className="mt-8 space-y-3">
            {developers.points.map((point) => (
              <li key={point} className="flex gap-3 text-ink-300">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-gold-400"
                />
                {point}
              </li>
            ))}
          </ul>

          <Reveal delay={0.1} className="mt-10">
            <figure className="overflow-hidden rounded-card border border-white/10 bg-ink-900 shadow-lift">
              <figcaption className="flex items-center justify-between border-b border-white/10 px-5 py-2.5 text-2xs tracking-[0.16em] text-ink-400 uppercase">
                <span>Create a lead</span>
                <span className="text-gold-300">POST /ext/leads</span>
              </figcaption>
              <Stagger
                gap={0.12}
                className="overflow-x-auto px-5 py-4 font-mono text-xs leading-relaxed sm:text-[0.8125rem]"
              >
                {developers.snippet.map((line) => (
                  <StaggerItem key={line} y={6}>
                    <code className="block whitespace-pre text-ink-200">{line}</code>
                  </StaggerItem>
                ))}
                <StaggerItem y={6}>
                  <code className="mt-3 block whitespace-pre text-forest-100">
                    → {developers.response}
                  </code>
                </StaggerItem>
              </Stagger>
            </figure>
          </Reveal>
        </div>

        <div className="relative hidden pb-28 lg:block">
          <Parallax distance={5}>
            <ScreenFrame
              src={webhooks}
              alt="Webhook endpoints in Bhoomi CRM, each subscribed to WhatsApp message events"
              path="/integrations/developers/webhooks"
              tone="light"
            />
          </Parallax>
          <Reveal direction="up" className="absolute -bottom-4 -left-10 w-[86%]">
            <Parallax distance={-9}>
              <ScreenFrame
                src={apiKeys}
                alt="API keys in Bhoomi CRM, each with its own scopes and a revoke button"
                path="/integrations/developers"
                tone="light"
                className="shadow-gold"
              />
            </Parallax>
          </Reveal>
        </div>

        {/* One screen is enough on a phone. */}
        <Reveal className="lg:hidden">
          <ScreenFrame
            src={apiKeys}
            alt="API keys in Bhoomi CRM, each with its own scopes and a revoke button"
            path="/integrations/developers"
            tone="light"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
