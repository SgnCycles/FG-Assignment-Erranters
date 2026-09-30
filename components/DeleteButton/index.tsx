"use client";
import {DeletePost} from "@/actions/delete-action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { mutate } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast.error("Your toast has been deleted"),
  });

  return (
    <button
      className="button-secondary"
      onClick={() => mutate(id)}
    >
      Delete post
    </button>
  );
};

export default DeleteButton;