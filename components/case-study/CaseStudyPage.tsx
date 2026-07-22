import Link from "next/link";
import type {
  CaseStudyAsset,
  CaseStudyFinding,
  CaseStudyPage as CaseStudyPageData,
} from "../../data/caseStudyPages";
import { HomeFooter } from "../home/HomeFooter";
import { AutoScrollCarousel } from "./AutoScrollCarousel";
import { CaseStudyMedia } from "./CaseStudyMedia";
import { PlaybackVideo } from "./PlaybackVideo";
import { ResourceCardStack } from "./ResourceCardStack";
import { HeroContentReveal } from "../transitions/HeroContentReveal";
import { ScrollToTopOnMount } from "../transitions/ScrollToTopOnMount";

export type CaseStudyPageProps = {
  page: CaseStudyPageData;
};

function TextSection({
  eyebrow,
  title,
  titleSize,
  body,
  emphasis,
}: {
  eyebrow?: string;
  title: string;
  titleSize?: "small" | "medium";
  body: string[];
  emphasis?: string;
}) {
  return (
    <section className="case-study-page__section">
      {eyebrow ? <p className="case-study-page__eyebrow">{eyebrow}</p> : null}
      <div className="case-study-page__text-stack">
        <h2 className="case-study-page__section-title" data-title-size={titleSize}>
          {title}
        </h2>
        {body.length > 0 || emphasis ? (
          <div className="case-study-page__body-copy">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {emphasis ? <p className="case-study-page__emphasis">{emphasis}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OrderedSection({
  eyebrow,
  title,
  titleSize,
  intro,
  items,
  columns,
}: {
  eyebrow?: string;
  title: string;
  titleSize?: "small" | "medium";
  intro: string;
  items: string[];
  columns?: boolean;
}) {
  return (
    <section className="case-study-page__section" data-columns={columns}>
      {eyebrow ? <p className="case-study-page__eyebrow">{eyebrow}</p> : null}
      <div className="case-study-page__text-stack">
        <h2 className="case-study-page__section-title" data-title-size={titleSize}>
          {title}
        </h2>
        <p className="case-study-page__body-copy">{intro}</p>
        <ol className="case-study-page__ordered-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SplitSection({
  eyebrow,
  title,
  body,
  cards,
}: {
  eyebrow?: string;
  title: string;
  body: string[];
  cards: Array<{ title: string; body: string[] }>;
}) {
  return (
    <section className="case-study-page__section">
      {eyebrow ? <p className="case-study-page__eyebrow">{eyebrow}</p> : null}
      <div className="case-study-page__text-stack">
        <h2 className="case-study-page__section-title">{title}</h2>
        <div className="case-study-page__body-copy">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="case-study-page__split-grid">
        {cards.map((card, index) => (
          <article className="case-study-page__mini-card" key={`${card.title}-${index}`}>
            <h3>{card.title}</h3>
            {card.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

function QuoteSection({
  quote,
  highlight,
  author,
  role,
}: {
  quote: string;
  highlight?: string;
  author: string;
  role: string;
}) {
  const highlightIndex = highlight ? quote.indexOf(highlight) : -1;
  const hasHighlight = highlight && highlightIndex >= 0;

  return (
    <section className="case-study-page__quote">
      <img
        className="case-study-page__quote-mark"
        src="/assets/case-study-2/pixel-quote.svg"
        alt=""
        aria-hidden="true"
      />
      <blockquote>
        {hasHighlight ? (
          <>
            {quote.slice(0, highlightIndex)}
            <span className="case-study-page__quote-highlight">{highlight}</span>
            {quote.slice(highlightIndex + highlight.length)}
          </>
        ) : (
          quote
        )}
      </blockquote>
      <p>
        <strong>{author}</strong>
        <span>{role}</span>
      </p>
    </section>
  );
}

function LogoGridSection() {
  return (
    <section className="case-study-page__logo-grid" aria-label="Logo system grid">
      <div className="case-study-page__logo-grid-cell" data-cell="iterations">
        <span>LOGOMARK ITERATIONS</span>
        <video
          aria-label="Logomark iteration animation"
          autoPlay
          className="case-study-page__logo-grid-media"
          loop
          muted
          playsInline
          preload="metadata"
          src="/assets/case-study-2/design-decision-logomark-iterations.mp4"
        />
      </div>
      <div className="case-study-page__logo-grid-cell" data-cell="final-mark">
        <span>FINAL LOGOMARK</span>
        <img
          alt="Final Bitcoin Dev Project logomark"
          className="case-study-page__logo-grid-media"
          src="/assets/case-study-2/final logomark.png"
        />
      </div>
      <div className="case-study-page__logo-grid-cell" data-cell="logotype">
        <span>LOGOTYPE</span>
        <img
          alt="Bitcoin Dev Project logotype"
          className="case-study-page__logo-grid-media"
          src="/assets/case-study-2/BDP logotype.png"
        />
      </div>
      <div className="case-study-page__logo-grid-cell" data-cell="logomark">
        <span>LOGOMARK</span>
        <img
          alt="Bitcoin Dev Project logomark"
          className="case-study-page__logo-grid-media"
          src="/assets/case-study-2/logomark.png"
        />
      </div>
      <div className="case-study-page__logo-grid-cell" data-cell="logo">
        <span>LOGO</span>
        <img
          alt="Bitcoin Dev Project logo"
          className="case-study-page__logo-grid-media"
          src="/assets/case-study-2/BDP logo.png"
        />
      </div>
    </section>
  );
}

function VisualSystemGridSection() {
  return (
    <section className="case-study-page__visual-system-grid" aria-label="Brand visual system grid">
      <div className="case-study-page__visual-system-cell" data-cell="colors">
        <span>PRIMARY BRAND COLOURS</span>
        <div className="case-study-page__visual-system-colors">
          <img
            alt="Primary Bitcoin Dev Project brand colors"
            src="/assets/case-study-2/PRIMARY COLORS .png"
          />
          <div className="case-study-page__accent-colors-stack">
            <span>ACCENT COLOURS</span>
            <img
              alt="Accent Bitcoin Dev Project brand colors"
              src="/assets/case-study-2/ACCENT COLORS .png"
            />
          </div>
        </div>
      </div>
      <div className="case-study-page__visual-system-cell" data-cell="heading-font">
        <div className="case-study-page__font-sample-group">
          <span>HEADING FONT</span>
          <p className="case-study-page__font-sample-heading">Montserrat</p>
        </div>
        <div className="case-study-page__font-sample-group">
          <span>BODY FONT</span>
          <div className="case-study-page__font-sample-body">
            <p>Quicksand</p>
            <p>Hi, this is the body font. How sleek does it look ?</p>
          </div>
        </div>
      </div>
      <div className="case-study-page__visual-system-cell" data-cell="marketing-assets">
        <span>MARKETING ASSETS</span>
        <video
          aria-label="Marketing asset puzzle animation"
          autoPlay
          className="case-study-page__visual-system-fill-media"
          loop
          muted
          playsInline
          preload="metadata"
          src="/assets/case-study-2/PUZZLE-VID.mp4"
        />
      </div>
      <div className="case-study-page__visual-system-cell" data-cell="stickers">
        <span>STICKERS</span>
        <img
          alt="Bitcoin Dev Project sticker pack"
          className="case-study-page__sticker-pack"
          src="/assets/case-study-2/sticker pack.png"
        />
      </div>
      <div className="case-study-page__visual-system-cell" data-cell="illustration">
        <span>
          CUSTOMISABLE CHARACTER
          <br />
          ILLUSTRATIONS
        </span>
        <PlaybackVideo
          ariaLabel="Customisable character illustration animation"
          className="case-study-page__visual-system-fill-media"
          playbackRate={1.5}
          src="/assets/case-study-2/character-design-decisions-2.mov"
        />
      </div>
    </section>
  );
}

function TwoColumnRowSection() {
  return (
    <section className="case-study-page__two-column-row" aria-label="Two column iteration layout">
      <div className="case-study-page__two-column-cell">
        <span>
          ITERATION 1: STRICTLY GROUPED
          <br />
          BY DIFFICULTY
        </span>
        <img
          alt="Iteration 1 resource discovery layout grouped by difficulty"
          src="/assets/case-study-2/iteration 1.png"
        />
      </div>
      <div className="case-study-page__two-column-cell">
        <span>
          ITERATION 2: COLLAPSED SECTIONS
          <br />
          ("VIEW MORE")
        </span>
        <img
          alt="Iteration 2 resource discovery layout with collapsed sections"
          src="/assets/case-study-2/iteration 2.png"
        />
      </div>
    </section>
  );
}

function PortalComparisonRowSection() {
  return (
    <section className="case-study-page__portal-row" aria-label="AI exploration and final portal animation">
      <div className="case-study-page__portal-cell" data-cell="exploration">
        <span>AI GENERATED IMG</span>
        <img
          alt="Portal illustration before animation refinement"
          className="case-study-page__portal-image"
          src="/assets/case-study-2/portal-before.png"
        />
      </div>
      <div className="case-study-page__portal-cell" data-cell="final">
        <span>DIGITALLY DRAWN OVER IMG</span>
        <PlaybackVideo
          ariaLabel="Portal animation after illustration refinement"
          className="case-study-page__portal-video"
          src="/assets/case-study-2/portal-after.mp4"
        />
      </div>
    </section>
  );
}

function AuditArtifactsSection({ items }: { items: CaseStudyAsset[] }) {
  return (
    <section className="case-study-page__audit-artifacts" aria-label="Audit artifacts">
      {items.map((item, index) => (
        <article className="case-study-page__audit-artifact" key={`${item.src}-${index}`}>
          {item.overlayLabel ? <span>{item.overlayLabel}</span> : null}
          <img src={item.src} alt={item.alt} />
          {index === 1 ? (
            <div className="case-study-page__audit-legend" aria-label="Design evolution stages">
              <span>
                <i data-color="understand" />
                UNDERSTAND
              </span>
              <span>
                <i data-color="explore" />
                EXPLORE
              </span>
              <span>
                <i data-color="refine" />
                REFINE
              </span>
            </div>
          ) : null}
        </article>
      ))}
    </section>
  );
}

function AuditFindingsSection({ items }: { items: CaseStudyFinding[] }) {
  return (
    <section className="case-study-page__audit-findings" aria-label="Audit findings">
      {items.map((item) => (
        <article className="case-study-page__audit-finding" key={item.title}>
          <div className="case-study-page__audit-finding-media">
            <img src={item.image.src} alt={item.image.alt} />
          </div>
          <div className="case-study-page__audit-finding-copy">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function WorkflowComparisonSection() {
  return (
    <section className="case-study-page__workflow-comparison" aria-label="Old and revised workflow">
      <div className="case-study-page__workflow-row" data-row="old">
        <span>OLD WORKFLOW</span>
        <img
          src="/assets/case-study-1/old_workflow.png"
          alt="Old transcript review workflow from browsing to submission"
        />
        <p className="case-study-page__workflow-note">
          <span aria-hidden="true">!</span>
          Committing before context
        </p>
      </div>
      <div className="case-study-page__workflow-row" data-row="revised">
        <span>REVISED WORKFLOW</span>
        <img
          src="/assets/case-study-1/new_workfow.png"
          alt="Revised transcript review workflow separating preview from claiming"
        />
      </div>
    </section>
  );
}

const resourceCards = [
  {
    alt: "Saving Satoshi resource card",
    src: "/assets/case-study-2/Card - 1.png",
  },
  {
    alt: "Cryptography camp workbook resource card",
    src: "/assets/case-study-2/Card - 2.png",
  },
  {
    alt: "Bitcoin Transcripts resource card",
    src: "/assets/case-study-2/Card - 3.png",
  },
  {
    alt: "Boss Projects resource card",
    src: "/assets/case-study-2/Card - 4.png",
  },
  {
    alt: "Good first issues resource card",
    src: "/assets/case-study-2/Card - 5.png",
  },
];

export function CaseStudyPage({ page }: CaseStudyPageProps) {
  const heroLayoutId = `case-study-media-${page.slug}`;

  return (
    <main className="case-study-page">
      <ScrollToTopOnMount />
      <div className="case-study-page__paper">
        <header className="case-study-page__hero">
          <HeroContentReveal>
            <Link className="case-study-page__back-link" href="/#work" scroll={false}>
              Back to work
            </Link>
            <div className="case-study-page__meta" aria-label="Case study metadata">
              {page.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h1>{page.title}</h1>
          </HeroContentReveal>
          <CaseStudyMedia
            asset={page.hero}
            className="case-study-page__hero-media"
            layoutId={heroLayoutId}
          />
        </header>

        <dl className="case-study-page__facts">
          {page.facts.map((fact) => (
            <div className="case-study-page__fact" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.value.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        <div className="case-study-page__content">
          {page.sections.map((section, index) => {
            if (section.variant === "text") {
              return <TextSection {...section} key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "split") {
              return <SplitSection {...section} key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "ordered") {
              return <OrderedSection {...section} key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "media") {
              return (
                <CaseStudyMedia
                  asset={section}
                  className="case-study-page__full-media"
                  key={`${section.variant}-${index}`}
                />
              );
            }

            if (section.variant === "media-grid") {
              return (
                <section className="case-study-page__media-grid" key={`${section.variant}-${index}`}>
                  {section.items.map((item) => (
                    <CaseStudyMedia asset={item} key={item.src} />
                  ))}
                </section>
              );
            }

            if (section.variant === "audit-artifacts") {
              return <AuditArtifactsSection items={section.items} key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "audit-findings") {
              return <AuditFindingsSection items={section.items} key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "workflow-comparison") {
              return <WorkflowComparisonSection key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "logo-grid") {
              return <LogoGridSection key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "visual-system-grid") {
              return <VisualSystemGridSection key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "two-column-row") {
              return <TwoColumnRowSection key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "portal-comparison-row") {
              return <PortalComparisonRowSection key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "resource-card-stack") {
              return <ResourceCardStack cards={resourceCards} key={`${section.variant}-${index}`} />;
            }

            if (section.variant === "carousel") {
              return <AutoScrollCarousel items={section.items} key={`${section.variant}-${index}`} />;
            }

            return <QuoteSection {...section} key={`${section.variant}-${index}`} />;
          })}
        </div>
      </div>

      <div className="case-study-page__footer-tear" aria-hidden="true" />
      <HomeFooter />
    </main>
  );
}
