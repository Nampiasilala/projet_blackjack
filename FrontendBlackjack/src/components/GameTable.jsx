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
  const { stats, fetchStats, updateStats, handleReset } = useStats();
  const [hasUpdatedStats, setHasUpdatedStats] = useState(false);
  const [bet, setBet] = useState(null); // jeton sélectionné
  const [hasBet, setHasBet] = useState(false); // indique si on a placé une mise
  const [showPostGameOptions, setShowPostGameOptions] = useState(false);

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
    setLocalStats(stats);
  }, [stats]);

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
        const updated = await updateStats({ isVictory, userId, token, bet });
        if (!bet) return;
        console.log("Stats mises à jour:", updated);
        setLocalStats(updated);
        setHasUpdatedStats(true);
        setShowPostGameOptions(true);
      } catch (error) {
        console.error("Erreur mise à jour stats:", error);
      }
    };

    handleGameEnd();
  }, [isGameOver, message, updateStats, hasUpdatedStats]);

  useEffect(() => {
    if (!isGameOver) {
      setHasUpdatedStats(false);
      setShowPostGameOptions(false);
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
          Parties gagnées: {stats?.partiesGagnees ?? 0}
        </p>

        <p>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 mr-2" />
          Parties perdues: {stats?.partiesPerdues ?? 0}
        </p>

        <p>
          <FontAwesomeIcon icon={faGamepad} className="text-blue-500 mr-2" />
          Parties jouées: {stats?.partiesJouees ?? 0}
        </p>
      </div>
      <div className="absolute top-4 left-6 z-20 bg-black/50 text-white p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-sm font-mono space-y-1">
        <p>
 Pour le solde :
        </p>
        <p>
          <FontAwesomeIcon icon={faTrophy} className="text-green-500 mr-2" />
          Jetons gagnées: {stats?.jetonsGagnes ?? 0}
        </p>

        <p>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 mr-2" />
          Jetons perdues: {stats?.jetonsPerdus ?? 0}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-4xl p-6 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-white/20">
        <h1 className="text-2xl font-bold mb-6 font-serif tracking-wider">
          Blackjack
        </h1>

        {/* 👉 Boutons de mise visibles si aucune mise encore */}
        {!hasBet && (
          <div className="flex flex-wrap justify-center gap-4 mb-6 z-20">
            {[5, 10, 25, 50, 100].map((value) => (
              <button
                key={value}
                onClick={() => {
                  setBet(value);
                  setHasBet(true);
                }}
                className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow"
              >
                Miser {value}$
              </button>
            ))}
          </div>
        )}

        {/* 👉 Jeu actif après mise */}
        {hasBet && (
          <>
            <DealerHand cards={dealerCards} isGameOver={isGameOver} />
            <div className="w-full h-0.5 my-4 bg-white/30 rounded-full" />
            <PlayerHand cards={playerCards} />

            <p className="text-lg mt-6 font-medium">{message}</p>
            <div className="mt-2 mb-4 text-lg font-semibold text-yellow-300">
              Mise actuelle : {bet}$
            </div>
            <Controls onHit={onHit} onStand={onStand} isGameOver={isGameOver} />
          </>
        )}
        {isGameOver && showPostGameOptions && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setHasBet(false);
                setBet(null);
                setShowPostGameOptions(false);
                onRestart(); // remet tout à zéro
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
            >
              Retirer
            </button>

            <button
              onClick={() => {
                setShowPostGameOptions(false);
                onRestart(); // recommence avec même mise
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
            >
              Distribuer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameTable;
