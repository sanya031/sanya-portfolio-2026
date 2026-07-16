"use client";

import { useEffect, useRef } from "react";

type PlaybackVideoProps = {
  ariaLabel: string;
  className?: string;
  playbackRate?: number;
  src: string;
};

export function PlaybackVideo({
  ariaLabel,
  className,
  playbackRate = 1,
  src,
}: PlaybackVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <video
      aria-label={ariaLabel}
      autoPlay
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      ref={videoRef}
      src={src}
    />
  );
}
