"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const DeleteLikeAction = async ({ postId }: { postId: string }) => {
  
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase
    .from("PostLikes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", user.id);

  // TO DO: add toast if there is an error with removing the like from a post
  if (error) throw new Error(error.message)
};