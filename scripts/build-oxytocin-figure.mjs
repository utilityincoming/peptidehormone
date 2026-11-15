// Reproducible orthographic C-alpha projection; no invented atom positions.
// node scripts/build-oxytocin-figure.mjs [--check]
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
const source = "https://files.rcsb.org/download/7RYC.pdb";
const response = await fetch(source);
if (!response.ok) throw new Error(`PDB download: ${response.status}`);
const raw = await response.text();
const atoms = raw.split(/\r?\n/).filter(l => l.startsWith("ATOM  ") && l.slice(12,16).trim() === "CA").map(l => ({chain:l[21], residue:Number(l.slice(22,26)), name:l.slice(17,20), p:[30,38,46].map(i=>Number(l.slice(i,i+8)))}));
const rec = atoms.filter(a=>a.chain === "O");
const pep = atoms.filter(a=>a.chain === "L");
const aa = {CYS:"C",TYR:"Y",ILE:"I",GLN:"Q",ASN:"N",PRO:"P",LEU:"L",GLY:"G"};
const sequence = pep.map(a=>aa[a.name]).join("");
if(sequence !== "CYIQNCPLG" || rec.length !== 285) throw new Error("Unexpected deposited chains");
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const norm=a=>a.map(v=>v/Math.hypot(...a));
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const mean=arr=>[0,1,2].map(i=>arr.reduce((s,p)=>s+p[i],0)/arr.length);
const origin=mean(pep.map(a=>a.p));
const up=norm(sub(origin,mean(rec.map(a=>a.p))));
const right=norm(cross(up,[0,0,1]));
const depth=cross(right,up);
const project=p=>{const d=sub(p,origin);return [dot(d,right),-dot(d,up),dot(d,depth)].map(v=>+v.toFixed(3));};
// Split at absent residues: do not bridge missing backbone coordinates.
const segments=[];let segment=[];
for (const a of rec) {if(segment.length && Math.hypot(...sub(a.p,segment.at(-1).p))>4.3){segments.push(segment);segment=[];}segment.push(a);}if(segment.length)segments.push(segment);
// Smooth only receptor trace (five-residue moving average), never the ligand.
const receptor=segments.flatMap(seg=>seg.slice(1).map((a,i)=>{
 const smoothed=j=>mean(seg.slice(Math.max(0,j-2),Math.min(seg.length,j+3)).map(a=>a.p));
 const p=project(smoothed(i)),q=project(smoothed(i+1));return {points:[p,q],depth:(p[2]+q[2])/2};
})).sort((a,b)=>a.depth-b.depth);
const data={pdb:"7RYC",source,sourceSha256:createHash("sha256").update(raw).digest("hex"),sequence,disulfide:[1,6],receptorChain:"O",peptideChain:"L",receptorResidues:rec.length,peptide:pep.map(a=>project(a.p)),receptor,method:"Orthographic C-alpha projection; receptor smoothed +/-2 residues within continuous segments; ligand unsmoothed. G protein, antibody, ions and side chains omitted."};
const output=JSON.stringify(data)+"\n";
const path=new URL("../src/lib/structures/oxytocin-signal.json",import.meta.url);
if(process.argv.includes("--check")){if(await readFile(path,"utf8")!==output)throw new Error("Projection differs");console.log("7RYC projection verified");}
else{await writeFile(path,output);console.log(`Wrote ${pep.length} ligand residues / ${rec.length} receptor residues from ${source}`);}
