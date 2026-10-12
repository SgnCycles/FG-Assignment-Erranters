"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const AddLikeAction = async ({ postId }: { postId: string }) => {
  const supabase = await createClient();

  //getting logged in user id and checking and using it to insert the like
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase.from("PostLikes").insert({
    post_id: postId,
    user_id: user.id,
  });

  if (error) console.log(error);
};
