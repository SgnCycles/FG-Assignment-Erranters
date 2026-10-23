"use client";
import { useState } from "react";
import DeleteAccountButton from "@/components/buttons/DeleteAccountButton";

const DeleteAccountModal = ({userId}: {userId: string}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <div>
        <button
          className="button error block"
          onClick={() => setModalOpen(!modalOpen)}
        >
          Delete Account
        </button>
      </div>

      {modalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Confirm Account Deletion</h2>
            <p>Are you sure you want to delete your account?</p>
            <div>
              <DeleteAccountButton userId={userId} />
              <button className="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountModal;