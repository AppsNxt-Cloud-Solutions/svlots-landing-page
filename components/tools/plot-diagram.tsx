"use client";

import { motion, useReducedMotion } from "motion/react";
import { fitToBox, midpoint, type Point } from "@/lib/geometry";

const W = 460;
const H = 340;
const PAD = 54;

/**
 * Live, to-scale plot diagram.
 *
 * Replaces the four static CAD screenshots the old site used as illustrations
 * (3sides.png, "4 sides.PNG", "5 sides.PNG", Trapezium.PNG) with a drawing of
 * the figures the user actually typed.
 */
export function PlotDiagram({
  points,
  triangles,
  sideLabels,
  diagonalLabels,
  unitShort,
}: {
  points: Point[] | null;
  triangles: [number, number, number][];
  sideLabels: string[];
  diagonalLabels: string[];
  unitShort: string;
}) {
  const reduced = useReducedMotion();

  if (!points) {
    return (
      <div className="grid aspect-[46/34] w-full place-items-center rounded-card border border-dashed border-ink-300 bg-surface-alt">
        <p className="max-w-56 text-center text-sm text-ink-400">
          Enter the lengths and the plot is drawn here, to scale.
        </p>
      </div>
    );
  }

  const fitted = fitToBox(points, W, H, PAD);
  const path = `${fitted.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} Z`;

  // Diagonals fan from vertex 0; skip the two that are polygon edges.
  const diagonals = triangles
    .map(([, b]) => b)
    .filter((index) => index !== 1 && index !== fitted.length - 1);

  const vertices = fitted.map((p, i) => ({ id: `v${i}`, x: p.x, y: p.y }));

  const centroidX = fitted.reduce((sum, v) => sum + v.x, 0) / fitted.length;
  const centroidY = fitted.reduce((sum, v) => sum + v.y, 0) / fitted.length;

  const edgeLabels = fitted
    .map((p, i) => {
      const q = fitted[(i + 1) % fitted.length];
      const m = midpoint(p, q);
      const dx = m.x - centroidX;
      const dy = m.y - centroidY;
      const length = Math.hypot(dx, dy) || 1;
      return {
        id: `e${i}`,
        label: sideLabels[i],
        x: m.x + (dx / length) * 20,
        y: m.y + (dy / length) * 20,
      };
    })
    .filter((edge) => Boolean(edge.label));

  const diagonalTexts = diagonals
    .map((index, i) => {
      const m = midpoint(fitted[0], fitted[index]);
      return { id: `d${index}`, label: diagonalLabels[i], x: m.x, y: m.y - 7 };
    })
    .filter((item) => Boolean(item.label));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full rounded-card border border-ink-200 bg-surface"
      role="img"
      aria-label="Scale diagram of the plot described by the entered lengths"
    >
      <title>Plot diagram</title>

      {/* Fill */}
      <motion.path
        d={path}
        fill="var(--color-gold-500)"
        fillOpacity={0.1}
        stroke="none"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Diagonals */}
      {diagonals.map((index) => (
        <line
          key={`diagonal-${index}`}
          x1={fitted[0].x}
          y1={fitted[0].y}
          x2={fitted[index].x}
          y2={fitted[index].y}
          stroke="var(--color-gold-600)"
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.75}
        />
      ))}

      {/* Outline */}
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-ink-800)"
        strokeWidth={1.75}
        strokeLinejoin="round"
        initial={reduced ? undefined : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Vertices */}
      {vertices.map((p) => (
        <circle
          key={p.id}
          cx={p.x}
          cy={p.y}
          r={3.5}
          fill="var(--color-surface)"
          stroke="var(--color-gold-600)"
          strokeWidth={1.75}
        />
      ))}

      {/* Side labels, nudged outward from the centroid */}
      {edgeLabels.map((edge) => (
        <text
          key={edge.id}
          x={edge.x}
          y={edge.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-ink-600 text-[11px] font-medium"
        >
          {edge.label}
        </text>
      ))}

      {/* Diagonal labels */}
      {diagonalTexts.map((item) => (
        <text
          key={item.id}
          x={item.x}
          y={item.y}
          textAnchor="middle"
          className="fill-gold-700 text-[10px] font-medium"
        >
          {item.label}
        </text>
      ))}

      <text x={W - 10} y={H - 8} textAnchor="end" className="fill-ink-400 text-[10px]">
        lengths in {unitShort === "m²" ? "metres" : "feet"}
      </text>
    </svg>
  );
}
