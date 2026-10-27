"use client";
import { postImageSchema } from "@/schemas/schemas";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type { CreatePostFormPropsType } from "./types";
import CancelButton from "@/components/buttons/CancelButton";
import CategoryButtons from "@/components/buttons/CategoryButtons";
import ErrorMessage from "@/components/ErrorMessage";
import FileDropZone from "@/components/FileDropZone";

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
  } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      content: "",
    },
  });

  const postCategory = watch("category");
  const postType = watch("post_type");

  useEffect(() => {
    if (postCategory === "Hiking" || postCategory === "Cycling") {
      setValue("post_type", "Post");
    } else if (postCategory === "Marketplace") {
      setValue("post_type", "Sell");
    } else if (postType === "Sell" || postType === "Buy") {
      setValue("category", "Marketplace");
    }
  }, [postCategory, postType, setValue]);

  return (
    <div className="form-background">
      <form className="form" onSubmit={handleSubmit(handleCreatePost)}>
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
            <CancelButton link="/feed" />
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
