import { readdirSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import type { BlogPostMeta } from "@/types/content";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function generateStaticParams() {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

async function loadPost(slug: string) {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: React.ComponentType;
    metadata: Omit<BlogPostMeta, "slug">;
  };
  return mod;
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { metadata } = await loadPost(slug);
    return { title: metadata.title, description: metadata.description };
  } catch {
    return { title: "Post" };
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;

  let Post: React.ComponentType;
  let metadata: Omit<BlogPostMeta, "slug">;
  try {
    ({ default: Post, metadata } = await loadPost(slug));
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="text-sm text-muted-foreground">
        {formatDate(metadata.publishedAt)}
      </p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">
        {metadata.title}
      </h1>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {metadata.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none prose-pre:bg-transparent prose-pre:p-0">
        <Post />
      </div>
    </article>
  );
}
