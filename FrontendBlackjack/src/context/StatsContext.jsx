import { createContext, useContext, useState } from "react";
import axios from "axios";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);
  // Ajouter un state pour suivre la série de victoires actuelle
  const [currentWinStreak, setCurrentWinStreak] = useState(0);

  const fetchStats = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/statistiques/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des stats :", error);
      throw error;
    }
  };

  const resetStats = async (userId, token) => {
    try {
      const resetData = {
        partiesJouees: 0,
        partiesGagnees: 0,
        partiesPerdues: 0,
        partiesEgalites: 0,
        jetonsGagnes: 0,
        jetonsPerdus: 0,
        meilleureSerieVictoires: 0,
      };

      const { data: newStats } = await axios.put(
        `http://localhost:8080/api/statistiques/${userId}`,
        resetData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStats(newStats);
      // Réinitialiser la série de victoires
      setCurrentWinStreak(0);
      return newStats;
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des stats :", error);
      throw error;
    }
  };

  const updateStats = async ({ isVictory, isBlackjack, isPush, userId, token, bet }) => {
    try {
      const { data: currentStats } = await axios.get(
        `http://localhost:8080/api/statistiques/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mettre à jour la série de victoires actuelle
      let newWinStreak = currentWinStreak;
      if (isVictory && !isPush) {
        newWinStreak += 1;
      } else if (!isPush) {
        // Réinitialiser la série en cas de défaite
        newWinStreak = 0;
      }
      
      // Mettre à jour le state de la série de victoires
      setCurrentWinStreak(newWinStreak);

      const updatedData = {
        partiesJouees: currentStats.partiesJouees + 1,
        partiesGagnees: currentStats.partiesGagnees + (isVictory && !isPush ? 1 : 0),
        partiesPerdues: currentStats.partiesPerdues + (!isVictory && !isPush ? 1 : 0),
        partiesEgalites: currentStats.partiesEgalites + (isPush ? 1 : 0),
        // Correction du calcul des jetons gagnés
        jetonsGagnes: isVictory
          ? currentStats.jetonsGagnes + (isBlackjack ? Math.floor(bet * 1.5) : bet)
          : currentStats.jetonsGagnes,
        // Correction du calcul des jetons perdus
        jetonsPerdus: !isVictory && !isPush
          ? (currentStats.jetonsPerdus || 0) + bet
          : currentStats.jetonsPerdus,
        // Correction de la meilleure série de victoires
        meilleureSerieVictoires: Math.max(
          currentStats.meilleureSerieVictoires || 0,
          newWinStreak
        ),
      };

      const { data: newStats } = await axios.put(
        `http://localhost:8080/api/statistiques/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStats(newStats);
      return newStats;
    } catch (error) {
      console.error("Erreur mise à jour stats:", error);
      throw error;
    }
  };

  return (
    <StatsContext.Provider
      value={{ stats, currentWinStreak, fetchStats, updateStats, resetStats }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);