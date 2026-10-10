import ErrorMessage from "@/components/ErrorMessage";
import FileDropZone from "@/components/FileDropZone";
import type { ImageFile } from "@/components/FileDropZone/types";
import { postSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

const postImageSchema = postSchema.omit({ images: true }).extend({
  image: z.array(z.custom<ImageFile>()).optional(),
});

export type FormValues = z.infer<typeof postImageSchema>;

type CreatePostFormPropsType = {
  handleCreatePost: (values: FormValues) => void;
  error: Error | null;
  isPending: boolean;
};

const CreatePostForm = ({
  handleCreatePost,
  error,
  isPending,
}: CreatePostFormPropsType) => {
  const {
    register,
    control,
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
      <div className="flex gap-4 p-4 text-outer-space">
        <div className="relative group">
          <select
            id="category"
            {...register("category")}
            className="select-button-category"
          >
            <option value="" disabled>
              Category
            </option>
            <option value="Hiking">Hiking</option>
            <option value="Cycling">Cycling</option>
            <option value="Marketplace">Marketplace</option>
          </select>
          <span className="category-dropdown">
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
              className="lucide lucide-arrow-down preview-icon transition-transform group-hover:rotate-90 group-hover:text-ecru-white"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </span>
        </div>
        <div className="relative group">
          <select {...register("post_type")} className="select-button-type">
            <option value="" disabled>
              Type
            </option>
            <option value="Post">Post</option>
            <option value="Sell">Sell</option>
            <option value="Buy">Buy</option>
          </select>
          <span className="category-dropdown">
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
              className="lucide lucide-arrow-down preview-icon transition-transform group-hover:rotate-90 group-hover:stroke-ecru-white"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
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
            className="create-post-input min-h-35 p-4"
          ></textarea>
        </div>
        <div className="flex">
          {postCategory === "Marketplace" &&
          (postType === "Sell" || postType === "Buy") ? (
            <div className="p-4">
              <label htmlFor="price">Add price:</label>
              <input
                className="input text-outer-space cursor-pointer ml-4"
                type="number"
                {...register("price")}
              />
            </div>
          ) : null}
          <div className="p-4">
            <label htmlFor="location">Add location:</label>
            <input
              {...register("location")}
              className="input text-outer-space cursor-pointer ml-4"
              type="text"
            ></input>
          </div>
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
