import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

// Single read path for all content. Pages and the future llms.txt /
// portfolio.md / agent-skills.json routes both call these — never read
// src/content/* directly from a page.
export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export type SiteStats = {
  projectsShipped: number;
  projectsLive: number;
};

export function getSiteStats(): SiteStats {
  return {
    projectsShipped: projects.length,
    projectsLive: projects.filter((p) => p.status === "live").length,
  };
}
