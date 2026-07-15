import type { CaseStudyAsset } from "../../data/caseStudyPages";

export type CaseStudyMediaProps = {
  asset: CaseStudyAsset;
  className?: string;
};

export function CaseStudyMedia({ asset, className = "" }: CaseStudyMediaProps) {
  const mediaClassName = ["case-study-page__media", className].filter(Boolean).join(" ");

  return (
    <figure
      className={mediaClassName}
      data-frame={asset.frame}
      data-scrollable={asset.scrollable}
    >
      <div className="case-study-page__media-surface">
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
      </div>
      {asset.caption ? (
        <figcaption className="case-study-page__caption">{asset.caption}</figcaption>
      ) : null}
    </figure>
  );
}
