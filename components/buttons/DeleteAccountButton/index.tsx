"use client";
import { DeleteUserAccountAction } from "@/actions/delete-user-action";
import { useTransition } from "react";
import { toast } from "react-toastify";

const DeleteAccountButton = ({ userId }: { userId: string }) => {
  
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccountButtonClick = () => {
    startTransition(async () => {
      try {
        await DeleteUserAccountAction(userId);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("NEXT_REDIRECT")
        ) {
          throw error;
        }
        toast.error(
          error instanceof Error ? error.message : "Unable to delete user",
        );
      }
    });
  };

  return (
    <button
      type="button"
      className="delete-account-button w-40"
      onClick={handleDeleteAccountButtonClick}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteAccountButton;