import { site } from "@/lib/site";

/**
 * The five property models, consolidated from products.component.html,
 * flyers.component.html and knowmore.component.html — three separate pages
 * describing the same five products, two of which nothing linked to.
 *
 * IMPORTANT CORRECTION: these are not passive data records. Per
 * knowmore.component.html they are **automatic flyer-generation tools** — fill a
 * form, upload media, and the system produces a downloadable, shareable flyer
 * for the property. The descriptions below reflect what the products actually
 * do.
 */

export type PropertyModel = {
  slug: string;
  name: string;
  /** The flyer type this model produces, where one exists. */
  flyerName?: string;
  tagline: string;
  description: string;
  captures: string[];
  /** Sibling application, when one is live. */
  href?: string;
  status: "live" | "coming-soon";
};

export const propertyModels: PropertyModel[] = [
  {
    slug: "revenue",
    name: "Revenue Model",
    flyerName: "Agricultural Flyer",
    tagline: "Agricultural and revenue land",
    description:
      "Built for promoting agricultural properties and land. Capture the details of a holding, add photographs and video, and the system generates an informative flyer that shows the land's potential to buyers and investors.",
    captures: [
      "Land size and extent",
      "Pricing",
      "Encroachment status",
      "Agricultural features",
    ],
    href: site.external.revenueModel,
    status: "live",
  },
  {
    slug: "layout",
    name: "Layout Model",
    flyerName: "Layout Flyer",
    tagline: "Approved layouts and configurations",
    description:
      "Streamlines the marketing of a layout. Complete one comprehensive form covering the property layout and the system compiles it, with your media, into a professional-quality flyer optimised for clarity and impact.",
    captures: ["Dimensions", "Location", "Amenities", "Pricing"],
    href: site.external.layoutModel,
    status: "live",
  },
  {
    slug: "rental",
    name: "Rental Model",
    flyerName: "Rental Flyer",
    tagline: "Leasing and yield",
    description:
      "Simplifies promoting a rental property. Submit the property's details and media, and the system produces an eye-catching flyer crafted to capture the attention of prospective tenants.",
    captures: [
      "Property type",
      "Dimension and area",
      "Location",
      "Special features and amenities",
    ],
    href: site.external.rentalModel,
    status: "live",
  },
  {
    slug: "sites",
    name: "Sites (Plot) Model",
    tagline: "Individual plots",
    description:
      "Plot-level records covering dimensions, boundaries, orientation and documentation for individual sites within a layout.",
    captures: ["Plot dimensions", "Boundaries", "Orientation", "Documentation"],
    status: "coming-soon",
  },
  {
    slug: "building",
    name: "Building (Structural) Model",
    tagline: "Built structures",
    description:
      "Structural records for built property — drawings, specifications, approvals and supervision history in one place.",
    captures: ["Drawings", "Specifications", "Approvals", "Supervision history"],
    status: "coming-soon",
  },
];

/** The shared four-step flow, identical across all three live flyer tools. */
export const flyerSteps = [
  {
    title: "Fill in the form",
    body: "A guided form captures every essential detail about the property — dimensions, extent, pricing, amenities and features.",
  },
  {
    title: "Upload your media",
    body: "Add high-quality photographs and video. Visuals are what actually sell a property, so the tool makes including them effortless.",
  },
  {
    title: "Generate automatically",
    body: "On submit, the system compiles your information and media into a professional flyer, designed for clarity and impact.",
  },
  {
    title: "Download and share",
    body: "Export instantly as PDF or JPEG for print or digital use, and share straight to email or social media.",
  },
];
