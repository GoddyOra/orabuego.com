import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import readingTime from "reading-time";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { resumes } from "@/content/resumes";
import type {
  BlogPostMeta,
  ExperienceEntry,
  Project,
  ResumeVariant,
} from "@/types/content";

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

export function getResumeVariants(): ResumeVariant[] {
  return resumes;
}

export function getDefaultResume(): ResumeVariant {
  return resumes.find((r) => r.isDefault) ?? resumes[0];
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPostSummary = BlogPostMeta & { readingTime: string };

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { metadata } = (await import(`@/content/blog/${slug}.mdx`)) as {
        metadata: Omit<BlogPostMeta, "slug">;
      };
      const raw = readFileSync(path.join(BLOG_DIR, file), "utf-8");

      return {
        ...metadata,
        slug,
        readingTime: readingTime(raw).text,
      };
    })
  );

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
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
