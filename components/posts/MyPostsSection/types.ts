import { HomePostsType } from "@/lib/supabase/queries";

export type MyPostsSectionPropsType = {
  posts: HomePostsType | null;
  userId: string;
};