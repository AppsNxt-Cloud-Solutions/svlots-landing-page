/**
 * Plot area from side lengths.
 *
 * Ported from calculator.component.ts, which used a single 24-control FormGroup
 * driving three calculators at once and recomputed all of them on every
 * keystroke. It also returned a silent 0.00 for side lengths that cannot form a
 * triangle, so users could not tell an invalid entry from a genuinely tiny plot.
 */

export type TriangleResult =
  | { ok: true; area: number }
  | { ok: false; reason: "incomplete" | "nonpositive" | "inequality" };

/** Heron's formula, with the failure cases named. */
export function triangleArea(a: number, b: number, c: number): TriangleResult {
  if (![a, b, c].every((side) => Number.isFinite(side) && side !== 0)) {
    return { ok: false, reason: "incomplete" };
  }
  if ([a, b, c].some((side) => side <= 0)) {
    return { ok: false, reason: "nonpositive" };
  }
  // Triangle inequality: the two shorter sides must exceed the longest.
  const [x, y, z] = [a, b, c].sort((m, n) => m - n);
  if (x + y <= z) {
    return { ok: false, reason: "inequality" };
  }

  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return Number.isFinite(area) ? { ok: true, area } : { ok: false, reason: "inequality" };
}

export const reasonMessage: Record<
  Exclude<TriangleResult, { ok: true }>["reason"],
  string
> = {
  incomplete: "Enter all three lengths.",
  nonpositive: "Lengths must be greater than zero.",
  inequality:
    "These lengths cannot form a triangle — the two shorter sides must add up to more than the longest.",
};

/* ── Units ──────────────────────────────────────────────────────────────────
   The old calculator labelled everything "Sqm" with no way to convert, though
   land in Karnataka is commonly quoted in square feet, guntha and acres.
   ───────────────────────────────────────────────────────────────────────── */

export type AreaUnit = "sqm" | "sqft" | "guntha" | "acre";

export const units: { id: AreaUnit; label: string; short: string }[] = [
  { id: "sqm", label: "Square metres", short: "m²" },
  { id: "sqft", label: "Square feet", short: "sq ft" },
  { id: "guntha", label: "Guntha", short: "guntha" },
  { id: "acre", label: "Acres", short: "acre" },
];

/** Square metres per unit. 1 guntha = 1089 sq ft; 1 acre = 40 guntha. */
const perSquareMetre: Record<AreaUnit, number> = {
  sqm: 1,
  sqft: 10.763910416709722,
  guntha: 1 / 101.17141056,
  acre: 1 / 4046.8564224,
};

export function convertArea(squareMetres: number, unit: AreaUnit): number {
  return squareMetres * perSquareMetre[unit];
}

export function formatArea(value: number, unit: AreaUnit): string {
  const decimals = unit === "acre" || unit === "guntha" ? 3 : 2;
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* ── Diagram geometry ───────────────────────────────────────────────────────
   Places a triangle's vertices from its three side lengths so the shape can be
   drawn to scale. C sits at the intersection of the two circles centred on A
   and B — the standard trilateration construction.
   ───────────────────────────────────────────────────────────────────────── */

export type Point = { x: number; y: number };

export function triangleVertices(
  a: number,
  b: number,
  c: number,
): [Point, Point, Point] | null {
  // Side c is the base (A→B); a is opposite A, b is opposite B.
  if (!triangleArea(a, b, c).ok) return null;

  const A = { x: 0, y: 0 };
  const B = { x: c, y: 0 };
  const x = (b * b + c * c - a * a) / (2 * c);
  const ySquared = b * b - x * x;
  if (ySquared < 0) return null;
  return [A, B, { x, y: Math.sqrt(ySquared) }];
}

/** Fit points into a viewBox with padding, flipping Y for screen coordinates. */
export function fitToBox(
  points: Point[],
  width: number,
  height: number,
  padding: number,
): Point[] {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const scale = Math.min((width - padding * 2) / spanX, (height - padding * 2) / spanY);

  const offsetX = (width - spanX * scale) / 2;
  const offsetY = (height - spanY * scale) / 2;

  return points.map((p) => ({
    x: offsetX + (p.x - minX) * scale,
    // Flip so the base sits at the bottom.
    y: height - (offsetY + (p.y - minY) * scale),
  }));
}

export function midpoint(p: Point, q: Point): Point {
  return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
}

/* ── Polygon from side lengths + diagonals ──────────────────────────────────
   The surveyor's method the CAD drawings in the old repo used: fan the polygon
   into triangles from one vertex, so an irregular plot is fully determined by
   its sides plus the diagonals from that vertex.

     quadrilateral  s1..s4 + d1        -> 2 triangles
     pentagon       s1..s5 + d1,d2     -> 3 triangles

   The old calculator asked for disconnected triangle sets instead, so the
   figures could describe a shape that does not close.
   ───────────────────────────────────────────────────────────────────────── */

export type PolygonSolution = {
  points: Point[];
  /** Triangles as index triples into `points`, for drawing the diagonals. */
  triangles: [number, number, number][];
  area: number;
  /** Sum of the fan triangles. Equals `area` for the convex reading. */
  convexReading: number;
};

export type PolygonResult =
  | { ok: true; value: PolygonSolution }
  | { ok: false; reason: "incomplete" | "nonpositive" | "unclosable" };

/**
 * @param sides      n side lengths, in order around the plot
 * @param diagonals  n-3 diagonals, all measured from corner 1
 *
 * Vertices are placed by accumulating the interior angle each triangle
 * subtends at corner 1 (law of cosines), rather than by intersecting circles
 * and guessing which of the two solutions is correct. Circle intersection is
 * ambiguous — for a concave plot the wrong root inflates the area, which is
 * exactly the failure this replaces.
 */
export function solvePolygon(sides: number[], diagonals: number[]): PolygonResult {
  const all = [...sides, ...diagonals];
  if (all.some((v) => !Number.isFinite(v) || v === 0)) {
    return { ok: false, reason: "incomplete" };
  }
  if (all.some((v) => v <= 0)) return { ok: false, reason: "nonpositive" };

  const n = sides.length;
  // Spokes from corner 1 out to every other corner.
  const spokes = [sides[0], ...diagonals, sides[n - 1]];

  const points: Point[] = [{ x: 0, y: 0 }];
  let angle = 0;
  let heronTotal = 0;

  points.push({ x: spokes[0], y: 0 });

  for (let i = 1; i <= n - 2; i++) {
    const a = spokes[i - 1]; // corner 1 -> current vertex
    const b = spokes[i]; // corner 1 -> next vertex
    const c = sides[i]; // the side between them

    const tri = triangleArea(a, b, c);
    if (!tri.ok) return { ok: false, reason: "unclosable" };
    heronTotal += tri.area;

    const cosine = (a * a + b * b - c * c) / (2 * a * b);
    if (!Number.isFinite(cosine) || cosine < -1 || cosine > 1) {
      return { ok: false, reason: "unclosable" };
    }

    angle += Math.acos(cosine);
    // A fan that sweeps past a full turn cannot describe a simple plot.
    if (angle >= Math.PI * 2) return { ok: false, reason: "unclosable" };

    points.push({ x: b * Math.cos(angle), y: b * Math.sin(angle) });
  }

  // Shoelace over the placed outline.
  let doubled = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const q = points[(i + 1) % points.length];
    doubled += p.x * q.y - q.x * p.y;
  }
  const outline = Math.abs(doubled) / 2;

  if (!Number.isFinite(outline) || outline <= 0) {
    return { ok: false, reason: "unclosable" };
  }

  // A set of lengths can describe a figure whose edges cross, which is not a
  // plot. That is detectable, unlike the convex/concave ambiguity below.
  if (selfIntersects(points)) return { ok: false, reason: "unclosable" };

  const triangles: [number, number, number][] = [];
  for (let i = 1; i < points.length - 1; i++) {
    triangles.push([0, i, i + 1]);
  }

  return {
    ok: true,
    value: { points, triangles, area: outline, convexReading: heronTotal },
  };
}

/* ── Simplicity test ────────────────────────────────────────────────────── */

function crosses(a: Point, b: Point, c: Point, d: Point): boolean {
  const side = (p: Point, q: Point, r: Point) =>
    Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
  const d1 = side(a, b, c);
  const d2 = side(a, b, d);
  const d3 = side(c, d, a);
  const d4 = side(c, d, b);
  return d1 !== d2 && d3 !== d4 && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0;
}

function selfIntersects(points: Point[]): boolean {
  const n = points.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue; // adjacent through the closing edge
      if (crosses(points[i], points[(i + 1) % n], points[j], points[(j + 1) % n])) {
        return true;
      }
    }
  }
  return false;
}

export const polygonReason: Record<
  Exclude<PolygonResult, { ok: true }>["reason"],
  string
> = {
  incomplete: "Enter every length to see the area.",
  nonpositive: "Lengths must be greater than zero.",
  unclosable:
    "These lengths cannot close into a shape. Check the diagonals — each one must be shorter than the two sides it spans, and longer than their difference.",
};
