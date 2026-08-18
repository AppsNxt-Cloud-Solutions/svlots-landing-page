/**
 * Single source of truth for company facts used across metadata, JSON-LD,
 * the footer and contact surfaces. All values carried over from the Angular
 * site's shell template and About page.
 */

export const site = {
  name: "SV Lots",
  legalName: "SV Lots India Pvt Ltd",
  tagline: "Elevating Value of Property",
  description:
    "SV Lots is a dedicated real estate platform in Tumkur, Karnataka — land surveying, valuation, layout development and property solutions that raise the long-term value of your investment.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://svlots.com",

  email: "info@svlots.com",

  /**
   * Recovered from the company's own carousel1.png marketing banner and
   * confirmed by the client. The Angular site never surfaced a phone number
   * anywhere, in a market that converts on calls.
   */
  phone: {
    display: "+91 72045 13996",
    /** E.164, for tel: and wa.me links */
    e164: "+917204513996",
  },
  whatsapp: "917204513996",

  address: {
    line1: '"Omkara", 5th Cross, SIT Extension',
    city: "Tumkur",
    region: "Karnataka",
    postalCode: "572102",
    country: "IN",
  },

  mapsUrl: "https://www.google.com/maps/place/Chirantana",

  developer: {
    name: "AppsNxt Cloud Solutions",
  },

  /** Sibling products the "Get Access" CTAs point at. */
  external: {
    revenueModel: "https://sathyananda.balajitransports.in",
    layoutModel: "https://layout.balajitransports.in",
    rentalModel: "https://rentalproperty.balajitransports.in",
  },
} as const;

export const telHref = `tel:${site.phone.e164}`;
export const whatsappHref = `https://wa.me/${site.whatsapp}`;

export const formattedAddress = [
  site.address.line1,
  `${site.address.city} - ${site.address.postalCode}`,
  site.address.region,
].join(", ");

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  {
    label: "Property Models",
    href: "/property-models",
    children: [
      {
        label: "All models",
        href: "/property-models",
        description: "Revenue, Layout, Sites, Building and Rental models",
      },
      {
        label: "Area Calculator",
        href: "/tools/area-calculator",
        description: "Measure irregular plots from side lengths",
      },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Insights", href: "/insights" },
];

export const footerNav = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Property Models", href: "/property-models" },
  ],
  explore: [
    { label: "Gallery", href: "/gallery" },
    { label: "Insights", href: "/insights" },
    { label: "Area Calculator", href: "/tools/area-calculator" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ],
};
