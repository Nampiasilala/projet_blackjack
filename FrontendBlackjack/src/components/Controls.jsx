import React from "react";

function Controls({ onHit, onStand, isGameOver }) {
  return (
    <div>
      { !isGameOver && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onHit}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            Piocher
          </button>
          <button
            onClick={onStand}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600"
          >
            Rester
          </button>
          <button
            onClick={() => {
              onHit();    // Effet du "Doubler"
              onStand();  // On termine automatiquement le tour
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700"
          >
            Doubler
          </button>
        </div>
      )}
    </div>
  );
}

export default Controls;
