"use client";
import { getLatestPosts, HomePostsType } from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import ShortPost from "@/components/posts/ShortPost";
import SortingButton from "@/components/buttons/SortingButton";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";

const LatestPostsFeed = ({ posts }: { posts: HomePostsType }) => {
  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["latest-posts", sortingOrder],
    queryFn: async () => {
      const { data, error } = await getLatestPosts(supabase, sortingOrder);
      if (error) throw new Error();
      return data;
    },
    initialData: posts,
  });

  const filteredPosts =
    postCategory === "All"
      ? data
      : data?.filter((post) => post.category === postCategory);

  return (
    <div className="grow">
      <SortingButton
        type="light"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {filteredPosts?.map((post, index) => (
        <ShortPost key={index} post={post} showUser={true}/>
      ))}
    </div>
  );
};

export default LatestPostsFeed;