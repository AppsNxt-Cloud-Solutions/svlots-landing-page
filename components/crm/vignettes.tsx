"use client";

import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCheck,
  Globe,
  IndianRupee,
  Megaphone,
  MessageCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import leadProfile from "@/assets/images/crm/lead-profile.webp";
import pipeline from "@/assets/images/crm/pipeline.webp";
import { ScreenFrame } from "@/components/crm/screen-frame";
import { useChapterActive } from "@/components/motion/scroll-chapters";
import { cn } from "@/lib/utils";

/**
 * The visuals for the "one buyer's journey" chapters. The first two are real
 * screens with a small animated overlay; the last two are drawn, because
 * the moment they illustrate (a visit completing, an instalment landing) is a
 * change over time that a still cannot show.
 *
 * Each plays when its chapter becomes active and rests in its finished state
 * under reduced motion.
 */

const ease = [0.22, 1, 0.36, 1] as const;

function usePlay() {
  const active = useChapterActive();
  const reduced = useReducedMotion();
  return { on: active || Boolean(reduced), instant: Boolean(reduced) };
}

/* ── Capture ──────────────────────────────────────────────────────────────── */

const arrivals = [
  { label: "Facebook lead ad", icon: <Megaphone className="size-3.5" /> },
  { label: "Website enquiry", icon: <Globe className="size-3.5" /> },
  { label: "WhatsApp", icon: <MessageCircle className="size-3.5" /> },
];

export function CaptureVisual() {
  const { on, instant } = usePlay();
  return (
    <div className="relative">
      <ScreenFrame
        src={leadProfile}
        alt="A lead's profile in Bhoomi CRM: budget, property type, preferred locality, source and stage"
        path="/leads/ananya-reddy"
        tone="light"
      />
      <div className="absolute -bottom-6 -left-3 space-y-2 sm:-left-8">
        {arrivals.map((arrival, index) => (
          <motion.div
            key={arrival.label}
            initial={false}
            animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{
              duration: instant ? 0 : 0.5,
              delay: instant ? 0 : 0.2 + index * 0.18,
              ease,
            }}
            className="flex w-max items-center gap-2 rounded-pill border border-gold-300 bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-800 shadow-lift"
          >
            <span className="text-gold-600">{arrival.icon}</span>
            {arrival.label}
            <ArrowRight aria-hidden="true" className="size-3 text-ink-400" />
            <span className="text-forest-600">New lead</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Pipeline ─────────────────────────────────────────────────────────────── */

export function PipelineVisual() {
  const { on, instant } = usePlay();
  return (
    <div className="relative">
      <ScreenFrame
        src={pipeline}
        alt="The Bhoomi CRM leads board, with columns for New Enquiry, Contacted, Site Visit Scheduled and Negotiation"
        path="/leads/board"
        tone="light"
      />
      <motion.div
        initial={false}
        animate={on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: instant ? 0 : 0.6, delay: instant ? 0 : 0.35, ease }}
        className="absolute -right-3 -bottom-8 w-72 rounded-card border border-ink-200 bg-surface p-4 shadow-lift sm:-right-6"
      >
        <p className="text-2xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
          Stage changed
        </p>
        <p className="mt-2 text-sm font-medium text-ink-900">Ananya Reddy</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="rounded-pill bg-ink-100 px-2.5 py-0.5 text-ink-600">
            Site visit done
          </span>
          <ArrowRight aria-hidden="true" className="size-3 text-ink-400" />
          <span className="rounded-pill bg-gold-100 px-2.5 py-0.5 text-gold-700">
            Negotiation
          </span>
        </div>
        <p className="mt-3 border-t border-ink-200 pt-3 text-xs leading-relaxed text-ink-500">
          “Agreed on Plot 4 in principle” — Arjun Rao, 4:12 pm
        </p>
      </motion.div>
    </div>
  );
}

/* ── Drawn cards ──────────────────────────────────────────────────────────── */

function DrawnCard({
  icon,
  kicker,
  title,
  children,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col justify-center rounded-card border border-ink-200 bg-surface-warm p-6 shadow-soft sm:p-10">
      <div className="mx-auto w-full max-w-md rounded-card border border-ink-200 bg-surface p-6 shadow-lift">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            {icon}
          </span>
          <div>
            <p className="text-2xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
              {kicker}
            </p>
            <p className="text-base font-medium text-ink-900">{title}</p>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink-100 py-2.5 text-sm last:border-0">
      <span className="text-ink-500">{label}</span>
      <span className="text-right text-ink-900">{children}</span>
    </div>
  );
}

export function VisitVisual() {
  const { on, instant } = usePlay();
  return (
    <DrawnCard
      icon={<CalendarCheck className="size-5" strokeWidth={1.6} />}
      kicker="Site visit"
      title="Ananya Reddy · Greenfield Acres"
    >
      <Row label="When">Sat 2 Nov · 11:00</Row>
      <Row label="Plots">Plot 4, Plot 7</Row>
      <Row label="Host">Arjun Rao</Row>
      <Row label="Status">
        <span className="relative inline-grid">
          <motion.span
            initial={false}
            animate={{ opacity: on ? 0 : 1 }}
            transition={{ duration: instant ? 0 : 0.3, delay: instant ? 0 : 0.9 }}
            className="col-start-1 row-start-1 rounded-pill bg-ink-100 px-2.5 py-0.5 text-xs text-ink-600"
          >
            Scheduled
          </motion.span>
          <motion.span
            initial={false}
            animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.9 }}
            transition={{ duration: instant ? 0 : 0.35, delay: instant ? 0 : 1 }}
            className="col-start-1 row-start-1 inline-flex items-center gap-1 rounded-pill bg-forest-100 px-2.5 py-0.5 text-xs text-forest-700"
          >
            <Check aria-hidden="true" className="size-3" />
            Completed
          </motion.span>
        </span>
      </Row>
      <motion.p
        initial={false}
        animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : 1.3, ease }}
        className="mt-4 rounded-lg bg-gold-100 px-4 py-3 text-xs leading-relaxed text-gold-700"
      >
        Outcome: liked Plot 4 · wants the price sheet · follow-up set for Monday
      </motion.p>
    </DrawnCard>
  );
}

const instalments = [
  { label: "Booking amount", amount: "₹2,00,000", state: "Received" },
  { label: "Agreement · 20%", amount: "₹7,68,000", state: "Received" },
  { label: "Registration · 75%", amount: "₹28,80,000", state: "Due 15 Dec" },
];

export function BookingVisual() {
  const { on, instant } = usePlay();
  return (
    <DrawnCard
      icon={<IndianRupee className="size-5" strokeWidth={1.6} />}
      kicker="Booking BK-0142"
      title="Plot 4 · Greenfield Acres · ₹38.4 L"
    >
      <div className="flex items-center justify-between text-xs text-ink-500">
        <span>Collected</span>
        <span className="font-medium text-ink-800 tabular-nums">₹9.68 L of ₹38.4 L</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-pill bg-ink-100">
        <motion.div
          className="h-full origin-left rounded-pill bg-gold-500"
          initial={false}
          animate={{ scaleX: on ? 0.252 : 0 }}
          transition={{ duration: instant ? 0 : 1.1, delay: instant ? 0 : 0.3, ease }}
        />
      </div>
      <ul className="mt-5">
        {instalments.map((item, index) => (
          <motion.li
            key={item.label}
            initial={false}
            animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            transition={{
              duration: instant ? 0 : 0.45,
              delay: instant ? 0 : 0.5 + index * 0.15,
              ease,
            }}
            className="flex items-center justify-between gap-3 border-b border-ink-100 py-2.5 text-sm last:border-0"
          >
            <span className="text-ink-600">{item.label}</span>
            <span className="flex items-center gap-3">
              <span className="text-ink-900 tabular-nums">{item.amount}</span>
              <span
                className={cn(
                  "rounded-pill px-2.5 py-0.5 text-2xs font-medium",
                  item.state === "Received"
                    ? "bg-forest-100 text-forest-700"
                    : "bg-gold-100 text-gold-700",
                )}
              >
                {item.state}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    </DrawnCard>
  );
}

/* ── WhatsApp conversation ────────────────────────────────────────────────── */

type ChatMessage = { from: "buyer" | "agent"; text: string; time: string };

/**
 * A WhatsApp thread that writes itself once it scrolls into view, ending with
 * the system note that the conversation turned into a booked site visit.
 * Drawn rather than captured: it shows the conversation unfolding.
 */
export function ChatVignette({
  contact,
  messages,
  systemNote,
}: {
  contact: string;
  messages: readonly ChatMessage[];
  systemNote: string;
}) {
  const reduced = useReducedMotion();
  const step = 0.9;

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 shadow-lift">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-gold-500 text-sm font-semibold text-ink-950">
          AR
        </span>
        <div>
          <p className="text-sm font-medium text-white">{contact}</p>
          <p className="text-2xs text-ink-400">WhatsApp · linked to lead</p>
        </div>
      </div>

      <motion.ul
        className="space-y-3 px-4 py-5"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: step } } }}
      >
        {messages.map((message) => (
          <motion.li
            key={message.time}
            data-motion="reveal"
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease },
              },
            }}
            className={cn(
              "flex",
              message.from === "agent" ? "justify-end" : "justify-start",
            )}
          >
            <p
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                message.from === "agent"
                  ? "rounded-br-sm bg-gold-500 text-ink-950"
                  : "rounded-bl-sm bg-white/10 text-ink-100",
              )}
            >
              {message.text}
              <span
                className={cn(
                  "mt-1 flex items-center justify-end gap-1 text-[0.625rem]",
                  message.from === "agent" ? "text-ink-800" : "text-ink-400",
                )}
              >
                {message.time}
                {message.from === "agent" && (
                  <CheckCheck aria-hidden="true" className="size-3" />
                )}
              </span>
            </p>
          </motion.li>
        ))}
        <motion.li
          data-motion="reveal"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
          }}
          className="flex justify-center pt-2"
        >
          <span className="inline-flex items-center gap-2 rounded-pill border border-forest-500/40 bg-forest-500/15 px-3.5 py-1.5 text-2xs font-medium text-forest-100">
            <CalendarCheck aria-hidden="true" className="size-3.5" />
            {systemNote}
          </span>
        </motion.li>
      </motion.ul>
    </div>
  );
}
