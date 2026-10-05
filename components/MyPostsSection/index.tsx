"use client";
import { useState } from "react";
import PostPageSidebar from "../PostPageSidebar";
import { HomePostsType } from "@/lib/supabase/queries";
import MyPostsFeed from "../MyPostsFeed";

type MyPostsSectionPropsType = {
  posts: HomePostsType | null;
  userId: string;
}

const MyPostsSection = ({ posts, userId }: MyPostsSectionPropsType) => {
  
  const [postCategory, setPostCategory] = useState<string>("All");

  return (
    <>
      <PostPageSidebar setPostCategory={setPostCategory}/>
      {posts && <MyPostsFeed posts={posts} userId={userId} postCategory={postCategory}/>}
    </>
  );
};

export default MyPostsSection;