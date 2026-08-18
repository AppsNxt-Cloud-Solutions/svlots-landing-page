/**
 * Home page copy. Ported from main.component.html with light editorial polish.
 * Nothing here is invented — see the `stats` note below.
 */

export const hero = {
  eyebrow: "SV Lots India Pvt Ltd",
  title: "Elevating the value of your property",
  /** index of the word rendered in gold */
  accentWords: [4],
  intro:
    "Land surveying, valuation, layout development and end-to-end property solutions from Tumkur, Karnataka.",
};

export const intro = {
  eyebrow: "Who we are",
  title: "A property partner, not a broker",
  paragraphs: [
    "SV Lots is a trusted and dedicated real estate platform focused on delivering exceptional value to both property buyers and sellers. We are committed to providing a seamless experience that ensures the best outcomes for our clients — not only helping you maximise financial returns, but offering comprehensive, tailored property solutions that enhance the long-term value of your investment.",
    "We believe in a holistic approach to real estate, combining market insights, industry expertise and customer-centric strategies to create opportunities for growth. Our commitment is to your long-term prosperity, helping you make informed decisions that lead to sustainable, profitable outcomes.",
  ],
};

export type Pillar = {
  title: string;
  description: string;
  /** key into the DrawIcon glyph set */
  icon: "document" | "location" | "road" | "leaf";
};

export const pillars: Pillar[] = [
  {
    title: "Secure Documentation",
    description:
      "Title verification and proper documentation, so every transaction stands up to scrutiny.",
    icon: "document",
  },
  {
    title: "Strategic Locations",
    description:
      "Sites chosen for growth corridors and appreciation potential, not just availability.",
    icon: "location",
  },
  {
    title: "Easy Accessibility",
    description:
      "Ease of access and strong connectivity to roads, transit and civic infrastructure.",
    icon: "road",
  },
  {
    title: "Sustainable Developments",
    description:
      "Environmentally sustainable layouts that remain desirable decades after purchase.",
    icon: "leaf",
  },
];

/**
 * Only figures we can actually defend from existing material:
 *  - 30+ years — the Managing Director's "over three decades" in civil
 *    engineering and property development (aboutus.component.html).
 *  - 9 — the service lines listed on the Services page.
 *  - 5 — the published property models.
 * Deliberately no invented "acres surveyed" or "happy clients" numbers. Add
 * real ones here when the business supplies them.
 */
export const stats = [
  { value: 30, suffix: "+", label: "Years of engineering experience" },
  { value: 9, suffix: "", label: "Specialist service lines" },
  { value: 5, suffix: "", label: "Property models" },
];

export const closing = {
  title: "Count on us for your real estate needs",
  body: "Our goal is to offer properties that are not only resellable but future-proof, delivering long-term value. We help you make smart, sustainable investments that provide the best return for your money.",
};
