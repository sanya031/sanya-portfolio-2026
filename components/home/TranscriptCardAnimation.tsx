"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { type StageCue, useCardAnimationReady, useStageLoop } from "./useCardAnimationReady";

/* ─────────────────────────────────────────────────────────
 * TRANSCRIPT CARD STORYBOARD (loops once the card is on screen and the work has faded in)
 *
 *    0ms   review list slides down into the card from above (~1.2s)
 * 1700ms   cursor glides onto "Silent Payments Part 2"; the row pops out with a shadow
 * 3400ms   list slides out to the right while the editor slides in from the left (~1.3s)
 * 6700ms   after a 2s rest on the editor, it slides back out left; the list resets above
 * 8200ms   editor is out and the card has rested; loop
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  pick: 1700, // cursor arrives and the row pops out of the list
  swap: 3400, // list leaves right, editor enters left
  reset: 6700, // editor leaves after resting on screen
  loop: 8200, // editor is out; drop the list in again
};

const LIST_IN: Transition = { type: "spring", visualDuration: 1.2, bounce: 0 };
const ROW_POP: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
const CURSOR_IN: Transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };
const SWAP: Transition = { type: "spring", visualDuration: 1.3, bounce: 0 };

const ROW_RESTING = { scale: 1, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" };
const ROW_LIFTED = {
  scale: [1, 1.05, 1.035],
  boxShadow: "0 14px 32px rgba(0, 0, 0, 0.28)",
};

type Stage = "waiting" | "list" | "pick" | "swap";

const CUES: StageCue<Stage>[] = [
  { at: 0, stage: "list" },
  { at: TIMING.pick, stage: "pick" },
  { at: TIMING.swap, stage: "swap" },
  { at: TIMING.reset, stage: "waiting" },
];

// Off screen to the right after the swap, so it can jump back above the card unseen.
const INSTANT: Transition = { duration: 0 };

export function TranscriptCardAnimation({ ariaLabel }: { ariaLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ready = useCardAnimationReady(rootRef);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("waiting");

  useEffect(() => {
    if (reduceMotion) {
      setStage("swap");
    }
  }, [reduceMotion]);

  useStageLoop(rootRef, ready && !reduceMotion, CUES, TIMING.loop, setStage);

  const picked = stage === "pick" || stage === "swap";
  const swapped = stage === "swap";

  return (
    <div aria-label={ariaLabel} className="transcript-card-animation" ref={rootRef} role="img">
      {/* The list, its lifted row and the cursor move together when the editor takes over. */}
      <motion.div
        animate={{ x: swapped ? "115%" : "0%", y: stage === "waiting" ? "-120%" : "0%" }}
        className="transcript-card-animation__list"
        initial={false}
        transition={stage === "waiting" ? INSTANT : swapped ? SWAP : LIST_IN}
      >
        <img alt="" src="/assets/case-study-1/card-animation/list.webp" />
        <motion.img
          alt=""
          animate={picked ? ROW_LIFTED : ROW_RESTING}
          className="transcript-card-animation__row"
          initial={false}
          src="/assets/case-study-1/card-animation/row-highlight.webp"
          transition={ROW_POP}
        />
        <motion.svg
          animate={picked ? { opacity: 1, x: "0%", y: "0%" } : { opacity: 0, x: "120%", y: "160%" }}
          aria-hidden="true"
          className="transcript-card-animation__cursor"
          initial={false}
          transition={CURSOR_IN}
          viewBox="0 0 24 24"
        >
          <path
            d="M5 3l14 8.2-6.1 1.4-3.2 5.6z"
            fill="#000"
            stroke="#fff"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </motion.div>

      <motion.img
        alt=""
        animate={{ x: swapped ? "0%" : "-115%" }}
        className="transcript-card-animation__editor"
        initial={false}
        src="/assets/case-study-1/card-animation/editor.webp"
        transition={SWAP}
      />
    </div>
  );
}
