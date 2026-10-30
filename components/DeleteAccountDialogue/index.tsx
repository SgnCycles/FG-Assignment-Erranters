"use client";
import { useState } from "react";
import DeleteAccountButton from "@/components/buttons/DeleteAccountButton";

const DeleteAccountDialogue = ({ userId }: { userId: string }) => {

  const [dialogueBoxOpen, setDialogueBoxOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center md:items-end">
      <div className="mb-5">
        <button
          className="delete-account-button w-auto"
          onClick={() => setDialogueBoxOpen(!dialogueBoxOpen)}
        >
          Delete Account
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down preview-icon"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
      {dialogueBoxOpen && (
        <div className="flex flex-col gap-2 items-center">
          <h2>Confirm Your Account Deletion</h2>
          <p className="text-center">Are you sure you want to delete your account?</p>
          <div className="flex flex-col lg:flex-row justify-around gap-2">
            <DeleteAccountButton userId={userId} />
            <button className="add-comment-button" onClick={() => setDialogueBoxOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountDialogue;