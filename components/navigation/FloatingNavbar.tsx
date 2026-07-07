"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { NavItem } from "../../data/navItems";

export type FloatingNavbarVariant = "dark" | "light";

export type FloatingNavbarProps = {
  items: NavItem[];
  variant?: FloatingNavbarVariant;
  activeItemId?: string;
};

export function FloatingNavbar({
  items,
  variant = "dark",
  activeItemId,
}: FloatingNavbarProps) {
  const [isHiddenOnFirstFold, setIsHiddenOnFirstFold] = useState(true);
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

      setIsHiddenOnFirstFold(window.scrollY < window.innerHeight * 0.13);
      setIsOverFooter(isNavOverFooter);
      setVisualVariant(isNavOverWork && !isNavOverFooter ? "light" : "dark");
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <nav
      className="floating-navbar"
      data-animation="slide-in-during-statement"
      data-auto-expanded={!isHiddenOnFirstFold && !isOverFooter}
      data-hidden-on-first-fold={isHiddenOnFirstFold}
      data-variant={visualVariant}
      aria-label="Primary navigation"
    >
      <span className="floating-navbar__mark" aria-hidden="true">
        <img
          className="floating-navbar__mark-image floating-navbar__mark-image--default"
          src="/assets/home-motif.svg"
          alt=""
        />
        <img
          className="floating-navbar__mark-image floating-navbar__mark-image--hover"
          src="/assets/home-motif-hover.svg"
          alt=""
        />
      </span>
      <ul className="floating-navbar__list">
        {items.map((item) => (
          <li className="floating-navbar__item" key={item.id}>
            <a
              className="floating-navbar__link"
              data-active={activeItemId === item.id}
              href={item.href}
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
