"use client";
import { getMyPosts, getMyPostsCount } from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import SortingButton from "@/components/buttons/SortingButton";
import { MyPostsFeedPropsType } from "./types";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import { PostCategoryContextType } from "@/types/types";
import ShortPost from "../ShortPost";
import Pagination from "@/components/Pagination";

const MyPostsFeed = ({ posts, userId }: MyPostsFeedPropsType) => {

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
        await getMyPostsCount(supabase, userId);

      if (postAmount !== null) {
        setPostAmount(postAmount);
      }
    };
    fetchPostAmount();
  }, []);

  console.log("Post amount:", postAmount)

  const pageCount = Math.ceil(postAmount / postsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["my-posts", userId, sortingOrder, pageNumber],
    queryFn: async () => {
      const { data, error } = await getMyPosts(
        supabase,
        userId,
        sortingOrder,
        pagesVisited,
        postsPerPage,
      );
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
      {filteredPosts && filteredPosts.map((post, index) => (
        <ShortPost key={index} post={post} showUser={true} />
      ))}
      {filteredPosts && filteredPosts.length > 0 && (
        <Pagination pageCount={pageCount} changePage={changePage} currentPage={pageNumber}/>
      )}
    </div>
  );
};

export default MyPostsFeed;