import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // <-- Ajout du router
import { AuthProvider } from "./context/AuthContext";
import { StatsProvider } from "./context/StatsContext";
import { UsersProvider } from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <StatsProvider>
            <App />
          </StatsProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
