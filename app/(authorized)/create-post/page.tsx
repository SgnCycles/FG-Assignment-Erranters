"use client";
import { useMutation } from "@tanstack/react-query";
import { CreatePost } from "@/actions/create-post-action";
import { useRouter } from "next/navigation";
import CreatePostForm, { type FormValues } from "@/components/posts/CreatePostForm";

const CreatePostPage = () => {

  const router = useRouter();
  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
    onSuccess: (data) => {
      router.push(`/${data.slug}`);
    },
  });
  const handleCreatePost = (values: FormValues) => {
    const imageForm = new FormData();
    if (values.image) {
      imageForm.append("image", values.image[0]);
    }
    mutate({
      title: values.title,
      content: values.content,
      images: imageForm,
      category: values.category,
      post_type: values.post_type,
    });
  };

  return (
    <main className="grow bg-mineral-green flex flex-col justify-between text-ecru-white font-semibold font-base tracking-widest">
      <h1 className="heading">Create a New Post</h1>
      <CreatePostForm
        error={error}
        isPending={isPending}
        handleCreatePost={handleCreatePost}
      />
    </main>
  );
};

export default CreatePostPage;