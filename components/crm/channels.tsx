import { Megaphone, MessageCircle, MessageSquareText, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";
import { ChatVignette } from "@/components/crm/vignettes";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { chat } from "@/content/crm";

const icons: Record<string, ReactNode> = {
  WhatsApp: <MessageCircle className="size-5" strokeWidth={1.6} />,
  SMS: <MessageSquareText className="size-5" strokeWidth={1.6} />,
  Calls: <PhoneCall className="size-5" strokeWidth={1.6} />,
  Campaigns: <Megaphone className="size-5" strokeWidth={1.6} />,
};

export function Channels() {
  return (
    <Section tone="ink" size="lg" className="relative grain isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-40 -z-10 size-[36rem] -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal direction="right" className="order-2 lg:order-1">
          <ChatVignette
            contact={chat.contact}
            messages={chat.messages}
            systemNote={chat.systemNote}
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            onDark
            eyebrow={chat.eyebrow}
            title={chat.title}
            intro={chat.intro}
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
            {chat.channels.map((channel) => (
              <StaggerItem key={channel.title} className="h-full">
                <Card tone="dark" className="h-full p-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                    {icons[channel.title]}
                  </span>
                  <h3 className="mt-5 text-xl text-white">{channel.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {channel.body}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
