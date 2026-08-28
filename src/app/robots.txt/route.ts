import { siteConfig } from "@/lib/config";

// Plain Route Handler rather than the typed robots.ts convention — the
// typed MetadataRoute.Robots shape has no field for Content-Signal, a
// directive some crawlers use to separate "index this" from "train on
// this." Default here matches abdessamed.com's stance: searchable and
// agent-readable, not a training-data source. Easy to change later.
export function GET() {
  const body = `User-agent: *
Content-Signal: search=yes, ai-train=no, ai-input=yes
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml

# Machine-readable index of this site, for LLMs and agents
# ${siteConfig.url}/llms.txt

Disallow: /api/
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
