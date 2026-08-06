"use client";

import { useEffect, useState } from "react";

export type CaseStudySectionNavItem = {
  id: string;
  label: string;
  secondary?: boolean;
};

type CaseStudySectionRailProps = {
  items: CaseStudySectionNavItem[];
};

export function CaseStudySectionRail({ items }: CaseStudySectionRailProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const uniqueItems = items.filter(
      (item, index, allItems) => allItems.findIndex((candidate) => candidate.id === item.id) === index,
    );
    const sectionItems = uniqueItems
      .map((item) => ({
        element: document.getElementById(item.id),
        id: item.id,
      }))
      .filter(
        (sectionItem): sectionItem is { element: HTMLElement; id: string } =>
          Boolean(sectionItem.element),
      );

    if (!sectionItems.length) {
      return undefined;
    }

    let frame = 0;

    const updateActiveItem = () => {
      frame = 0;
      const scrollElement = document.scrollingElement ?? document.documentElement;
      const targetY = scrollElement.scrollTop + window.innerHeight * 0.34;
      const activeItem = sectionItems
        .map((sectionItem) => ({
          ...sectionItem,
          top: sectionItem.element.getBoundingClientRect().top + scrollElement.scrollTop,
        }))
        .filter(({ top }) => top <= targetY)
        .sort((a, b) => b.top - a.top)[0];

      setActiveId(activeItem?.id ?? items[0]?.id ?? "");
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items]);

  return (
    <nav className="case-study-section-rail" aria-label="Case study sections">
      <div className="case-study-section-rail__lines" aria-hidden="true">
        {items.map((item, index) => (
          <span
            className="case-study-section-rail__line"
            data-active={activeId === item.id}
            data-secondary={item.secondary}
            key={`line-${item.id}-${index}`}
          />
        ))}
      </div>

      <div className="case-study-section-rail__panel">
        {items.map((item, index) => (
          <a
            className="case-study-section-rail__link"
            data-active={activeId === item.id}
            data-secondary={item.secondary}
            href={`#${item.id}`}
            key={`${item.id}-${index}`}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
