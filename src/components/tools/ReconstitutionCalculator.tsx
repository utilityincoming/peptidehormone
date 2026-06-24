"use client";

import { useState } from "react";

type DoseUnit = "mcg" | "mg";

function Field({
  label,
  value,
  onChange,
  suffix,
  step = "any",
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  step?: string;
  children?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">{label}</span>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 bg-panel/40 focus-within:border-accent/60">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="flex items-center border-l border-ink/10 px-3 text-sm text-ink/45">
            {suffix}
          </span>
        )}
        {children}
      </div>
    </label>
  );
}

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : NaN;
}

function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  if (n !== 0 && Math.abs(n) < 0.01) return n.toExponential(2);
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export default function ReconstitutionCalculator() {
  const [vialMass, setVialMass] = useState("5"); // mg of peptide in the vial
  const [water, setWater] = useState("2"); // mL of bacteriostatic water added
  const [dose, setDose] = useState("250"); // desired dose
  const [doseUnit, setDoseUnit] = useState<DoseUnit>("mcg");

  const m = num(vialMass);
  const w = num(water);
  const d = num(dose);
  const doseMg = doseUnit === "mcg" ? d / 1000 : d;

  const concMgMl = m / w; // mg/mL
  const concMcgMl = concMgMl * 1000;
  const volPerDoseMl = doseMg / concMgMl;
  const insulinUnits = volPerDoseMl * 100; // U-100 syringe: 1 mL = 100 units
  const dosesPerVial = m / doseMg;

  const ready = Number.isFinite(concMgMl);

  const results = [
    { label: "Concentration", value: ready ? `${fmt(concMgMl)} mg/mL` : "—", sub: ready ? `${fmt(concMcgMl, 0)} mcg/mL` : "" },
    {
      label: "Volume per dose",
      value: ready && Number.isFinite(volPerDoseMl) ? `${fmt(volPerDoseMl, 3)} mL` : "—",
      sub: ready && Number.isFinite(insulinUnits) ? `${fmt(insulinUnits, 1)} units on a U-100 syringe` : "",
      highlight: true,
    },
    {
      label: "Doses per vial",
      value: ready && Number.isFinite(dosesPerVial) ? `${fmt(dosesPerVial, 1)}` : "—",
      sub: ready ? `at ${fmt(d, 0)} ${doseUnit} each` : "",
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      {/* Inputs */}
      <div className="space-y-5 rounded-2xl border border-ink/10 bg-surface p-6">
        <Field label="Peptide in vial" value={vialMass} onChange={setVialMass} suffix="mg" />
        <Field label="Bacteriostatic water added" value={water} onChange={setWater} suffix="mL" />
        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Desired dose</span>
          <div className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 bg-panel/40 focus-within:border-accent/60">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={dose}
              onChange={(e) => setDose(e.target.value)}
              className="w-full bg-transparent px-3.5 py-2.5 text-[15px] text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="flex border-l border-ink/10 text-sm">
              {(["mcg", "mg"] as DoseUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setDoseUnit(u)}
                  className={`px-3 transition-colors ${
                    doseUnit === u ? "bg-accent/20 text-accent" : "text-ink/45 hover:text-ink/70"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {results.map((r) => (
          <div
            key={r.label}
            className={`rounded-2xl border p-5 ${
              r.highlight ? "border-accent/40 bg-accent/[0.07]" : "border-ink/10 bg-panel/30"
            }`}
          >
            <div className="text-xs font-medium uppercase tracking-wide text-ink/45">{r.label}</div>
            <div className={`mt-1 font-display text-2xl font-semibold ${r.highlight ? "text-accent" : "text-ink"}`}>
              {r.value}
            </div>
            {r.sub && <div className="mt-1 text-sm text-ink/55">{r.sub}</div>}
          </div>
        ))}
        <p className="px-1 pt-2 text-xs leading-5 text-ink/40">
          Concentration math only, for laboratory reconstitution. This is not
          medical or dosing advice. &ldquo;Units&rdquo; assume a standard U-100
          insulin syringe (1 mL = 100 units). Verify all figures independently.
        </p>
      </div>
    </div>
  );
}
