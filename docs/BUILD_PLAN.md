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

**Phases 0–8 built and pushed to GitHub, Phase 9 (launch) not started.**
Phase 8 added: unused create-next-app boilerplate removed (default
favicon + unused SVGs), a generated monogram icon, a custom 404 page,
`prefers-reduced-motion` respected site-wide via `MotionConfig`, and
Vercel Analytics wired in. A Lighthouse pass against the production build
found the hero/stat-card entrance animations were hurting LCP (3.5s) by
animating `opacity` on above-the-fold content — fixed by switching to
transform-only reveals (see the CLAUDE.md note); Performance went
90 → 95, LCP 3.5s → 2.8s, with Accessibility/SEO/Agentic-Browsing all at
100. Cross-browser testing is Chrome-only in this environment (Playwright
browser downloads hit sandbox friction) — code uses no exotic
non-standard APIs, but Safari/Firefox haven't been visually confirmed.

**Two things need Ora's action, both dashboard toggles, neither blocks
further building:**
- **Vercel Web Analytics**: the `<Analytics />` component is wired in, but
  `/_vercel/insights/script.js` 404s even on the real deployment until
  Web Analytics is turned on for the project — Vercel dashboard → your
  project → Analytics tab → Enable (free tier).
- **Resend** (Phase 6, restated): see below.

Everything through Phase 8 — scaffold, layout shell, homepage hero +
stats, Experience/Projects (data-driven), Resume picker, MDX blog with
syntax highlighting + RSS, contact form (react-hook-form/zod, honeypot,
Resend), SEO/agent-legibility (sitemap, robots.txt w/ Content-Signal,
per-route metadata, dynamic OG images, Person/Article JSON-LD,
`llms.txt`/`portfolio.md`/agent-skills manifest — all built from
`lib/content.ts` so they can't drift from the real pages), and this
phase's polish/QA — is done and verified: production build, lint, and a
full-site headless-browser sweep all pass clean. Repo:
[GoddyOra/orabuego.com](https://github.com/GoddyOra/orabuego.com), deployed
on Vercel (auto-deploys on every push to `main`).

**Phase 6 needs one thing from Ora to fully verify:** a Resend account +
API key, see below. Everything else in Phase 6 is done and tested down to
that boundary (validation, honeypot, graceful failure when unconfigured —
all confirmed via curl and a headless-browser run).

### Finishing Phase 6: Resend setup (needs Ora)

1. Sign up free at resend.com.
2. Create an API key (Dashboard → API Keys).
3. Set two env vars — locally in `.env.local` (copy `.env.example`) and in
   Vercel (Project → Settings → Environment Variables) for production:
   - `RESEND_API_KEY` — the key from step 2.
   - `CONTACT_TO_EMAIL` — where submissions should land. **Until
     orabuego.com is verified as a sending domain in Resend, it can only
     deliver to the email address on the Resend account itself** — use
     that same address here for now. Verifying orabuego.com as a sender
     (a few DNS records) can happen independently of the Phase 9 hosting
     cutover, whenever Ora wants a `@orabuego.com` from-address instead of
     Resend's shared `onboarding@resend.dev`.
4. Redeploy (or just restart `next dev` locally) so the new env vars load,
   then submit the live form and confirm an email arrives.

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
and retires `~/Web Dev/goddyora-github-io` (GitHub repo:
[GoddyOra/GoddyOra.github.io](https://github.com/GoddyOra/GoddyOra.github.io)
— the user/org Pages repo currently wired to the orabuego.com CNAME).
Sequence once confirmed: add
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
