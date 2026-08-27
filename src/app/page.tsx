import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-sm font-medium text-muted-foreground">
        Layout shell — Phase 1 of {siteConfig.shortName}&apos;s portfolio build.
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.title}
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        {siteConfig.description}
      </p>
      <div className="flex gap-3">
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
      </div>
    </div>
  );
}
