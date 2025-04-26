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
    <div className="m-0 relative h-screen flex items-center justify-center text-white">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background2.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-4xl p-6 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-white/20">
        <h1 className="text-2xl font-bold mb-6 font-serif tracking-wider">Blackjack</h1>

        <DealerHand cards={dealerCards} isGameOver={isGameOver} />

        {/* Ligne de séparation */}
        <div className="w-full h-0.5 my-4 bg-white/30 rounded-full" />

        <PlayerHand cards={playerCards} />

        <p className="text-lg mt-6 font-medium">{message}</p>

        <Controls
          onHit={onHit}
          onStand={onStand}
          onRestart={onRestart}
          isGameOver={isGameOver}
        />
      </div>
    </div>
  );
}

export default GameTable;
