import Link from "next/link";
import type { CaseStudy } from "../../data/caseStudies";
import { PlaybackVideo } from "../case-study/PlaybackVideo";
import { SharedMediaSurface } from "../transitions/SharedMediaSurface";
import { BdpCardAnimation } from "./BdpCardAnimation";
import { TranscriptCardAnimation } from "./TranscriptCardAnimation";

export type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const mediaLayoutId = caseStudy.media.src ? `case-study-media-${caseStudy.id}` : undefined;

  return (
    <article
      className="case-study-card"
      data-case-study-id={caseStudy.id}
    >
      <Link
        aria-label={`View ${caseStudy.title} case study`}
        className="case-study-card__link"
        href={caseStudy.href}
      >
        <div
          className="case-study-card__media-frame"
          data-cursor="case-study"
          data-media-type={caseStudy.media.type}
        >
          <SharedMediaSurface
            className="case-study-card__media"
            layoutId={mediaLayoutId}
            data-media-type={caseStudy.media.type}
          >
            {caseStudy.media.type === "bdp-animation" ? (
              <BdpCardAnimation ariaLabel={caseStudy.media.alt} />
            ) : caseStudy.media.type === "transcript-animation" ? (
              <TranscriptCardAnimation ariaLabel={caseStudy.media.alt} />
            ) : caseStudy.media.type === "video" && caseStudy.media.src ? (
              <PlaybackVideo
                ariaLabel={caseStudy.media.alt}
                className="case-study-card__video"
                playbackRate={0.7}
                poster={caseStudy.media.poster}
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

        {caseStudy.summary || caseStudy.labels ? (
          <div className="case-study-card__body case-study-card__body--detailed">
            <div className="case-study-card__headline">
              <p className="case-study-card__org">{caseStudy.subtitle}</p>
              <h3 className="case-study-card__heading">{caseStudy.title}</h3>
              {caseStudy.summary ? (
                <p className="case-study-card__summary">{caseStudy.summary}</p>
              ) : null}
            </div>

            {caseStudy.labels?.length ? (
              <ul className="case-study-card__labels" aria-label="Disciplines">
                {caseStudy.labels.map((label) => (
                  <li className="case-study-card__label" key={label}>
                    {label}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <div className="case-study-card__body">
            <div className="case-study-card__primary-meta">
              <p className="case-study-card__role">{caseStudy.role}</p>
              <span className="case-study-card__meta-separator" aria-hidden="true" />
              <p className="case-study-card__year">{caseStudy.year}</p>
              <span className="case-study-card__meta-separator" aria-hidden="true" />
              <p className="case-study-card__status">{caseStudy.tags.join(", ")}</p>
            </div>

            <div className="case-study-card__copy">
              <h3 className="case-study-card__title">{caseStudy.title}</h3>
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}
