import React, { useRef, useEffect } from "react";

function Modal({ title, children, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ignorer les clics sur SweetAlert
      if (event.target.closest(".swal2-container")) return;
    
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div ref={modalRef} className="bg-white rounded-2xl shadow-lg p-6 max-h-[700px] w-[500px] text-black relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-2xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

