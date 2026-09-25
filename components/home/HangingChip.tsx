"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const ROPE_LENGTH = 120;
const ANGULAR_ACCEL = 20;
const DAMPING = 0.7;
const MAX_DRAG_ANGLE = (75 * Math.PI) / 180;
const INITIAL_ANGLE = (-34 * Math.PI) / 180;

// Measured from the chip's two mounting holes as a fraction of the chip's
// rendered width/height, so the ropes stay anchored to the holes at any size.
const HOLE_X_OFFSET_RATIO = 0.4135;
const HOLE_Y_OFFSET_RATIO = 0.0757;

export function HangingChip() {
  const pivotRef = useRef<HTMLDivElement | null>(null);
  const rotatorRef = useRef<HTMLDivElement | null>(null);
  const chipRef = useRef<HTMLDivElement | null>(null);
  const leftRopeRef = useRef<HTMLDivElement | null>(null);
  const rightRopeRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    theta: 0,
    omega: 0,
    dragging: false,
    hasSettled: false,
    lastTheta: 0,
    lastPointerTime: 0,
  });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pivot = pivotRef.current;
    const rotator = rotatorRef.current;
    const chip = chipRef.current;
    const leftRope = leftRopeRef.current;
    const rightRope = rightRopeRef.current;
    if (!pivot || !rotator || !chip || !leftRope || !rightRope) return undefined;

    const layoutRopes = () => {
      const chipWidth = chip.getBoundingClientRect().width;
      if (!chipWidth) return;
      const holeX = chipWidth * HOLE_X_OFFSET_RATIO;
      const holeY = ROPE_LENGTH + chipWidth * HOLE_Y_OFFSET_RATIO;
      const ropeLen = Math.sqrt(holeX * holeX + holeY * holeY);
      const angle = (Math.atan2(holeX, holeY) * 180) / Math.PI;

      leftRope.style.height = `${ropeLen}px`;
      leftRope.style.transform = `rotate(${-angle}deg)`;
      rightRope.style.height = `${ropeLen}px`;
      rightRope.style.transform = `rotate(${angle}deg)`;
    };

    layoutRopes();
    const resizeObserver = new ResizeObserver(layoutRopes);
    resizeObserver.observe(chip);

    const paint = () => {
      rotator.style.transform = `rotate(${(state.current.theta * 180) / Math.PI}deg)`;
    };

    if (prefersReducedMotion) {
      paint();
      return () => resizeObserver.disconnect();
    }

    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = Math.min(0.032, (time - lastTime) / 1000);
      lastTime = time;

      if (!state.current.dragging) {
        const { theta, omega } = state.current;
        const angularAccel = -ANGULAR_ACCEL * Math.sin(theta) - DAMPING * omega;
        state.current.omega = omega + angularAccel * dt;
        state.current.theta = theta + state.current.omega * dt;
      }

      paint();
      frameRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !state.current.hasSettled) {
            state.current.hasSettled = true;
            state.current.theta = INITIAL_ANGLE;
            state.current.omega = 0;
            frameRef.current = requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(pivot);

    const getAngleFromPointer = (clientX: number, clientY: number) => {
      const rect = pivot.getBoundingClientRect();
      const anchorX = rect.left + rect.width / 2;
      const anchorY = rect.top;
      const dx = clientX - anchorX;
      const dy = clientY - anchorY;
      let angle = Math.atan2(dx, dy);
      angle = Math.max(-MAX_DRAG_ANGLE, Math.min(MAX_DRAG_ANGLE, angle));
      return angle;
    };

    const handlePointerDown = (event: PointerEvent) => {
      state.current.dragging = true;
      state.current.omega = 0;
      rotator.setPointerCapture(event.pointerId);
      state.current.lastTheta = state.current.theta;
      state.current.lastPointerTime = performance.now();
      if (frameRef.current === null) {
        lastTime = null;
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!state.current.dragging) return;
      const now = performance.now();
      const dt = Math.max(0.001, (now - state.current.lastPointerTime) / 1000);
      const nextTheta = getAngleFromPointer(event.clientX, event.clientY);
      state.current.omega = (nextTheta - state.current.theta) / dt;
      state.current.theta = nextTheta;
      state.current.lastPointerTime = now;
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!state.current.dragging) return;
      state.current.dragging = false;
      try {
        rotator.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    };

    rotator.addEventListener("pointerdown", handlePointerDown);
    rotator.addEventListener("pointermove", handlePointerMove);
    rotator.addEventListener("pointerup", handlePointerUp);
    rotator.addEventListener("pointercancel", handlePointerUp);

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      rotator.removeEventListener("pointerdown", handlePointerDown);
      rotator.removeEventListener("pointermove", handlePointerMove);
      rotator.removeEventListener("pointerup", handlePointerUp);
      rotator.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return (
    <div className="hanging-chip" ref={pivotRef} aria-hidden="true">
      <div className="hanging-chip__center">
        <div
          className="hanging-chip__rotator"
          ref={rotatorRef}
          style={{ "--rope-length": `${ROPE_LENGTH}px` } as CSSProperties}
        >
          <div className="hanging-chip__ropes">
            <div className="hanging-chip__rope hanging-chip__rope--left" ref={leftRopeRef} />
            <div className="hanging-chip__rope hanging-chip__rope--right" ref={rightRopeRef} />
          </div>
          <div className="hanging-chip__chip" ref={chipRef}>
            <img
              className="hanging-chip__image"
              src="/assets/hanging-chip.png"
              alt=""
              draggable={false}
            />
            <div className="hanging-chip__screen" />
          </div>
        </div>
      </div>
    </div>
  );
}
