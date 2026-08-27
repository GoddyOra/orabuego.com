# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project

orabuego.com — Godwin "Ora" Orabuego's personal portfolio site. Next.js 16
(App Router) + TypeScript + Tailwind v4 + shadcn/ui, deployed to Vercel's free
Hobby tier. Zero paid services, same ethos as Ora's other personal projects
(usaprizes.com, creekmechanical.com — both Astro + Cloudflare Pages, but this
one intentionally matches the reference site's stack instead). Full rationale
and the phased build plan live in [`docs/BUILD_PLAN.md`](docs/BUILD_PLAN.md).

## Commands

- `npm run dev` — local dev server at `localhost:3000` (Turbopack)
- `npm run build` — production build; run this before saying a change is done
- `npm run start` — serve the production build locally
- `npm run lint` — ESLint

## Next.js 16 — read before assuming API shape

This project scaffolded with breaking changes from older Next.js training
data. Before using an API you're not sure about, check
`node_modules/next/dist/docs/` rather than assuming Next 13/14 conventions.
Specifics that already bit us once:

- `params` and `searchParams` are **Promises** — always `await` them. Use the
  generated `PageProps<'/route'>`, `LayoutProps<'/route'>`, and
  `RouteContext<'/route'>` global types (auto-generated into `.next/types`
  on `dev`/`build`) instead of hand-writing param types.
- **Cache Components** (`cacheComponents: true` in `next.config.ts`, the
  `use cache` directive, mandatory `<Suspense>` around runtime-API access)
  is a Next 16 feature we are **not** opting into. This site has no
  per-request/per-user data — every page reads local TypeScript/MDX content,
  which prerenders as static output under the default model with no extra
  directives needed. Don't add `cacheComponents: true` or `'use cache'`
  unless a real per-request data need shows up (e.g. a future dashboard).
- Blog MDX uses the official `@next/mdx` package (dynamic `import()` per
  slug + `generateStaticParams`), not `next-mdx-remote` — that's what the
  bundled Next 16 docs recommend for local MDX content, and it needed no
  extra runtime dependency.
- OG images: `ImageResponse` from `next/og` (not `@vercel/og` directly).
- `lucide-react` (this project is on v1.34) dropped brand/logo icons
  (GitHub, LinkedIn, etc.) — don't assume they exist. Use small inline SVGs
  (see `src/components/nav/footer.tsx`) instead of adding a brand-icon
  package for a handful of glyphs.
- shadcn/ui here is on the `base-nova` preset, built on **Base UI**
  (`@base-ui/react`), not Radix. Composition uses the `render` prop, not
  `asChild` (e.g. `<Button render={<Link href="/x" />}>Text</Button>`).
  When `render` points at something that isn't a real `<button>` (a
  `<Link>`, an `<a>`), also pass `nativeButton={false}` or Base UI logs a
  console warning about missing native button semantics.

## Architecture

- Pages never read `src/content/*` directly. Everything goes through
  `src/lib/content.ts` loader functions (`getProjects()`, `getExperience()`,
  `getPosts()`, `getResumeVariants()`). This is the seam where placeholder
  content gets swapped for Ora's real content later without touching layout
  code, and what keeps `/llms.txt`, `/portfolio.md`, and
  `/.well-known/agent-skills/index.json` in sync with the real pages — same
  loaders, different serializer.
- `src/content/experience.ts` and `src/content/projects.ts` are plain typed
  arrays (structured facts, no MDX needed). `src/content/blog/*.mdx` are
  posts with an exported `metadata` object per file (see MDX guide above).
- `src/content/resumes.ts` maps resume tracks (dev/data-science/academic) to
  files in `public/resume/`.
- Types live in `src/types/content.ts`. Do not duplicate shapes inline.

## Conventions

- Routes are folders with `page.tsx` (e.g. `src/app/about/page.tsx`), not
  flat files.
- Client-side interactivity (theme toggle, mobile nav, motion effects) stays
  in small `'use client'` islands under `src/components/`, not whole pages.
- Run `npm run build` before saying a change is done — Tailwind v4 and the
  Next 16 typegen both fail loudly and it's cheap to check.
- No new dependencies without a reason — check bundle impact first. This is
  a marketing/portfolio site; it should stay fast.

## Hard constraints

- Zero paid services. Vercel Hobby, Resend free tier (contact form,
  Phase 6), and free-tier everything else. Flag it before adding anything
  that isn't free at this site's traffic level.
- Never commit real secrets (Resend API key, etc.) — use `.env.local`
  (gitignored) and Vercel's environment variable dashboard for production.
- DNS cutover (pointing orabuego.com at Vercel, retiring
  `~/Web Dev/goddyora-github-io`) is a Phase 9 action that needs Ora's
  explicit go-ahead — never do it as a side effect of another change.
