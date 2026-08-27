export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  startDate: string;
  endDate: string | "present";
  summary: string;
  highlights: string[];
  tech: string[];
  logo?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "live" | "github" | "demo" | "writeup" | "other";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: "live" | "in-progress" | "archived" | "concept";
  role: string;
  stack: string[];
  links: ProjectLink[];
  image?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
  caseStudySlug?: string;
};

export type ResumeVariant = {
  id: string;
  label: string;
  description: string;
  file: string;
  isDefault?: boolean;
  updatedAt: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  draft?: boolean;
  coverImage?: string;
};
