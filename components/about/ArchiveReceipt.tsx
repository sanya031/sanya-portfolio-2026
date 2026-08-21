const careerEntries = [
  {
    dates: "05/2025 — 06/2026",
    organization: "BITCOIN DEV PROJECT",
    description:
      "Designed and shipped the BDP website, led user research, and built the organization's brand identity and design system.",
  },
  {
    dates: "12/2024 — 05/2025",
    organization: "BTCPAY",
    description:
      "Researched developer workflows and redesigned mobile dashboard experiences for Bitcoin payment tools.",
  },
  {
    dates: "05/2024 — 08/2024",
    organization: "SUMMER OF BITCOIN",
    description:
      "Designed an end-to-end gallery for BTC wallets from 0→1, creating wireframes & prototypes.",
  },
];

const observations = [
  "Reading Letterboxd reviews after finishing a movie.",
  "Taking screenshots of interesting interfaces.",
  "Saving Colour pallets from random objects around the city.",
];

function ReceiptHeading({ children }: { children: string }) {
  return (
    <div className="archive-receipt__section-heading">
      <img src="/assets/about/archive-dashed-rule.svg" alt="" aria-hidden="true" />
      <div className="archive-receipt__section-title">{children}</div>
      <img src="/assets/about/archive-dashed-rule.svg" alt="" aria-hidden="true" />
    </div>
  );
}

export function ArchiveReceipt() {
  return (
    <div className="archive-receipt">
      <img
        className="archive-receipt__paper"
        src="/assets/about/archive-receipt.svg"
        alt=""
        aria-hidden="true"
      />

      <div className="archive-receipt__content">
        <div className="archive-receipt__identity">
          <img
            className="archive-receipt__portrait"
            src="/assets/about/archive-portrait.svg"
            alt="Pixel illustration of Sanya Malhotra"
          />
          <div className="archive-receipt__identity-copy">
            <p className="archive-receipt__name">SANYA MALHOTRA</p>
            <img
              className="archive-receipt__title-rule"
              src="/assets/about/archive-title-rule.svg"
              alt=""
              aria-hidden="true"
            />
            <p className="archive-receipt__role">PRODUCT DESIGNER</p>
          </div>
        </div>

        <div className="archive-receipt__body">
          <div className="archive-receipt__intro">
            <p>A COLLECTION OF THOUGHTS,<br />WORK AND IDEAS</p>
            <p>BASED IN TORONTO, CANADA</p>
            <div className="archive-receipt__timestamp">
              <span>01/06/2026</span>
              <span>1:56 AM</span>
            </div>
          </div>

          <ReceiptHeading>WHY DESIGN</ReceiptHeading>
          <div className="archive-receipt__copy">
            <p>I love everything cool, pretty, and fun — which is probably why I ended up in design.</p>
            <p>UI pulled me in first, but what kept me here is the reasoning behind it: the little decisions, the invisible logic, and the way good design can make something complicated feel surprisingly human.</p>
          </div>

          <ReceiptHeading>CAREER LOG</ReceiptHeading>
          <div className="archive-receipt__careers">
            {careerEntries.map((entry) => (
              <div className="archive-receipt__career" key={entry.organization}>
                <div className="archive-receipt__career-heading">
                  <span>{entry.dates}</span>
                  <span>{entry.organization}</span>
                </div>
                <p>{entry.description}</p>
              </div>
            ))}
          </div>

          <ReceiptHeading>FREQUENTLY OBSERVED</ReceiptHeading>
          <ol className="archive-receipt__observations">
            {observations.map((observation, index) => (
              <li key={observation}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{observation}</p>
              </li>
            ))}
          </ol>

          <div className="archive-receipt__asterisks" aria-hidden="true">
            <img src="/assets/about/archive-dashed-rule.svg" alt="" />
            <span>*****************************************</span>
          </div>

          <div className="archive-receipt__closing">
            <p>THANK YOU FOR VISITING</p>
            <p>FOR PROJECTS IDEAS OR INTERESTING<br />CONVERSATIONS</p>
            <p>
              <a href="mailto:sanya.malhotra031@gmail.com">
                sanya.malhotra031@gmail.com
              </a>
              <br />
              <a
                className="archive-receipt__linkedin-link"
                href="https://www.linkedin.com/in/sanya031malhotra/"
                rel="noreferrer"
                target="_blank"
              >
                linkedin.com/in/sanya031malhotra/
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
