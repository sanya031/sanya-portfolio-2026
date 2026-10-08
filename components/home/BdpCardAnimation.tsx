"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAccessibilityOptions } from "../../lib/accessibilityOptions";
import { type StageCue, useCardAnimationReady, useStageLoop } from "./useCardAnimationReady";

/* ─────────────────────────────────────────────────────────
 * BDP CARD STORYBOARD (loops once the card is on screen and the work has faded in)
 *
 *    0ms   all four screens stacked in the centre, homepage on top
 *  800ms   each screen moves out to its own corner of the 2×2 grid
 *          (staggered 50ms), settling with a soft spring (~1.3s)
 * 4100ms   after a 2s rest on the grid, the screens glide back into the centre stack
 * 6200ms   the stack has rested ~1s; loop (next split 800ms later)
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  split: 800, // screens leave the centre for their grid cells
  regroup: 4100, // screens return to the centre stack after resting on the grid
  loop: 6200, // the stack has settled and rested; start again
};

const MOVE: Transition = { type: "spring", visualDuration: 1.15, bounce: 0 };
const STAGGER = 0.05; // seconds between each screen setting off

type Stage = "centre" | "grid";

const CUES: StageCue<Stage>[] = [
  { at: 0, stage: "centre" },
  { at: TIMING.split, stage: "grid" },
  { at: TIMING.regroup, stage: "centre" },
];

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
    }
  }, [reduceMotion]);

  const { cardLoops } = useAccessibilityOptions();

  useStageLoop(rootRef, ready && !reduceMotion, CUES, TIMING.loop, setStage, {
    maxLoops: cardLoops,
    finalStage: "grid",
  });

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
