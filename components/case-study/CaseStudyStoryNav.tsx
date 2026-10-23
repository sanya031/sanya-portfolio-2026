"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CaseStudySectionNavItem } from "./CaseStudySectionRail";

/*
 * Left-hand section list from the Transcript wireframe. The active link turns gold and the
 * motif beside it glides down (or up) to it as the reader scrolls. The list shows from the top of
 * the page and fades out as the closing "Next up" card comes in.
 */
export function CaseStudyStoryNav({
  items,
  cta,
}: {
  items: CaseStudySectionNavItem[];
  cta?: { label: string; href: string };
}) {
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id));
    // The index steps aside when the closing "Next up" card arrives.
    const banners = document.querySelectorAll(".case-study-page__summary-banner");
    const end = banners.length > 1 ? banners[banners.length - 1] : null;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.34;
      let current = 0;
      let currentTop = -Infinity;

      // The last target above the reading line wins; where a group heading and its first
      // sub-link share a target, the sub-link (later in the list) is the one shown as active.
      targets.forEach((target, index) => {
        const top = target?.getBoundingClientRect().top;

        if (top !== undefined && top <= line && top >= currentTop) {
          current = index;
          currentTop = top;
        }
      });

      setActive(current);
      setVisible(!end || end.getBoundingClientRect().top > window.innerHeight * 0.6);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Centre the motif on the active link, stepping in with the indent on sub-links.
  useLayoutEffect(() => {
    const link = linkRefs.current[active];

    if (link) {
      setMarker({
        x: parseFloat(getComputedStyle(link).paddingLeft) || 0,
        y: link.offsetTop + link.offsetHeight / 2,
      });
    }
  }, [active]);

  return (
    <nav
      aria-label="Case study sections"
      className="case-study-story-nav"
      data-visible={visible}
      ref={navRef}
    >
      {marker ? (
        <img
          alt=""
          aria-hidden="true"
          className="case-study-story-nav__marker"
          src="/assets/home-motif-hover.svg"
          style={{ transform: `translate(${marker.x}px, ${marker.y}px) translateY(-50%)` }}
        />
      ) : null}
      {items.map((item, index) => (
        <a
          aria-current={index === active ? "location" : undefined}
          className="case-study-story-nav__link"
          data-active={index === active}
          data-secondary={item.secondary}
          href={`#${item.id}`}
          key={`${item.id}-${item.label}`}
          onClick={(event) => {
            const target = document.getElementById(item.id);

            if (target) {
              event.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              window.history.replaceState(null, "", `#${item.id}`);
            }
          }}
          ref={(node) => {
            linkRefs.current[index] = node;
          }}
        >
          {item.label}
        </a>
      ))}
      {cta ? (
        <a className="case-study-story-nav__cta" href={cta.href} rel="noopener noreferrer" target="_blank">
          {cta.label}
          <svg aria-hidden="true" className="case-study-story-nav__cta-arrow" viewBox="0 0 10 10">
            <path d="M2.5 7.5 7.5 2.5M3.5 2.5h4v4" />
          </svg>
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      ) : null}
    </nav>
  );
}
