# orabuego.com — Build Plan

Personal portfolio site for Godwin "Ora" Orabuego · Next.js 16 + Vercel, zero paid services

*Prepared for Ora · August 27, 2026*

## Why this site, why this stack

orabuego.com currently serves a placeholder "under construction" page
(`~/Web Dev/goddyora-github-io`, GitHub Pages) with a hidden `/joseph`
birthday-page easter egg. This project replaces it with a real portfolio,
comparable in polish and depth to
[abdessamed.com](https://www.abdessamed.com/) — confirmed via response
headers to run Next.js (App Router) on Vercel, with an
Experience/Projects/Competitions/About structure, stat cards, live-preview
project links, resume download, and an AI-agent-legible mirror of its
content (`/llms.txt`, `/portfolio.md`,
`/.well-known/agent-skills/index.json`).

Ora's other two personal projects (usaprizes.com, creekmechanical.com) use
Astro + Cloudflare Pages. After confirming Vercel's free Hobby tier fully
supports serverless functions for a personal, non-commercial site, Ora chose
to match the reference site's stack instead: **Next.js (App Router) +
TypeScript + Vercel**.

**Decisions made and final:**
1. **Lead narrative:** software/full-stack developer — ships full products
   end to end, not data science or academic framing.
2. **Content:** structure built now with realistic placeholder copy; Ora
   sends finished copy afterward as its own pass, decoupled from the
   structural phases below.
3. **V1 scope:** blog, contact form, multi-version resume download
   (Dev/Data Science/Academic), and retiring the current placeholder so the
   new site takes over the root domain.

## Status

**Phase 0 in progress.** Scaffold exists locally (Next.js 16 + TS + Tailwind
v4 + shadcn/ui `base-nova`/neutral, `next-themes`/`motion`/`lucide-react`
installed). Not yet pushed to GitHub or connected to Vercel — needs Ora's
accounts, see Phase 0 below. Nothing from Phase 1 onward is built yet.

## Phased build plan

Each phase ships to a Vercel preview URL and is independently demoable.
This status line gets updated as phases land.

| Phase | Focus | Demoable outcome |
|---|---|---|
| 0 | Scaffold: Next.js + TS + Tailwind + shadcn/ui, GitHub repo, Vercel project linked, this doc + `CLAUDE.md` | Blank site live on a `*.vercel.app` preview URL |
| 1 | Design system & layout shell: theme tokens, `next-themes`, Navbar/MobileNav/Footer, UI primitives | Navigable shell, dark/light toggle working, empty sections |
| 2 | Homepage: hero, stat cards (computed from `projects.ts`, not hardcoded), entrance animations | Homepage structurally matches the reference site's polish |
| 3 | Experience & Projects sections, data-driven off `content/experience.ts` / `content/projects.ts`, seeded with usaprizes.com + creekmechanical.com | `/experience` and `/projects` fully functional — proves the content-swap workflow |
| 4 | Resume: `/resume` picker (Dev/DS/Academic), `resumes.ts`, placeholder PDFs, `/resume.pdf` default alias | Visitor can pick and download any resume track |
| 5 | Blog (MDX via `@next/mdx`): `/blog` + `/blog/[slug]`, 1–2 placeholder posts, syntax highlighting, RSS | Real MDX rendering live |
| 6 | Contact form: Resend integration, validation, honeypot | Real emails arrive from the live preview form |
| 7 | SEO/agent-legibility: Metadata API rollout, sitemap, robots, OG images, JSON-LD, `llms.txt`/`portfolio.md`/`agent-skills.json` | Rich social previews + all three agent-legible endpoints live |
| 8 | Polish/QA: cross-browser, Lighthouse pass, `prefers-reduced-motion`, 404 page, analytics wired | Production-quality build, still on preview URL |
| 9 | **Launch — DNS cutover & placeholder retirement** | orabuego.com serves the new site in production |

### Phase 9 is a confirmation gate, not an automatic step

It changes DNS at the registrar for a domain currently live on GitHub Pages,
and retires `~/Web Dev/goddyora-github-io`. Sequence once confirmed: add
orabuego.com + www as a Vercel custom domain → repoint DNS per Vercel's
instructions → verify SSL and both apex/www resolve → confirm `/joseph`'s
fate → confirm the old repo's disposition.

## Default assumptions (stated now, easy to override)

- **Brand:** clean break from the placeholder's purple-gradient/Baloo 2
  look, toward a restrained, professional dev-portfolio palette —
  dark-mode-first, similar register to the reference site. shadcn/ui is
  initialized on the neutral/`base-nova` preset as a starting grayscale
  foundation; an accent color gets layered on in Phase 1.
- **Fonts:** Geist (Vercel's own) instead of Baloo 2 + Poppins.
- **`/joseph`:** ported forward as a hidden route in the new site rather
  than deleted outright — say the word if it should just go away instead.
- **Project case studies** (`/projects/[slug]`): route scaffolded in Phase
  3, only populated for projects with enough material — not a hard
  requirement for launch.

## Tech choices

| Concern | Choice | Why |
|---|---|---|
| Styling | Tailwind CSS v4 + shadcn/ui (`base-nova`, neutral) | Utility-driven, fast to build a polish-heavy site with |
| Motion | `motion` (Framer Motion) | Scroll-reveal / hover / stat-counter feel, as small client islands |
| Theme | `next-themes` | Zero-flash dark/light toggle, matches shadcn's `.dark` class strategy |
| Blog | `@next/mdx` (official, first-party) — dynamic `import()` per slug + `generateStaticParams`, `export const metadata` per file | Confirmed as the current recommended approach in the bundled Next 16 docs; no extra runtime dependency needed |
| Contact form | Resend free tier via `app/api/contact/route.ts`, validated, honeypot field | 3,000 emails/mo free, sends from the verified orabuego.com domain |
| SEO | Next.js Metadata API, `sitemap.ts`, `robots.ts`, `next/og` `ImageResponse`, JSON-LD | Native, zero extra deps, OG images generated from live content |
| Agent-legibility | `llms.txt` / `portfolio.md` / `agent-skills.json` as Route Handlers calling the same `lib/content.ts` loaders | Never drifts from the real content; inspect abdessamed.com's actual `agent-skills.json` shape before implementing |
| Analytics | Vercel Analytics | Free, zero-config, stays inside the zero-paid-services pattern |

## Verification

- After each phase: `npm run build` and check the phase's new route(s) on
  the Vercel preview deployment.
- Phase 6: submit the live contact form, confirm an email actually arrives.
- Phase 8: Lighthouse pass (target 90+ perf/accessibility/SEO), keyboard
  nav, `prefers-reduced-motion` check.
- Phase 9: after DNS cutover, verify both apex and `www` resolve with valid
  SSL, and `/llms.txt`, `/portfolio.md`, `/sitemap.xml` are reachable in
  production.
