"use client";
import { useUserContext } from "@/context/userContext";
import type { PostFormProps, userContextType } from "@/types/types";
import EditPostForm from "@/components/forms/EditPostForm";
import { redirect } from "next/navigation";

const EditPostContent = ({ post }: { post: PostFormProps }) => {
  
  const { user, userProfile } = useUserContext() as userContextType;
  if (!user || !userProfile) return null;

  if (user && post && user.id !== post.author.id) {
    redirect("/feed");
  }

  return (
    <>
      <EditPostForm post={post} />
    </>
  );
};

export default EditPostContent;