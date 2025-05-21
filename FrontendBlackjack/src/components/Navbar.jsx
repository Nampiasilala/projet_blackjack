import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faTrash,
  faUsersGear,
  faPowerOff,
  faUserPen,
  faRotateRight,
  faChartPie,
  faMoon,
  faSun,
  faVolumeXmark,
  faVolumeHigh,
  faWandMagicSparkles,
  faUsers,
  faHistory,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useStats } from "../context/StatsContext";
import { useUsers } from "../context/UsersContext";
import { useAuth } from "../context/AuthContext";
import { useGameLog } from "../context/GameLogContext";
import GameHistory from "./GameHistory";


function Navbar() {
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();
  const { resetStats, stats } = useStats();
  const { currentUser, logout } = useAuth();
  const { users, setUsers, refreshUsers, loading } = useUsers();
  const { fetchGameLogs } = useGameLog();
  const filteredUsers = users.filter((user) => user.id !== currentUser?.id);
  const [profileData, setProfileData] = useState(null);


  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    if (currentUser) {
      refreshUsers();
    }
  }, [currentUser, refreshUsers, modalType]);

  useEffect(() => {
      refreshUsers();
  }, []);

  const handleReset = () => {
    if (currentUser) {
      const userId = currentUser.id;
      const token = currentUser.token;
      resetStats(userId, token);
    }
  };

  const handleOpenUsersModal = async () => {
    await refreshUsers();
    openModal("users");
  };

  const handleOpenProfileModal = async () => {
    await refreshUsers();
    setProfileData(currentUser);
    openModal("profile");
    console.log("kkkkkk", currentUser);
  };

  const handleOpenHistoryModal = async () => {
    openModal("history");
    await refreshUsers();
    await fetchGameLogs();
  };

  const handleDeleteUser = (id, nom) => {
    Swal.fire({
      title: "Suppression d'utilisateur",
      text: `Souhaitez-vous vraiment supprimer ${nom} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3498db",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      background: "#1e293b",
      color: "#f8fafc",
      customClass: {
        popup: "rounded-xl shadow-lg",
        confirmButton:
          "px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded",
        cancelButton:
          "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");

          await axios.delete(`http://localhost:8080/api/utilisateurs/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUsers(users.filter((user) => user.id !== id));

          Swal.fire({
            title: "Supprimé",
            text: "L'utilisateur a été supprimé avec succès.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "#1e293b",
            color: "#f8fafc",
          });
        } catch (error) {
          console.error("Erreur de suppression :", error);
          Swal.fire({
            title: "Erreur",
            text: "Impossible de supprimer l'utilisateur.",
            icon: "error",
            background: "#1e293b",
            color: "#f8fafc",
          });
        }
      }
    });
  };

  const handleLogoutConfirm = () => {
    Swal.fire({
      title: "Déconnexion",
      text: "Souhaitez-vous vraiment vous déconnecter ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3498db",
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Annuler",
      background: "#1e293b",
      color: "#f8fafc",
      customClass: {
        popup: "rounded-xl shadow-lg",
        confirmButton:
          "px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded",
        cancelButton:
          "px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Déconnecté",
          text: "Vous avez été déconnecté avec succès.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          background: "#1e293b",
          color: "#f8fafc",
        });
      }
    });
  };


  const IconButton = ({
    icon,
    onClick,
    color = "text-white",
    hoverColor = "hover:text-blue-400",
  }) => (
    <FontAwesomeIcon
      icon={icon}
      className={`cursor-pointer ${color} ${hoverColor} transition`}
      onClick={onClick}
    />
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-4">
      <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-xl" />
      <span className="ml-2">Chargement des données...</span>
    </div>
  );

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
          <IconButton icon={faUser} onClick={handleOpenProfileModal} />
          <IconButton icon={faUsersGear} onClick={handleOpenUsersModal} />
          <IconButton icon={faHistory} onClick={handleOpenHistoryModal} />
          <IconButton icon={faGear} onClick={() => openModal("settings")} />
          <IconButton icon={faPowerOff} onClick={handleLogoutConfirm} />
        </div>
      </div>

      {modalType === "profile" && (
        <Modal title="Profil" onClose={closeModal}>
          {loading ? (
            <LoadingSpinner />
          ) : (
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
                        {currentUser?.nom ?? "Nom non disponible"}
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
                        {currentUser?.email ?? "Email non disponible"}
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
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={handleReset}
                  >
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
                    <tr className="border-b border-blue-200">
                      <td className="px-4 py-2 bg-gray-100 font-medium">
                        Total de jetons perdus
                      </td>
                      <td className="px-4 py-2 bg-white">
                        {stats?.jetonsPerdus ?? "-"}
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
          )}
        </Modal>
      )}

      {modalType === "users" && (
        <Modal title="Gérer les utilisateurs" onClose={closeModal}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-blue-500 flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} />
                Tous les utilisateurs
              </h2>

              <div className="border rounded-lg shadow-md overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-gray-700">
                          Nom
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700">
                          Email
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td
                            colSpan="3"
                            className="px-4 py-4 text-center text-gray-500"
                          >
                            Aucun utilisateur trouvé.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3">{user.nom}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td
                              className="px-4 py-3 text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => handleDeleteUser(user.id, user.nom)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}

      {modalType === "history" && (
        <Modal title="Historiques" onClose={closeModal}>
          <GameHistory />
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