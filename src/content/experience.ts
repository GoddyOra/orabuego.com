import type { ExperienceEntry } from "@/types/content";

// Placeholder entries only — Ora has several real CV tracks (Dev, Data
// Science, Academic, Engineering) but none of that content has been
// dropped in yet. Shape and count are illustrative; replace wholesale
// during the content-fill pass, don't try to guess real roles/dates.
export const experience: ExperienceEntry[] = [
  {
    id: "placeholder-role-1",
    role: "Role title (placeholder)",
    company: "Company name (placeholder)",
    startDate: "2025",
    endDate: "present",
    summary: "Placeholder summary — one or two sentences on the role.",
    highlights: [
      "Placeholder highlight one.",
      "Placeholder highlight two.",
    ],
    tech: ["TypeScript", "Next.js"],
  },
  {
    id: "placeholder-role-2",
    role: "Role title (placeholder)",
    company: "Company name (placeholder)",
    startDate: "2024",
    endDate: "2025",
    summary: "Placeholder summary — one or two sentences on the role.",
    highlights: [
      "Placeholder highlight one.",
      "Placeholder highlight two.",
    ],
    tech: ["Python", "Astro"],
  },
];
