import { HomePostsType } from "@/lib/supabase/queries";

export type HomePostsFeedPropsType = {
  posts: HomePostsType;
  postCategory: string;
};