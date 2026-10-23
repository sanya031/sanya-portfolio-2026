import Link from "next/link";

// "Home / BTC Transcript Review", pinned above the section index on wide screens and above the
// title where the index is hidden.
export function CaseStudyBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="case-study-breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
