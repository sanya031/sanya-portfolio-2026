"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Track = {
  artist: string;
  href: string;
  previewUrl: string | null;
  title: string;
};

const PLAYLIST_HREF =
  "https://open.spotify.com/playlist/5TkC5SPo8P9UE4SbGaptgh";

export function ListeningPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const titleRef = useRef<HTMLAnchorElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    let active = true;

    fetch("/api/spotify-playlist")
      .then((response) => response.json())
      .then((data: { tracks?: Track[] }) => {
        if (active && data.tracks?.length) setTracks(data.tracks);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    const titleText = titleTextRef.current;
    if (!title || !titleText) return;

    const measureTitle = () => {
      const availableWidth = title.clientWidth - 16;
      setIsTitleOverflowing(titleText.scrollWidth > availableWidth);
    };

    measureTitle();
    const observer = new ResizeObserver(measureTitle);
    observer.observe(title);

    return () => observer.disconnect();
  }, [currentTrack?.title]);

  const playTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    const track = tracks[index];
    if (!audio || !track?.previewUrl) return;

    setCurrentIndex(index);
    audio.src = track.previewUrl;
    void audio.play().then(() => setIsPlaying(true));
  }, [tracks]);

  const changeTrack = useCallback((direction: -1 | 1) => {
    if (!tracks.length) return;
    const nextIndex = (currentIndex + direction + tracks.length) % tracks.length;
    playTrack(nextIndex);
  }, [currentIndex, playTrack, tracks.length]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.previewUrl) return;

    if (audio.src !== currentTrack.previewUrl) audio.src = currentTrack.previewUrl;

    if (audio.paused) void audio.play().then(() => setIsPlaying(true));
    else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="listening-player">
      <a
        aria-label="Open Sanya's playlist on Spotify"
        className="listening-player__cassette-link"
        href={PLAYLIST_HREF}
        rel="noreferrer"
        target="_blank"
      >
        <Image
          alt="Orange cassette tape"
          className="listening-player__cassette"
          height={256}
          sizes="127px"
          src="/assets/about/listening-cassette.png"
          width={384}
        />
      </a>

      <div className="listening-player__details">
        <a
          className="listening-player__title"
          href={currentTrack?.href ?? PLAYLIST_HREF}
          ref={titleRef}
          rel="noreferrer"
          target="_blank"
        >
          <span
            className={`listening-player__title-track${
              isTitleOverflowing ? " listening-player__title-track--moving" : ""
            }`}
          >
            <span ref={titleTextRef}>
              {currentTrack?.title ?? "Loading playlist…"}
            </span>
            <span aria-hidden="true">
              {currentTrack?.title ?? "Loading playlist…"}
            </span>
          </span>
        </a>
        <div
          aria-label={currentTrack?.artist ?? "Spotify"}
          className="listening-player__artist"
        >
          <div className="listening-player__artist-track" aria-hidden="true">
            <span>{currentTrack?.artist ?? "Spotify"}</span>
            <span>{currentTrack?.artist ?? "Spotify"}</span>
          </div>
        </div>

        <div className="listening-player__controls">
          <button
            aria-label="Previous song"
            className="listening-player__control listening-player__control--previous"
            disabled={!tracks.length}
            onClick={() => changeTrack(-1)}
            type="button"
          >
          </button>
          <button
            aria-label={isPlaying ? "Pause song" : "Play song"}
            className={`listening-player__control listening-player__control--play${
              isPlaying ? " listening-player__control--active" : ""
            }`}
            disabled={!currentTrack?.previewUrl}
            onClick={togglePlayback}
            type="button"
          >
            {isPlaying ? (
              <span className="listening-player__pause-icon" aria-hidden="true" />
            ) : (
              <span className="listening-player__play-icon" aria-hidden="true" />
            )}
          </button>
          <button
            aria-label="Next song"
            className="listening-player__control listening-player__control--next"
            disabled={!tracks.length}
            onClick={() => changeTrack(1)}
            type="button"
          >
          </button>
        </div>
      </div>

      <audio
        onEnded={() => changeTrack(1)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        preload="none"
        ref={audioRef}
      />
    </div>
  );
}
