"use client";
import { useState } from "react";
import HomePostsFeed from "@/components/posts/HomePostsFeed";
import PostPageSidebar from "@/components/posts/PostPageSidebar";
import { PostsSectionPropsType } from "./types";
import UserSidebar from "@/components/UserSidebar";

const PostsSection = ({ posts }: PostsSectionPropsType) => {
  const [postCategory, setPostCategory] = useState<string>("All");
  return (
    <>
      <PostPageSidebar setPostCategory={setPostCategory} postCategory={postCategory}/>
      {posts && <HomePostsFeed posts={posts} postCategory={postCategory} />}
      <UserSidebar />
    </>
  );
};

export default PostsSection;