# SV Lots

Marketing site for **SV Lots India Pvt Ltd** — real estate and land services, Tumkur, Karnataka.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · deployed on Vercel.

Migrated from Angular 16 in 2026. The old system is documented in [docs/](docs/); the findings
that motivated the rewrite are in [docs/07-findings-and-recommendations.md](docs/07-findings-and-recommendations.md),
and [docs/rebuild-report.html](docs/rebuild-report.html) is the client-facing summary.

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values — see below
npm run dev                    # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Regenerate route types, then `tsc --noEmit` |
| `npm run lint` | Biome (lint + format check) |
| `npm run format` | Biome, writing fixes |
| `npm run assets` | One-off image pipeline — already run; see [docs/asset-spec.md](docs/asset-spec.md) |

> **If a change doesn't appear**, check for a stale server: `lsof -ti tcp:3000`.
> `next start` printing `EADDRINUSE` means it did **not** start and you are still
> being served the previous build.

## Environment

Every variable is documented in [.env.example](.env.example). The ones without defaults:

| Variable | Needed for |
| --- | --- |
| `SESSION_SECRET` | Signing the admin session cookie. `openssl rand -base64 32`. Sign-in fails closed without it. |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Reading project images from the private S3 bucket. Falls back to the legacy encrypted-credential endpoints if unset — see the warning in `.env.example`. |
| `RESEND_API_KEY` / `LEAD_NOTIFY_TO` | Emailing enquiries. Without it the visitor's **message text** may not be captured, because the upstream `AddServiceRequest` endpoint has no message field. |

**One assignment per line, and keep the trailing newline.** A line that runs into the next
assignment silently corrupts the first value.

## Architecture

```
app/                    routes; server components by default
  api/media/[...key]/   streams private S3 objects, allowlisted against the catalogue
  admin/                staff area, guarded by proxy.ts + layout + action checks
components/
  motion/               Reveal, Stagger, TextMask, Counter, Parallax, SmoothScroll
  ui/                   Button, Card, Section, Prose, Field
  sections/             home page composition
content/                marketing copy as typed data; insights as MDX
lib/                    server-only API client, S3, session, geometry
proxy.ts                Next 16's rename of middleware — guards /admin
```

Conventions are recorded in [AGENTS.md](AGENTS.md), including the Next 16 breaking changes that
apply here (`middleware` → `proxy`, async request APIs, `revalidateTag` arity, `images.qualities`).

Design tokens live once in `app/globals.css` under `@theme`. Components must not hardcode a hex
value or add a `<style>` block — the Angular app had ~5,000 lines of unscoped CSS inside its
templates, which is the thing this rewrite exists to escape.

## Deploying

Vercel, zero config — the app is at the repo root. Set the variables above in
**Settings → Environment Variables** (individually, not as a pasted block), then attach the
domain. The router uses path-based URLs; Vercel handles that automatically.

Legacy Angular URLs (`/main`, `/about-us`, `/contactus`, `/projectcards`, `/blog`, `/knowmore`,
`/calculator`, `/projectform`, `/loginmodule/login`, …) are redirected in `next.config.ts`.

