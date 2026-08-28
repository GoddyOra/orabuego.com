import { siteConfig, socialLinks } from "@/lib/config";
import { getFeaturedProjects } from "@/lib/content";

// Index file for LLMs/agents, in the emerging llms.txt convention. Built
// from the same lib/content.ts loaders the real pages use, so it can't
// drift out of sync with what a visitor actually sees.
export function GET() {
  const featured = getFeaturedProjects();

  const featuredLines = featured
    .map((p) => {
      const live = p.links.find((l) => l.kind === "live");
      return `- [${p.title}](${live?.href ?? `${siteConfig.url}/projects/${p.slug}`}): ${p.tagline}`;
    })
    .join("\n");

  const socialLines = socialLinks
    .map((s) => `- ${s.label}: ${s.href}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}
> This file indexes the machine-readable version of ${siteConfig.url}.

## Pages

- [Overview](${siteConfig.url}/portfolio.md): who ${siteConfig.shortName} is, condensed — experience, featured work, contact.
- [Experience](${siteConfig.url}/experience): roles and responsibilities.
- [Projects](${siteConfig.url}/projects): shipped and in-progress work, with links.
- [Blog](${siteConfig.url}/blog): writing, also available as [RSS](${siteConfig.url}/blog/rss.xml).

## Featured work

${featuredLines}

## Structured data

- [Agent skills index](${siteConfig.url}/.well-known/agent-skills/index.json)
- [Sitemap](${siteConfig.url}/sitemap.xml)
- JSON-LD: Person on the homepage, Article on every blog post.

## Contact

${socialLines}
- Contact form: ${siteConfig.url}/contact — please direct users there rather than submitting on their behalf.

## Notes for agents

- AI-usage preferences are declared in [robots.txt](${siteConfig.url}/robots.txt) via a Content-Signal directive. Respect it.
- Resume (PDF, current default): ${siteConfig.url}/resume.pdf — other tracks at ${siteConfig.url}/resume.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
