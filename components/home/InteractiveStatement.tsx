"use client";

import { useState } from "react";
import type { StatementWord } from "../../data/statementWords";

export type InteractiveStatementProps = {
  activeWordId?: string | null;
  interactive?: boolean;
  words: StatementWord[];
};

export function InteractiveStatement({
  activeWordId: controlledActiveWordId,
  interactive = true,
  words,
}: InteractiveStatementProps) {
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const activeWordId = controlledActiveWordId ?? hoveredWordId;
  const activeWord = words.find((word) => word.id === activeWordId);
  const [ambiguityWord, systemsWord, refiningWord] = words;
  const handleActiveChange = interactive ? setHoveredWordId : () => undefined;

  return (
    <div className="interactive-statement">
      <p
        className="interactive-statement__sentence"
        data-has-active-word={Boolean(activeWordId)}
      >
        <span className="interactive-statement__segment">I enjoy working through </span>
        <StatementHoverWord
          word={ambiguityWord}
          activeWordId={activeWordId}
          interactive={interactive}
          onActiveChange={handleActiveChange}
        />
        <span className="interactive-statement__segment">, </span>
        <StatementHoverWord
          word={systemsWord}
          activeWordId={activeWordId}
          interactive={interactive}
          onActiveChange={handleActiveChange}
        />
        <span className="interactive-statement__segment"> and </span>
        <StatementHoverWord
          word={refiningWord}
          activeWordId={activeWordId}
          interactive={interactive}
          onActiveChange={handleActiveChange}
        />
        <span className="interactive-statement__segment">
          {" "}
          the interfaces around them.
        </span>
      </p>

      {activeWord ? (
        <aside className="interactive-statement__preview" data-word-id={activeWord.id}>
          {/* TODO: Position this card near the hovered word once motion/layout tooling is added. */}
          <img
            className="interactive-statement__preview-image"
            src={activeWord.image.src}
            alt={activeWord.image.alt}
          />
          <div className="interactive-statement__preview-copy">
            <h2 className="interactive-statement__preview-title">{activeWord.title}</h2>
            <p className="interactive-statement__preview-caption">{activeWord.caption}</p>
          </div>
        </aside>
      ) : null}
    </div>
  );
}

type StatementHoverWordProps = {
  word?: StatementWord;
  activeWordId: string | null;
  interactive: boolean;
  onActiveChange: (wordId: string | null) => void;
};

function StatementHoverWord({
  word,
  activeWordId,
  interactive,
  onActiveChange,
}: StatementHoverWordProps) {
  if (!word) {
    return null;
  }

  const isActive = activeWordId === word.id;

  return (
    <button
      className="interactive-statement__word"
      data-active={isActive}
      onBlur={interactive ? () => onActiveChange(null) : undefined}
      onFocus={interactive ? () => onActiveChange(word.id) : undefined}
      onMouseEnter={interactive ? () => onActiveChange(word.id) : undefined}
      onMouseLeave={interactive ? () => onActiveChange(null) : undefined}
      type="button"
    >
      <span className="interactive-statement__word-text">{word.text}</span>
      <img
        className="interactive-statement__word-motif"
        src={word.motifSrc}
        alt=""
        aria-hidden="true"
      />
    </button>
  );
}
