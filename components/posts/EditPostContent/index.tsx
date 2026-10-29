"use client";
import { useUserContext } from "@/context/userContext";
import type { PostFormProps, userContextType } from "@/types/types";
import EditPostForm from "@/components/forms/EditPostForm";
import { redirect } from "next/navigation";

const EditPostContent = ({ post }: { post: PostFormProps }) => {

  const { user, userProfile, isLoading } = useUserContext() as userContextType;
  if (isLoading) return <div className="info-heading">Loading...</div>;
  if (!user) return <div className="info-heading">Unauthorized Access!</div>;
  if (!userProfile) return <div className="info-heading">Loading Profile...</div>;

  if (user && post && user.id !== post.author.id) {
    redirect("/feed");
  }

  return <EditPostForm post={post} />;
};

export default EditPostContent;