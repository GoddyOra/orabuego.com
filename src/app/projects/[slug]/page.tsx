import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { getProjects } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

async function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const liveLink = project.links.find((link) => link.kind === "live");
  const githubLink = project.links.find((link) => link.kind === "github");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="text-sm text-muted-foreground">{project.tagline}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      <p className="mt-6 max-w-xl text-muted-foreground">
        {project.description}
      </p>

      {(liveLink || githubLink) && (
        <div className="mt-6 flex items-center gap-4 text-sm">
          {liveLink && (
            <Link
              href={liveLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium hover:underline"
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
    </div>
  );
}
