"use client";
import { getUserFavourites } from "@/lib/supabase/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import { MyFavouritePostSectionPropsType } from "./types";
import ShortPost from "../ShortPost";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";

const MyFavouritePostsFeed = ({
  posts,
  userId,
}: MyFavouritePostSectionPropsType) => {
  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["my-favourite-posts", userId, sortingOrder],
    queryFn: async () => {
      const { data, error } = await getUserFavourites(
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
      queryKey: ["my-favourite-posts", userId],
    });
  };

  const filteredPosts =
    postCategory === "All"
      ? data
      : data?.filter((post) => post.Posts.category === postCategory);

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
            post={post.Posts}
            key={index}
            onFavouriteDeleteSuccess={onFavouriteDeleteSuccess}
            showUser={true}
          />
        ))}
    </div>
  );
};

export default MyFavouritePostsFeed;
