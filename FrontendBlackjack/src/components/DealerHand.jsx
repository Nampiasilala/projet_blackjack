// DealerHand.jsx

import React from "react";
import Card from "./Card";

function DealerHand({ cards, isGameOver }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2 text-center">Main du Croupier</h2>
      <div className="flex gap-2 justify-center">
        {cards.map((card, i) => (
          <Card key={i} value={card} hidden={i !== 0 && !isGameOver} />
        ))}
      </div>
    </div>
  );
}

export default DealerHand;
