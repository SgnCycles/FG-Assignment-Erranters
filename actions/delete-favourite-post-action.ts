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

  // TO DO: add toast if there is an error with deleting the favourite post
  if (error) throw new Error(error.message)
};