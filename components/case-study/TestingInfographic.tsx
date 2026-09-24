"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const revealEase = [0.22, 1, 0.36, 1] as const;

const focusAreas = ["Navigation", "Content understanding", "Task flow"];

function useCountUp(target: number, shouldReduceMotion: boolean) {
  const [value, setValue] = useState(shouldReduceMotion ? target : 0);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started || shouldReduceMotion) return;
    setStarted(true);

    const duration = 900;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  };

  return { value, start };
}

export function TestingInfographic() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const { value, start } = useCountUp(6, shouldReduceMotion);

  return (
    <section className="case-study-page__testing-infographic" aria-label="Usability testing summary">
      <motion.div
        className="case-study-page__testing-infographic-stats"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        onViewportEnter={start}
        viewport={{ once: true, amount: 0.5 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: revealEase }}
      >
        <div className="case-study-page__testing-infographic-count">
          <span className="case-study-page__testing-infographic-count-value">{value}</span>
          <span className="case-study-page__testing-infographic-count-label">Moderated sessions</span>
        </div>
        <p className="case-study-page__testing-infographic-note">
          1:1 with developers unfamiliar or only slightly familiar with BDP
        </p>
        <div className="case-study-page__testing-infographic-chips">
          <span className="case-study-page__testing-infographic-chips-label">Tested for</span>
          <ul>
            {focusAreas.map((area, index) => (
              <motion.li
                key={area}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                transition={{ delay: 0.15 + index * 0.12, duration: 0.4, ease: revealEase }}
                viewport={{ once: true, amount: 0.5 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              >
                {area}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="case-study-page__testing-infographic-photos" aria-hidden="true">
        <motion.img
          alt=""
          className="case-study-page__testing-infographic-photo case-study-page__testing-infographic-photo--one"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, rotate: -8 }}
          src="/assets/case-study-2/test1.png"
          transition={{ delay: 0.2, duration: 0.5, ease: revealEase }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotate: -6 }}
        />
        <motion.img
          alt=""
          className="case-study-page__testing-infographic-photo case-study-page__testing-infographic-photo--two"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, rotate: 8 }}
          src="/assets/case-study-2/test2.png"
          transition={{ delay: 0.32, duration: 0.5, ease: revealEase }}
          viewport={{ once: true, amount: 0.4 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotate: 4 }}
        />
      </div>
    </section>
  );
}
