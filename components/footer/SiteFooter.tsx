"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { MOTIF_PALETTE } from "../../data/motifPalette";
import { type Bloom, MotifBloom } from "./MotifBloom";

const EMAIL = "sanya.malhotra031@gmail.com";
const COPIED_MS = 1400;

// Click-to-create: motif size range in px, and how many can be on screen at once.
const BLOOM_SIZE = { min: 48, max: 150 };
const MAX_BLOOMS = 12;

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
  const nextBloomId = useRef(0);
  const lastColour = useRef(-1);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), COPIED_MS);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const createBloom = (event: MouseEvent<HTMLElement>) => {
    // Only the empty space creates motifs; text and links behave normally.
    if ((event.target as HTMLElement).closest("a, button, .site-footer__text")) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    let colourIndex = Math.floor(Math.random() * MOTIF_PALETTE.length);

    // Never repeat the previous colour back to back.
    if (colourIndex === lastColour.current) {
      colourIndex = (colourIndex + 1) % MOTIF_PALETTE.length;
    }

    lastColour.current = colourIndex;

    const bloom: Bloom = {
      id: nextBloomId.current++,
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      size: Math.round(BLOOM_SIZE.min + Math.random() * (BLOOM_SIZE.max - BLOOM_SIZE.min)),
      colour: MOTIF_PALETTE[colourIndex],
    };

    setBlooms((current) => [...current, bloom].slice(-MAX_BLOOMS));
  };

  const removeBloom = useCallback((id: number) => {
    setBlooms((current) => current.filter((bloom) => bloom.id !== id));
  }, []);

  return (
    <footer className="site-footer" data-nav-theme="dark" id="contact" onClick={createBloom}>
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
