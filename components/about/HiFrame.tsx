import Image from "next/image";

type HiFrameProps = {
  imageAlt?: string;
  imageSrc?: string;
};

export function HiFrame({ imageAlt = "", imageSrc }: HiFrameProps) {
  return (
    <div className="hi-frame">
      {imageSrc ? (
        <div className="hi-frame__image-slot">
          <Image
            alt={imageAlt}
            className="hi-frame__image"
            fill
            sizes="(max-width: 520px) 25vw, (max-width: 860px) 38vw, 280px"
            src={imageSrc}
          />
        </div>
      ) : null}

      <Image
        alt=""
        aria-hidden="true"
        className="hi-frame__ornament"
        height={468}
        priority
        sizes="(max-width: 520px) 25vw, (max-width: 860px) 38vw, 280px"
        src="/assets/about/hi_frame.png"
        width={578}
      />
    </div>
  );
}
