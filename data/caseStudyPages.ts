export type CaseStudyAsset = {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
  caption?: string;
  overlayLabel?: string;
  frame?: "hero" | "problem" | "walkthrough" | "resources" | "old-website";
  scrollable?: boolean;
};

export type CaseStudyTextBlock = {
  eyebrow?: string;
  title: string;
  body: string[];
  emphasis?: string;
};

export type CaseStudyFact = {
  label: string;
  value: string[];
};

export type CaseStudyPage = {
  slug: string;
  meta: string[];
  title: string;
  hero: CaseStudyAsset;
  facts: CaseStudyFact[];
  sections: Array<
    | ({ variant: "text" } & CaseStudyTextBlock)
    | ({ variant: "split" } & CaseStudyTextBlock & { cards: CaseStudyTextBlock[] })
    | ({ variant: "media" } & CaseStudyAsset)
    | ({ variant: "media-grid"; items: CaseStudyAsset[] })
    | { variant: "logo-grid" }
    | { variant: "visual-system-grid" }
    | ({ variant: "carousel"; items: CaseStudyAsset[] })
    | ({ variant: "quote"; quote: string; author: string; role: string })
    | ({
        variant: "ordered";
        eyebrow?: string;
        title: string;
        intro: string;
        items: string[];
        columns?: boolean;
      })
  >;
};

const basePath = "/assets/case-study-2";

export const caseStudyPages: CaseStudyPage[] = [
  {
    slug: "bitcoin-dev-project",
    meta: ["Bitcoin Dev Project", "Dec 2025", "Shipped"],
    title: "Helping Bitcoin developers find the right resources and opportunities",
    hero: {
      type: "video",
      src: `${basePath}/hero-media.mp4`,
      alt: "Animated preview of the Bitcoin Dev Project website redesign",
      frame: "hero",
    },
    facts: [
      { label: "Organisation", value: ["Bitcoin Dev Project"] },
      { label: "Collaborators", value: ["2 Developers", "1 PM", "1 Designer (me)"] },
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
        title: "Creating a clearer and more recognizable home for an evolving developer community",
        body: [
          "Bitcoin Dev Project had grown from a small community initiative into a broader platform for Bitcoin developers. However, its website and visual identity had not evolved at the same pace.",
          "Visitors had to navigate disconnected pages and long resource lists to understand what BDP offered. The organization also lacked a distinct identity that could represent it consistently across its website, community initiatives, and educational materials.",
          "Alongside the website redesign, I created a new brand identity and reusable visual system that could grow with the project. Following the launch, the website visits increased by 19% and the bounce rate decreased by 8% during the first month.",
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
        src: `${basePath}/homepage_walkthrough.mov`,
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
        src: `${basePath}/exploring-resources.mov`,
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
        body: [
          "The first direction divided resources into beginner, intermediate, and advanced sections.",
          "This created a clear hierarchy, but the number of beginner resources made the page unbalanced. The long beginner section pushed intermediate and advanced content much further down the page.",
          "As the resource library grew, this structure would make certain categories increasingly difficult to reach.",
        ],
      },
      {
        variant: "text",
        title: "Iteration 2: Collapsing sections behind \"View more\"",
        body: [
          "The second direction shortened the page by initially hiding some resources behind \"View more\" controls.",
          "Although this reduced scrolling, it also reduced visibility. Visitors had to repeatedly open sections to understand what was available, adding effort to a task that should support quick exploration.",
          "Important resources could remain hidden simply because a visitor did not expand the correct section.",
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${basePath}/iterations.png`,
        alt: "Resource discovery layout iterations",
      },
      {
        variant: "ordered",
        title: "Final iteration: A mixed layout with visible difficulty",
        intro:
          "The selected direction surfaced resources together while showing difficulty directly on each card. This allowed visitors to scan the full collection without moving through several separate sections. Filters provided additional control without hiding resources by default.",
        items: ["Intent", "Format", "Difficulty"],
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
        variant: "quote",
        quote:
          "Her illustration and visual design work is particularly strong. She redesigned our website with original hand-drawn illustrations that gave the brand a warm, playful feel, exactly the tone we were going for. She also has a good eye for user flows and thinks carefully about the full experience. She is no stranger to going past the visuals and digging into the why behind design decisions.",
        author: "Stacie Waleyko",
        role: "Team Lead, Bitcoin Dev Project",
      },
      {
        variant: "text",
        title: "Using AI as a starting point, not a final output",
        body: [
          "AI-assisted image generation helped speed up early illustration exploration.",
          "However, the generated images were not consistent enough to function as final brand assets. I manually redrew and refined the selected directions to match the visual system and maintain consistency across different applications.",
          "This process reinforced the importance of using AI to accelerate exploration while retaining human judgment over the final design.",
        ],
      },
      {
        variant: "media",
        type: "image",
        src: `${basePath}/ai-img.jpg`,
        alt: "AI generated image and digitally drawn illustration comparison",
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
