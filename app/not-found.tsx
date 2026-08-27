import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Page Not Found | Sanya Malhotra",
  description:
    "The page you're looking for could not be found. Return to Sanya Malhotra's product design portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <link rel="stylesheet" href="/assets/404-runner/styles.css" />
      <main className="page-shell">
        <section className="game-shell" aria-labelledby="game-title">
          <header className="heading-row">
            <div>
              <h1 id="game-title">[404] Looks like you&apos;re lost</h1>
              <p className="lede">might as well run</p>
            </div>
            <div className="page-actions">
              <a className="home-link" href="/">
                <span className="themed-icon">
                  <img
                    className="light-asset"
                    src="/assets/404-runner/assets/ui/home-light.svg"
                    alt=""
                  />
                  <img
                    className="dark-asset"
                    src="/assets/404-runner/assets/ui/home-dark.svg"
                    alt=""
                  />
                </span>
                <span>Go back to Homepage</span>
              </a>
              <button
                id="theme-toggle"
                className="theme-toggle"
                type="button"
                aria-pressed="false"
                aria-label="Switch to dark mode"
              >
                <img
                  className="theme-icon moon-icon"
                  src="/assets/404-runner/assets/ui/moon.svg"
                  alt=""
                />
                <img
                  className="theme-icon sun-icon"
                  src="/assets/404-runner/assets/ui/sun.svg"
                  alt=""
                />
              </button>
            </div>
          </header>

          <div id="game-frame" className="game-frame">
            <canvas
              id="game-canvas"
              width="860"
              height="340"
              tabIndex={0}
              role="application"
              aria-label="Runner game. Press Space or Up Arrow, or tap the game, to jump. Hold Down Arrow or press and hold the game to duck."
            />
            <p id="live-status" className="sr-only" aria-live="polite" />
          </div>

          <footer className="game-footer">
            <div className="control-hints" aria-label="Game controls">
              <span className="control-group">
                <kbd>Space</kbd>
                <kbd className="icon-key" aria-label="Up Arrow">
                  <span className="themed-icon">
                    <img
                      className="light-asset"
                      src="/assets/404-runner/assets/ui/up-light.svg"
                      alt=""
                    />
                    <img
                      className="dark-asset"
                      src="/assets/404-runner/assets/ui/up-dark.svg"
                      alt=""
                    />
                  </span>
                </kbd>
                <span>to jump</span>
              </span>
              <span className="control-group">
                <kbd className="icon-key" aria-label="Down Arrow">
                  <span className="themed-icon">
                    <img
                      className="light-asset"
                      src="/assets/404-runner/assets/ui/down-light.svg"
                      alt=""
                    />
                    <img
                      className="dark-asset"
                      src="/assets/404-runner/assets/ui/down-dark.svg"
                      alt=""
                    />
                  </span>
                </kbd>
                <span>to duck</span>
              </span>
            </div>
            <p className="attribution">Vibe-coded by Sanya Malhotra</p>
          </footer>
        </section>

        <p className="inspiration">
          Inspired by{" "}
          <a href="https://chromedino.com/" target="_blank" rel="noreferrer">
            Chrome Dino T-Rex Runner
          </a>
        </p>
      </main>
      <Script src="/assets/404-runner/pixel-runner.js" strategy="afterInteractive" />
    </>
  );
}
