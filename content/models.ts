import { site } from "@/lib/site";

/**
 * The five property models, consolidated from products.component.html,
 * flyers.component.html and knowmore.component.html — three pages that
 * described the same five products, two of which nothing linked to.
 */

export type PropertyModel = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Sibling application, when one is live. */
  href?: string;
  status: "live" | "coming-soon";
};

export const propertyModels: PropertyModel[] = [
  {
    slug: "revenue",
    name: "Revenue Model",
    tagline: "Agricultural and revenue land",
    description:
      "Revenue land records, survey data and ownership history assembled into one verifiable picture, so agricultural land can be assessed and transacted with confidence.",
    href: site.external.revenueModel,
    status: "live",
  },
  {
    slug: "layout",
    name: "Layout Model",
    tagline: "Approved layouts and configurations",
    description:
      "Layout plans, plot configurations, dimensions and approval status — everything needed to understand what a layout actually offers before you commit.",
    href: site.external.layoutModel,
    status: "live",
  },
  {
    slug: "sites",
    name: "Sites (Plot) Model",
    tagline: "Individual plots",
    description:
      "Plot-level records covering dimensions, boundaries, orientation and documentation for individual sites within a layout.",
    status: "coming-soon",
  },
  {
    slug: "building",
    name: "Building (Structural) Model",
    tagline: "Built structures",
    description:
      "Structural records for built property — drawings, specifications, approvals and supervision history.",
    status: "coming-soon",
  },
  {
    slug: "rental",
    name: "Rental Model",
    tagline: "Leasing and yield",
    description:
      "Rental property records with flexible leasing options, tenancy history and yield information for income-producing assets.",
    href: site.external.rentalModel,
    status: "live",
  },
];
