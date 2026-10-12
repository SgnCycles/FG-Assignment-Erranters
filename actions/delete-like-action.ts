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

  if (error) console.log(error);
};