"use client";

import { motion, type Variants } from "motion/react";
import { Card } from "@/components/ui/card";
import type { SiteStats } from "@/lib/content";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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
