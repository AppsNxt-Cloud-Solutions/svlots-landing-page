import type { Metadata } from "next";
import euphoriaHero from "@/assets/images/projects/euphoria/hero.webp";
import euphoriaOne from "@/assets/images/projects/euphoria/view-01.webp";
import euphoriaTwo from "@/assets/images/projects/euphoria/view-02.webp";
import elevation from "@/assets/images/projects/prestige/elevation.webp";
import gardenCourts from "@/assets/images/projects/prestige/garden-courts.webp";
import gym from "@/assets/images/projects/prestige/gym.webp";
import interior from "@/assets/images/projects/prestige/interior.webp";
import lakesideLawn from "@/assets/images/projects/prestige/lakeside-lawn.webp";
import pool from "@/assets/images/projects/prestige/pool.webp";
import skyTerrace from "@/assets/images/projects/prestige/sky-terrace.webp";
import towersLake from "@/assets/images/projects/prestige/towers-lake.webp";
import coverageMap from "@/assets/images/sections/coverage-map.webp";
import plotMeasurement from "@/assets/images/sections/plot-measurement.webp";
import { PageHero } from "@/components/layout/page-hero";
import { type GalleryItem, LightboxGallery } from "@/components/gallery/lightbox-gallery";
import { Container, Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography from SV Lots projects — Prestige Raintree Park in Whitefield, Sowparnika Euphoria, and survey work across Tumkur district.",
  alternates: { canonical: "/gallery" },
};

const prestige: GalleryItem[] = [
  {
    src: towersLake,
    alt: "Residential towers reflected in a lily-covered lake at Prestige Raintree Park",
    caption: "Prestige Raintree Park — towers over Varthur Lake",
    wide: true,
  },
  {
    src: gardenCourts,
    alt: "Aerial view of landscaped garden courts between residential towers",
    caption: "Landscaped garden courts",
  },
  {
    src: skyTerrace,
    alt: "Infinity pool terrace with lounge seating and a distant skyline",
    caption: "Sky terrace and infinity pool",
  },
  {
    src: pool,
    alt: "Indoor swimming pool in the clubhouse",
    caption: "Clubhouse pool",
  },
  {
    src: gym,
    alt: "Gym with treadmills facing floor-to-ceiling windows over the pool deck",
    caption: "Fitness centre",
  },
  {
    src: interior,
    alt: "Furnished apartment terrace opening onto a pool and treeline",
    caption: "Residence terrace",
  },
  {
    src: elevation,
    alt: "Tower elevation at sunset",
    caption: "Tower elevation",
  },
  {
    src: lakesideLawn,
    alt: "Manicured lawn and hedging beside the lake",
    caption: "Lakeside lawns",
    wide: true,
  },
];

const euphoria: GalleryItem[] = [
  {
    src: euphoriaHero,
    alt: "Sowparnika Euphoria apartment exterior",
    caption: "Sowparnika Euphoria — Whitefield, Bengaluru",
  },
  {
    src: euphoriaOne,
    alt: "Sowparnika Euphoria elevation view",
    caption: "Euphoria — elevation",
  },
  {
    src: euphoriaTwo,
    alt: "Sowparnika Euphoria common area",
    caption: "Euphoria — common areas",
  },
];

const fieldwork: GalleryItem[] = [
  {
    src: coverageMap,
    alt: "Satellite map of Tumkur district with surveyed sites marked",
    caption: "Surveyed sites across Tumkur district",
    wide: true,
  },
  {
    src: plotMeasurement,
    alt: "Satellite image of a plot with boundary lengths marked in metres",
    caption: "Boundary measurement from survey data",
  },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The projects, up close"
        image={towersLake}
        imageAlt=""
        intro="Photography from the projects we represent and the survey work behind them. Select any image to enlarge it."
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Featured project"
            title="Prestige Raintree Park"
            intro="Whitefield, Bengaluru — 1,520 homes across 18 towers, opposite Varthur Lake."
          />
          <div className="mt-12">
            <LightboxGallery items={prestige} />
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <SectionHeading
            eyebrow="Project"
            title="Sowparnika Euphoria"
            intro="Whitefield, Bengaluru — connectivity to IT hubs, schools and shopping."
          />
          <div className="mt-12">
            <LightboxGallery items={euphoria} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Fieldwork"
            title="Survey and measurement"
            intro="Georeferenced survey output across Tumkur district — the technical work behind every listing."
          />
          <div className="mt-12">
            <LightboxGallery items={fieldwork} />
          </div>
        </Container>
      </Section>
    </>
  );
}
