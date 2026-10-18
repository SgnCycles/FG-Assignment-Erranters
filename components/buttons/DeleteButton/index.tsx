"use client";
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
      className={type === "icon" ? "postReactionButtons" : "button-secondary"}
      onClick={() => mutate(id)}
    >
      {type === "icon" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash preview-icon stroke-outer-space/50 hover:stroke-apple"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      ) : (
        "Delete"
      )}
      <span className="action-tooltipText">Delete</span>
    </button>
  );
};

export default DeleteButton;
