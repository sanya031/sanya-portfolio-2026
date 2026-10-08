"use client";

import { type Easing, motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────
 * BDP CARD STORYBOARD (loops every 5.2s)
 *
 *    0.0s   homepage screenshot fills the card
 *    0.5s   it shrinks to the centre
 *    1.3s   the other three screens slide out from behind it into a 2×2 grid
 *    2.0s   grid settles and holds
 *    4.4s   grid folds back behind the homepage, which grows to fill the card
 *    5.2s   loop
 * ───────────────────────────────────────────────────────── */
const LOOP = 5.2;

const TIMING = {
  shrinkStart: 0.5,
  shrinkEnd: 1.1,
  splitStart: 1.3,
  splitEnd: 2.0,
  foldStart: 4.4,
  foldEnd: 5.0,
};

// Each screen is laid out in its grid cell. Offsets (as % of the cell) move a cell's centre to
// the card's centre; scales grow a cell to the centred size or to fill the card.
const CELL = { offsetX: 51.5, offsetY: 51.03, centredScale: 1.031, fullScale: 2.062 };

const EASE_IN_OUT: Easing = [0.65, 0, 0.35, 1];
const EASE_OUT: Easing = [0.22, 1, 0.36, 1];
const HOLD: Easing = "linear";

const at = (seconds: number) => seconds / LOOP;

type Screen = {
  id: string;
  src: string;
  alt: string;
  // Direction from this cell's position toward the card centre.
  toCentre: { x: 1 | -1; y: 1 | -1 };
};

const screens: Screen[] = [
  { id: "field", src: "/assets/case-study-2/card-animation/field.webp", alt: "BDP footer illustration", toCentre: { x: -1, y: 1 } },
  { id: "explore", src: "/assets/case-study-2/card-animation/explore.webp", alt: "BDP explore your path section", toCentre: { x: 1, y: -1 } },
  { id: "contribute", src: "/assets/case-study-2/card-animation/contribute.webp", alt: "BDP contribute page", toCentre: { x: -1, y: -1 } },
];

const hero: Screen = {
  id: "hero",
  src: "/assets/case-study-2/card-animation/hero.webp",
  alt: "BDP homepage hero",
  toCentre: { x: 1, y: 1 },
};

const centred = (screen: Screen) => ({
  x: `${CELL.offsetX * screen.toCentre.x}%`,
  y: `${CELL.offsetY * screen.toCentre.y}%`,
});

const heroKeyframes = () => {
  const toCentre = centred(hero);
  const { fullScale: full, centredScale: mid } = CELL;

  return {
    animate: {
      x: [toCentre.x, toCentre.x, toCentre.x, toCentre.x, "0%", "0%", toCentre.x, toCentre.x],
      y: [toCentre.y, toCentre.y, toCentre.y, toCentre.y, "0%", "0%", toCentre.y, toCentre.y],
      scale: [full, full, mid, mid, 1, 1, full, full],
    },
    transition: {
      duration: LOOP,
      repeat: Infinity,
      times: [
        0,
        at(TIMING.shrinkStart),
        at(TIMING.shrinkEnd),
        at(TIMING.splitStart),
        at(TIMING.splitEnd),
        at(TIMING.foldStart),
        at(TIMING.foldEnd),
        1,
      ],
      ease: [HOLD, EASE_IN_OUT, HOLD, EASE_OUT, HOLD, EASE_IN_OUT, HOLD],
    },
  };
};

const screenKeyframes = (screen: Screen) => {
  const toCentre = centred(screen);

  return {
    animate: {
      x: [toCentre.x, toCentre.x, "0%", "0%", toCentre.x, toCentre.x],
      y: [toCentre.y, toCentre.y, "0%", "0%", toCentre.y, toCentre.y],
      scale: [CELL.centredScale, CELL.centredScale, 1, 1, CELL.centredScale, CELL.centredScale],
      opacity: [0, 0, 1, 1, 0, 0],
    },
    transition: {
      duration: LOOP,
      repeat: Infinity,
      times: [0, at(TIMING.splitStart), at(TIMING.splitEnd), at(TIMING.foldStart), at(TIMING.foldEnd), 1],
      ease: [HOLD, EASE_OUT, HOLD, EASE_IN_OUT, HOLD],
      opacity: {
        duration: LOOP,
        repeat: Infinity,
        times: [0, at(TIMING.splitStart), at(TIMING.splitStart + 0.2), at(TIMING.foldStart + 0.3), at(TIMING.foldEnd), 1],
      },
    },
  };
};

export function BdpCardAnimation({ ariaLabel }: { ariaLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { margin: "10% 0px" });
  const reduceMotion = useReducedMotion();
  const animating = isInView && !reduceMotion;
  const heroMotion = heroKeyframes();

  return (
    <div aria-label={ariaLabel} className="bdp-card-animation" ref={rootRef} role="img">
      {screens.map((screen) => {
        const screenMotion = screenKeyframes(screen);

        return (
          <motion.img
            alt=""
            animate={animating ? screenMotion.animate : { x: "0%", y: "0%", scale: 1, opacity: 1 }}
            className="bdp-card-animation__screen"
            data-screen={screen.id}
            initial={false}
            key={screen.id}
            src={screen.src}
            transition={animating ? screenMotion.transition : { duration: 0 }}
          />
        );
      })}
      <motion.img
        alt=""
        animate={animating ? heroMotion.animate : { x: "0%", y: "0%", scale: 1 }}
        className="bdp-card-animation__screen"
        data-screen={hero.id}
        initial={false}
        src={hero.src}
        transition={animating ? heroMotion.transition : { duration: 0 }}
      />
    </div>
  );
}
