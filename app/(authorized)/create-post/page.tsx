"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { postSchema } from "@/schemas/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { CreatePost } from "@/actions/create-post-action";
import { useRouter } from "next/navigation";
import * as z from "zod";

const CreatePostPage = () => {
  const router = useRouter();
  const postImageSchema = postSchema.omit({ images: true }).extend({
    image: z
      .unknown()
      .transform((value) => {
        return value as FileList;
      })
      .optional(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postImageSchema) });

  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      router.push(`/${data.slug}`);
    },
  });

  return (
    <main className="grow bg-mineral-green flex flex-col justify-between text-ecru-white font-semibold font-base tracking-widest">
      <h1 className="heading">Create a New Post</h1>
      <form
        className="flex flex-col my-auto"
        onSubmit={handleSubmit((values) => {
          const imageForm = new FormData();
          if (values.image) {
            imageForm.append("image", values.image[0]);
          }
          mutate({
            title: values.title,
            content: values.content,
            images: imageForm,
            category: values.category,
            post_type: values.post_type,
          });
        })}
      >
        <div className="flex gap-4 p-4">
          <select
            id="category"
            {...register("category")}
            className="select-button"
          >
            <option value="" disabled>
              Category
            </option>
            <option value="hiking">Hiking</option>
            <option value="cycling">Cycling</option>
            <option value="Marketplace">Marketplace</option>
          </select>
          <select {...register("post_type")} className="select-button">
            <option value="" disabled>
              Type
            </option>
            <option value="posts">Post</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="p-4">
            <label htmlFor="title">Add a title</label>
            <input {...register("title")} className="create-post-input p-4"></input>
            {errors.title && <ErrorMessage error={errors.title.message!} />}
          </div>
          <div className="p-4">
            <label htmlFor="content">Add content</label>
            <textarea
              {...register("content")}
              className="create-post-input min-h-[300px] p-4"
            ></textarea>
          </div>
          <div className="p-4 flex flex-col">
            <label htmlFor="image">Add an image (optional)</label>
            <input className="input text-outer-space cursor-pointer" type="file" {...register("image")} />
            {errors.image && <ErrorMessage error={errors.image.message!} />}
          </div>

          <div className="flex justify-end pr-4">
            <button className="button mb-4">
              {isPending ? "Publishing post..." : "Publish"}
            </button>
          </div>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </main>
  );
};

export default CreatePostPage;
