import ErrorMessage from "@/components/ErrorMessage";
import { postSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const postImageSchema = postSchema.omit({ images: true }).extend({
  image: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .optional(),
});

export type FormValues = z.infer<typeof postImageSchema>;

type CreatePostFormProps = {
  handleCreatePost: (values: FormValues) => void;
  error: Error | null;
  isPending: boolean;
};

const CreatePostForm = ({
  handleCreatePost,
  error,
  isPending,
}: CreatePostFormProps) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postImageSchema) });

  const postCategory = watch("category");
  const postType = watch("post_type");

  useEffect(() => {
    if (postCategory === "Hiking" || postCategory === "Cycling") {
      setValue("post_type", "Post");
    } else if (postCategory === "Marketplace") {
      setValue("post_type", "Sell");
    }
  }, [postCategory, setValue]);

  return (
    <form
      className="flex flex-col my-auto"
      onSubmit={handleSubmit(handleCreatePost)}
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
          <option value="Hiking">Hiking</option>
          <option value="Cycling">Cycling</option>
          <option value="Marketplace">Marketplace</option>
        </select>
        <select {...register("post_type")} className="select-button">
          <option value="" disabled>
            Type
          </option>
          <option value="Post">Post</option>
          <option value="Sell">Sell</option>
          <option value="Buy">Buy</option>
        </select>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="p-4">
          <label htmlFor="title">Add a title:</label>
          <input
            {...register("title")}
            className="create-post-input p-4"
          ></input>
          {errors.title && <ErrorMessage error={errors.title.message!} />}
        </div>
        <div className="p-4">
          <label htmlFor="content">Add content:</label>
          <textarea
            {...register("content")}
            className="create-post-input min-h-75 p-4"
          ></textarea>
        </div>
        {postCategory === "Marketplace" &&
        (postType === "Sell" || postType === "Buy") ? (
          <div className="p-4">
            <label htmlFor="price">Add price:</label>
            <input
              className="input text-outer-space cursor-pointer"
              type="number"
              {...register("price")}
            />
          </div>
        ) : null}
        <div className="p-4">
          <label htmlFor="location">Add location:</label>
          <input
            {...register("location")}
            className="input text-outer-space cursor-pointer"
            type="text"
          ></input>
        </div>
        <div className="p-4 flex flex-col">
          <label htmlFor="image">Add an image (optional)</label>
          <input
            className="input text-outer-space cursor-pointer"
            type="file"
            multiple
            {...register("image")}
          />
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
  );
};

export default CreatePostForm;