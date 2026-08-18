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
| `projects/prestige/towers-sunset.webp` | 2400×857 | 425 KB | Featured project band. |
| `projects/prestige/amenities.webp` | 2400×857 | 409 KB | Gallery / amenities. |
| `projects/prestige/courtyard.webp` | 2400×857 | 238 KB | Gallery. |
| `projects/prestige/lake-view.webp` | 2400×857 | 177 KB | Gallery. |
| `projects/prestige/green-expanse.webp` | 2400×857 | 147 KB | Gallery. |
| `projects/prestige/cover.webp` | 2100×1500 | 420 KB | Project card / cover. |

### Mid-size (900–1600px) — cards, split sections, portraits

`sections/coverage-map.webp` 1336×856 · `sections/documentation.webp` 1200×1200 ·
`sections/survey-plans.webp` 1200×1200 · `sections/farmland.webp` 1200×700 ·
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
