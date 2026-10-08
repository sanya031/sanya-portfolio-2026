import type { CaseStudy } from "../../data/caseStudies";
import { CaseStudyCard } from "./CaseStudyCard";

export type WorkSectionProps = {
  caseStudies: CaseStudy[];
};

export function WorkSection({ caseStudies }: WorkSectionProps) {
  return (
    <section id="work" className="work-section" data-nav-theme="dark">
      <div className="work-section__inner">
          <h2 className="work-section__heading">
            <img
              className="work-section__heading-image"
              src="/assets/selected%20work.png"
              alt="Selected work"
            />
          </h2>

          <div className="work-section__grid">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard caseStudy={caseStudy} key={caseStudy.id} />
            ))}
          </div>
      </div>
    </section>
  );
}
