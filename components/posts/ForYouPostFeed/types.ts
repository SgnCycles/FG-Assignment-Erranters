import { ForYouPostsType } from "@/lib/supabase/queries";

export type ForYouPostsPropsType = {
  posts: ForYouPostsType | null;
  userId: string;
};
