import Link from "next/link";
import type { CaseStudy } from "../../data/caseStudies";
import { SharedMediaSurface } from "../transitions/SharedMediaSurface";

export type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const frameCorners = ["top-left", "top-right", "bottom-left", "bottom-right"];
  const frameEdges = ["top", "right", "bottom", "left"];
  const mediaLayoutId = caseStudy.media.src ? `case-study-media-${caseStudy.id}` : undefined;

  return (
    <article className="case-study-card" data-cursor="case-study">
      <Link
        aria-label={`View ${caseStudy.title} case study`}
        className="case-study-card__link"
        href={caseStudy.href}
        scroll={false}
      >
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

          <SharedMediaSurface className="case-study-card__media" layoutId={mediaLayoutId}>
            {caseStudy.media.type === "video" && caseStudy.media.src ? (
              <video
                autoPlay
                className="case-study-card__video"
                loop
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
          </SharedMediaSurface>
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
      </Link>
    </article>
  );
}
