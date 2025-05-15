import React, { useState } from "react";

function Controls({ onHit, onStand, isGameOver, bet, onDoubleBet }) {
  // État pour désactiver les boutons après avoir doublé
  const [hasDoubled, setHasDoubled] = useState(false);

  // Gérer l'action de doubler correctement
  const handleDouble = () => {
    // Appeler une fonction qui double la mise
    onDoubleBet();
    
    // Piocher une seule carte
    onHit();
    
    // Terminer automatiquement le tour
    onStand();
    
    // Désactiver les boutons après avoir doublé
    setHasDoubled(true);
  };

  return (
    <div>
      {!isGameOver && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onHit}
            disabled={hasDoubled}
            className={`px-4 py-2 bg-blue-600 text-white rounded-xl shadow ${
              hasDoubled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            Piocher
          </button>
          <button
            onClick={onStand}
            disabled={hasDoubled}
            className={`px-4 py-2 bg-yellow-500 text-white rounded-xl shadow ${
              hasDoubled ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
          >
            Rester
          </button>
          <button
            onClick={handleDouble}
            disabled={hasDoubled}
            className={`px-4 py-2 bg-red-600 text-white rounded-xl shadow ${
              hasDoubled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            Doubler
          </button>
        </div>
      )}
    </div>
  );
}

export default Controls;