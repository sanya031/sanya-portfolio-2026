"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type CursorState = {
  assetSrc: string;
  isVisible: boolean;
  x: number;
  y: number;
};

const cursorAssets: Record<string, string> = {
  "transcript-review-redesign": "/assets/case-study-cursor-1.svg",
  "bitcoin-dev-project-redesign": "/assets/case-study-cursor-2.svg",
};

export function CaseStudyCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    assetSrc: cursorAssets["transcript-review-redesign"],
    isVisible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canHover) {
      return undefined;
    }

    const moveCursor = (event: Event) => {
      const pointerEvent = event as PointerEvent;

      setCursor((current) => ({
        ...current,
        x: pointerEvent.clientX,
        y: pointerEvent.clientY,
      }));
    };

    const showCursor = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const caseStudyId =
        target.closest<HTMLElement>("[data-case-study-id]")?.dataset.caseStudyId ??
        "transcript-review-redesign";

      setCursor((current) => ({
        ...current,
        assetSrc: cursorAssets[caseStudyId] ?? cursorAssets["transcript-review-redesign"],
        isVisible: true,
      }));
    };

    const hideCursor = () => {
      setCursor((current) => ({ ...current, isVisible: false }));
    };

    const targets = Array.from(document.querySelectorAll('[data-cursor="case-study"]'));

    targets.forEach((target) => {
      target.addEventListener("pointerenter", showCursor);
      target.addEventListener("pointerleave", hideCursor);
      target.addEventListener("pointermove", moveCursor);
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("pointerenter", showCursor);
        target.removeEventListener("pointerleave", hideCursor);
        target.removeEventListener("pointermove", moveCursor);
      });
    };
  }, []);

  return (
    <img
      className="case-study-cursor"
      data-visible={cursor.isVisible}
      src={cursor.assetSrc}
      alt=""
      aria-hidden="true"
      style={{
        "--case-study-cursor-x": `${cursor.x}px`,
        "--case-study-cursor-y": `${cursor.y}px`,
      } as CSSProperties}
    />
  );
}
