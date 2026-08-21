import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from "react";

export type GridPlacement = {
  column: number;
  row: number;
  columns: number;
  rows: number;
};

export type AboutContainerProps = {
  children?: ReactNode;
  className?: string;
  compactLabel?: string;
  desktop: GridPlacement;
  label: string;
  laptop?: GridPlacement;
  mobile?: GridPlacement;
  onSpotlight?: () => void;
  revealOrder?: number;
  tablet?: GridPlacement;
};

type PlacementProperties = CSSProperties & Record<`--${string}`, number>;

function placementProperties(
  prefix: "desktop" | "laptop" | "tablet" | "mobile",
  placement: GridPlacement,
) {
  return {
    [`--about-container-${prefix}-column`]: placement.column,
    [`--about-container-${prefix}-row`]: placement.row,
    [`--about-container-${prefix}-columns`]: placement.columns,
    [`--about-container-${prefix}-rows`]: placement.rows,
  };
}

export function AboutContainer({
  children,
  className = "",
  compactLabel,
  desktop,
  label,
  laptop = desktop,
  mobile = desktop,
  onSpotlight,
  revealOrder = 0,
  tablet = desktop,
}: AboutContainerProps) {
  const style = {
    ...placementProperties("desktop", desktop),
    ...placementProperties("laptop", laptop),
    ...placementProperties("tablet", tablet),
    ...placementProperties("mobile", mobile),
    "--about-container-reveal-order": revealOrder,
  } as PlacementProperties;

  const openSpotlight = (event: MouseEvent<HTMLDivElement>) => {
    if (!onSpotlight) return;

    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, select, textarea")) return;
    onSpotlight();
  };

  const openSpotlightFromKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onSpotlight || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onSpotlight();
  };

  return (
    <div
      aria-label={label}
      aria-haspopup={onSpotlight ? "dialog" : undefined}
      className={["about-container", className].filter(Boolean).join(" ")}
      role="group"
      onClick={openSpotlight}
      onKeyDown={openSpotlightFromKeyboard}
      style={style}
      tabIndex={onSpotlight ? 0 : undefined}
    >
      <div className="about-container__label">
        <span className="about-container__label-default">{label}</span>
        <span className="about-container__label-compact">
          {compactLabel ?? label}
        </span>
      </div>
      <div className="about-container__surface">
        <div className="about-container__scroller">{children}</div>
      </div>
    </div>
  );
}
