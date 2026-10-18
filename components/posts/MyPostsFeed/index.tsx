"use client";
import { getMyPosts } from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import { MyPostsFeedPropsType } from "./types";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import { PostCategoryContextType } from "@/types/types";
import ShortPost from "../ShortPost";

const MyPostsFeed = ({ posts, userId }: MyPostsFeedPropsType) => {
  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
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
        type="light"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {filteredPosts.map((post, index) => (
        <ShortPost key={index} post={post} />
      ))}
    </div>
  );
};

export default MyPostsFeed;
