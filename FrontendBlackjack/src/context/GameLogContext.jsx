import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GameLogContext = createContext();

export function GameLogProvider({ children }) {
  const [gameLogs, setGameLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    const fetchGameLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `http://localhost:8080/api/gameLogs/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setGameLogs(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des logs de jeu:", err);
        setError("Impossible de charger l'historique des parties");
      } finally {
        setLoading(false);
      }
    };

    fetchGameLogs();
  }, []);

  const addGameLog = async (logData) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    if (!userId || !token) return;
    
    try {
      const payload = {
        ...logData,
        userId,
        datePartie: new Date().toISOString()
      };
      
      const response = await axios.post(
        `http://localhost:8080/api/gameLogs`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Update local state with the new log
      setGameLogs(prevLogs => [response.data, ...prevLogs]);
      
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout du log de jeu:", error);
      throw error;
    }
  };

  return (
    <GameLogContext.Provider value={{ gameLogs, loading, error, addGameLog }}>
      {children}
    </GameLogContext.Provider>
  );
}

export const useGameLog = () => useContext(GameLogContext);