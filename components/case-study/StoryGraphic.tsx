import { bandSquiggles, ContainerLabel, Squiggles } from "./transcriptStoryParts";

/*
 * Before/after graphics on story-layout case studies, built as containers like the Transcript
 * story: a tinted background with brush strokes and "LEAD / detail" mono labels.
 *  - stacked pairs share one container; each screenshot is cut off at the same height, and the
 *    last one bleeds off the bottom edge
 *  - row layouts (side-by-side diagrams) get a container each and keep the whole image visible
 */
export type StoryPalette = "peach" | "beige" | "blue" | "slate" | "lilac";

const PALETTES: Record<StoryPalette, string> = {
  peach: "#f6e4d4",
  beige: "#ece6dc",
  blue: "#dde9f5",
  slate: "#e5e9ef",
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

function Item({ item }: { item: StoryGraphicItem }) {
  const { lead, detail } = splitLabel(item.label);

  return (
    <div className="story-graphic__item">
      {item.label ? <ContainerLabel detail={detail} lead={lead} /> : null}
      <div className="story-graphic__media">
        {item.type === "video" ? (
          <video aria-label={item.alt} autoPlay loop muted playsInline preload="metadata" src={item.src} />
        ) : (
          <img alt={item.alt ?? ""} loading="lazy" src={item.src} />
        )}
      </div>
    </div>
  );
}

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
  const canvas = (children: StoryGraphicItem[], key?: string) => (
    <figure
      className="transcript-story__canvas story-graphic__canvas"
      key={key}
      style={{ background: PALETTES[palette] }}
    >
      <Squiggles items={strokes} size={SIZE} />
      {children.map((item) => (
        <Item item={item} key={item.src} />
      ))}
    </figure>
  );

  return (
    <section
      aria-label="Before and after comparison"
      className="story-graphic"
      data-fit={layout === "row" ? "contain" : "bleed"}
      data-layout={layout}
    >
      {layout === "row" ? items.map((item) => canvas([item], item.src)) : canvas(items)}
    </section>
  );
}
