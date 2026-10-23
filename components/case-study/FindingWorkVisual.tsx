"use client";

import { AnimatePresence, motion, type Transition, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { bandSquiggles, Shot, Squiggles } from "./transcriptStoryParts";

/* ─────────────────────────────────────────────────────────
 * FINDING WORK STORYBOARD (cycles while the container is on screen)
 *
 *     0ms   the active problem's bar starts filling, top to bottom
 *  6000ms   bar is full; the next problem becomes active:
 *             - its body text opens while the previous one closes
 *             - its screenshot fades and settles in as the previous one fades out
 *             - in the container label, the stage number and word roll down to the next
 *               one while WORK stays put, its gap easing to the new word's width
 *           after the last problem it starts again from the first
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  fill: 6000, // ms the bar takes to fill before moving on
};

const SMOOTH: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

const size = { w: 716, h: 352 };

const problems = [
  {
    stage: "01/ Finding",
    title: "Too many competing actions",
    body: "Repeated Claim buttons, colorful tags, and reward icons competed for attention, making it harder to compare the work itself.",
    shots: [
      {
        src: "old-review-table.webp",
        alt: "The original review table, with a Claim button, coloured tags and a reward icon on every row",
        box: { x: 256, y: 81, w: 505, h: 281 },
      },
      {
        src: "old-review-row.webp",
        alt: "One row of the original table, zoomed in to show its tags, reward coins and Claim button competing for attention",
        box: { x: 221, y: 230, w: 484, h: 56 },
        row: true,
      },
    ],
  },
  {
    stage: "02/ Claiming",
    title: "Commitment before context",
    body: "Claiming was the only way to inspect a transcript, immediately starting a reservation that could leave it unavailable to others if unfinished.",
    shots: [
      {
        src: "claim-editor.webp",
        alt: "The editor straight after claiming, already counting down 23 hours to review and submit",
        box: { x: 256, y: 81, w: 633, h: 367 },
      },
    ],
  },
  {
    stage: "03/ Editing",
    title: "Tools disconnected from the task",
    body: "The existing interface separated recording, manage speakers and other controls, making it harder to move between related editing tasks.",
    shots: [
      {
        src: "editor-tools.webp",
        alt: "The original transcript editor, with its formatting toolbar and transcript text away from the recording and speaker controls",
        // Runs past the right edge so the container clips it flush.
        box: { x: 256, y: 81, w: 480, h: 367 },
      },
    ],
  },
  {
    stage: "04/ Tracking",
    title: "Difficult to track work",
    body: "Similar table layouts and hard-to-scan statuses made it difficult to identify which reviews needed attention.",
    shots: [
      {
        src: "old-my-account.webp",
        alt: "The original My Account page, with current and past jobs in similar tables and small Expired statuses",
        // Runs past the bottom (and right) edge so there's no gap under it.
        box: { x: 256, y: 81, w: 530, h: 281 },
      },
    ],
  },
];

export function FindingWorkVisual() {
  const rootRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  // The bar only fills while the container can be seen, so nobody misses a stage.
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.4,
    });

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  const playing = onScreen && !reduceMotion;
  const next = () => setActive((index) => (index + 1) % problems.length);

  return (
    <figure
      className="transcript-story__canvas transcript-story__finding"
      ref={rootRef}
      style={{ background: "#a6e1ec", ["--finding-fill" as string]: `${TIMING.fill}ms` }}
    >
      <Squiggles items={bandSquiggles("discovery")} size={size} />
      <figcaption>
        <RollingStageLabel active={active} />
      </figcaption>

      <ul className="transcript-story__problems">
        {problems.map((problem, index) => {
          const isActive = index === active;

          return (
            <li data-active={isActive} key={problem.title}>
              <span aria-hidden="true" className="transcript-story__problem-track">
                {isActive ? (
                  <span
                    className="transcript-story__problem-fill"
                    data-playing={playing}
                    // A new key restarts the fill whenever the active problem changes.
                    key={active}
                    onAnimationEnd={next}
                  />
                ) : null}
              </span>
              <button aria-expanded={isActive} onClick={() => setActive(index)} type="button">
                {problem.title}
              </button>
              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="transcript-story__problem-body"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={SMOOTH}
                  >
                    <p>{problem.body}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="transcript-story__finding-shots">
        {problems.map((problem, index) => (
          <div
            aria-hidden={index !== active}
            className="transcript-story__finding-stage"
            data-active={index === active}
            key={problem.title}
          >
            {problem.shots.map((shot) => (
              <Shot
                alt={shot.alt}
                box={shot.box}
                className={`transcript-story__shot--framed${"row" in shot ? " transcript-story__shot--row" : ""}`}
                key={shot.src}
                size={size}
                src={shot.src}
              />
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

// "01/ FINDING WORK": only the number and first word roll; WORK stays where it is.
function RollingStageLabel({ active }: { active: number }) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<number[]>([]);

  // Each stage's width, so the gap before WORK can ease between words.
  useEffect(() => {
    const measure = measureRef.current;

    if (!measure) {
      return;
    }

    const read = () =>
      setWidths([...measure.children].map((child) => (child as HTMLElement).offsetWidth));
    const observer = new ResizeObserver(read);

    observer.observe(measure);
    document.fonts.ready.then(read);

    return () => observer.disconnect();
  }, []);

  return (
    <p className="transcript-story__label transcript-story__rolling-label" style={{ color: "#315a62" }}>
      <motion.span
        animate={widths[active] ? { width: widths[active] } : undefined}
        className="transcript-story__rolling-slot"
        initial={false}
        transition={SMOOTH}
      >
        <AnimatePresence initial={false}>
          <motion.span
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            initial={{ y: "-100%", opacity: 0 }}
            key={active}
            transition={SMOOTH}
          >
            {problems[active].stage}
          </motion.span>
        </AnimatePresence>
      </motion.span>{" "}
      work
      <span aria-hidden="true" className="transcript-story__rolling-measure" ref={measureRef}>
        {problems.map((problem) => (
          <span key={problem.stage}>{problem.stage}</span>
        ))}
      </span>
    </p>
  );
}
