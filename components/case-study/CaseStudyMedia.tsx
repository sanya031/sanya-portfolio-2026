import type { CaseStudyAsset } from "../../data/caseStudyPages";
import { SharedMediaSurface } from "../transitions/SharedMediaSurface";

export type CaseStudyMediaProps = {
  asset: CaseStudyAsset;
  className?: string;
  layoutId?: string;
};

export function CaseStudyMedia({ asset, className = "", layoutId }: CaseStudyMediaProps) {
  const mediaClassName = ["case-study-page__media", className].filter(Boolean).join(" ");

  return (
    <figure
      className={mediaClassName}
      data-frame={asset.frame}
      data-scrollable={asset.scrollable}
    >
      <SharedMediaSurface className="case-study-page__media-surface" layoutId={layoutId}>
        {asset.overlayLabel ? (
          <span className="case-study-page__media-overlay-label">{asset.overlayLabel}</span>
        ) : null}
        {asset.type === "video" ? (
          <video
            autoPlay
            className="case-study-page__media-asset"
            loop
            muted
            playsInline
            preload="metadata"
            src={asset.src}
          />
        ) : (
          <img className="case-study-page__media-asset" src={asset.src} alt={asset.alt} />
        )}
      </SharedMediaSurface>
      {asset.caption ? (
        <figcaption className="case-study-page__caption">{asset.caption}</figcaption>
      ) : null}
    </figure>
  );
}
