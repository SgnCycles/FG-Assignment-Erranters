"use client";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import { useUserContext } from "@/context/userContext";
import {
  getAllUserFavouritePostsCount,
  getUserFavourites,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/browserClient";
import type { PostCategoryContextType, userContextType } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import SortingButton from "@/components/buttons/SortingButton";
import ShortPost from "../ShortPost";
import MobileSideMenu from "@/components/SideMenu";

const MyFavouritePostsFeed = () => {
  
  const { user, isLoading } = useUserContext() as userContextType;
  const userId = user?.id;
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
        userId!,
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
        userId!,
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
      queryKey: ["my-favourite-posts", userId!],
    });
  };

  const filteredPosts =
    postCategory === "All"
      ? data
      : data?.filter((post) => post.Posts.category === postCategory);

  if (isLoading) return <p className="info-heading">Loading...</p>;
  if (!user) return <p className="info-heading">Unauthorized Access!</p>;

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

      {isError && <p className="heading">Failed Loading Posts...</p>}
      {isPending && <p className="heading">Loading Posts...</p>}
      {filteredPosts?.length === 0 && (
        <h2 className="info-heading">No Favourite posts yet...</h2>
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