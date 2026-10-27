"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeletePostAction = async (postId: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase.from("Posts").delete().eq("id", postId);

  if (error) {
    console.error(error);
    return { error: "Failed to delete the post " };
  }

  revalidatePath("/feed");
  revalidatePath("/my-posts");
};

export default DeletePostAction;