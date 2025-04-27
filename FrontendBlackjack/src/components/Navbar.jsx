import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faPowerOff,
  faUserPen,
  faRotateRight,
  faChartPie,
  faMoon,
  faSun,
  faVolumeXmark,
  faVolumeHigh,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // Données de l'utilisateur (nom, email)
  const [stats, setStats] = useState(null); // Données des statistiques de jeu

  // Récupérer les données utilisateur (nom, email)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/utilisateurs/1")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Erreur de récupération des données utilisateur :", error);
      });
  }, []);

  // Récupérer les statistiques de jeu
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/statistiques/1")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Erreur de récupération des statistiques de jeu :", error);
      });
  }, []);

  const handleLogoutConfirm = () => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir quitter ?",
      text: "Vous allez être redirigé vers l'accueil.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, quitter",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Utilisateur déconnecté");
        navigate("/");
      }
    });
  };

  const openModal = (type) => {
    if (type === "logout") {
      handleLogoutConfirm();
    } else {
      setModalType(type);
    }
  };

  const closeModal = () => setModalType(null);

  return (
    <>
      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-800 to-slate-900 backdrop-blur-md shadow-md text-white border-b border-white/20">
        <h2 className="text-xl font-bold font-serif tracking-wide">
          <FontAwesomeIcon
            icon={faWandMagicSparkles}
            className="mr-2 text-yellow-400"
          />
          Jeux Blackjack
        </h2>
        <div className="flex gap-8 text-xl cursor-pointer">
          <FontAwesomeIcon
            icon={faUser}
            className="hover:text-blue-400 transition"
            onClick={() => openModal("profile")}
          />
          <FontAwesomeIcon
            icon={faGear}
            className="hover:text-blue-400 transition"
            onClick={() => openModal("settings")}
          />
          <FontAwesomeIcon
            icon={faPowerOff}
            className="hover:text-red-400 transition"
            onClick={() => openModal("logout")}
          />
        </div>
      </div>

      {modalType === "profile" && (
        <Modal title="Profil" onClose={closeModal}>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold py-2 text-blue-500">
                <FontAwesomeIcon icon={faUser} /> Informations personnelles
              </h2>
              <table className="w-full text-left border border-gray-300 rounded-lg shadow-sm overflow-hidden">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 bg-gray-100 font-medium">Nom</td>
                    <td className="px-4 py-2 bg-gray-50">
                      {userData?.nom ?? "Nom non disponible"}
                    </td>
                    <td className="px-2 py-2 bg-gray-50 text-blue-600 hover:text-blue-800">
                      <button>
                        <FontAwesomeIcon icon={faUserPen} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-2 bg-gray-100 font-medium">Email</td>
                    <td className="px-4 py-2 bg-gray-50">
                      {userData?.email ?? "Email non disponible"}
                    </td>
                    <td className="px-2 py-2 bg-gray-50 text-blue-600 hover:text-blue-800">
                      <button>
                        <FontAwesomeIcon icon={faUserPen} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <div className="flex justify-between py-2">
                <h2 className="text-lg font-semibold text-blue-500">
                  <FontAwesomeIcon icon={faChartPie} /> Statistiques de jeu
                </h2>
                <button className="text-red-500 hover:underline">
                  <FontAwesomeIcon icon={faRotateRight} /> restaurer
                </button>
              </div>

              <table className="w-full text-left border border-blue-200 rounded-lg shadow-sm overflow-hidden">
                <tbody>
                  <tr className="border-b border-blue-200 ">
                    <td className="px-4 py-2 bg-gray-100 font-medium">
                      Parties jouées
                    </td>
                    <td className="px-4 py-2 bg-white">
                      {stats?.partiesJouees ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100 font-medium">
                      Parties gagnées
                    </td>
                    <td className="px-4 py-2 bg-white">
                      {stats?.partiesGagnees ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100 font-medium">
                      Parties perdues
                    </td>
                    <td className="px-4 py-2 bg-white">
                      {stats?.partiesPerdues ?? "-"}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100 font-medium">
                      Total de jetons gagnés
                    </td>
                    <td className="px-4 py-2 bg-white">
                      {stats?.jetonsGagnes ?? "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 bg-gray-100 font-medium">
                      Meilleure série de victoires
                    </td>
                    <td className="px-4 py-2 bg-white">
                      {stats?.meilleureSerieVictoires ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}

      {modalType === "settings" && (
        <Modal title="Paramètres" onClose={closeModal}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-blue-500">Thème</h3>
              <div className="mt-2 flex items-center gap-4">
                <button className="px-4 py-2 bg-gray-200 rounded text-blue-600 hover:bg-gray-300 transition">
                  <FontAwesomeIcon icon={faSun} /> Clair
                </button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
                  <FontAwesomeIcon icon={faMoon} /> Sombre
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-500">Son</h3>
              <div className="mt-2 flex items-center gap-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  <FontAwesomeIcon icon={faVolumeHigh} /> Activé
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  <FontAwesomeIcon icon={faVolumeXmark} /> Désactivé
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-500">
                Notifications
              </h3>
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    defaultChecked
                  />
                  <span>Recevoir les alertes de victoire</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span>Activer les rappels de pause</span>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Navbar;
