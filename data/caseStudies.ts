export type CaseStudyMediaType = "image" | "gif" | "video";

export type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  summary?: string;
  labels?: string[];
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
    id: "bitcoin-dev-project-redesign",
    title: "Increasing visits by 19% by redesigning how developers discover Bitcoin resources",
    subtitle: "Bitcoin Dev Project",
    description:
      "A visual system and site direction for making an open-source developer community feel more legible, credible, and alive.",
    role: "Bitcoin Dev Project",
    year: "DEC 2025",
    tags: ["SHIPPED"],
    summary:
      "Simplified how developers navigate resources and opportunities, from information architecture to visual identity.",
    labels: [
      "Usability Testing",
      "IA",
      "Product Design",
      "Visual Identity",
      "Illustration",
      "Open Source Collaboration",
    ],
    href: "/work/bitcoin-dev-project-redesign",
    media: {
      type: "video",
      src: "/assets/case-study-2/hero-media.mp4",
      alt: "Preview of the Bitcoin Dev Project case study",
    },
  },
  {
    id: "transcript-review-redesign",
    title: "Redesigning a fragmented contributor workflow from discovery to reward.",
    subtitle: "Bitcoin Transcript Review",
    description:
      "A reusable placeholder for adding the next project preview, metadata, and case-study route.",
    role: "Bitcoin Transcript Review",
    year: "Jun 2026",
    tags: ["HANDED-OFF"],
    href: "/work/transcript-review-redesign",
    media: {
      type: "video",
      src: "/assets/case-study-1/hero-scene-1.mp4",
      alt: "Preview of the Bitcoin Transcript Review case study",
    },
  },
];
