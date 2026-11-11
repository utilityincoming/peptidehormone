#!/usr/bin/env node
// Build the homepage structure figure from deposited coordinates.
//
// Retatrutide has been solved by cryo-EM bound to each of its three receptors
// (PDB 8YW3 GLP-1R, 8YW4 GIPR, 8YW5 GCGR). This script downloads those entries
// from RCSB, takes the alpha-carbon trace of the receptor and of the peptide,
// puts all three in the same peptide-defined frame, projects to 2D, and writes
// src/lib/structures/retatrutide-receptors.json for the hero component.
//
// Nothing about the shape is drawn by hand: every point is a deposited atom
// position (lightly smoothed along the chain so helices read as tubes). The
// G protein and nanobody that stabilise each complex are left out, and the
// figure's caption says so.
//
//   node scripts/build-structure-figure.mjs          # fetch + write
//   node scripts/build-structure-figure.mjs --check  # fail if output would change
//   node scripts/build-structure-figure.mjs --view=120 --out=/tmp/try.json
//
// Re-run only when the view or the entry list changes; the output is committed.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const flag = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
// --out= and --view= are for trying a camera angle without touching the
// committed file.
const OUT = flag("out") ?? join(ROOT, "src/lib/structures/retatrutide-receptors.json");

// Display names are ours; everything else is read from the entry.
const ENTRIES = [
  { id: "8YW3", receptor: "GLP-1 receptor", short: "GLP-1R" },
  { id: "8YW4", receptor: "GIP receptor", short: "GIPR" },
  { id: "8YW5", receptor: "Glucagon receptor", short: "GCGR" },
];

// View: degrees of rotation about the peptide's long axis, shared by all three
// panels so they are directly comparable.
const VIEW_DEG = Number(flag("view") ?? 215);
const SCALE = 3.2; // SVG units per ångström
const SMOOTH = 2; // ± residues averaged along the chain
const DEPTH_BINS = 8;
const BREAK = 4.3; // Å; a longer Cα–Cα step is a gap in the model

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a) => mul(a, 1 / Math.hypot(...a));
const centroid = (pts) => mul(pts.reduce(add, [0, 0, 0]), 1 / pts.length);

async function getText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

/** Split one mmCIF row, honouring quoted values. */
function tokens(line) {
  return line.match(/'[^']*'|"[^"]*"|\S+/g) ?? [];
}

/** Read a simple (single-line-row) mmCIF loop into objects. */
function loop(lines, prefix) {
  const start = lines.findIndex((l) => l.startsWith(prefix + "."));
  if (start < 0) return [];
  let k = start;
  const cols = [];
  while (lines[k].startsWith(prefix + ".")) cols.push(lines[k++].trim().slice(prefix.length + 1));
  const rows = [];
  for (; k < lines.length && !lines[k].startsWith("#"); k++) {
    const t = tokens(lines[k]);
    if (t.length !== cols.length) continue; // wrapped row — not needed here
    rows.push(Object.fromEntries(cols.map((c, i) => [c, t[i].replace(/^['"]|['"]$/g, "")])));
  }
  return rows;
}

function chains(cif) {
  const lines = cif.split("\n");
  const entities = loop(lines, "_entity");
  const find = (re) => entities.find((e) => re.test(e.pdbx_description))?.id;
  const receptorId = find(/receptor/i);
  const peptideId = find(/retatrutide/i);
  if (!receptorId || !peptideId) throw new Error("receptor or peptide entity not found");

  const ca = { receptor: [], peptide: [] };
  for (const a of loop(lines, "_atom_site")) {
    if (a.label_atom_id !== "CA" || a.pdbx_PDB_model_num !== "1") continue;
    if (a.label_alt_id !== "." && a.label_alt_id !== "A") continue;
    const which =
      a.label_entity_id === receptorId ? "receptor" : a.label_entity_id === peptideId ? "peptide" : null;
    if (!which) continue;
    ca[which].push({
      seq: Number(a.auth_seq_id),
      comp: a.label_comp_id,
      p: [Number(a.Cartn_x), Number(a.Cartn_y), Number(a.Cartn_z)],
    });
  }
  return ca;
}

/** Split a chain where the model has a gap. */
function segments(atoms) {
  const out = [];
  let cur = [];
  for (const a of atoms) {
    if (cur.length && Math.hypot(...sub(a.p, cur[cur.length - 1].p)) > BREAK) {
      out.push(cur);
      cur = [];
    }
    cur.push(a);
  }
  if (cur.length) out.push(cur);
  return out;
}

function smooth(pts) {
  return pts.map((_, i) => {
    const lo = Math.max(0, i - SMOOTH);
    const hi = Math.min(pts.length - 1, i + SMOOTH);
    return centroid(pts.slice(lo, hi + 1));
  });
}

function project(entry, ca) {
  // Frame from the peptide alone: up = N-terminus → C-terminus along its helix
  // (the N-terminus sits deep in the receptor core, the C-terminus points out
  // of the cell), and the receptor's bulk fixes the rotation about that axis.
  const pep = ca.peptide.map((a) => a.p);
  const origin = centroid(pep);
  const up = norm(sub(centroid(pep.slice(17, 27)), centroid(pep.slice(0, 10))));
  const bulk = sub(centroid(ca.receptor.map((a) => a.p)), origin);
  const u0 = norm(sub(bulk, mul(up, dot(bulk, up))));
  const w0 = cross(up, u0);
  const t = (VIEW_DEG * Math.PI) / 180;
  const right = add(mul(u0, Math.cos(t)), mul(w0, Math.sin(t)));
  const toward = cross(right, up);
  const to2d = (p) => {
    const d = sub(p, origin);
    return { x: dot(d, right) * SCALE, y: -dot(d, up) * SCALE, z: dot(d, toward) };
  };

  const recSegs = segments(ca.receptor).map((s) => smooth(s.map((a) => a.p)).map(to2d));
  const pepPts = smooth(pep).map(to2d);
  return { entry, recSegs, pepPts, modelled: ca.peptide.length, receptorResidues: ca.receptor.length };
}

async function citation(id) {
  const e = JSON.parse(await getText(`https://data.rcsb.org/rest/v1/core/entry/${id}`));
  const c = (e.citation ?? []).find((x) => x.id === "primary") ?? {};
  return {
    title: e.struct?.title,
    method: e.exptl?.[0]?.method,
    resolution: e.rcsb_entry_info?.resolution_combined?.[0],
    released: e.rcsb_accession_info?.initial_release_date?.slice(0, 10),
    paper: c.title,
    journal: c.rcsb_journal_abbrev ?? c.journal_abbrev,
    year: c.year,
    doi: c.pdbx_database_id_DOI,
    pmid: c.pdbx_database_id_PubMed,
  };
}

async function main() {
  const check = process.argv.includes("--check");
  const projected = [];
  let sequence;
  for (const entry of ENTRIES) {
    const ca = chains(await getText(`https://files.rcsb.org/download/${entry.id}.cif`));
    if (!sequence || ca.peptide.length > sequence.length) {
      sequence = ca.peptide.map((a) => a.comp);
    }
    projected.push({ ...project(entry, ca), meta: await citation(entry.id) });
  }

  // One shared box so the three panels are drawn at the same scale and height.
  const all = projected.flatMap((p) => [...p.recSegs.flat(), ...p.pepPts]);
  const pad = 14;
  const minX = Math.min(...all.map((p) => p.x)) - pad;
  const maxX = Math.max(...all.map((p) => p.x)) + pad;
  const minY = Math.min(...all.map((p) => p.y)) - pad;
  const maxY = Math.max(...all.map((p) => p.y)) + pad;
  const zs = all.map((p) => p.z);
  const zMin = Math.min(...zs);
  const zSpan = Math.max(...zs) - zMin || 1;
  const X = (p) => Math.round(p.x - minX);
  const Y = (p) => Math.round(p.y - minY);

  const structures = projected.map(({ entry, recSegs, pepPts, modelled, receptorResidues, meta }) => {
    // Receptor: one path per depth bin, far → near, so nearer strands overdraw.
    // Consecutive steps in the same bin are joined into one polyline so the
    // strand has clean joins instead of a seam at every residue.
    const bins = Array.from({ length: DEPTH_BINS }, () => []);
    for (const seg of recSegs) {
      let last = -1;
      for (let i = 1; i < seg.length; i++) {
        const z = (seg[i - 1].z + seg[i].z) / 2;
        const b = Math.min(DEPTH_BINS - 1, Math.floor(((z - zMin) / zSpan) * DEPTH_BINS));
        if (b !== last) bins[b].push(`M${X(seg[i - 1])} ${Y(seg[i - 1])}`);
        bins[b].push(`L${X(seg[i])} ${Y(seg[i])}`);
        last = b;
      }
    }
    return {
      id: entry.id,
      receptor: entry.receptor,
      short: entry.short,
      ...meta,
      receptorResidues,
      peptideResiduesModelled: modelled,
      receptorPaths: bins.map((b) => b.join("")),
      peptide: pepPts.map((p) => [X(p), Y(p)]),
    };
  });

  const out = {
    generatedBy: "scripts/build-structure-figure.mjs",
    source: "RCSB Protein Data Bank (rcsb.org), alpha-carbon coordinates",
    view: { rotationDeg: VIEW_DEG, unitsPerAngstrom: SCALE, smoothingResidues: SMOOTH },
    width: Math.round(maxX - minX),
    height: Math.round(maxY - minY),
    // Residue names as deposited (three-letter / PDB component ids).
    peptideSequence: sequence,
    structures,
  };
  const json = JSON.stringify(out, null, 1) + "\n";

  if (check) {
    const cur = await readFile(OUT, "utf8").catch(() => "");
    if (cur !== json) {
      console.error("structure figure is out of date — run scripts/build-structure-figure.mjs");
      process.exit(1);
    }
    console.log("structure figure is up to date");
    return;
  }
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, json);
  for (const s of structures) {
    console.log(
      `${s.id} ${s.short}: ${s.receptorResidues} receptor Cα, ${s.peptideResiduesModelled} peptide Cα, ${s.resolution} Å`,
    );
  }
  console.log(`wrote ${OUT} (${(json.length / 1024).toFixed(1)} kB, ${out.width}×${out.height})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
