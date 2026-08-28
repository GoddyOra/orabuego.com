import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import type { BlogPostMeta } from "@/types/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as {
    metadata: Omit<BlogPostMeta, "slug">;
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 28, color: "#a1a1aa", display: "flex" }}>
          {siteConfig.shortName} — Blog
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            display: "flex",
            maxWidth: 950,
          }}
        >
          {mod.metadata.title}
        </div>
      </div>
    ),
    { ...size }
  );
}
