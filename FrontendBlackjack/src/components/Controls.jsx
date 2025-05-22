import React, { useState } from "react";

function Controls({ onHit, onStand, isGameOver, bet, onDoubleBet, isAnimating = false }) {
  const [hasDoubled, setHasDoubled] = useState(false);

  const handleDouble = () => {
    onDoubleBet();
    onHit();
    onStand();
    setHasDoubled(true);
  };

  const isDisabled = hasDoubled || isAnimating;

  return (
    <div>
      {!isGameOver && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onHit}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-xl shadow transform transition-all duration-200 ${
              isDisabled 
                ? "bg-gray-500 opacity-50 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95"
            }`}
          >
            {isAnimating ? "Distribution..." : "Piocher"}
          </button>
          
          <button
            onClick={onStand}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-xl shadow transform transition-all duration-200 ${
              isDisabled 
                ? "bg-gray-500 opacity-50 cursor-not-allowed" 
                : "bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105 active:scale-95"
            }`}
          >
            {isAnimating ? "Attendez..." : "Rester"}
          </button>
          
          <button
            onClick={handleDouble}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-xl shadow transform transition-all duration-200 ${
              isDisabled 
                ? "bg-gray-500 opacity-50 cursor-not-allowed" 
                : "bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95"
            }`}
          >
            {isAnimating ? "Attendez..." : "Doubler"}
          </button>
        </div>
      )}
      
    
      {isGameOver && hasDoubled && setHasDoubled(false)}
    </div>
  );
}

export default Controls;