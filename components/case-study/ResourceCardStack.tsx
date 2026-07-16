export type ResourceCard = {
  alt: string;
  src: string;
};

export function ResourceCardStack({ cards }: { cards: ResourceCard[] }) {
  return (
    <section className="case-study-page__resource-card-stack" aria-label="Resource card examples">
      {cards.map((card, index) => (
        <img
          key={`${card.src}-${index}`}
          src={card.src}
          alt={card.alt}
          className="case-study-page__resource-card"
          data-card-index={index + 1}
          draggable={false}
        />
      ))}
    </section>
  );
}
