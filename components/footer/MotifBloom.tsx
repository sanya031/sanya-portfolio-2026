"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  MOTIF_GOLD_PATHS,
  MOTIF_PETAL_FILLS,
  MOTIF_PETAL_OUTLINES,
  MOTIF_VIEWBOX,
} from "../../data/footerMotifPaths";
import { MOTIF_GOLD, type MotifColour } from "../../data/motifPalette";

/* ─────────────────────────────────────────────────────────
 * MOTIF BLOOM STORYBOARD (one motif, spawned where the footer was clicked)
 *
 *    0ms   gold heart scrolls trace their outlines
 *  500ms   gold fills in; petal stems and outlines draw outwards
 * 1000ms   petals fill with this motif's colour
 * 3000ms   after resting, the motif fades and shrinks away
 * 3500ms   removed
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  goldFill: 0.5, // gold shapes fill once their outline is traced
  petalOutlines: 0.5, // petal stems and outlines start drawing
  petalFill: 1.0, // petals colour in
  leave: 3.0, // motif starts fading away
  remove: 3500, // ms: motif is removed from the page
};

const DRAW: Transition = { duration: 0.7, ease: [0.45, 0, 0.2, 1] };
const FILL: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
const LEAVE: Transition = { duration: 0.5, ease: [0.45, 0, 0.2, 1] };

export type Bloom = {
  id: number;
  x: number;
  y: number;
  size: number;
  colour: MotifColour;
};

type MotifBloomProps = {
  bloom: Bloom;
  onDone: (id: number) => void;
};

type Stage = "blank" | "drawn" | "leaving";

export function MotifBloom({ bloom, onDone }: MotifBloomProps) {
  const reduceMotion = useReducedMotion();
  // The site's route transition wrapper turns off mount animations for everything inside it,
  // so the bloom renders blank first and animates by changing stage on the next frame.
  const [stage, setStage] = useState<Stage>("blank");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setStage("drawn"));
    const timers = [
      window.setTimeout(() => setStage("leaving"), TIMING.leave * 1000),
      window.setTimeout(() => onDone(bloom.id), TIMING.remove),
    ];

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [bloom.id, onDone]);

  const drawn = stage !== "blank";
  const leaving = stage === "leaving";
  const lineLength = drawn || reduceMotion ? 1 : 0;

  return (
    <motion.svg
      animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 0.85 : 1 }}
      className="site-footer__bloom"
      height={bloom.size}
      initial={false}
      style={{ left: bloom.x, top: bloom.y }}
      transition={LEAVE}
      viewBox={MOTIF_VIEWBOX}
      width={bloom.size}
    >
      {MOTIF_GOLD_PATHS.map((d) => (
        <motion.path
          animate={{ pathLength: lineLength, fillOpacity: drawn ? 1 : 0 }}
          d={d}
          fill={MOTIF_GOLD}
          initial={false}
          key={d}
          stroke={MOTIF_GOLD}
          strokeWidth={0.6}
          transition={{
            pathLength: DRAW,
            fillOpacity: { ...FILL, delay: reduceMotion ? 0 : TIMING.goldFill },
          }}
        />
      ))}
      {MOTIF_PETAL_FILLS.map((d) => (
        <motion.path
          animate={{ fillOpacity: drawn ? 1 : 0 }}
          d={d}
          fill={bloom.colour.fill}
          initial={false}
          key={d}
          transition={{ ...FILL, delay: reduceMotion ? 0 : TIMING.petalFill }}
        />
      ))}
      {MOTIF_PETAL_OUTLINES.map((d) => (
        <motion.path
          animate={{ pathLength: lineLength }}
          d={d}
          fill="none"
          initial={false}
          key={d}
          stroke={bloom.colour.outline}
          transition={{ ...DRAW, delay: reduceMotion ? 0 : TIMING.petalOutlines }}
        />
      ))}
    </motion.svg>
  );
}
