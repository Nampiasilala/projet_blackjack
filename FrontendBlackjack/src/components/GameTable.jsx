import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
  
    console.log('Conditions:', { isGameOver, message, userId, token });
    if (!isGameOver || !message || !userId || !token) {
      console.log('Arrêt - conditions non remplies');
      return;
    }
  
    const isVictory = message.toLowerCase().includes("gagné");
  
    const payload = {
      utilisateur: { id: userId },
      parties_gagnees: isVictory ? 1 : 0,
      parties_perdues: isVictory ? 0 : 1,
    };
  
    console.log('Envoi des stats:', payload);
  
    axios
      .put(`http://localhost:8080/api/statistiques`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      .then((response) => {
        console.log("Statistiques mises à jour :", response.data);
        setStats(response.data); // Utilisez directement les données retournées
      })
      .catch((error) => {
        console.error("Erreur détaillée:", {
          message: error.message,
          response: error.response?.data,
          stack: error.stack
        });
      });
  }, [isGameOver, message]);

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
        <p>✅ Parties gagnées : {stats?.parties_gagnees ?? "-"}</p>
        <p>❌ Parties perdues : {stats?.parties_perdues ?? "-"}</p>
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
