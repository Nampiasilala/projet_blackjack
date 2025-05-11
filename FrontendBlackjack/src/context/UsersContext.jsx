// context/UsersContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/api/utilisateurs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des utilisateurs :", err)
      );
  }, [token]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
