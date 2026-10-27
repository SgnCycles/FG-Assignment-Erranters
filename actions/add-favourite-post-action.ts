"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const AddFavouritePostAction = async ({ postId }: { postId: string }) => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");
  
  const { error } = await supabase.from("Favourites").insert({
    post_id: postId,
    user_id: user.id,
  });

// TO DO: add toast for the add favourite post error
  if (error) throw new Error(error.message)
};