import type { CSSProperties } from "react";

export const assetPath = "/assets/case-study-1/redesign";

/*
 * Visual containers for the Transcript Review story sections, built from the Figma wireframe
 * (Portfolio-2026, "Transcript Latest"). Positions are kept in the wireframe's pixel space and
 * converted to percentages of each container, so the screenshots and decorative squiggles scale
 * with the column instead of being one flattened image.
 */

type Box = { x: number; y: number; w: number; h: number };

// Places a box from the wireframe inside a container of the given design size.
export const place = ({ x, y, w, h }: Box, size: { w: number; h: number }): CSSProperties => ({
  left: `${(x / size.w) * 100}%`,
  top: `${(y / size.h) * 100}%`,
  width: `${(w / size.w) * 100}%`,
  height: `${(h / size.h) * 100}%`,
});

type Squiggle = Box & { src: string; inset: string; rotate?: number };

// The squiggles are blurred strokes whose SVG bounds extend past their layer box (the inset).
export function Squiggles({ items, size }: { items: Squiggle[]; size: { w: number; h: number } }) {
  return (
    <>
      {items.map((item) => (
        <span
          aria-hidden="true"
          className="transcript-story__squiggle"
          key={`${item.src}-${item.x}-${item.y}`}
          style={{
            ...place(item, size),
            transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
          }}
        >
          <img alt="" src={`${assetPath}/${item.src}`} style={{ inset: item.inset }} />
        </span>
      ))}
    </>
  );
}

// A row-of-three squiggle layout shared by several containers, offset per container.
export const bandSquiggles = (set: string, dx = 0, dy = 0): Squiggle[] => [
  { src: `squiggle-${set}-1.svg`, x: -31 + dx, y: -20 + dy, w: 749.669, h: 87.941, inset: "-80.12% -7.87% -66.65% -9.26%" },
  { src: `squiggle-${set}-2.svg`, x: -1 + dx, y: 196 + dy, w: 720.018, h: 85.3, inset: "-68.74% -6.26% -55.03% -7.86%" },
  { src: `squiggle-${set}-3.svg`, x: -31.31 + dx, y: 319.01 + dy, w: 735.726, h: 57.529, inset: "-112.08% -8.99% -141.31% -9.49%" },
];

export const wavySquiggles = (set: string, dx = 0, dy = 0): Squiggle[] => [
  { src: `squiggle-${set}-1.svg`, x: 19 + dx, y: -1 + dy, w: 642, h: 75, inset: "-92.54% -9.18% -59.48% -6.31%" },
  {
    src: `squiggle-${set}-2.svg`,
    x: 42.76 + dx,
    y: 144.88 + dy,
    w: 670,
    h: 73,
    rotate: -8.28,
    inset: "-80.64% -7.25% -42.62% -8.44%",
  },
  { src: `squiggle-${set}-3.svg`, x: 19 + dx, y: 289 + dy, w: 630, h: 50, inset: "-109.14% -10.49% -162.42% -9.7%" },
];

/** Mono label pinned to a container's top-left: "LEAD / detail". */
export function ContainerLabel({ lead, detail, tone }: { lead: string; detail?: string; tone?: string }) {
  return (
    <p className="transcript-story__label" style={tone ? { color: tone } : undefined}>
      {lead}
      {detail ? (
        <>
          {" / "}
          <span>{detail}</span>
        </>
      ) : null}
    </p>
  );
}

export function Shot({
  src,
  alt,
  box,
  size,
  className,
}: {
  src: string;
  alt: string;
  box: Box;
  size: { w: number; h: number };
  className?: string;
}) {
  return (
    <img
      alt={alt}
      className={`transcript-story__shot${className ? ` ${className}` : ""}`}
      loading="lazy"
      src={`${assetPath}/${src}`}
      style={place(box, size)}
    />
  );
}
