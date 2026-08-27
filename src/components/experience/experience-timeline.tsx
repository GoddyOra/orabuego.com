import { Badge } from "@/components/ui/badge";
import type { ExperienceEntry } from "@/types/content";

function formatRange(entry: ExperienceEntry) {
  const end = entry.endDate === "present" ? "Present" : entry.endDate;
  return `${entry.startDate} — ${end}`;
}

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="flex flex-col gap-8 border-l border-border/60 pl-6">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full bg-foreground"
          />
          <p className="text-sm text-muted-foreground">{formatRange(entry)}</p>
          <h3 className="mt-0.5 font-heading text-lg font-semibold tracking-tight">
            {entry.role}
          </h3>
          <p className="text-sm text-muted-foreground">{entry.company}</p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {entry.summary}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {entry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
