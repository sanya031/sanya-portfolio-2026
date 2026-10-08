"use client";

import { useEffect, useRef } from "react";

type PlaybackVideoProps = {
  ariaLabel: string;
  className?: string;
  playbackRate?: number;
  poster?: string;
  src: string;
};

export function PlaybackVideo({
  ariaLabel,
  className,
  playbackRate = 1,
  poster,
  src,
}: PlaybackVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Only decode while on screen; off-screen videos otherwise keep costing frames while scrolling.
  useEffect(() => {
    const video = videoRef.current;

    if (!video || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      aria-label={ariaLabel}
      autoPlay
      className={className}
      loop
      muted
      playsInline
      poster={poster}
      preload="metadata"
      ref={videoRef}
      src={src}
    />
  );
}
