"use client";

import { type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type HeroCrossfadeShellProps = {
  children: ReactNode;
};

/* ─────────────────────────────────────────────────────────
 * SCROLL STORYBOARD (progress = viewport heights scrolled)
 *
 *   0.00   first fold boxes start fading out, pinned in place
 *   0.30   boxes gone; pin releases
 *   0.25   dark overlay starts darkening over the painting
 *   0.55   overlay at full darkness
 *   0.45   Selected work starts fading in
 *   0.75   Selected work fully visible
 * ───────────────────────────────────────────────────────── */
const scrollFadeControls = {
  firstFold: {
    fadeStart: [0, 0, 1.5, 0.01],
    fadeEnd: [0.3, 0, 1.5, 0.01],
    pinLength: [30, 0, 150, 1],
  },
  overlay: {
    start: [0.25, 0, 1.5, 0.01],
    end: [0.55, 0, 1.5, 0.01],
    baseOpacity: [0.05, 0, 1, 0.01],
    maxOpacity: [0.7, 0, 1, 0.01],
  },
  work: {
    fadeStart: [0.45, 0, 1.5, 0.01],
    fadeEnd: [0.75, 0, 1.5, 0.01],
    restTop: [95, 40, 160, 1],
  },
  motion: {
    curve: { type: "select", options: ["smooth", "linear", "ease-out", "ease-in"], default: "smooth" },
    smoothing: [110, 0, 400, 10],
  },
} satisfies DialConfig;

type ScrollFadeControls = ResolvedValues<typeof scrollFadeControls>;
type Curve = ScrollFadeControls["motion"]["curve"];

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const curves: Record<Curve, (value: number) => number> = {
  smooth: (value) => value * value * (3 - 2 * value),
  linear: (value) => value,
  "ease-out": (value) => 1 - (1 - value) * (1 - value),
  "ease-in": (value) => value * value,
};

const mapRange = (value: number, start: number, end: number, curve: Curve) => {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }

  return curves[curve](clamp((value - start) / (end - start)));
};

export function HeroCrossfadeShell({ children }: HeroCrossfadeShellProps) {
  const shellRef = useRef<HTMLElement>(null);
  const controls = useDialKit("Scroll fade", scrollFadeControls, {
    defaultCollapsed: true,
    id: "home-scroll-fade",
    persist: true,
  });
  const controlsRef = useRef(controls);
  const refreshRef = useRef<() => void>(() => {});

  controlsRef.current = controls;

  // Layout values change the page geometry, so they live on the page rather than per frame.
  useEffect(() => {
    const page = shellRef.current?.parentElement;

    page?.style.setProperty("--hero-pin-length", `${controls.firstFold.pinLength}vh`);
    page?.style.setProperty("--work-rest-top", `${controls.work.restTop}vh`);
    refreshRef.current();
  }, [controls]);

  useEffect(() => {
    let animationFrameId = 0;
    let lastFrameTime = 0;
    let currentProgress = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const readTargetProgress = () => {
      const shell = shellRef.current;

      if (!shell) {
        return 0;
      }

      return Math.max(0, -shell.getBoundingClientRect().top / (window.innerHeight || 1));
    };

    const applyProgress = (progress: number) => {
      const shell = shellRef.current;
      const workSection = document.getElementById("work");
      const { firstFold, overlay, work, motion } = controlsRef.current;

      if (!shell) {
        return;
      }

      const containerFade = mapRange(progress, firstFold.fadeStart, firstFold.fadeEnd, motion.curve);
      const overlayFade = mapRange(progress, overlay.start, overlay.end, motion.curve);
      const workFade = mapRange(progress, work.fadeStart, work.fadeEnd, motion.curve);
      const overlayOpacity =
        overlay.baseOpacity + (overlay.maxOpacity - overlay.baseOpacity) * overlayFade;

      shell.style.setProperty("--hero-transition-progress", progress.toFixed(4));
      shell.style.setProperty("--hero-container-opacity", (1 - containerFade).toFixed(4));
      shell.style.setProperty("--hero-overlay-opacity", overlayOpacity.toFixed(4));

      if (workSection) {
        workSection.style.opacity = workFade.toFixed(4);
        // Keep the faded-out work from catching clicks meant for the hero underneath it.
        workSection.style.pointerEvents = workFade > 0.2 ? "" : "none";
      }
    };

    // Ease the fades toward the scroll position so chunky wheel steps still read as one fluid motion.
    const tick = (time: number) => {
      const target = readTargetProgress();
      const smoothing = controlsRef.current.motion.smoothing;
      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 64) : 16;
      lastFrameTime = time;
      const follow = smoothing > 0 ? 1 - Math.exp(-elapsed / smoothing) : 1;
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

    refreshRef.current = requestUpdate;
    currentProgress = readTargetProgress();
    applyProgress(currentProgress);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      refreshRef.current = () => {};
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
