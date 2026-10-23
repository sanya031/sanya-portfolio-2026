import type { ReactNode } from "react";
import type { TranscriptStoryVisual } from "../../data/caseStudyPages";
import { FindingWorkVisual } from "./FindingWorkVisual";
import {
  assetPath,
  bandSquiggles,
  ContainerLabel,
  Shot,
  Squiggles,
  wavySquiggles,
} from "./transcriptStoryParts";

/** A container whose contents are positioned in the wireframe's pixel space. */
function Canvas({
  size,
  background,
  label,
  children,
  className,
}: {
  size: { w: number; h: number };
  background: string;
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`transcript-story__canvas${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: `${size.w} / ${size.h}`, background }}
    >
      {children}
      <figcaption>{label}</figcaption>
    </figure>
  );
}

const journeySteps = ["Find a transcript", "Claim", "Submit", "Team Reviews & Approves it", "Get Rewards"];

function JourneyVisual() {
  const size = { w: 716, h: 132 };

  return (
    <figure className="transcript-story__canvas transcript-story__journey" style={{ background: "#e5d1ff" }}>
      <Squiggles
        items={[
          { src: "squiggle-context-1.svg", x: -25.15, y: 10.82, w: 491.169, h: 39, rotate: -3.1, inset: "-128.19% -10.46% -126.65% -4.78%" },
          { src: "squiggle-context-2.svg", x: 323, y: 61, w: 411, h: 69, rotate: -4.66, inset: "-64.5% -10.57% -59.92% -5.96%" },
        ]}
        size={size}
      />
      <figcaption>
        <ContainerLabel lead="Original contributor journey" tone="#421879" />
      </figcaption>
      <ol className="transcript-story__journey-steps">
        {journeySteps.map((step, index) => (
          <li key={step}>
            {index > 0 ? <img alt="" aria-hidden="true" src={`${assetPath}/arrow.svg`} /> : null}
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const approachReferences = [
  {
    name: "Rev",
    src: "approach-rev.webp",
    alt: "Rev's transcript editor, with playback controls and the transcript side by side",
    box: { x: 12, y: 36, w: 301, h: 233 },
    title: "Keep the editor familiar",
    points: ["Retain playback and transcript controls together.", "Adapt the existing workspace for read-only preview."],
  },
  {
    name: "Sonix",
    src: "approach-sonix.webp",
    alt: "Sonix's transcript view, showing speakers and transcript text before editing",
    box: { x: 8, y: 40, w: 310, h: 208 },
    title: "Separate inspection from editing",
    points: ["Retain accessible transcript and speaker information.", "Unlock editing only after a review is claimed."],
  },
];

function ApproachVisual() {
  const size = { w: 326, h: 238 };

  return (
    <div className="transcript-story__approach">
      {approachReferences.map((reference) => (
        <figure key={reference.name}>
          <div
            className="transcript-story__canvas"
            style={{ aspectRatio: `${size.w} / ${size.h}`, background: "#f5f5f5" }}
          >
            <Squiggles items={bandSquiggles("grey")} size={size} />
            <Shot alt={reference.alt} box={reference.box} size={size} src={reference.src} />
            <p className="transcript-story__reference-name">{reference.name}</p>
          </div>
          <figcaption>
            <p>{reference.title}</p>
            <ul>
              {reference.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function PreviewVisual() {
  const before = { w: 716, h: 277 };
  const after = { w: 716, h: 364 };

  return (
    <div className="transcript-story__pair">
      <Canvas background="#f4f4f4" label={<ContainerLabel detail="Claim to inspect" lead="Before" />} size={before}>
        <Shot
          alt="Original flow: Browse, then Claim, then Editor, then Submit"
          box={{ x: 197, y: 65, w: 302, h: 27 }}
          size={before}
          src="claim-warning.webp"
        />
        <Shot
          alt="The editor straight after claiming, with a 23-hour countdown to review and submit already running"
          box={{ x: 75, y: 123, w: 567, h: 349 }}
          className="transcript-story__shot--framed"
          size={before}
          src="early-commit.webp"
        />
      </Canvas>
      <Canvas
        background="#bedafa"
        label={<ContainerLabel detail="Preview before claiming" lead="After" />}
        size={after}
      >
        <Squiggles items={wavySquiggles("after")} size={after} />
        <Shot
          alt="Redesigned flow: Browse, Preview, Claim, Editor and Submit, with Withdraw Transcript branching off the editor"
          box={{ x: 121, y: 71, w: 404, h: 56 }}
          size={after}
          src="preview-banner.webp"
        />
        <Shot
          alt="Read-only preview of Silent Payments Part 2, with a banner explaining that claiming unlocks editing and starts the 24-hour window"
          box={{ x: 34, y: 152, w: 648, h: 341 }}
          className="transcript-story__shot--top-rounded"
          size={after}
          src="preview-screen.webp"
        />
      </Canvas>
    </div>
  );
}

function WithdrawVisual() {
  const size = { w: 716, h: 315 };

  return (
    <Canvas
      background="#f9f9f9"
      label={<ContainerLabel lead="Now contributors could also withdraw from a claimed review" />}
      size={size}
    >
      <Shot
        alt="Withdraw review confirmation over the Silent Payments Part 2 editor, warning that withdrawing releases the review to other contributors and loses unsaved changes"
        box={{ x: 55, y: 52, w: 604, h: 262 }}
        size={size}
        src="withdraw-modal.webp"
      />
    </Canvas>
  );
}

function BrowseListVisual() {
  const before = { w: 716, h: 280 };
  const after = { w: 716, h: 347 };

  return (
    <div className="transcript-story__pair">
      <Canvas background="#f1f1f1" label={<ContainerLabel detail="Crowded review table" lead="Before" />} size={before}>
        <Shot
          alt="The original Transcripts waiting for review table, with title, speakers, time, reward and a Claim button in separate columns"
          box={{ x: 67, y: 55, w: 582, h: 324 }}
          className="transcript-story__shot--framed"
          size={before}
          src="old-review-table.webp"
        />
      </Canvas>
      <Canvas background="#f3efca" label={<ContainerLabel detail="Browseable list" lead="After" />} size={after}>
        <Squiggles items={wavySquiggles("list", 1, 1)} size={after} />
        <Shot
          alt="The redesigned Available transcripts list, grouping each transcript's title, source, speaker, tags, duration and reward into one row"
          box={{ x: 31, y: 55, w: 654, h: 342 }}
          className="transcript-story__shot--soft"
          size={after}
          src="available-reviews.webp"
        />
      </Canvas>
    </div>
  );
}

const rewardStages = [
  {
    lead: "Original",
    detail: "Too many visual cues",
    note: "Coin colour and stack height both communicated reward levels, making them harder to interpret.",
    images: [
      {
        src: "old-review-row.webp",
        alt: "Original table row with a two-coloured coin stack showing the reward level",
      },
    ],
  },
  {
    lead: "My proposal",
    detail: "Show exact rewards in sats",
    note: "I explored numerical payouts for clarity, but the team worried they would encourage reward-driven contributions.",
    images: [
      { src: "reward-sats-1.webp", alt: "Proposal showing the exact reward, 25,000 sats, in a tooltip on the coin icon" },
      { src: "reward-sats-2.webp", alt: "Proposal showing the exact reward, 25,000 sats, as text in the row" },
      { src: "reward-sats-3.webp", alt: "Proposal showing a coin icon with a shortened 25k sats reward" },
    ],
  },
  {
    lead: "Final",
    detail: "Keep relative rewards, simplify the scale",
    note: "I used one to three identical coins to communicate relative reward levels without emphasizing exact payouts.",
    images: [
      {
        src: "reward-coins.webp",
        alt: "Final list row showing the reward as a simple monochrome coin stack next to the duration",
      },
    ],
  },
];

function RewardsVisual() {
  return (
    <figure className="transcript-story__panel transcript-story__rewards" style={{ background: "#f5f5f5" }}>
      {rewardStages.map((stage) => (
        <div className="transcript-story__reward-stage" key={stage.lead}>
          <div className="transcript-story__reward-copy">
            <ContainerLabel detail={stage.detail} lead={stage.lead} />
            <p>{stage.note}</p>
          </div>
          <div className="transcript-story__reward-images" data-count={stage.images.length}>
            {stage.images.map((image) => (
              <img alt={image.alt} key={image.src} loading="lazy" src={`${assetPath}/${image.src}`} />
            ))}
          </div>
        </div>
      ))}
    </figure>
  );
}

function ReviewPagesVisual() {
  return (
    <figure className="transcript-story__panel transcript-story__review-pages" style={{ background: "#ffcf95" }}>
      <ContainerLabel lead="My reviews" detail="Prioritizing what needs attention and where to resume work" />
      <img
        alt="My reviews, with In progress and Past reviews tabs and a status for each submitted transcript"
        loading="lazy"
        src={`${assetPath}/my-reviews.webp`}
      />
      <ContainerLabel lead="Available reviews" detail="Making it easier to compare options before choosing new work" />
      <img
        alt="Available transcripts, listing reviews ready to claim with their tags, duration and reward"
        loading="lazy"
        src={`${assetPath}/available-reviews.webp`}
      />
    </figure>
  );
}

// Paste the Figma Make / prototype embed URL here (e.g. https://embed.figma.com/proto/...).
const PROTOTYPE_EMBED_SRC = "";

function PrototypeVisual() {
  return (
    <figure className="transcript-story__window">
      <div aria-hidden="true" className="transcript-story__window-bar">
        <span />
        <span />
        <span />
      </div>
      {PROTOTYPE_EMBED_SRC ? (
        <iframe
          allowFullScreen
          loading="lazy"
          src={PROTOTYPE_EMBED_SRC}
          title="Interactive Figma Make prototype of the redesigned Transcript Review journey"
        />
      ) : (
        <p className="transcript-story__window-empty">Prototype embed coming soon</p>
      )}
    </figure>
  );
}

const validationQuestions = [
  {
    question: "Are contributors editing more efficiently?",
    detail:
      "Measure time to complete a review, task success rates, and editing errors; observe where contributors hesitate, backtrack, or need help.",
  },
  {
    question: "Does previewing build confidence before claiming?",
    detail:
      "Measure claim-to-submission rates and withdrawals; ask contributors whether they understood the work involved and felt confident committing.",
  },
  {
    question: "Are fewer reviews left unfinished?",
    detail:
      "Track expired claims, withdrawal rates, and how quickly withdrawn reviews become available again; investigate why contributors abandon work.",
  },
  {
    question: "Are contributors remembering to save?",
    detail:
      "Measure unsaved changes and time between saves; observe whether timed toast reminders prompt saving or are ignored.",
  },
];

function ValidationVisual() {
  return (
    <ul className="transcript-story__questions">
      {validationQuestions.map((item) => (
        <li key={item.question}>
          <strong>{item.question}</strong> {item.detail}
        </li>
      ))}
    </ul>
  );
}

const visuals: Record<TranscriptStoryVisual, () => ReactNode> = {
  journey: JourneyVisual,
  "finding-work": FindingWorkVisual,
  approach: ApproachVisual,
  preview: PreviewVisual,
  withdraw: WithdrawVisual,
  "browse-list": BrowseListVisual,
  rewards: RewardsVisual,
  "review-pages": ReviewPagesVisual,
  prototype: PrototypeVisual,
  validation: ValidationVisual,
};

export function TranscriptStoryVisualBlock({ visual }: { visual: TranscriptStoryVisual }) {
  const Visual = visuals[visual];

  return <Visual />;
}
