import type { MDXComponents } from "mdx/types";

// Required by @next/mdx for the App Router. Typography (headings, lists,
// links, inline code) is handled by wrapping post content in Tailwind's
// `prose` classes at the call site instead of overriding every element
// here — see src/app/blog/[slug]/page.tsx.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
