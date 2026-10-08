"use client";
import { FaTrashCan } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type DeleteButtonProps = {
  id: string;
  type: "text" | "icon";
  deleteFunction: (id: string) => Promise<unknown>;
  onDeleteSuccess?: () => void;
};

const DeleteButton = ({
  id,
  type = "text",
  deleteFunction,
  onDeleteSuccess,
}: DeleteButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: deleteFunction,
    onSuccess: () => {
      toast.success("Deleted successfully");
      onDeleteSuccess?.();
    },
    onError: () => toast.error("Something went wrong"),
  });

  return (
    <button
      className={type === "icon" ? "action-tooltip" : "button-secondary"}
      onClick={() => mutate(id)}
    >
      {type === "icon" ? <FaTrashCan size={25} /> : "Delete"}
      <span className="action-tooltipText">Delete Post</span>
    </button>
  );
};

export default DeleteButton;