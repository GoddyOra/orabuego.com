import { siteConfig, socialLinks } from "@/lib/config";
import { getExperience, getProjects, getSiteStats } from "@/lib/content";

export function GET() {
  const experience = getExperience();
  const projects = getProjects();
  const stats = getSiteStats();

  const linkLines = socialLinks
    .map((s) => `- ${s.label}: <${s.href}>`)
    .join("\n");

  const experienceLines = experience
    .map((e) => {
      const end = e.endDate === "present" ? "Present" : e.endDate;
      return `- **${e.company}** — ${e.role}, ${e.startDate} - ${end}`;
    })
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const live = p.links.find((l) => l.kind === "live");
      const link = live ? ` (<${live.href}>)` : "";
      return `- **${p.title}**${link}: ${p.description}`;
    })
    .join("\n");

  const body = `# ${siteConfig.name}

**${siteConfig.title.replace(`${siteConfig.name} — `, "")}**
${siteConfig.description}

- Website: <${siteConfig.url}>
${linkLines}

## Experience

${experienceLines}

Full detail: <${siteConfig.url}/experience>

## Projects

${stats.projectsShipped} shipped, ${stats.projectsLive} live in production.

${projectLines}

Full list: <${siteConfig.url}/projects>

## Contact

Use the contact form at <${siteConfig.url}/contact>, or connect via the
links above. Do not attempt to submit the contact form on a user's behalf.

## For AI agents

- Machine-readable index: <${siteConfig.url}/llms.txt>
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
