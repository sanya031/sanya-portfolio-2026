"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type HeroCrossfadeShellProps = {
  children: ReactNode;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const smoothstep = (value: number) => {
  const clampedValue = clamp(value);

  return clampedValue * clampedValue * (3 - 2 * clampedValue);
};

const mapRange = (value: number, start: number, end: number) =>
  smoothstep((value - start) / (end - start));

export function HeroCrossfadeShell({ children }: HeroCrossfadeShellProps) {
  const shellRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationFrameId = 0;

    const updateProgress = () => {
      const shell = shellRef.current;
      // Fade values live on the page so the work section's overlay stays in sync with the hero's.
      const page = shell?.parentElement;

      if (!shell || !page) {
        return;
      }

      const rect = shell.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp(-rect.top / (viewportHeight * 0.7));
      const containerFade = mapRange(progress, 0, 0.22);
      const overlayFade = mapRange(progress, 0.18, 0.46);
      const statementFade = mapRange(progress, 0.52, 0.78);

      page.style.setProperty("--hero-transition-progress", progress.toFixed(3));
      page.style.setProperty("--hero-container-opacity", (1 - containerFade).toFixed(3));
      page.style.setProperty("--hero-overlay-opacity", (0.05 + overlayFade * 0.5).toFixed(3));
      page.style.setProperty("--hero-statement-opacity", statementFade.toFixed(3));
      shell.dataset.statementActive = statementFade > 0.8 ? "true" : "false";
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      id="intro"
      className="home-page__hero-shell"
      ref={shellRef}
    >
      {children}
    </section>
  );
}
