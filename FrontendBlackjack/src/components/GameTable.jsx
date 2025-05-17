import React, { useEffect, useRef, useState } from "react";
import PlayerHand from "./PlayerHand";
import DealerHand from "./DealerHand";
import Controls from "./Controls";
import { useStats } from "../context/StatsContext";
import {
  faTrophy,
  faXmark,
  faGamepad,
  faEquals,
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
  const [initialBet, setInitialBet] = useState(null);
  const [currentBet, setCurrentBet] = useState(null);
  const [hasBet, setHasBet] = useState(false);
  const [showPostGameOptions, setShowPostGameOptions] = useState(false);
  const [playerBalance, setPlayerBalance] = useState(1000);
  const hasUpdatedStatsRef = useRef(false); // REF pour éviter les doubles exécutions

  useEffect(() => {
    const savedBalance = localStorage.getItem("playerBalance");
    if (savedBalance) {
      setPlayerBalance(parseInt(savedBalance));
    }

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

  const getHandValue = (hand) => {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
      const rank = card.value;
      if (["JACK", "QUEEN", "KING"].includes(rank)) {
        value += 10;
      } else if (rank === "ACE") {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(rank);
      }
    });

    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  useEffect(() => {
    const handleGameEnd = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (
        !isGameOver ||
        !message ||
        !userId ||
        !token ||
        hasUpdatedStatsRef.current ||
        !currentBet
      )
        return;

      const lowerMessage = message.toLowerCase();
      const isVictory =
        lowerMessage.includes("vous gagnez") ||
        lowerMessage.includes("black jack");
      const isPush = lowerMessage.includes("égalité");
      const isBlackjack =
        !isPush && playerCards.length === 2 && getHandValue(playerCards) === 21;

      let newBalance = playerBalance;

      // Calcul correct du gain
      if (isVictory) {
        const gain = isBlackjack ? Math.floor(currentBet * 1.5) : currentBet;
        newBalance += currentBet + gain; // La mise initiale + le gain
      } else if (isPush) {
        newBalance += currentBet; // Remboursement de la mise
      }
      // En cas de défaite, la mise a déjà été déduite du solde

      setPlayerBalance(newBalance);
      localStorage.setItem("playerBalance", newBalance.toString());

      try {
        const updated = await updateStats({
          isVictory,
          isBlackjack,
          isPush,
          userId,
          token,
          bet: currentBet,
        });
        setLocalStats(updated);
        setShowPostGameOptions(true);
        hasUpdatedStatsRef.current = true; // Éviter les doubles appels
      } catch (error) {
        console.error("Erreur mise à jour stats:", error);
      }
    };

    handleGameEnd();
  }, [isGameOver, message]);

  useEffect(() => {
    if (!isGameOver) {
      hasUpdatedStatsRef.current = false;
      setShowPostGameOptions(false);
    }
  }, [isGameOver]);

  const placeBet = (amount) => {
    if (amount > playerBalance) {
      alert("Solde insuffisant !");
      return;
    }

    setInitialBet(amount);
    setCurrentBet(amount);
    setHasBet(true);

    const newBalance = playerBalance - amount;
    setPlayerBalance(newBalance);
    localStorage.setItem("playerBalance", newBalance.toString());
  };

  const handleDoubleBet = () => {
    if (initialBet > playerBalance) {
      alert("Solde insuffisant pour doubler !");
      return;
    }

    const newBalance = playerBalance - initialBet;
    setPlayerBalance(newBalance);
    localStorage.setItem("playerBalance", newBalance.toString());

    setCurrentBet(initialBet * 2);
  };

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
          <FontAwesomeIcon icon={faEquals} className="text-blue-300 mr-2" />
          Égalités: {stats?.partiesEgalites ?? 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faGamepad} className="text-blue-500 mr-2" />
          Parties jouées: {stats?.partiesJouees ?? 0}
        </p>
      </div>

      <div className="absolute top-4 left-6 z-20 bg-black/50 text-white p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-sm font-mono space-y-1">
        <p>Solde actuel: {playerBalance}$</p>
        <p>
          <FontAwesomeIcon icon={faTrophy} className="text-green-500 mr-2" />
          Jetons gagnés: {stats?.jetonsGagnes ?? 0}
        </p>
        <p>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 mr-2" />
          Jetons perdus: {stats?.jetonsPerdus ?? 0}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-[90%] max-w-4xl p-6 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-white/20">
        <h1 className="text-2xl font-bold mb-6 font-serif tracking-wider">
          Blackjack
        </h1>

        {!hasBet && (
          <div className="flex flex-wrap justify-center gap-4 mb-6 z-20">
            {[5, 10, 25, 50, 100].map((value) => {
              const colors = {
                5: "bg-red-600",
                10: "bg-blue-600",
                25: "bg-green-600",
                50: "bg-black",
                100: "bg-purple-700",
              };
              return (
                <button
                  key={value}
                  onClick={() => placeBet(value)}
                  disabled={value > playerBalance}
                  className={`relative w-16 aspect-square rounded-full text-white font-bold text-lg shadow-lg border-4 border-white 
          ${
            value > playerBalance
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : `${colors[value]} hover:brightness-110`
          }
        `}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    {value}
                  </span>
                  <div className="absolute inset-0 rounded-full border-dashed border-2 border-white pointer-events-none" />
                </button>
              );
            })}
          </div>
        )}

        {hasBet && (
          <>
            <DealerHand cards={dealerCards} isGameOver={isGameOver} />
            <div className="w-full h-0.5 my-4 bg-white/30 rounded-full" />
            <PlayerHand cards={playerCards} />

            <p className="text-lg mt-6 font-medium">{message}</p>
            <div className="mt-2 mb-4 text-lg font-semibold text-yellow-300">
              Mise actuelle : {currentBet}$
            </div>
            <Controls
              onHit={onHit}
              onStand={onStand}
              isGameOver={isGameOver}
              bet={initialBet}
              onDoubleBet={handleDoubleBet}
            />
          </>
        )}

        {isGameOver && showPostGameOptions && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setHasBet(false);
                setInitialBet(null);
                setCurrentBet(null);
                setShowPostGameOptions(false);
                onRestart();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
            >
              Retirer
            </button>
            <button
              onClick={() => {
                setShowPostGameOptions(false);
                onRestart();
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
