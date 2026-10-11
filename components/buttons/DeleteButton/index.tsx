"use client";
import { FaTrashCan } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DeleteButtonPropsType } from "./types";

const DeleteButton = ({
  id,
  type = "text",
  deleteFunction,
  onDeleteSuccess,
}: DeleteButtonPropsType) => {
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
      {type === "icon" ? <FaTrashCan size={20} /> : "Delete"}
      <span className="action-tooltipText">Delete</span>
    </button>
  );
};

export default DeleteButton;