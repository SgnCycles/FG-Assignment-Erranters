"use server";
import { createClient } from "@/lib/supabase/serverClient";

const DeleteFavouritePostAction = async ({
  postId,
}: {
  postId: string;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase
    .from("Favourites")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return { error: "Failed to delete the post from favourites" };
  }
};

export default DeleteFavouritePostAction;