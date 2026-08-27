import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { getExperience } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  const entries = getExperience();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Placeholder entries — real roles and dates land during the
        content-fill pass.
      </p>

      <div className="mt-8">
        <ExperienceTimeline entries={entries} />
      </div>
    </div>
  );
}
