import { useState } from "react";
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
  faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();

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
      <div className="flex justify-between items-center p-4 bg-black text-white">
        <h2 className="text-2xl font-bold"><FontAwesomeIcon icon={faWandMagicSparkles} /> jeux blackjack</h2>
        <div className="flex gap-10 text-xl cursor-pointer">
          <FontAwesomeIcon icon={faUser} onClick={() => openModal("profile")} />
          <FontAwesomeIcon
            icon={faGear}
            onClick={() => openModal("settings")}
          />
          <FontAwesomeIcon
            icon={faPowerOff}
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
              <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden">
                <tbody>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100">Nom</td>
                    <td className="px-4 py-2 bg-blue-100">Njiva</td>
                    <td className=" bg-blue-100 text-blue-500">
                      <button>
                        <FontAwesomeIcon icon={faUserPen} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 bg-gray-100">Email</td>
                    <td className="px-4 py-2 bg-blue-100">exemple@mail.com</td>
                    <td className="text-blue-500 bg-blue-100">
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
                <button className="text-red-500">
                  <FontAwesomeIcon icon={faRotateRight} /> restaurer
                </button>
              </div>

              <table className="w-full text-left border border-blue-200 rounded-lg overflow-hidden">
                <tbody>
                  <tr className="border-b border-blue-200 ">
                    <td className="px-4 py-2 bg-gray-100">Parties jouées</td>
                    <td className="px-4 py-2 bg-blue-100">42</td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100">Parties gagnées</td>
                    <td className="px-4 py-2 bg-blue-100">18</td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100">Parties perdues</td>
                    <td className="px-4 py-2 bg-blue-100">24</td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="px-4 py-2 bg-gray-100">
                      Total de jetons gagnés
                    </td>
                    <td className="px-4 py-2 bg-blue-100">1500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 bg-gray-100">
                      Meilleure série de victoires
                    </td>
                    <td className="px-4 py-2 bg-blue-100">4</td>
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
                <button className="px-4 py-2 bg-gray-200 rounded text-blue-400 hover:bg-gray-300">
                <FontAwesomeIcon icon={faSun}/> Clair
                </button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                <FontAwesomeIcon icon={faMoon} /> Sombre
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-500">Son</h3>
              <div className="mt-2 flex items-center gap-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                <FontAwesomeIcon icon={faVolumeHigh} /> Activé
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                <FontAwesomeIcon icon={faVolumeXmark} /> Désactivé
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-blue-500">Notifications</h3>
              <div className="mt-2 flex items-center gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    defaultChecked
                  />
                  <span>Recevoir les alertes de victoire</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
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
