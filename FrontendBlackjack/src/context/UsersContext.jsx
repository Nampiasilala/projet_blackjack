// context/UsersContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Import du contexte d'authentification

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, currentUser } = useAuth(); // Utilisation de useAuth

  useEffect(() => {
    if (!isAuthenticated) return;

    axios
      .get("http://localhost:8080/api/utilisateurs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Erreur lors du chargement des utilisateurs :", err));
  }, [isAuthenticated]);

  return (
    <UsersContext.Provider value={{ users, setUsers, currentUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
