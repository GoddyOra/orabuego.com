import type { Project } from "@/types/content";

// Seed data — only projects confirmed to exist. Full roster and real
// descriptions land in the content-fill pass; don't add more without
// confirming with Ora first.
export const projects: Project[] = [
  {
    slug: "usaprizes-com",
    title: "USA Prizes",
    tagline: "Placeholder tagline — content-fill pass will replace this.",
    description:
      "Placeholder description. Astro site built and shipped to production.",
    status: "live",
    role: "Builder",
    stack: ["Astro", "TypeScript", "Cloudflare Pages"],
    links: [{ label: "Live site", href: "https://usaprizes.com", kind: "live" }],
    featured: true,
    startDate: "2026",
  },
  {
    slug: "creekmechanical-com",
    title: "Creek Mechanical",
    tagline: "Placeholder tagline — content-fill pass will replace this.",
    description:
      "Placeholder description. Astro site for a browser-based mechanical engineering / CAD tools platform, in progress.",
    status: "in-progress",
    role: "Builder",
    stack: ["Astro", "TypeScript", "Cloudflare Pages"],
    links: [],
    featured: true,
    startDate: "2026",
  },
];
