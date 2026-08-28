import { createHash } from "node:crypto";
import { siteConfig } from "@/lib/config";
import { getPortfolioOverviewSkill } from "@/lib/agent-skill";

// Follows the Cloudflare agent-skills-discovery-rfc shape, matched to
// abdessamed.com's implementation. sha256 is computed from the exact
// markdown getPortfolioOverviewSkill() returns, so it can't go stale.
export function GET() {
  const skillContent = getPortfolioOverviewSkill();
  const sha256 = createHash("sha256").update(skillContent).digest("hex");

  const body = {
    $schema:
      "https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schema/index.schema.json",
    skills: [
      {
        name: "portfolio-overview",
        type: "skill",
        description: `Overview of ${siteConfig.name}'s portfolio, projects, and skills.`,
        url: `${siteConfig.url}/.well-known/agent-skills/portfolio-overview/SKILL.md`,
        sha256,
      },
    ],
  };

  return Response.json(body);
}
