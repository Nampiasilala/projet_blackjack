import React from "react";
import PlayerHand from "./PlayerHand";
import DealerHand from "./DealerHand";
import Controls from "./Controls";

function GameTable({
  playerCards,
  dealerCards,
  onHit,
  onStand,
  onRestart,
  isGameOver,
  message,
}) {
  return (
    <div className="bg-green-800 min-h-screen flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Blackjack</h1>

      <DealerHand cards={dealerCards} />
      <PlayerHand cards={playerCards} />

      <p className="text-lg mt-4">{message}</p>

      <Controls
        onHit={onHit}
        onStand={onStand}
        onRestart={onRestart}
        isGameOver={isGameOver}
      />
    </div>
  );
}

export default GameTable;
