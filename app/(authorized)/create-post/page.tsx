"use client";
import { useMutation } from "@tanstack/react-query";
import { CreatePost } from "@/actions/create-post-action";
import { useRouter } from "next/navigation";
import CreatePostForm from "@/components/forms/CreatePostForm";
import type { FormValues } from "@/types/types";

const CreatePostPage = () => {
  
  const router = useRouter();
  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      router.push(`/post/${data.slug}`);
    },
  });
  const handleCreatePost = (values: FormValues) => {
    const imageForm = new FormData();
    if (values.image) {
      Array.from(values.image).forEach((image) => {
        imageForm.append("image", image);
      });
    }
    mutate({
      title: values.title,
      content: values.content,
      images: imageForm,
      category: values.category,
      post_type: values.post_type,
      price: values.price,
      location: values.location,
    });
  };

  return (
    <main className="create-post-layout">
      <div className="create-edit-post-layout">
        <div className="mb-10">
          <p className="subtitle">Create a Post</p>
          <h1 className="heading">Share your Adventure</h1>
          <p className="">or find a new home to your item</p>
        </div>
        <CreatePostForm
          error={error}
          isPending={isPending}
          handleCreatePost={handleCreatePost}
        />
      </div>
    </main>
  );
};

export default CreatePostPage;