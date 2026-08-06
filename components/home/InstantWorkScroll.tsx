"use client";

import { useLayoutEffect } from "react";

export function InstantWorkScroll() {
  useLayoutEffect(() => {
    const shouldJumpToWork =
      window.sessionStorage.getItem("portfolio-instant-work-scroll") === "true";

    if (!shouldJumpToWork) {
      return;
    }

    window.sessionStorage.removeItem("portfolio-instant-work-scroll");

    const root = document.documentElement;
    const body = document.body;
    const previousRootScrollBehavior = root.style.scrollBehavior;
    const previousBodyScrollBehavior = body.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    document.getElementById("work")?.scrollIntoView({ block: "start", behavior: "auto" });
    window.history.replaceState(null, "", "/#work");

    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousRootScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    });
  }, []);

  return null;
}
