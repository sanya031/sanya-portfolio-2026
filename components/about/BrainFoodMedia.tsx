import Image from "next/image";

export function BrainFoodMedia() {
  return (
    <div className="brain-food-media">
      <Image
        alt="A cream-colored vintage computer television with a red screen"
        className="brain-food-media__image"
        height={802}
        sizes="(max-width: 520px) 25vw, (max-width: 860px) 34vw, 320px"
        src="/assets/about/food_tv.png"
        width={844}
      />
      <video
        aria-label="A short Brain Food video playing inside a vintage television"
        autoPlay
        className="brain-food-media__video"
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/assets/about/brainfood.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
