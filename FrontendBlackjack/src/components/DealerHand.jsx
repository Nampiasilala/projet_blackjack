import { useEffect, useState } from "react";
import Deck from "deck-of-cards";

function DealerHand() {
  const [deck, setDeck] = useState(null);
  const [hand, setHand] = useState([]);

  useEffect(() => {
    // Créer un nouveau deck et le mélanger
    const newDeck = new Deck();
    newDeck.shuffle();
    setDeck(newDeck);
  }, []);

  const drawCard = () => {
    if (deck && deck.remaining() > 0) {
      const card = deck.draw(); // Tire une carte
      setHand([...hand, card]);
    }
  };

  return (
    <div className="text-center mt-10">
      <button
        onClick={drawCard}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tirer une carte
      </button>

      <div className="flex justify-center flex-wrap mt-6 gap-4">
        {hand.map((card, index) => (
          <div key={index} className="p-2 border rounded bg-white text-black">
            {card.rank} de {card.suit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealerHand;
