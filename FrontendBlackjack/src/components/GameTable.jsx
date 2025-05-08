import React, { useEffect, useState } from "react";
import PlayerHand from "./PlayerHand";
import DealerHand from "./DealerHand";
import Controls from "./Controls";
import { useStats } from "../context/StatsContext";
import {
  faTrophy,
  faXmark,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GameTable({
  playerCards,
  dealerCards,
  onHit,
  onStand,
  onRestart,
  isGameOver,
  message,
}) {
  const [localStats, setLocalStats] = useState(null);
  const { stats, fetchStats, updateStats } = useStats();
  const [hasUpdatedStats, setHasUpdatedStats] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      try {
        const fetched = await fetchStats(userId, token);
        setLocalStats(fetched);
      } catch (error) {
        console.error("Erreur lors du chargement des stats :", error);
      }
    };

    loadStats();
  }, []);

  useEffect(() => {
    const handleGameEnd = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
  
      if (!isGameOver || !message || !userId || !token || hasUpdatedStats)
        return;
  
      const lowerMessage = message.toLowerCase();
      const isVictory = lowerMessage.includes("vous gagnez");
  
      if (isVictory) {
        console.log("Victoire détectée, mise à jour des stats...");
      } else {
        console.log("Défaite détectée...");
      }
  
      try {
        const updated = await updateStats({ isVictory, userId, token });
        console.log("Stats mises à jour:", updated);
        setLocalStats(updated);
        setHasUpdatedStats(true);
      } catch (error) {
        console.error("Erreur mise à jour stats:", error);
      }
    };
  
    handleGameEnd();
  }, [isGameOver, message, updateStats, hasUpdatedStats]);
  

  useEffect(() => {
    if (!isGameOver) {
      setHasUpdatedStats(false);
    }
  }, [isGameOver]);

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

      <div className="absolute top-4 right-6 z-20 bg-black/50 text-white p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-sm font-mono space-y-1">
        <p>
          <FontAwesomeIcon icon={faTrophy} className="text-green-500 mr-2" />
          Parties gagnées: {localStats?.partiesGagnees ?? 0}
        </p>

        <p>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 mr-2" />
          Parties perdues: {localStats?.partiesPerdues ?? 0}
        </p>

        <p>
          <FontAwesomeIcon icon={faGamepad} className="text-blue-500 mr-2" />
          Parties jouées: {localStats?.partiesJouees ?? 0}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-4xl p-6 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-white/20">
        <h1 className="text-2xl font-bold mb-6 font-serif tracking-wider">
          Blackjack
        </h1>

        <DealerHand cards={dealerCards} isGameOver={isGameOver} />
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
