"use client";

import { type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type HeroCrossfadeShellProps = {
  children: ReactNode;
};

/* ─────────────────────────────────────────────────────────
 * SCROLL REVEAL STORYBOARD
 *
 * Plays on a timer once the visitor scrolls past `startAfterScroll`, so it runs at the same
 * speed however fast they scroll. Scrolling back to the top plays it in reverse.
 *
 *    0.00s   first fold boxes fade out (in place)
 *    0.35s   boxes gone; dark overlay starts darkening
 *    0.70s   Selected work starts fading in ("scroll in": sits below the fold)
 *    1.05s   overlay settled ("fade in place": work fades in on the first fold now)
 * ───────────────────────────────────────────────────────── */
const scrollRevealControls = {
  startAfterScroll: [25, 0, 400, 5],
  boxesFade: [0.35, 0.1, 2, 0.05],
  overlayFade: [0.7, 0.1, 3, 0.05],
  overlayDarkness: [0.7, 0, 1, 0.01],
  workEntrance: { type: "select", options: ["scroll in", "fade in place"], default: "scroll in" },
  workDelay: [0.7, 0, 3, 0.05],
  workFade: [0.3, 0.1, 2, 0.05],
  workPosition: [12, 0, 60, 1],
  easing: { type: "select", options: ["smooth", "gentle", "linear"], default: "smooth" },
  replay: { type: "action", label: "Replay reveal" },
  reverse: { type: "action", label: "Play in reverse" },
} satisfies DialConfig;

type ScrollRevealControls = ResolvedValues<typeof scrollRevealControls>;

const easings: Record<string, string> = {
  smooth: "cubic-bezier(0.45, 0, 0.2, 1)",
  gentle: "cubic-bezier(0.22, 1, 0.36, 1)",
  linear: "linear",
};

const seconds = (value: number) => `${Math.round(value * 1000)}ms`;

// Where the work section's top sits before scrolling, in vh, when it scrolls in from below.
const scrollInRestTop = 75;

// Forward plays boxes → overlay → work. Reverse mirrors the same schedule so it unwinds in order.
const applyTiming = (page: HTMLElement, controls: ScrollRevealControls, revealed: boolean) => {
  const fadesInPlace = controls.workEntrance === "fade in place";
  const overlayEnd = controls.boxesFade + controls.overlayFade;
  const forward = {
    boxes: { delay: 0, duration: controls.boxesFade },
    overlay: { delay: controls.boxesFade, duration: controls.overlayFade },
    // Fading in place starts as soon as the overlay has settled; Work Delay applies to scrolling in.
    work: {
      delay: fadesInPlace ? overlayEnd : controls.workDelay,
      duration: controls.workFade,
    },
  };
  const total = Math.max(
    ...Object.values(forward).map(({ delay, duration }) => delay + duration),
  );

  for (const [name, { delay, duration }] of Object.entries(forward)) {
    const directionalDelay = revealed ? delay : total - (delay + duration);

    page.style.setProperty(`--reveal-${name}-duration`, seconds(duration));
    page.style.setProperty(`--reveal-${name}-delay`, seconds(directionalDelay));
  }

  page.style.setProperty(
    "--work-rest-top",
    `${fadesInPlace ? controls.workPosition : scrollInRestTop}vh`,
  );
  page.style.setProperty("--reveal-overlay-darkness", String(controls.overlayDarkness));
  page.style.setProperty("--reveal-ease", easings[controls.easing] ?? easings.smooth);
};

export function HeroCrossfadeShell({ children }: HeroCrossfadeShellProps) {
  const shellRef = useRef<HTMLElement>(null);
  const revealedRef = useRef(false);
  const controlsRef = useRef<ScrollRevealControls | null>(null);

  const setRevealed = useCallback((revealed: boolean, instant = false) => {
    const page = shellRef.current?.parentElement;
    const controls = controlsRef.current;

    if (!page || !controls) {
      return;
    }

    revealedRef.current = revealed;
    applyTiming(page, controls, revealed);

    if (instant) {
      page.dataset.revealInstant = "true";
    }

    page.dataset.revealed = String(revealed);

    if (instant) {
      // Let the instant state paint before transitions come back.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          delete page.dataset.revealInstant;
        });
      });
    }
  }, []);

  const controls = useDialKit("Scroll reveal", scrollRevealControls, {
    defaultCollapsed: true,
    id: "home-scroll-reveal",
    persist: true,
    onAction: (action) => {
      if (action === "replay") {
        setRevealed(false, true);
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => setRevealed(true)));
      }

      if (action === "reverse") {
        setRevealed(false);
      }
    },
  });

  controlsRef.current = controls;

  // Panel edits retime the current direction without replaying it.
  useEffect(() => {
    const page = shellRef.current?.parentElement;

    if (page) {
      applyTiming(page, controls, revealedRef.current);
    }
  }, [controls]);

  useEffect(() => {
    const isPastTrigger = () => window.scrollY > (controlsRef.current?.startAfterScroll ?? 25);
    const onScroll = () => {
      const revealed = isPastTrigger();

      if (revealed !== revealedRef.current) {
        setRevealed(revealed);
      }
    };

    // Land in the right state on load (including returning to #work) without animating.
    setRevealed(isPastTrigger(), true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [setRevealed]);

  return (
    <section
      id="intro"
      className="home-page__hero-shell"
      ref={shellRef}
    >
      {children}
    </section>
  );
}
