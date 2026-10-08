"use client";

import { type DialConfig, type ResolvedValues, useDialKit } from "dialkit";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { MOTIF_PALETTE } from "../../data/motifPalette";
import { BLOOM_LIFETIME_MS, type Bloom, MotifBloom } from "./MotifBloom";

const EMAIL = "sanya.malhotra031@gmail.com";
const COPIED_MS = 1400;

// Click-to-create: motif size range in px, and how many can be on screen at once.
const BLOOM_SIZE = { min: 48, max: 150 };
const MAX_BLOOMS = 12;

/*
 * Making click-to-create discoverable:
 *  - arrival: as soon as a strip of the footer peeks out below the page, motifs bloom on
 *    their own inside that visible strip, one by one, so there's movement to scroll towards
 *  - repeat when idle: once a round has fully finished, another plays after a few seconds with no
 *    clicks, scrolling or typing; any activity restarts the wait. Rounds never overlap, and an
 *    auto bloom never lands on top of a motif that's already showing.
 *  - brush: the cursor becomes a paintbrush over the footer's empty space
 * Each can be switched off or tuned from the Footer DialKit panel (local and previews only).
 */
// Footer text layouts to compare (desktop; phones always stack). See .site-footer[data-layout].
const FOOTER_LAYOUTS = ["classic", "grounded", "centred", "editorial", "sidebar", "corners"];

const footerControls = {
  layout: { type: "select", options: FOOTER_LAYOUTS, default: "corners" },
  arrivalBlooms: true,
  arrivalCount: [6, 1, 10, 1],
  arrivalGap: [0.9, 0.1, 2, 0.05],
  repeatWhenIdle: true,
  idleSeconds: [5, 2, 15, 0.5],
  brushCursor: true,
  shadowStrength: [0.15, 0, 0.7, 0.01],
  replayArrival: { type: "action", label: "Replay arrival blooms" },
} satisfies DialConfig;

type FooterControls = ResolvedValues<typeof footerControls>;

// How much of the footer still has to be uncovered (px) before the sheet's shadow is gone.
const SHADOW_FADE_PX = 160;

// Arrival blooms start once this much of the footer (px) is showing, and reset when it's hidden.
const ARRIVAL_PEEK_PX = 80;
const ARRIVAL_RESET_PX = 20;

// Breathing room (px) kept between an auto bloom and any motif already on screen.
const BLOOM_GAP = 12;

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
  const bloomsRef = useRef<Bloom[]>([]);
  const isRevealed = useRef(false);
  const roundActive = useRef(false);
  const roundTimers = useRef<number[]>([]);
  const idleTimer = useRef(0);
  const playRoundRef = useRef<() => void>(() => {});
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

  const addBloom = useCallback((x: number, y: number, maxSize = BLOOM_SIZE.max) => {
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
      size: Math.round(BLOOM_SIZE.min + Math.random() * Math.max(maxSize - BLOOM_SIZE.min, 0)),
      colour: MOTIF_PALETTE[colourIndex],
    };

    setBlooms((current) => {
      const next = [...current, bloom].slice(-MAX_BLOOMS);
      bloomsRef.current = next;
      return next;
    });
  }, []);

  // A random spot in the part of the footer that's currently showing below the page, kept clear
  // of the text blocks and the edges. Motifs shrink to fit while only a thin strip is visible.
  const addRandomBloom = useCallback(() => {
    const footer = footerRef.current;
    const sheet = document.querySelector<HTMLElement>(".page-sheet");

    if (!footer) {
      return;
    }

    const bounds = footer.getBoundingClientRect();
    const visibleTop = sheet
      ? Math.min(Math.max(sheet.getBoundingClientRect().bottom - bounds.top, 0), bounds.height)
      : 0;
    const visibleHeight = bounds.height - visibleTop;
    const maxSize = Math.max(BLOOM_SIZE.min, Math.min(BLOOM_SIZE.max, visibleHeight * 0.85));
    const blocked = Array.from(footer.querySelectorAll(".site-footer__text")).map((element) =>
      element.getBoundingClientRect(),
    );
    const margin = maxSize / 2;
    const yMin = visibleTop + margin;
    const ySpan = Math.max(bounds.height - margin - yMin, 0);

    const overlapsBloom = (x: number, y: number) =>
      bloomsRef.current.some((bloom) => {
        const reach = (bloom.size + maxSize) / 2 + BLOOM_GAP;
        return Math.abs(bloom.x - x) < reach && Math.abs(bloom.y - y) < reach;
      });

    for (let attempt = 0; attempt < 30; attempt += 1) {
      const x = margin + Math.random() * Math.max(bounds.width - margin * 2, 1);
      const y = yMin + Math.random() * ySpan;
      const overlapsText = blocked.some(
        (rect) =>
          x > rect.left - bounds.left - margin &&
          x < rect.right - bounds.left + margin &&
          y > rect.top - bounds.top - margin &&
          y < rect.bottom - bounds.top + margin,
      );

      if (!overlapsText && !overlapsBloom(x, y)) {
        addBloom(x, y, maxSize);
        return;
      }
    }
  }, [addBloom]);

  const stopRounds = useCallback(() => {
    roundTimers.current.forEach((timer) => window.clearTimeout(timer));
    roundTimers.current = [];
    window.clearTimeout(idleTimer.current);
    roundActive.current = false;
  }, []);

  // (Re)start the idle countdown; when it runs out with no activity, play another round.
  const scheduleIdleRound = useCallback(() => {
    window.clearTimeout(idleTimer.current);
    const controls = controlsRef.current;

    if (!isRevealed.current || roundActive.current || !controls?.repeatWhenIdle) {
      return;
    }

    idleTimer.current = window.setTimeout(() => playRoundRef.current(), controls.idleSeconds * 1000);
  }, []);

  const playRound = useCallback(() => {
    const controls = controlsRef.current;

    if (!controls?.arrivalBlooms || roundActive.current) {
      return;
    }

    roundActive.current = true;
    window.clearTimeout(idleTimer.current);

    const gapMs = controls.arrivalGap * 1000;
    const lastSpawnAt = 250 + (controls.arrivalCount - 1) * gapMs;

    for (let index = 0; index < controls.arrivalCount; index += 1) {
      roundTimers.current.push(window.setTimeout(addRandomBloom, 250 + index * gapMs));
    }

    // The round ends once its last motif has finished and gone; only then does the idle wait start.
    roundTimers.current.push(
      window.setTimeout(() => {
        roundTimers.current = [];
        roundActive.current = false;
        scheduleIdleRound();
      }, lastSpawnAt + BLOOM_LIFETIME_MS),
    );
  }, [addRandomBloom, scheduleIdleRound]);

  playRoundRef.current = playRound;

  const controls = useDialKit("Footer", footerControls, {
    defaultCollapsed: true,
    id: "site-footer",
    persist: true,
    onAction: (action) => {
      if (action === "replayArrival") {
        stopRounds();
        playRound();
      }
    },
  });

  controlsRef.current = controls;

  // Fade the sheet's shadow as the footer settles, and play the arrival as soon as it peeks out.
  useEffect(() => {
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
        String((controlsRef.current?.shadowStrength ?? 0.15) * Math.min(stillCovered / SHADOW_FADE_PX, 1)),
      );

      const showing = footer.offsetHeight - stillCovered;

      if (!isRevealed.current && showing >= ARRIVAL_PEEK_PX) {
        isRevealed.current = true;
        playRound();
      } else if (isRevealed.current && showing < ARRIVAL_RESET_PX) {
        isRevealed.current = false;
        stopRounds();
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    // Scrolling, clicking or typing counts as activity and restarts the idle countdown.
    const onActivity = () => scheduleIdleRound();
    const onScroll = () => {
      requestUpdate();
      onActivity();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("keydown", onActivity);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
      stopRounds();
    };
  }, [playRound, scheduleIdleRound, stopRounds]);

  const createBloom = (event: MouseEvent<HTMLElement>) => {
    // Only the empty space creates motifs; text and links behave normally.
    if ((event.target as HTMLElement).closest("a, button, .site-footer__text")) {
      return;
    }

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
      data-layout={controls.layout}
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

      <nav className="site-footer__columns" aria-label="Footer">
        <div className="site-footer__column site-footer__text">
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

        <div className="site-footer__column site-footer__text">
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

        <div className="site-footer__column site-footer__text">
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
