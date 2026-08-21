"use client";

import { useEffect, useRef } from "react";

const CURSOR_OFFSET = 14;

export function AboutViewCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const latestPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cursorElement = cursorRef.current;

    if (!canHover || !cursorElement) {
      return undefined;
    }

    const paintCursor = () => {
      frameRef.current = null;

      const { x, y } = latestPosition.current;
      const scale = cursorElement.dataset.visible === "true" ? 1 : 0.98;

      cursorElement.style.transform = `translate3d(${x + CURSOR_OFFSET}px, ${
        y + CURSOR_OFFSET
      }px, 0) scale(${scale})`;
    };

    const schedulePaint = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(paintCursor);
    };

    const moveCursor = (event: Event) => {
      const pointerEvent = event as PointerEvent;

      latestPosition.current = {
        x: pointerEvent.clientX,
        y: pointerEvent.clientY,
      };

      schedulePaint();
    };

    const showCursor = (event: Event) => {
      cursorElement.dataset.visible = "true";
      moveCursor(event);
    };

    const hideCursor = () => {
      cursorElement.dataset.visible = "false";
      schedulePaint();
    };

    const targets = Array.from(document.querySelectorAll('[data-cursor="about-view"]'));

    targets.forEach((target) => {
      target.addEventListener("pointerenter", showCursor);
      target.addEventListener("pointerleave", hideCursor);
      target.addEventListener("pointermove", moveCursor);
    });

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      targets.forEach((target) => {
        target.removeEventListener("pointerenter", showCursor);
        target.removeEventListener("pointerleave", hideCursor);
        target.removeEventListener("pointermove", moveCursor);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="about-view-cursor"
      data-visible="false"
      aria-hidden="true"
    >
      <img
        className="about-view-cursor__icon"
        src="/assets/about-view-eye.svg"
        alt=""
        draggable={false}
      />
      <span>VIEW</span>
    </div>
  );
}
