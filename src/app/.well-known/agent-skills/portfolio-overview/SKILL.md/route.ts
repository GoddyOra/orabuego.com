import { getPortfolioOverviewSkill } from "@/lib/agent-skill";

export function GET() {
  return new Response(getPortfolioOverviewSkill(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
