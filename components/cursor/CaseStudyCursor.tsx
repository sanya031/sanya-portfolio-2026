"use client";

import { useEffect, useState } from "react";

export type CaseStudyCursorProps = {
  label?: string;
};

export function CaseStudyCursor({ label = "View case study" }: CaseStudyCursorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);
    const targets = Array.from(document.querySelectorAll('[data-cursor="case-study"]'));

    targets.forEach((target) => {
      target.addEventListener("mouseenter", showCursor);
      target.addEventListener("mouseleave", hideCursor);
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", showCursor);
        target.removeEventListener("mouseleave", hideCursor);
      });
    };
  }, []);

  return (
    <div className="case-study-cursor" data-visible={isVisible} aria-hidden="true">
      {/* TODO: Track pointer position and ease this cursor toward the active case study hover. */}
      {label}
    </div>
  );
}
