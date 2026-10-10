"use client";
import { useState } from "react";
import PostPageSidebar from "@/components/posts/PostPageSidebar";
import MyPostsFeed from "@/components/posts/MyPostsFeed";
import { MyPostsSectionPropsType } from "./types";

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