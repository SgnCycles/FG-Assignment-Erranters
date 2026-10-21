"use client";
import { getForYouPosts } from "@/lib/supabase/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import ShortPost from "../ShortPost";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";
import { ForYouPostsPropsType } from "./types";

const ForYouPostsFeed = ({
  posts,
  userId,
}: ForYouPostsPropsType) => {
  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["for-you-posts", userId, sortingOrder],
    queryFn: async () => {
      const { data, error } = await getForYouPosts(
        supabase,
        userId,
        sortingOrder,
      );
      if (error) throw new Error(error.message);
      return data;
    },
    initialData: posts,
  });

  const onFavouriteDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["for-you-posts", userId],
    });
  };

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
      {filteredPosts &&
        filteredPosts.length > 0 &&
        filteredPosts.map((post, index) => (
          <ShortPost
            post={post}
            key={index}
            onFavouriteDeleteSuccess={onFavouriteDeleteSuccess}
            showUser={true}
          />
        ))}
    </div>
  );
};

export default ForYouPostsFeed;
