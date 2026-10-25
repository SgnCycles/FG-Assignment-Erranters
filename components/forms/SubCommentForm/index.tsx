"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCommentSchema } from "@/schemas/schemas";
import { useMutation } from "@tanstack/react-query";
import { AddSubcommentAction } from "@/actions/add-subcomment-action";
import ErrorMessage from "@/components/ErrorMessage";
import { toast } from "react-toastify";
import AddCommentButton from "@/components/buttons/AddCommentButton";
import { useRouter } from "next/navigation";
import { AddSubCommentFormPropsType } from "./types";

const AddSubCommentForm = ({ setReplyOpen, postId, parentId, slug }: AddSubCommentFormPropsType) => {
  
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postCommentSchema) });

  const { mutate, error } = useMutation({
    mutationFn: AddSubcommentAction,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-comments-count", postId],
      });
      router.refresh();
    },
    onSettled: () => toast.success("Comment Added"),
  });

  return (
    <form
      className="flex flex-col flex-1 w-full"
      onSubmit={handleSubmit((values) =>
        mutate({ commentData: { content: values.content }, postId, slug, parentId }),
      )}
    >
      <label htmlFor="content" className="comment-form-heading-h2 hidden">
        Add comment:
      </label>
      <textarea
        {...register("content")}
        placeholder="Comment..."
        className="input"
      ></textarea>
      {errors.content && <ErrorMessage error={errors.content.message!} />}
      <div className="flex justify-end mt-4 gap-4">
        <button type="button" className="button-light-secondary" onClick={() => setReplyOpen(false)}>Cancel</button>
        <AddCommentButton />
      </div>
      {error && <ErrorMessage error={error.message} />}
    </form>
  );
};

export default AddSubCommentForm;