"use client";
import EditPost from "@/actions/edit-post-action";
import { postSchema } from "@/schemas/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { type Tables } from "@/lib/supabase/database.types"; // need to import the types, and explicitly say "types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const EditPageForm = ({
  initialValues,
  postId,
}: {
  initialValues: Pick<
    Tables<"Posts">,
    "title" | "content" | "images" | "category" | "post_type"
  >;
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
      images: initialValues.images || undefined,
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
          let imageForm = undefined;
          if (
            values.images &&
            typeof values.images !== "string" &&
            values.images.length > 0
          ) {
            imageForm = new FormData();
            imageForm.append("images", values.images[0]);
          }
          mutate({
            postdata: {
              title: values.title,
              content: values.content,
              images: imageForm,
              category: values.category,
              post_type: values.post_type,
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
        {initialValues.images && (
          <div>
            <img src={initialValues.images} alt={initialValues.title} />
          </div>
        )}
        <label htmlFor="image">Update the image</label>
        <input className="input" type="file" {...register("images")} />
        {errors.images && <ErrorMessage error={errors.images.message!} />}
        <button className="button-secondary">Update</button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};

export default EditPageForm;