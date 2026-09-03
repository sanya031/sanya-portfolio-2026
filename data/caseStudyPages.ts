export type CaseStudyAsset = {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
  caption?: string;
  overlayLabel?: string;
  frame?:
    | "hero"
    | "problem"
    | "walkthrough"
    | "resources"
    | "old-website"
    | "before-after"
    | "key-decision-2"
    | "claim-preview"
    | "withdraw-transcript"
    | "placeholder";
  scrollable?: boolean;
  empty?: boolean;
};

export type CaseStudyTextBlock = {
  eyebrow?: string;
  title: string;
  titleSize?: "small" | "medium";
  body: string[];
  emphasis?: string;
  decisionNotes?: Array<{
    title: string;
    body: string;
  }>;
};

export type CaseStudyFinding = {
  image: CaseStudyAsset;
  title: string;
  body: string;
};

export type CaseStudyFact = {
  label: string;
  value: string[];
};

export type CaseStudyPage = {
  slug: string;
  meta: string[];
  title: string;
  subtitle?: string;
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    image: string;
  };
  hero: CaseStudyAsset;
  facts: CaseStudyFact[];
  sections: Array<
    | ({ variant: "text" } & CaseStudyTextBlock)
    | ({ variant: "split" } & CaseStudyTextBlock & { cards: CaseStudyTextBlock[] })
    | ({ variant: "media" } & CaseStudyAsset)
    | ({ variant: "media-grid"; items: CaseStudyAsset[] })
    | ({ variant: "audit-artifacts"; items: CaseStudyAsset[] })
    | ({ variant: "audit-findings"; items: CaseStudyFinding[] })
    | { variant: "butter-container" }
    | { variant: "workflow-comparison" }
    | { variant: "logo-grid" }
    | { variant: "visual-system-grid" }
    | { variant: "two-column-row" }
    | { variant: "portal-comparison-row" }
    | { variant: "withdraw-support-row" }
    | { variant: "review-states-stack" }
    | { variant: "resource-card-stack" }
    | ({ variant: "graphic"; label?: string; src?: string; alt?: string })
    | ({ variant: "carousel"; items: CaseStudyAsset[] })
    | ({ variant: "quote"; quote: string; highlight?: string; author: string; role: string })
    | ({
        variant: "ordered";
        eyebrow?: string;
        title: string;
        titleSize?: "small" | "medium";
        intro: string;
        items: string[];
        columns?: boolean;
      })
  >;
};

const transcriptReviewBasePath = "/assets/case-study-1";
const basePath = "/assets/case-study-2";

export const caseStudyPages: CaseStudyPage[] = [
  {
    slug: "transcript-review-redesign",
    meta: ["Bitcoin Transcript Review", "Jun 2026", "Handed-off"],
    title: "Redesigning a fragmented contributor workflow from discovery to reward.",
    subtitle:
      "Bitcoin Transcript Review is an open-source product where contributors review and correct transcripts of Bitcoin educational content in exchange for project rewards.",
    seo: {
      title: "Transcript Review Redesign | Sanya Malhotra",
      description:
        "A product design case study simplifying transcript reviews from discovery and claiming to editing, submission, and reward tracking.",
      ogTitle: "Simplifying Transcript Reviews from Discovery to Reward",
      ogDescription:
        "A case study on redesigning fragmented contributor workflows into a clearer, faster transcript review experience.",
      image: `${transcriptReviewBasePath}/key-decision-2 (1) 1.png`,
    },
    hero: {
      type: "video",
      src: `${transcriptReviewBasePath}/hero-scene-1.mp4`,
      alt: "Animated hero preview of the Bitcoin Transcript Review redesign",
      frame: "hero",
    },
    facts: [
      {
        label: "Organisation",
        value: ["Bitcoin Dev Project", "Bitcoin Transcript Review (Product)"],
      },
      { label: "Collaborators", value: ["Team Lead", "1 Developer"] },
      { label: "Role", value: ["Product Designer"] },
      { label: "Timeline", value: ["1 Month"] },
      {
        label: "Responsibilities",
        value: [
          "UX audit",
          "Information architecture",
          "Interaction and visual design",
          "Developer handoff",
        ],
      },
    ],
    sections: [
      {
        variant: "text",
        eyebrow: "Overview",
        title: "Connecting 4 fragmented workflows into a clearer review experience.",
        body: [
          "The product split transcript discovery, claiming, editing and rewards across disconnected workflows, making it difficult for contributors to understand what to do next and leaving incomplete work locked for 24 hours.",
          "I audited the end-to-end journey and reorganized it around clearer stages. Contributors could preview a transcript before claiming it, manage active and completed reviews separately, and withdraw work they could not complete.",
          "The redesigned workflow was approved and handed off for development, while preserving the existing claim and reward logic.",
        ],
      },
      {
        variant: "graphic",
      },
      {
        variant: "text",
        eyebrow: "Audit",
        title: "Each screen worked independently, but the journey between them did not.",
        body: [
          "I walked through the live product as both a new and returning contributor, documenting friction across discovery, claiming, editing and review history.",
          "I reviewed the findings with the Team Lead and developer to distinguish usability problems from intentional product rules and backend constraints.",
        ],
      },
      {
        variant: "audit-artifacts",
        items: [
          {
            type: "image",
            src: `${transcriptReviewBasePath}/figjam.png`,
            alt: "FigJam audit notes grouped by contributor journey stage",
            overlayLabel: "SNIPPET FROM FIGJAM",
          },
          {
            type: "image",
            src: `${transcriptReviewBasePath}/dsgn_evol.png`,
            alt: "Design evolution from the transcript review redesign process",
            overlayLabel: "DESIGN EVOLUTION",
          },
        ],
      },
      {
        variant: "text",
        eyebrow: "Audit Findings",
        title: "The audit surfaced three recurring problems.",
        body: [
          "Each appeared at a different point in the journey: finding work, committing to it, and tracking it. All three came from the same disconnect between screens.",
        ],
      },
      {
        variant: "butter-container",
      },
      {
        variant: "text",
        eyebrow: "Solution",
        title: "Turning disconnected screens into a connected sequence of stages.",
        body: [
          "The three problems shared one root cause, so I addressed them together. I reorganized the workflow into clear stages for browsing, previewing, claiming, editing and tracking, and kept those stages connected as contributors moved through them.",
          "Finding work stayed available at every stage, contributors gained enough context to judge a review before claiming it, and active work was separated from completed work. The existing 24-hour claim and reward logic was preserved.",
        ],
      },
      {
        variant: "workflow-comparison",
      },
      {
        variant: "text",
        eyebrow: "Constraints & Trade-offs",
        title: "Improving the workflow meant changing the experience without changing the rules underneath.",
        body: [
          "The redesign had to preserve the existing claim and reward logic, use the established design system and minimize backend development. I prioritized changes to navigation, hierarchy and interaction while adapting or deferring ideas that required additional product logic.",
        ],
      },
      {
        variant: "graphic",
      },
      {
        variant: "text",
        eyebrow: "Key Design Decision 01 · Navigation",
        title: "Primary contributor tasks should remain accessible at every stage.",
        body: [
          "Available Reviews and My Reviews represented the product's two primary contributor goals: finding new work and continuing existing work.",
          "I moved both out of the profile drawer and into the primary navigation so contributors could access them throughout the review journey.",
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${transcriptReviewBasePath}/key-1.png`,
        alt: "Before and after of moving primary contributor tasks into the main navigation",
        frame: "before-after",
      },
      {
        variant: "text",
        eyebrow: "Key Design Decision 02 · Browsing",
        title: "Choosing work should feel like browsing opportunities, not scanning a database.",
        body: [
          "The original table separated related information across distant columns and repeated Claim on every row. I regrouped each transcript's title, source, speakers, labels, duration and reward into one selectable item that opened a preview.",
          "This shifted the first action from accepting work to evaluating it.",
        ],
      },
      {
        variant: "graphic",
      },
      {
        variant: "text",
        titleSize: "small",
        title: "Simplifying reward without making payout the primary choice.",
        body: [
          "The original reward indicator used both colour and coin quantity, making its levels harder to decode. I proposed displaying exact sats, but the team did not want payout to become the primary selection criterion.",
          "I retained three relative reward levels while simplifying them into monochrome coin stacks.",
        ],
      },
      {
        variant: "graphic",
      },
      {
        variant: "text",
        eyebrow: "Key Decision 03 · Claiming",
        title: "Contributors should understand a review before starting the timer.",
        body: [
          "Selecting a transcript now opens the editor in read-only preview mode. Contributors can inspect the source video, transcript, speakers, labels and review details before claiming it.",
          "Claiming unlocks the editing controls and begins the existing 24-hour review window.",
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${transcriptReviewBasePath}/claim preview.png`,
        alt: "Transcript preview mode before a contributor claims a review",
        overlayLabel: "PREVIEW BEFORE CLAIMING",
        frame: "claim-preview",
      },
      {
        variant: "text",
        eyebrow: "Key Design Decision 04 · Editor",
        title: "Contributors needed a way to leave work they could not complete.",
        body: [
          "The editor now keeps claim status and its primary actions visible throughout the review. Contributors can withdraw work they cannot complete, allowing the transcript to return to the available pool instead of remaining unavailable until the claim expires.",
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${transcriptReviewBasePath}/withdraw transcript.png`,
        alt: "Withdraw transcript confirmation modal in the editor",
        overlayLabel: "WITHDRAWING CLAIMED REVIEW",
        frame: "withdraw-transcript",
      },
      {
        variant: "text",
        titleSize: "small",
        title: "The editor should support review work without unnecessary context switching.",
        body: [
          "I brought video navigation, timestamp controls and speaker management into the editing workspace. I also reduced competing toolbar actions, collapsed secondary transcript details and clarified the deadline treatment.",
        ],
      },
      {
        variant: "withdraw-support-row",
      },
      {
        variant: "text",
        eyebrow: "Key Decision 05 · Review States",
        title: "Active work should take priority over reference information.",
        body: [
          "I proposed separating active work from review history because the two views supported different decisions. Active reviews prioritize deadlines and continuation actions, while history tracks pending, published, expired and rewarded work.",
          "After reviewing alternative structures with the team, we moved forward with this direction.",
        ],
      },
      {
        variant: "graphic",
        label: "ORIGINAL MIXED LAYOUT",
        src: `${transcriptReviewBasePath}/Mixed-layout.png`,
        alt: "The original layout showing current and past transcript review jobs together",
      },
      {
        variant: "text",
        eyebrow: "Outcome",
        title: "The approved redesign connected the contributor journey without rebuilding the product.",
        body: [
          "I delivered the redesigned discovery, claiming, editing, withdrawal, history and reward states as a connected interface and reviewed the final direction with the Team Lead and developer.",
          "The workflows were approved and handed off for development. Because the redesign had not launched, production impact was not yet available.",
        ],
      },
      {
        variant: "graphic",
      },
      {
        variant: "text",
        eyebrow: "Reflection",
        title: "Designing within real product constraints.",
        body: [
          "Working within a constrained product taught me to distinguish between changes that required new functionality and changes that could improve the experience through clearer structure. By preserving the underlying system, I could focus the available development effort on the moments that most affected the contributor journey.",
        ],
      },
    ],
  },
  {
    slug: "bitcoin-dev-project-redesign",
    meta: ["Bitcoin Dev Project", "Dec 2025", "Shipped"],
    title: "Restructuring how developers discover resources across an open-source Bitcoin platform.",
    seo: {
      title: "Bitcoin Dev Project Website & Brand Redesign | Sanya Malhotra",
      description:
        "A product and brand design case study restructuring Bitcoin Dev Project's website, resource discovery, identity, and visual system.",
      ogTitle: "Bitcoin Dev Project Website & Brand Redesign",
      ogDescription:
        "A case study on redesigning a developer community website and creating a scalable visual identity for Bitcoin Dev Project.",
      image: `${basePath}/problem-img.jpg`,
    },
    hero: {
      type: "video",
      src: `${basePath}/hero-media.mp4`,
      alt: "Animated preview of the Bitcoin Dev Project website redesign",
      frame: "hero",
    },
    facts: [
      { label: "Organisation", value: ["Bitcoin Dev Project"] },
      {
        label: "Collaborators",
        value: ["2 Developers", "Open-source developers", "1 PM", "1 Designer (me)"],
      },
      { label: "Timeline", value: ["4 Months", "Shipped Dec 2025"] },
      {
        label: "Skills",
        value: [
          "Product Design",
          "Brand Identity Design",
          "Information Architecture",
          "Visual Design & Craft",
        ],
      },
    ],
    sections: [
      {
        variant: "text",
        eyebrow: "Overview",
        title: "Restructuring resource discovery and building an identity that could scale",
        body: [
          "As Bitcoin Dev Project grew from a community initiative into a broader platform for Bitcoin developers, its website and identity hadn't evolved with it. Resources were spread across disconnected pages and long lists, making it difficult for visitors to understand what BDP offered and find the right path for their goals.",
          "I led the end-to-end website redesign, restructuring the information architecture around user goals, simplifying navigation, and surfacing resources earlier in the journey. Alongside it, I created a new visual identity and reusable design system to give BDP a recognizable, consistent foundation across its website and community initiatives.",
          "In the first month after launch, site visits increased by 19% and bounce rate decreased by 8% compared with the month before launch.",
        ],
      },
      {
        variant: "split",
        eyebrow: "Problem",
        title: "As the project grew, its website no longer reflected its scale or purpose",
        body: [
          "Bitcoin Dev Project offered valuable resources for developers, but the website made it difficult to understand the full ecosystem or decide where to begin. The experience presented two connected challenges:",
        ],
        cards: [
          {
            title: "Resource discovery was fragmented",
            body: [
              "Resources were spread across separate pages and presented through long, disconnected lists. This required visitors to understand BDP's internal structure before they could find something relevant to their goals.",
            ],
          },
          {
            title: "BDP lacked a recognisable identity",
            body: [
              "The organisation's visual identity no longer reflected the maturity of the project. The experience felt inconsistent across the website and community materials, making it harder to build recognition and trust.",
            ],
          },
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${basePath}/problem-img.jpg`,
        alt: "Scrollable view of the previous Bitcoin Dev Project website",
        overlayLabel: "OLD HOMEPAGE AND LOGO",
        frame: "problem",
      },
      {
        variant: "ordered",
        eyebrow: "Requirements",
        title: "The new website and identity needed to grow with the project",
        intro:
          "This was not simply a visual refresh. The redesign needed to make the organization clearer today while creating a flexible foundation for future resources and initiatives.",
        items: [
          "1. Explain BDP quickly",
          "2. Organise resources around user goals",
          "3. Make resources easier to browse",
          "4. Create a recognisable identity",
          "5. Support future growth",
        ],
        columns: true,
      },
      {
        variant: "text",
        eyebrow: "Design Decisions",
        title: "Building an identity that makes a technical project feel more human",
        body: [
          "Bitcoin organizations often rely on abstract, geometric, or finance-focused visual identities. We wanted BDP to feel different: technical and credible, but also curious, welcoming, and community-led.",
          "We explored more organic, character-driven identity directions and selected the pangolin as BDP's central symbol.",
        ],
      },
      {
        variant: "text",
        title: "Why a pangolin?",
        body: [
          "Pangolins are curious, resilient animals that move quietly and deliberately through their environment. These qualities felt connected to the open-source Bitcoin developer community: people doing complex, important work that may not always be visible to the wider public. The pangolin also gave BDP a distinctive and ownable symbol without relying on familiar Bitcoin imagery.",
        ],
      },
      {
        variant: "text",
        title: "From exploration to a flexible identity",
        body: [
          "The early logo explorations focused on finding a silhouette that remained recognizable at different sizes. The selected direction simplified the pangolin into a compact logomark that could work independently or alongside the Bitcoin Dev Project wordmark.",
        ],
      },
      {
        variant: "logo-grid",
      },
      {
        variant: "text",
        title: "Designing a visual system that balances warmth and credibility",
        body: [
          "The visual system needed to welcome developers who were new to Bitcoin without feeling overly casual to experienced contributors.",
        ],
      },
      {
        variant: "visual-system-grid",
      },
      {
        variant: "ordered",
        title: "Organizing the homepage around what visitors came to do",
        intro:
          "Instead of expecting visitors to understand how the organization was structured, the homepage presented clear actions based on what they wanted to accomplish. The new homepage helps visitors:",
        items: [
          "1. Understand BDP's mission",
          "2. See who the community supports",
          "3. Choose a pathway based on their goal",
          "4. Discover featured resources and opportunities",
          "5. Build familiarity with the new identity",
        ],
        columns: true,
      },
      {
        variant: "media",
        type: "video",
        src: `${basePath}/homepage_walkthrough.mp4`,
        alt: "Homepage walkthrough for the redesigned Bitcoin Dev Project site",
        overlayLabel: "NEW HOMEPAGE WALKTHROUGH",
        frame: "walkthrough",
      },
      {
        variant: "carousel",
        items: Array.from({ length: 9 }, (_, index) => ({
          type: "image",
          src: `${basePath}/home/mobile-${index + 1}.png`,
          alt: `Mobile screen ${index + 1} from the Bitcoin Dev Project website`,
        })),
      },
      {
        variant: "split",
        title: "Reorganizing the website around user intent",
        body: [
          "Previously, resources lived across separate pages and were presented as long lists. There was no central place to understand what was available or compare different options. The redesign organized the experience around three user intentions:",
        ],
        cards: [
          {
            title: "Learn",
            body: [
              "Resources for understanding Bitcoin development and building technical knowledge.",
            ],
          },
          {
            title: "Contribute",
            body: ["Guidance and opportunities for contributing to open-source Bitcoin projects."],
          },
          {
            title: "Get Funded",
            body: ["Information about grants, fellowships, and funding opportunities."],
          },
        ],
      },
      {
        variant: "media",
        type: "video",
        src: `${basePath}/exploring-resources.mp4`,
        alt: "Exploring resources interaction on the redesigned site",
        overlayLabel: "EXPLORING RESOURCES",
        frame: "resources",
      },
      {
        variant: "text",
        title: "Reimagining how developers discover resources",
        body: [
          "The original website presented resources through long, disconnected lists. This made it difficult to compare options, understand their level, or quickly find something relevant.",
          "The redesigned experience centralized resources into a dedicated discovery system.",
          "Each resource was presented as a reusable card with clear information about its format and difficulty. This made the content easier to scan while giving visitors more control over how they explored it.",
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${basePath}/old-website-snippet.png`,
        alt: "Snippet from the old Bitcoin Dev Project website",
        frame: "old-website",
        scrollable: true,
      },
      {
        variant: "text",
        title: "Iteration 1: Grouping resources strictly by difficulty",
        titleSize: "small",
        body: [
          "The first direction divided resources into beginner, intermediate, and advanced sections.",
          "This created a clear hierarchy, but the number of beginner resources made the page unbalanced. The long beginner section pushed intermediate and advanced content much further down the page. As the resource library grew, this structure would make certain categories increasingly difficult to reach.",
        ],
      },
      {
        variant: "text",
        title: "Iteration 2: Collapsing sections behind \"View more\"",
        titleSize: "small",
        body: [
          "The second direction shortened the page by initially hiding some resources behind \"View more\" controls.",
          "Although this reduced scrolling, it also reduced visibility. Visitors had to repeatedly open sections to understand what was available, adding effort to a task that should support quick exploration. Important resources could remain hidden simply because a visitor did not expand the correct section.",
        ],
      },
      {
        variant: "two-column-row",
      },
      {
        variant: "text",
        title: "Final iteration: A mixed layout with visible difficulty",
        titleSize: "small",
        body: [
          "The selected direction surfaced resources together while showing difficulty directly on each card. This allowed visitors to scan the full collection without moving through several separate sections. Filters provided additional control without hiding resources by default.",
        ],
      },
      {
        variant: "resource-card-stack",
      },
      {
        variant: "text",
        eyebrow: "Impact & Learnings",
        title: "Improving resource discovery and strengthening recognition",
        body: [
          "The redesigned website launched in December 2025 and is actively used by the Bitcoin Dev Project community.",
          "The final website reflected significant changes informed by usability testing, including a revised information architecture, clearer navigation, more direct copy, and improved page hierarchy. During the first month after launch, website visits increased by 19% and bounce rate decreased by 8%.",
        ],
      },
      {
        variant: "text",
        title: "Team Perspective",
        titleSize: "medium",
        body: [],
      },
      {
        variant: "quote",
        quote:
          "Her illustration and visual design work is particularly strong. She redesigned our website with original hand-drawn illustrations that gave the brand a warm, playful feel, exactly the tone we were going for. She also has a good eye for user flows and thinks carefully about the full experience. She is no stranger to going past the visuals and digging into the \"why\" behind design decisions.",
        highlight:
          "She is no stranger to going past the visuals and digging into the \"why\" behind design decisions.",
        author: "Stacie Waleyko",
        role: "Team Lead, Bitcoin Dev Project",
      },
      {
        variant: "text",
        title: "Using AI as an accelerator",
        body: [
          "AI-assisted image generation helped speed up early illustration exploration.",
          "However, the generated images were not consistent enough to function as final brand assets. I manually redrew and refined the selected directions to match the visual system and maintain consistency across different applications.",
          "This process reinforced the importance of using AI to accelerate exploration while retaining human judgment over the final design.",
        ],
      },
      {
        variant: "portal-comparison-row",
      },
      {
        variant: "ordered",
        title: "What I would explore next",
        intro:
          "If I continued developing the website, I would conduct more structured usability testing with developers at different experience levels.",
        items: [
          "1. Whether first-time visitors understand BDP's purpose",
          "2. How quickly developers can find a relevant resource",
          "3. Whether the difficulty labels match user expectations",
          "4. Which filters are most useful as the resource library grows",
          "5. How often visitors move between Learn, Contribute, and Get Funded",
        ],
      },
    ],
  },
];

export function getCaseStudyPage(slug: string) {
  return caseStudyPages.find((page) => page.slug === slug);
}
