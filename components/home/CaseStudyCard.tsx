import type { CaseStudy } from "../../data/caseStudies";

export type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const frameCorners = ["top-left", "top-right", "bottom-left", "bottom-right"];
  const frameEdges = ["top", "right", "bottom", "left"];

  return (
    <article className="case-study-card" data-cursor="case-study">
      <a className="case-study-card__link" href={caseStudy.href}>
        <div className="case-study-card__media-frame">
          {frameEdges.map((edge) => (
            <img
              className="case-study-card__frame-stroke"
              data-edge={edge}
              src={
                edge === "top" || edge === "bottom"
                  ? "/assets/stroke-horizontal-case-study.svg"
                  : "/assets/stroke-vertical-case-study.svg"
              }
              alt=""
              aria-hidden="true"
              key={edge}
            />
          ))}
          {frameCorners.map((corner) => (
            <img
              className="case-study-card__frame-plus"
              data-corner={corner}
              src="/assets/plus_case-study.svg"
              alt=""
              aria-hidden="true"
              key={corner}
            />
          ))}

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
