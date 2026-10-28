"use client";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import { createClient } from "@/lib/supabase/browserClient";
import { getAllPostsCount, getHomePosts } from "@/lib/supabase/queries";
import type { PostCategoryContextType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import ShortPost from "@/components/posts/ShortPost";
import SortingButton from "@/components/buttons/SortingButton";

const HomePostsFeed = () => {

  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const {
    data: postCountData,
  } = useQuery({
    queryKey: ["home-posts-count"],
    queryFn: async () => {
      const supabase = createClient();
      const { count, error } = await getAllPostsCount(supabase);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const pageCount = Math.ceil((postCountData ?? 0) / postsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ["home-posts", sortingOrder, pageNumber],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getHomePosts(
        supabase,
        sortingOrder,
        pagesVisited,
        postsPerPage,
      );
      if (error) throw error;
      return data;
    },
  });

  const filteredPosts =
    postCategory === "All"
      ? data
      : data?.filter((post) => post.category === postCategory);

  return (
    <div className="grow w-full">
      <SortingButton
        type="light"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {isError && <p className="info-heading">Failed Loading Posts...</p>}
      {isPending && <p className="info-heading">Loading Posts...</p>}
      {filteredPosts?.length === 0 && <p className="info-heading">No posts yet...</p>}
      {filteredPosts &&
        filteredPosts.map((post, index) => (
          <ShortPost key={index} post={post} showUser={true} />
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

export default HomePostsFeed;