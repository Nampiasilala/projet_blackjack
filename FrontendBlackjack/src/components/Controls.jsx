import React from "react";

function Controls({ onHit, onStand, onRestart, isGameOver }) {
  return (
    <div>
      <div className="flex justify-center gap-4 mt-6">
        {!isGameOver ? (
          <>
            <button
              onClick={onHit}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
            >
              Piocher
            </button>
            <button
              onClick={() => {
                // Appelle la fonction de "stand" passée par le parent
                onStand(); 
              }}
              className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600"
            >
              Rester
            </button>
          </>
        ) : (
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
          >
            Rejouer
          </button>
        )}
      </div>
    </div>
  );
}

export default Controls;
