"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeleteProfileImageAction = async ({image, userId}: {image: string; userId: string}) => {
  const supabase = await createClient();
  const { error: storageError } = await supabase.storage
    .from("Profile-Images")
    .remove([image]);

  if (storageError) throw new Error("Failed to remove the profile image");

  const { error: profileError } = await supabase
    .from("Profiles")
    .update({ profile_image: null })
    .eq("id", userId);

  if (profileError) throw new Error("Failed to update the user profile");

  revalidatePath("/");
};

export default DeleteProfileImageAction;