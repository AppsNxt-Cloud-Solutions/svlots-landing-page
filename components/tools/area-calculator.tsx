"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useId, useState } from "react";
import { Field, fieldBorder, inputClasses } from "@/components/forms/field";
import { PlotDiagram } from "@/components/tools/plot-diagram";
import { Button } from "@/components/ui/button";
import {
  type AreaUnit,
  convertArea,
  formatArea,
  polygonReason,
  solvePolygon,
  units,
} from "@/lib/geometry";
import { cn } from "@/lib/utils";

/** Length units for the inputs — separate from the area unit for the result. */
type LengthUnit = "m" | "ft";
const METRES_PER_FOOT = 0.3048;

type Shape = {
  id: string;
  label: string;
  /** How the old site titled the same calculator. */
  legacyLabel: string;
  sides: number;
  diagonals: number;
};

const shapes: Shape[] = [
  {
    id: "triangle",
    label: "Triangle",
    legacyLabel: "Area Calculator for Triangle",
    sides: 3,
    diagonals: 0,
  },
  {
    id: "quadrilateral",
    label: "Quadrilateral",
    legacyLabel: "Area Calculator For Irregular Quadrilateral",
    sides: 4,
    diagonals: 1,
  },
  {
    id: "pentagon",
    label: "5-sided",
    legacyLabel: "Area Calculator For Irregular Trapezium",
    sides: 5,
    diagonals: 2,
  },
];

export function AreaCalculator() {
  const ids = useId();
  const [shapeId, setShapeId] = useState(shapes[1].id);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("sqm");
  const [raw, setRaw] = useState<Record<string, string>>({});

  const shape = shapes.find((s) => s.id === shapeId) ?? shapes[1];

  const key = (kind: "s" | "d", index: number) => `${shape.id}-${kind}${index}`;
  const numberAt = (kind: "s" | "d", index: number) =>
    Number.parseFloat(raw[key(kind, index)] ?? "");

  const sides = Array.from({ length: shape.sides }, (_, i) => numberAt("s", i));
  const diagonals = Array.from({ length: shape.diagonals }, (_, i) => numberAt("d", i));

  // Solved on every render: a handful of sqrt calls, so memoising would add
  // dependency bookkeeping for no measurable gain.
  const factor = lengthUnit === "ft" ? METRES_PER_FOOT : 1;
  const result = solvePolygon(
    sides.map((v) => v * factor),
    diagonals.map((v) => v * factor),
  );

  const unitMeta = units.find((u) => u.id === areaUnit) ?? units[0];
  const lengthShort = lengthUnit === "m" ? "m" : "ft";

  // Diagram is drawn in the entered units so its labels match the inputs.
  const diagramSolution = solvePolygon(sides, diagonals);

  // Round for the diagram only — a pasted 14.14213562 would crowd the shape.
  const label = (v: number) =>
    Number.isFinite(v) && v > 0
      ? `${Number(v.toFixed(2)).toLocaleString("en-IN")}${lengthShort}`
      : "";
  const sideLabels = sides.map(label);
  const diagonalLabels = diagonals.map(label);

  function set(kind: "s" | "d", index: number, value: string) {
    setRaw((current) => ({ ...current, [key(kind, index)]: value }));
  }

  const anyInput = Object.entries(raw).some(
    ([k, v]) => k.startsWith(shape.id) && v.trim() !== "",
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      {/* ── Inputs ───────────────────────────────────────────────────────── */}
      <div>
        <fieldset>
          <legend className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
            Plot shape
          </legend>
          <div className="mt-3 inline-flex rounded-pill border border-ink-300 p-1">
            {shapes.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setShapeId(option.id)}
                aria-pressed={option.id === shapeId}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-300",
                  option.id === shapeId
                    ? "bg-ink-900 text-white"
                    : "text-ink-600 hover:text-ink-900",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-500">
            {shape.legacyLabel} — {shape.sides} sides
            {shape.diagonals > 0 &&
              `, ${shape.diagonals} diagonal${shape.diagonals > 1 ? "s" : ""} from corner 1`}
            .
          </p>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
            Lengths are in
          </legend>
          <div className="mt-3 inline-flex rounded-pill border border-ink-300 p-1">
            {(
              [
                ["m", "Metres"],
                ["ft", "Feet"],
              ] as [LengthUnit, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setLengthUnit(id)}
                aria-pressed={id === lengthUnit}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-300",
                  id === lengthUnit
                    ? "bg-ink-900 text-white"
                    : "text-ink-600 hover:text-ink-900",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: shape.sides }, (_, i) => (
            <Field
              key={key("s", i)}
              id={`${ids}-${key("s", i)}`}
              label={`Side ${i + 1} (${lengthShort})`}
            >
              <input
                id={`${ids}-${key("s", i)}`}
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={raw[key("s", i)] ?? ""}
                onChange={(event) => set("s", i, event.target.value)}
                className={cn(inputClasses, fieldBorder())}
                placeholder="0.00"
              />
            </Field>
          ))}

          {Array.from({ length: shape.diagonals }, (_, i) => (
            <Field
              key={key("d", i)}
              id={`${ids}-${key("d", i)}`}
              label={`Diagonal ${i + 1} (${lengthShort})`}
              hint={i === 0 ? "From corner 1" : undefined}
            >
              <input
                id={`${ids}-${key("d", i)}`}
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={raw[key("d", i)] ?? ""}
                onChange={(event) => set("d", i, event.target.value)}
                className={cn(inputClasses, fieldBorder())}
                placeholder="0.00"
              />
            </Field>
          ))}
        </div>

        {anyInput && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mt-6 px-0"
            onClick={() => setRaw({})}
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* ── Diagram + result ─────────────────────────────────────────────── */}
      <div>
        <PlotDiagram
          points={diagramSolution.ok ? diagramSolution.value.points : null}
          triangles={diagramSolution.ok ? diagramSolution.value.triangles : []}
          sideLabels={sideLabels}
          diagonalLabels={diagonalLabels}
          unitShort={lengthUnit === "m" ? "m²" : "sq ft"}
        />

        <div className="mt-6 rounded-card border border-ink-200 bg-surface-alt p-6">
          {result.ok ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="text-2xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                    Total area
                  </p>
                  <p className="mt-2 font-display text-4xl text-ink-900 tabular-nums">
                    {formatArea(convertArea(result.value.area, areaUnit), areaUnit)}
                    <span className="ml-2 font-sans text-base text-ink-500">
                      {unitMeta.short}
                    </span>
                  </p>
                </div>
                <select
                  value={areaUnit}
                  onChange={(event) => setAreaUnit(event.target.value as AreaUnit)}
                  aria-label="Area unit"
                  className="h-10 rounded-pill border border-ink-300 bg-surface px-3 text-sm"
                >
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink-200 pt-5 text-sm sm:grid-cols-4">
                {units.map((unit) => (
                  <div key={unit.id}>
                    <dt className="text-xs text-ink-500">{unit.short}</dt>
                    <dd className="mt-0.5 text-ink-800 tabular-nums">
                      {formatArea(convertArea(result.value.area, unit.id), unit.id)}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <div className="flex gap-3">
              <TriangleAlert
                aria-hidden="true"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  result.reason === "incomplete" ? "text-ink-400" : "text-danger",
                )}
              />
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    result.reason === "incomplete" ? "text-ink-600" : "text-danger",
                  )}
                >
                  {polygonReason[result.reason]}
                </p>
                {result.reason === "unclosable" && (
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">
                    Re-measure the diagonal, or check that the sides are listed in order
                    around the plot.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {result.ok && shape.diagonals > 0 && (
          <p className="mt-4 text-xs leading-relaxed text-ink-500">
            A set of lengths can describe both a convex and an inward-turning plot; this
            reads them as convex, which is the usual case. If your plot has a corner that
            points inwards, split it into parts and add the areas.
          </p>
        )}

        <p className="mt-4 text-xs leading-relaxed text-ink-500">
          Results are indicative. For registration, lending or any legal purpose, use a
          georeferenced survey by a licensed surveyor —{" "}
          <a href="/services" className="underline hover:text-gold-700">
            we can carry one out
          </a>
          .
        </p>
      </div>
    </div>
  );
}
