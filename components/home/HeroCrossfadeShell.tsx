"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export type HeroCrossfadeShellProps = {
  backgroundImage: string;
  children: ReactNode;
};

type HeroCrossfadeStyle = CSSProperties & {
  "--hero-image": string;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const smoothstep = (value: number) => {
  const clampedValue = clamp(value);

  return clampedValue * clampedValue * (3 - 2 * clampedValue);
};

const mapRange = (value: number, start: number, end: number) =>
  smoothstep((value - start) / (end - start));

export function HeroCrossfadeShell({
  backgroundImage,
  children,
}: HeroCrossfadeShellProps) {
  const shellRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let animationFrameId = 0;

    const updateProgress = () => {
      const shell = shellRef.current;

      if (!shell) {
        return;
      }

      const rect = shell.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp(-rect.top / (viewportHeight * 0.7));
      const containerFade = mapRange(progress, 0, 0.22);
      const overlayFade = mapRange(progress, 0.18, 0.46);
      const statementFade = mapRange(progress, 0.52, 0.78);

      shell.style.setProperty("--hero-transition-progress", progress.toFixed(3));
      shell.style.setProperty("--hero-container-opacity", (1 - containerFade).toFixed(3));
      shell.style.setProperty("--hero-overlay-opacity", (0.05 + overlayFade * 0.5).toFixed(3));
      shell.style.setProperty("--hero-statement-opacity", statementFade.toFixed(3));
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
      style={{ "--hero-image": backgroundImage } as HeroCrossfadeStyle}
    >
      {children}
    </section>
  );
}
