"use client";
import { getMyPosts, MyPostsType } from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import MyPost from "@/components/posts/MyPost";
import SortingButton from "@/components/buttons/SortingButton";

type MyPostsFeedProps = {
  posts: MyPostsType;
  userId: string;
  postCategory: string;
};

const MyPostsFeed = ({ posts, userId, postCategory }: MyPostsFeedProps) => {
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["my-posts", userId, sortingOrder],
    queryFn: async () => {
      const { data, error } = await getMyPosts(supabase, userId, sortingOrder);
      if (error) throw new Error();
      return data;
    },
    initialData: posts,
  });

  const filteredPosts =
    postCategory === "All"
      ? data
      : data.filter((post) => post.category === postCategory);

  return (
    <div className="grow">
      <SortingButton
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {filteredPosts.map((post, index) => (
        <MyPost key={index} {...post} username={post.author.username} />
      ))}
    </div>
  );
};

export default MyPostsFeed;