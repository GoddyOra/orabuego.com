import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getResumeVariants } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  const resumes = getResumeVariants();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Pick the track that matches what you&apos;re looking at — each is a
        placeholder PDF until the content-fill pass.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume.id} className="justify-between gap-4 p-5">
            <div>
              <h3 className="font-heading text-base font-semibold">
                {resume.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {resume.description}
              </p>
            </div>
            <Button
              nativeButton={false}
              variant={resume.isDefault ? "default" : "outline"}
              render={<a href={resume.file} download />}
            >
              <Download className="size-4" />
              Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
