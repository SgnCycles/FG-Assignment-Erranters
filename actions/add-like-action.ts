"use server";
import { createClient } from "@/lib/supabase/serverClient";
// import { revalidatePath } from "next/cache";

export const AddLikeAction = async ({
  postId,
  // slug,
}: {
  postId: string;
  // slug: string;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase
    .from("PostLikes")
    .insert({
      post_id: postId,
      user_id: user.id,
    })
    // .throwOnError();

  if (error) console.log(error);
  // revalidatePath(`/post/${slug}`);
};
