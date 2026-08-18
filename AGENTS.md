<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SV Lots — project rules

Marketing site for SV Lots India Pvt Ltd (real estate / land services, Tumkur, Karnataka).
Migrated from Angular 16 in 2026. The old system is documented in [docs/](docs/); the
findings that motivated the rewrite are in [docs/07-findings-and-recommendations.md](docs/07-findings-and-recommendations.md).

## Next.js 16 gotchas that bit us already

- `middleware.ts` is deprecated → the file is **`proxy.ts`** and exports a function named `proxy`. Runtime is nodejs only.
- `cookies()`, `headers()`, `params`, `searchParams` are **all async**. Use the generated `PageProps<'/route'>` / `LayoutProps` / `RouteContext` helpers (`npm run typecheck` regenerates them).
- `revalidateTag(tag)` needs a second arg: `revalidateTag(tag, 'max')`. In server actions prefer `updateTag(tag)` for read-your-writes.
- `images.qualities` defaults to `[75]` — any other `quality` prop is silently coerced. Declared tiers live in `next.config.ts`.
- Turbopack is the default for `dev` and `build`; no `--turbopack` flag.
- Next no longer overrides `scroll-behavior` on navigation. We drive scrolling with Lenis, so do **not** set `scroll-behavior: smooth` on `html`.

## Conventions

- **Styling:** Tailwind v4 only. Design tokens are defined once in `app/globals.css` under `@theme`. Never hardcode a hex value in a component, and never add a `<style>` block — the Angular app had ~5,000 lines of unscoped CSS inside templates and that is the thing we are escaping.
- **Motion:** use the primitives in `components/motion/`. They all honour `prefers-reduced-motion`. Don't hand-roll an `IntersectionObserver` — the old app had five copies.
- **Server boundary:** anything touching `SVLOTS_API_BASE`, S3, or secrets lives in `lib/` and is imported only by server components, route handlers, or server actions. The browser must never see a credential.
- **Content:** marketing copy lives in `content/` as typed data or MDX, not inline in components.
- **Images:** always `next/image` with explicit `width`/`height` (or `fill` + a sized parent) and real `alt` text.
- **Links:** internal navigation is always `next/link`. Never a bare `<a href="/...">`.
