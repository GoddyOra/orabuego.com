"use client";

import { motion, type Variants } from "motion/react";
import { Card } from "@/components/ui/card";
import type { SiteStats } from "@/lib/content";

// Transform-only, same reasoning as hero.tsx — keeps this above-the-fold
// content out of Chrome's "still painting" window for LCP purposes.
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const item: Variants = {
  hidden: { y: 12 },
  show: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function StatCards({ stats }: { stats: SiteStats }) {
  const cards = [
    { label: "Projects shipped", value: stats.projectsShipped },
    { label: "Live in production", value: stats.projectsLive },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 sm:max-w-sm"
    >
      {cards.map((stat) => (
        <motion.div key={stat.label} variants={item}>
          <Card className="gap-1 p-4">
            <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
