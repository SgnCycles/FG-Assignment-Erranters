"use client";
import EditPost from "@/actions/edit-post-action";
import { postSchema } from "@/schemas/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { type Tables } from "@/lib/supabase/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
  // const postImageSchema = postSchema
  //   .omit({ images: true })
  //   .extend({ images: z.instanceof(FileList).optional() });
  const postImageSchema = postSchema.omit({ images: true }).extend({
    images: z
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
  } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      category: initialValues.category,
      post_type: initialValues.post_type,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: EditPost,
  });

  return (
    <div>
      <form
        className="w-lg mx-auto"
        onSubmit={handleSubmit((values) => {
          let imageForm: FormData | undefined = undefined;
          if (
            values.images &&
            typeof values.images !== "string" &&
            values.images.length > 0
          ) {
            imageForm = new FormData();
            Array.from(values.images).forEach((image) => {
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
        <label htmlFor="image">Update the image</label>
        <input className="input" type="file" multiple {...register("images")} />
        {errors.images && <ErrorMessage error={errors.images.message!} />}
        <button className="button-secondary">Update</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default EditPostForm;