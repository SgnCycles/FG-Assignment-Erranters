import type { PostType } from "@/lib/supabase/queries";

export type ShortPostPropsType = {
  post: PostType;
  onFavouriteDeleteSuccess?: () => void; 
  showUser?: boolean;
};