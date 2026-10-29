"use client";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import { createClient } from "@/lib/supabase/browserClient";
import { getForYouPosts } from "@/lib/supabase/queries";
import type { PostCategoryContextType } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ShortPost from "../ShortPost";
import SortingButton from "@/components/buttons/SortingButton";
import MobileSideMenu from "@/components/SideMenu";

const ForYouPostsFeed = ({ userId }: { userId: string }) => {

  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isError, isPending } = useQuery({
    queryKey: ["for-you-posts", userId, sortingOrder],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getForYouPosts(
        supabase,
        userId,
        sortingOrder,
      );
      if (error) throw error;
      return data;
    },
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
      <div className="flex flex-col justify-between">
        <MobileSideMenu />
        <SortingButton
          type="light"
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
        />
      </div>
      {isError && <p>Failed Loading Posts...</p>}
      {isPending && <p className="heading">Loading Posts...</p>}
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