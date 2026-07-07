export type StatementWord = {
  id: string;
  text: string;
  title: string;
  caption: string;
  motifSrc: string;
  image: {
    src: string;
    alt: string;
  };
};

export const statementWords: StatementWord[] = [
  {
    id: "ambiguity",
    text: "ambiguity",
    title: "Working Through Ambiguity",
    caption: "Understanding where users lost context across the product.",
    motifSrc: "/assets/ambiguity_motif.svg",
    image: {
      src: "/assets/ambiguity_hover.png",
      alt: "Placeholder preview for ambiguity",
    },
  },
  {
    id: "simplifying-systems",
    text: "simplifying systems",
    title: "Simplifying Systems",
    caption: "Reducing friction while preserving system flexibility.",
    motifSrc: "/assets/simplifying-system_motif.svg",
    image: {
      src: "/assets/simplify-systems_hover.png",
      alt: "Placeholder preview for simplifying systems",
    },
  },
  {
    id: "refining",
    text: "refining",
    title: "Refining Interfaces",
    caption: "Iterating through usability feedback and visual refinement.",
    motifSrc: "/assets/refine_motif.svg",
    image: {
      src: "/assets/refining_hover.png",
      alt: "Placeholder preview for refining",
    },
  },
];
