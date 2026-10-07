"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCommentSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { AddCommentAction } from "@/actions/add-comment-action";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "react-toastify";

const AddCommentForm = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postCommentSchema) });

  const { mutate, error } = useMutation({
    mutationFn: AddCommentAction,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId]
      })
    },
    onSettled: () => toast.success("Comment Added"),
  });

  return (
    <form className="w-full border" onSubmit={handleSubmit((values) => mutate({commentData: {content: values.content}, postId}))}>
      <label htmlFor="content">Add Comment:</label>
      <textarea {...register("content")} placeholder="Comment..."></textarea>
      {errors.content && <ErrorMessage error={errors.content.message!} />}
      <button>Comment</button>
      {error && <ErrorMessage error={error.message} />}
    </form>
  );
};

export default AddCommentForm;