"use client";

import { type DialConfig, useDialKit } from "dialkit";
import Link from "next/link";

/*
 * "← Home / BTC Transcript Review". Five placements to compare from the Page navigation panel:
 *  - hero: above the title, scrolls away with it
 *  - index header: pinned above the section index, so all wayfinding sits in one column
 *  - top bar: a thin frosted bar across the top, aligned to the reading column
 *  - corner pill: a small floating pill in the top-left corner
 *  - bottom corner: pinned bottom-left, out of the way of the index and the content
 */
const pageNavigationControls = {
  placement: {
    type: "select",
    options: ["hero", "index header", "top bar", "corner pill", "bottom corner"],
    default: "index header",
  },
} satisfies DialConfig;

export function CaseStudyBreadcrumb({ current }: { current: string }) {
  const { placement } = useDialKit("Page navigation", pageNavigationControls, {
    defaultCollapsed: true,
    id: "case-study-page-navigation",
    persist: true,
  });

  return (
    <nav aria-label="Breadcrumb" className="case-study-breadcrumb" data-placement={placement}>
      <ol>
        <li>
          <Link href="/">
            <span aria-hidden="true">←</span> Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
