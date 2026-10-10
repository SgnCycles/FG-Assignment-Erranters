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

  return (
    <div>
      <form
        className="w-lg mx-auto"
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
        <label htmlFor="title">Add a title</label>
        <input className="input" {...register("title")}></input>
        {errors.title && <ErrorMessage error={errors.title.message!} />}
        <label htmlFor="content">Add content (optional)</label>
        <textarea className="input" {...register("content")}></textarea>
        {initialValues.PostImages?.length > 0 && (
          <div>
            {initialValues.PostImages.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt={initialValues.title}
              />
            ))}
          </div>
        )}
        <div className="p-4 flex flex-col">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileDropZone value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.image && <ErrorMessage error={errors.image.message!} />}
        </div>
        <button className="button-secondary">
          {isPending ? "Updating the post..." : "Update"}
        </button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default EditPostForm;