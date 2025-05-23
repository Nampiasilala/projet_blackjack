import { useGameLog } from "../context/GameLogContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faTimesCircle,
  faBalanceScale,
  faCoins,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function GameHistory() {
  const {gameLogs, loading, error } = useGameLog();

  const getIcon = (result) => {
    switch (result) {
      case "win":
        return <FontAwesomeIcon icon={faTrophy} className="text-green-500" />;
      case "lose":
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
      case "draw":
        return <FontAwesomeIcon icon={faBalanceScale} className="text-yellow-500" />;
      default:
        return <FontAwesomeIcon icon={faBalanceScale} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">
        Historique des parties
      </h2>

      {loading && <p className="text-blue-500">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && gameLogs.length === 0 ? (
        <p className="text-gray-500">Aucune partie enregistrée.</p>
      ) : (
        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {[...gameLogs].reverse().map((log, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center gap-3">
                {getIcon(log.resultat)}
                <span
                  className={`text-sm font-semibold capitalize px-2 py-1 rounded-full ${
                    log.resultat === "win"
                      ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                      : log.resultat === "lose"
                      ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                  }`}
                >
                  {log.resultat}
                </span>
              </div>

              <div className="text-right text-sm space-y-1">
                <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
                  <span className="font-medium">Mise:</span> {log.mise}
                </p>
                <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400" />
                  {formatDate(log.datePartie)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}