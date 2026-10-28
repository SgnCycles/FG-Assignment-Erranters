"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { getMemberPostsCount, getUserPosts } from "@/lib/supabase/queries";
import Pagination from "@/components/Pagination";
import ShortPost from "../ShortPost";
import SortingButton from "@/components/buttons/SortingButton";

const MemberPosts = ({ userId }: { userId: string }) => {

  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const { data: postCountData } = useQuery({
    queryKey: ["member-posts-count"],
    queryFn: async () => {
      const supabase = createClient();
      const { count, error } = await getMemberPostsCount(supabase, userId);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const pageCount = Math.ceil((postCountData ?? 0) / postsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ["member-posts", userId, sortingOrder],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getUserPosts(
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

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <div className="flex flex-col w-[95%] lg:w-[80%]">
        <p className="text-old-gold ml-4 uppercase font-semibold">Activity</p>
        <h2 className="member-heading-secondary ml-4">Published Adventures:</h2>
        <SortingButton
          type="light"
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
        />
        <div>
          {isError && <p className="info-heading">Failed Loading Posts...</p>}
          {isPending && <p className="info-heading">Loading Posts...</p>}
          {data &&
            data.map((post, index) => (
              <ShortPost key={index} post={post} showUser={false} />
            ))}
          {data && data.length > 0 && (
            <Pagination
              pageCount={pageCount}
              changePage={changePage}
              currentPage={pageNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberPosts;