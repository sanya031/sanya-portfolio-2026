"use client";

import { useEffect, useState } from "react";
import { AboutContainer } from "./AboutContainer";
import { HomeFooter } from "../home/HomeFooter";
import { aboutContainers } from "../../data/aboutContainers";
import { navItems } from "../../data/navItems";
import { FloatingNavbar } from "../navigation/FloatingNavbar";
import { ArchiveReceipt } from "./ArchiveReceipt";
import { BrainFoodMedia } from "./BrainFoodMedia";
import { HiFrame } from "./HiFrame";
import { ListeningPlayer } from "./ListeningPlayer";
import { WeekendHobbyMedia } from "./WeekendHobbyMedia";

export function AboutGridHero() {
  const [revealOrder, setRevealOrder] = useState<Record<string, number> | null>(
    null,
  );
  const [spotlightId, setSpotlightId] = useState<string | null>(null);

  useEffect(() => {
    const shuffledIds = aboutContainers
      .map((container) => container.id)
      .sort(() => Math.random() - 0.5);

    setRevealOrder(
      Object.fromEntries(shuffledIds.map((id, index) => [id, index])),
    );
  }, []);

  useEffect(() => {
    if (!spotlightId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSpotlightId(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [spotlightId]);

  const spotlightContainer = aboutContainers.find(
    (container) => container.id === spotlightId,
  );

  const renderMedia = (id: string) => {
    if (id === "archive") return <ArchiveReceipt />;
    if (id === "hi-thats-me") {
      return (
        <HiFrame
          imageAlt="Sanya cooking and holding a drink"
          imageSrc="/assets/about/me.jpg"
        />
      );
    }
    if (id === "brain-food") return <BrainFoodMedia />;
    if (id === "weekend-hobby") return <WeekendHobbyMedia />;
    if (id === "listening-to") return <ListeningPlayer />;
    return null;
  };

  return (
    <main className="about-page">
      <FloatingNavbar
        activeItemId="intro"
        autoExpandOnScroll={false}
        hideOnFirstFold={false}
        homeHref="/"
        items={navItems}
        variant="dark"
        workHref="/#work"
      />
      <section className="about-grid-hero" aria-label="About page introduction">
        <div className="about-grid-hero__grid" aria-hidden="true" />
        <div
          className="about-grid-hero__layout"
          data-reveal-ready={revealOrder !== null}
        >
          {aboutContainers.map((container) => (
            <AboutContainer
              className={`about-container--${container.id}`}
              key={container.id}
              onSpotlight={() => setSpotlightId(container.id)}
              revealOrder={revealOrder?.[container.id] ?? 0}
              {...container}
            >
              {renderMedia(container.id)}
            </AboutContainer>
          ))}
        </div>
      </section>
      {spotlightContainer ? (
        <div
          className="about-spotlight"
          role="dialog"
          aria-label={`${spotlightContainer.label} spotlight view`}
          aria-modal="true"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSpotlightId(null);
          }}
        >
          <button
            className="about-spotlight__close"
            type="button"
            aria-label="Close spotlight view"
            onClick={() => setSpotlightId(null)}
          >
            ×
          </button>
          <div
            className={`about-container about-container--${spotlightContainer.id} about-spotlight__container`}
            data-spotlight-id={spotlightContainer.id}
          >
            <div className="about-container__label">
              {spotlightContainer.label}
            </div>
            <div className="about-container__surface">
              <div className="about-container__scroller">
                {renderMedia(spotlightContainer.id)}
              </div>
            </div>
          </div>
          <div className="about-spotlight__dots" aria-label="Choose a container">
            {aboutContainers.map((container) => (
              <button
                aria-label={`View ${container.label}`}
                aria-pressed={container.id === spotlightId}
                className="about-spotlight__dot"
                data-active={container.id === spotlightId}
                key={container.id}
                type="button"
                onClick={() => setSpotlightId(container.id)}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="about-page__footer-tear" aria-hidden="true" />
      <HomeFooter />
    </main>
  );
}
