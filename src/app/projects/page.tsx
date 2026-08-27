import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        A seed list for now — the full roster lands during the content-fill
        pass.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
