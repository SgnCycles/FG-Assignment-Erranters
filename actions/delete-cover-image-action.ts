"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeleteCoverImageAction = async ({
  image,
  userId,
}: {
  image: string;
  userId: string;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");
  const { error: storageError } = await supabase.storage
    .from("Cover-Images")
    .remove([image]);

  if (storageError) {
    console.error(storageError);
    return { error: "Failed to delete the cover image" };
  }

  const { error: profileError } = await supabase
    .from("Profiles")
    .update({ cover_image: null })
    .eq("id", userId);

  if (profileError) {
    console.error(profileError);
    return { error: "Failed to delete the cover image" };
  }

  revalidatePath("/");
};

export default DeleteCoverImageAction;