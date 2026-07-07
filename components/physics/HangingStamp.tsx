export type HangingStampProps = {
  image: string;
  label: string;
  location: string;
  link: string;
};

export function HangingStamp({ image, label, location, link }: HangingStampProps) {
  return (
    <a
      className="hanging-stamp"
      data-animation="drop-and-sway-on-footer-entry"
      href={link}
    >
      {/* TODO: Replace this placeholder state with spring/physics motion when animation is added. */}
      <span className="hanging-stamp__pin" aria-hidden="true" />
      <span
        className="hanging-stamp__image"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <span className="hanging-stamp__copy">
        <span className="hanging-stamp__label">{label}</span>
        <span className="hanging-stamp__location">{location}</span>
      </span>
    </a>
  );
}
