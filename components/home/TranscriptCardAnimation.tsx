"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useCardAnimationReady } from "./useCardAnimationReady";

/* ─────────────────────────────────────────────────────────
 * TRANSCRIPT CARD STORYBOARD (plays once, when the card is on screen and the work has faded in)
 * Timing follows the Jitter file the original video was exported from.
 *
 *    0ms   review list slides in from the upper left, growing slightly as it settles
 * 1000ms   "Silent Payments Part 2" row highlights with a quick glow
 * 1400ms   transcript editor slides in from the right, covering the list
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  highlight: 1000, // row highlight appears
  editor: 1400, // editor starts sliding in
};

const LIST_IN: Transition = { duration: 1, ease: [0.22, 1, 0.36, 1] };
const HIGHLIGHT_IN: Transition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };
const EDITOR_IN: Transition = { type: "spring", visualDuration: 0.8, bounce: 0 };

const LIST_START = { opacity: 0, x: "-8%", y: "-22%", scale: 0.92 };
const LIST_SETTLED = { opacity: 1, x: "0%", y: "0%", scale: 1 };

type Stage = "waiting" | "list" | "highlight" | "editor";

export function TranscriptCardAnimation({ ariaLabel }: { ariaLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ready = useCardAnimationReady(rootRef);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("waiting");

  useEffect(() => {
    if (reduceMotion) {
      setStage("editor");
      return;
    }

    if (!ready) {
      return;
    }

    setStage("list");
    const timers = [
      window.setTimeout(() => setStage("highlight"), TIMING.highlight),
      window.setTimeout(() => setStage("editor"), TIMING.editor),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [ready, reduceMotion]);

  const listShown = stage !== "waiting";
  const highlightShown = stage === "highlight" || stage === "editor";
  const editorShown = stage === "editor";

  return (
    <div aria-label={ariaLabel} className="transcript-card-animation" ref={rootRef} role="img">
      <motion.div
        animate={listShown ? LIST_SETTLED : LIST_START}
        className="transcript-card-animation__list"
        initial={reduceMotion ? LIST_SETTLED : LIST_START}
        transition={LIST_IN}
      >
        <img alt="" src="/assets/case-study-1/card-animation/list.webp" />
        <motion.img
          alt=""
          animate={
            highlightShown
              ? { opacity: 1, scale: [1, 1.015, 1] }
              : { opacity: 0, scale: 1 }
          }
          className="transcript-card-animation__row"
          initial={false}
          src="/assets/case-study-1/card-animation/row-highlight.webp"
          transition={HIGHLIGHT_IN}
        />
      </motion.div>

      <motion.img
        alt=""
        animate={{ x: editorShown ? "0%" : "108%" }}
        className="transcript-card-animation__editor"
        initial={false}
        src="/assets/case-study-1/card-animation/editor.webp"
        transition={EDITOR_IN}
      />
    </div>
  );
}
