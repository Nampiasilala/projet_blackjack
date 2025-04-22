import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
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
        <h2 className="text-2xl font-bold">Blackjack Game</h2>
        <div className="flex gap-4 text-xl cursor-pointer">
          <FontAwesomeIcon icon={faUser} onClick={() => openModal("profile")} />
          <FontAwesomeIcon icon={faGear} onClick={() => openModal("settings")} />
          <FontAwesomeIcon icon={faPowerOff} onClick={() => openModal("logout")} />
        </div>
      </div>

      {modalType === "profile" && (
        <Modal title="Profil" onClose={closeModal}>
          <p>
            Nom : Njiva
            <br />
            Email : exemple@mail.com
          </p>
        </Modal>
      )}

      {modalType === "settings" && (
        <Modal title="Paramètres" onClose={closeModal}>
          <p>Réglages utilisateur ici...</p>
        </Modal>
      )}
    </>
  );
}

export default Navbar;
