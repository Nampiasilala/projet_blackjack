import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const GameLogContext = createContext();

export const GameLogProvider = ({ children }) => {
  const { currentUser, authLoading } = useAuth();
  const [gameLogs, setGameLogs] = useState([]);

  useEffect(() => {
    if (!authLoading && currentUser) {
      fetchGameLogs();
    }
  }, [authLoading, currentUser]);

  const fetchGameLogs = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/game_logs/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGameLogs(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des logs de jeu :", err);
    }
  };

  const addGameLog = async ({ mise, gain, resultat }) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) return;

    try {
      await axios.post(
        "http://localhost:8080/api/game_logs/play",
        {
          userId: parseInt(userId),
          mise,
          gain,
          resultat,
        },
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchGameLogs();
    } catch (err) {
      console.error("Erreur lors de l'ajout d'un log de jeu :", err);
    }
  };

  return (
    <GameLogContext.Provider value={{ gameLogs, fetchGameLogs, addGameLog }}>
      {children}
    </GameLogContext.Provider>
  );
};

export const useGameLog = () => useContext(GameLogContext);
