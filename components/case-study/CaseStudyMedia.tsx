import type { CaseStudyAsset } from "../../data/caseStudyPages";
import { SharedMediaSurface } from "../transitions/SharedMediaSurface";

export type CaseStudyMediaProps = {
  asset: CaseStudyAsset;
  className?: string;
  layoutId?: string;
};

export function CaseStudyMedia({ asset, className = "", layoutId }: CaseStudyMediaProps) {
  const mediaClassName = ["case-study-page__media", className].filter(Boolean).join(" ");
  const isProblemFrame = asset.frame === "problem" && asset.type === "image" && !asset.empty;
  const problemAssetBasePath = isProblemFrame ? asset.src.replace(/\/[^/]+$/, "") : "";
  const assetClassName = [
    "case-study-page__media-asset",
    isProblemFrame ? "case-study-page__problem-desktop-asset" : "",
  ]
    .filter(Boolean)
    .join(" ");

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
        {asset.empty ? null : asset.type === "video" ? (
          <video
            autoPlay
            className={assetClassName}
            loop
            muted
            playsInline
            preload="metadata"
            src={asset.src}
          />
        ) : (
          <>
            <img className={assetClassName} src={asset.src} alt={asset.alt} />
            {isProblemFrame ? (
              <div className="case-study-page__problem-mobile-layout" aria-hidden="true">
                <div className="case-study-page__problem-mobile-small-row">
                  <img
                    className="case-study-page__problem-mobile-small case-study-page__problem-mobile-small--logo"
                    src={`${problemAssetBasePath}/problem-logo-mobile.png`}
                    alt=""
                  />
                  <img
                    className="case-study-page__problem-mobile-small"
                    src={`${problemAssetBasePath}/problem-community-mobile.png`}
                    alt=""
                  />
                </div>
                <img
                  className="case-study-page__problem-mobile-large"
                  src={`${problemAssetBasePath}/problem-homepage-mobile.png`}
                  alt=""
                />
              </div>
            ) : null}
          </>
        )}
      </SharedMediaSurface>
      {asset.caption ? (
        <figcaption className="case-study-page__caption">{asset.caption}</figcaption>
      ) : null}
    </figure>
  );
}
