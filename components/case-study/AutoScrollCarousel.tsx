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
  const autoScrollLeftRef = useRef(0);

  useEffect(() => {
    let animationFrame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const scroller = scrollerRef.current;

      if (scroller && !isPointerDownRef.current) {
        const delta = time - lastTime;
        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

        if (maxScrollLeft > 0) {
          autoScrollLeftRef.current += delta * 0.08;

          if (autoScrollLeftRef.current >= maxScrollLeft - 1) {
            autoScrollLeftRef.current = 0;
          }

          scroller.scrollLeft = autoScrollLeftRef.current;
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
          autoScrollLeftRef.current = scroller.scrollLeft;
          scroller.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const scroller = scrollerRef.current;

          if (!scroller || !isPointerDownRef.current) {
            return;
          }

          scroller.scrollLeft = dragScrollLeftRef.current - (event.clientX - dragStartXRef.current);
          autoScrollLeftRef.current = scroller.scrollLeft;
        }}
        onPointerLeave={() => {
          if (scrollerRef.current) {
            autoScrollLeftRef.current = scrollerRef.current.scrollLeft;
          }

          isPointerDownRef.current = false;
        }}
        onPointerUp={() => {
          if (scrollerRef.current) {
            autoScrollLeftRef.current = scrollerRef.current.scrollLeft;
          }

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
