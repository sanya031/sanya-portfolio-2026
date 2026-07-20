"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useState } from "react";
import type { CaseStudyAsset } from "../../data/caseStudyPages";
import { CaseStudyMedia } from "./CaseStudyMedia";

export type AutoScrollCarouselProps = {
  items: CaseStudyAsset[];
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

export function AutoScrollCarousel({ items }: AutoScrollCarouselProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const autoScrollPlugins = useMemo(
    () =>
      prefersReducedMotion
        ? []
        : [
            AutoScroll({
              playOnInit: true,
              speed: isHovering ? 0.35 : 0.85,
              startDelay: 650,
              stopOnFocusIn: false,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ],
    [isHovering, prefersReducedMotion],
  );
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      loop: true,
      skipSnaps: true,
    },
    autoScrollPlugins,
  );

  return (
    <section
      className="case-study-page__carousel-wrap"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      <div
        className="case-study-page__carousel"
        ref={emblaRef}
      >
        <div className="case-study-page__carousel-track">
          {items.map((item) => (
            <div className="case-study-page__carousel-slide" key={item.src}>
              <CaseStudyMedia asset={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
