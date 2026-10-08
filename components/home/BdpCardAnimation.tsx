"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useCardAnimationReady } from "./useCardAnimationReady";

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
  const ready = useCardAnimationReady(rootRef);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("centre");

  useEffect(() => {
    if (reduceMotion) {
      setStage("grid");
      return;
    }

    if (!ready) {
      return;
    }

    const timer = window.setTimeout(() => setStage("grid"), TIMING.split);

    return () => window.clearTimeout(timer);
  }, [ready, reduceMotion]);

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
