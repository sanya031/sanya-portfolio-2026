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
  subLabel?: string;
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
    | { variant: "identity-grid" }
    | { variant: "testing-infographic" }
    | { variant: "two-column-row" }
    | { variant: "portal-comparison-row" }
    | { variant: "withdraw-support-row" }
    | { variant: "review-states-stack" }
    | { variant: "browsing-comparison" }
    | { variant: "resource-card-stack" }
    | ({
        variant: "graphic";
        label?: string;
        src?: string;
        alt?: string;
        note?: string;
        type?: "image" | "video";
        layout?: "row";
        bare?: boolean;
        tint?: string;
        items?: Array<{
          label?: string;
          src: string;
          alt?: string;
          type?: "image" | "video";
        }>;
      })
    | ({ variant: "carousel"; items: CaseStudyAsset[] })
    | ({ variant: "quote"; quote: string; highlight?: string; author?: string; role?: string })
    | ({
        variant: "ordered";
        eyebrow?: string;
        title: string;
        titleSize?: "small" | "medium";
        intro: string;
        items: string[];
        columns?: boolean;
      })
    | ({
        variant: "summary-banner";
        statement?: string;
        stats?: Array<{ value: string; label: string; icon?: "people" | "up" | "down" }>;
        heading?: string;
        subheading?: string;
        media?: { type: "image" | "video"; src: string; alt?: string };
        href?: string;
        characterSrc?: string;
        characterHoverSrc?: string;
        speechBubbleText?: string;
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
        variant: "summary-banner",
        statement:
          "I reorganized Bitcoin Transcript Review's fragmented workflow into one connected sequence of stages, redesigned in a month, then handed it off for development with the reasoning behind each decision documented.",
      },
      {
        variant: "text",
        eyebrow: "Overview",
        title: "Connecting 4 fragmented workflows into a clearer review experience.",
        body: [
          "The product split transcript discovery, claiming, editing and rewards across disconnected workflows, making it difficult for contributors to understand what to do next and leaving incomplete work locked for 24 hours.",
          "I audited the end-to-end journey and reorganized it around clearer stages. Contributors could preview a transcript before claiming it, manage active and completed reviews separately, and withdraw work they could not complete.",
          "The redesigned workflow was approved and handed off for development.",
        ],
      },
      {
        variant: "text",
        eyebrow: "Audit",
        title: "Each screen worked independently, but the journey between them did not.",
        body: [
          "I walked through the live product as both a new and returning contributor, documenting friction across discovery, claiming, editing and review history.",
          "I reviewed the findings with the team lead and developer to distinguish usability problems from intentional product rules and backend constraints.",
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
        eyebrow: "Approach",
        title: "Turning disconnected screens into a connected sequence of stages.",
        body: [
          "The three problems shared one root cause: the product had the right pieces, but nothing connecting them. Instead of fixing each screen on its own, I reorganized the workflow into a sequence of stages-browsing, previewing, claiming, editing and tracking-that stayed connected as contributors moved through them.",
          "The decisions below show how each stage was resolved.",
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
        variant: "browsing-comparison",
      },
      {
        variant: "text",
        subLabel: "Within Key Design Decision 02",
        titleSize: "small",
        title: "Simplifying reward without making payout the primary choice.",
        body: [
          "The original reward indicator used both colour and coin quantity, making its levels harder to decode. I proposed displaying exact sats, but the team did not want payout to become the primary selection criterion.",
          "I retained three relative reward levels while simplifying them into monochrome coin stacks.",
        ],
      },
      {
        variant: "graphic",
        label: "SIMPLIFYING THE REWARD INDICATOR",
        src: `${transcriptReviewBasePath}/Stacked_PNG_Icons.png`,
        alt: "The original reward indicator using colour and coin count, and the redesigned monochrome coin stacks",
      },
      {
        variant: "text",
        eyebrow: "Key Design Decision 03 · Claiming",
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
        subLabel: "Within Key Design Decision 04",
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
        eyebrow: "Key Design Decision 05 · Review States",
        title: "Active work should take priority over reference information.",
        body: [
          "I proposed separating active work from review history because the two views supported different decisions. Active reviews prioritize deadlines and continuation actions, while history tracks pending, published, expired and rewarded work.",
          "After reviewing alternative structures with the team, we moved forward with this direction.",
        ],
      },
      {
        variant: "graphic",
        items: [
          {
            label: "ORIGINAL MIXED LAYOUT",
            src: `${transcriptReviewBasePath}/Mixed-layout.png`,
            alt: "The original layout showing current and past transcript review jobs together",
          },
          {
            label: "REDESIGNED ACTIVE & PAST REVIEWS",
            type: "video",
            src: `${transcriptReviewBasePath}/Active_Past_Reviews.mp4`,
            alt: "The redesigned tabs separating active reviews from past reviews",
          },
        ],
      },
      {
        variant: "text",
        eyebrow: "Reflection",
        title: "Designing within real product constraints.",
        body: [
          "The redesign was approved and handed off for development. Working inside a live product, most of my decisions were about restraint, not new ideas: I wanted the reward indicator to show exact sats, but the team didn't want payout to be the main reason someone picks a review, so I kept it relative. A lot of this project was telling apart what was broken from what was just a rule I had to work around.",
          "The audit was based on my own walkthrough, not contributor interviews. Once this ships, I'd want to time how long reviews take in the new editor versus the old one, and check in with contributors on two things: whether the controls I brought into the editor actually made editing feel faster, and whether moving between stages felt smooth.",
        ],
      },
      {
        variant: "summary-banner",
        heading: "Restructuring how developers discover resources across an open-source Bitcoin platform.",
        subheading:
          "Bitcoin Dev Project helps developers learn Bitcoin open source, contribute to real projects, and find funding opportunities.",
        media: {
          type: "video",
          src: `${basePath}/hero-media.mp4`,
          alt: "Animated preview of the Bitcoin Dev Project website redesign",
        },
        href: "/work/bitcoin-dev-project-redesign",
      },
    ],
  },
  {
    slug: "bitcoin-dev-project-redesign",
    meta: ["Bitcoin Dev Project", "Dec 2025", "Shipped"],
    title: "Restructuring how developers discover resources across an open-source Bitcoin platform.",
    subtitle:
      "Bitcoin Dev Project helps developers learn Bitcoin open source, contribute to real projects, and find funding opportunities.",
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
      { label: "My Role", value: ["Product Designer"] },
      {
        label: "Collaborators",
        value: ["1 Team Lead", "2 Developers", "Open-source developers"],
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
        variant: "summary-banner",
        statement:
          "I redesigned BDP's 30+ resources around how developers learn, contribute, and find funding, then tested the shipped experience and worked with developers and open-source contributors to iterate on what we learned.",
        stats: [
          { value: "6", label: "User Testing Sessions", icon: "people" },
          { value: "+19%", label: "Site Visits", icon: "up" },
          { value: "−8%", label: "Bounce Rate", icon: "down" },
        ],
      },
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
        variant: "text",
        eyebrow: "Problem",
        title: "More resources created more opportunities and more places to get lost",
        body: [
          "BDP had grown to more than 30 learning resources alongside projects and funding opportunities. But those paths were spread across long lists and disconnected pages, making it difficult for someone new to understand what BDP offered or where to begin.",
          "At the same time, the visual identity hadn't grown with the product. BDP needed to become easier to navigate and easier to recognize.",
        ],
      },
      {
        variant: "graphic",
        items: [
          {
            label: "SNIPPET FROM THE OLD WEBSITE",
            src: `${basePath}/old-website-snippet.png`,
            alt: "Snippet from the old Bitcoin Dev Project website's tools and resources section",
          },
          {
            label: "OLD HOMEPAGE AND LOGO",
            src: `${basePath}/problem-img.jpg`,
            alt: "The previous Bitcoin Dev Project homepage and logo",
          },
        ],
      },
      {
        variant: "text",
        eyebrow: "Scope",
        title: "My role covered the system people used and the identity they saw",
        body: [
          "Rather than treating the work as a single-page redesign, I worked across the main surfaces developers encountered: the homepage, learning resources, contribution opportunities, and funding.",
          "In parallel, I developed a new visual system around BDP's pangolin mascot, typography, color, and illustration.",
        ],
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
        variant: "text",
        eyebrow: "Structure",
        title: "I reorganized the experience around what developers came to do",
        body: [
          "The previous structure required visitors to understand how BDP organized its programs and resources. I shifted the hierarchy toward three goals a developer could recognize immediately: learn something, contribute to something, or get support to build something.",
          "Those goals became the organizing principle for the homepage, navigation, and the three core pathways.",
        ],
      },
      {
        variant: "graphic",
        layout: "row",
        items: [
          {
            label: "BEFORE — SITEMAP SHAPED BY BDP'S INTERNAL STRUCTURE",
            src: `${basePath}/old-sitemap.jpg`,
            alt: "Sitemap of the previous Bitcoin Dev Project website structure",
          },
          {
            label: "AFTER — REORGANIZED AROUND THE THREE GOALS DEVELOPERS CAME WITH",
            src: `${basePath}/new-sitemap.jpg`,
            alt: "Sitemap of the redesigned Bitcoin Dev Project website structure",
          },
        ],
      },
      {
        variant: "text",
        eyebrow: "Identity",
        title: "A new structure also needed a more recognizable BDP",
        body: [
          "I worked on the visual identity alongside the product redesign rather than treating branding as a layer added at the end. The goal was to give BDP a consistent personality across the website, community, and future resources while keeping a technical project approachable.",
          "The pangolin became the foundation for a system of illustrations, typography, color, and reusable visual assets.",
        ],
      },
      {
        variant: "identity-grid",
      },
      {
        variant: "text",
        eyebrow: "Discovery",
        title: "Putting all the resources in one place didn't automatically make them easier to find",
        body: [
          "Centralizing the library removed the fragmentation of the old experience, but it introduced a different question: how much should we show at once?",
        ],
        emphasis: "I tested three ways to balance visibility with control",
      },
      {
        variant: "text",
        title: "Grouping resources strictly by difficulty",
        titleSize: "small",
        body: [
          "Organizing resources by difficulty gave the library a clear hierarchy, but some groups became much longer than others as resources accumulated.",
        ],
      },
      {
        variant: "text",
        title: "Collapsing sections behind \"View more\"",
        titleSize: "small",
        body: [
          "Collapsing those groups shortened the page, but solved scrolling by hiding resources behind another interaction.",
        ],
      },
      {
        variant: "two-column-row",
      },
      {
        variant: "text",
        title: "A mixed layout with visible difficulty",
        titleSize: "small",
        body: [
          "The final direction kept the library visible by default and let developers narrow it by the attributes that mattered to them.",
        ],
      },
      {
        variant: "graphic",
        bare: true,
        src: `${basePath}/mixed_difficulty.png`,
        alt: "Selected iteration: mixed layout with visible difficulty, showing resource cards with difficulty indicators",
      },
      {
        variant: "resource-card-stack",
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
        eyebrow: "Testing",
        title: "Once it shipped, I wanted to know where the structure still broke down",
        body: [
          "I ran six moderated usability sessions with developers who were unfamiliar or only slightly familiar with BDP. I asked them to understand what BDP offered, move between the three pathways, find a resource, and work out how they would pursue funding.",
          "The goal wasn't to validate the redesign. It was to see where people hesitated, made an unexpected choice, or needed more information than the interface gave them. The research plan explicitly focused on navigation, content understanding and task flow.",
        ],
      },
      {
        variant: "testing-infographic",
      },
      {
        variant: "text",
        eyebrow: "Finding — 01",
        title: "Testing revealed an extra step between developers and what they came to find",
        body: [
          "Some users weren't sure where to go from the homepage. And when they chose Start Exploring, they expected to begin exploring resources, not make another choice.",
        ],
      },
      {
        variant: "quote",
        quote: "I would wanna view the resources directly.",
      },
      {
        variant: "quote",
        quote: "Anticipating the resources and not a menu.",
      },
      {
        variant: "text",
        title: "",
        body: [
          "So I removed the separate Explore page and brought its content onto the homepage, surfacing Learn, Contribute, and Get Funded immediately after the first fold.",
        ],
      },
      {
        variant: "graphic",
        tint: "#e1dbd0",
        items: [
          {
            label: "BEFORE — STANDALONE PAGE BEHIND A CTA",
            src: `${basePath}/Before_Explore.png`,
            alt: "Explore page before the redesign, with a separate menu choice before reaching resources",
          },
          {
            label: "AFTER — SURFACED AS A SECTION AFTER THE FIRST FOLD",
            src: `${basePath}/explore-after.png`,
            alt: "Homepage after the redesign, surfacing Learn, Contribute, and Get Funded directly",
          },
        ],
      },
      {
        variant: "text",
        eyebrow: "Finding — 02",
        title:
          "Developers could find the Get Funded page, but the process on how to get funded was buried in the explanation",
        body: [
          "Participants generally knew where to go when asked to find funding. The problem appeared after they arrived. The page relied heavily on written information to explain funding, which made the next step harder to understand at a glance.",
        ],
      },
      {
        variant: "quote",
        quote: "Feels like a lot of info to go through.",
      },
      {
        variant: "text",
        title: "",
        body: ["When asked if they felt confident about what to do next:"],
      },
      {
        variant: "quote",
        quote: "Not while skimming. Have to read more.",
      },
      {
        variant: "text",
        title: "I made the funding process visible",
        titleSize: "small",
        body: [
          "Instead of relying on paragraphs to explain how funding worked, I redesigned the page around the process of getting funded, showing how developers could move from understanding their options to applying through different funding organizations.",
        ],
      },
      {
        variant: "graphic",
        tint: "#e1dbd0",
        items: [
          {
            label: "BEFORE — LONG BLOCKS OF TEXT MADE THE PAGE HARD TO SKIM",
            src: `${basePath}/get-funded-before.png`,
            alt: "The original Get Funded page, explaining funding through paragraphs of text and a simple list of organizations",
          },
          {
            label: "AFTER — ORG PROFILES, A FUNDING CHECKLIST, AND CONTRIBUTOR STORIES",
            src: `${basePath}/get-funded-walkthrough.mp4`,
            type: "video",
            alt: "Walkthrough of the redesigned Get Funded page, showing organization profiles, a funding checklist, and contributor stories",
          },
        ],
      },
      {
        variant: "text",
        eyebrow: "Finding — 03",
        title: "The remaining issues were smaller, but easier to act on",
        body: [
          "Not every finding called for a larger redesign. I clarified confusing copy, made difficulty labels easier to understand, added multi-select filtering, and improved interaction feedback on resource cards. These became smaller improvements alongside the larger changes to Explore and Get Funded.",
        ],
      },
      {
        variant: "text",
        eyebrow: "Collaboration",
        title: "Async collaboration meant the work had to make sense without me in the room",
        body: [
          "I worked with the Project Lead and two developers to ship the initial redesign, then continued working with developers and open-source contributors as the product evolved.",
          "With contributors working asynchronously, there wasn't always a meeting where I could walk someone through a Figma file. I documented decisions, expected behaviour, edge cases, and usability findings, then translated follow-up work into GitHub issues developers could pick up independently.",
        ],
      },
      {
        variant: "graphic",
        tint: "#e1dbd0",
        items: [
          {
            label: "EXAMPLE OF DOCUMENTATION",
            src: `${basePath}/async2.png`,
            alt: "Documentation example specifying card measurements, states, and content rules for developers",
          },
          {
            label: "GITHUB ISSUES — PICKED UP BY VARIOUS CONTRIBUTORS",
            src: `${basePath}/async1.png`,
            alt: "Screenshot of closed GitHub issues created and picked up by various contributors",
          },
        ],
      },
      {
        variant: "summary-banner",
        heading: "Redesigning a fragmented contributor workflow from discovery to reward.",
        subheading:
          "Bitcoin Transcript Review is an open-source product where contributors review and correct transcripts of Bitcoin educational content in exchange for project rewards.",
        media: {
          type: "video",
          src: `${transcriptReviewBasePath}/hero-scene-1.mp4`,
          alt: "Animated preview of the Bitcoin Transcript Review redesign",
        },
        href: "/work/transcript-review-redesign",
      },
    ],
  },
];

export function getCaseStudyPage(slug: string) {
  return caseStudyPages.find((page) => page.slug === slug);
}
