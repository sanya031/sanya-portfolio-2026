"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DialRoot, type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
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

    // Keep the frame on whole grid rows, even after font loading or text zoom.
    const snapPanel = () => {
      const cell = Number.parseFloat(getComputedStyle(intro).gridTemplateColumns);
      const style = getComputedStyle(panel);
      const height = copy.getBoundingClientRect().height +
        Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom) + 2;
      if (cell > 0) intro.style.setProperty("--hero-content-rows", String(Math.ceil(height / cell)));
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
                Over the last 2 years, I’ve designed open-source products and complex workflows alongside developers, and lately, I’ve been using AI to make{" "}
                <a
                  className="hero-intro__playground-link"
                  href="https://www.sanyamalhotra.me/404"
                >
                  interactive experiments
                  <svg
                    aria-hidden="true"
                    className="hero-intro__playground-arrow"
                    focusable="false"
                    shapeRendering="crispEdges"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M3 12H6V15H3Z M0 15H3V18H0Z M6 9H9V12H6Z M9 6H12V9H9Z M12 3H15V6H12Z M15 0H18V3H15Z M15 3H18V6H15Z M15 6H18V9H15Z M15 9H18V12H15Z M12 0H15V3H12Z M9 0H12V3H9Z M6 0H9V3H6Z M3 0H6V3H3Z"
                    />
                  </svg>
                </a>
                .
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

      {process.env.NODE_ENV === "development" && (
        <DialRoot defaultOpen={false} position="bottom-right" theme="dark" />
      )}
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
