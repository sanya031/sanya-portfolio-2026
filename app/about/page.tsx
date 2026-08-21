import type { Metadata } from "next";
import { AboutGridHero } from "../../components/about/AboutGridHero";

export const metadata: Metadata = {
  title: "About Sanya Malhotra | Product Designer",
  description:
    "Learn more about Sanya Malhotra, a product designer focused on thoughtful interfaces, visual craft, systems, and complex product experiences.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Sanya Malhotra",
    description:
      "A closer look at Sanya's design practice, interests, creative process, and approach to product design.",
    url: "/about",
    images: [
      {
        url: "/assets/bachground painting 1.webp",
        width: 1200,
        height: 630,
        alt: "About Sanya Malhotra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sanya Malhotra",
    description:
      "A closer look at Sanya's design practice, interests, creative process, and approach to product design.",
    images: ["/assets/bachground painting 1.webp"],
  },
};

export default function AboutPage() {
  return <AboutGridHero />;
}
