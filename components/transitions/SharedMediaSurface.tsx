"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const sharedMediaEase = [0.76, 0, 0.24, 1] as const;

export type SharedMediaSurfaceProps = {
  children: ReactNode;
  className: string;
  layoutId?: string;
};

export function SharedMediaSurface({
  children,
  className,
  layoutId,
}: SharedMediaSurfaceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!layoutId || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      layoutId={layoutId}
      transition={{
        layout: {
          duration: 0.78,
          ease: sharedMediaEase,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
