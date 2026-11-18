import data from "@/lib/structures/oxytocin-signal.json";
import styles from "./sequence-signal.module.css";

const peptidePath = `M${data.peptide.map(p => `${p[0]},${p[1]}`).join("L")}`;
const sequence = data.sequence.split("");

/** One static scientific plate. Only the explicitly marked traces use PDB coordinates. */
export function SequenceSignalHero() {
  return (
    <figure className={styles.plate}>
      <div className={styles.viewport}>
      <svg className={styles.diagram} viewBox="0 0 480 600" role="img" aria-labelledby="signal-title" aria-describedby="signal-description">
        <title id="signal-title">Oxytocin: from sequence to signal</title>
        <desc id="signal-description">Read downward: the mature nine-residue oxytocin sequence CYIQNCPLG, with a Cys1–Cys6 disulfide and amidated Gly9. An enlarged receptor-bound peptide conformation leads to the oxytocin receptor across a schematic membrane. Peptide and receptor alpha-carbon traces are projected from PDB 7RYC; connecting paths are conceptual, not a folding trajectory. A schematic Gq signal continues into the cell.</desc>
        <defs>
          <radialGradient id="signal-halo"><stop stopColor="#a5adff" stopOpacity=".16"/><stop offset="1" stopColor="#a5adff" stopOpacity="0"/></radialGradient>
          <linearGradient id="signal-membrane" x2="0" y2="1"><stop stopColor="#94a9cb" stopOpacity=".02"/><stop offset=".5" stopColor="#94a9cb" stopOpacity=".12"/><stop offset="1" stopColor="#94a9cb" stopOpacity=".02"/></linearGradient>
          <marker id="signal-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L5 3L0 6" fill="none" stroke="#a5adff"/></marker>
          <pattern id="signal-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#b5c5ec" strokeOpacity=".045"/></pattern>
        </defs>
        <rect width="480" height="600" fill="url(#signal-grid)"/>
        <ellipse cx="255" cy="320" rx="220" ry="255" fill="url(#signal-halo)"/>
        <g className={styles.rule}><path d="M0 18h14M7 11v14M466 18h14M473 11v14M0 582h14M7 575v14M466 582h14M473 575v14"/></g>
        <text x="24" y="27" className={styles.label}>01 / SEQUENCE</text>
        <text x="456" y="27" textAnchor="end" className={styles.micro}>MATURE OXYTOCIN</text>
        <path d="M35 76H435" className={styles.rule}/>
        {sequence.map((aa,i)=><g key={i} transform={`translate(${35+i*50} 76)`}>
          <circle r="17" fill={i===0||i===5 ? "#303b62" : "#142037"} stroke={i===0||i===5 ? "#d3bb82" : "#717eaa"}/>
          <text textAnchor="middle" y="5" className={styles.residue}>{aa}</text>
          <text textAnchor="middle" y="-25" className={styles.micro}>{i+1}</text>
        </g>)}
        <path d="M35 95v14H285V95" fill="none" stroke="#d3bb82" strokeWidth="1"/>
        <text x="160" y="127" textAnchor="middle" className={styles.gold}>Cys1–Cys6 · S–S</text>
        <text x="435" y="113" textAnchor="middle" className={styles.micro}>–NH₂</text>
        <path d="M338 114C390 150 220 140 190 175" className={styles.flow} markerEnd="url(#signal-arrow)"/>
        <text x="24" y="165" className={styles.label}>02 / FOLD</text>
        <circle cx="154" cy="216" r="56" className={styles.orbit}/>
        <circle cx="154" cy="216" r="66" className={styles.orbit} strokeDasharray="2 7"/>
        <g transform="translate(166 218) scale(5)">
          <path d={peptidePath} fill="none" stroke="#a5adff" strokeWidth="1.5" strokeLinejoin="round"/>
          {data.peptide.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r="1.15" fill="#e3e5ff" stroke="#a5adff" strokeWidth=".4"/>)}
        </g>
        <text x="259" y="190" className={styles.note}>A ring and a tail.</text>
        <text x="259" y="211" className={styles.micro}>BOUND CONFORMATION</text>
        <text x="259" y="229" className={styles.micro}>Cα TRACE / ENLARGED</text>
        <path d="M209 241C250 260 257 276 271 294" className={styles.flow} markerEnd="url(#signal-arrow)"/>
        <g className={styles.late}>
        <text x="24" y="297" className={styles.label}>03 / BIND</text>
        <text x="456" y="279" textAnchor="end" className={styles.micro}>OUTSIDE</text>
        <rect x="12" y="330" width="456" height="98" fill="url(#signal-membrane)"/>
        {[330,428].map(y=><g key={y}>{Array.from({length:38},(_,i)=><g key={i}><circle cx={18+i*12} cy={y} r="2" fill="#8293b4" opacity=".4"/><path d={`M${16+i*12} ${y+(y===330?5:-5)}v${y===330?12:-12}m4 0v${y===330?-12:12}`} stroke="#8293b4" opacity=".2"/></g>)}</g>)}
        <g transform="translate(284 314) scale(2.25)">
          {data.receptor.map((s,i)=><g key={i}><path d={`M${s.points[0][0]} ${s.points[0][1]}L${s.points[1][0]} ${s.points[1][1]}`} fill="none" stroke="#0d1525" strokeWidth="3.2" strokeLinecap="round"/><path d={`M${s.points[0][0]} ${s.points[0][1]}L${s.points[1][0]} ${s.points[1][1]}`} fill="none" stroke="#b7c4e4" strokeOpacity={.3+i/data.receptor.length*.6} strokeWidth="2" strokeLinecap="round"/></g>)}
          <path d={peptidePath} fill="none" stroke="#0d1525" strokeWidth="4" strokeLinejoin="round"/>
          <path d={peptidePath} fill="none" stroke="#b8baff" strokeWidth="2.3" strokeLinejoin="round"/>
        </g>
        <path d="M77 366H206" className={styles.rule}/>
        <text x="24" y="348" className={styles.note}>OXTR</text>
        <text x="24" y="387" className={styles.micro}>MEMBRANE</text>
        <text x="24" y="405" className={styles.micro}>SCHEMATIC</text>
        <text x="456" y="453" textAnchor="end" className={styles.micro}>INSIDE</text>
        <path d="M281 443C282 467 251 467 251 487" className={styles.flow} markerEnd="url(#signal-arrow)"/>
        <text x="24" y="485" className={styles.label}>04 / RESPOND</text>
        <ellipse cx="252" cy="509" rx="28" ry="18" fill="#202e48" stroke="#a5adff"/>
        <text x="252" y="514" textAnchor="middle" className={styles.residue}>Gq</text>
        <path d="M252 530V547M252 547C210 547 175 557 146 568M252 547V570M252 547C295 547 328 557 357 568" className={styles.flow}/>
        {[146,252,357].map((x,i)=><g key={x}><circle cx={x} cy="572" r="4" fill="#a5adff"/><circle cx={x} cy="572" r={11+i*3} className={styles.orbit}/></g>)}
        <text x="24" y="531" className={styles.micro}>SIGNAL RELAY</text>
        <text x="24" y="549" className={styles.micro}>SCHEMATIC</text>
        </g>
      </svg>
      </div>
      <figcaption className={styles.caption}>
        <p><strong>Oxytocin, an endogenous peptide.</strong> Its mature sequence is released from a larger precursor; the Cys1–Cys6 disulfide constrains the ring and Gly9 is amidated.<a href="https://www.uniprot.org/uniprotkb/P01178/entry" aria-label="Source 1: UniProt oxytocin">[1]</a></p>
        <p className={styles.key}><span>Solid traces: deposited structure</span><span>Dashed paths: conceptual transitions</span></p>
        <p>Structural reference: <a href="https://www.rcsb.org/structure/7RYC">PDB 7RYC · cryo-EM · 2.90 Å [2]</a></p>
        <details>
          <summary>Read the plate / sources &amp; limits</summary>
          <div className={styles.notes}>
            <p>The fold inset and receptor-bound peptide show the same conformation at different scales, not a folding trajectory. The sequence is a chemical index, not a claim that free oxytocin is linear. Precursor processing is not pictured.</p>
            <p>Peptide (chain L) and receptor (chain O) Cα traces are projected from <a href="https://www.rcsb.org/structure/7RYC">PDB 7RYC [2]</a>, a 2.90 Å cryo-EM structure. Receptor traces are smoothed; gaps are not bridged. Side chains, ions, the engineered miniG complex and antibody are omitted. The inset is not a free-peptide structure. <a href="https://www.nature.com/articles/s41594-022-00728-4">Meyerowitz et al., 2022 [3]</a>.</p>
            <p>Binding transitions, membrane and downstream signal relay are schematic, not deposited coordinates or measured dynamics. Gq is a major OXTR signaling route, not its only coupling partner. <a href="https://www.nature.com/articles/s41467-022-31325-0">Waltenspühl et al., 2022 [4]</a>. This plate explains molecular recognition, not clinical benefit.</p>
          </div>
        </details>
      </figcaption>
    </figure>
  );
}
