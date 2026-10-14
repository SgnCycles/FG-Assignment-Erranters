"use client";
import { getUserFavourites } from "@/lib/supabase/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import { MyFavouritePostSectionPropsType } from "./types";
import ShortPost from "../ShortPost";

const MyFavouritePostsFeed = ({
  posts,
  userId,
  postCategory,
}: MyFavouritePostSectionPropsType) => {
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
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {filteredPosts &&
        filteredPosts.length > 0 &&
        filteredPosts.map((post, index) => (
          <ShortPost
            key={index}
            {...post.Posts}
            username={post.Posts.author.username}
            userImage={post.Posts.author.profile_image}
            onFavouriteDeleteSuccess={onFavouriteDeleteSuccess}
          />
        ))}
    </div>
  );
};

export default MyFavouritePostsFeed;