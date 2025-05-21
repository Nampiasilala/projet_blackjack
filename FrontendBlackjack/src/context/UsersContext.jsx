import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, currentUser, authLoading } = useAuth();

  const fetchUsers = useCallback(async (forceRefresh = false) => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
        
    if (users.length > 0 && !forceRefresh) {
      setLoading(false);
      return;
    }
  
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "http://localhost:8080/api/utilisateurs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
      setError("Impossible de charger la liste des utilisateurs");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, users.length]);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchUsers();
    }
  }, [authLoading, isAuthenticated, fetchUsers]);

  const updateUserBalance = async (userId, newBalance) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/utilisateurs/${userId}/balance`,
        { balance: newBalance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, balance: newBalance } : user
        )
      );

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du solde:", error);
      throw error;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        loading,
        error,
        refreshUsers: fetchUsers,
        updateUserBalance,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
