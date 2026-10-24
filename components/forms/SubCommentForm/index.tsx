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

const AddSubCommentForm = ({ postId, slug, parentId }: { postId: string; slug: string, parentId: string }) => {
  
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
      className="comment-form"
      onSubmit={handleSubmit((values) =>
        mutate({ commentData: { content: values.content }, postId, slug, parentId }),
      )}
    >
      <label htmlFor="content" className="comment-form-heading-h2">
        Add subcomment:
      </label>
      <textarea
        {...register("content")}
        placeholder="Comment..."
        className="input"
      ></textarea>
      {errors.content && <ErrorMessage error={errors.content.message!} />}
      <div className="flex justify-end mt-4">
        <AddCommentButton />
      </div>
      {error && <ErrorMessage error={error.message} />}
    </form>
  );
};

export default AddSubCommentForm;