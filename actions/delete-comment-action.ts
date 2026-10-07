"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeleteCommentAction = async (commentId: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("Comments")
    .delete()
    .eq("id", commentId)
    .single();
  if (error) console.log("Error", error);
  revalidatePath("/");
};

export default DeleteCommentAction;