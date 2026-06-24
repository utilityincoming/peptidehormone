"use client";

import { useState } from "react";

function Field({
  label,
  value,
  onChange,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">{label}</span>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-ink/15 bg-panel/40 focus-within:border-accent/60">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="flex items-center border-l border-ink/10 px-3 text-sm text-ink/45">{suffix}</span>
        )}
      </div>
    </label>
  );
}

function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : NaN;
}

function fmt(n: number, digits = 3): string {
  if (!Number.isFinite(n)) return "—";
  if (n !== 0 && (Math.abs(n) < 0.001 || Math.abs(n) >= 1e6)) return n.toExponential(2);
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export default function MolarityCalculator() {
  const [mass, setMass] = useState("1"); // mg
  const [mw, setMw] = useState("3357.9"); // g/mol (Da) — default ≈ GLP-1(7-37)
  const [volume, setVolume] = useState("1"); // mL

  const m = num(mass);
  const w = num(mw);
  const v = num(volume);

  const moles = m / 1000 / w; // mol
  const molarityM = moles / (v / 1000); // M
  const ready = Number.isFinite(molarityM);

  const concMgMl = m / v;

  const rows = [
    { label: "Millimolar", value: ready ? `${fmt(molarityM * 1e3)} mM` : "—", highlight: true },
    { label: "Micromolar", value: ready ? `${fmt(molarityM * 1e6)} µM` : "—" },
    { label: "Nanomolar", value: ready ? `${fmt(molarityM * 1e9)} nM` : "—" },
    { label: "Mass concentration", value: ready ? `${fmt(concMgMl)} mg/mL` : "—" },
    { label: "Moles of peptide", value: ready ? `${fmt(moles * 1e9)} nmol` : "—" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-5 rounded-2xl border border-ink/10 bg-surface p-6">
        <Field label="Mass of peptide" value={mass} onChange={setMass} suffix="mg" />
        <Field
          label="Molecular weight"
          value={mw}
          onChange={setMw}
          suffix="g/mol (Da)"
          placeholder="e.g. 3357.9"
        />
        <Field label="Volume of solvent" value={volume} onChange={setVolume} suffix="mL" />
        <p className="text-xs leading-5 text-ink/40">
          Molecular weight is the peptide&rsquo;s molar mass in daltons — find it
          on the certificate of analysis or via the research agent (PubChem /
          UniProt).
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-baseline justify-between rounded-2xl border p-5 ${
              r.highlight ? "border-accent/40 bg-accent/[0.07]" : "border-ink/10 bg-panel/30"
            }`}
          >
            <span className="text-xs font-medium uppercase tracking-wide text-ink/45">{r.label}</span>
            <span className={`font-display text-xl font-semibold ${r.highlight ? "text-accent" : "text-ink"}`}>
              {r.value}
            </span>
          </div>
        ))}
        <p className="px-1 pt-2 text-xs leading-5 text-ink/40">
          For laboratory concentration math. Not medical or dosing advice. Verify
          molecular weight and all figures against the certificate of analysis.
        </p>
      </div>
    </div>
  );
}
