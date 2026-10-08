import { caseStudies } from "../../data/caseStudies";
import { navItems } from "../../data/navItems";
import { statementWords } from "../../data/statementWords";
import { AboutViewCursor } from "../cursor/AboutViewCursor";
import { DialKitRoot } from "../dev/DialKitRoot";
import { FloatingNavbar } from "../navigation/FloatingNavbar";
import { HeroCrossfadeShell } from "./HeroCrossfadeShell";
import { HeroIntro } from "./HeroIntro";
import { HomeFooter } from "./HomeFooter";
import { InstantWorkScroll } from "./InstantWorkScroll";
import { ScrollStatement } from "./ScrollStatement";
import { WorkSection } from "./WorkSection";

export function HomePage() {

  return (
    <main className="home-page">
      <InstantWorkScroll />
      <AboutViewCursor label="View case study" target="case-study" tone="media" />
      <FloatingNavbar items={navItems} lockVariant variant="dark" />

      <HeroCrossfadeShell>
        <HeroIntro />
       {/* <ScrollStatement words={statementWords} /> */}
      </HeroCrossfadeShell>

      <WorkSection caseStudies={caseStudies} />

      <DialKitRoot />

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
