"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeleteCommentAction = async (commentId: string) => {
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");
  const { error } = await supabase
    .from("Comments")
    .delete()
    .eq("id", commentId)
    .single();

  if (error) {
    console.error(error);
    return { error: "Failed to delete the comment" };
  }

  revalidatePath("/");
};

export default DeleteCommentAction;