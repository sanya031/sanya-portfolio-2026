"use client";

import { type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { MOTIF_PALETTE } from "../../data/motifPalette";
import { type Bloom, MotifBloom } from "./MotifBloom";

const EMAIL = "sanya.malhotra031@gmail.com";
const COPIED_MS = 1400;

// Click-to-create: motif size range in px, and how many can be on screen at once.
const BLOOM_SIZE = { min: 48, max: 150 };
const MAX_BLOOMS = 12;

/*
 * Making click-to-create discoverable:
 *  - arrival: when the footer is fully uncovered, a few motifs bloom on their own, one by one
 *  - nudge: if nobody has clicked after a while, one more blooms; stops after the first click
 *  - brush: the cursor becomes a paintbrush over the footer's empty space
 * Each can be switched off or tuned from the Footer DialKit panel (local and previews only).
 */
const footerControls = {
  arrivalBlooms: true,
  arrivalCount: [3, 1, 6, 1],
  arrivalGap: [0.45, 0.1, 1.5, 0.05],
  nudge: true,
  nudgeAfter: [5, 2, 15, 0.5],
  brushCursor: true,
  shadowStrength: [0.28, 0, 0.7, 0.01],
  replayArrival: { type: "action", label: "Replay arrival blooms" },
} satisfies DialConfig;

type FooterControls = ResolvedValues<typeof footerControls>;

// How much of the footer still has to be uncovered (px) before the sheet's shadow is gone.
const SHADOW_FADE_PX = 160;

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/assets/Sanya-Malhotra-Resume.pdf", external: true },
];

const contactLinks = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/sanya031malhotra/" },
  { label: "X", href: "https://x.com/sanyamalhotraa?s=11" },
];

const torontoTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Toronto",
});

/** Toronto's local time, refreshed on the minute. Empty until mounted to avoid hydration drift. */
function useTorontoTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let timer = 0;
    const tick = () => {
      setTime(torontoTime.format(new Date()));
      timer = window.setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };

    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return time;
}

/** Current Toronto temperature in °C from /api/weather, or null if it can't be fetched. */
function useTorontoTemperature() {
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/weather", { signal: controller.signal })
      .then((response) => response.json() as Promise<{ temperature: number | null }>)
      .then((data) => setTemperature(data.temperature))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return temperature;
}

export function SiteFooter() {
  const time = useTorontoTime();
  const temperature = useTorontoTemperature();
  const [emailCopied, setEmailCopied] = useState(false);
  const [blooms, setBlooms] = useState<Bloom[]>([]);
  const footerRef = useRef<HTMLElement>(null);
  const nextBloomId = useRef(0);
  const lastColour = useRef(-1);
  const hasClicked = useRef(false);
  const timers = useRef<number[]>([]);
  const controlsRef = useRef<FooterControls | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), COPIED_MS);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const addBloom = useCallback((x: number, y: number) => {
    let colourIndex = Math.floor(Math.random() * MOTIF_PALETTE.length);

    // Never repeat the previous colour back to back.
    if (colourIndex === lastColour.current) {
      colourIndex = (colourIndex + 1) % MOTIF_PALETTE.length;
    }

    lastColour.current = colourIndex;

    const bloom: Bloom = {
      id: nextBloomId.current++,
      x,
      y,
      size: Math.round(BLOOM_SIZE.min + Math.random() * (BLOOM_SIZE.max - BLOOM_SIZE.min)),
      colour: MOTIF_PALETTE[colourIndex],
    };

    setBlooms((current) => [...current, bloom].slice(-MAX_BLOOMS));
  }, []);

  // A random spot in the footer's empty space, kept clear of the text blocks and the edges.
  const addRandomBloom = useCallback(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const bounds = footer.getBoundingClientRect();
    const blocked = Array.from(footer.querySelectorAll(".site-footer__text")).map((element) =>
      element.getBoundingClientRect(),
    );
    const margin = BLOOM_SIZE.max / 2;

    for (let attempt = 0; attempt < 12; attempt += 1) {
      const x = margin + Math.random() * Math.max(bounds.width - margin * 2, 1);
      const y = margin + Math.random() * Math.max(bounds.height - margin * 2, 1);
      const overlapsText = blocked.some(
        (rect) =>
          x > rect.left - bounds.left - margin &&
          x < rect.right - bounds.left + margin &&
          y > rect.top - bounds.top - margin &&
          y < rect.bottom - bounds.top + margin,
      );

      if (!overlapsText) {
        addBloom(x, y);
        return;
      }
    }
  }, [addBloom]);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  const playArrival = useCallback(() => {
    const controls = controlsRef.current;

    if (!controls) {
      return;
    }

    clearTimers();

    if (controls.arrivalBlooms) {
      for (let index = 0; index < controls.arrivalCount; index += 1) {
        timers.current.push(
          window.setTimeout(addRandomBloom, 250 + index * controls.arrivalGap * 1000),
        );
      }
    }

    if (controls.nudge && !hasClicked.current) {
      timers.current.push(
        window.setTimeout(() => {
          if (!hasClicked.current) {
            addRandomBloom();
          }
        }, controls.nudgeAfter * 1000),
      );
    }
  }, [addRandomBloom]);

  const controls = useDialKit("Footer", footerControls, {
    defaultCollapsed: true,
    id: "site-footer",
    persist: true,
    onAction: (action) => {
      if (action === "replayArrival") {
        playArrival();
      }
    },
  });

  controlsRef.current = controls;

  // Fade the sheet's shadow as the footer settles, and play the arrival once it's fully in view.
  useEffect(() => {
    let isRevealed = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const footer = footerRef.current;
      const sheet = document.querySelector<HTMLElement>(".page-sheet");
      const shadow = document.querySelector<HTMLElement>(".page-sheet__shadow");

      if (!footer || !sheet) {
        return;
      }

      const stillCovered = Math.max(
        sheet.getBoundingClientRect().bottom - footer.getBoundingClientRect().top,
        0,
      );

      shadow?.style.setProperty(
        "--sheet-shadow-strength",
        String((controlsRef.current?.shadowStrength ?? 0.28) * Math.min(stillCovered / SHADOW_FADE_PX, 1)),
      );

      // Revealed once almost nothing is left covering it; reset once it's mostly covered again.
      if (!isRevealed && stillCovered < 8) {
        isRevealed = true;
        playArrival();
      } else if (isRevealed && stillCovered > footer.offsetHeight * 0.6) {
        isRevealed = false;
        clearTimers();
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      clearTimers();
    };
  }, [playArrival]);

  const createBloom = (event: MouseEvent<HTMLElement>) => {
    // Only the empty space creates motifs; text and links behave normally.
    if ((event.target as HTMLElement).closest("a, button, .site-footer__text")) {
      return;
    }

    hasClicked.current = true;
    const bounds = event.currentTarget.getBoundingClientRect();
    addBloom(event.clientX - bounds.left, event.clientY - bounds.top);
  };

  const removeBloom = useCallback((id: number) => {
    setBlooms((current) => current.filter((bloom) => bloom.id !== id));
  }, []);

  return (
    <footer
      className="site-footer"
      data-brush={controls.brushCursor}
      data-nav-theme="dark"
      id="contact"
      onClick={createBloom}
      ref={footerRef}
    >
      <div className="site-footer__blooms" aria-hidden="true">
        {blooms.map((bloom) => (
          <MotifBloom bloom={bloom} key={bloom.id} onDone={removeBloom} />
        ))}
      </div>

      <div className="site-footer__intro site-footer__text">
        <p className="site-footer__quote">
          The most creative act,
          <br />
          is the act of creating itself
        </p>
        <p className="site-footer__hint">Click to create</p>
      </div>

      <nav className="site-footer__columns site-footer__text" aria-label="Footer">
        <div className="site-footer__column">
          <h2 className="site-footer__heading">My location</h2>
          <p className="site-footer__item">Toronto, ON, CA</p>
          <p className="site-footer__item">
            {temperature !== null ? (
              <>
                {temperature}° C<span className="site-footer__dot" aria-hidden="true">•</span>
              </>
            ) : null}
            <time>{time}</time>
          </p>
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Page</h2>
          {pageLinks.map((link) => (
            <a
              className="site-footer__item site-footer__link"
              href={link.href}
              key={link.label}
              rel={link.external ? "noreferrer" : undefined}
              target={link.external ? "_blank" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="site-footer__column">
          <h2 className="site-footer__heading">Contact</h2>
          <button className="site-footer__item site-footer__link" onClick={copyEmail} type="button">
            <span aria-live="polite">{emailCopied ? "Copied" : "Email"}</span>
          </button>
          {contactLinks.map((link) => (
            <a
              className="site-footer__item site-footer__link"
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
}
