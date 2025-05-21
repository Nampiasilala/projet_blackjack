import { createContext, useContext, useState } from "react";
import axios from "axios";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentWinStreak, setCurrentWinStreak] = useState(0);

  const fetchStats = async (userId, token) => {
    try {
      setLoading(true);
      setError(null);
      
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
      setError("Impossible de récupérer les statistiques");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetStats = async (userId, token) => {
    try {
      setLoading(true);
      setError(null);
      
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

      setCurrentWinStreak(0);
      return newStats;
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des stats :", error);
      setError("Impossible de réinitialiser les statistiques");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateStats = async ({ isVictory, isBlackjack, isPush, userId, token, bet }) => {
    if (!userId || !token || !bet) {
      console.error("Données manquantes pour la mise à jour des stats");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: currentStats } = await axios.get(
        `http://localhost:8080/api/statistiques/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      let newWinStreak = currentWinStreak;
      if (isVictory && !isPush) {
        newWinStreak += 1;
      } else if (!isPush) {
        newWinStreak = 0;
      }
      
      setCurrentWinStreak(newWinStreak);
  
      const updatedData = {
        partiesJouees: currentStats.partiesJouees + 1,
        partiesGagnees: currentStats.partiesGagnees + (isVictory && !isPush ? 1 : 0),
        partiesPerdues: currentStats.partiesPerdues + (!isVictory && !isPush ? 1 : 0),
        partiesEgalites: currentStats.partiesEgalites + (isPush ? 1 : 0),

        jetonsGagnes: isVictory && !isPush
          ? currentStats.jetonsGagnes + (isBlackjack ? Math.floor(bet * 1.5) : bet)
          : currentStats.jetonsGagnes,

          jetonsPerdus: !isVictory && !isPush
          ? currentStats.jetonsPerdus + bet
          : currentStats.jetonsPerdus,

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
      setError("Impossible de mettre à jour les statistiques");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <StatsContext.Provider
      value={{ 
        stats, 
        currentWinStreak, 
        fetchStats, 
        updateStats, 
        resetStats,
        loading,
        error 
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);