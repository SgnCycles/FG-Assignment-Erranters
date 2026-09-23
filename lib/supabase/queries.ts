import { createClient } from "./browserClient";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (
  supabase: ReturnType<typeof createClient>,
) => {
  return await supabase
    .from("Posts")
    .select('id, title, slug, author("id, "username)')
    .order("created_at", { ascending: false });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select('slug, title, content, author("id", "username")')
    .eq("slug", slug)
    .single();
};

export const searchPost = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase.from("Posts").select("title, slug").textSearch("title", searchTerm);
};

export type SearchResultType = QueryData<ReturnType<typeof searchPost>>;
export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>;
export type PostType = QueryData<ReturnType<typeof getSinglePost>>;