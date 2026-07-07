export type HeroIntroProps = {
  headline?: string;
  supportingText?: string;
  motifs?: {
    label: string;
    iconSrc: string;
  }[];
};

const containerCorners = ["top-left", "top-right", "bottom-left", "bottom-right"];

export function HeroIntro({
  headline = "I'm a Product Designer working at the intersection of craft and complexity.",
  supportingText = "I design intentional, visually polished experiences that bring clarity to complex ideas.",
  motifs = [
    { label: "About", iconSrc: "/assets/about_flower.svg" },
    { label: "Work", iconSrc: "/assets/work_folder.svg" },
    { label: "Resume", iconSrc: "/assets/Resume_paper%20(1).svg" },
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

      <div className="hero-intro__motifs" aria-hidden="true">
        {motifs.map((motif, index) => (
          <span
            className="hero-intro__motif"
            data-motif-index={index}
            data-motif-label={motif.label.toLowerCase()}
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
          </span>
        ))}
      </div>
    </div>
  );
}
