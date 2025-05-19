import { useGameLog } from "../context/GameLogContext";

export default function GameHistory() {
  const { gameLogs, loading, error } = useGameLog();

  return (
    <div className="absolute bottom-4 left-6 z-20 bg-black/50 text-white p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-sm font-mono space-y-1">
      <div className="mt-6 p-4 rounded shadow bg-slate-600 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Historique des parties</h2>

        {loading && <p className="text-blue-300">Chargement...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {!loading && gameLogs.length === 0 ? (
          <p className="text-gray-300">Aucune partie enregistrée.</p>
        ) : (
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {gameLogs.map((log, index) => {
              let color = "";
              let icon = "";

              switch (log.resultat) {
                case "win":
                  color = "text-green-400";
                  icon = "🏆";
                  break;
                case "lose":
                  color = "text-red-400";
                  icon = "❌";
                  break;
                case "draw":
                  color = "text-yellow-400";
                  icon = "⚖️";
                  break;
                default:
                  color = "text-gray-400";
                  icon = "🎮";
              }

              return (
                <li key={index} className="text-sm border-b border-white/20 pb-1">
                  <span className={`font-medium ${color}`}>
                    {icon} {log.resultat.toUpperCase()}
                  </span>{" "}
                  - Mise : {log.mise} | Gain : {log.gain} | Date :{" "}
                  {new Date(log.datePartie).toLocaleString()}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
