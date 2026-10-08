"use client";

import { useInView } from "motion/react";
import { type RefObject, useEffect, useState } from "react";

// The home page reveals the work section on a timer once the visitor scrolls (see
// HeroCrossfadeShell). Calls `onReady` once that reveal has finished, so the card is visible.
const whenWorkRevealed = (element: HTMLElement, onReady: () => void) => {
  const page = element.closest<HTMLElement>(".home-page");

  if (!page) {
    onReady();
    return () => {};
  }

  let timer = 0;
  const readRevealMs = () => {
    const style = getComputedStyle(page);
    const delay = Number.parseFloat(style.getPropertyValue("--reveal-work-delay")) || 0;
    const duration = Number.parseFloat(style.getPropertyValue("--reveal-work-duration")) || 0;
    return delay + duration;
  };

  const check = (justRevealed: boolean) => {
    if (page.dataset.revealed !== "true") {
      return;
    }

    observer.disconnect();
    timer = window.setTimeout(onReady, justRevealed ? readRevealMs() : 0);
  };

  const observer = new MutationObserver(() => check(true));
  observer.observe(page, { attributes: true, attributeFilter: ["data-revealed"] });
  check(false);

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
};

/** True once the card is mostly on screen and the home page's work reveal has finished. */
export function useCardAnimationReady(ref: RefObject<HTMLElement | null>) {
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!isInView || !element) {
      return;
    }

    return whenWorkRevealed(element, () => setReady(true));
  }, [isInView, ref]);

  return ready;
}

export type StageCue<Stage> = { at: number; stage: Stage };

/**
 * Plays a timeline of stage changes on repeat once `ready`, restarting every `loopMs`.
 * Pauses (holding the current stage) while the card is off screen and picks up again on return.
 */
export function useStageLoop<Stage>(
  ref: RefObject<HTMLElement | null>,
  ready: boolean,
  cues: StageCue<Stage>[],
  loopMs: number,
  setStage: (stage: Stage) => void,
) {
  const isOnScreen = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (!ready || !isOnScreen) {
      return;
    }

    let timers: number[] = [];
    const playCycle = () => {
      timers = cues.map(({ at, stage }) => window.setTimeout(() => setStage(stage), at));
      timers.push(window.setTimeout(playCycle, loopMs));
    };

    playCycle();

    return () => timers.forEach((timer) => window.clearTimeout(timer));
    // Cues are module constants in the callers, so they never change between renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, isOnScreen, loopMs, setStage]);
}
