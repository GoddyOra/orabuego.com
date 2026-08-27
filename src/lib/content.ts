import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import type { ExperienceEntry, Project } from "@/types/content";

// Single read path for all content. Pages and the future llms.txt /
// portfolio.md / agent-skills.json routes both call these — never read
// src/content/* directly from a page.
export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getExperience(): ExperienceEntry[] {
  return experience;
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
