import Image from "next/image";
import mountainLake from "@/assets/images/hero/mountain-lake.webp";
import { Reveal } from "@/components/motion/reveal";
import { TextMask } from "@/components/motion/text-mask";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { closing } from "@/content/home";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative grain isolate overflow-hidden bg-ink-950 py-24 md:py-32">
      <Image
        src={mountainLake}
        alt=""
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 -z-20 size-full object-cover opacity-35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/85 via-ink-950/70 to-ink-950"
      />

      <Container className="text-center">
        <TextMask
          text={closing.title}
          as="h2"
          accentWords={[0]}
          className="mx-auto max-w-3xl text-5xl text-white"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            {closing.body}
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" size="lg">
            Start a conversation
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} size="lg" variant="onDark" external>
            {site.email}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
