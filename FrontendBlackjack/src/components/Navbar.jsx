import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Swal from "sweetalert2";

function Navbar() {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type) => {
    switch (type) {
      case "profile":
        setModalContent({
          title: "Profil",
          content: (
            <p>
              Nom : Njiva
              <br />
              Email : exemple@mail.com
            </p>
          ),
        });
        break;
      case "settings":
        setModalContent({
          title: "Paramètres",
          content: <p>Réglages utilisateur ici...</p>,
        });
        break;
      case "logout":
        handleLogoutConfirm();
        break;
      default:
        setModalContent(null);
    }
  };

  const handleLogoutConfirm = () => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir quitter ?",
      text: "Vous allez être déconnecté.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, quitter",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Utilisateur déconnecté");
      }
    });
  };

  const closeModal = () => setModalContent(null);

  return (
    <>
      <div className="flex justify-between items-center p-4 text-white">
        <h2 className="text-2xl font-bold">Blackjack Game</h2>
        <div className="flex gap-4 text-xl cursor-pointer">
          <FontAwesomeIcon icon={faUser} onClick={() => openModal("profile")} />
          <FontAwesomeIcon icon={faGear} onClick={() => openModal("settings")} />
          <FontAwesomeIcon icon={faPowerOff} onClick={() => openModal("logout")} />
        </div>
      </div>

      {modalContent && (
        <Modal title={modalContent.title} onClose={closeModal}>
          {modalContent.content}
        </Modal>
      )}
    </>
  );
}

export default Navbar;
