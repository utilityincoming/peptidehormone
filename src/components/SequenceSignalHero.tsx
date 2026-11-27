import data from "@/lib/structures/oxytocin-signal.json";
import styles from "./sequence-signal.module.css";

const peptidePath = `M${data.peptide.map(([x, y]) => `${x},${y}`).join("L")}`;
const sequence = data.sequence.split("");

export function SequenceSignalHero() {
  return (
    <figure className={styles.plate}>
      <div className={styles.sequence}>
        <p className={styles.label}>Mature oxytocin</p>
        <ol className={styles.residues} aria-label="Oxytocin amino acid sequence">
          {sequence.map((residue, index) => (
            <li key={index} className={data.disulfide.includes(index + 1) ? styles.cysteine : undefined}>
              {residue}
            </li>
          ))}
        </ol>
        <p className={styles.chemistry}>Cys1–Cys6 disulfide <span>Gly9–NH₂</span></p>
      </div>

      <OxytocinSignalDiagram id="oxytocin-plate" />

      <figcaption className={styles.caption}>
        <p>Backbone traces from <a href="https://www.rcsb.org/structure/7RYC">PDB 7RYC</a>. Membrane and signaling are schematic.</p>
        <details>
          <summary>Sources and how to read the plate</summary>
          <div className={styles.notes}>
            <p>Mature oxytocin is released from a larger precursor. Its Cys1–Cys6 disulfide constrains the ring, and Gly9 is amidated. <a href="https://www.uniprot.org/uniprotkb/P01178/entry">UniProt P01178 [1]</a>.</p>
            <p>The fold inset and receptor-bound peptide show the same conformation at different scales, not a folding trajectory. The sequence is a chemical index, not a claim that free oxytocin is linear. Precursor processing is not pictured.</p>
            <p>Peptide (chain L) and receptor (chain O) Cα traces are projected from <a href="https://www.rcsb.org/structure/7RYC">PDB 7RYC [2]</a>, a 2.90 Å cryo-EM structure. Receptor traces are smoothed; gaps are not bridged. Side chains, ions, the engineered miniG complex and antibody are omitted. The inset is not a free-peptide structure. <a href="https://www.nature.com/articles/s41594-022-00728-4">Meyerowitz et al., 2022 [3]</a>.</p>
            <p>Binding transitions, membrane and downstream signal relay are schematic, not deposited coordinates or measured dynamics. Gq is a major OXTR signaling route, not its only coupling partner. <a href="https://www.nature.com/articles/s41467-022-31325-0">Waltenspühl et al., 2022 [4]</a>. This plate explains molecular recognition, not clinical benefit.</p>
          </div>
        </details>
      </figcaption>
    </figure>
  );
}

export function OxytocinSignalDiagram({ id }: { id: string }) {
  return (
    <svg className={styles.diagram} viewBox="0 0 480 176" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Oxytocin fold and receptor binding</title>
      <desc id={`${id}-description`}>
        The left panel enlarges the receptor-bound oxytocin fold. The right panel
        shows the same peptide bound to OXTR across a schematic membrane, with
        Gq signaling indicated below. The traces use PDB 7RYC coordinates.
      </desc>

      <rect width="480" height="176" rx="8" fill="#e8ece5" />
      <path d="M218 14v148" stroke="#b5c0b9" />
      <text x="16" y="26" className={styles.svgLabel}>Bound fold</text>
      <g transform="translate(112 96) scale(6)">
        <path d={peptidePath} fill="none" stroke="#34566a" strokeWidth="1.3" strokeLinejoin="round" />
        {data.peptide.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r="1.05" fill="#f8fafc" stroke="#34566a" strokeWidth=".45" />
        ))}
      </g>
      <text x="16" y="156" className={styles.svgNote}>Enlarged trace</text>

      <text x="235" y="26" className={styles.svgLabel}>Receptor binding</text>
      <rect x="235" y="63" width="229" height="57" rx="4" fill="#d9e2da" />
      <path d="M235 63h229m-229 57h229" stroke="#81968a" strokeDasharray="2 4" />
      <text x="247" y="96" className={styles.svgNote}>Membrane</text>
      <g transform="translate(376 61) scale(1.44)">
        {data.receptor.map(({ points: [[x1, y1], [x2, y2]] }, index) => (
          <line key={index} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#657981" strokeOpacity={.35 + index / data.receptor.length * .6}
            strokeWidth="2" strokeLinecap="round" />
        ))}
        <path d={peptidePath} fill="none" stroke="#34566a" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <text x="420" y="95" className={styles.svgLabel}>OXTR</text>
      <path d="M374 133v12m-4-4 4 4 4-4" fill="none" stroke="#34566a" strokeWidth="1.5" />
      <text x="387" y="155" className={styles.svgNote}>Gq signal</text>
    </svg>
  );
}
