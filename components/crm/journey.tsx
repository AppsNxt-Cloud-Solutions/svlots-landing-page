import { Check } from "lucide-react";
import type { ReactNode } from "react";
import {
  BookingVisual,
  CaptureVisual,
  PipelineVisual,
  VisitVisual,
} from "@/components/crm/vignettes";
import { ScrollChapters } from "@/components/motion/scroll-chapters";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { type JourneyChapter, journey } from "@/content/crm";

const visuals: Record<JourneyChapter["id"], ReactNode> = {
  capture: <CaptureVisual />,
  pipeline: <PipelineVisual />,
  visit: <VisitVisual />,
  booking: <BookingVisual />,
};

/**
 * Act two: one lead's life, told in four scroll chapters. The visual column is
 * pinned on desktop and changes as each chapter passes the middle of the
 * screen.
 */
export function Journey() {
  return (
    <Section id="journey" className="overflow-x-clip">
      <Container>
        <SectionHeading
          eyebrow={journey.eyebrow}
          title={journey.title}
          intro={journey.intro}
        />

        <ScrollChapters
          className="mt-20 lg:mt-8"
          chapters={journey.chapters.map((chapter, index) => ({
            id: chapter.id,
            label: chapter.step,
            visual: visuals[chapter.id],
            // Keyed because ScrollChapters (a client component) renders this
            // server-built element beside the mobile visual, and React checks
            // keys on elements that cross that boundary.
            content: (
              <div key={chapter.id} className="max-w-lg">
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
                  <span className="font-display text-2xl tracking-normal text-ink-300 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {chapter.step}
                </p>
                <h3 className="mt-4 text-3xl text-balance-tight">{chapter.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">
                  {chapter.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {chapter.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.95rem] text-ink-700">
                      <Check
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-gold-600"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          }))}
        />
      </Container>
    </Section>
  );
}
