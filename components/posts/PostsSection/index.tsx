"use client";
import { useState } from "react";
import HomePostsFeed from "@/components/posts/HomePostsFeed";
import PostPageSidebar from "@/components/posts/PostPageSidebar";
import { HomePostsType } from "@/lib/supabase/queries";

type PostsSectionPropsType = {
  posts: HomePostsType | null;
};

const PostsSection = ({ posts }: PostsSectionPropsType) => {
  const [postCategory, setPostCategory] = useState<string>("All");
  return (
    <>
      <PostPageSidebar setPostCategory={setPostCategory} postCategory={postCategory}/>
      {posts && <HomePostsFeed posts={posts} postCategory={postCategory} />}
    </>
  );
};

export default PostsSection;