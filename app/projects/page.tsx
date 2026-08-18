import type { Metadata } from "next";
import { Suspense } from "react";
import towersLake from "@/assets/images/projects/prestige/towers-lake.webp";
import { PageHero } from "@/components/layout/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
import { facetsOf, getProjects } from "@/lib/api/svlots";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residential and commercial projects represented by SV Lots across Bengaluru and Tumkur district — filter by location and property type.",
  alternates: { canonical: "/projects" },
};

/** Catalogue is fetched server-side and revalidated every 5 minutes. */
export const revalidate = 300;

export default async function ProjectsPage(props: PageProps<"/projects">) {
  const searchParams = await props.searchParams;
  const location = typeof searchParams.location === "string" ? searchParams.location : "";
  const type = typeof searchParams.type === "string" ? searchParams.type : "";

  const projects = await getProjects();
  const { locations, types } = facetsOf(projects);

  // Only honour filter values that exist in the data, matching the select.
  const activeLocation = locations.includes(location) ? location : "";
  const activeType = types.includes(type) ? type : "";

  const filtered = projects.filter(
    (project) =>
      (!activeLocation || project.location === activeLocation) &&
      (!activeType || project.type === activeType),
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Property we represent"
        image={towersLake}
        imageAlt=""
        intro="Residential and commercial developments across Bengaluru and Tumkur district."
      />

      <Section>
        <Container>
          {/* Hidden when the catalogue is empty: empty dropdowns over an
              "unavailable" message just reads as broken. */}
          {projects.length > 0 && (
            <Suspense fallback={<div className="h-24" />}>
              <ProjectFilters
                locations={locations}
                types={types}
                total={projects.length}
                shown={filtered.length}
              />
            </Suspense>
          )}

          {filtered.length > 0 ? (
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <StaggerItem key={project.id} className="h-full">
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="mt-16 rounded-card border border-ink-200 bg-surface-alt p-12 text-center">
              <h2 className="text-2xl">
                {projects.length === 0
                  ? "Project listings are unavailable right now"
                  : "No projects match those filters"}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-ink-600">
                {projects.length === 0
                  ? "We could not reach the listings service. Please try again shortly, or contact us and we will send you what is currently available."
                  : "Try clearing a filter, or tell us what you are looking for and we will check what is coming up."}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {projects.length > 0 && (
                  <ButtonLink href="/projects" variant="secondary">
                    Clear filters
                  </ButtonLink>
                )}
                <ButtonLink href="/contact">Contact us</ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
