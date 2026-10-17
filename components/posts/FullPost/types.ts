import { PostType } from "@/lib/supabase/queries";

export type PostPropsType = {
  post: PostType;
  isAuthor: boolean;
  userId: string | null;
};