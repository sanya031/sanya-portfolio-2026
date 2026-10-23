"use client";

import { motion, type Transition, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * COLLABORATOR CURSOR STORYBOARD (starts once the prototype window is on screen)
 *
 *     0ms   cursor glides in from the bottom-right, like a collaborator joining the file
 *  1100ms   name tag types out "Interact with this prototype", one letter at a time
 *  ~2.5s    typing done; the caret blinks out and the cursor drifts between a few
 *           resting spots, pausing at each, for as long as the window is in view
 *  hover    while the visitor's own pointer is over the prototype the cursor fades away
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  typeStart: 1100, // ms after entering before the first letter
  perLetter: 45, // ms between letters
  drift: 2800, // ms between resting spots
};

const MESSAGE = "Interact with this prototype";

const ENTER: Transition = { type: "spring", visualDuration: 1, bounce: 0.15 };
const DRIFT: Transition = { type: "spring", visualDuration: 1.4, bounce: 0.1 };

// Resting spots as percentages of the window, kept clear of the edges so the tag never clips.
const SPOTS = [
  { x: 46, y: 46 },
  { x: 58, y: 38 },
  { x: 40, y: 58 },
  { x: 54, y: 52 },
];

const COLOUR = "#867600";

export function CollaboratorCursor({ hidden }: { hidden: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [spot, setSpot] = useState(-1);

  // Enter, then type the message.
  useEffect(() => {
    if (!inView) {
      return;
    }

    if (reduceMotion) {
      setSpot(0);
      setTyped(MESSAGE.length);
      return;
    }

    setSpot(0);
    const timers = MESSAGE.split("").map((_, index) =>
      window.setTimeout(() => setTyped(index + 1), TIMING.typeStart + index * TIMING.perLetter),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, reduceMotion]);

  const doneTyping = typed === MESSAGE.length;

  // Drift between resting spots once the message is written.
  useEffect(() => {
    if (!doneTyping || reduceMotion) {
      return;
    }

    const interval = window.setInterval(
      () => setSpot((current) => (current + 1) % SPOTS.length),
      TIMING.drift,
    );

    return () => window.clearInterval(interval);
  }, [doneTyping, reduceMotion]);

  const at = spot >= 0 ? SPOTS[spot] : { x: 92, y: 96 };

  return (
    <div aria-hidden="true" className="collaborator-cursor-layer" ref={ref}>
      <motion.div
        animate={{
          left: `${at.x}%`,
          top: `${at.y}%`,
          opacity: spot >= 0 && !hidden ? 1 : 0,
        }}
        className="collaborator-cursor"
        initial={false}
        style={{ ["--cursor-colour" as string]: COLOUR }}
        transition={{
          left: spot <= 0 ? ENTER : DRIFT,
          top: spot <= 0 ? ENTER : DRIFT,
          opacity: { duration: 0.35 },
        }}
      >
        <svg className="collaborator-cursor__arrow" viewBox="0 0 16 18">
          <path d="M1.5 1.5 14 8.2l-5.6 1.5-2.7 5.4L1.5 1.5Z" />
        </svg>
        <span className="collaborator-cursor__tag" data-empty={typed === 0}>
          {MESSAGE.slice(0, typed)}
          {!doneTyping && typed > 0 ? <span className="collaborator-cursor__caret" /> : null}
        </span>
      </motion.div>
    </div>
  );
}
