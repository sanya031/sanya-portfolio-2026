import type { Metadata } from "next";
import { AboutGridHero } from "../../components/about/AboutGridHero";

export const metadata: Metadata = {
  title: "About | Sanya Malhotra",
  description: "About Sanya Malhotra, Product Designer.",
};

export default function AboutPage() {
  return <AboutGridHero />;
}
