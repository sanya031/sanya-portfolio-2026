"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type CursorState = {
  isVisible: boolean;
  x: number;
  y: number;
};

export function AboutViewCursor() {
  const [cursor, setCursor] = useState<CursorState>({
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

    const showCursor = () => {
      setCursor((current) => ({
        ...current,
        isVisible: true,
      }));
    };

    const hideCursor = () => {
      setCursor((current) => ({ ...current, isVisible: false }));
    };

    const targets = Array.from(document.querySelectorAll('[data-cursor="about-view"]'));

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
    <div
      className="about-view-cursor"
      data-visible={cursor.isVisible}
      aria-hidden="true"
      style={{
        "--about-view-cursor-x": `${cursor.x}px`,
        "--about-view-cursor-y": `${cursor.y}px`,
      } as CSSProperties}
    >
      <svg
        className="about-view-cursor__icon"
        viewBox="0 0 18 12"
        fill="none"
        focusable="false"
      >
        <path
          d="M1.35 6C3.1 2.95 5.62 1.43 8.9 1.43S14.69 2.95 16.45 6c-1.76 3.05-4.28 4.57-7.55 4.57S3.1 9.05 1.35 6Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8.9" cy="6" r="1.75" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span>VIEW</span>
    </div>
  );
}
