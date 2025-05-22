import React from "react";
import Card from "./Card";

function DealerHand({ cards, isGameOver, cardKeys = [] }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Main du Croupier</h2>
      <div className="flex gap-2 justify-center">
        {cards.map((card, i) => (
          <div
            key={cardKeys[i] || i}
            className="animate-card-slide-in backface-hidden perspective-1000"
            style={{ animationDelay: `${i * 400}ms` }}
          >
            <Card value={card} hidden={i !== 0 && !isGameOver} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealerHand;