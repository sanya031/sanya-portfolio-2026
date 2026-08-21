"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import type { NavItem } from "../../data/navItems";

export type FloatingNavbarVariant = "dark" | "light";

export type FloatingNavbarProps = {
  items: NavItem[];
  variant?: FloatingNavbarVariant;
  activeItemId?: string;
  autoExpandOnScroll?: boolean;
  hideOnFirstFold?: boolean;
  homeHref?: string;
  lockVariant?: boolean;
  workHref?: string;
};

export function FloatingNavbar({
  autoExpandOnScroll = true,
  hideOnFirstFold = true,
  homeHref = "#intro",
  items,
  lockVariant = false,
  variant = "dark",
  workHref,
  activeItemId,
}: FloatingNavbarProps) {
  const router = useRouter();
  const [isHiddenOnFirstFold, setIsHiddenOnFirstFold] = useState(hideOnFirstFold);
  const [visualVariant, setVisualVariant] = useState<FloatingNavbarVariant>(variant);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const navProbeY = window.innerHeight * 0.5;
      const workSection = document.querySelector<HTMLElement>("#work");
      const footerSection = document.querySelector<HTMLElement>("#contact");
      const workRect = workSection?.getBoundingClientRect();
      const footerRect = footerSection?.getBoundingClientRect();
      const isNavOverWork =
        Boolean(workRect) && workRect!.top <= navProbeY && workRect!.bottom >= navProbeY;
      const isNavOverFooter =
        Boolean(footerRect) && footerRect!.top <= navProbeY && footerRect!.bottom >= navProbeY;

      setIsHiddenOnFirstFold(hideOnFirstFold && window.scrollY < window.innerHeight * 0.13);
      setIsOverFooter(isNavOverFooter);
      setVisualVariant(lockVariant ? variant : isNavOverWork && !isNavOverFooter ? "light" : "dark");
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [hideOnFirstFold, lockVariant, variant]);

  return (
    <nav
      className="floating-navbar"
      data-animation="slide-in-during-statement"
      data-auto-expanded={autoExpandOnScroll && !isHiddenOnFirstFold && !isOverFooter}
      data-over-footer={isOverFooter}
      data-hidden-on-first-fold={isHiddenOnFirstFold}
      data-variant={visualVariant}
      aria-label="Primary navigation"
    >
      <a className="floating-navbar__mark" href={homeHref} aria-label="Go to top">
        <img
          className="floating-navbar__mark-image floating-navbar__mark-image--default"
          src="/assets/home-motif-hover.svg"
          alt=""
        />
        <img
          className="floating-navbar__mark-image floating-navbar__mark-image--hover"
          src="/assets/home-motif-hover.svg"
          alt=""
        />
      </a>
      <ul className="floating-navbar__list">
        {items.map((item) => (
          <li className="floating-navbar__item" key={item.id}>
            <a
              className="floating-navbar__link"
              data-active={activeItemId === item.id}
              href={
                item.id === "work" && workHref ? workHref : item.href
              }
              onClick={
                item.id === "work" && workHref === "/#work"
                  ? (event) => {
                      event.preventDefault();
                      window.sessionStorage.setItem("portfolio-instant-work-scroll", "true");
                      router.push("/", { scroll: false });
                    }
                  : undefined
              }
              rel={item.external ? "noreferrer" : undefined}
              target={item.external ? "_blank" : undefined}
            >
              <span
                className="floating-navbar__icon"
                style={{ "--nav-icon": `url("${item.iconSrc}")` } as CSSProperties}
                aria-hidden="true"
              />
              <span className="floating-navbar__label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
