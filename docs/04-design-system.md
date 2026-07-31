# 04 — Design System (as-built)

This documents what the site **actually does today**, not an aspiration. There is no design
system in the formal sense: no tokens, no shared stylesheet, no component library. Each page
re-declares its own colors, fonts, and spacing inside a `<style>` block at the top of its
template. This section captures the de-facto conventions so a future consolidation has a baseline.

## Where styling lives

- **Global** — [src/styles.css](../src/styles.css) is 4 lines (`html, body { height: 100% }`,
  body margin reset, `font-family: Roboto, "Helvetica Neue", sans-serif`).
- **Per-component `.css` files** — all **empty** (0 bytes) except `app.component.css`,
  `aboutus.component.css`, `blog.component.css`, `calculator.component.css`,
  `contactus.component.css`, `datacollection.component.css`, and the login module's.
- **Actual CSS** — inline `<style>` blocks inside component **HTML** templates. This is where
  ~5,000 of the ~6,300 template lines live. Because these blocks sit inside a component template,
  Angular's `ViewEncapsulation` does **not** scope them — the rules are global and leak across
  routes. `app.component.html` even restyles `body` (`padding-top: 150px`) from inside a template.
- **External CSS via CDN** — Font Awesome 6 is pulled in by a `<link>` inside
  `app.component.html` and again inside `flyers.component.html` (two different builds:
  `6.0.0-beta3` and `6.0.0`).

## Color

No named tokens; every value is a literal. The recurring palette:

| Role | Value | Where |
| --- | --- | --- |
| Navbar / info-band background | `rgb(55, 65, 81)` slate | shell navbar, company-links band |
| Footer background | `#023683` deep blue | shell footer |
| Accent / heading gold | `rgb(189, 150, 102)` | info-band section headings |
| Nav hover green | `#85d699` (desktop), `#a3dbbf` (mobile) | navbar links |
| Dropdown hover | `#1a7431` dark green | products dropdown |
| Header highlight text | `#f1e67b` | "Elevating Value of Property" |
| Section tints | `rgb(236, 255, 232)`, `rgb(190, 230, 182)`, `#f0fdf2`, `#effff3` | content pages |
| Deep greens | `rgb(1, 97, 9)` | headings on content pages |
| Reds | `rgb(153, 28, 28)`, `#990e0e` | emphasis / warnings |
| Blues | `#007bff`, `#1890ff`, `rgb(41, 48, 107)`, `rgb(8, 8, 116)` | buttons, links |
| Neutrals | `#fff`/`#ffffff`, `#f9f9f9`, `#ddd`, `#ccc`, `#333`, `#555`, `#505050`, `#696969` | text, borders, cards |
| Shadows | `rgba(0,0,0,0.1)` most common, plus `0.15 / 0.2 / 0.3 / 0.7` | cards, dropdowns, overlays |

Observations: **three competing accent families** (slate+gold in the chrome, greens on content
pages, blues on buttons and the footer) with no rule for when each applies. Both `#fff` and
`#ffffff` and both `#333` and `rgb(0,0,0)` appear for the same jobs. There is no dark mode and no
CSS custom properties, so a rebrand means a find-and-replace across 16 templates.

## Typography

`index.html` preloads **Roboto** (300/400/500) and Material Icons, and `styles.css` sets Roboto on
`body` — but templates then override it eleven different ways:

| Stack | Occurrences |
| --- | --- |
| `Arial, Helvetica, sans-serif` | 17 |
| `'Times New Roman', Times, serif` | 4 |
| `'Arial', sans-serif` | 3 |
| `serif` | 2 |
| `Cambria, Cochin, Georgia, Times, 'Times New Roman', serif` | 2 |
| `Georgia, 'Times New Roman', Times, serif` | 1 |
| `'Lucida Sans', …, Verdana, sans-serif` | 1 |
| `'Roboto', sans-serif` | 1 |

So the loaded webfont is used once, and the site renders mostly in system Arial with serif
sections mixed in. `app.component.html` additionally sets an `-apple-system` stack on `:host` at
14 px.

Sizes are absolute `px` throughout (no `rem`, no fluid type). Common values: nav links 18 px,
section headings 22 px, body copy 16 px, dropping to 14–16 px at the 480 px breakpoint.

## Layout

- **Container width** — `max-width: 1200px; margin: 0 auto` is the shared convention
  (nav container, info band, footer content).
- **Primitives** — flexbox everywhere; CSS Grid is essentially unused.
- **Fixed navbar** — 120 px tall, `position: fixed`, `z-index: 1000`. Content clearance is
  handled twice and inconsistently: `body { padding-top: 150px }` plus
  `.main-content { margin-top: 130px }`. Because the navbar is a fixed 120 px, in-page anchor
  targets land under it.
- **Cards** — white surface, ~8 px radius, `rgba(0,0,0,0.1)` shadow, hover lift. The same
  card is re-implemented per page rather than shared.

## Responsive behaviour

Mobile-**last**: desktop rules are written first and overridden by `max-width` media queries.
Breakpoints in use:

| Breakpoint | Count | Purpose |
| --- | --- | --- |
| `768px` | 22 (mixed `(max-width:)` and `screen and (max-width:)`) | primary phone/tablet break |
| `767px` | 1 | shell navbar → hamburger |
| `1200px`, `1024px` (×2) | 3 | wide-layout tweaks |
| `576px`, `575px`, `480px` (×2) | 5 | small-phone type scaling |
| `300px` | 1 | one-off |

The `767` vs `768` mismatch means at exactly 768 px the navbar has already switched to desktop
layout while some page content is still in mobile layout. Nothing above 1200 px is handled, so the
site simply centres in a 1200 px column on large displays.

**Mobile nav** — the hamburger toggles `.nav-overlay.open`, a full-screen
`rgba(0,0,0,0.9)` overlay with the links stacked and centred. There is no visible close button:
dismissal relies on tapping a link (`closeMenu()`). The overlay is `position: fixed` but the page
behind it is not scroll-locked.

**Dropdown behaviour** — the desktop Products dropdown opens on `:hover`. The `.show` class
toggled by `toggleDropdown()` is defined as `display: none`, so the class-based (click/touch)
path does nothing on its own and only `:hover` actually reveals the menu — a real problem on
touch devices, where the nested "Tools → Calculator" item becomes hard to reach.

## Motion

| Effect | Implementation |
| --- | --- |
| Scroll reveal | `IntersectionObserver` at `threshold: 0.1` adds/removes a `visible` class; classes seen: `slide-in`, `zoom-in`. Re-triggers every time a section re-enters view (animations replay on scroll-up) |
| Hero carousel | `setInterval` 3000 ms + `transform: translateX()` with `transition: transform 0.5s ease-in-out` |
| Blinking tagline | `@keyframes blink-text` — 1.3 s infinite opacity 1→0→1 on the header text |
| Hover | `transition: color 0.3s` on links, `background-color 0.3s` on dropdown items |

No `prefers-reduced-motion` handling anywhere. The infinitely blinking header text is the most
aggressive effect on the site and is a known accessibility concern (flashing/blinking content).

## Iconography & imagery

- **Icons** — Font Awesome 6 via CDN (`far fa-envelope` etc.) plus the Material Icons font from
  Google, plus the raw `&#9776;` character for the hamburger. Three icon sources for a handful of
  glyphs.
- **Logos** — `logo-new.png` is the live logo; `logosv.png`, `SVLotsLogo.png`, `SV Lots logo.png`,
  and `sv1.png` are unused variants still in the repo.
- **Photography** — a mix of licensed stock (`pexels-*`), AI-generated (`Firefly1*`), client
  brochure scans (`Prestige Group/`), and screenshots (`*.PNG` of app UI: `3sides.png`,
  `4 sides.PNG`, `Trapezium.PNG`, `jcom20.PNG`, `maps.PNG`). Naming is inconsistent — spaces,
  parentheses, mixed case, mixed extensions (`.PNG` vs `.png`).
- Roughly **34 of 80 asset files are referenced**; the rest are dead weight in the bundle.

## Accessibility posture

| Signal | Status |
| --- | --- |
| `alt` text | Present on ~39 images; **absent entirely** in `flyers`, `products`, `datacollection`, `projectform`, `services` templates |
| ARIA | One `role=` attribute in the entire codebase; no `aria-label`, `aria-expanded`, or `aria-controls` on the hamburger or dropdowns |
| Semantics | Navbar/footer/sections are all `<div>`; only `<nav>` is used. No `<main>`, `<header>`, `<footer>`, or `<section>` landmarks |
| Keyboard | Dropdowns are `<a>` elements with `(click)` handlers; the hamburger is a `<div>` with `(click)` — not focusable or Enter/Space-activatable |
| Focus | No `:focus` or `:focus-visible` styles are defined anywhere |
| Motion | Infinite blink animation, no reduced-motion opt-out |
| Contrast | Gold `rgb(189,150,102)` on slate `rgb(55,65,81)` and `#f1e67b` on the same slate are both marginal for body-size text |

## If you consolidate this

Recommended order (cheap → structural):

1. Extract the palette into CSS custom properties in `styles.css`; replace literals.
2. Pick **one** type stack + a modular scale in `rem`; delete the eleven per-page overrides.
3. Move each template's `<style>` block into its (currently empty) `.component.css` so Angular
   actually scopes it — and fix the leakage that surfaces.
4. Standardise on `768px` / `1024px` / `1200px`; delete the 767/575/300 one-offs.
5. Build shared `card`, `button`, `section-heading`, and `form-field` classes; the same three
   components are hand-rolled on every page.
6. Add focus styles, ARIA on the nav, semantic landmarks, and a `prefers-reduced-motion` block.
