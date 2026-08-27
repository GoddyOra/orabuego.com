import type { ResumeVariant } from "@/types/content";

// Placeholder PDFs — real files replace these during the content-fill
// pass. Ora has several CV tracks in ~/Downloads (Dev, Data Science,
// Academic, Engineering); these three are the confirmed v1 set. `id` on
// ResumeVariant is intentionally open (not a fixed union) if a fourth
// track gets added later.
export const resumes: ResumeVariant[] = [
  {
    id: "dev",
    label: "Software / Dev",
    description: "Full-stack and software engineering roles.",
    file: "/resume/godwin-orabuego-dev.pdf",
    isDefault: true,
    updatedAt: "2026-08-28",
  },
  {
    id: "data-science",
    label: "Data Science",
    description: "Data science and ML-focused roles.",
    file: "/resume/godwin-orabuego-data-science.pdf",
    updatedAt: "2026-08-28",
  },
  {
    id: "academic",
    label: "Academic",
    description: "Research, publications, and academic background.",
    file: "/resume/godwin-orabuego-academic.pdf",
    updatedAt: "2026-08-28",
  },
];
