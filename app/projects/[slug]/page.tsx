import { ArrowLeft, ArrowUpRight, MapPin, Tag } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { getProject, getProjects } from "@/lib/api/svlots";
import { mediaUrl } from "@/lib/media";
import { absoluteUrl } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description:
      project.description ||
      `${project.title}${project.location ? ` in ${project.location}` : ""} — represented by SV Lots.`,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.fileName ? [{ url: mediaUrl(project.fileName) }] : undefined,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-ink-950 pt-18">
        {project.fileName && (
          <>
            <Image
              src={mediaUrl(project.fileName)}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover opacity-55"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/25"
            />
          </>
        )}

        <Container className="py-14 md:py-20">
          <Eyebrow onDark>Project</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-5xl text-white text-balance-tight">
            {project.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300">
            {project.location && (
              <span className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-gold-400" />
                {project.location}
              </span>
            )}
            {project.type && (
              <span className="flex items-center gap-2">
                <Tag aria-hidden="true" className="size-4 text-gold-400" />
                {project.type}
              </span>
            )}
          </div>
        </Container>
      </section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl">About this project</h2>
            <span aria-hidden="true" className="mt-5 block h-px w-12 rule-gold" />
            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              {project.description ||
                "Details for this project are available on request."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {project.externalLink && (
                <ButtonLink href={absoluteUrl(project.externalLink)} external size="lg">
                  Visit project site
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonLink>
              )}
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Enquire about this project
              </ButtonLink>
            </div>
          </div>

          <aside className="rounded-card border border-ink-200 bg-surface-alt p-7">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">
              At a glance
            </h2>
            <dl className="mt-6 space-y-5 text-sm">
              {[
                ["Location", project.location],
                ["Type", project.type],
              ]
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <div key={label} className="border-b border-ink-200 pb-4 last:border-0">
                    <dt className="text-xs tracking-wide text-ink-500 uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1.5 text-ink-800">{value}</dd>
                  </div>
                ))}
            </dl>
          </aside>
        </Container>
      </Section>

      <Section tone="alt" size="sm">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-gold-700"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </Link>
        </Container>
      </Section>
    </>
  );
}
