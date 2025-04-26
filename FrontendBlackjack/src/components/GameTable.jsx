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
    <div className="m-0 relative h-screen flex flex-col items-center justify-center text-white p-4 border border-t-white">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/background2.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center  h-full text-white text-center bg-opacity-60">
        <DealerHand cards={dealerCards} isGameOver={isGameOver} />
        <PlayerHand cards={playerCards} />

        <p className="text-lg mt-4">{message}</p>

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
