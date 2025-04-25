import Card from "./Card";

function PlayerHand({ cards }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Vos Cartes</h2>
      <div className="flex gap-2">
        {cards.map((card, i) => (
          <Card key={i} value={card} />
        ))}
      </div>
    </div>
  );
}

export default PlayerHand;

