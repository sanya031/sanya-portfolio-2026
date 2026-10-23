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

export type TranscriptStoryVisual =
  | "journey"
  | "finding-work"
  | "approach"
  | "preview"
  | "withdraw"
  | "browse-list"
  | "rewards"
  | "review-pages"
  | "prototype"
  | "validation";

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
    | ({
        variant: "story";
        eyebrow?: string;
        title?: string;
        body?: string[];
        visual?: TranscriptStoryVisual;
        after?: string[];
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
        stats?: Array<{
          value: string;
          label: string;
          icon?: "people" | "up" | "down" | "clock" | "timer" | "flow";
        }>;
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
    title: "Helping contributors understand the work before committing to it",
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
          "I redesigned Bitcoin Transcript Review to make contributing easier and reduce unfinished work. In one month, I introduced previews before claiming, clearer navigation, and withdrawal options to help contributors make informed decisions, complete reviews, and keep transcripts moving through the review pipeline.",
        // These describe the constraints of the system rather than outcomes.
        stats: [
          {
            value: "Existing system",
            label: "Improving connected workflows without rebuilding the platform",
            icon: "flow",
          },
          {
            value: "Limited access",
            label: "No contributor testing available to validate design decisions",
            icon: "people",
          },
        ],
      },
      {
        variant: "story",
        eyebrow: "01 / Context",
        title: "A platform where contributors help make Bitcoin transcripts more accurate",
        body: [
          "Bitcoin talks are often turned into written transcripts, but automated transcription doesn't always get everything right. Technical terms, speaker names and formatting still need someone to check them against the original recording.",
          "BTC Transcript Review gives contributors a place to find these transcripts, claim one and make corrections. Once submitted, the work goes through GitHub for review. If approved, contributors receive a reward in sats, the smallest unit of bitcoin.",
        ],
        visual: "journey",
      },
      {
        variant: "story",
        eyebrow: "02 / Discovery",
        title: "What started as an editor redesign revealed problems across the entire contributor journey",
        body: [
          "The team already knew that parts of the editor were confusing and that claimed transcripts could sit unfinished for 24 hours. Stacie, the project lead, walked me through the product, after which I explored the contributor journey myself in staging, from finding and claiming a transcript to editing and submitting it.",
        ],
        visual: "finding-work",
        after: [
          "The audit shifted my focus from improving individual screens to rethinking how contributors moved through the entire review process.",
        ],
      },
      {
        variant: "story",
        eyebrow: "03 / Approach",
        title: "I looked at how other products handled similar workflows, then adapted what worked within our technical constraints",
        body: [
          "I studied patterns for discovering work, committing to tasks, and managing progress. I evaluated which interactions supported contributors' decisions and which needed adapting to our 24-hour review workflow.",
        ],
        visual: "approach",
      },
      {
        variant: "story",
        eyebrow: "04 / The Redesign",
        title: "Contributors had to start a 24-hour deadline just to inspect a transcript, so I introduced a preview",
        body: [
          "Claiming was the only way to inspect a transcript, but it also started a 24-hour reservation. If contributors couldn't finish, the transcript stayed unavailable to others until the timer expired. Rather than rebuild the claim system, I introduced a preview so contributors could understand the work before committing to it.",
        ],
        visual: "preview",
      },
      {
        variant: "story",
        visual: "withdraw",
      },
      {
        variant: "story",
        eyebrow: "05 / Discovery & Tradeoffs",
        title: "I replaced the crowded review table with a simpler list to help contributors compare their options",
        body: [
          "I reorganized it into a more browseable list, grouping the details contributors needed to make a decision. Instead of claiming directly from the list, they could open a preview first.",
        ],
        visual: "browse-list",
      },
      {
        variant: "story",
        title: "My first reward design made payouts too prominent, so I returned to a simpler relative scale",
        body: [
          "I proposed showing exact rewards in sats, but the team worried payouts would drive contributions. I kept the relative reward system, simplifying it to a consistent 1–3 coin scale so contributors could compare reward levels without emphasizing exact payouts.",
        ],
        visual: "rewards",
      },
      {
        variant: "story",
        eyebrow: "06 / Navigation & Tradeoffs",
        title: "A developer questioned the different layouts, but each served a different purpose.",
        body: [
          "A developer questioned why the two screens used different layouts, but each supported a different decision. Available Reviews helped contributors compare options and decide what to claim, while My Reviews helped them identify what needed attention and where to resume work.",
        ],
        visual: "review-pages",
      },
      {
        variant: "story",
        eyebrow: "07 / Prototyping with AI",
        title: "I used Figma Make to explore the full journey, including paths beyond successful submission",
        body: [
          "I used Figma Make to turn the redesigned screens into a working end-to-end prototype, making it faster to explore interactions without building each one manually. I focused on scenarios beyond the happy path, like withdrawing a claimed review or navigating between active and past work, so the team could interact with the experience, question assumptions, and catch gaps before development.",
          "AI helped speed up prototyping, but the workflow decisions, interaction rules, and design refinements remained mine.",
        ],
        visual: "prototype",
      },
      {
        variant: "story",
        eyebrow: "08 / Validation & Next Steps",
        title: "Without a launch, I couldn't measure impact. Here's what I'd test next.",
        body: [
          "The short timeline and limited access to contributors meant I couldn't conduct usability testing. Since the redesign hasn't been developed, I don't have outcome metrics yet. I'd focus future validation on four questions:",
        ],
        visual: "validation",
      },
      {
        variant: "summary-banner",
        heading: "Increasing visits by 19% by redesigning how developers discover Bitcoin resources",
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
    title: "Increasing visits by 19% by redesigning how developers discover Bitcoin resources",
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
      { label: "My Role", value: ["Product Designer", "Illustrator"] },
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
        heading: "Helping contributors understand the work before committing to it",
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
