"use client";
import { useState } from "react";
import PostPageSidebar from "@/components/posts/PostPageSidebar";
import { HomePostsType } from "@/lib/supabase/queries";
import MyPostsFeed from "@/components/posts/MyPostsFeed";

type MyPostsSectionPropsType = {
  posts: HomePostsType | null;
  userId: string;
};

const MyPostsSection = ({ posts, userId }: MyPostsSectionPropsType) => {
  
  const [postCategory, setPostCategory] = useState<string>("All");

  return (
    <>
      <PostPageSidebar
        setPostCategory={setPostCategory}
        postCategory={postCategory}
      />
      {posts && (
        <MyPostsFeed
          posts={posts}
          userId={userId}
          postCategory={postCategory}
        />
      )}
    </>
  );
};

export default MyPostsSection;