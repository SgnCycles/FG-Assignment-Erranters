import type { MyPostsType } from "@/lib/supabase/queries";

export type ShortPostPropsType = {
  post: MyPostsType[number];
  onFavouriteDeleteSuccess?: () => void; 
  showUser?: boolean;
};