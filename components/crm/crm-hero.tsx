import { Check } from "lucide-react";
import dashboard from "@/assets/images/crm/dashboard.webp";
import { ScreenFrame } from "@/components/crm/screen-frame";
import { Reveal } from "@/components/motion/reveal";
import { ScrollTilt } from "@/components/motion/scroll-tilt";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { crmHero, crmSignupUrl } from "@/content/crm";

/**
 * Opening: the promise, the two ways in, and the product itself — tipped back
 * in perspective and settling flat as the visitor starts to scroll.
 */
export function CrmHero() {
  return (
    <section className="relative grain isolate overflow-hidden bg-ink-950 pt-18">
      {/* Gold light behind the product shot */}
      <div
        aria-hidden="true"
        className="absolute top-[38%] left-1/2 -z-10 h-[42rem] w-[min(70rem,140vw)] -translate-x-1/2 rounded-full bg-gold-500/15 blur-3xl"
      />

      <Container className="pt-16 text-center md:pt-24">
        <Reveal blur={false}>
          <Eyebrow onDark>{crmHero.eyebrow}</Eyebrow>
        </Reveal>

        <TextMask
          text={crmHero.title}
          as="h1"
          accentWords={crmHero.accentWords}
          mask={false}
          className="mx-auto mt-6 max-w-4xl text-7xl text-white"
        />

        {/* Not wrapped in Reveal: likely LCP, and it should paint at once. */}
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">
          {crmHero.intro}
        </p>

        <Reveal delay={0.3} className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href={crmSignupUrl} external size="lg">
            Start free
          </ButtonLink>
          <ButtonLink href="#talk-to-us" size="lg" variant="onDark">
            Talk to us
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.4}>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-400">
            {crmHero.assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>

      <Container className="mt-16 pb-20 md:mt-20 md:pb-28">
        <ScrollTilt className="mx-auto max-w-6xl">
          <ScreenFrame
            src={dashboard}
            alt="The Bhoomi CRM insights screen: today's schedule, leads assigned to you, and work that needs attention"
            path="/insights"
            priority
            sizes="(min-width: 1280px) 72rem, 100vw"
          />
        </ScrollTilt>
      </Container>
    </section>
  );
}
