import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, buttonType }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            {buttonType === "submit" ? (
              <p className="mb-4">Are you sure you want to submit the form?</p>
            ) : (
              <p className="mb-4">Are you sure you want to reset the form?</p>
            )}
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={onConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
