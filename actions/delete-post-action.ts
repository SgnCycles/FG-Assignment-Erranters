"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

export const DeletePostAction = async (postId: string) => {
  const supabase = await createClient();
  await supabase.from("Posts").delete().eq("id", postId).throwOnError();
  revalidatePath("/feed");
  revalidatePath("/posts");
};