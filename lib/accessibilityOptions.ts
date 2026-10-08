"use client";

import { useSyncExternalStore } from "react";

// Accessibility options that components read at runtime, set from the Accessibility DialKit
// panel (see components/dev/AccessibilityControls). Defaults match the current site.
export type AccessibilityOptions = {
  /** Case study card animations stop on their final frame after this many loops. */
  cardLoops: number;
};

const defaults: AccessibilityOptions = { cardLoops: Number.POSITIVE_INFINITY };

let options = defaults;
const listeners = new Set<() => void>();

export function setAccessibilityOptions(next: AccessibilityOptions) {
  if (next.cardLoops === options.cardLoops) {
    return;
  }

  options = next;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useAccessibilityOptions() {
  return useSyncExternalStore(subscribe, () => options, () => defaults);
}
