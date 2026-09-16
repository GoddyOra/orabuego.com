import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // `/austin` is a standalone keepsake page carried over from the old
  // GitHub Pages site (a birthday page for Ora's brother). It is plain
  // self-contained HTML in `public/austin/`, deliberately not rebuilt as
  // a React route — it keeps its own fonts, styles and confetti script.
  // Next serves `public/austin/index.html` at `/austin/index.html`; this
  // rewrite makes the bare `/austin` URL — the one that was shared with
  // family — resolve to it. Array-form rewrites run after the filesystem
  // check, so this only fires because no route or public file claims
  // `/austin` itself.
  async rewrites() {
    return [{ source: "/austin", destination: "/austin/index.html" }];
  },
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
