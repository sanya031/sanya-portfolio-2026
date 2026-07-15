"use client";

import { useEffect, useRef } from "react";
import type { CaseStudyAsset } from "../../data/caseStudyPages";
import { CaseStudyMedia } from "./CaseStudyMedia";

export type AutoScrollCarouselProps = {
  items: CaseStudyAsset[];
};

export function AutoScrollCarousel({ items }: AutoScrollCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const scroller = scrollerRef.current;

      if (scroller && !isPointerDownRef.current) {
        const delta = time - lastTime;
        scroller.scrollLeft += delta * 0.018;

        if (scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1) {
          scroller.scrollLeft = 0;
        }
      }

      lastTime = time;
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="case-study-page__carousel-wrap">
      <div
        className="case-study-page__carousel"
        onPointerDown={(event) => {
          const scroller = scrollerRef.current;

          if (!scroller) {
            return;
          }

          isPointerDownRef.current = true;
          dragStartXRef.current = event.clientX;
          dragScrollLeftRef.current = scroller.scrollLeft;
          scroller.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const scroller = scrollerRef.current;

          if (!scroller || !isPointerDownRef.current) {
            return;
          }

          scroller.scrollLeft = dragScrollLeftRef.current - (event.clientX - dragStartXRef.current);
        }}
        onPointerLeave={() => {
          isPointerDownRef.current = false;
        }}
        onPointerUp={() => {
          isPointerDownRef.current = false;
        }}
        ref={scrollerRef}
      >
        {items.map((item) => (
          <CaseStudyMedia asset={item} key={item.src} />
        ))}
      </div>
    </section>
  );
}
