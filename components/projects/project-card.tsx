import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/api/svlots";
import { mediaUrl } from "@/lib/media";

/**
 * The Angular version downloaded each image through the AWS SDK as a Blob,
 * created an object URL and never revoked it, then passed it through
 * bypassSecurityTrustResourceUrl. Here it is an ordinary optimised <Image>
 * pointed at our server-side media route.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-card border border-ink-200 bg-surface shadow-soft transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-gold-400 hover:shadow-lift"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-ink-100">
        {project.fileName ? (
          <Image
            src={mediaUrl(project.fileName)}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
            className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid size-full place-items-center bg-ink-900">
            <span className="font-display text-3xl text-gold-500/60">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {project.type && (
          <span className="absolute top-3 left-3 rounded-pill bg-ink-950/75 px-3 py-1 text-2xs font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm">
            {project.type}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl transition-colors duration-300 group-hover:text-gold-700">
          {project.title}
        </h3>
        {project.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin aria-hidden="true" className="size-3.5 text-gold-600" />
            {project.location}
          </p>
        )}
        {project.description && (
          <p className="mt-4 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-600">
            {project.description}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-700">
          View project
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
