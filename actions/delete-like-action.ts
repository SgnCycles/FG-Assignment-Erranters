"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

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
  // .throwOnError();

  if (error) console.log(error);
};
