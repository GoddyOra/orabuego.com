import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Placeholder posts for now — real writing lands during the
        content-fill pass.
      </p>

      <div className="mt-8 flex flex-col divide-y divide-border/60">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-6 first:pt-0"
          >
            <p className="text-sm text-muted-foreground">
              {formatDate(post.publishedAt)} · {post.readingTime}
            </p>
            <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight group-hover:underline">
              {post.title}
            </h2>
            <p className="mt-1 text-muted-foreground">{post.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
