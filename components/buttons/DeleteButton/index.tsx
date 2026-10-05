"use client";
import { DeletePost } from "@/actions/delete-action";
import { FaTrashCan } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type DeleteButtonProps = {
  id: string;
  type: "text" | "icon";
};

const DeleteButton = ({ id, type = "text" }: DeleteButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast.error("Your toast has been deleted"),
  });

  return (
    <button
      className={type === "icon" ? "cursor-pointer" : "button-secondary"}
      onClick={() => mutate(id)}
    >
      {type === "icon" ? <FaTrashCan size={25}/> : "Delete"}
    </button>
  );
};

export default DeleteButton;