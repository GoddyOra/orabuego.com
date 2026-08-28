"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

// Transform-only (no opacity) so the LCP text is fully opaque from the
// first frame — Chrome doesn't credit an animating-opacity element as
// "painted" until it settles, which was inflating this page's LCP.
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { y: 12 },
  show: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Hero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-start gap-6"
    >
      <motion.p variants={item} className="text-sm font-medium text-muted-foreground">
        Software Engineer — placeholder eyebrow until final copy lands.
      </motion.p>

      <motion.h1
        variants={item}
        className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        {siteConfig.title.replace(" — Software Engineer", "")}
      </motion.h1>

      <motion.p variants={item} className="max-w-xl text-lg text-muted-foreground">
        {siteConfig.description}
      </motion.p>

      <motion.div variants={item} className="flex gap-3">
        <Button nativeButton={false} render={<Link href="/projects" />}>
          View projects
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href="/contact" />}
        >
          Get in touch
        </Button>
      </motion.div>
    </motion.div>
  );
}
