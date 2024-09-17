import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupModal = ({ isOpen, onClose, className, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-10">
      <div
        className={`bg-White rounded-lg shadow-lg relative w-full h-full p-6 overflow-y-scroll ${className}`}
      >
        <button
          className="absolute top-3 right-3 text-Gray hover:text-gray-800"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
