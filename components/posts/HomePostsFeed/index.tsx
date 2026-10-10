"use client";
import { getHomePosts, HomePostsType } from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import ShortPost from "@/components/posts/ShortPost";
import SortingButton from "@/components/buttons/SortingButton";

type HomePostsFeedPropsType = {
  posts: HomePostsType;
  postCategory: string;
};

const HomePostsFeed = ({ posts, postCategory }: HomePostsFeedPropsType) => {
  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["home-posts", sortingOrder],
    queryFn: async () => {
      const { data, error } = await getHomePosts(supabase, sortingOrder);
      if (error) throw new Error();
      return data;
    },
    initialData: posts,
  });

  const filteredPosts =
    postCategory === "All"
      ? data
      : data?.filter((post) => post.category === postCategory);
  return (
    <div className="grow">
      <SortingButton
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {filteredPosts?.map((post, index) => (
        <ShortPost key={index} {...post} username={post.author.username} userImage={post.author.profile_image}/>
      ))}
    </div>
  );
};

export default HomePostsFeed;