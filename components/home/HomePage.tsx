import { caseStudies } from "../../data/caseStudies";
import { navItems } from "../../data/navItems";
import { statementWords } from "../../data/statementWords";
import { AboutViewCursor } from "../cursor/AboutViewCursor";
import { DialKitRoot } from "../dev/DialKitRoot";
import { FloatingNavbar } from "../navigation/FloatingNavbar";
import { HeroCrossfadeShell } from "./HeroCrossfadeShell";
import { HeroIntro } from "./HeroIntro";
import { SiteFooter } from "../footer/SiteFooter";
import { InstantWorkScroll } from "./InstantWorkScroll";
import { ScrollStatement } from "./ScrollStatement";
import { WorkSection } from "./WorkSection";

export function HomePage() {

  return (
    <main className="home-page">
      <InstantWorkScroll />
      <AboutViewCursor label="View case study" target="case-study" tone="media" />
      <FloatingNavbar items={navItems} lockVariant variant="dark" />

      {/* The page content scrolls up like a sheet to uncover the footer pinned beneath it. */}
      <div className="page-sheet">
        <HeroCrossfadeShell>
          <HeroIntro />
         {/* <ScrollStatement words={statementWords} /> */}
        </HeroCrossfadeShell>

        <WorkSection caseStudies={caseStudies} />
      </div>
      <div className="page-sheet__shadow" aria-hidden="true" />

      <DialKitRoot />

      <SiteFooter />
    </main>
  );
}
