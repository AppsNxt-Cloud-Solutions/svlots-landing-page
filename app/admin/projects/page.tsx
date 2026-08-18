import { AddProjectForm } from "@/app/admin/projects/add-project-form";
import { getProjects } from "@/lib/api/svlots";

export const metadata = {
  title: "Add a project",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <div>
        <h1 className="text-3xl">Add a project</h1>
        <p className="mt-3 max-w-xl text-ink-600">
          Published projects appear on the public projects page straight away.
        </p>
        <div className="mt-8">
          <AddProjectForm />
        </div>
      </div>

      <aside>
        <h2 className="text-xs font-semibold tracking-[0.18em] text-gold-700 uppercase">
          Currently published ({projects.length})
        </h2>
        <ul className="mt-5 space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="rounded-card border border-ink-200 bg-surface p-4"
            >
              <p className="font-medium text-ink-900">{project.title}</p>
              <p className="mt-1 text-xs text-ink-500">
                {[project.location, project.type].filter(Boolean).join(" · ")}
              </p>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="rounded-card border border-dashed border-ink-300 p-4 text-sm text-ink-500">
              No projects are published, or the listings service is unavailable.
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
}
