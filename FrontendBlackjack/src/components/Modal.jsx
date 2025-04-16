import React from "react";

function Modal({ title, children, onClose }) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-black relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
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

