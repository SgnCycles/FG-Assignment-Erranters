"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const DeleteFavouritePostAction = async ({ postId }: { postId: string }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase
    .from("Favourites")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message)
};