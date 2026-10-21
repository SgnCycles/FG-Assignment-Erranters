"use client";
import {
  getAllUserFavouritePostsCount,
  getUserFavourites,
} from "@/lib/supabase/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import ShortPost from "../ShortPost";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";
import Pagination from "@/components/Pagination";

const MyFavouritePostsFeed = ({ userId }: { userId: string }) => {

  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const { data: postCountData } = useQuery({
    queryKey: ["my-favourite-posts-count"],
    queryFn: async () => {
      const supabase = createClient();
      const { count, error } = await getAllUserFavouritePostsCount(
        supabase,
        userId,
      );
      if (error) throw error;
      return count ?? 0;
    },
  });

  const pageCount = Math.ceil((postCountData ?? 0) / postsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const queryClient = useQueryClient();
  const { data, isError, isPending } = useQuery({
    queryKey: ["my-favourite-posts", userId, sortingOrder, pageNumber],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getUserFavourites(
        supabase,
        userId,
        sortingOrder,
        pagesVisited,
        postsPerPage,
      );
      if (error) throw error;
      return data;
    },
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
      {isError && <p className="heading">Failed Loading Posts...</p>}
      {isPending && <p className="heading">Loading Posts...</p>}
      {filteredPosts?.length === 0 && (
        <p className="heading">No Favourite posts yet...</p>
      )}
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
      {filteredPosts && filteredPosts.length > 0 && (
        <Pagination
          pageCount={pageCount}
          changePage={changePage}
          currentPage={pageNumber}
        />
      )}
    </div>
  );
};

export default MyFavouritePostsFeed;