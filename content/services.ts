/**
 * The nine service lines, ported from services.component.html.
 *
 * Typos in the source copy are corrected here: "CONSULATNCY" -> Consultancy,
 * "at team of certified cheated valuator" -> "a team of certified chartered
 * valuers", "Analise" -> analyse, "successful compression" -> completion.
 */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail?: string;
  icon:
    | "survey"
    | "infrastructure"
    | "supervision"
    | "valuation"
    | "vastu"
    | "solutions"
    | "technology"
    | "consultancy"
    | "insurance";
};

export const services: Service[] = [
  {
    slug: "precision-land-surveying",
    title: "Precision Land Surveying",
    summary:
      "Advanced digital surveys with detailed georeferenced reports for all property types.",
    detail:
      "Total-station and DGPS survey work producing georeferenced drawings you can take to an authority or a buyer, for agricultural land, layouts and built plots alike.",
    icon: "survey",
  },
  {
    slug: "infrastructure-consultants",
    title: "Infrastructure Consultants",
    summary:
      "Expert consultancy for city planning, layouts, roads and residential projects.",
    detail:
      "Planning and coordination across roads, drainage, water and electrical infrastructure for layout and township development.",
    icon: "infrastructure",
  },
  {
    slug: "supervision",
    title: "Project Supervision",
    summary:
      "Complete supervision of projects against design drawings and actual site conditions.",
    detail:
      "Our team supervises execution against the design drawings with respect to real site conditions, catching deviations while they are still inexpensive to correct.",
    icon: "supervision",
  },
  {
    slug: "property-valuation",
    title: "Property Valuation",
    summary:
      "A team of certified chartered valuers, empanelled with KIADB and nationalised banks.",
    detail:
      "Valuation reports accepted for lending, acquisition and dispute resolution, prepared by valuers empanelled with KIADB and nationalised banks.",
    icon: "valuation",
  },
  {
    slug: "technical-vastu",
    title: "Technical Vastu Consultants",
    summary:
      "Analysis of technical Vastu suitability, aligning your project with site and orientation.",
    detail:
      "Our team analyses Vastu suitability in a way that works with the engineering of the site rather than against it, supporting a favourable and timely completion.",
    icon: "vastu",
  },
  {
    slug: "real-estate-solutions",
    title: "Real Estate Solutions",
    summary:
      "Comprehensive services from premium plot selection to complete property development.",
    icon: "solutions",
  },
  {
    slug: "smart-technology",
    title: "Smart Technology Integration",
    summary:
      "Our property development approach is enhanced by custom-built smart applications.",
    detail:
      "The property models are backed by purpose-built software, so records, drawings and approvals stay in one place instead of a folder of scans.",
    icon: "technology",
  },
  {
    slug: "technical-consultancy",
    title: "Technical Consultancy",
    summary:
      "Infrastructure planning, GIS-based development and comprehensive project management.",
    icon: "consultancy",
  },
  {
    slug: "general-insurance",
    title: "General Insurance",
    summary:
      "Industry Care Policy, Plant & Machinery, Marine and other commercial insurance lines.",
    icon: "insurance",
  },
];
