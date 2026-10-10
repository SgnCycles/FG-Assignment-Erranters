import { createClient } from "./browserClient";
import { type QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (
  supabase: ReturnType<typeof createClient>,
  sortingOrder: boolean,
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, created_at, category, post_type, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
    )
    .order("created_at", { ascending: sortingOrder });
};

export const getMyPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sortingOrder: boolean,
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, created_at, category, post_type, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
    )
    .eq("author", userId)
    .order("created_at", { ascending: sortingOrder });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select(
      'id, slug, title, content, created_at, category, price, location, post_type, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
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

export const getUserProfile = async (id: string) => {
  const supabase = createClient();
  return await supabase
    .from("Profiles")
    .select("id, name, surname, username, bio, interests, profile_image")
    .eq("id", id)
    .single();
};

export const getUserPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  // sortingOrder: boolean,
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, created_at, category, post_type, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
    )
    .eq("author", userId)
    .order("created_at", { ascending: false });
};

export const getMemberProfile = async (username: string) => {
  const supabase = createClient();
  return await supabase
    .from("Profiles")
    .select("id, name, surname, username, bio, interests, profile_image")
    .eq("username", username)
    .single();
};

export const getPostComments = async (
  postId: string,
  sortingOrder: boolean,
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Comments")
    .select('id, content, created_at, parent_id, author("id", "username", "profile_image")')
    .eq("post_id", postId)
    .order("created_at", { ascending: sortingOrder });

  if (error) console.log("getPostComments error:", error);
  return data;
};

export type SearchResultType = QueryData<ReturnType<typeof searchPost>>;
export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>;
export type MyPostsType = QueryData<ReturnType<typeof getMyPosts>>;
export type PostType = QueryData<ReturnType<typeof getSinglePost>>;
export type UserProfileType = QueryData<ReturnType<typeof getUserProfile>>;
export type GetPostCommentsType = QueryData<ReturnType<typeof getPostComments>>;