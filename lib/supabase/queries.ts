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
      '*, author("id", "username", "profile_image"), PostImages("id", "image_url", "position"), Comments(*)',
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
      '*, author("id", "username", "profile_image"), PostImages("id", "image_url", "position"), Comments("id", "post_id")',
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
    .eq("author", userId);
};

export const getMemberPostsCount = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
) => {
  return await supabase
    .from("Posts")
    .select("*", { count: "exact", head: true })
    .eq("author", userId);
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("Posts")
    .select(
      '*, author("id", "username", "profile_image"), PostImages("id", "image_url", "position"), Comments("id", "post_id")',
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
    .textSearch("search_vector", searchTerm, {
      type: "websearch",
      config: "english",
    });
};

export const searchProfile = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase
    .from("Profiles")
    .select("username, name, surname, profile_image")
    .textSearch("search_vector", searchTerm, {
      type: "websearch",
      config: "english",
    });
};

export const getUserProfile = async (id: string) => {
  const supabase = createClient();
  return await supabase.from("Profiles").select("*").eq("id", id).maybeSingle();
};

// export const getUserPosts = async (
//   supabase: ReturnType<typeof createClient>,
//   userId: string,
//   // sortingOrder: boolean,
// ) => {
//   return await supabase
//     .from("Posts")
//     .select("*,  PostImages(*), author:Profiles(*), Comments(*)")
//     .eq("author", userId)
//     .order("created_at", { ascending: false });
// };

export const getUserPosts = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sortingOrder: boolean,
  pagesVisited: number,
  postsPerPage: number,
) => {
  return await supabase
    .from("Posts")
    .select("*,  PostImages(*), author:Profiles(*), Comments(*)")
    .eq("author", userId)
    .range(pagesVisited, pagesVisited + postsPerPage - 1)
    .order("created_at", { ascending: sortingOrder });
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
    .select('*, author("id", "username", "profile_image")')
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
      'post_id, Posts(*, author("id", "username", "profile_image"), PostImages("id", "image_url", "position"), Comments(*))',
    )
    .eq("user_id", userId)
    .range(pagesVisited, pagesVisited + postsPerPage - 1)
    .order("created_at", { ascending: sortingOrder, referencedTable: "Posts" });
};

export const getAllUserFavouritePostsCount = async (
  supabase: ReturnType<typeof createClient>,
  userId: string,
) => {
  return await supabase
    .from("Favourites")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
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
      `*,
      author(id, username, profile_image),
      PostImages(id, image_url, position),
      Comments(*)
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
      '*, author("id", "username", "profile_image"), PostImages("id", "image_url", "position"), Comments("id", "post_id")',
    )
    .order("created_at", { ascending: sortingOrder })
    .limit(10);
};

export const getPostSoldStatus = async (postId: string) => {
  const supabase = createClient();
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

export type SearchResultPostsType = NonNullable<
  Awaited<ReturnType<typeof searchPost>>["data"]
>;
export type SearchResultProfilesType = NonNullable<
  Awaited<ReturnType<typeof searchProfile>>["data"]
>;
export type PostType = QueryData<ReturnType<typeof getSinglePost>>;
export type UserProfileType = QueryData<ReturnType<typeof getUserProfile>>;
export type MemberProfileType = QueryData<ReturnType<typeof getMemberProfile>>;
export type PostCommentsType = NonNullable<
  Awaited<ReturnType<typeof getPostComments>>
>[number];
