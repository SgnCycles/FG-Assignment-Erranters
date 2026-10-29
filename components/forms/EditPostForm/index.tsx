"use client";
import EditPost from "@/actions/edit-post-action";
import DeletePostImagesAction from "@/actions/delete-post-images-action";
import DeletePostAction from "@/actions/delete-post-action";
import { postImageSchema } from "@/schemas/schemas";
import { useForm, Controller } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CancelButton from "@/components/buttons/CancelButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import FileDropZone from "@/components/FileDropZone";
import ErrorInputMessage from "@/components/errors/ErrorInputMessage";
import { FaXmark } from "react-icons/fa6";
import type { PostFormProps } from "@/types/types";
import { toast } from "react-toastify";
// import { useState } from "react";

const EditPostForm = ({ post }: { post: PostFormProps }) => {
  const postId = post.id;
  const initialValues: PostFormProps = {
    id: post.id,
    author: post.author,
    title: post.title,
    content: post.content,
    price: post.price,
    PostImages: post.PostImages,
    category: post.category,
    post_type: post.post_type,
    location: post.location,
    slug: post.slug,
  };

  // const [postImagePreview, setPostImagePreview] = useState(initialValues.PostImages);
  const router = useRouter();
  const onDeleteSuccess = () => {
    router.push("/feed");
  };

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
      slug: initialValues.slug,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: EditPost,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Post Updated");
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  const { mutate: deletePostImage } = useMutation({
    mutationFn: DeletePostImagesAction,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Post Image Deleted");
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

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
              slug: values.slug,
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
          {errors.title && <ErrorInputMessage error={errors.title.message!} />}
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
          {errors.image && <ErrorInputMessage error={errors.image.message!} />}
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
        <div className="grid grid-cols-2 gap-4">
          {initialValues.post_type === "Marketplace" && (
            <div className="label-input">
              <label htmlFor="price" className="label">
                Add price:
              </label>
              <input
                className="input text-outer-space cursor-pointer"
                type="number"
                {...register("price", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
              />
            </div>
          )}
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
        <div className="w-full flex justify-between flex-wrap mt-5 lg:mt-10">
          <div className="flex justify-center items-end lg:mb-2 group">
            <DeleteButton
              id={postId}
              type={"icon"}
              onDeleteSuccess={onDeleteSuccess}
              deleteFunction={DeletePostAction}
            />
          </div>
          <div className="form-button-layout">
            <CancelButton link={`/post/${initialValues.slug}`} />
            <button className="button-dark-secondary">
              {isPending ? "Updating the post..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;