import { createContext, useContext, useState } from "react";
import axios from "axios";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);

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
      setStats(response.data); // ✅ on met à jour le state local
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des stats :", error);
      throw error;
    }
  };

  const resetStats = async (userId, token) => {
    try {
      // Données par défaut pour réinitialiser les statistiques
      const resetData = {
        partiesJouees: 0,
        partiesGagnees: 0,
        partiesPerdues: 0,
        jetonsGagnes: 0,
        meilleureSerieVictoires: 0,
      };

      // Envoi de la requête PUT pour réinitialiser les statistiques de l'utilisateur
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

      // Mise à jour des statistiques dans le state
      setStats(newStats);
      return newStats;
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des stats :", error);
      throw error;
    }
  };

  const updateStats = async ({ isVictory, userId, token }) => {
    try {
      const { data: currentStats } = await axios.get(
        `http://localhost:8080/api/statistiques/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedData = {
        partiesJouees: currentStats.partiesJouees + 1,
        partiesGagnees: currentStats.partiesGagnees + (isVictory ? 1 : 0),
        partiesPerdues: currentStats.partiesPerdues + (isVictory ? 0 : 1),
        jetonsGagnes: currentStats.jetonsGagnes,
        meilleureSerieVictoires: isVictory
          ? Math.max(
              currentStats.meilleureSerieVictoires,
              currentStats.currentWinStreak + 1
            )
          : currentStats.meilleureSerieVictoires,
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
    <StatsContext.Provider value={{ stats, fetchStats, updateStats, resetStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
