"use client";
import DeleteUserAccountAction from "@/actions/delete-user-action";
import { useTransition } from "react";
import { toast } from "react-toastify";

const DeleteAccountButton = ({ userId }: { userId: string }) => {
  
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccountButtonClick = () => {
    startTransition(async () => {
      const deleteResult = await DeleteUserAccountAction(userId);
      if (deleteResult && !deleteResult.success) {
        toast.error(deleteResult.error)
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