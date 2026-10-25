"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const MarkPostSoldAction = async ({ postId, sold }: { postId: string, sold: boolean }) => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase.from("Posts").update({sold}).eq("id", postId).eq("author", user.id);
  
  if (error) throw new Error(error.message)
};