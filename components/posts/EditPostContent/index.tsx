"use client";
import { useUserContext } from "@/context/userContext";
import type { PostFormProps, userContextType } from "@/types/types";
import EditPostForm from "@/components/forms/EditPostForm";
import { redirect } from "next/navigation";

const EditPostContent = ({ post }: { post: PostFormProps }) => {

  const { user, userProfile, isLoading } = useUserContext() as userContextType;
  if (isLoading) return <p className="info-heading">Loading...</p>;
  if (!user) return <p className="info-heading">Unauthorized Access!</p>;
  if (!userProfile) return <p className="info-heading">Loading Profile...</p>;

  if (user && post && user.id !== post.author.id) {
    redirect("/feed");
  }

  return <EditPostForm post={post} />;
};

export default EditPostContent;