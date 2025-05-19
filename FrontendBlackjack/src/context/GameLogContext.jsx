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
          `http://localhost:8080/api/game_logs/${userId}`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );

        setGameLogs(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des logs de jeu:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Impossible de charger l'historique des parties");
      } finally {
        setLoading(false);
      }
    };

    fetchGameLogs();
  }, []);

  const addGameLog = async (logData) => {
    const userId = parseInt(localStorage.getItem("userId")); // Convertir en number
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      throw new Error("Authentification requise");
    }

    try {
      const payload = {
        ...logData,
        userId, // Maintenant un nombre
        datePartie: new Date().toISOString(),
      };

      console.log("Envoi des données:", payload); // Log pour débogage

      const response = await axios.post(
        `http://localhost:8080/api/game_logs/play`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponse du serveur:", response.data); // Log pour débogage

      setGameLogs((prevLogs) => [response.data, ...prevLogs]);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur complète lors de l'ajout du log de jeu:", 
        error.response?.data || error.message
      );
      throw error.response?.data || new Error("Échec de l'enregistrement");
    }
  };

  return (
    <GameLogContext.Provider value={{ gameLogs, loading, error, addGameLog }}>
      {children}
    </GameLogContext.Provider>
  );
}

export const useGameLog = () => useContext(GameLogContext);