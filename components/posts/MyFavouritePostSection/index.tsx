"use client";
import { useState } from "react";
import PostPageSidebar from "@/components/sidebar/PostPageSidebar";
import { MyFavouritePostSectionPropsType } from "./types";
import UserSidebar from "@/components/sidebar/UserSidebar";
import MyFavouritePostsFeed from "../MyFavouritePostSectionFeed";

const MyFavouritePostSection = ({
  posts,
  userId,
}: MyFavouritePostSectionPropsType) => {
  const [postCategory, setPostCategory] = useState<string>("All");
  return (
    <>
      <PostPageSidebar
        setPostCategory={setPostCategory}
        postCategory={postCategory}
      />
      {posts && (
        <MyFavouritePostsFeed
          posts={posts}
          postCategory={postCategory}
          userId={userId}
        />
      )}
      <UserSidebar />
    </>
  );
};

export default MyFavouritePostSection;
