"use client";

import { motion, type Transition, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * COLLABORATOR CURSOR STORYBOARD (starts once the prototype window is on screen)
 *
 *     0ms   cursor glides in from the bottom-right, like a collaborator joining the file
 *  1100ms   name tag types out "Interact with this prototype", one letter at a time
 *  ~3.1s    typing done; the cursor starts drifting between a few resting spots,
 *           pausing at each, for as long as the window is in view
 *           the message rests for 3.5s, erases, waits 1.5s and types out again, on a loop
 *  hover    while the visitor's own pointer is over the prototype the cursor fades away
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  typeStart: 1100, // ms after entering before the first letter
  perLetter: 70, // ms between letters while typing
  hold: 3500, // ms the full message stays up
  perErase: 30, // ms between letters while erasing
  gap: 1500, // ms with an empty tag before typing again
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
  const [drifting, setDrifting] = useState(false);

  // Enter, then type, hold, erase and retype the message on a loop.
  useEffect(() => {
    if (!inView) {
      return;
    }

    setSpot(0);

    if (reduceMotion) {
      setTyped(MESSAGE.length);
      return;
    }

    let timer = 0;
    const wait = (ms: number, then: () => void) => {
      timer = window.setTimeout(then, ms);
    };
    const type = (count: number) => {
      setTyped(count);

      if (count < MESSAGE.length) {
        wait(TIMING.perLetter, () => type(count + 1));
      } else {
        setDrifting(true);
        wait(TIMING.hold, () => erase(count - 1));
      }
    };
    const erase = (count: number) => {
      setTyped(count);

      if (count > 0) {
        wait(TIMING.perErase, () => erase(count - 1));
      } else {
        wait(TIMING.gap, () => type(1));
      }
    };

    wait(TIMING.typeStart, () => type(1));

    return () => window.clearTimeout(timer);
  }, [inView, reduceMotion]);

  const doneTyping = typed === MESSAGE.length;

  // Drift between resting spots once the message has been written the first time.
  useEffect(() => {
    if (!drifting || reduceMotion) {
      return;
    }

    const interval = window.setInterval(
      () => setSpot((current) => (current + 1) % SPOTS.length),
      TIMING.drift,
    );

    return () => window.clearInterval(interval);
  }, [drifting, reduceMotion]);

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
