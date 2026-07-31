export type CaseStudyMediaType = "image" | "gif" | "video";

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  href: string;
  media: {
    type: CaseStudyMediaType;
    src?: string;
    alt: string;
    poster?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "case-study-template",
    title: "Redesigning how contributors discover, claim, and complete transcript reviews",
    subtitle: "Bitcoin Transcript Review",
    description:
      "A reusable placeholder for adding the next project preview, metadata, and case-study route.",
    role: "Bitcoin Transcript Review",
    year: "Jun 2026",
    tags: ["HANDED-OFF"],
    href: "/work/case-study-template",
    media: {
      type: "video",
      src: "/assets/case-study-1/hero-vid-purple.mov",
      alt: "Preview of the Bitcoin Transcript Review case study",
    },
  },
  {
    id: "bitcoin-dev-project",
    title: "Designing a cohesive brand and website for an open-source Bitcoin developer community",
    subtitle: "Bitcoin Dev Project",
    description:
      "A visual system and site direction for making an open-source developer community feel more legible, credible, and alive.",
    role: "Bitcoin Dev Project",
    year: "DEC 2025",
    tags: ["SHIPPED"],
    href: "/work/bitcoin-dev-project",
    media: {
      type: "video",
      src: "/assets/case-study-2/hero-media.mp4",
      alt: "Preview of the Bitcoin Dev Project case study",
    },
  },
];
