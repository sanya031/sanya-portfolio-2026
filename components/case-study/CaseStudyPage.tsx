import Link from "next/link";
import type { CaseStudyPage as CaseStudyPageData } from "../../data/caseStudyPages";
import { HomeFooter } from "../home/HomeFooter";
import { AutoScrollCarousel } from "./AutoScrollCarousel";
import { CaseStudyMedia } from "./CaseStudyMedia";

export type CaseStudyPageProps = {
  page: CaseStudyPageData;
};

function TextSection({
  eyebrow,
  title,
  body,
  emphasis,
}: {
  eyebrow?: string;
  title: string;
  body: string[];
  emphasis?: string;
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
          {emphasis ? <p className="case-study-page__emphasis">{emphasis}</p> : null}
        </div>
      </div>
    </section>
  );
}

function OrderedSection({
  eyebrow,
  title,
  intro,
  items,
  columns,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  items: string[];
  columns?: boolean;
}) {
  return (
    <section className="case-study-page__section" data-columns={columns}>
      {eyebrow ? <p className="case-study-page__eyebrow">{eyebrow}</p> : null}
      <div className="case-study-page__text-stack">
        <h2 className="case-study-page__section-title">{title}</h2>
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

function QuoteSection({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <section className="case-study-page__quote">
      <span className="case-study-page__quote-mark" aria-hidden="true">
        "
      </span>
      <blockquote>{quote}</blockquote>
      <p>
        <strong>{author}</strong>
        <span>{role}</span>
      </p>
    </section>
  );
}

export function CaseStudyPage({ page }: CaseStudyPageProps) {
  return (
    <main className="case-study-page">
      <div className="case-study-page__paper">
        <header className="case-study-page__hero">
          <Link className="case-study-page__back-link" href="/#work">
            Back to work
          </Link>
          <div className="case-study-page__meta" aria-label="Case study metadata">
            {page.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <h1>{page.title}</h1>
          <CaseStudyMedia asset={page.hero} className="case-study-page__hero-media" />
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

            if (section.variant === "carousel") {
              return <AutoScrollCarousel items={section.items} key={`${section.variant}-${index}`} />;
            }

            return <QuoteSection {...section} key={`${section.variant}-${index}`} />;
          })}
        </div>
      </div>

      <HomeFooter />
    </main>
  );
}
