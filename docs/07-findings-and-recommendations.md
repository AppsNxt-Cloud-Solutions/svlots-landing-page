# 07 — Findings & Recommendations

Everything here was read out of the source; nothing was verified against a running build or the
live API. Treat the P0 items as "confirmed in code, please reproduce in the browser first".

---

## P0 — user-visible breakage

### 1. The Contact Us form posts to `localhost`
[contactus.component.ts](../src/app/contactus/contactus.component.ts) — the URL is
`https://localhost:7192/api/SVLots/SubmitContactForm`. In production this request cannot succeed.
Worse, the error handler treats a 2xx arriving in the error branch as success and shows
*"Data Added Successfully"*, so a visitor may believe their enquiry was sent when it was not.
**This is the site's primary conversion path.** Point it at `loginapi.svlots.com` and remove the
success-on-error branch.

### 2. The navbar "Login" link is dead
`app.component.html` uses `routerLink="/login"`, but the route is `/loginmodule/login`. There is no
`**` wildcard route, so the click renders a blank page under the shell. Same dead path in
`AuthService.logout()`. `LoginComponent` also navigates to `/register` and `/forgot-password`,
neither of which exists.
**Fix:** flatten the login route to `/login`, or update the links — and add a wildcard route.

### 3. Products dropdown doesn't work on touch devices
`.dropdown-content.show` is declared `display: none`, so the class `toggleDropdown()` applies has
no effect; only `:hover` reveals the menu. On phones and tablets the Products menu — and the
nested Tools ▸ Calculator item — is effectively unreachable.
**Fix:** `.dropdown-content.show { display: block; }` and drive it from click on touch viewports.

### 4. No 404 route
Any typo or stale link shows the shell with an empty content area. Add
`{ path: '**', component: NotFoundComponent }`.

---

## P1 — security

### 5. Live AWS credentials are recoverable from the browser
[shared.service.ts](../src/app/shared.service.ts) fetches AES-encrypted S3 keys from the API and
decrypts them with a key (`NLKpQsoPaeoZ55ul`) and IV (`RbeqxtNXxucHI123`) **hardcoded in the
bundle**. That is obfuscation, not protection: anyone can extract working credentials for bucket
`spropertydetails` and use them with whatever permissions the IAM user has.
**Fix:** keep credentials server-side. Have the API return short-lived presigned URLs for reads
(`generatePresignedUrl` is already written — use it, and delete the blob-download path) and
presigned POST policies for uploads.

### 6. Plaintext credentials in a comment
[projectcards.component.ts](../src/app/projectcards/projectcards.component.ts) ~line 216 has a
commented-out `accessKeyId` / `secretAccessKey` pair. If those were ever real, **rotate them now**
— they are in the git history and in the shipped bundle.

### 7. Client-trusted admin flag, no route guard
`isAdmin` lives in `localStorage` and is read back verbatim; `/projectform` has no guard, so the
admin form is reachable by URL without logging in. No token is stored and no interceptor attaches
credentials, so authorisation must be enforced entirely server-side on `AddProject` — confirm that
it is.

### 8. Unvalidated uploads keyed by filename
`uploadFile` uses `Key: file.name` with no size, type, or extension check. Two uploads named
`plot.jpg` silently overwrite each other, and there's nothing stopping a non-image upload.

### 9. No spam protection on public lead forms
Contact Us and the service call-back form have no honeypot, rate limit, or captcha.

---

## P1 — performance

### 10. 85 MB of assets ship with every build
`angular.json` copies all of `src/assets`. The `Prestige Group/` brochure folder alone is 61 MB,
with individual JPEGs at 3–4 MB, and the gallery renders those originals inline. Several other
files (`SV Lots map.PNG` 3.1 MB, `carousel1.png` 3.1 MB) are similarly oversized.
**Fix, in order:** delete the ~46 unreferenced files; convert and resize the rest to WebP at
display dimensions (a 1200 px-wide gallery image needs ~150 KB, not 4 MB); generate thumbnails for
grid views and load full-size only on click; add `loading="lazy"` and explicit
`width`/`height` to every `<img>`.

### 11. Unused UI libraries in the bundle
`@angular/material`, `@angular/cdk`, and `primeng` are dependencies and the Material theme is in
the build's `styles` array, but no `mat-*` or `p-*` component is used anywhere. Removing them
(and the now-unnecessary `CUSTOM_ELEMENTS_SCHEMA`) is free bundle savings.

### 12. `aws-sdk` v2 in the browser
The v2 monolith is a very large dependency and is in maintenance mode. Once reads move to
presigned URLs and uploads to presigned POSTs, the SDK can be dropped from the client entirely.

### 13. Lazy loading is defeated
`LoginmoduleModule` is lazy-loaded via `loadChildren` **and** eagerly imported by `AppModule`, so
it ships in the main bundle. Remove the `AppModule` import.

### 14. Project images downloaded as blobs
`projectcards` pulls each image through `s3.getObject` into memory and creates an object URL that
is never revoked — a leak on repeat navigation, and slower than letting the browser fetch a signed
URL directly.

---

## P1 — SEO (this is a marketing site; this section is high-value)

Currently the site is close to invisible to search engines:

- **No meta description, no canonical, no Open Graph or Twitter Card tags** in
  [index.html](../src/index.html).
- **One static `<title>`: "SVlots"** for all 15 routes. Nothing sets per-route titles.
- **No structured data.** A real-estate business should ship `RealEstateAgent` /
  `LocalBusiness` JSON-LD with the Tumkur address, and `Product`/`Place` for projects.
- **No `robots.txt`, no `sitemap.xml`.**
- **Client-side rendering only** — no SSR/prerender, so crawlers get an empty shell first.
  For a brochure site, `@angular/ssr` prerendering (or moving the static pages to a static
  generator) would be the single biggest organic-traffic change available.
- **Heading hygiene** — multiple `<h2>`/`<h3>` per page with no clear single `<h1>`; several
  headings are `ALL CAPS` in the markup rather than via `text-transform`.
- **No semantic landmarks** — `<main>`, `<header>`, `<footer>`, `<section>` are absent; the whole
  page is `<div>`s.
- **Duplicate/unbranded content** — the blog has two near-identical "Navigating the Surge"
  articles, one of which still says **"T Homes"** instead of SV Lots. Duplicate content plus a
  competitor's name in your copy.
- **No analytics** of any kind — no GA4, no GTM, no conversion tracking on the lead forms. There is
  currently no way to measure whether the site works.

---

## P2 — accessibility

| Issue | Where | Fix |
| --- | --- | --- |
| Infinitely blinking header text | `.elevating-text` `@keyframes blink-text` | Remove it, or gate behind `prefers-reduced-motion` — flashing content is a WCAG 2.2.2 failure and reads as spammy |
| Hamburger and dropdowns are `<div>`/`<a>` with click handlers | `app.component.html` | Use `<button>`, add `aria-expanded` / `aria-controls` / `aria-label` |
| No focus styles anywhere | global | Add a visible `:focus-visible` ring |
| Missing `alt` text | `flyers`, `products`, `datacollection`, `projectform`, `services` templates | Add descriptive `alt`; `alt=""` for decorative images |
| Mobile overlay has no close button and doesn't scroll-lock | `.nav-overlay` | Add an ✕, trap focus, `overflow: hidden` on body while open |
| Marginal contrast | gold `rgb(189,150,102)` and `#f1e67b` on slate `rgb(55,65,81)` | Darken the slate or lighten the accents to ≥4.5:1 |
| Scroll-reveal animations replay on every scroll-up | 5 components | `unobserve()` after first reveal — the replay reads as jitter |

---

## P2 — UX / content

1. **Two "Projects" pages, one orphaned.** The navbar's Projects goes to `/projectcards` (the
   filterable catalogue); `/projects` (the Prestige Group showcase) is unreachable from anywhere.
   Either link it as "Featured Project" or fold it into the catalogue.
2. **`/products` is orphaned too** — a full 218-line model tile grid that nothing links to, and
   whose "Know More" links point at `http://localhost:4200`. The navbar's Products ▸ Models goes to
   `/products/flyers` instead.
3. **Two stub pages are routable** — `/products/data-collection` and the `register` component both
   still say *"… works!"*. Remove the route or finish the page.
4. **Carousel repeats a slide** — slides 1 and 3 are both `carousel3.png`, so a 3-slide rotation
   visibly shows the same image twice. The carousel also auto-advances every 3 s with no
   pause-on-hover and no dot indicators, and `nextSlide`/`prevSlide`/`showSlide` use different
   selectors and wrap-around logic (hence the boundary jump).
5. **No form-level feedback.** Every outcome is a SweetAlert2 modal — no inline field errors, no
   disabled submit, no spinner (Contact Us has an unused `loading` flag and an unused
   `showLoadingPopup()`). Contact Us then `window.location.reload()`s, which loses the page
   position and prevents conversion tracking.
6. **Success detected by string matching.** `services` compares the response body to
   `'Service request added successfully.'`; any backend copy change silently turns successes into
   error modals. Check HTTP status instead.
7. **Calculator silently returns 0.00** for side lengths that can't form a triangle. Tell the user
   why. The unit is labelled `sqm` but inputs are unlabelled — state the expected input unit, and
   consider offering sq ft / guntha / acre, which is what buyers in this market use.
8. **Footer "privacy-policy | Terms Of Use" is plain text**, not links, and the pages don't exist.
   For a business collecting names, phone numbers, and emails, a privacy policy is table stakes.
9. **No phone CTA.** A real-estate site in this market converts on calls; there's an email address
   in the footer but no visible, tappable phone number and no sticky mobile call/WhatsApp button.
10. **Fixed 120 px navbar** breaks in-page anchor targets and eats a lot of mobile viewport;
    clearance is double-declared (`body padding-top: 150px` + `.main-content margin-top: 130px`).
11. **The `767px` vs `768px` breakpoint mismatch** leaves a 1 px window where the navbar is in
    desktop mode and page content is in mobile mode.

---

## P3 — code health

- **CSS lives in templates.** ~5,000 lines of CSS sit in `<style>` blocks inside HTML templates,
  where Angular does not scope them. All per-component `.css` files are empty. Migrating the blocks
  into those files is the single highest-leverage refactor — and will expose the leaks currently
  being relied on.
- **No design tokens.** ~40 distinct color literals, 11 font stacks, all sizes in `px`. See
  [04 — Design System](04-design-system.md) for the consolidation plan.
- **Five copies of the same IntersectionObserver block** → extract a `revealOnScroll` directive.
- **Six copies of `goToHome()`.**
- **Duplicate `LoginResponse` interfaces** in `auth.service.ts` and `login.component.ts`, with
  different fields — the component depends on `projectNames`, which the service's copy lacks.
- **`any[]` for projects** despite a `Project` interface existing.
- **Direct DOM access** (`document.querySelector`, `style.transform`) in `MainComponent` instead of
  template bindings or Angular animations.
- **Dead code:** `services.service.ts` (empty), `generatePresignedUrl` (unused),
  `isDesktop()` (unused), commented-out "Our Records" block, `AuthService.register` /
  `forgotPassword` / `resetPassword` / `validateToken` (no UI), ~46 unreferenced assets, 5 unused
  logo variants.
- **Tests are stubs** and several will fail as written (missing `HttpClientTestingModule` /
  `RouterTestingModule` / form module providers).
- **No linter, no CI, no `environment.ts`, no Prettier config.**
- **Angular 16 is out of long-term support.** Plan an upgrade path to a supported major.

---

## Suggested sequencing

**Week 1 — stop the bleeding**
Fix the contact form endpoint (#1) and its false-success handler · fix the Login link and add a
wildcard route (#2, #4) · fix the touch dropdown (#3) · rotate the leaked AWS keys (#6) · add
analytics + form-submission events so the rest of the work is measurable.

**Week 2 — credibility & reach**
Compress/purge assets (#10) · per-route titles + meta description + OG tags + JSON-LD +
`robots.txt`/`sitemap.xml` (SEO section) · fix the "T Homes" article and the duplicate carousel
slide · add a visible phone/WhatsApp CTA · publish privacy/terms pages.

**Week 3 — move S3 server-side**
Presigned URLs for reads, presigned POST for uploads, drop `aws-sdk` from the client (#5, #12,
#14) · add a route guard on `/projectform` (#7) · validate uploads (#8).

**Then — structural**
Migrate CSS into scoped component stylesheets and introduce tokens (P3, doc 04) · accessibility
pass (P2) · resolve the orphaned/stub pages into a coherent IA (P2 #1–3) · remove unused
dependencies (#11) and fix the lazy-loading boundary (#13) · evaluate SSR/prerender for the
brochure pages.
