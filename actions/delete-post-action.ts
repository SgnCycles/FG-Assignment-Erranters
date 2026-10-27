"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

export const DeletePostAction = async (postId: string) => {
  const supabase = await createClient();
  // await supabase.from("Posts").delete().eq("id", postId).throwOnError();

  const { error } = await supabase
    .from("Posts")
    .delete()
    .eq("id", postId)
    .throwOnError();

  // TO DO: add toast if there is an error with deleting the post
  if (error) throw new Error(error);

  revalidatePath("/feed");
  revalidatePath("/my-posts");
};
