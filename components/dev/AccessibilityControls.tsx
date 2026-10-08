"use client";

import { type DialConfig, useDialKit } from "dialkit";
import { useEffect } from "react";
import { setAccessibilityOptions } from "../../lib/accessibilityOptions";

/*
 * Compare the current site with its accessibility pass (WCAG AA fixes from the home page audit):
 *  - nav contrast: navbar labels reach ≥ 4.5:1 over the brightest parts of the painting
 *  - nav label size: navbar labels at 12px instead of 9.9px
 *  - nav focus ring: a visible outline on keyboard focus (2.4.7)
 *  - card loops: card animations stop on their last frame after 3 loops (2.2.2)
 * "current" and "accessibility pass" are presets; "custom" uses the individual controls.
 * The site ships with the accessibility pass.
 */
const accessibilityControls = {
  version: {
    type: "select",
    options: ["current", "accessibility pass", "custom"],
    default: "accessibility pass",
  },
  navContrast: {
    type: "select",
    options: ["none", "label opacity 0.75", "darker glass", "both"],
    default: "label opacity 0.75",
  },
  navLabelSize: [12, 9.9, 14, 0.1],
  navFocusRing: true,
  cardLoops: { type: "select", options: ["forever", "1", "2", "3", "4", "5"], default: "3" },
} satisfies DialConfig;

const CURRENT = { navContrast: "none", navLabelSize: 9.92, navFocusRing: false, cardLoops: "forever" };
const PASS = { navContrast: "label opacity 0.75", navLabelSize: 12, navFocusRing: true, cardLoops: "3" };

const contrastAttribute: Record<string, string> = {
  "label opacity 0.75": "opacity",
  "darker glass": "glass",
  both: "both",
};

export function AccessibilityControls() {
  const controls = useDialKit("Accessibility", accessibilityControls, {
    defaultCollapsed: true,
    id: "accessibility",
    persist: true,
  });

  const active =
    controls.version === "current" ? CURRENT : controls.version === "accessibility pass" ? PASS : controls;

  useEffect(() => {
    const root = document.documentElement;
    const contrast = contrastAttribute[active.navContrast];

    if (contrast) {
      root.dataset.a11yNavContrast = contrast;
    } else {
      delete root.dataset.a11yNavContrast;
    }

    // Only override the label size when it differs, so the current per-breakpoint sizes stay.
    if (active.navLabelSize !== CURRENT.navLabelSize) {
      root.style.setProperty("--a11y-nav-label-size", `${active.navLabelSize}px`);
      root.dataset.a11yNavLabelSize = "true";
    } else {
      root.style.removeProperty("--a11y-nav-label-size");
      delete root.dataset.a11yNavLabelSize;
    }

    root.dataset.a11yNavFocusRing = String(active.navFocusRing);

    setAccessibilityOptions({
      cardLoops: active.cardLoops === "forever" ? Number.POSITIVE_INFINITY : Number(active.cardLoops),
    });
  }, [active.navContrast, active.navLabelSize, active.navFocusRing, active.cardLoops]);

  return null;
}
