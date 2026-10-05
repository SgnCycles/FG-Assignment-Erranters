"use client";
import { getMyPosts, MyPostsType } from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import MyPost from "../posts/MyPost";

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
      <div className="flex justify-end pr-6">
        <select
          className="text-ecru-white cursor-pointer font-bold hover:text-old-gold"
          value={sortingOrder ? "Oldest" : "Newest"}
          onChange={(e) => setSortingOrder(e.target.value === "Oldest")}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
      {filteredPosts.map((post, index) => (
        <MyPost key={index} {...post} username={post.author.username} />
      ))}
    </div>
  );
};

export default MyPostsFeed;