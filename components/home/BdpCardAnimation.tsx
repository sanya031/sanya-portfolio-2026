"use client";

import { motion, type Transition, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * BDP CARD STORYBOARD (plays once, when the card is on screen and the work has faded in)
 *
 *    0ms   all four screens stacked in the centre, homepage on top
 *  300ms   each screen moves out to its own corner of the 2×2 grid
 *          (staggered 50ms), settling with a soft spring
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  split: 300, // screens leave the centre for their grid cells, once the card is visible
};

// The home page reveals the work section on a timer once the visitor scrolls (see
// HeroCrossfadeShell). Resolves once that reveal has finished, so the card is actually visible.
const whenWorkRevealed = (element: HTMLElement, onReady: () => void) => {
  const page = element.closest<HTMLElement>(".home-page");

  if (!page) {
    onReady();
    return () => {};
  }

  let timer = 0;
  const readRevealMs = () => {
    const style = getComputedStyle(page);
    const delay = Number.parseFloat(style.getPropertyValue("--reveal-work-delay")) || 0;
    const duration = Number.parseFloat(style.getPropertyValue("--reveal-work-duration")) || 0;
    return delay + duration;
  };

  const check = (justRevealed: boolean) => {
    if (page.dataset.revealed !== "true") {
      return;
    }

    observer.disconnect();
    timer = window.setTimeout(onReady, justRevealed ? readRevealMs() : 0);
  };

  const observer = new MutationObserver(() => check(true));
  observer.observe(page, { attributes: true, attributeFilter: ["data-revealed"] });
  check(false);

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
};

const MOVE: Transition = { type: "spring", visualDuration: 0.8, bounce: 0 };
const STAGGER = 0.05; // seconds between each screen setting off

type Stage = "centre" | "grid";

// Stacking order: the homepage is last so it sits on top of the stack.
const screens = [
  { id: "contribute", src: "/assets/case-study-2/card-animation/contribute.webp" },
  { id: "explore", src: "/assets/case-study-2/card-animation/explore.webp" },
  { id: "field", src: "/assets/case-study-2/card-animation/field.webp" },
  { id: "hero", src: "/assets/case-study-2/card-animation/hero.webp" },
] as const;

export function BdpCardAnimation({ ariaLabel }: { ariaLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("centre");

  useEffect(() => {
    if (reduceMotion) {
      setStage("grid");
      return;
    }

    const root = rootRef.current;

    if (!isInView || !root) {
      return;
    }

    let timer = 0;
    const stopWaiting = whenWorkRevealed(root, () => {
      timer = window.setTimeout(() => setStage("grid"), TIMING.split);
    });

    return () => {
      stopWaiting();
      window.clearTimeout(timer);
    };
  }, [isInView, reduceMotion]);

  return (
    <div
      aria-label={ariaLabel}
      className="bdp-card-animation"
      data-stage={stage}
      ref={rootRef}
      role="img"
    >
      {screens.map((screen, index) => (
        <motion.img
          alt=""
          className="bdp-card-animation__screen"
          data-screen={screen.id}
          key={screen.id}
          layout
          src={screen.src}
          style={{ borderRadius: 8 }}
          transition={{ ...MOVE, delay: (screens.length - 1 - index) * STAGGER }}
        />
      ))}
    </div>
  );
}
