import type { StatementWord } from "../../data/statementWords";
import { InteractiveStatement } from "./InteractiveStatement";

export type ScrollStatementProps = {
  words: StatementWord[];
};

export function ScrollStatement({ words }: ScrollStatementProps) {
  return (
    <section id="statement" className="scroll-statement">
      <div className="scroll-statement__panel" data-animation="statement-reveal-on-scroll">
        <div className="scroll-statement__scrim" aria-hidden="true" />
        {/* TODO: Connect scroll progress so the hero fades while this statement resolves in place. */}
        <InteractiveStatement words={words} />
      </div>
    </section>
  );
}
