"use client";
import EditPost from "@/actions/edit-post-action";
import { postSchema } from "@/schemas/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { type Tables } from "@/lib/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import FileDropZone from "@/components/FileDropZone";
import type { ImageFile } from "@/components/FileDropZone/types";
import * as z from "zod";
import { FaXmark } from "react-icons/fa6";
import DeletePostImagesAction from "@/actions/delete-post-images-action";
// import { useState } from "react";

const EditPostForm = ({
  initialValues,
  postId,
}: {
  initialValues: Pick<
    Tables<"Posts">,
    "title" | "content" | "category" | "post_type" | "price"
  > & {
    PostImages: Pick<Tables<"PostImages">, "id" | "image_url" | "position">[];
  };
  postId: string;
}) => {

    // const [postImagePreview, setPostImagePreview] = useState(initialValues.PostImages);

  const postImageSchema = postSchema.omit({ images: true }).extend({
    image: z.array(z.custom<ImageFile>()).optional(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      category: initialValues.category,
      post_type: initialValues.post_type,
    },
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: EditPost,
  });

  const { mutate: deletePostImage, error: deletePostImageError } = useMutation({
    mutationFn: DeletePostImagesAction,
  });

  return (
    <div className="flex flex-col items-center bg-mineral-green font-cantarell">
      <form
        className="bg-casual-white text-outer-space rounded-4xl p-10 w-full"
        onSubmit={handleSubmit((values) => {
          let imageForm: FormData | undefined = undefined;

          if (values.image && values.image.length > 0) {
            imageForm = new FormData();

            values.image.forEach((image) => {
              imageForm?.append("image", image);
            });
          }
          mutate({
            postdata: {
              title: values.title,
              content: values.content,
              images: imageForm,
              category: values.category,
              post_type: values.post_type,
              price: values.price,
            },
            postId,
          });
        })}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="label">
            Add a title
          </label>
          <input className="input" {...register("title")}></input>
          {errors.title && <ErrorMessage error={errors.title.message!} />}
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Add content (optional)</label>
          <textarea className="input" {...register("content")}></textarea>
        </div>
        <div className="flex flex-col">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileDropZone value={field.value} onChange={field.onChange} />
              // <FileDropZone value={field.value} onChange={field.onChange} initialImages={initialValues.PostImages}/>
            )}
          />
          {errors.image && <ErrorMessage error={errors.image.message!} />}
        </div>
        <ul className="flex flex-wrap gap-2">
          {initialValues.PostImages &&
            initialValues.PostImages.map((image, index) => (
              <li className="flex h-30 w-30 relative rounded-md" key={index}>
                <div className="h-full w-full">
                  <img
                    className="h-full w-full object-cover rounded-md"
                    key={image.id}
                    src={image.image_url}
                    alt={initialValues.title}
                  />
                </div>
                <button
                  type="button"
                  className="w-5 h-5 bg-red-400 absolute right-0"
                  onClick={() => deletePostImage({
                    image: image.image_url!,
                    postId: image.id,
                  })}
                >
                  <FaXmark className="w-full h-full fill-ecru-white hover:fill-red-400 hover:bg-ecru-white cursor-pointer" />
                </button>
              </li>
            ))}
        </ul>
        <div className="w-full flex justify-end">
          <button className="button">
            {isPending ? "Updating the post..." : "Update"}
          </button>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;