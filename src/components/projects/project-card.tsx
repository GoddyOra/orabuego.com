import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/types/content";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  concept: "Concept",
};

export function ProjectCard({ project }: { project: Project }) {
  const liveLink = project.links.find((link) => link.kind === "live");
  const githubLink = project.links.find((link) => link.kind === "github");

  return (
    <Card className="p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <Badge variant={project.status === "live" ? "default" : "outline"}>
          {statusLabel[project.status]}
        </Badge>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      {(liveLink || githubLink) && (
        <div className="mt-4 flex items-center gap-4 text-sm">
          {liveLink && (
            <Link
              href={liveLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground hover:underline"
            >
              Live site
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}
          {githubLink && (
            <Link
              href={githubLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              Source
            </Link>
          )}
        </div>
      )}
    </Card>
  );
}
