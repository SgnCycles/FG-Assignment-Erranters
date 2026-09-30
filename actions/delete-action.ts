"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const DeletePost = async (postId: string) => {
  const supabase = await createClient();
  await supabase.from("Posts").delete().eq("id", postId).throwOnError();
  revalidatePath("/feed");
  redirect("/feed");
};