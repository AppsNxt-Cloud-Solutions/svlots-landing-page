/**
 * One-off asset pipeline: src/assets (85 MB, Angular era) → assets/images (optimized).
 *
 * Run with:  npm run assets
 *
 * Why assets/ and not public/:
 *   Files under assets/ are statically imported by components, so Next derives
 *   width/height and a blurDataURL automatically and serves them from an
 *   immutable content-hashed URL. public/ is reserved for things that need a
 *   stable path (video, robots, icons).
 *
 * The source folder is intentionally NOT read at runtime — this script is the
 * only consumer, and src/ is deleted once it has run. Originals remain in git
 * history (commit 15b9239) if a different crop is ever needed.
 */

import { existsSync } from "node:fs";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "src/assets";
const OUT = "assets/images";
const PUBLIC = "public";

type Job = {
  /** path relative to src/assets */
  from: string;
  /** path relative to assets/images (extension added by the encoder) */
  to: string;
  width: number;
  /** photographic → webp; needs transparency → png */
  kind?: "photo" | "alpha";
  /** trim uniform borders before resizing */
  trim?: boolean;
  /** keep only the top fraction of the image, then trim (used for the logo mark) */
  cropTop?: number;
  quality?: number;
};

/* ───────────────────────────────────────────────────────────────────────────
   CURATED MANIFEST
   Of 80 source files only ~34 were referenced by the Angular app, and several
   of those were poor choices (a 1400x400 banner used as a full-bleed hero).
   This selects the genuinely good imagery and drops the rest.
   ─────────────────────────────────────────────────────────────────────────── */

const jobs: Job[] = [
  // ── Brand ────────────────────────────────────────────────────────────────
  // logo-new.png is the only logo with an alpha channel (338x402). Kept
  // untrimmed: trimming clips the "SV LOTS" wordmark, whose antialiased edges
  // fall below the trim threshold.
  { from: "logo-new.png", to: "brand/logo", width: 338, kind: "alpha" },
  // Mark only (no wordmark) for the 72px header, where the vertical lockup is
  // the wrong shape. "SV LOTS" is set as live type beside it instead.
  { from: "logo-new.png", to: "brand/mark", width: 338, kind: "alpha", cropTop: 0.72 },
  // jpg.jpg is a 3300x2550 lockup on dark — the highest-res brand asset in the
  // repo, and was completely unused. Used for OG images and dark lockups.
  { from: "jpg.jpg", to: "brand/lockup-dark", width: 900, trim: true, quality: 88 },

  // ── Heroes / full-bleed bands ────────────────────────────────────────────
  // 7952x5304 palms over still water at dusk. Unused by the old site.
  {
    from: "pexels-quang-nguyen-vinh-222549-2131614 (1).jpg",
    to: "hero/land-dusk",
    width: 2880,
    quality: 82,
  },
  // 4608x3072 lone tree, moon, sunset.
  { from: "pexels-david-besh-884788.jpg", to: "hero/tree-sunset", width: 2400 },
  // 3648x2432 dark mountains mirrored in a lake — the dark quote band.
  { from: "pexels-eberhardgross-1301976.jpg", to: "hero/mountain-lake", width: 2400 },
  // 3000x1908 night skyline.
  { from: "pexels-souvenirpixels-1519088.jpg", to: "hero/skyline-night", width: 2000 },

  // ── Supporting section imagery ───────────────────────────────────────────
  { from: "Firefly1.jpg", to: "sections/growth", width: 1800 },
  { from: "SVLots1.jpeg", to: "sections/documentation", width: 1200 },
  { from: "SVLots2.jpeg", to: "sections/survey-plans", width: 1200 },
  { from: "SVLots3.jpg", to: "sections/sustainability", width: 1200 },
  { from: "agri2.jpg", to: "sections/farmland", width: 1200 },
  { from: "SV Lots map.PNG", to: "sections/coverage-map", width: 1336 },
  { from: "4(1).PNG", to: "sections/plot-measurement", width: 1000 },

  // ── People ───────────────────────────────────────────────────────────────
  { from: "Director.jpeg", to: "people/managing-director", width: 900, quality: 86 },

  // ── Featured project: Prestige Raintree Park (4200x1500 panoramics) ──────
  {
    from: "Prestige Group/Prestige Raintree Park_Lifestyle Brochure_page-0001.jpg",
    to: "projects/prestige/cover",
    width: 2100,
  },
  {
    from: "Prestige Group/Prestige Raintree Park_Lifestyle Brochure_page-0002.jpg",
    to: "projects/prestige/green-expanse",
    width: 2400,
  },
  {
    from: "Prestige Group/Prestige Raintree Park_Lifestyle Brochure_page-0006.jpg",
    to: "projects/prestige/towers-sunset",
    width: 2400,
  },
  {
    from: "Prestige Group/Prestige Raintree Park_Lifestyle Brochure_page-0008.jpg",
    to: "projects/prestige/amenities",
    width: 2400,
  },
  {
    from: "Prestige Group/Prestige Raintree Park_Lifestyle Brochure_page-0061.jpg",
    to: "projects/prestige/lake-view",
    width: 2400,
  },
  {
    from: "Prestige Group/Prestige Raintree Park_Lifestyle Brochure_page-0064.jpg",
    to: "projects/prestige/courtyard",
    width: 2400,
  },
  {
    from: "Prestige Group/Extraordinary living.PNG",
    to: "projects/prestige/interior",
    width: 1800,
  },
  {
    from: "Prestige Group/prestige1.PNG",
    to: "projects/prestige/elevation",
    width: 1600,
  },

  // ── Euphoria ─────────────────────────────────────────────────────────────
  { from: "euphoria image.PNG", to: "projects/euphoria/hero", width: 1600 },
  { from: "euphoria1.PNG", to: "projects/euphoria/view-01", width: 1600 },
  { from: "euphoria2.PNG", to: "projects/euphoria/view-02", width: 1600 },

  // ── Property flyers (SV Lots' own listings) ──────────────────────────────
  { from: "flyer (9).png", to: "flyers/layout-gubbi", width: 900 },
  { from: "flyer (10).png", to: "flyers/retail-tumkur", width: 900 },
  { from: "flyer (13).png", to: "flyers/land-nandihalli", width: 900 },
  { from: "flyer (14).png", to: "flyers/layout-residential", width: 900 },
];

/* ───────────────────────────────────────────────────────────────────────────
   DELIBERATELY EXCLUDED — see docs/asset-spec.md for the reasoning
   ─────────────────────────────────────────────────────────────────────────── */

const excluded: Record<string, string> = {
  "agri1.webp":
    "⚠️  WATERMARKED Shutterstock comp (id 2174586171) — was live on the old site. Licence it or replace it.",
  "mission.webp":
    "Generic stock 'MISSION' graphic — replaced by a typographic treatment.",
  "our-vision.jpg":
    "Generic stock 'Vision' graphic — replaced by a typographic treatment.",
  "carousel1.png": "Composed banner, not photography. Superseded by the new hero.",
  "carousel2.png": "1400x400 — far too small for a modern hero.",
  "carousel3.png": "1400x400, and the old site used it for slides 1 AND 3.",
  "svlots carousel1.jpeg":
    "Composed 'Global Presence' banner — content now rendered as real markup.",
  "svlots carousel2.jpeg": "Composed banner.",
  "svlots carousel3.jpeg": "Composed banner.",
  "logosv.png": "Duplicate logo variant.",
  "SVLotsLogo.png": "Duplicate logo variant.",
  "SV Lots logo.png": "Duplicate logo variant.",
  "sv1.png": "Duplicate logo variant.",
  "Firefly1-fotor.jpg": "Lower-quality edit of Firefly1.jpg.",
  "3sides.png": "CAD screenshot — rebuilt as a live SVG in the area calculator.",
  "4 sides.PNG": "CAD screenshot — rebuilt as a live SVG.",
  "5 sides.PNG": "CAD screenshot — rebuilt as a live SVG.",
  "Trapezium.PNG": "CAD screenshot — rebuilt as a live SVG.",
  "maps.PNG": "Superseded by sections/coverage-map.",
  "resize1.png": "Duplicate of flyer (9).",
};

/* ───────────────────────────────────────────────────────────────────────────
   RUN
   ─────────────────────────────────────────────────────────────────────────── */

async function dirSize(dir: string): Promise<number> {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    total += entry.isDirectory() ? await dirSize(p) : (await stat(p)).size;
  }
  return total;
}

const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

async function main() {
  if (!existsSync(SRC)) {
    console.error(`✗ ${SRC} not found. This script runs once, before src/ is removed.`);
    process.exit(1);
  }

  const before = await dirSize(SRC);
  await rm(OUT, { recursive: true, force: true });

  let written = 0;
  let failed = 0;

  for (const job of jobs) {
    const from = path.join(SRC, job.from);
    if (!existsSync(from)) {
      console.warn(`  ! missing source: ${job.from}`);
      failed++;
      continue;
    }

    const alpha = job.kind === "alpha";
    const ext = alpha ? "png" : "webp";
    const dest = path.join(OUT, `${job.to}.${ext}`);
    await mkdir(path.dirname(dest), { recursive: true });

    // cropTop needs two passes: sharp cannot chain extract → trim in one.
    let input: string | Buffer = from;
    if (job.cropTop) {
      const meta = await sharp(from).metadata();
      const cropped = await sharp(from)
        .extract({
          left: 0,
          top: 0,
          width: meta.width ?? 0,
          height: Math.round((meta.height ?? 0) * job.cropTop),
        })
        .png()
        .toBuffer();
      input = await sharp(cropped).trim({ threshold: 10 }).png().toBuffer();
    }

    let pipeline = sharp(input);
    if (job.trim) pipeline = pipeline.trim({ threshold: 20 });
    pipeline = pipeline.resize({
      width: job.width,
      withoutEnlargement: true,
      fit: "inside",
    });

    pipeline = alpha
      ? pipeline.png({ compressionLevel: 9, palette: true })
      : pipeline.webp({ quality: job.quality ?? 84, effort: 5 });

    const info = await pipeline.toFile(dest);
    console.log(
      `  ✓ ${job.to}.${ext}`.padEnd(48) +
        `${info.width}x${info.height}`.padEnd(12) +
        `${Math.round(info.size / 1024)} KB`,
    );
    written++;
  }

  // App icons (Next metadata convention) — logo on the brand ink background.
  const iconSrc = path.join(SRC, "logo-new.png");
  if (existsSync(iconSrc)) {
    for (const [name, size] of [
      ["icon", 512],
      ["apple-icon", 180],
    ] as const) {
      await sharp(iconSrc)
        .trim({ threshold: 20 })
        .resize(Math.round(size * 0.78), Math.round(size * 0.78), { fit: "inside" })
        .extend({
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: { r: 19, g: 27, b: 37, alpha: 1 },
        })
        .resize(size, size, {
          fit: "contain",
          background: { r: 19, g: 27, b: 37, alpha: 1 },
        })
        .png()
        .toFile(path.join("app", `${name}.png`));
      console.log(`${`  ✓ app/${name}.png`.padEnd(48)}${size}x${size}`);
    }
  }

  // Hero video keeps a stable public path (referenced by <video src>).
  const video = path.join(SRC, "poster video.mp4");
  if (existsSync(video)) {
    await mkdir(path.join(PUBLIC, "video"), { recursive: true });
    await sharp; // no-op, keeps import used if jobs list is emptied
    const { copyFile } = await import("node:fs/promises");
    await copyFile(video, path.join(PUBLIC, "video", "brand-loop.mp4"));
    console.log(
      `  ✓ public/video/brand-loop.mp4`.padEnd(48) + mb((await stat(video)).size),
    );
  }

  const after =
    (await dirSize(OUT)) + (await dirSize(path.join(PUBLIC, "video")).catch(() => 0));

  console.log(`\n  source   ${mb(before)}  (${SRC})`);
  console.log(`  output   ${mb(after)}  (${OUT} + public/video)`);
  console.log(`  saved    ${((1 - after / before) * 100).toFixed(1)}%`);
  console.log(`  files    ${written} written, ${failed} missing`);

  console.log(`\n  Excluded ${Object.keys(excluded).length} source files:`);
  for (const [file, why] of Object.entries(excluded)) {
    console.log(`    ${file.padEnd(38)} ${why}`);
  }
}

await main();
