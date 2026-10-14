import { UserFavouritesType } from "@/lib/supabase/queries";

export type MyFavouritePostSectionPropsType = {
  posts: UserFavouritesType | null;
  userId: string;
};