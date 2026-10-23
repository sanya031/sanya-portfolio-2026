"use client";

import { useEffect, useRef, useState } from "react";
import { CollaboratorCursor } from "./CollaboratorCursor";

// The prototype is a desktop layout, so it renders at this size and scales down to the window
// rather than reflowing into a narrow, cramped version of itself.
const FRAME = { w: 1280, h: 800 };

export function PrototypeEmbed({ src, title }: { src: string; title: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  // The pretend collaborator steps aside while the visitor is using the prototype.
  const [pointerInside, setPointerInside] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / FRAME.w));

    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="transcript-story__window-stage"
      onPointerEnter={() => setPointerInside(true)}
      onPointerLeave={() => setPointerInside(false)}
      ref={stageRef}
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}
    >
      {scale ? (
        <iframe
          allowFullScreen
          loading="lazy"
          src={src}
          style={{ width: FRAME.w, height: FRAME.h, transform: `scale(${scale})` }}
          title={title}
        />
      ) : null}
      <CollaboratorCursor hidden={pointerInside} />
    </div>
  );
}
