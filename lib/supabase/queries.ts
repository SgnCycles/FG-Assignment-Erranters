import { createClient } from "./browserClient";
import type { QueryData } from "@supabase/supabase-js";

export const getHomePosts = async (
  supabase: ReturnType<typeof createClient>,
  sortingOrder: boolean,
  pagesVisited: number,
  postsPerPage: number,
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, created_at, category, post_type, sold, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
    )
    .range(pagesVisited, pagesVisited + postsPerPage - 1)
    .order("created_at", { ascending: sortingOrder });
};

export const getAllPostsCount = async (
  supabase: ReturnType<typeof createClient>,
) => {
  return await supabase
    .from("Posts")
    .select("*", { count: "exact", head: true });
};

export const getMyPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sortingOrder: boolean,
  pagesVisited: number,
  postsPerPage: number,
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, created_at, category, post_type, sold, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
    )
    .eq("author", userId)
    .range(pagesVisited, pagesVisited + postsPerPage - 1)
    .order("created_at", { ascending: sortingOrder });
};

export const getMyPostsCount = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
) => {
  return await supabase
    .from("Posts")
    .select("*", { count: "exact", head: true })
    .eq("author", userId)
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select(
      'id, slug, title, content, created_at, category, price, location, sold, post_type, author("id", "username", "profile_image"), PostImages("id", "image_url", "position"), Comments("id", "post_id")',
    )
    .eq("slug", slug)
    .single();
};

export const getCommentNumber = async (postId: string) => {
  const supabase = createClient();
  return await supabase
    .from("Comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);
};

export const getPostLikesNumber = async (postId: string) => {
  const supabase = createClient();
  return await supabase
    .from("PostLikes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);
};

export const getUserLikeStatus = async (postId: string) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { data, error } = await supabase
    .from("PostLikes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  const postIsLiked = data !== null;
  return postIsLiked;
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
    .select(
      "id, name, surname, username, bio, interests, profile_image, headline, location, country, cover_image",
    )
    .eq("id", id)
    .maybeSingle();
};

export const getUserPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  // sortingOrder: boolean,
) => {
  return await supabase
    .from("Posts")
    .select("*,  PostImages(*), author:Profiles(*), Comments(*)")
    .eq("author", userId)
    .order("created_at", { ascending: false });
};

export const getMemberProfile = async (username: string) => {
  const supabase = createClient();
  return await supabase
    .from("Profiles")
    .select("*, Posts(*, PostImages(*))")
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
    .select(
      'id, content, created_at, parent_id, author("id", "username", "profile_image")',
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: sortingOrder });

  if (error) console.log("getPostComments error:", error);
  return data;
};

export const getUserFavouriteStatus = async (postId: string) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { data, error } = await supabase
    .from("Favourites")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  const postIsFavourite = data !== null;
  return postIsFavourite;
};

export const getUserFavourites = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sortingOrder: boolean,
  pagesVisited: number,
  postsPerPage: number,
) => {
  return await supabase
    .from("Favourites")
    .select(
      'post_id, Posts("id", "title", "slug", "created_at", "category", "sold", "post_type", author("id", "username", "profile_image"), PostImages("id", "image_url", "position"))',
    )
    .eq("user_id", userId)
    .range(pagesVisited, pagesVisited + postsPerPage - 1)
    .order("created_at", { ascending: sortingOrder, referencedTable: "Posts" });
};

export const getAllUserFavouritePostsCount = async (
  supabase: ReturnType<typeof createClient>,
  userId: string
) => {
  return await supabase
    .from("Favourites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
};

export const getUserPostNumber = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
) => {
  return await supabase
    .from("Posts")
    .select("*", { count: "exact", head: true })
    .eq("author", userId);
};

export const getUserFavouritesNumber = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
) => {
  return await supabase
    .from("Favourites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
};

export const getUserFollowStatus = async (memberId: string) => {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { data, error } = await supabase
    .from("Followers")
    .select("member_id")
    .eq("member_id", memberId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  const memberIsFollowed = data !== null;
  return memberIsFollowed;
};

export const getMemberFollowerNumber = async (
  supabase: ReturnType<typeof createClient>,
  memberId: string,
) => {
  return await supabase
    .from("Followers")
    .select("*", { count: "exact", head: true })
    .eq("member_id", memberId);
};

export const getUserFollowerNumber = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
) => {
  return await supabase
    .from("Followers")
    .select("*", { count: "exact", head: true })
    .eq("member_id", userId);
};

export const getForYouPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sortingOrder: boolean,
) => {
  const { data: following, error } = await supabase
    .from("Followers")
    .select("member_id")
    .eq("user_id", userId);

  if (error) throw error;

  const followingIds = following.map((item) => item.member_id);

  return supabase
    .from("Posts")
    .select(
      `
      id,
      title,
      slug,
      created_at,
      category,
      post_type,
      sold,
      author(id, username, profile_image),
      PostImages(id, image_url, position)
    `,
    )
    .in("author", followingIds)
    .order("created_at", { ascending: sortingOrder });
};

export const getLatestPosts = async (
  supabase: ReturnType<typeof createClient>,
  sortingOrder: boolean,
) => {
  return await supabase
    .from("Posts")
    .select(
      'id, title, slug, created_at, category, sold, post_type, author("id", "username", "profile_image"), PostImages("id", "image_url", "position")',
    )
    .order("created_at", { ascending: sortingOrder })
    .limit(10);
};

export const getPostSoldStatus = async (postId: string) => {
  const supabase =  createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { data, error } = await supabase
    .from("Posts")
    .select("sold")
    .eq("id", postId)
    .eq("author", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  const postIsSold = data?.sold === true;
  return postIsSold;
};

export type SearchResultType = QueryData<ReturnType<typeof searchPost>>;
export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>;
export type MyPostsType = QueryData<ReturnType<typeof getMyPosts>>;
export type ForYouPostsType = QueryData<ReturnType<typeof getForYouPosts>>;
export type PostType = QueryData<ReturnType<typeof getSinglePost>>;
export type UserProfileType = QueryData<ReturnType<typeof getUserProfile>>;
export type MemberProfileType = QueryData<ReturnType<typeof getMemberProfile>>;
export type PostCommentsType = NonNullable<
  Awaited<ReturnType<typeof getPostComments>>
>[number];
export type PostCommentsCountType = NonNullable<
  Awaited<ReturnType<typeof getCommentNumber>>
>;
export type GetUserLikeStatusType = QueryData<
  ReturnType<typeof getUserLikeStatus>
>;
export type GetPostLikesNumberType = QueryData<
  ReturnType<typeof getPostLikesNumber>
>;
export type UserFavouritesType = QueryData<
  ReturnType<typeof getUserFavourites>
>;