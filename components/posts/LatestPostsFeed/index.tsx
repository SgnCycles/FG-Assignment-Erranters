"use client";
import { getLatestPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/browserClient";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ShortPost from "@/components/posts/ShortPost";
import SortingButton from "@/components/buttons/SortingButton";
import MobileSideMenu from "@/components/SideMenu";

const LatestPostsFeed = () => {

  const { postCategory } = usePostCategoryContext() as PostCategoryContextType;
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);

  const { data, isError, isPending } = useQuery({
    queryKey: ["latest-posts", sortingOrder],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getLatestPosts(supabase, sortingOrder);
      if (error) throw new Error();
      return data;
    },
  });

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
      {filteredPosts?.map((post, index) => (
        <ShortPost key={index} post={post} showUser={true} />
      ))}
    </div>
  );
};

export default LatestPostsFeed;