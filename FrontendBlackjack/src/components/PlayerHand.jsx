import Card from "./Card";

function PlayerHand({ cards, cardKeys = [] }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Vos Cartes</h2>
      <div className="flex gap-2 justify-center">
        {cards.map((card, i) => (
          <div
            key={cardKeys[i] || i}
            className="animate-card-slide-in backface-hidden perspective-1000"
            style={{ animationDelay: `${i * 300}ms` }}
          >
            <Card value={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerHand;