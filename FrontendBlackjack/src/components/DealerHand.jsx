import React from "react";
import Card from './Card';

function DealerHand({ cards }) {
  return (
    <div>
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold mb-2">Joueur</h2>
        <div className="flex justify-center gap-2">
          {cards.map((card, index) => (
            <Card key={index} value={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DealerHand;
