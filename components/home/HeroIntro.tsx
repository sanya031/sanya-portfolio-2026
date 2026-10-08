"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
import { useAnimationFrame, useReducedMotion } from "motion/react";

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
const defaultHeadline = "I’m a Product Designer who brings craft to complicated problems.";
const heroIconWaveControls = {
  speed: [1, 0.2, 2, 0.05],
  frequency: [1, 0.25, 2.5, 0.05],
  amplitude: [2, 0, 8, 0.25],
  opacity: [0.5, 0.2, 0.9, 0.05],
} satisfies DialConfig;

type HeroIconWaveControls = ResolvedValues<typeof heroIconWaveControls>;

export function HeroIntro({
  headline = defaultHeadline,
  supportingText,
  motifs = [
    { label: "About", iconSrc: "/assets/about_flower.svg", href: "/about" },
    { label: "Work", iconSrc: "/assets/work_folder.svg", href: "#work" },
    {
      label: "Resume",
      iconSrc: "/assets/Resume_paper.svg",
      href: "/assets/Sanya-Malhotra-Resume.pdf",
      external: true,
    },
  ],
}: HeroIntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    const copy = copyRef.current;
    const panel = copy?.parentElement;
    if (!intro || !copy || !panel) return;

    const lineNumber = (value: string, fallback: number) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    // Snap the copy frame and the motif chips to whole grid cells, even after font loading,
    // text zoom or a breakpoint change, so every border lands on a grid line.
    const snapPanel = () => {
      const introStyle = getComputedStyle(intro);
      const cell = Number.parseFloat(introStyle.gridTemplateColumns);
      if (!(cell > 0)) return;

      // Copy frame: as many rows as the copy plus its padding needs; spare space splits evenly.
      const style = getComputedStyle(panel);
      const height = copy.getBoundingClientRect().height +
        Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom) + 2;
      const contentRows = Math.ceil(height / cell);
      intro.style.setProperty("--hero-content-rows", String(contentRows));

      // Chips: square, spanning enough cells to hold their icon and label.
      const motifs = Array.from(intro.querySelectorAll<HTMLElement>(".hero-intro__motif"));
      const needed = Math.max(
        0,
        ...motifs.map((motif) => {
          const content = motif.querySelector<HTMLElement>(".hero-intro__motif-content");
          const label = motif.querySelector<HTMLElement>(".hero-intro__motif-label");
          const motifStyle = getComputedStyle(motif);
          const chrome = Number.parseFloat(motifStyle.paddingTop) * 2 + 2;
          const inner = Math.max(
            content?.getBoundingClientRect().width ?? 0,
            label?.getBoundingClientRect().width ?? 0,
            (content?.getBoundingClientRect().height ?? 0) + (label?.getBoundingClientRect().height ?? 0) + 4,
          );
          return inner + chrome;
        }),
      );
      // Narrower layouts stack the chips under the frame, measured from where it actually ends:
      // About under its left edge, Resume diagonally below-right of About, Work under its right edge.
      // Wider layouts keep their fixed 2×2 chips beside the frame.
      const placeBelow = introStyle.getPropertyValue("--hero-motif-layout").trim() === "below";
      const span = placeBelow ? Math.max(2, Math.ceil(needed / cell)) : 2;
      intro.style.setProperty("--hero-motif-span", String(span));
      const panelStyle = getComputedStyle(panel);
      const colStart = lineNumber(panelStyle.gridColumnStart, 1);
      const colSpan = lineNumber(panelStyle.gridColumnEnd.replace("span", ""), 1);
      const rowEnd = lineNumber(panelStyle.gridRowStart, 1) + contentRows;
      const gap = lineNumber(introStyle.getPropertyValue("--hero-motif-gap"), 3);
      const workOffset = lineNumber(introStyle.getPropertyValue("--hero-work-row-offset"), 1);
      const aboutRow = rowEnd + gap;
      const placements: Record<string, [number, number]> = {
        about: [colStart, aboutRow],
        resume: [colStart + span, aboutRow + span],
        work: [colStart + colSpan - span, aboutRow + workOffset],
      };

      motifs.forEach((motif) => {
        const place = placements[motif.dataset.motifLabel ?? ""];
        motif.style.gridColumn = placeBelow && place ? `${place[0]} / span ${span}` : "";
        motif.style.gridRow = placeBelow && place ? `${place[1]} / span ${span}` : "";
      });
    };
    const observer = new ResizeObserver(snapPanel);
    observer.observe(copy);
    observer.observe(intro);
    snapPanel();
    return () => observer.disconnect();
  }, []);

  const wave = useDialKit("Hero icon wave", heroIconWaveControls, {
    defaultCollapsed: true,
    id: "hero-icon-wave",
  });

  return (
    <div ref={introRef} className="hero-intro" data-animation="hero-intro-fade-on-scroll">

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
        <div className="hero-intro__copy" ref={copyRef}>
          <p className="hero-intro__eyebrow">Product Designer</p>
          <h1 className="hero-intro__headline">
            {headline === defaultHeadline ? (
              <>
                <span className="hero-intro__headline-line">I’m a Product Designer who brings</span>
                {" "}
                <span className="hero-intro__headline-line">craft to complicated problems.</span>
              </>
            ) : (
              headline
            )}
          </h1>
          <p className="hero-intro__supporting">
            {supportingText ?? (
              <>
                Over the last 2 years, I’ve designed open-source products and complex workflows alongside developers, and lately, I’ve been using AI to make interactive experiments.
              </>
            )}
          </p>
        </div>
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
            <AnimatedSvgIcon src={motif.iconSrc} wave={wave} />
            <span className="hero-intro__motif-label">{motif.label}</span>
          </HeroMotif>
        ))}
      </div>
    </div>
  );
}

type AnimatedSvgIconProps = {
  src: string;
  wave: HeroIconWaveControls;
};

function AnimatedSvgIcon({ src, wave }: AnimatedSvgIconProps) {
  const [svgMarkup, setSvgMarkup] = useState<string>();
  const iconRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const iconStyle = { "--hero-icon-wave-opacity": wave.opacity } as CSSProperties;
  const canAnimateIndividualXs = src.endsWith("/Resume_paper.svg");

  useEffect(() => {
    if (!canAnimateIndividualXs) return;

    const controller = new AbortController();

    async function loadSvg() {
      const response = await fetch(src, { signal: controller.signal });
      if (!response.ok) return;

      const document = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      const svg = document.querySelector("svg");
      if (!svg) return;

      let waveIndex = 0;
      svg.querySelectorAll<SVGPathElement>("path[fill]").forEach((path) => {
        if (path.closest("mask") || path.getAttribute("fill") === "white") return;

        path.dataset.waveIndex = String(waveIndex++);
      });

      setSvgMarkup(svg.outerHTML);
    }

    loadSvg().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) throw error;
    });

    return () => controller.abort();
  }, [canAnimateIndividualXs, src]);

  useAnimationFrame((time) => {
    const paths = iconRef.current?.querySelectorAll<SVGPathElement>("path[data-wave-index]");
    if (!paths) return;

    const isHovered = iconRef.current?.closest(".hero-intro__motif")?.matches(":hover") ?? false;

    paths.forEach((path) => {
      const index = Number(path.dataset.waveIndex);
      const phase = time * 0.001 * wave.speed * wave.frequency * Math.PI * 2 + index * 0.42;
      const waveValue = prefersReducedMotion || !isHovered ? 0 : Math.sin(phase);

      path.setAttribute("transform", `translate(0 ${waveValue * wave.amplitude * 0.14})`);
    });
  });

  return (
    <span className="hero-intro__motif-content" style={iconStyle}>
      {canAnimateIndividualXs && svgMarkup ? (
        <span
          aria-hidden="true"
          className="hero-intro__motif-icon"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
          ref={iconRef}
        />
      ) : (
        <img src={src} alt="" />
      )}
    </span>
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
