import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      axios
        .get(`http://localhost:8080/api/utilisateurs/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCurrentUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setAuthLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setAuthLoading(false);
    }
  }, []);

  const login = async (token, userId) => {
    setAuthLoading(true); // Ajouté
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/utilisateurs/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur de récupération de l'utilisateur :", error);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false); // Ajouté
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
