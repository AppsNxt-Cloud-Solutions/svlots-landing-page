/**
 * Bhoomi CRM page copy.
 *
 * Every capability named here exists in the product today (bhoomi-crm,
 * docs/feature-status.md). Keep it that way: no AI claims until the assistant
 * ships, no lead import until there is one, and pricing stays "early access"
 * until there is billing to describe.
 */

import { site } from "@/lib/site";

export const crmSignupUrl = `${site.crm.url}/signup`;

/** Enquiry type the "Talk to us" form sends, and how the lead is titled. */
export const crmEnquiry = { slug: "bhoomi-crm", title: "Bhoomi CRM" } as const;

export const crmHero = {
  eyebrow: "Bhoomi CRM · from SV Lots",
  title: "Never lose an enquiry again",
  accentWords: [3],
  intro:
    "The CRM built for Indian real-estate consultants. Leads from every ad and portal, WhatsApp and calls, site visits, inventory and bookings — in one workspace your whole team shares.",
  assurances: ["Free during early access", "No card required", "Set up in minutes"],
};

/* ── Act one: the chaos ─────────────────────────────────────────────────── */

export type ChaosSource = {
  label: string;
  icon: "ad" | "web" | "whatsapp" | "missed" | "portal" | "walkin" | "referral" | "sheet";
};

export const chaos = {
  eyebrow: "The problem",
  before:
    "A Facebook lead in one inbox. A WhatsApp enquiry on somebody's phone. A missed call nobody returned. The follow-up list in an Excel sheet.",
  after:
    "Bhoomi puts every enquiry in one shared list — tagged with where it came from, with an owner and a next step.",
  sources: [
    { label: "Facebook lead ad", icon: "ad" },
    { label: "Website enquiry", icon: "web" },
    { label: "WhatsApp message", icon: "whatsapp" },
    { label: "Missed call", icon: "missed" },
    { label: "99acres", icon: "portal" },
    { label: "MagicBricks", icon: "portal" },
    { label: "Site walk-in", icon: "walkin" },
    { label: "Referral partner", icon: "referral" },
    { label: "Old Excel sheet", icon: "sheet" },
  ] satisfies ChaosSource[],
};

/* ── Act two: a lead's journey ──────────────────────────────────────────── */

export type JourneyChapter = {
  id: "capture" | "pipeline" | "visit" | "booking";
  step: string;
  title: string;
  body: string;
  points: string[];
};

export const journey = {
  eyebrow: "One buyer's journey",
  title: "Follow Ananya from enquiry to booking",
  intro:
    "Every stage of a sale lives in the same record, so nobody has to ask who spoke to her last.",
  chapters: [
    {
      id: "capture",
      step: "Capture",
      title: "Captured the moment she enquires",
      body: "Facebook lead ads arrive on their own and are shared round-robin across the team you choose. So do your website enquiry form, WhatsApp messages, and anything your other systems send through the API.",
      points: [
        "Source tagged on every lead",
        "Possible duplicates flagged and merged",
        "Requirement, budget and locality on one profile",
      ],
    },
    {
      id: "pipeline",
      step: "Pipeline",
      title: "A pipeline that matches how you sell",
      body: "New enquiry to booked, laid out as a board your team actually uses. Stage rules can insist on a site visit before negotiation, and every move records who made it and why.",
      points: [
        "Multiple pipelines, one default",
        "Owners, teams and follow-ups on every card",
        "Stuck leads surfaced before they go cold",
      ],
    },
    {
      id: "visit",
      step: "Site visit",
      title: "Site visits that don't fall through",
      body: "Schedule the visit against a project, choose who hosts it, and record how it went. If a visit is missed, an automation raises the follow-up for you.",
      points: [
        "Today's visits on every salesperson's home screen",
        "Outcomes recorded, not remembered",
        "No-shows turned into callbacks",
      ],
    },
    {
      id: "booking",
      step: "Booking",
      title: "Bookings and payments, to the last instalment",
      body: "Book a unit and it comes off the market. Record each receipt against the booking and see at a glance what is due, received or bounced.",
      points: [
        "Unit status updates itself",
        "Bounced payments chased automatically",
        "KYC collection raised as a task",
      ],
    },
  ] satisfies JourneyChapter[],
};

/* ── Act three: the workspace ───────────────────────────────────────────── */

export const chat = {
  eyebrow: "Channels",
  title: "Talk to buyers where they already are",
  intro:
    "WhatsApp, SMS and phone calls run from inside the lead, so every conversation stays on the record — even when a salesperson moves on.",
  contact: "Ananya Reddy",
  messages: [
    {
      from: "buyer",
      text: "Hi, saw your ad for Greenfield Acres. Any 30×40 plots left?",
      time: "10:42",
    },
    {
      from: "agent",
      text: "Yes — Plot 4 and Plot 7, both east facing. Shall I book a site visit for Saturday?",
      time: "10:44",
    },
    { from: "buyer", text: "Saturday 11 am works 👍", time: "10:45" },
  ] as const,
  systemNote: "Site visit scheduled · Sat 11:00 · Greenfield Acres",
  channels: [
    {
      title: "WhatsApp",
      body: "A shared team inbox on your WhatsApp Business number, with approved templates and every chat linked to its lead.",
    },
    {
      title: "SMS",
      body: "DLT-registered templates for reminders and campaigns, sent from your own sender ID.",
    },
    {
      title: "Calls",
      body: "Click-to-call through Exotel, with recordings and call outcomes logged against the lead.",
    },
    {
      title: "Campaigns",
      body: "Send a WhatsApp or SMS campaign to a filtered list of leads and track every delivery.",
    },
  ],
};

export const inventory = {
  eyebrow: "Inventory & maps",
  title: "Know what's available before the buyer asks",
  body: "Every project, tower and unit with its live status. Holds lapse on their own, so a plot is never 'on hold' for a buyer who walked away weeks ago. Layout maps show plots, roads and amenities, with a public page you can share.",
  statuses: [
    { label: "Available", value: 17, tone: "forest" },
    { label: "On hold", value: 1, tone: "gold" },
    { label: "Booked", value: 3, tone: "ink" },
    { label: "Sold", value: 2, tone: "ink" },
  ] as const,
};

export const automation = {
  eyebrow: "Automations & insights",
  title: "The follow-up happens, even on a busy day",
  intro:
    "Switch on ready-made recipes and Bhoomi creates the task, moves the stage or alerts the right person — the moment something happens.",
  flows: [
    {
      when: "A website enquiry arrives",
      action: "Call-back task for the team within the hour",
    },
    {
      when: "A site visit is missed",
      action: "Follow-up task to reschedule, with the host",
    },
    {
      when: "A booking is made",
      action: "Lead moves to Booked and KYC collection starts",
    },
    {
      when: "A payment bounces",
      action: "A task to chase it lands with the right person",
    },
  ],
  insights: [
    "Today's schedule and overdue work on every home screen",
    "Company, team and inventory dashboards",
    "Reports you can export to CSV whenever you like",
    "Team alerts on WhatsApp for the moments that matter",
  ],
};

export const developers = {
  eyebrow: "API & webhooks",
  title: "Connected to the rest of your business",
  body: "Create an API key and send leads in from your website, a booking bot or a partner system. Register a webhook and Bhoomi tells your systems the moment a WhatsApp message arrives — signed, retried for a day, and logged.",
  points: [
    "Scoped keys you can revoke one at a time",
    "Idempotent requests, so retries never duplicate a lead",
    "A delivery log for every webhook attempt",
  ],
  snippet: [
    `curl -X POST ${site.crm.url}/api/v1/ext/leads \\`,
    `  -H "Authorization: Bearer bk_live_…" \\`,
    `  -H "Idempotency-Key: enquiry-8812" \\`,
    `  -d '{"fullName":"Ananya Reddy",`,
    `       "phone":"+91 98450 11001",`,
    `       "preferredLocality":"JP Nagar"}'`,
  ],
  response: `201 Created · lead added to "New Enquiry"`,
};

export const trust = {
  eyebrow: "Trust",
  title: "Your leads stay yours",
  items: [
    {
      title: "Your own workspace",
      body: "Every record belongs to one workspace and is checked on the server for every request. No other firm can see your leads.",
    },
    {
      title: "Roles and data scope",
      body: "Decide who sees their own leads, their team's or everything — and who can export, delete or change locked fields.",
    },
    {
      title: "An audit trail",
      body: "Sign-ins and important changes are recorded with who made them and when.",
    },
    {
      title: "Secure sign-in",
      body: "Hashed passwords, lockout after repeated failures, and one click to sign out everywhere.",
    },
  ],
};

/* ── Act four: getting started ──────────────────────────────────────────── */

export const steps = {
  eyebrow: "Get started",
  title: "From sign-up to first lead in an afternoon",
  items: [
    {
      title: "Create your workspace",
      body: "Your name, your firm, your work email and mobile. Two minutes.",
    },
    {
      title: "Verify your email",
      body: "Click the link we send and your workspace is live — with a starter pipeline, inventory statuses and roles already set up.",
    },
    {
      title: "Invite your team",
      body: "Add your salespeople, give them roles, and start assigning leads.",
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Free during early access",
  body: "No card, no trial clock. Every feature on this page is included while Bhoomi is in early access.",
  footnote:
    "WhatsApp, SMS and calling use your own Meta, SMS and Exotel accounts, which charge at their own rates.",
  included: [
    "Leads, pipelines and follow-ups",
    "Your whole team",
    "Inventory, maps and bookings",
    "WhatsApp, SMS and calls",
    "Automations and reports",
    "API and webhooks",
  ],
};

export const faqs = [
  {
    q: "Who is Bhoomi for?",
    a: "Real-estate consultants, channel partners and brokerages in India who sell for developers — from a two-person office to a team spread across cities.",
  },
  {
    q: "Is it really free?",
    a: "Yes. Bhoomi is free while it is in early access, and you do not need a card to sign up.",
  },
  {
    q: "Do I need the WhatsApp Business API?",
    a: "Only to send and receive WhatsApp messages from inside Bhoomi — you connect your own WhatsApp Business number through Meta. Everything else works without it.",
  },
  {
    q: "Does it work on my phone?",
    a: "Bhoomi runs in the browser on a laptop, tablet or phone. There is nothing to install.",
  },
  {
    q: "Who can see my leads?",
    a: "Only people you invite into your workspace, and only as much as their role allows. Each workspace is isolated from every other.",
  },
  {
    q: "Can I take my data out?",
    a: "Yes. Leads and reports can be exported to CSV at any time, and our privacy policy explains how we delete data when you leave.",
  },
];

export const crmClosing = {
  title: "Your next enquiry deserves better than a notebook",
  body: "Create your workspace in two minutes, or tell us about your team and we'll walk you through it.",
};

export const talkToUs = {
  eyebrow: "Talk to us",
  title: "Prefer a walkthrough first?",
  body: "Tell us how your team handles leads today. We'll call you back and show you Bhoomi with your own projects in mind.",
  messagePlaceholder:
    "How many people are on your team, which projects do you sell, and where do your leads come from today?",
};

export const homeTeaser = {
  eyebrow: "New from SV Lots",
  title: "Bhoomi CRM for real-estate consultants",
  body: "The software we run our own sales on — leads, WhatsApp, site visits, inventory and bookings in one place. Free during early access.",
};
