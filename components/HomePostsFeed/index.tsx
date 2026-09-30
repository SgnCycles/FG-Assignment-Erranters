"use client";
import { getHomePosts, HomePostsType } from "@/lib/supabase/queries";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";

const HomePostsFeed = ({ posts }: { posts: HomePostsType }) => {

  const supabase = createClient();
  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts(supabase);
      if (error) throw new Error();
      return data;
    },
    initialData: posts,
    staleTime: 1000,
  });

  return (
    <div className="">
      {data.map((post) => (
        <Link
          key={post.id}
          className="block border border-apple rounded-2xl p-4 m-4"
          href={`/${post.slug}`}
        >
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-right italic">posted by {post.author.username}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomePostsFeed;