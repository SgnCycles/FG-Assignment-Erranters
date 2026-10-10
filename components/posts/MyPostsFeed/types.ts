import {  MyPostsType } from "@/lib/supabase/queries";

export type MyPostsFeedPropsType = {
  posts: MyPostsType;
  userId: string;
  postCategory?: string;
};