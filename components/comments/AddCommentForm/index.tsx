"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCommentSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { AddCommentAction } from "@/actions/add-comment-action";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "react-toastify";
import AddCommentButton from "@/components/buttons/AddComment";

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
        queryKey: ["post-comments", postId],
      });
    },
    onSettled: () => toast.success("Comment Added"),
  });

  return (
    <form
      className="w-full flex flex-col"
      onSubmit={handleSubmit((values) =>
        mutate({ commentData: { content: values.content }, postId }),
      )}
    >
      <label htmlFor="content" className="font-bold mb-2">
        Add Comment:
      </label>
      <textarea
        {...register("content")}
        placeholder="Comment..."
        className="bg-ecru-white text-outer-space rounded-2xl placeholder:text-outer-space p-2"
      ></textarea>
      {errors.content && <ErrorMessage error={errors.content.message!} />}
      <div className="flex justify-end mt-4">
        <AddCommentButton />
      </div>
      {error && <ErrorMessage error={error.message} />}
    </form>
  );
};

export default AddCommentForm;