"use client";

import { type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type HeroCrossfadeShellProps = {
  children: ReactNode;
};

/* ─────────────────────────────────────────────────────────
 * SCROLL REVEAL STORYBOARD
 *
 *    0.00s   first fold boxes fade out (in place)
 *    0.30s   boxes gone; dark overlay starts darkening
 *    0.70s   Selected work starts fading in, resting just below the first fold
 *    1.30s   everything settled
 *
 * Two modes, picked from the Scroll reveal DialKit panel:
 *  - scroll: the storyboard is laid out along `scrollDistance` and follows the scroll position,
 *    so it can be scrubbed, paused and reversed and can't be skipped by scrolling fast
 *  - timed: scrolling past `startAfterScroll` plays the storyboard on a timer; scrolling back to
 *    the top brings the first fold straight back
 * `snapToWork` makes "Selected work" a native scroll-snap stop, so a fast swipe from the first
 * fold always lands on the heading instead of carrying past it.
 * ───────────────────────────────────────────────────────── */
const scrollRevealControls = {
  mode: { type: "select", options: ["scroll", "timed"], default: "scroll" },
  snapToWork: true,
  scrollDistance: [60, 20, 150, 5],
  smoothing: [90, 0, 400, 10],
  startAfterScroll: [25, 0, 400, 5],
  boxesFade: [0.3, 0.1, 2, 0.05],
  overlayFade: [1, 0.1, 3, 0.05],
  overlayDarkness: [0.7, 0, 1, 0.01],
  workDelay: [0.7, 0, 3, 0.05],
  workFade: [0.4, 0.1, 2, 0.05],
  easing: { type: "select", options: ["smooth", "gentle", "linear"], default: "smooth" },
  replay: { type: "action", label: "Replay reveal" },
  reverse: { type: "action", label: "Play in reverse" },
} satisfies DialConfig;

type ScrollRevealControls = ResolvedValues<typeof scrollRevealControls>;

const easings: Record<string, string> = {
  smooth: "cubic-bezier(0.45, 0, 0.2, 1)",
  gentle: "cubic-bezier(0.22, 1, 0.36, 1)",
  linear: "linear",
};

const seconds = (value: number) => `${Math.round(value * 1000)}ms`;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

// Easing for scroll mode, matching the timed mode's curves.
const scrubEasings: Record<string, (value: number) => number> = {
  smooth: (value) => value * value * (3 - 2 * value),
  gentle: (value) => 1 - (1 - value) ** 3,
  linear: (value) => value,
};

// Scroll mode: where each part of the storyboard sits along the scroll, as fractions of it.
const scrubSchedule = (controls: ScrollRevealControls) => {
  const total = Math.max(
    controls.boxesFade,
    controls.boxesFade + controls.overlayFade,
    controls.workDelay + controls.workFade,
  );

  return {
    boxes: [0, controls.boxesFade / total],
    overlay: [controls.boxesFade / total, (controls.boxesFade + controls.overlayFade) / total],
    work: [controls.workDelay / total, (controls.workDelay + controls.workFade) / total],
  };
};

const BASE_OVERLAY = 0.11;

// Scrolling back to the top replays quickly and nearly all at once, so the first fold comes
// straight back instead of waiting for the forward sequence to unwind in order.
const RETURN = {
  work: { delay: 0, duration: 0.25 },
  overlay: { delay: 0.1, duration: 0.45 },
  boxes: { delay: 0.15, duration: 0.45 },
};

// Forward plays boxes → overlay → work on the tuned schedule; the return uses RETURN above.
const applyTiming = (page: HTMLElement, controls: ScrollRevealControls, revealed: boolean) => {
  const schedule = revealed
    ? {
        boxes: { delay: 0, duration: controls.boxesFade },
        overlay: { delay: controls.boxesFade, duration: controls.overlayFade },
        work: { delay: controls.workDelay, duration: controls.workFade },
      }
    : RETURN;

  for (const [name, { delay, duration }] of Object.entries(schedule)) {
    page.style.setProperty(`--reveal-${name}-duration`, seconds(duration));
    page.style.setProperty(`--reveal-${name}-delay`, seconds(delay));
  }

  page.style.setProperty("--reveal-overlay-darkness", String(controls.overlayDarkness));
  page.style.setProperty("--reveal-ease", easings[controls.easing] ?? easings.smooth);
};

export function HeroCrossfadeShell({ children }: HeroCrossfadeShellProps) {
  const shellRef = useRef<HTMLElement>(null);
  const revealedRef = useRef(false);
  const controlsRef = useRef<ScrollRevealControls | null>(null);

  const setRevealed = useCallback((revealed: boolean, instant = false) => {
    const page = shellRef.current?.closest<HTMLElement>(".home-page");
    const controls = controlsRef.current;

    if (!page || !controls) {
      return;
    }

    revealedRef.current = revealed;
    applyTiming(page, controls, revealed);

    if (instant) {
      page.dataset.revealInstant = "true";
    }

    page.dataset.revealed = String(revealed);

    if (instant) {
      // Let the instant state paint before transitions come back.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          delete page.dataset.revealInstant;
        });
      });
    }
  }, []);

  const controls = useDialKit("Scroll reveal", scrollRevealControls, {
    defaultCollapsed: true,
    id: "home-scroll-reveal",
    persist: true,
    onAction: (action) => {
      if (action === "replay") {
        setRevealed(false, true);
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => setRevealed(true)));
      }

      if (action === "reverse") {
        setRevealed(false);
      }
    },
  });

  controlsRef.current = controls;

  // Panel edits retime the current direction without replaying it.
  useEffect(() => {
    const page = shellRef.current?.closest<HTMLElement>(".home-page");

    if (page) {
      applyTiming(page, controls, revealedRef.current);
    }
  }, [controls]);

  useEffect(() => {
    const shell = shellRef.current;
    const page = shell?.closest<HTMLElement>(".home-page");
    const intro = shell?.querySelector<HTMLElement>(".hero-intro");
    const work = document.getElementById("work");

    if (!shell || !page) {
      return;
    }

    page.dataset.revealMode = controls.mode;

    if (controls.mode === "timed") {
      page.style.removeProperty("--hero-pin-length");

      const isPastTrigger = () => window.scrollY > (controlsRef.current?.startAfterScroll ?? 25);
      const onScroll = () => {
        const revealed = isPastTrigger();

        if (revealed !== revealedRef.current) {
          setRevealed(revealed);
        }
      };

      // Land in the right state on load (including returning to #work) without animating.
      setRevealed(isPastTrigger(), true);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => window.removeEventListener("scroll", onScroll);
    }

    // Scroll mode. The first fold stays pinned for the whole scrub distance.
    page.style.setProperty("--hero-pin-length", `${controls.scrollDistance}vh`);

    let frame = 0;
    let lastTime = 0;
    let current = -1;

    const target = () =>
      clamp01(window.scrollY / ((controlsRef.current?.scrollDistance ?? 60) / 100 * window.innerHeight));

    // Only three small layers change per frame: the hero boxes, the overlay and the work section.
    const apply = (progress: number) => {
      const live = controlsRef.current;

      if (!live) {
        return;
      }

      const ease = scrubEasings[live.easing] ?? scrubEasings.smooth;
      const schedule = scrubSchedule(live);
      const at = ([start, end]: number[]) =>
        ease(end > start ? clamp01((progress - start) / (end - start)) : progress >= end ? 1 : 0);
      const boxes = 1 - at(schedule.boxes);
      const overlay = BASE_OVERLAY + (live.overlayDarkness - BASE_OVERLAY) * at(schedule.overlay);
      const workOpacity = at(schedule.work);

      intro?.style.setProperty("--scrub-boxes", boxes.toFixed(4));
      shell.style.setProperty("--scrub-overlay", overlay.toFixed(4));
      work?.style.setProperty("--scrub-work", workOpacity.toFixed(4));

      // "Revealed" (clickable work, card animations) once the work is mostly in.
      const revealed = workOpacity > 0.5;

      if (revealed !== revealedRef.current) {
        revealedRef.current = revealed;
        page.dataset.revealed = String(revealed);
      }
    };

    // Ease towards the scroll position so chunky wheel steps still read as one fluid motion.
    const tick = (time: number) => {
      const goal = target();
      const smoothing = controlsRef.current?.smoothing ?? 0;
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      current += (goal - current) * (smoothing > 0 ? 1 - Math.exp(-elapsed / smoothing) : 1);

      if (Math.abs(goal - current) < 0.0005) {
        current = goal;
      }

      apply(current);

      if (current !== goal) {
        frame = window.requestAnimationFrame(tick);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    current = target();
    apply(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setRevealed, controls.mode, controls.scrollDistance]);

  // Snap: the page rests either at the top or anywhere from the work section down, and a swipe
  // from the first fold can't pass the work section's start. Home page only.
  useEffect(() => {
    const root = document.documentElement;

    if (controls.snapToWork) {
      root.dataset.snapWork = "true";
    } else {
      delete root.dataset.snapWork;
    }

    return () => {
      delete root.dataset.snapWork;
    };
  }, [controls.snapToWork]);

  // Re-apply scroll mode when its storyboard values change in the panel.
  useEffect(() => {
    if (controls.mode === "scroll") {
      window.dispatchEvent(new Event("scroll"));
    }
  }, [controls]);

  return (
    <section
      id="intro"
      className="home-page__hero-shell"
      ref={shellRef}
    >
      {/* A viewport-sized snap target for the top of the page (the shell itself is taller). */}
      <div className="home-page__snap-top" aria-hidden="true" />
      {children}
    </section>
  );
}
