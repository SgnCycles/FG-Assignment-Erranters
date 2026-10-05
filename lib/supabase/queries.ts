import { createClient } from "./browserClient";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (
  supabase: ReturnType<typeof createClient>, sortingOrder: boolean
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, images, created_at, category, post_type, author("id", "username")',
    )
    .order("created_at", { ascending: sortingOrder });
};

export const getMyPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string, sortingOrder: boolean
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, images, created_at, category, post_type, author("id", "username")',
    )
    .eq("author", userId)
    .order("created_at", { ascending: sortingOrder });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select(
      'id, slug, title, images, content, created_at, category, post_type, author("id", "username")',
    )
    .eq("slug", slug)
    .single();
};

export const searchPost = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select("title, slug")
    .textSearch("title", searchTerm);
};

export const getUserProfile =  async (id: string) => {
  const supabase = createClient();
  return await supabase
    .from("Profiles")
    .select(
      'id, name, surname, username, bio, profile_image',
    )
    .eq("id", id)
    .single();
};

export type SearchResultType = QueryData<ReturnType<typeof searchPost>>;
export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>;
export type MyPostsType = QueryData<ReturnType<typeof getMyPosts>>;
export type PostType = QueryData<ReturnType<typeof getSinglePost>>;
export type UserProfileType = QueryData<ReturnType<typeof getUserProfile>>;