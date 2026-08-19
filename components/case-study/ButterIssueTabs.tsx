"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const issues = [
  {
    label: "MIXED STATES",
    media: {
      type: "image",
      src: "/assets/case-study-1/Mixed-layout.png",
      alt: "Mixed state layout showing current and past transcript review jobs",
    },
    title: "Active work and review history supported different goals but shared the same structure.",
    body: "Active reviews needed deadline-focused actions, while history needed completion and payment status. The shared layout blurred those priorities.",
  },
  {
    label: "HIDDEN DISCOVERY",
    media: {
      type: "video",
      src: "/assets/case-study-1/hidden-disc.mp4",
      alt: "Hidden discovery interaction showing contributors finding more transcript work",
    },
    title: "Finding additional reviews became harder once contributors started working.",
    body: "The main CTA disappeared after a review was claimed, so finding more work moved into the profile menu instead of staying visible in the workflow.",
  },
  {
    label: "EARLY COMMITMENT",
    media: {
      type: "image",
      src: "/assets/case-study-1/early-commit.png",
      alt: "Editor screen showing a review already claimed before context is evaluated",
    },
    title: "Claiming happened before contributors had enough context.",
    body: "The 24-hour editing window started immediately, before contributors could judge transcript length, complexity, or fit.",
  },
];

type Highlight = {
  left: number;
  width: number;
};

export function ButterIssueTabs() {
  const tabsRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<Highlight>({ left: 0, width: 0 });
  const activeIndex = hoveredIndex ?? selectedIndex;
  const activeIssue = issues[activeIndex];

  useLayoutEffect(() => {
    const tabs = tabsRef.current;
    const activeChip = chipRefs.current[activeIndex];

    if (!tabs || !activeChip) {
      return;
    }

    const updateHighlight = () => {
      const tabsRect = tabs.getBoundingClientRect();
      const chipRect = activeChip.getBoundingClientRect();

      setHighlight({
        left: chipRect.left - tabsRect.left,
        width: chipRect.width,
      });
    };

    updateHighlight();

    const resizeObserver = new ResizeObserver(updateHighlight);
    resizeObserver.observe(tabs);
    resizeObserver.observe(activeChip);

    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  const highlightStyle = {
    "--butter-highlight-left": `${highlight.left}px`,
    "--butter-highlight-width": `${highlight.width}px`,
  } as CSSProperties;

  return (
    <div className="case-study-page__butter-panel">
      <div
        className="case-study-page__butter-tabs"
        aria-label="Audit issue labels"
        onMouseLeave={() => setHoveredIndex(null)}
        ref={tabsRef}
        style={highlightStyle}
      >
        <span className="case-study-page__butter-highlight" aria-hidden="true" />
        {issues.map((issue, index) => (
          <button
            aria-pressed={selectedIndex === index}
            className="case-study-page__butter-chip"
            data-active={activeIndex === index}
            key={issue.label}
            onClick={() => setSelectedIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            ref={(node) => {
              chipRefs.current[index] = node;
            }}
            type="button"
          >
            {issue.label}
          </button>
        ))}
      </div>
      <div className="case-study-page__butter-container">
        {activeIssue.media.type === "video" ? (
          <video
            autoPlay
            key={activeIssue.media.src}
            loop
            muted
            playsInline
            preload="metadata"
            src={activeIssue.media.src}
            aria-label={activeIssue.media.alt}
          />
        ) : (
          <img src={activeIssue.media.src} alt={activeIssue.media.alt} />
        )}
      </div>
      <div className="case-study-page__butter-copy">
        <h3>{activeIssue.title}</h3>
        <p>{activeIssue.body}</p>
      </div>
    </div>
  );
}
