import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StatsProvider } from "./context/StatsContext";
import { UsersProvider } from "./context/UsersContext";
import { GameLogProvider } from "./context/GameLogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <StatsProvider>
          <GameLogProvider>
            <App />
            </GameLogProvider>
          </StatsProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
