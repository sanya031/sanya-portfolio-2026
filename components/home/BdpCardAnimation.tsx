"use client";

import { motion, type Transition, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * BDP CARD STORYBOARD (plays once, when the card scrolls into view)
 *
 *    0ms   homepage screenshot fills the card, inside the inset
 *  450ms   it eases down to the centre
 * 1150ms   the other three screens slide out from behind it into a 2×2 grid
 *          (staggered 70ms) and the homepage settles into the top-left cell
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  centre: 450, // homepage shrinks to the centre
  grid: 1150, // screens split into the grid
};

const MOVE: Transition = { type: "spring", visualDuration: 0.75, bounce: 0 };
const STAGGER = 0.07; // seconds between the three screens leaving the homepage

type Stage = "full" | "centre" | "grid";

const screens = [
  { id: "field", src: "/assets/case-study-2/card-animation/field.webp" },
  { id: "explore", src: "/assets/case-study-2/card-animation/explore.webp" },
  { id: "contribute", src: "/assets/case-study-2/card-animation/contribute.webp" },
] as const;

export function BdpCardAnimation({ ariaLabel }: { ariaLabel: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("full");

  useEffect(() => {
    if (reduceMotion) {
      setStage("grid");
      return;
    }

    if (!isInView) {
      return;
    }

    const timers = [
      window.setTimeout(() => setStage("centre"), TIMING.centre),
      window.setTimeout(() => setStage("grid"), TIMING.grid),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isInView, reduceMotion]);

  const isGrid = stage === "grid";

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
          animate={{ opacity: isGrid ? 1 : 0 }}
          className="bdp-card-animation__screen"
          data-screen={screen.id}
          initial={false}
          key={screen.id}
          layout
          src={screen.src}
          style={{ borderRadius: 8 }}
          transition={{
            ...MOVE,
            delay: isGrid ? index * STAGGER : 0,
            opacity: { duration: 0.25, delay: isGrid ? index * STAGGER : 0 },
          }}
        />
      ))}
      <motion.img
        alt=""
        className="bdp-card-animation__screen"
        data-screen="hero"
        layout
        src="/assets/case-study-2/card-animation/hero.webp"
        style={{ borderRadius: 8 }}
        transition={MOVE}
      />
    </div>
  );
}
