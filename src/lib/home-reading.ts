import { INSIGHTS } from "./insights";

export const TWO_RESIDUES_COVER = "/editorial/two-residues-water-study.jpg";

// Homepage curation only: the article registry and insights index keep their order.
const HOME_READING = [
  "two-residues-apart",
  "the-fat-hormone-that-falls-as-fat-rises",
  "the-neuron-behind-the-hot-flash",
  "the-gene-the-parents-fight-over",
  "glp-1-signaling",
] as const;

export function homeReading() {
  return HOME_READING.map((slug) => {
    const article = INSIGHTS.find((post) => post.slug === slug);
    if (!article) throw new Error(`Missing homepage article: ${slug}`);
    return article;
  });
}
