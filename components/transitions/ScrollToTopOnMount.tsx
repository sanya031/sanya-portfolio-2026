"use client";

import { useEffect } from "react";

export function ScrollToTopOnMount() {
  useEffect(() => {
    // "instant" rather than "auto": the page sets scroll-behavior: smooth, which would otherwise
    // glide up from wherever the previous page was left.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return null;
}
