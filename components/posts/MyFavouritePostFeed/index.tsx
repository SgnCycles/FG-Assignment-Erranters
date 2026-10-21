"use client";
import {
  getAllUserFavouritePostsCount,
  getUserFavourites,
} from "@/lib/supabase/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import { MyFavouritePostSectionPropsType } from "./types";
import ShortPost from "../ShortPost";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";
import Pagination from "@/components/Pagination";

const MyFavouritePostsFeed = ({
  posts,
  userId,
}: MyFavouritePostSectionPropsType) => {
  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const [postAmount, setPostAmount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  useEffect(() => {
    const supabase = createClient();
    const fetchPostAmount = async () => {
      const { count: postAmount } =
        await getAllUserFavouritePostsCount(supabase);

      if (postAmount !== null) {
        setPostAmount(postAmount);
      }
    };
    fetchPostAmount();
  }, []);

  const pageCount = Math.ceil(postAmount / postsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const supabase = createClient();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["my-favourite-posts", userId, sortingOrder, pageNumber],
    queryFn: async () => {
      const { data, error } = await getUserFavourites(
        supabase,
        userId,
        sortingOrder,
        pagesVisited,
        postsPerPage,
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
      {filteredPosts && filteredPosts.length > 10 && (
        <Pagination pageCount={pageCount} changePage={changePage} currentPage={pageNumber}/>
      )}
    </div>
  );
};

export default MyFavouritePostsFeed;