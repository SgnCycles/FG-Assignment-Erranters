"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeletePostImagesAction = async ({image, postId}: {image: string; postId: string}) => {
  
  const supabase = await createClient();
  const { error: storageError } = await supabase.storage
    .from("Post-Images")
    .remove([image]);

  if (storageError) throw new Error("Failed to remove the post image");

  const { error: postError } = await supabase
    .from("PostImages")
    .delete()
    .eq("id", postId);

  if (postError) throw new Error(postError.message);

  revalidatePath("/");
};

export default DeletePostImagesAction;