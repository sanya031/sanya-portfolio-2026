import Image from "next/image";

export function WeekendHobbyMedia() {
  return (
    <div className="weekend-hobby-media">
      <Image
        alt="A blank white paper sheet"
        className="weekend-hobby-media__image"
        height={837}
        sizes="(max-width: 520px) 25vw, (max-width: 860px) 30vw, 240px"
        src="/assets/about/hobby_paper.png"
        width={675}
      />
      <video
        aria-label="A short video of Sanya's weekend hobby"
        autoPlay
        className="weekend-hobby-media__video"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/assets/about/hobby_vid.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
