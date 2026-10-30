"use client";
import { AddSubcommentAction } from "@/actions/add-subcomment-action";
import { postCommentSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { AddSubCommentFormPropsType } from "./types";
import AddCommentButton from "@/components/buttons/AddCommentButton";
import ErrorInputMessage from "@/components/errors/ErrorInputMessage";
import { toast } from "react-toastify";

const AddSubCommentForm = ({
  setReplyOpen,
  postId,
  parentId,
  slug,
}: AddSubCommentFormPropsType) => {
  
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postCommentSchema) });

  const { mutate } = useMutation({
    mutationFn: AddSubcommentAction,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Comment Added");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["post-comments", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-comments-count", postId],
      });
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  return (
    <form
      className="flex flex-col flex-1 w-full"
      onSubmit={handleSubmit((values) =>
        mutate({
          commentData: { content: values.content },
          postId,
          slug,
          parentId,
        }),
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
      {errors.content && <ErrorInputMessage error={errors.content.message!} />}
      <div className="flex justify-end mt-4 gap-4">
        <button
          type="button"
          className="button-light-secondary"
          onClick={() => setReplyOpen(false)}
        >
          Cancel
        </button>
        <AddCommentButton />
      </div>
    </form>
  );
};

export default AddSubCommentForm;