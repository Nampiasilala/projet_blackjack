import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StatsProvider } from "./context/StatsContext";
import { UsersProvider } from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatsProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </StatsProvider>
  </React.StrictMode>
);
