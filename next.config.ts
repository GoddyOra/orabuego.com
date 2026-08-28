import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Turbopack (default in Next 16) resolves remark/rehype plugins by package
// name rather than function reference — JS functions can't cross into the
// Rust compiler, so these are strings, not imports. See the MDX guide in
// node_modules/next/dist/docs/01-app/02-guides/mdx.md.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [["rehype-pretty-code", { theme: "github-dark-dimmed" }]],
  },
});

export default withMDX(nextConfig);
