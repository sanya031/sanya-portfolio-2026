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
      const workSection = document.getElementById("work");

      if (!shell) {
        return;
      }

      const rect = shell.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      // Progress is measured in viewport heights scrolled. The first fold fades out over the first
      // half viewport while the overlay starts with it but darkens sooner, then the work fades in.
      const progress = clamp(-rect.top / viewportHeight);
      const containerFade = mapRange(progress, 0, 0.5);
      const overlayFade = mapRange(progress, 0, 0.35);
      const statementFade = mapRange(progress, 0.36, 0.55);
      const workFade = mapRange(progress, 0.2, 0.55);

      shell.style.setProperty("--hero-transition-progress", progress.toFixed(3));
      shell.style.setProperty("--hero-container-opacity", (1 - containerFade).toFixed(3));
      shell.style.setProperty("--hero-overlay-opacity", (0.05 + overlayFade * 0.63).toFixed(3));
      shell.style.setProperty("--hero-statement-opacity", statementFade.toFixed(3));

      if (workSection) {
        workSection.style.opacity = workFade.toFixed(3);
        // Keep the faded-out work from catching clicks meant for the hero underneath it.
        workSection.style.pointerEvents = workFade > 0.2 ? "" : "none";
      }
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
