"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const revealEase = [0.22, 1, 0.36, 1] as const;

export function HeroContentReveal({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="case-study-page__hero-copy"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.45,
                duration: 0.55,
                ease: revealEase,
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
