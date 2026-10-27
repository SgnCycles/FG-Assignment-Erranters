"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const AddLikeAction = async ({ postId }: { postId: string }) => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase.from("PostLikes").insert({
    post_id: postId,
    user_id: user.id,
  });

  // TO DO: add toast for the add like error
  if (error) throw new Error(error.message)
};