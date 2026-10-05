"use client";
import { useState } from "react";
import HomePostsFeed from "../HomePostsFeed";
import PostPageSidebar from "../PostPageSidebar";
import { HomePostsType } from "@/lib/supabase/queries";

type PostsSectionPropsType = {
  posts: HomePostsType | null;
};

const PostsSection = ({ posts }: PostsSectionPropsType) => {
  
  const [postCategory, setPostCategory] = useState<string>("All");
  return (
    <>
      <PostPageSidebar setPostCategory={setPostCategory} />
      {posts && <HomePostsFeed posts={posts} postCategory={postCategory} />}
    </>
  );
};

export default PostsSection;