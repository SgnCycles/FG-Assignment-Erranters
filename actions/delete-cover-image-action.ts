"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeleteCoverImageAction = async ({image, userId}: {image: string; userId: string}) => {
  
  const supabase = await createClient();
  const { error: storageError } = await supabase.storage
    .from("Cover-Images")
    .remove([image]);

  if (storageError) throw new Error("Failed to remove the cover image");

  const { error: profileError } = await supabase
    .from("Profiles")
    .update({ cover_image: null })
    .eq("id", userId);

  if (profileError) throw new Error(profileError.message);

  revalidatePath("/");
};

export default DeleteCoverImageAction;