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
    let lastFrameTime = 0;
    let currentProgress = -1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readTargetProgress = () => {
      const shell = shellRef.current;

      if (!shell) {
        return 0;
      }

      // Progress is measured in viewport heights scrolled.
      return clamp(-shell.getBoundingClientRect().top / (window.innerHeight || 1));
    };

    const applyProgress = (progress: number) => {
      const shell = shellRef.current;
      const workSection = document.getElementById("work");

      if (!shell) {
        return;
      }

      // The first fold fades out in place over the first half viewport while the overlay starts
      // with it but darkens sooner, then the work fades in.
      const containerFade = mapRange(progress, 0, 0.5);
      const overlayFade = mapRange(progress, 0, 0.35);
      const statementFade = mapRange(progress, 0.36, 0.55);
      const workFade = mapRange(progress, 0.2, 0.55);

      shell.style.setProperty("--hero-transition-progress", progress.toFixed(4));
      shell.style.setProperty("--hero-container-opacity", (1 - containerFade).toFixed(4));
      shell.style.setProperty("--hero-overlay-opacity", (0.05 + overlayFade * 0.63).toFixed(4));
      shell.style.setProperty("--hero-statement-opacity", statementFade.toFixed(4));

      if (workSection) {
        workSection.style.opacity = workFade.toFixed(4);
        // Keep the faded-out work from catching clicks meant for the hero underneath it.
        workSection.style.pointerEvents = workFade > 0.2 ? "" : "none";
      }
      shell.dataset.statementActive = statementFade > 0.8 ? "true" : "false";
    };

    // Ease the fades toward the scroll position so chunky wheel steps still read as one fluid motion.
    const tick = (time: number) => {
      const target = readTargetProgress();
      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 64) : 16;
      lastFrameTime = time;
      const follow = 1 - Math.exp(-elapsed / 110);
      currentProgress += (target - currentProgress) * follow;

      if (Math.abs(target - currentProgress) < 0.0005) {
        currentProgress = target;
      }

      applyProgress(currentProgress);

      if (currentProgress !== target) {
        animationFrameId = window.requestAnimationFrame(tick);
      } else {
        animationFrameId = 0;
        lastFrameTime = 0;
      }
    };

    const requestUpdate = () => {
      if (reducedMotion.matches) {
        currentProgress = readTargetProgress();
        applyProgress(currentProgress);
        return;
      }

      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    currentProgress = readTargetProgress();
    applyProgress(currentProgress);
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
