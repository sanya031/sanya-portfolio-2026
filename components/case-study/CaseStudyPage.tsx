import type {
  CaseStudyAsset,
  CaseStudyFinding,
  CaseStudyPage as CaseStudyPageData,
} from "../../data/caseStudyPages";
import type { ReactNode } from "react";
import { navItems } from "../../data/navItems";
import { HomeFooter } from "../home/HomeFooter";
import { BackToWorkLink } from "../navigation/BackToWorkLink";
import { FloatingNavbar } from "../navigation/FloatingNavbar";
import { AutoScrollCarousel } from "./AutoScrollCarousel";
import { ButterIssueTabs } from "./ButterIssueTabs";
import { CaseStudyMedia } from "./CaseStudyMedia";
import {
  CaseStudySectionRail,
  type CaseStudySectionNavItem,
} from "./CaseStudySectionRail";
import { PlaybackVideo } from "./PlaybackVideo";
import { ResourceCardStack } from "./ResourceCardStack";
import { HeroContentReveal } from "../transitions/HeroContentReveal";
import { ScrollToTopOnMount } from "../transitions/ScrollToTopOnMount";

export type CaseStudyPageProps = {
  page: CaseStudyPageData;
};

const sectionAnchorsBySlug: Record<string, Record<number, string>> = {
  "transcript-review-redesign": {
    0: "overview",
    2: "audit",
    4: "audit-findings",
    6: "solution",
    7: "workflow-comparison",
    8: "constraints",
    10: "primary-navigation",
    12: "transcript-browsing",
    16: "preview-before-claiming",
    18: "withdrawing-work",
    22: "review-states",
    24: "outcome",
    26: "reflection",
  },
  "bitcoin-dev-project-redesign": {
    0: "overview",
    1: "problem",
    3: "requirements",
    4: "design-decisions",
    5: "why-a-pangolin",
    6: "flexible-identity",
    8: "visual-system",
    10: "homepage-walkthrough",
    13: "resource-discovery",
    17: "resource-iterations",
    22: "impact-learnings",
    23: "team-perspective",
    25: "using-ai-as-an-accelerator",
    27: "explore-next",
  },
};

const navItemsBySlug: Record<string, CaseStudySectionNavItem[]> = {
  "transcript-review-redesign": [
    { id: "overview", label: "Overview" },
    { id: "audit", label: "Audit" },
    { id: "audit-findings", label: "Problems", secondary: true },
    { id: "solution", label: "Solution" },
    { id: "workflow-comparison", label: "Workflow Comparison", secondary: true },
    { id: "constraints", label: "Constraints & Trade-offs", secondary: true },
    { id: "primary-navigation", label: "Key Decisions" },
    { id: "primary-navigation", label: "Navigation", secondary: true },
    { id: "transcript-browsing", label: "Browsing", secondary: true },
    { id: "preview-before-claiming", label: "Claiming", secondary: true },
    { id: "withdrawing-work", label: "Editor", secondary: true },
    { id: "review-states", label: "Review States", secondary: true },
    { id: "outcome", label: "Outcome" },
    { id: "reflection", label: "Reflection" },
  ],
  "bitcoin-dev-project-redesign": [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "requirements", label: "Requirements" },
    { id: "design-decisions", label: "Design Decisions" },
    { id: "why-a-pangolin", label: "Why a Pangolin", secondary: true },
    { id: "flexible-identity", label: "Flexible Identity", secondary: true },
    { id: "visual-system", label: "Visual System", secondary: true },
    { id: "homepage-walkthrough", label: "Homepage Walkthrough", secondary: true },
    { id: "resource-discovery", label: "Resource Discovery", secondary: true },
    { id: "resource-iterations", label: "Resource Iterations", secondary: true },
    { id: "impact-learnings", label: "Impact & Learnings" },
    { id: "team-perspective", label: "Team Perspective", secondary: true },
    { id: "using-ai-as-an-accelerator", label: "Using AI as an Accelerator", secondary: true },
    { id: "explore-next", label: "What I'd Explore Next", secondary: true },
  ],
};

function TextSection({
  eyebrow,
  title,
  titleSize,
  body,
  emphasis,
  decisionNotes,
}: {
  eyebrow?: string;
  title: string;
  titleSize?: "small" | "medium";
  body: string[];
  emphasis?: string;
  decisionNotes?: Array<{
    title: string;
    body: string;
  }>;
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
        {decisionNotes?.length ? (
          <div className="case-study-page__decision-notes">
            {decisionNotes.map((note) => (
              <article key={note.title}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </article>
            ))}
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
          src="/assets/case-study-2/character-design-decisions-2.mp4"
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

function GraphicPlaceholderSection({
  label,
  src,
  alt,
  note,
}: {
  label?: string;
  src?: string;
  alt?: string;
  note?: string;
}) {
  return (
    <section
      className="case-study-page__graphic-placeholder"
      data-filled={src ? "true" : undefined}
      data-noted={note ? "true" : undefined}
      aria-hidden={src ? undefined : "true"}
    >
      <span>{label ?? "GRAPHIC"}</span>
      {note ? <p className="case-study-page__graphic-placeholder-note">{note}</p> : null}
      {src ? <img alt={alt ?? ""} src={src} /> : null}
    </section>
  );
}

function BrowsingComparisonSection() {
  return (
    <section
      className="case-study-page__browsing-comparison"
      aria-label="Original table and redesigned list, with a row-level comparison"
    >
      <figure>
        <span>BEFORE · ORIGINAL TABLE</span>
        <img
          alt="The original transcript table spreading related information across separate columns"
          src="/assets/case-study-1/before_key_1.png"
        />
      </figure>
      <figure>
        <span>AFTER · COMPACT LIST</span>
        <img
          alt="The redesigned list grouping each transcript into one selectable item"
          src="/assets/case-study-1/after_key_2.png"
        />
      </figure>
      <figure>
        <span>ROW-LEVEL COMPARISON</span>
        <img
          alt="A single transcript shown as an old table row above and the redesigned list rows below"
          src="/assets/case-study-1/list.png"
        />
      </figure>
    </section>
  );
}

function ButterContainerSection() {
  return (
    <section className="case-study-page__butter-block" aria-label="Audit summary">
      <ButterIssueTabs />
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

function ReviewStatesStackSection() {
  return (
    <section className="case-study-page__review-states-stack" aria-label="Active and completed review states">
      <article className="case-study-page__review-state">
        <span>ACTIVE REVIEWS</span>
        <img
          alt="Active reviews tab for transcript reviews that require action"
          src="/assets/case-study-1/in progress.png?v=2"
        />
      </article>
      <article className="case-study-page__review-state">
        <span>REVIEW HISTORY</span>
        <img
          alt="Review history tab for completed and past transcript reviews"
          src="/assets/case-study-1/completed.png?v=2"
        />
      </article>
    </section>
  );
}

function WithdrawSupportRowSection() {
  return (
    <section className="case-study-page__withdraw-support-row" aria-label="Withdraw review supporting details">
      <article>
        <span>PERSISTENT STATUS BAR</span>
        <div className="case-study-page__control-comparison">
          <div>
            <small>BEFORE</small>
            <img
              alt="Original editor controls before simplification"
              src="/assets/case-study-1/before controls.png"
            />
          </div>
          <div>
            <small>AFTER</small>
            <img
              alt="Updated editor controls after simplification"
              src="/assets/case-study-1/after controls.png"
            />
          </div>
        </div>
      </article>
      <article>
        <span>KEY ACTIONS IN THE EDITOR</span>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src="/assets/case-study-1/editing-controls.mp4"
        />
      </article>
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
  const sectionAnchors = sectionAnchorsBySlug[page.slug] ?? {};
  const sectionNavItems = navItemsBySlug[page.slug] ?? [];

  return (
    <main className="case-study-page" data-case-study-slug={page.slug}>
      <ScrollToTopOnMount />
      <FloatingNavbar
        autoExpandOnScroll={false}
        hideOnFirstFold={false}
        homeHref="/"
        items={navItems}
        lockVariant
        variant="light"
        workHref="/#work"
      />
      {sectionNavItems.length ? <CaseStudySectionRail items={sectionNavItems} /> : null}
      <div className="case-study-page__paper">
        <header className="case-study-page__hero">
          <HeroContentReveal>
            <BackToWorkLink className="case-study-page__back-link">
              <span className="case-study-page__back-link-track">
                <svg aria-hidden="true" viewBox="0 0 18 10">
                  <path d="M5.1 1 1 5m0 0 4.1 4M1 5h16" />
                </svg>
                Back to work
                <svg
                  aria-hidden="true"
                  className="case-study-page__back-link-next-arrow"
                  viewBox="0 0 18 10"
                >
                  <path d="M5.1 1 1 5m0 0 4.1 4M1 5h16" />
                </svg>
              </span>
            </BackToWorkLink>
            <div className="case-study-page__meta" aria-label="Case study metadata">
              {page.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h1>{page.title}</h1>
            {page.subtitle ? (
              <p className="case-study-page__subtitle">{page.subtitle}</p>
            ) : null}
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
            const sectionKey = `${section.variant}-${index}`;
            const anchorId = sectionAnchors[index];
            const withAnchor = (content: ReactNode) =>
              anchorId ? (
                <div className="case-study-page__section-anchor" id={anchorId} key={sectionKey}>
                  {content}
                </div>
              ) : (
                <div className="case-study-page__section-anchor" key={sectionKey}>
                  {content}
                </div>
              );

            if (section.variant === "text") {
              return withAnchor(<TextSection {...section} />);
            }

            if (section.variant === "split") {
              return withAnchor(<SplitSection {...section} />);
            }

            if (section.variant === "ordered") {
              return withAnchor(<OrderedSection {...section} />);
            }

            if (section.variant === "media") {
              return withAnchor(
                <CaseStudyMedia
                  asset={section}
                  className="case-study-page__full-media"
                />,
              );
            }

            if (section.variant === "media-grid") {
              return withAnchor(
                <section className="case-study-page__media-grid">
                  {section.items.map((item) => (
                    <CaseStudyMedia asset={item} key={item.src} />
                  ))}
                </section>,
              );
            }

            if (section.variant === "audit-artifacts") {
              return withAnchor(<AuditArtifactsSection items={section.items} />);
            }

            if (section.variant === "audit-findings") {
              return withAnchor(<AuditFindingsSection items={section.items} />);
            }

            if (section.variant === "graphic") {
              return withAnchor(
                <GraphicPlaceholderSection
                  alt={section.alt}
                  label={section.label}
                  note={section.note}
                  src={section.src}
                />,
              );
            }

            if (section.variant === "butter-container") {
              return withAnchor(<ButterContainerSection />);
            }

            if (section.variant === "workflow-comparison") {
              return withAnchor(<WorkflowComparisonSection />);
            }

            if (section.variant === "browsing-comparison") {
              return withAnchor(<BrowsingComparisonSection />);
            }

            if (section.variant === "logo-grid") {
              return withAnchor(<LogoGridSection />);
            }

            if (section.variant === "visual-system-grid") {
              return withAnchor(<VisualSystemGridSection />);
            }

            if (section.variant === "two-column-row") {
              return withAnchor(<TwoColumnRowSection />);
            }

            if (section.variant === "portal-comparison-row") {
              return withAnchor(<PortalComparisonRowSection />);
            }

            if (section.variant === "withdraw-support-row") {
              return withAnchor(<WithdrawSupportRowSection />);
            }

            if (section.variant === "review-states-stack") {
              return withAnchor(<ReviewStatesStackSection />);
            }

            if (section.variant === "resource-card-stack") {
              return withAnchor(<ResourceCardStack cards={resourceCards} />);
            }

            if (section.variant === "carousel") {
              return withAnchor(<AutoScrollCarousel items={section.items} />);
            }

            return withAnchor(<QuoteSection {...section} />);
          })}
        </div>
      </div>

      <div className="case-study-page__footer-tear" aria-hidden="true" />
      <HomeFooter />
    </main>
  );
}
