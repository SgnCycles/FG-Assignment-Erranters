import { HomePostsType } from "@/lib/supabase/queries";

export type PostsSectionPropsType = {
  posts: HomePostsType | null;
};