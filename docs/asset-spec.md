# Asset Spec

How imagery works in the Next.js site, what exists today, and what to supply if you
want to raise the ceiling further.

## Pipeline

`src/assets/` (Angular era, 84.4 MB, 80 files) → **`assets/images/`** (4.0 MB, 30 files).

Run by [scripts/optimize-assets.ts](../scripts/optimize-assets.ts) via `npm run assets`.
It is a **one-off**: `src/` was deleted after it ran. Originals remain in git at commit
`15b9239` — recover one with:

```bash
git show 15b9239:"src/assets/<filename>" > /tmp/<filename>
```

**Result: 84.4 MB → 5.5 MB including video (93.4% reduction).**

## Why `assets/` and not `public/`

Images in `assets/` are **statically imported** by components:

```tsx
import heroLand from "@/assets/images/hero/land-dusk.webp";
<Image src={heroLand} alt="…" placeholder="blur" />
```

Next then supplies `width`, `height` and a `blurDataURL` automatically, serves the file
from an immutable content-hashed URL, and generates AVIF/WebP variants per request. You
cannot get blur placeholders or automatic dimensions from a `public/` path string.

`public/` holds only what needs a stable URL: `public/video/brand-loop.mp4`.
App icons live at `app/icon.png` and `app/apple-icon.png` (Next metadata convention).

## Current inventory

### Full-bleed capable (≥2000px wide)

| File | Dimensions | Size | Use |
| --- | --- | --- | --- |
| `hero/land-dusk.webp` | 2880×1921 | 220 KB | **Home hero.** Palms mirrored in still water at dusk. Was unused by the old site. |
| `hero/tree-sunset.webp` | 2400×1600 | 173 KB | Warm CTA band. Lone tree, moon, sunset. |
| `hero/mountain-lake.webp` | 2400×1600 | 146 KB | Dark quote / closing band. |
| `hero/skyline-night.webp` | 2000×1272 | 236 KB | Urban investment context. |
| `projects/prestige/towers-lake.webp` | 2400×1308 | 270 KB | **Featured project band.** Towers reflected in a lily-covered lake. |
| `projects/prestige/garden-courts.webp` | 2400×1294 | 443 KB | Aerial landscaped courts. |
| `projects/prestige/cover.webp` | 2100×1500 | 420 KB | Project card / cover (carries Prestige branding). |

### Mid-size (900–1600px) — cards, split sections, portraits

`sections/coverage-map.webp` 1336×856 · `sections/documentation.webp` 1200×1200 ·
`sections/survey-plans.webp` 1200×1200 · `sections/farmland.webp` 1200×700 ·
`projects/prestige/sky-terrace.webp` 1760×1300 · `projects/prestige/pool.webp` 1950×824 ·
`projects/prestige/gym.webp` 1806×840 · `projects/prestige/lakeside-lawn.webp` 2400×320 (thin band) ·
`projects/prestige/elevation.webp` 978×634 · `people/managing-director.webp` 900×1029 ·
`brand/lockup-dark.webp` 900×1412

### Small (<900px) — thumbnails and inline only

`sections/sustainability.webp` 698×425 · `projects/prestige/interior.webp` 642×541 ·
`flyers/*.webp` ~480–600 wide · `sections/growth.webp` 512×512 ·
`projects/euphoria/*.webp` ~495×406 · `sections/plot-measurement.webp` 364×248

> **Do not** use anything from this group in a full-bleed band — the source pixels
> aren't there and it will look soft. The Angular site made exactly this mistake,
> stretching a 1400×400 banner across the hero.

### Brand

| File | Dimensions | Use |
| --- | --- | --- |
| `brand/mark.png` | 128×245, alpha | Header. Mark only; "SV LOTS" is set as live type beside it. |
| `brand/logo.png` | 338×402, alpha | Full vertical lockup (mark + wordmark) for the footer. |
| `brand/lockup-dark.webp` | 900×1412 | OG images and dark lockups. |

## ⚠️ Excluded — action required

**`agri1.webp` is a watermarked Shutterstock comp image (asset ID 2174586171)** and was
being served on the live Angular site. It is excluded from the new build. Either license
it properly or use `sections/farmland.webp` in its place.

Also dropped, with reasons recorded in the script's `excluded` map: the three composed
"Global Presence" banners, `carousel2/3.png` (1400×400 — too small to be a hero, and the
old site used `carousel3` for *both* slide 1 and slide 3), four duplicate logo variants,
the four CAD screenshots (now live SVGs in the area calculator), and two clichéd stock
"MISSION"/"Vision" graphics (replaced with typographic treatments).

## Prestige Raintree Park crops

The Prestige brochure pages are **4200×1500 print spreads, not photographs**. Each carries
baked-in marketing copy ("MAJESTICALLY TOWERING OVER THE TRANQUIL WATERS", "A GREEN EXPANSE
FOR THE EYES"), page numbers, diagonal print artefacts, a white paper background, and a
"THIS IMAGE IS FOR REPRESENTATIONAL PURPOSES ONLY" caption. Dropped in whole they read as
someone else's brochure pasted into the page.

Each asset below is a text-free photographic region, cropped from the original spread and
then auto-trimmed of residual white paper (walk inward from each edge while the edge line
is >90% near-white). Recover an original with the `git show` command above.

| Asset | Source page | Crop box (left, top, w, h) |
| --- | --- | --- |
| `towers-lake.webp` | page-0064 | 0, 20, 2660, 1450 → paper-trimmed |
| `garden-courts.webp` | page-0008 | 1500, 20, 2690, 1450 → paper-trimmed |
| `sky-terrace.webp` | page-0002 | 2420, 45, 1760, 1300 |
| `pool.webp` | page-0061 | 2150, 250, 2000, 950 → paper-trimmed |
| `gym.webp` | page-0061 | 84, 300, 1806, 840 |
| `lakeside-lawn.webp` | page-0006 | 0, 890, 4200, 560 |

The earlier names `green-expanse` / `towers-sunset` / `amenities` / `lake-view` / `courtyard`
were **mislabelled** — the file called `towers-sunset` was in fact the green-expanse spread.
They were replaced by the names above.

> These are Prestige Group's copyrighted project renders, used to market a project SV Lots
> represents — the same basis as the Angular site. Attribution is explicit on the page
> ("Featured project — Prestige Raintree Park"). Confirm the marketing agreement permits it.

## Supplying better imagery

The layouts are built to swap. Drop a file into the matching folder, keep the aspect
ratio in the table above, and update the import. No layout changes needed.

Highest-impact additions, in order:

1. **Drone / aerial stills of actual SV Lots layouts** — 3000×2000 or wider, landscape.
   Currently every wide image is either licensed stock or Prestige Group's brochure. Real
   site photography is the single biggest credibility upgrade available.
2. **Team portraits** — 1200×1500 portrait, consistent lighting and background. Only the
   Managing Director has a photo, and it is a snapshot rather than a studio portrait.
3. **A vector logo (SVG or AI/EPS)** — the best raster source is 338×402 with alpha, so
   the mark cannot be rendered large (a full-width hero lockup or print collateral) without
   softness.
4. **Completed-project photography** for the Sites and Building models, which currently
   have their "Get Access" CTAs disabled for lack of material.

### Format guidance

- Deliver **originals** (largest available). The pipeline downsizes; it can't invent detail.
- Photographs → WebP q82–86. Anything needing transparency → PNG.
- Target ≤450 KB per full-bleed image, ≤180 KB per card image.
- Name files `kebab-case`, no spaces, parentheses or mixed extensions. The old set had
  `flyer (13).png`, `4 sides.PNG` and `SV Lots map.PNG`, all of which needed escaping.
