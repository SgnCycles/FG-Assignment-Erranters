import ErrorMessage from "@/components/ErrorMessage";
import FileDropZone from "@/components/FileDropZone";
import type { ImageFile } from "@/components/FileDropZone/types";
import { postSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import TextareaAutosize from "react-textarea-autosize";
import CategoryButtons from "@/components/buttons/CategoryButtons";
import TextEditor from "@/components/TextEditor";

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
    <div className="form-background">
      <form
        className="form"
        onSubmit={handleSubmit(handleCreatePost)}
      >
        <CategoryButtons register={register} />
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
          <div className="flex flex-col">
            <label htmlFor="title" className="label">
              Add a title:
            </label>
            <input {...register("title")} className="input"></input>
            {errors.title && <ErrorMessage error={errors.title.message!} />}
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="label">
              Add content:
            </label>
            <TextareaAutosize {...register("content")} className="input" />
          </div>
          {/* Testing */}
          <TextEditor />
          {/* Testing */}
          <div className="grid grid-cols-2 gap-4">
            {postCategory === "Marketplace" &&
            (postType === "Sell" || postType === "Buy") ? (
              <div className="flex flex-col">
                <label htmlFor="price" className="label">
                  Add price:
                </label>
                <input
                  className="input"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
            ) : null}
            <div className="flex flex-col">
              <label htmlFor="location" className="label">
                Add location:
              </label>
              <input
                {...register("location")}
                className="input"
                type="text"
              ></input>
            </div>
          </div>
          <div className="form-button-layout">
            <button className="button-light-primary">Cancel</button>
            <button className="button-dark-secondary">
              {isPending ? "Publishing post..." : "Publish"}
            </button>
          </div>
          {error && <ErrorMessage error={error.message} />}
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;