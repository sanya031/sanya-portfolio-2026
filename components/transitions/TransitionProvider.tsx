"use client";

import type { ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const routeHoldEase = [0.76, 0, 0.24, 1] as const;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <LayoutGroup id="case-study-transition">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          animate={{ opacity: 1 }}
          className="route-transition-shell"
          exit={{
            opacity: 1,
            transition: {
              duration: shouldReduceMotion ? 0.01 : 0.78,
              ease: routeHoldEase,
            },
          }}
          initial={false}
          key={pathname}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
