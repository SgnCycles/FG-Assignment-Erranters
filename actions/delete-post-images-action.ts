"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

const DeletePostImagesAction = async ({
  image,
  postId,
}: {
  image: string;
  postId: string;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error: storageError } = await supabase.storage
    .from("Post-Images")
    .remove([image]);

  if (storageError) {
    console.error(storageError);
    return { error: "Failed to remove the post image" };
  }

  const { error: postError } = await supabase
    .from("PostImages")
    .delete()
    .eq("id", postId);

  if (postError) {
    console.error(postError);
    return { error: "Failed to delete the post image" };
  }

  revalidatePath("/");
};

export default DeletePostImagesAction;