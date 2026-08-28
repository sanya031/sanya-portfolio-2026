"use client";

import type { ReactNode } from "react";

export type HeroIntroProps = {
  headline?: string;
  supportingText?: string;
  motifs?: {
    label: string;
    iconSrc: string;
    href?: string;
    external?: boolean;
  }[];
};

const containerCorners = ["top-left", "top-right", "bottom-left", "bottom-right"];

export function HeroIntro({
  headline = "I'm a Product Designer working at the intersection of craft and complexity.",
  supportingText = "I work through messy workflows, systems, and interactions to make complex products easier to understand and use.",
  motifs = [
    { label: "About", iconSrc: "/assets/about_flower.svg", href: "/about" },
    { label: "Work", iconSrc: "/assets/work_folder.svg", href: "#work" },
    {
      label: "Resume",
      iconSrc: "/assets/Resume_paper%20(1).svg",
      href: "/assets/Sanya-Malhotra-Resume.pdf",
      external: true,
    },
  ],
}: HeroIntroProps) {
  return (
    <div className="hero-intro" data-animation="hero-intro-fade-on-scroll">
      <div className="hero-intro__overlay" aria-hidden="true" />

      <div className="hero-intro__content">
        {containerCorners.map((corner) => (
          <img
            className="hero-intro__corner-plus"
            data-corner={corner}
            src="/assets/plus_hero.svg"
            alt=""
            aria-hidden="true"
            key={corner}
          />
        ))}
        <p className="hero-intro__eyebrow">Product Designer</p>
        <h1 className="hero-intro__headline">
          {headline ===
          "I'm a Product Designer working at the intersection of craft and complexity." ? (
            <>
              I'm a Product Designer working at the intersection of{" "}
              <em>craft and complexity.</em>
            </>
          ) : (
            headline
          )}
        </h1>
        <p className="hero-intro__supporting">{supportingText}</p>
      </div>

      {/* <p className="hero-intro__scroll-prompt"> Scroll to view selected work...</p> */}

      <div className="hero-intro__motifs">
        {motifs.map((motif, index) => (
          <HeroMotif
            className="hero-intro__motif"
            data-motif-index={index}
            data-motif-label={motif.label.toLowerCase()}
            external={motif.external}
            href={motif.href}
            key={motif.label}
          >
            {containerCorners.map((corner) => (
              <img
                className="hero-intro__corner-plus"
                data-corner={corner}
                src="/assets/plus_hero.svg"
                alt=""
                aria-hidden="true"
                key={corner}
              />
            ))}
            <span className="hero-intro__motif-content">
              <img src={motif.iconSrc} alt="" />
            </span>
            <span className="hero-intro__motif-label">{motif.label}</span>
          </HeroMotif>
        ))}
      </div>
    </div>
  );
}

type HeroMotifProps = {
  children: ReactNode;
  className: string;
  "data-motif-index": number;
  "data-motif-label": string;
  external?: boolean;
  href?: string;
  onClick?: () => void;
};

function HeroMotif({ external, href, onClick, ...props }: HeroMotifProps) {
  if (href) {
    return (
      <a
        href={href}
        rel={external ? "noreferrer" : undefined}
        target={external ? "_blank" : undefined}
        {...props}
      />
    );
  }

  if (onClick) {
    return <button onClick={onClick} type="button" {...props} />;
  }

  return <span {...props} />;
}
