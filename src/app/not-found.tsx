import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center gap-4 px-6 py-24">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        That page doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-muted-foreground">
        The link might be broken, or the page may have moved.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        Back home
      </Button>
    </div>
  );
}
