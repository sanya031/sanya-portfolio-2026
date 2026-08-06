import { caseStudies } from "../../data/caseStudies";
import { navItems } from "../../data/navItems";
import { statementWords } from "../../data/statementWords";
import { CaseStudyCursor } from "../cursor/CaseStudyCursor";
import { FloatingNavbar } from "../navigation/FloatingNavbar";
import { HeroCrossfadeShell } from "./HeroCrossfadeShell";
import { HeroIntro } from "./HeroIntro";
import { HomeFooter } from "./HomeFooter";
import { InstantWorkScroll } from "./InstantWorkScroll";
import { ScrollStatement } from "./ScrollStatement";
import { WorkSection } from "./WorkSection";

export type HomePageProps = {
  heroImageSrc?: string;
};

export function HomePage({
  heroImageSrc = "/assets/bachground painting 1.png",
}: HomePageProps) {
  const heroBackgroundImage = `url("${heroImageSrc}")`;

  return (
    <main className="home-page">
      <InstantWorkScroll />
      <CaseStudyCursor />
      <FloatingNavbar items={navItems} variant="dark" />

      <HeroCrossfadeShell backgroundImage={heroBackgroundImage}>
        <HeroIntro />
        <ScrollStatement words={statementWords} />
      </HeroCrossfadeShell>

      <WorkSection caseStudies={caseStudies} />

      <HomeFooter
        stamp={{
          image: "/assets/footer_motif.svg",
          label: "Toronto",
          location: "Available for thoughtful product work",
          link: "mailto:hello@example.com",
        }}
      />
    </main>
  );
}
