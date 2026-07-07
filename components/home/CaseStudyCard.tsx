import type { CaseStudy } from "../../data/caseStudies";

export type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="case-study-card" data-cursor="case-study">
      <a className="case-study-card__link" href={caseStudy.href}>
        <div className="case-study-card__media">
          {caseStudy.media.type === "video" && caseStudy.media.src ? (
            <video
              className="case-study-card__video"
              muted
              playsInline
              poster={caseStudy.media.poster}
              preload="metadata"
              src={caseStudy.media.src}
            />
          ) : caseStudy.media.src ? (
            <img
              className="case-study-card__image"
              src={caseStudy.media.src}
              alt={caseStudy.media.alt}
            />
          ) : (
            <div
              className="case-study-card__placeholder"
              role="img"
              aria-label={caseStudy.media.alt}
            />
          )}
        </div>

        <div className="case-study-card__body">
          <div className="case-study-card__primary-meta">
            <p className="case-study-card__role">{caseStudy.role}</p>
            <span aria-hidden="true">*</span>
            <p className="case-study-card__year">{caseStudy.year}</p>
            <span aria-hidden="true">*</span>
            <p className="case-study-card__status">{caseStudy.tags.join(", ")}</p>
          </div>

          <div className="case-study-card__copy">
            <h3 className="case-study-card__title">{caseStudy.title}</h3>
          </div>
        </div>
      </a>
    </article>
  );
}
