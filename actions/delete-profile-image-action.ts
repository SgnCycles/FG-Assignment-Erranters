"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeleteProfileImageAction = async ({
  image,
  userId,
}: {
  image: string;
  userId: string;
}) => {
  const supabase = await createClient();
  const { error: storageError } = await supabase.storage
    .from("Profile-Images")
    .remove([image]);

  if (storageError) {
    console.error(storageError);
    return { error: "Error Deleting Profile Image" };
  }

  const { error: profileError } = await supabase
    .from("Profiles")
    .update({ profile_image: null })
    .eq("id", userId);

  if (profileError) {
    console.error(profileError);
    return { error: "Error Deleting Profile Image" };
  }

  revalidatePath("/");
};

export default DeleteProfileImageAction;