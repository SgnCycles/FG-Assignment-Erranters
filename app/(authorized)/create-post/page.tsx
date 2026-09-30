"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { postSchema } from "@/schemas/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { CreatePost } from "@/actions/create-post-action";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postSchema) });

  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      router.push(`/${data.slug}`);
    },
  });

  return (
    <div className="grow">
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit((values) => mutate(values))}>
        <label htmlFor="title">Add a title</label>
        <input {...register("title")}></input>
        {errors.title && <ErrorMessage error={errors.title.message!} />}
        <label htmlFor="content">Add content</label>
        <textarea {...register("content")}></textarea>
        <button>{isPending ? "Publishing post..." : "Publish"}</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default CreatePostPage;