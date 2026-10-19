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
import TextareaAutosize from "react-textarea-autosize";

const EditPostForm = ({
  initialValues,
  postId,
}: {
  initialValues: Pick<
    Tables<"Posts">,
    "title" | "content" | "category" | "post_type" | "price" | "location"
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
      price: initialValues.price || undefined,
      location: initialValues.location || undefined,
    },
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: EditPost,
  });

  const { mutate: deletePostImage, error: deletePostImageError } = useMutation({
    mutationFn: DeletePostImagesAction,
  });
  console.log("Location from database:", initialValues.location);

  return (
    <div className="form-background">
      <form
        className="form"
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
              location: values.location,
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
                  onClick={() =>
                    deletePostImage({
                      image: image.image_url!,
                      postId: image.id,
                    })
                  }
                >
                  <FaXmark className="w-full h-full fill-ecru-white hover:fill-red-400 hover:bg-ecru-white cursor-pointer" />
                </button>
              </li>
            ))}
        </ul>
        <div className="label-input">
          <label htmlFor="content" className="label">
            Add content (optional)
          </label>
          <TextareaAutosize className="input" {...register("content")} />
        </div>
        {/* add price and location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="label-input">
            <label htmlFor="price" className="label">
              Add price:
            </label>
            <input
              className="input text-outer-space cursor-pointer"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
          </div>
          <div className="label-input">
            <label htmlFor="location" className="label">
              Add location:
            </label>
            <input
              {...register("location")}
              className="input text-outer-space cursor-pointer"
              type="text"
            ></input>
          </div>
        </div>
        <div className="w-full flex justify-between mt-10">
          <div className="grid place-items-center">
            {/* TO DO: replace the button with proper delete */}
            <button className="cursor-pointer flex ml-2 justify-center items-end text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash preview-icon stroke-red-700 hover:stroke-outer-space/50"
              >
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>{" "}
              Delete Post
            </button>
          </div>
          <div className="form-button-layout">
            <button className="button-light-primary">Cancel</button>
            <button className="button-dark-secondary">
              {isPending ? "Updating the post..." : "Save"}
            </button>
          </div>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;