"use client";

import { useState } from "react";

export type FooterLink = {
  label: string;
  href: string;
};

export type HomeFooterProps = {
  stamp?: unknown;
  links?: FooterLink[];
};

export function HomeFooter({
  links = [
    { label: "Linkedin", href: "https://www.linkedin.com/in/sanya031malhotra/" },
    { label: "X", href: "https://x.com/sanyamalhotraa?s=11" },
  ],
}: HomeFooterProps) {
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const footerMotifs = Array.from({ length: 26 }, (_, index) => ({
    id: `footer-motif-${index}`,
    src: index % 2 === 0 ? "/assets/footer_motif.svg" : "/assets/footer_motif_pink.svg",
  }));

  const handleEmailCopy = async () => {
    await navigator.clipboard.writeText("sanya.malhotra031@gmail.com");
    setHasCopiedEmail(true);
    window.setTimeout(() => setHasCopiedEmail(false), 900);
  };

  return (
    <footer id="contact" className="home-footer" data-nav-theme="dark">
      <div className="home-footer__content">
        <h2 className="home-footer__title">Get in touch</h2>

        <div className="home-footer__meta-row">
          <p className="home-footer__credit">Designed & Vibe-coded by Moi</p>

          <nav className="home-footer__nav" aria-label="Footer links">
            <button
              className="home-footer__link home-footer__link--button"
              onClick={handleEmailCopy}
              type="button"
            >
              <span
                className="home-footer__copy-feedback"
                data-visible={hasCopiedEmail}
                aria-live="polite"
              >
                <img
                  className="home-footer__copy-icon"
                  src="/assets/tap-L.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>Copied to clipboard</span>
                <img
                  className="home-footer__copy-icon"
                  src="/assets/tap-R.svg"
                  alt=""
                  aria-hidden="true"
                />
              </span>
              Email
            </button>
            {links.map((link) => (
              <a
                className="home-footer__link"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="home-footer__motifs" aria-hidden="true">
        {footerMotifs.map((motif) => (
          <img className="home-footer__motif" src={motif.src} alt="" key={motif.id} />
        ))}
      </div>
    </footer>
  );
}
