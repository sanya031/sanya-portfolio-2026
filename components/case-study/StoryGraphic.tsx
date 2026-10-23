import { bandSquiggles, ContainerLabel, Squiggles } from "./transcriptStoryParts";

/*
 * Before/after graphics on story-layout case studies, built as containers like the Transcript
 * story: a tinted background with brush strokes, a "LEAD / detail" mono label, and screenshots
 * that bleed off the bottom edge. Row layouts (side-by-side diagrams) keep the whole image
 * visible instead of cropping it.
 */
export type StoryPalette = "peach" | "beige" | "blue" | "green" | "lilac";

const PALETTES: Record<StoryPalette, string> = {
  peach: "#f6e4d4",
  beige: "#ece6dc",
  blue: "#dde9f5",
  green: "#e3efd9",
  lilac: "#ece3f5",
};

const SIZE = { w: 716, h: 400 };

type StoryGraphicItem = {
  label?: string;
  src: string;
  alt?: string;
  type?: "image" | "video";
};

// "BEFORE — STANDALONE PAGE BEHIND A CTA" → lead "Before", detail "Standalone page behind a CTA".
const splitLabel = (label = "") => {
  const [lead, ...rest] = label.split(" — ");

  return { lead, detail: rest.join(" — ") || undefined };
};

export function StoryGraphic({
  items,
  layout,
  palette = "beige",
}: {
  items: StoryGraphicItem[];
  layout?: "row";
  palette?: StoryPalette;
}) {
  const strokes = bandSquiggles("x").map((item) => ({
    ...item,
    src: item.src.replace("squiggle-x-", `/assets/case-study-2/strokes/squiggle-${palette}-`),
    x: -40,
    w: 796,
  }));

  return (
    <section
      aria-label="Before and after comparison"
      className="story-graphic"
      data-fit={layout === "row" ? "contain" : "bleed"}
      data-layout={layout}
    >
      {items.map((item) => {
        const { lead, detail } = splitLabel(item.label);

        return (
          <figure
            className="transcript-story__canvas story-graphic__canvas"
            key={item.src}
            style={{ background: PALETTES[palette] }}
          >
            <Squiggles items={strokes} size={SIZE} />
            {item.label ? (
              <figcaption>
                <ContainerLabel detail={detail} lead={lead} />
              </figcaption>
            ) : null}
            <div className="story-graphic__media">
              {item.type === "video" ? (
                <video aria-label={item.alt} autoPlay loop muted playsInline preload="metadata" src={item.src} />
              ) : (
                <img alt={item.alt ?? ""} loading="lazy" src={item.src} />
              )}
            </div>
          </figure>
        );
      })}
    </section>
  );
}
