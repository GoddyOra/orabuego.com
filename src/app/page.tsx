import { Hero } from "@/components/hero/hero";
import { StatCards } from "@/components/stats/stat-cards";
import { getSiteStats } from "@/lib/content";

export default function Home() {
  const stats = getSiteStats();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-12 px-6 py-24 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <Hero />
      <StatCards stats={stats} />
    </div>
  );
}
