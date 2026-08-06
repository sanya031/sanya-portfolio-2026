"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type BackToWorkLinkProps = {
  children: ReactNode;
  className?: string;
};

export function BackToWorkLink({ children, className }: BackToWorkLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.sessionStorage.setItem("portfolio-instant-work-scroll", "true");
    router.push("/", { scroll: false });
  };

  return (
    <Link className={className} href="/#work" onClick={handleClick} scroll={false}>
      {children}
    </Link>
  );
}
