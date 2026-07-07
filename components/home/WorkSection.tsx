import type { CaseStudy } from "../../data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";

export type WorkSectionProps = {
  caseStudies: CaseStudy[];
};

export function WorkSection({ caseStudies }: WorkSectionProps) {
  return (
    <section id="work" className="work-section" data-nav-theme="light">
      <div className="work-section__tear work-section__tear--top" aria-hidden="true" />

      <div className="work-section__paper">
        <div className="work-section__inner">
          <div className="work-section__grid">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard caseStudy={caseStudy} key={caseStudy.id} />
            ))}
          </div>
        </div>
      </div>

      <div className="work-section__tear work-section__tear--bottom" aria-hidden="true" />
    </section>
  );
}
